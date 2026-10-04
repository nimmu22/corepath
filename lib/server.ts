import {createClient,type Client,type InStatement,type InValue} from '@libsql/client/web';
export function runtime(){return process.env}
export function json(body:unknown,status=200){return Response.json(body,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}})}
const schema=[
 'CREATE TABLE IF NOT EXISTS jobs (id TEXT PRIMARY KEY NOT NULL,dedup TEXT NOT NULL,payload TEXT NOT NULL,branch TEXT NOT NULL,posted_at TEXT,fetched_at TEXT NOT NULL,deadline TEXT)',
 'CREATE UNIQUE INDEX IF NOT EXISTS jobs_dedup_unique ON jobs(dedup)',
 'CREATE INDEX IF NOT EXISTS idx_jobs_branch_posted ON jobs(branch,posted_at)',
 'CREATE TABLE IF NOT EXISTS ingestion_locks (id TEXT PRIMARY KEY NOT NULL,expires INTEGER NOT NULL)',
 'CREATE TABLE IF NOT EXISTS provider_runs (id TEXT PRIMARY KEY NOT NULL,status TEXT NOT NULL,fetched_at TEXT,count INTEGER DEFAULT 0 NOT NULL)',
];
export function createDatabase(client:Client){
 let initialized:Promise<unknown>|undefined;
 function ready(){return initialized??=(client.batch(schema,'write').catch(error=>{initialized=undefined;throw error}))}
 class Statement {
  sql:string;args:InValue[];
  constructor(sql:string,args:InValue[]=[]){this.sql=sql;this.args=args}
  bind(...args:InValue[]){return new Statement(this.sql,args)}
  async all(){await ready();const r=await client.execute({sql:this.sql,args:this.args});return {results:r.rows}}
  async first(){return (await this.all()).results[0]||null}
  async run(){await ready();const r=await client.execute({sql:this.sql,args:this.args});return {meta:{changes:r.rowsAffected}}}
 }
 return {prepare:(sql:string)=>new Statement(sql),async batch(statements:Statement[]){await ready();const input:InStatement[]=statements.map(s=>({sql:s.sql,args:s.args}));return client.batch(input,'write')}}
}
let db:ReturnType<typeof createDatabase>|undefined;
export function database(){
 if(db)return db;
 const url=process.env.TURSO_DATABASE_URL,authToken=process.env.TURSO_AUTH_TOKEN;
 if(!url||!authToken)throw new Error('Configure TURSO_DATABASE_URL and TURSO_AUTH_TOKEN for the persistent job catalog.');
 if(!/^(libsql|https):\/\//.test(url))throw new Error('Use a remote libsql or HTTPS database URL on Vercel.');
 db=createDatabase(createClient({url,authToken}));return db;
}
