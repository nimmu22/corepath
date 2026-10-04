import {classify,safeUrl,type Job} from './jobs';
export type Board={provider:'greenhouse'|'lever';board:string;company:string;country:string};
export function boardsFrom(value:string|undefined):Board[]{if(!value)return [];const a=JSON.parse(value);if(!Array.isArray(a)||a.length>20)throw Error('Invalid boards');return a.filter(x=>['greenhouse','lever'].includes(x.provider)&&/^[a-zA-Z0-9_-]{1,100}$/.test(x.board)&&typeof x.company==='string'&&typeof x.country==='string')}
async function request(url:string){for(let n=0;n<3;n++){try{const r=await fetch(url,{signal:AbortSignal.timeout(15000),headers:{Accept:'application/json'}});if(r.ok)return await r.json();if(r.status!==429&&r.status<500)throw Error('Provider rejected request')}catch{if(n===2)throw Error('Provider unavailable')}await new Promise(r=>setTimeout(r,500*2**n))}throw Error('Provider unavailable')}
export async function fetchBoard(b:Board):Promise<Job[]>{
 const raw:any=await request(b.provider==='greenhouse'?`https://boards-api.greenhouse.io/v1/boards/${b.board}/jobs?content=true`:`https://api.lever.co/v0/postings/${b.board}?mode=json&limit=100`);
 const list=b.provider==='greenhouse'?raw.jobs:raw;if(!Array.isArray(list))throw Error('Unexpected response');const now=new Date().toISOString();
 return list.slice(0,500).flatMap((x:any)=>{const title=x.title||x.text;const description=String(x.content||x.descriptionPlain||'').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').slice(0,20000);const c=classify(title,description);const url=safeUrl(x.absolute_url||x.hostedUrl);if(!c||!url)return [];return [{id:`${b.provider}:${b.board}:${x.id}`,title,company:b.company,location:`${x.location?.name||x.categories?.location||'Location unavailable'} · ${b.country}`,...c,type:x.categories?.commitment||'Not specified',workplace:x.workplaceType||'Not specified',experience:'Not specified',qualification:'Not specified',salary:null,
 // Greenhouse updated_at is an edit date, never an original posting date.
 postedAt:null,firstSeen:now,fetchedAt:now,confirmedAt:now,deadline:null,source:`${b.company} · ${b.provider}`,url,description} as Job]});
}
