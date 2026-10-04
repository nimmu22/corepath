import {json} from '../../../lib/server';
// Sites' private service credential is not valid on Vercel. Use /api/ingest.
export async function POST(){return json({error:'Use /api/ingest with INGEST_SECRET on Vercel.'},403)}
