"use client";
import Link from "next/link";
import {useEffect,useState} from "react";
const roles=[
{id:"coach",title:"Learning Coach",goal:"Build a weekly learning plan",tasks:["Set a learning objective","Study one concept","Practice with original questions","Review mistakes"]},
{id:"hardware",title:"A+ Technician",goal:"Diagnose hardware and operating systems",tasks:["Review device symptoms","Check safe troubleshooting steps","Practice hardware questions","Record what you learned"]},
{id:"network",title:"Network Investigator",goal:"Study networking fundamentals",tasks:["Review TCP/IP","Practice DNS and DHCP","Trace basic connectivity","Review answers"]},
{id:"security",title:"Security Analyst",goal:"Learn defensive cybersecurity",tasks:["Identify the asset","Assess common risks","Choose layered controls","Practice a scenario"]},
{id:"organizer",title:"Project Organizer",goal:"Track study and project tasks",tasks:["Choose project scope","Break work into milestones","Document blockers","Review next actions"]}
] as const;
export default function NexusApp(){const [active,setActive]=useState<string>("coach");const [done,setDone]=useState<string[]>([]);
useEffect(()=>{try{const raw=localStorage.getItem("nexus-public-workspace-v1");if(raw){const saved=JSON.parse(raw);if(roles.some(role=>role.id===saved.role))setActive(saved.role);if(Array.isArray(saved.done))setDone(saved.done.filter((x:unknown)=>typeof x==="string").slice(0,100));}}catch{}},[]);
function save(role:string,tasks:string[]){setActive(role);setDone(tasks);try{localStorage.setItem("nexus-public-workspace-v1",JSON.stringify({role,done:tasks}));}catch{}}
const selected=roles.find(r=>r.id===active)??roles[0];
return <main className="container page"><p className="eyebrow">NEXUS / APP PREVIEW</p><h1>Your learning workspace</h1><p className="lede">Select a role, check off milestones, and open guided lessons. This first application preview is local-first: progress is saved only on this device. Hosted AI chat and account synchronization are not enabled.</p>
<div className="card-grid two section">{roles.map(role=><button key={role.id} type="button" aria-pressed={role.id===active} onClick={()=>save(role.id,[])} style={{borderRadius:12,padding:20,textAlign:"left",border:"1px solid currentColor",color:"inherit",background:"transparent",cursor:"pointer"}}><strong>{role.title}</strong><p>{role.goal}</p></button>)}</div>
<section className="feature-card" style={{marginTop:24,padding:24}}><h2>{selected.title} · Checklist</h2><p>{selected.goal}</p>{selected.tasks.map((task,i)=>{const key=`${selected.id}:${i}`;return <label key={key} style={{display:"block",padding:10}}><input type="checkbox" checked={done.includes(key)} onChange={e=>save(selected.id,e.target.checked?[...done,key]:done.filter(x=>x!==key))}/> {task}</label>})}<p>{done.length} of {selected.tasks.length} steps complete.</p></section>
<p style={{marginTop:25}}><Link href="/academy">Open A+ / Network+ / Security+ missions →</Link> · <a href="https://voiceofjesusministry.net/assistant">Bible Study Assistant →</a> · <Link href="/nexus">Downloadable extension →</Link></p>
</main>}