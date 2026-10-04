import {after} from 'next/server';
import {database,json} from '../../../lib/server';
import {ingestCatalog} from '../../../lib/ingestion';
export const dynamic='force-dynamic';
export const runtime='nodejs';
export const maxDuration=300;
export async function GET(){
 if(!process.env.TURSO_DATABASE_URL||!process.env.TURSO_AUTH_TOKEN)return json({jobs:[],health:[],configured:false,error:'Connect the job database in Vercel settings to activate live collection.'},503);
 try{
  const db=database();
  const [rows,health,latest]=await Promise.all([
   db.prepare('SELECT payload FROM jobs WHERE (deadline IS NULL OR deadline > ?) AND fetched_at > ? ORDER BY posted_at DESC LIMIT 2000').bind(new Date().toISOString(),new Date(Date.now()-72*3600000).toISOString()).all(),
   db.prepare("SELECT * FROM provider_runs WHERE id NOT LIKE 'catalog-%'").all(),
   db.prepare('SELECT fetched_at FROM provider_runs WHERE id=?').bind('catalog-cse-v2').first(),
  ]);
  // Refresh server-side after returning stored jobs. Shared lock and hourly limit bound writes.
  const collecting=!latest||Date.now()-Date.parse(String(latest.fetched_at))>=3600000;
  if(collecting)after(async()=>{try{await ingestCatalog()}catch{ /* Source statuses are handled by the updater; retry on the next visit/schedule. */ }});
  return json({jobs:rows.results.map((r:any)=>JSON.parse(String(r.payload))).filter((j:any)=>j.language==='en'&&['IN','GB'].includes(j.country)),health:health.results,configured:true,collecting,coverage:collecting?'Collecting original employer listings; results appear after the next page refresh.':'India · six connected employer feeds; 141-company directory; UK secondary',refreshHours:1});
 }catch{return json({jobs:[],health:[],configured:true,error:'The job database is unavailable. Check its connection settings.'},503)}
}
