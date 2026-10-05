import {createHash,randomUUID} from 'node:crypto';
import {cookies} from 'next/headers';
import {database,json} from '../../../lib/server';

export const runtime='nodejs';
export const dynamic='force-dynamic';

export async function POST(request:Request){
  // Only the site itself can record visits through a browser request.
  if(request.headers.get('origin')!==new URL(request.url).origin)return json({error:'Invalid origin'},403);
  try{
    const jar=await cookies();
    const stored=jar.get('corepath-visitor')?.value;
    const visitor=stored&&/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(stored)?stored:randomUUID();
    const day=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
    const key=createHash('sha256').update(visitor+':'+day).digest('hex');
    const db=database();
    await db.batch([
      db.prepare('CREATE TABLE IF NOT EXISTS visit_days (id TEXT PRIMARY KEY, recorded_at INTEGER NOT NULL)'),
      db.prepare('CREATE TABLE IF NOT EXISTS visit_totals (id INTEGER PRIMARY KEY, total INTEGER NOT NULL)'),
      db.prepare('INSERT OR IGNORE INTO visit_totals (id,total) VALUES (1,0)'),
      db.prepare('INSERT OR IGNORE INTO visit_days (id,recorded_at) VALUES (?,?)').bind(key,Date.now()),
      // This uses the preceding INSERT result inside one atomic transaction.
      db.prepare('UPDATE visit_totals SET total=total+changes() WHERE id=1'),
      db.prepare('DELETE FROM visit_days WHERE recorded_at < ?').bind(Date.now()-30*86400000),
    ]);
    const row=await db.prepare('SELECT total FROM visit_totals WHERE id=1').first();
    if(!stored||stored!==visitor)jar.set('corepath-visitor',visitor,{httpOnly:true,secure:new URL(request.url).protocol==='https:',sameSite:'lax',path:'/',maxAge:365*86400});
    return json({total:Number(row?.total??0)});
  }catch{return json({error:'Visit counter unavailable'},503)}
}
