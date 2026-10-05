'use client';
import {useEffect,useState} from 'react';

export default function VisitCounter(){
  const [count,setCount]=useState<number|null>(null);
  useEffect(()=>{
    let active=true;
    fetch('/api/visits',{method:'POST',credentials:'same-origin'})
      .then(async response=>{if(!response.ok)return;const data=await response.json();if(active&&Number.isSafeInteger(data.total)&&data.total>=0)setCount(data.total)})
      .catch(()=>{});
    return()=>{active=false};
  },[]);
  return <div style={{textAlign:'center',padding:'12px 18px',color:'var(--muted)',background:'var(--surface)',fontSize:12}} aria-live="polite">
    Total visits: {count===null?'Unavailable':count.toLocaleString('en-IN')}
    <span style={{display:'block',fontSize:11}}>Each browser counts once per day. No names or IP addresses are stored by this counter.</span>
  </div>;
}
