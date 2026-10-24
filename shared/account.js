/* GCSEasy accounts: email + password sign-in (Firebase), and progress sync across devices.
   Load in <head> after config.js and before site.js. Does nothing until window.GCSEASY_FIREBASE is set. */
(function(){
const FB=window.GCSEASY_FIREBASE,API=(window.GCSEASY_API||"").replace(/\/$/,"");
const AK="gcseasy-auth",MK="gcseasy-sync-meta";
const NOSYNC=new Set([AK,MK,"gcseasy-lbsent","gcseasy-sync-at","gcseasy-reminder","gcseasy-seen"]);
const LS=window.localStorage,origSet=Storage.prototype.setItem,origRemove=Storage.prototype.removeItem;
const enabled=!!(FB&&FB.apiKey&&API);
const read=k=>{try{return JSON.parse(LS.getItem(k)||"null")}catch(e){return null}};
const write=(k,v)=>{try{origSet.call(LS,k,JSON.stringify(v))}catch(e){}};
let sess=enabled?read(AK):null,info=null,listeners=[],verifyErr="",verifyAt=0;
const emit=()=>listeners.forEach(f=>{try{f(sess,info)}catch(e){}});

/* ---------- Firebase REST ---------- */
const ERR={EMAIL_EXISTS:"There's already an account with that email. Sign in instead.",INVALID_LOGIN_CREDENTIALS:"That email and password don't match. Check them, or reset your password.",
  EMAIL_NOT_FOUND:"No account with that email.",INVALID_PASSWORD:"Wrong password.",INVALID_EMAIL:"That doesn't look like an email address.",
  MISSING_PASSWORD:"Type a password.",USER_DISABLED:"This account has been turned off.",TOO_MANY_ATTEMPTS_TRY_LATER:"Too many tries. Wait a few minutes, then try again.",QUOTA_EXCEEDED:"Too many emails sent today. Try again tomorrow.",
  WEAK_PASSWORD:"Use a longer password (at least 8 characters).",TOKEN_EXPIRED:"Please sign in again.",USER_NOT_FOUND:"Please sign in again.",INVALID_ID_TOKEN:"Please sign in again.",
  OPERATION_NOT_ALLOWED:"Sign-up with email isn't switched on yet. Try again later.",CONFIGURATION_NOT_FOUND:"Sign-in isn't set up yet. Try again later.",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"For safety, sign out and back in, then try again."};
async function idt(method,body){
  let r;try{r=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${method}?key=${FB.apiKey}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)})}
  catch(e){throw new Error("Can't reach the sign-in service. Check your connection.")}
  const d=await r.json().catch(()=>({}));if(!r.ok){const code=((d.error&&d.error.message)||"").split(" ")[0].replace(/:$/,"");throw Object.assign(new Error(ERR[code]||("Something went wrong"+(code?" ("+code+")":"")+". Try again.")),{code})}return d}
function setSess(d){sess={uid:d.localId||d.user_id,email:(d.email||sess&&sess.email||"").toLowerCase(),idToken:d.idToken||d.id_token,refreshToken:d.refreshToken||d.refresh_token,
  exp:Date.now()+(+(d.expiresIn||d.expires_in||3600))*1000};write(AK,sess)}
async function refresh(){const r=await fetch(`https://securetoken.googleapis.com/v1/token?key=${FB.apiKey}`,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},
    body:"grant_type=refresh_token&refresh_token="+encodeURIComponent(sess.refreshToken)});
  const d=await r.json().catch(()=>({}));if(!r.ok){const code=(d.error&&d.error.message)||"";if(/TOKEN_EXPIRED|USER_NOT_FOUND|USER_DISABLED|INVALID_REFRESH_TOKEN/.test(code))signOut(true);throw new Error("refresh failed")}
  setSess(d)}
