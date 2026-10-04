export const runtime='nodejs';
export const maxDuration=300;
export const dynamic='force-dynamic';
import {json,runtime as environment} from '../../../lib/server';
import {ingestCatalog} from '../../../lib/ingestion';
export async function POST(request:Request){const e=environment();if(!e.INGEST_SECRET||request.headers.get('authorization')!==`Bearer ${e.INGEST_SECRET}`)return json({error:'Unauthorized'},401);try{return json(await ingestCatalog())}catch{return json({error:'Ingestion unavailable'},503)}}
