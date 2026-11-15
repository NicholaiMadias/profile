import Link from "next/link";
import {cookies} from "next/headers";
import {createHmac,timingSafeEqual} from "node:crypto";
import {redirect} from "next/navigation";
import type { Metadata } from "next";
export const metadata:Metadata={title:"Nexus Admin | Nicholai"};
export const dynamic="force-dynamic";
const COOKIE="nexus_admin_session";
function signingKey(){const value=process.env.NEXUS_ADMIN_SESSION_SECRET;return value&&value.length>=32?value:null;}
function signature(timestamp:string,key:string){return createHmac("sha256",key).update(timestamp).digest("hex");}
function equal(a:string,b:string){const x=Buffer.from(a),y=Buffer.from(b);return x.length===y.length&&timingSafeEqual(x,y);}
async function authenticated(){const key=signingKey();const value=(await cookies()).get(COOKIE)?.value;if(!key||!value)return false;const [created,mac]=value.split(".");if(!created||!mac||!/^[0-9]+$/.test(created)||!/^[0-9a-f]{64}$/.test(mac))return false;const date=Number(created);if(!Number.isSafeInteger(date)||date>Date.now()||Date.now()-date>4*60*60*1000)return false;return equal(mac,signature(created,key));}
async function login(formData:FormData){"use server";const key=signingKey();const expected=process.env.NEXUS_ADMIN_PASSWORD;const supplied=formData.get("password");if(!key||!expected||expected.length<16||typeof supplied!=="string"||supplied.length>512||!equal(supplied,expected)){redirect("/admin?error=1");}
const created=String(Date.now());(await cookies()).set(COOKIE,`${created}.${signature(created,key)}`,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/admin",maxAge:4*60*60});redirect("/admin");}
async function logout(){"use server";(await cookies()).delete(COOKIE);redirect("/admin");}
export default async function AdminPage({searchParams}:{searchParams:Promise<{error?:string}>}){const granted=await authenticated();const configured=!!(process.env.NEXUS_ADMIN_PASSWORD?.length&&signingKey());const params=await searchParams;
return <main className="container page narrow"><p className="eyebrow">NEXUS · PRIVATE ADMINISTRATION</p><h1>Nexus Admin</h1>{granted?<><p>Authenticated administrator dashboard. Access expires after four hours.</p><div className="card-grid two section">
<section className="feature-card"><h2>Private Agent Nexus</h2><p>Use the separate private repository for advanced extension and companion development. Repository access is additionally controlled by GitHub.</p><a href="https://github.com/NicholaiMadias/agent" rel="noopener noreferrer" target="_blank">Open private repository ↗</a></section>
<section className="feature-card"><h2>Public experiences</h2><p><Link href="/agent">Agent Nexus public portal</Link> · <Link href="/academy">Certification academy</Link> · <a href="https://voiceofjesusministry.net/assistant">Ministry Bible assistant</a></p></section>
</div><p>Remote command execution and GitHub writes are not exposed by this dashboard. Those require separately approved, authenticated integrations.</p><form action={logout}><button type="submit">Sign out</button></form></>:configured?<><p>Restricted access. Enter the password configured for this deployment.</p>{params.error&&<p role="alert">Access denied. Verify credentials.</p>}<form action={login}><label htmlFor="admin-password">Administrator password</label><input id="admin-password" type="password" name="password" autoComplete="current-password" required minLength={16} style={{display:"block",width:"100%",margin:"12px 0"}}/><button type="submit">Unlock admin</button></form><p>Never reuse your GitHub token as this password. Enable rate limiting and sign-in monitoring at the hosting edge before public use.</p></>:<p>The admin portal is locked until NEXUS_ADMIN_PASSWORD (at least 16 characters) and NEXUS_ADMIN_SESSION_SECRET (at least 32 characters) are configured in the hosting environment. No default password exists.</p>}
</main>;}