let refreshing=null;
async function token(force){if(!sess)return null;if(force||Date.now()>sess.exp-120e3){refreshing=refreshing||refresh().finally(()=>refreshing=null);try{await refreshing}catch(e){return sess?sess.idToken:null}}return sess?sess.idToken:null}
async function authHeaders(){const t=await token();return t?{Authorization:"Bearer "+t}:{}}

/* ---------- server ---------- */
async function server(path,body){const h=Object.assign({"Content-Type":"application/json"},await authHeaders());
  const r=await fetch(API+path,body?{method:"POST",headers:h,body:JSON.stringify(body),keepalive:JSON.stringify(body).length<60000}:{headers:h});
  const d=await r.json().catch(()=>({}));if(!r.ok)throw Object.assign(new Error(d.error||"Server error"),{code:d.code,status:r.status});return d}
async function loadMe(){if(!sess)return;try{info=await server("/me");emit()}catch(e){if(e.status===401){try{await token(true);info=await server("/me");emit()}catch(e2){}}}}

/* ---------- progress sync: newest change per key wins ---------- */
let meta=read(MK)||{};
function stamp(k){if(NOSYNC.has(k))return;meta[k]=Date.now();write(MK,meta);schedule()}
Storage.prototype.setItem=function(k,v){origSet.call(this,k,v);if(this===LS&&enabled)stamp(k)};
Storage.prototype.removeItem=function(k){origRemove.call(this,k);if(this===LS&&enabled)stamp(k)};
let timer=null,syncing=false,lastSync=read("gcseasy-sync-at")||0,syncErr="";
function schedule(){if(!sess)return;clearTimeout(timer);timer=setTimeout(()=>sync(),4000)}
function localKeys(){const out={};for(let i=0;i<LS.length;i++){const k=LS.key(i);if(NOSYNC.has(k))continue;out[k]={v:LS.getItem(k),t:meta[k]||1}}
  for(const k in meta)if(!k.startsWith("__")&&!NOSYNC.has(k)&&LS.getItem(k)==null)out[k]={v:null,t:meta[k]};return out}
async function sync(opts){if(!sess||syncing||!info||!info.verified)return;syncing=true;opts=opts||{};const first=!meta.__synced;
  try{const local=localKeys();
    // first sync on a device: take what's already saved online, then upload anything only this device has
    const d=await server("/sync",{keys:first?{}:local});let changed=0;
    for(const [k,o] of Object.entries(d.keys||{})){if(NOSYNC.has(k)||k.startsWith("__"))continue;const l=local[k];
      if(!l||first||o.t>l.t){const cur=LS.getItem(k);if(o.v==null){if(cur!=null){origRemove.call(LS,k);changed++}}else if(cur!==o.v){origSet.call(LS,k,o.v);changed++}meta[k]=o.t}}
    if(first){for(let i=0;i<LS.length;i++){const k=LS.key(i);if(!NOSYNC.has(k)&&meta[k]==null)meta[k]=Date.now()}meta.__synced=1;write(MK,meta);
      await server("/sync",{keys:localKeys()}).catch(()=>{})}
    write(MK,meta);lastSync=Date.now();write("gcseasy-sync-at",lastSync);syncErr="";
    if(changed&&opts.onLoad){let n=0;try{n=+sessionStorage.getItem("gcseasy-synced-reload")||0}catch(e){}
      if(!userActed&&n<2){try{sessionStorage.setItem("gcseasy-synced-reload",String(n+1))}catch(e){}location.reload();return}
      toast("Progress synced from your other devices.","Refresh",()=>location.reload())}
  }catch(e){syncErr=e.message||"Sync failed"}finally{syncing=false;emit()}}
let userActed=false;["pointerdown","keydown"].forEach(ev=>addEventListener(ev,()=>userActed=true,{once:true,capture:true}));
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"&&sess&&timer){clearTimeout(timer);timer=null;sync()}});

