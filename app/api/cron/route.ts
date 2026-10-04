import {timingSafeEqual} from 'node:crypto';
import {json,runtime as environment} from '../../../lib/server';
import {ingestCatalog} from '../../../lib/ingestion';
export const runtime='nodejs';
export const maxDuration=300;
export const dynamic='force-dynamic';
export async function GET(request:Request){const secret=environment().CRON_SECRET;const supplied=request.headers.get('authorization')||'';const expected=secret?`Bearer ${secret}`:'';if(!secret||Buffer.byteLength(supplied)!==Buffer.byteLength(expected)||!timingSafeEqual(Buffer.from(supplied),Buffer.from(expected)))return json({error:'Unauthorized'},401);try{const r=await ingestCatalog();return json(r,r.status==='failed'?502:200)}catch{return json({error:'Configure the job database and retry collection.'},503)}}
