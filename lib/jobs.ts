export type Job = {id:string; title:string;company:string;location:string;branch:string;specialization:string;type:string;workplace:string;experience:string;qualification:string;salary:string|null;postedAt:string|null;firstSeen:string;fetchedAt:string;confirmedAt:string|null;deadline:string|null;source:string;url:string;description:string;dateKind?:string;sourceUrl?:string;country?:string;language?:string;employerOrigin?:string};
export const taxonomy:Record<string,string[]>={Civil:['Structural','Construction','Site engineering','Quantity surveying','BIM','Planning','Transportation','Environmental'],Mechanical:['Design','Manufacturing','Production','Maintenance','Quality','HVAC','Automotive','Mechatronics'],'Computer Science / IT':['Software development','Web development','Mobile development','Data engineering','Data analysis','AI / ML','Cybersecurity','Cloud / DevOps','Software testing','IT support'],Electrical:['Power systems','Electrical design','Maintenance','Control systems','Automation','Renewable energy','Instrumentation']};
export function classify(title:string,description:string):{branch:string;specialization:string}|null{
 // Match computing roles by title so incidental mentions of software do not recategorize civil/mechanical work.
 if(/business developer|property developer|real estate developer/i.test(title))return null;
 const computing:[string,RegExp][]=[
 ['AI / ML',/machine learning|\bAI[ /-]ML\b|\bML engineer|\bAI engineer|artificial intelligence|data scien|deep learning|\bNLP\b/i],
 ['Cybersecurity',/cyber.?security|information security|IT.security|security (?:analyst|engineer)|penetration test|\bSOC analyst/i],
 ['Cloud / DevOps',/devops|cloud (?:engineer|architect|developer)|site reliability|\bSRE\b|platform engineer/i],
 ['Data engineering',/data engineer|data architect|\bETL\b|database (?:administrator|developer|engineer)/i],
 ['Data analysis',/data analy|business intelligence|\bBI developer|\bBI analyst/i],
 ['Software testing',/software (?:test|quality)|test automation|automation test|\bSDET\b|\bQA (?:automation|software)|(?:software|automation) QA|quality assurance.*software/i],
 ['Mobile development',/android|iOS developer|flutter|react native|mobile (?:developer|engineer)/i],
 ['Web development',/frontend|front.end|backend|back.end|full.stack|web (?:developer|engineer)/i],
 ['IT support',/IT (?:support|helpdesk|service desk|intern|trainee)|technical support engineer|systems? administrator|network (?:engineer|administrator)/i],
 ['Software development',/software|firmware|embedded (?:developer|engineer)|(?:java|python|C\+\+|application|application development) (?:developer|engineer)|\bdeveloper\b|computer science|IT architect/i],
 ];
 const cs=computing.find(([,pattern])=>pattern.test(title));
 if(cs)return {branch:'Computer Science / IT',specialization:cs[0]};
 const rules:[string,string,RegExp][]=[['Civil','Structural',/structures|bridges|structural|civil|quantity survey|construction|\bBIM\b|site engineer|transportation engineer|bauingenieur|bauleiter|hochbau|tiefbau|génie civil/i],['Mechanical','Design',/piping|mechanical|manufacturing|HVAC|production engineer|mechatronic|maschinenbau|konstrukteur|produktion|fertigung/i],['Electrical','Power systems',/electrical|power systems|instrumentation|control systems|renewable energy|automation engineer|elektro|energietechnik|automatisierung|\bOT engineer/i]];
 const explicit=/electrical|power systems|instrumentation/i.test(title)?rules[2]:/mechanical|HVAC|manufacturing|piping/i.test(title)?rules[1]:/civil|structural|structures|bridges|quantity survey/i.test(title)?rules[0]:null;const hit=explicit||rules.find(r=>r[2].test(title))||rules.find(r=>r[2].test(description));return hit?{branch:hit[0],specialization:taxonomy[hit[0]].find(s=>new RegExp(s,'i').test(title+' '+description))||hit[1]}:null;
}
export function safeUrl(value:string){try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password?u.href:null}catch{return null}}
export function dedupKey(j:Pick<Job,'company'|'title'|'location'>){return [j.company,j.title,j.location].map(x=>x.toLowerCase().replace(/[^a-z0-9]/g,'')).join('|')}