/* ---------- account actions ---------- */
async function signUp(email,pw){const d=await idt("signUp",{email,password:pw,returnSecureToken:true});setSess(d);
  verifyErr="";try{await idt("sendOobCode",{requestType:"VERIFY_EMAIL",idToken:sess.idToken});verifyAt=Date.now()}catch(e){verifyErr=e.message}
  await afterSignIn()}
async function signIn(email,pw){const d=await idt("signInWithPassword",{email,password:pw,returnSecureToken:true});setSess(d);await afterSignIn()}
async function afterSignIn(){emit();await loadMe();await sync();emit();try{window.GCSEasy&&GCSEasy.lbSync&&GCSEasy.lbSync(true)}catch(e){}}
async function resend(){verifyErr="";try{await idt("sendOobCode",{requestType:"VERIFY_EMAIL",idToken:await token(true)});verifyAt=Date.now()}catch(e){verifyErr=e.message;throw e}}
async function reset(email){await idt("sendOobCode",{requestType:"PASSWORD_RESET",email})}
async function recheck(){await token(true);await loadMe();if(info&&info.verified){await sync();emit()}return info&&info.verified}
function signOut(silent){if(sess&&!silent)sync();sess=null;info=null;try{origRemove.call(LS,AK)}catch(e){}emit()}
async function del(){await server("/account/delete",{});await idt("delete",{idToken:await token(true)});
  meta={};write(MK,meta);signOut(true)}

/* ---------- UI ---------- */
const css=`.accbtn{display:inline-grid;place-items:center;width:36px;height:36px;border-radius:999px;border:1px solid var(--line);background:var(--surface);color:var(--ink);cursor:pointer;font:700 .85rem var(--display,inherit);padding:0}
.accbtn svg{width:19px;height:19px}.accbtn{position:relative}.accbtn.unv::after{content:"!";position:absolute;top:-4px;right:-4px;width:15px;height:15px;border-radius:50%;background:#FFD84D;color:#16212E;font:700 11px/15px Arial;text-align:center}.accbtn.on{background:var(--accent);border-color:var(--accent);color:var(--surface)}
.accsheet{position:fixed;inset:0;z-index:90;display:grid;place-items:center;background:rgba(10,15,22,.55);padding:16px}
.accsheet[hidden]{display:none}.accbox{background:var(--surface);color:var(--ink);border-radius:20px;width:min(440px,100%);max-height:calc(100dvh - 32px);overflow:auto;padding:22px 20px;box-shadow:0 20px 60px rgba(0,0,0,.3)}
.accbox h2{margin:0 0 4px;font:700 1.35rem var(--display,inherit)}.accbox .sub{color:var(--muted);margin:0 0 16px;font-size:.93rem}
.acctabs{display:grid;grid-template-columns:1fr 1fr;gap:4px;background:var(--bg);border-radius:12px;padding:4px;margin-bottom:16px}
.acctabs button{border:0;background:none;border-radius:9px;padding:9px;font:700 .92rem var(--display,inherit);color:var(--muted);cursor:pointer}.acctabs button.on{background:var(--surface);color:var(--ink);box-shadow:0 1px 3px rgba(0,0,0,.12)}
.accf{display:grid;gap:12px}.accf label{display:grid;gap:5px;font-weight:700;font-size:.9rem}
.accf input[type=email],.accf input[type=password],.accf input[type=text],.accf input.pw{font:400 1rem var(--body,inherit);padding:11px 12px;border-radius:10px;border:1px solid var(--line);background:var(--bg);color:var(--ink);width:100%;box-sizing:border-box}
.accf .pwrow{position:relative}.accf .pwrow button{position:absolute;right:6px;top:50%;transform:translateY(-50%);border:0;background:none;color:var(--accent);font-weight:700;cursor:pointer;padding:6px}
.accmsg{min-height:1.2em;font-size:.9rem;margin:0}.accmsg.bad{color:var(--bad,#c0392b)}.accmsg.good{color:var(--good,#1e8e3e)}
.accbtnp{border:0;border-radius:12px;padding:12px;background:var(--accent);color:var(--surface);font:700 1rem var(--display,inherit);cursor:pointer;width:100%}.accbtnp:disabled{opacity:.6}
.accbtn2{border:1px solid var(--line);border-radius:12px;padding:10px 12px;background:var(--surface);color:var(--ink);font:700 .92rem var(--display,inherit);cursor:pointer}
.acclink{border:0;background:none;color:var(--accent);font-weight:700;cursor:pointer;padding:0;font-size:.9rem;text-decoration:underline}
.accrow{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.accnote{font-size:.82rem;color:var(--muted);margin:4px 0 0}
.accinfo{background:var(--bg);border:1px solid var(--line);border-radius:12px;padding:12px 14px;margin-bottom:14px;display:grid;gap:6px;font-size:.93rem}
.accwarn{background:var(--accent-soft,#fff6d6);border-radius:12px;padding:12px 14px;margin-bottom:14px;font-size:.93rem}
.accx{float:right;border:0;background:none;font-size:1.3rem;cursor:pointer;color:var(--muted);line-height:1;padding:4px}
.accdanger{color:var(--bad,#c0392b)}.acctoast{position:fixed;left:50%;bottom:88px;transform:translateX(-50%);z-index:95;background:var(--ink);color:var(--surface);border-radius:12px;padding:10px 14px;display:flex;gap:12px;align-items:center;font-size:.92rem;box-shadow:0 8px 24px rgba(0,0,0,.25);max-width:calc(100% - 32px)}
.acctoast button{border:0;background:none;color:var(--hl,#FFD84D);font-weight:700;cursor:pointer}
.acccta{display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap;background:var(--accent-soft,#e8f0fe);border-radius:14px;padding:12px 14px;margin:12px 0}
.acccta p{margin:0;font-size:.93rem;flex:1 1 220px}`;
const ICON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>';
const esc=t=>String(t==null?"":t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
let sheet,mode="in",reason="",hold=false;
function toast(text,btn,fn){const t=document.createElement("div");t.className="acctoast";t.setAttribute("role","status");t.innerHTML=`<span>${esc(text)}</span>${btn?`<button type="button">${esc(btn)}</button>`:""}`;
  document.body.appendChild(t);if(btn)t.querySelector("button").onclick=()=>{t.remove();fn&&fn()};setTimeout(()=>t.remove(),8000)}
const REASON={signin:"Make a free account (or sign in) to use AI marking. You get 40 marks a day, just for you.",verify:"Verify your email to use AI marking: tap the link in the email we sent you.",
  classes:"Make a free account (or sign in) to create or join a class.",sync:"Sign in to save your progress and pick it up on any device."};
function open(why){if(!enabled)return;reason=why||"";if(!sheet){sheet=document.createElement("div");sheet.className="accsheet";sheet.setAttribute("role","dialog");sheet.setAttribute("aria-modal","true");sheet.setAttribute("aria-label","Your account");
    sheet.onclick=e=>{if(e.target===sheet)close()};document.addEventListener("keydown",e=>{if(e.key==="Escape"&&sheet&&!sheet.hidden)close()});document.body.appendChild(sheet)}
  sheet.hidden=false;draw();const f=sheet.querySelector("input,button.accbtnp");if(f)f.focus()}
function close(){if(sheet)sheet.hidden=true}
function pwField(id,label,auto){return `<label for="${id}">${label}<div class="pwrow"><input class="pw" id="${id}" type="password" autocomplete="${auto}" minlength="8" required><button type="button" data-show="${id}">Show</button></div></label>`}
function draw(){if(!sheet||sheet.hidden||hold)return;const box=`<div class="accbox"><button class="accx" type="button" aria-label="Close" data-close>\u2715</button>`;
  if(sess&&info&&!info.verified){
    sheet.innerHTML=box+`<h2>Verify your email</h2><p class="sub">${esc(sess.email)}</p>
      <div class="accwarn"><b>One more step.</b> We've sent a link to <b>${esc(sess.email)}</b>. Open it, tap the link, then come back and press <b>I've verified</b>.<br><br>Can't see it? Check junk or spam. School email accounts often block these, so a personal email (like Gmail) works best.</div>
      ${verifyErr?`<p class="accmsg bad" style="margin:0 0 12px">The email didn't send: ${esc(verifyErr)}</p>`:verifyAt?`<p class="accmsg good" style="margin:0 0 12px">Email sent at ${new Date(verifyAt).toLocaleTimeString("en-GB",{hour:"numeric",minute:"2-digit"})}.</p>`:""}
      <div class="accf"><button class="accbtnp" type="button" id="accchk">I've verified</button><button class="accbtn2" type="button" id="accresend">Send the email again</button><p class="accmsg" id="accvmsg" role="status"></p></div>
      <p class="accnote" style="margin-top:14px">Until you verify, your account can't save progress, join classes or use AI marking.</p>
      <div class="accrow" style="margin-top:12px;justify-content:space-between"><button class="acclink" type="button" id="accout">Use a different email</button><a class="accnote" href="privacy.html">Privacy</a></div>
      <details style="margin-top:14px"><summary class="accnote" style="cursor:pointer">Delete this account</summary><div class="accf" style="margin-top:10px"><p class="accnote">Type DELETE to confirm.</p><input type="text" id="accdel" autocomplete="off" aria-label="Type DELETE"><button class="accbtn2 accdanger" type="button" id="accdelgo">Delete account</button><p class="accmsg bad" id="accdmsg" role="status"></p></div></details></div>`;
    const $=id=>sheet.querySelector("#"+id),say=(t,c)=>{const el=$("accvmsg");if(el){el.className="accmsg "+(c||"");el.textContent=t}};
    $("accchk").onclick=async()=>{say("Checking\u2026");hold=true;try{const ok=await recheck();hold=false;if(ok){draw();toast("Email verified. Your progress is now saving to your account.")}else say("Not verified yet. Tap the link in the email first, then try again.","bad")}catch(e){hold=false;say(e.message,"bad")}};
    $("accresend").onclick=async()=>{say("Sending\u2026");hold=true;try{await resend();hold=false;draw()}catch(e){hold=false;draw()}};
    $("accout").onclick=()=>{signOut(true);mode="up";draw()};
    $("accdelgo").onclick=async()=>{const m=$("accdmsg");if($("accdel").value.trim()!=="DELETE"){m.textContent="Type DELETE first.";return}m.textContent="Deleting\u2026";hold=true;try{await del();hold=false;close();toast("Your account has been deleted.")}catch(e){hold=false;m.textContent=e.message}};
  }else if(sess){const v=info?info.verified:null;
    sheet.innerHTML=box+`<h2>Your account</h2><p class="sub">${esc(sess.email)}</p>
      ${reason&&REASON[reason]&&reason!=="signin"?`<div class="accwarn">${esc(REASON[reason])}</div>`:""}
      ${v===false?`<div class="accwarn"><b>Check your email.</b> We sent a link to verify ${esc(sess.email)}. Tap it, then press "I've verified". It may be in junk or spam.<div class="accrow" style="margin-top:10px"><button class="accbtn2" type="button" id="accchk">I've verified</button><button class="acclink" type="button" id="accresend">Send it again</button></div><p class="accmsg" id="accvmsg" role="status"></p></div>`:""}
      <div class="accinfo"><div><b>Progress sync:</b> ${syncing?"syncing\u2026":syncErr?`<span class="accdanger">${esc(syncErr)}</span>`:lastSync?"saved "+new Date(lastSync).toLocaleString("en-GB",{hour:"numeric",minute:"2-digit",day:"numeric",month:"short"}):"not yet"}</div>
        <div>Your XP, cards, quiz scores, classes and notes save to your account, so you can carry on from any phone, laptop or school computer.</div></div>
      <div class="accrow"><button class="accbtn2" type="button" id="accsync">Sync now</button>${info&&info.admin?`<a class="accbtn2" href="admin.html" style="text-decoration:none">Owner dashboard</a>`:""}<button class="accbtn2" type="button" id="accout">Sign out</button></div>
      <details style="margin-top:18px"><summary class="accnote" style="cursor:pointer">Delete my account</summary><div class="accf" style="margin-top:10px"><p class="accnote">This deletes your account and the progress saved online. Progress on this device stays. Type DELETE to confirm.</p><input type="text" id="accdel" autocomplete="off" aria-label="Type DELETE"><button class="accbtn2 accdanger" type="button" id="accdelgo">Delete account</button><p class="accmsg bad" id="accdmsg" role="status"></p></div></details>
      <p class="accnote" style="margin-top:14px"><a href="privacy.html">Privacy</a></p></div>`;
    const $=id=>sheet.querySelector("#"+id);
    $("accsync").onclick=()=>{sync();setTimeout(draw,50)};$("accout").onclick=()=>{signOut();draw()};
    const say=(id,t,c)=>{const el=sheet.querySelector("#"+id);if(el){el.className="accmsg "+(c||"");el.textContent=t}};
    if($("accchk"))$("accchk").onclick=async()=>{say("accvmsg","Checking\u2026");hold=true;try{const ok=await recheck();hold=false;if(ok){draw();toast("Email verified. You're all set.")}else say("accvmsg","Not verified yet. Tap the link in the email first.","bad")}catch(e){hold=false;say("accvmsg",e.message,"bad")}};
    if($("accresend"))$("accresend").onclick=async()=>{try{await resend();say("accvmsg","Sent. Check your inbox (and spam).","good")}catch(e){say("accvmsg",e.message,"bad")}};
    $("accdelgo").onclick=async()=>{if($("accdel").value.trim()!=="DELETE"){say("accdmsg","Type DELETE first.","bad");return}say("accdmsg","Deleting\u2026","bad");hold=true;try{await del();hold=false;close();toast("Your account has been deleted.")}catch(e){hold=false;say("accdmsg",e.message,"bad")}};
  }else{
    const titles={in:["Sign in","Welcome back."],up:["Create a free account","Save your progress on every device, join classes and get 40 AI marks a day."],reset:["Reset your password","We'll email you a link to choose a new one."]};
    sheet.innerHTML=box+`<h2>${titles[mode][0]}</h2><p class="sub">${titles[mode][1]}</p>
      ${reason&&REASON[reason]?`<div class="accwarn">${esc(REASON[reason])}</div>`:""}
      ${mode!=="reset"?`<div class="acctabs" role="tablist"><button type="button" role="tab" data-m="in" class="${mode==="in"?"on":""}" aria-selected="${mode==="in"}">Sign in</button><button type="button" role="tab" data-m="up" class="${mode==="up"?"on":""}" aria-selected="${mode==="up"}">Create account</button></div>`:""}
      <form class="accf" id="accform" novalidate>
        <label for="accemail">Email<input id="accemail" type="email" autocomplete="email" inputmode="email" required></label>
        ${mode==="in"?pwField("accpw","Password","current-password"):mode==="up"?pwField("accpw","Password (at least 8 characters)","new-password"):""}
        ${mode==="up"?`<p class="accnote">We'll email you a link to check it's you. We only use your email to sign you in; see our <a href="privacy.html" target="_blank">privacy notice</a>. Under 13? Ask a parent or carer first.</p>`:""}
        <p class="accmsg" id="accmsg" role="status"></p>
        <button class="accbtnp" type="submit">${mode==="in"?"Sign in":mode==="up"?"Create account":"Send reset link"}</button>
      </form>
      <div class="accrow" style="margin-top:12px;justify-content:space-between">${mode==="in"?`<button class="acclink" type="button" data-m="reset">Forgotten your password?</button>`:mode==="reset"?`<button class="acclink" type="button" data-m="in">Back to sign in</button>`:"<span></span>"}<a class="accnote" href="privacy.html">Privacy</a></div></div>`;
    const $=id=>sheet.querySelector("#"+id),msg=(t,c)=>{$("accmsg").className="accmsg "+(c||"bad");$("accmsg").textContent=t};
    sheet.querySelectorAll("[data-m]").forEach(b=>b.onclick=()=>{const em=$("accemail").value;mode=b.dataset.m;draw();$("accemail").value=em;$("accemail").focus()});
    $("accform").onsubmit=async e=>{e.preventDefault();const email=$("accemail").value.trim(),pw=$("accpw")?$("accpw").value:"";
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return msg("Type your email address.");
      if(mode!=="reset"&&!pw)return msg("Type your password.");if(mode==="up"&&pw.length<8)return msg("Use at least 8 characters for your password.");
      const btn=sheet.querySelector(".accbtnp");btn.disabled=true;msg(mode==="reset"?"Sending\u2026":"Just a sec\u2026","");
      try{if(mode==="in")await signIn(email,pw);else if(mode==="up")await signUp(email,pw);else{await reset(email);msg("If there's an account for that email, a reset link is on its way. Check your spam too.","good");btn.disabled=false;return}
        mode="in";draw();if(!(info&&!info.verified))toast("Signed in. Your progress is syncing.")}
      catch(err){msg(err.message);btn.disabled=false}};
  }
  sheet.querySelectorAll("[data-close]").forEach(b=>b.onclick=close);
  sheet.querySelectorAll("[data-show]").forEach(b=>b.onclick=()=>{const i=sheet.querySelector("#"+b.dataset.show);i.type=i.type==="password"?"text":"password";b.textContent=i.type==="password"?"Show":"Hide"});
}
function navButton(){const nav=document.querySelector(".sitenav");if(!nav||document.getElementById("accbtn"))return;const b=document.createElement("button");b.id="accbtn";b.type="button";b.className="accbtn";
  b.onclick=()=>open();const tb=nav.querySelector(".themebtn");nav.insertBefore(b,tb||null);paint()}
function paint(){const b=document.getElementById("accbtn");if(b){b.classList.toggle("on",!!sess);b.classList.toggle("unv",!!(sess&&info&&!info.verified));b.innerHTML=sess?esc((sess.email||"?")[0].toUpperCase()):ICON;b.setAttribute("aria-label",sess?"Your account ("+sess.email+")":"Sign in or create an account");b.title=sess?sess.email:"Sign in"}
  document.querySelectorAll("[data-acc-cta]").forEach(el=>el.hidden=!!sess);if(sess||paint.was)draw();paint.was=!!sess}
listeners.push(paint);
function boot(){if(!enabled)return;const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);navButton();
  const mine=document.getElementById("mine");if(mine&&!document.querySelector("[data-acc-cta]")){const c=document.createElement("div");c.className="acccta";c.setAttribute("data-acc-cta","");
    c.innerHTML=`<p><b>Save your progress.</b> Make a free account to keep your XP, cards and classes on every device.</p><button type="button" class="accbtn2">Create account</button>`;c.querySelector("button").onclick=()=>{mode="up";open("sync")};mine.after(c)}
  paint();if(sess)loadMe().then(()=>sync({onLoad:true}))}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();
window.GCSEasyAuth={enabled,open:(why)=>{if(why==="signin"||why==="classes")mode="up";open(why)},close,headers:authHeaders,token,user:()=>sess,info:()=>info,onChange:f=>listeners.push(f),sync,server};
})();
