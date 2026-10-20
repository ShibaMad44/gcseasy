/* GCSEasy site helpers: theme switch, subject list, saved progress. Load in <head>. */
(function(){
const TKEY="gcseasy-theme",PKEY="gcseasy-progress";
try{const t=localStorage.getItem(TKEY);if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t)}catch(e){}

const AQA="https://www.aqa.org.uk/find-past-papers-and-mark-schemes";
const CATS=[["sci","Sciences"],["math","Maths"],["eng","English"],["hum","Humanities"],["lang","Languages"],["arts","Creative"],["tech","Technical & vocational"]];
const S=(id,name,cat,code,c,exam,extra)=>Object.assign({id,name,cat,code,c,exam,live:false},extra||{});
const ART=["Annotate your work to explain your choices, influences and how ideas developed.","Cover all four assessment objectives across your portfolio.","Refer to specific artists or photographers and link them to your own work."];
const LANG=["Learn high-frequency verbs in the past, present and future.","Do listening practice with past paper audio.","Learn opinion phrases you can use in any speaking or writing answer."];
const SUBJECTS=[
 S("biology","Biology","sci","Bi","--bio","AQA",{live:true,href:"biology.html",board:"AQA · 8461 · Paper 1 · B1–B4",features:["Notes","Flashcards","Required practicals","Exam questions","Maths drill"]}),
 S("chemistry","Chemistry","sci","Ch","--chem","AQA",{live:true,href:"chemistry.html",board:"AQA · 8462 · Paper 1 · C1–C5",features:["Notes","Flashcards","Required practicals","Bonding deep dive","Exam questions","Calc drill"]}),
 S("physics","Physics","sci","Ph","--phys","AQA",{live:true,href:"physics.html",board:"AQA · 8463 · Paper 1 · P1–P4",features:["Notes","Flashcards","Required practicals","Exam questions","Equations drill"],spec:"8463",tips:["Practise rearranging equations and always give units.","Required practicals come up every year: know the method and variables.","Show every step of a calculation for method marks."]}),
 S("combined-science","Combined Science","sci","Cs","--phys","AQA",{live:true,href:"combined-science.html",board:"AQA · 8464 · Trilogy",features:["Biology","Chemistry","Physics","Triple content hidden"],spec:"8464",tips:["Revise all three sciences evenly; each has its own papers.","Learn the required practicals for biology, chemistry and physics.","Use the Biology and Chemistry pages here for Paper 1 topics, skipping anything marked Triple."]}),
 S("maths","Maths","math","Ma","--math","Edexcel",{live:true,href:"maths.html",board:"Edexcel · 1MA1 · Higher",features:["Topic checklist","MathsWatch clips","Practice generator","Formulas to learn"]}),
 S("english-language","English Language","eng","El","--eng","AQA",{live:true,href:"english-language.html",board:"AQA · 8700 · Papers 1 and 2",features:["Paper 1 guide","Paper 2 guide","Timings","Structures"],spec:"8700",tips:["Know the order, marks and timing of every question on each paper.","Quote short phrases and analyse the effect of specific words.","Plan creative writing for five minutes before you start."]}),
 S("english-literature","English Literature","eng","Lt","--eng","OCR",{live:true,href:"english-literature.html",board:"OCR · J352 · Paper 1",features:["68 quote cards","Best quotes","Context","Essay practice"]}),
 S("geography","Geography","hum","Ge","--hum","AQA",{live:true,href:"geography.html",board:"AQA · 8035 · Papers 1 & 2",features:["Notes","19 case studies","Case study quiz","Exam questions","Skills drill"]}),
 S("history","History","hum","Hi","--hum","OCR",{spec:"J410",tips:["Make a timeline for each topic so you know the order of events.","For sources, comment on who wrote it, when and why.","Back every point with a specific fact, date or name."]}),
 S("religious-studies","Religious Studies","hum","Rs","--hum","AQA",{spec:"8062",tips:["Learn two contrasting views on each issue, with sources of authority.","Evaluate questions need arguments on both sides and a justified conclusion."]}),
 S("classical-civilisation","Classical Civilisation","hum","Cc","--hum","OCR",{spec:"J199",tips:["Learn what each key source shows and how reliable it is.","Compare Greek and Roman examples when the question asks for both."]}),
 S("citizenship","Citizenship Studies","hum","Ci","--hum","OCR",{live:true,href:"citizenship.html",board:"OCR · J270 · Politics",features:["Notes","Flashcards","Exam guide","Multiple choice","Written paper"],spec:"J270",tips:["Learn key terms: democracy, rule of law, rights and responsibilities.","Use real, recent examples of citizen action and campaigns."]}),
 S("sociology","Sociology","hum","So","--hum","AQA",{spec:"8192",tips:["Learn the key sociologists and their views for each topic.","Evaluate research methods using reliability, validity and ethics."]}),
 S("french","French","lang","Fr","--lang","AQA",{live:true,href:"french.html",board:"AQA · 8652 · Higher",features:["Grammar","Vocab cards","Vocab test","Speaking answers","Exam guide","Exam questions"],spec:"8652",tips:LANG}),
 S("spanish","Spanish","lang","Es","--lang","AQA",{spec:"8692",tips:LANG}),
 S("german","German","lang","De","--lang","AQA",{spec:"8662",tips:["Learn word order rules: the verb goes second, and to the end after weil and dass.","Do listening practice with past paper audio."]}),
 S("latin","Latin","lang","La","--lang","Eduqas",{tips:["Learn the vocabulary list and your noun and verb endings.","Practise translating unseen passages a little every day."]}),
 S("fine-art","Fine Art","arts","Fa","--arts","Edexcel",{spec:"1FA0",tips:ART}),
 S("photography","Photography","arts","Po","--arts","AQA",{spec:"8206",tips:ART}),
 S("textiles","Textiles","arts","Tx","--arts","Eduqas",{tips:ART}),
 S("music","Music","arts","Mu","--arts","Edexcel",{spec:"1MU0",tips:["Learn the key features of each set work.","Practise listening questions with the right musical vocabulary."]}),
 S("drama","Drama","arts","Dr","--arts","Edexcel",{spec:"1DR0",tips:["Know key scenes in your set text and how you'd stage them.","Use specific vocal and physical skills in written answers."]}),
 S("media-studies","Media Studies","arts","Me","--arts","AQA",{tips:["Know your close study products in detail.","Use the framework: media language, representation, industry, audiences."]}),
 S("film-studies","Film Studies","arts","Fi","--arts","Eduqas",{tips:["Learn key scenes from each set film.","Analyse film form: cinematography, mise-en-scène, editing and sound."]}),
 S("computer-science","Computer Science","tech","Cp","--tech","OCR",{spec:"J277",tips:["Practise tracing algorithms and writing pseudocode.","Get fast at binary, hex and denary conversions."]}),
 S("pe","Physical Education","tech","Pe","--tech","OCR",{spec:"J587",tips:["Learn bones, muscles and their functions with sporting examples.","Use a named sport in every applied answer."]}),
 S("enterprise","Enterprise","tech","En","--tech","Pearson BTEC",{tips:["Apply every answer to the business in the case study.","Learn the key calculations: costs, revenue, profit and break-even."]}),
 S("hospitality","Hospitality & Catering","tech","Hc","--tech","Eduqas",{tips:["Learn food safety, hygiene and the causes of food poisoning.","Know the different types of hospitality and catering providers."]})
];
SUBJECTS.forEach(s=>{if(!s.live){s.href="subject.html#"+s.id;s.board=s.exam+(s.spec?" · "+s.spec:"")}});

function progress(){try{return JSON.parse(localStorage.getItem(PKEY)||"{}")||{}}catch(e){return {}}}
function report(id,data){try{const all=progress();all[id]=Object.assign({},data,{at:Date.now()});localStorage.setItem(PKEY,JSON.stringify(all))}catch(e){}}
function isDark(){const a=document.documentElement.getAttribute("data-theme");if(a)return a==="dark";return window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches}
function setupToggle(){document.querySelectorAll("[data-theme-toggle]").forEach(b=>{
  const upd=()=>{const d=isDark();b.setAttribute("aria-label",d?"Switch to light mode":"Switch to dark mode");b.title=b.getAttribute("aria-label")};upd();
  b.onclick=()=>{const next=isDark()?"light":"dark";document.documentElement.setAttribute("data-theme",next);try{localStorage.setItem(TKEY,next)}catch(e){}upd()}})}
const PAPERS={"AQA":AQA,"Edexcel":"https://qualifications.pearson.com/en/support/support-topics/exams/past-papers.html","Pearson BTEC":"https://qualifications.pearson.com/en/support/support-topics/exams/past-papers.html","OCR":"https://www.ocr.org.uk/qualifications/past-paper-finder/","Eduqas":"https://www.eduqas.co.uk/"};
SUBJECTS.forEach(s=>{s.papers=PAPERS[s.exam]||"https://www.physicsandmathstutor.com/"});

/* ---- study log: sessions started and stopped with the floating timer ---- */
const LKEY="gcseasy-log",TMKEY="gcseasy-timer";
function getLog(){try{const l=JSON.parse(localStorage.getItem(LKEY)||"[]");return Array.isArray(l)?l:[]}catch(e){return []}}
function setLog(l){try{localStorage.setItem(LKEY,JSON.stringify(l))}catch(e){}}
function getRun(){try{return JSON.parse(localStorage.getItem(TMKEY)||"null")}catch(e){return null}}
function setRun(r){try{if(r)localStorage.setItem(TMKEY,JSON.stringify(r));else localStorage.removeItem(TMKEY)}catch(e){}}
const live=()=>SUBJECTS.filter(s=>s.live);
function pageSubject(){const t=(document.title||"").split("·")[0].trim().toLowerCase();
  let s=SUBJECTS.find(x=>x.name.toLowerCase()===t);
  if(!s&&/subject\.html/.test(location.pathname))s=SUBJECTS.find(x=>x.id===location.hash.slice(1));return s||null}
const fmt=sec=>{sec=Math.max(0,Math.floor(sec));const h=Math.floor(sec/3600),m=Math.floor(sec%3600/60),x=sec%60;return (h?h+":"+String(m).padStart(2,"0"):m)+":"+String(x).padStart(2,"0")};
const nameOf=id=>(SUBJECTS.find(s=>s.id===id)||{name:id==="other"?"Other":id}).name;
const GKEY="gcseasy-goal";
function getGoal(){try{const g=+localStorage.getItem(GKEY);return g>0?g:60}catch(e){return 60}}
function setGoal(m){try{localStorage.setItem(GKEY,String(m))}catch(e){}}
const elapsed=r=>r?(r.acc||0)+(r.paused?0:Date.now()-r.start):0;
const dayStart=()=>{const d=new Date();d.setHours(0,0,0,0);return d.getTime()};
function todayMs(){const t=dayStart();return getLog().filter(x=>x.s>=t).reduce((a,x)=>a+((x.d!=null?x.d:x.e-x.s)),0)+elapsed(getRun())}
/* Header timer: a stopwatch button in the nav. Tap it to start, pause or stop. Nothing floats over the page. */
function setupTimer(){const nav=document.querySelector(".sitenav");if(!nav||document.getElementById("tbtn"))return;
  const b=document.createElement("button");b.type="button";b.id="tbtn";b.className="tbtn";b.setAttribute("aria-haspopup","dialog");b.setAttribute("aria-expanded","false");
  nav.insertBefore(b,nav.querySelector(".themebtn"));
  const pop=document.createElement("div");pop.className="tpop";pop.id="tpop";pop.hidden=true;pop.setAttribute("role","dialog");pop.setAttribute("aria-label","Revision timer");document.body.appendChild(pop);
  let iv=null;
  function toast(msg){document.querySelectorAll(".stoast").forEach(x=>x.remove());const t=document.createElement("div");t.className="stoast";t.setAttribute("role","status");t.innerHTML=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),4500)}
  function btn(){const r=getRun();
    if(r){b.classList.add("on");b.classList.toggle("paused",!!r.paused);b.innerHTML=`<span class="tdot" aria-hidden="true"></span><span class="tt">${fmt(elapsed(r)/1000)}</span>`;b.setAttribute("aria-label",`Revision timer: ${r.paused?"paused":"running"}, ${nameOf(r.subj)}`)}
    else{b.classList.remove("on","paused");b.innerHTML=`<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9.5 2.5h5"/></svg>`;b.setAttribute("aria-label","Start a revision timer")}
    b.title=b.getAttribute("aria-label")}
  function ring(){const g=getGoal(),m=todayMs()/60000,pc=Math.min(100,m/g*100);
    return `<div class="tgoal"><div class="tring" style="--p:${pc}"><span>${Math.round(pc)}%</span></div><div><b>${Math.round(m)} of ${g} min</b><span>today's goal · <button type="button" class="tlink" id="tgoalset">change</button></span></div></div>`}
  function panel(){const r=getRun();
    if(r){pop.innerHTML=`<p class="th">Revising ${nameOf(r.subj)}</p><p class="tbig" id="tbig">${fmt(elapsed(r)/1000)}</p>${r.paused?`<p class="tsub">Paused</p>`:""}
      <div class="tbtns"><button type="button" class="tb1" id="tpause">${r.paused?"Resume":"Pause"}</button><button type="button" class="tb2" id="tstop">Stop and save</button></div>
      ${ring()}<button type="button" class="tlink" id="tdiscard">Discard this session</button>`;
      $p("tpause").onclick=()=>{const x=getRun();if(!x)return;if(x.paused){x.start=Date.now();x.paused=false}else{x.acc=elapsed(x);x.paused=true}setRun(x);sync()};
      $p("tstop").onclick=stop;
      $p("tdiscard").onclick=e=>{const t=e.target;if(!t.dataset.sure){t.dataset.sure=1;t.textContent="Tap again to throw it away";return}setRun(null);close();sync();toast("Session discarded.")}}
    else{const cur=pageSubject();
      pop.innerHTML=`<p class="th">Start revising</p><label class="tl" for="tsel">Subject</label><select id="tsel">${[...live(),...SUBJECTS.filter(s=>!s.live)].map(s=>`<option value="${s.id}"${cur&&cur.id===s.id?" selected":""}>${s.name}</option>`).join("")}<option value="other">Something else</option></select>
      <div class="tbtns"><button type="button" class="tb1" id="tstart">Start timer</button></div>${ring()}<a class="tlink" href="tools.html#tracker">See your revision tracker</a>`;
      $p("tstart").onclick=()=>{setRun({start:Date.now(),subj:$p("tsel").value,acc:0,paused:false});close();sync();toast(`Timer started for ${nameOf(getRun().subj)}. Tap the clock at the top to pause or stop.`)}}
    const gs=$p("tgoalset");if(gs)gs.onclick=()=>{const opts=[15,30,45,60,90,120,180];const g=getGoal();const i=opts.indexOf(g);setGoal(opts[(i+1)%opts.length]);panel()}}
  const $p=id=>pop.querySelector("#"+id);
  function stop(){const r=getRun();setRun(null);close();if(!r){sync();return}
    let ms=elapsed(r);const cap=4*3600e3;let note="";if(ms>cap){ms=cap;note=" (capped at 4 hours: did you forget to stop it?)"}
    if(ms<60000)toast("Under a minute, so it wasn't saved.");
    else{const l=getLog();l.push({s:Date.now()-ms,e:Date.now(),d:ms,subj:r.subj});setLog(l);
      addXP(Math.floor(ms/300000),"timer",96);const g=getGoal(),t=Math.round(todayMs()/60000);toast(`Saved <b>${Math.round(ms/60000)} min</b> of ${nameOf(r.subj)}${note}. ${t>=g?"Daily goal hit!":`${g-t} min to go today.`} <a href="tools.html#tracker">Tracker</a>`)}
    sync()}
  function open(){panel();pop.hidden=false;b.setAttribute("aria-expanded","true");const f=pop.querySelector("button,select");if(f)f.focus()}
  function close(){pop.hidden=true;b.setAttribute("aria-expanded","false")}
  b.onclick=e=>{e.stopPropagation();pop.hidden?open():close()};
  document.addEventListener("click",e=>{if(!pop.hidden&&e.target.isConnected&&!pop.contains(e.target)&&!b.contains(e.target))close()});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!pop.hidden){close();b.focus()}});
  function sync(){btn();clearInterval(iv);iv=null;const r=getRun();
    if(r&&!r.paused)iv=setInterval(()=>{btn();const t=$p("tbig");if(t&&!pop.hidden)t.textContent=fmt(elapsed(getRun())/1000)},1000);
    if(!pop.hidden)panel();document.dispatchEvent(new CustomEvent("gcseasy-timer"))}
  window.addEventListener("storage",e=>{if(e.key===TMKEY||e.key===LKEY)sync()});
  sync()}

/* ---- past papers: nav button + a section at the bottom of every page ---- */
const EXTRA=[["Physics & Maths Tutor","https://www.physicsandmathstutor.com/","Past papers and questions sorted by topic"],["Save My Exams","https://www.savemyexams.com/","Revision notes and past papers"]];
function setupPapers(){const nav=document.querySelector(".sitenav");
  if(nav&&!nav.querySelector(".navpp")){
    nav.querySelectorAll("a").forEach(a=>{if(/tools\.html/.test(a.getAttribute("href")||"")&&!a.querySelector("span"))a.innerHTML='Study<span class="nl"> tools</span>'});
    const a=document.createElement("a");a.className="navpp";a.href="#papers";a.innerHTML='<span class="nl">Past p</span><span class="ns">P</span>apers';
    const tb=nav.querySelector(".themebtn");nav.insertBefore(a,tb)}
  if(!document.getElementById("papers")){const foot=document.querySelector(".sitefoot");if(!foot)return;
    const s=pageSubject();
    const links=s?[[s.exam+" past papers",s.papers,`Official ${s.name} papers and mark schemes${s.spec?" · spec "+s.spec:""}`],...EXTRA]
      :[...Object.entries(PAPERS).filter(([k])=>k!=="Pearson BTEC").map(([k,u])=>[k,u,"Official past papers and mark schemes"]),...EXTRA];
    const sec=document.createElement("section");sec.className="ppsec";sec.id="papers";
    sec.innerHTML=`<div class="in"><h2>Past papers${s?": "+s.name:""}</h2><p>GCSEasy questions are original, written in the style of the real exams. Finish your revision with real papers and mark schemes, timed, then mark them strictly.</p>
    <div class="pplinks">${links.map(([b,u,d])=>`<a href="${u}" target="_blank" rel="noopener"><b>${b}</b><span>${d}</span></a>`).join("")}</div></div>`;
    foot.parentNode.insertBefore(sec,foot)}
  document.querySelectorAll('.sitefoot a[href$="#papers"]').forEach(a=>a.setAttribute("href","#papers"))}
/* phone bottom bar: Home, Subjects, Tools, Papers */
function setupBotnav(){if(document.querySelector(".botnav"))return;const path=location.pathname.split("/").pop()||"index.html";
  const I={home:'<path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',subj:'<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>',tools:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9.5 2.5h5"/>',pp:'<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h5"/>',res:'<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5z"/><path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5z"/>'};
  const isSubj=!/^(index|tools|resources)\.html$/.test(path);
  const items=[["index.html","Home","home",path==="index.html"],["index.html#subjects","Subjects","subj",isSubj],["tools.html","Tools","tools",path==="tools.html"],["resources.html","Resources","res",path==="resources.html"],["#papers","Papers","pp",false]];
  const n=document.createElement("nav");n.className="botnav";n.setAttribute("aria-label","Main");
  n.innerHTML=items.map(([h,l,i,on])=>`<a href="${h}"${on?' aria-current="page"':""}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[i]}</svg>${l}</a>`).join("");
  document.body.appendChild(n)}
/* ---- AI: Claude when the page runs inside Claude, otherwise the GCSEasy server (free Cloudflare AI) ---- */
const API=(window.GCSEASY_API||"").replace(/\/$/,"");
function parseJSON(t){t=String(t||"").trim();try{return JSON.parse(t)}catch(e){}const f=t.match(/```(?:json)?\s*([\s\S]*?)```/);if(f){try{return JSON.parse(f[1])}catch(e){}}
  const a=t.indexOf("{"),b=t.lastIndexOf("}");if(a>=0&&b>a){try{return JSON.parse(t.slice(a,b+1))}catch(e){}}const err=new Error("bad json");err.code="invalid_json";err.text=t;throw err}
let _ai;
function aiClient(){if(_ai)return _ai;
  _ai=(async()=>{
    if(window.claude&&typeof window.claude.use==="function"){try{const f=await window.claude.use("sample");if(f)return {kind:"claude",json:(p,o)=>f.json(p,Object.assign({modelTier:"default",cache:false},o||{})),text:async(p,o)=>(await f(p,Object.assign({cache:false},o||{}))).text}}catch(e){}}
    if(API){const call=async(prompt,json)=>{let r;try{r=await fetch(API+"/ai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:String(prompt).slice(0,24000),json})})}catch(e){throw {code:"upstream_error"}}
        const d=await r.json().catch(()=>({}));if(d&&d.limit)setQuota(d);if(!r.ok)throw {code:d.code||(r.status===429?"rate_limited":"upstream_error"),message:d.error};return d.text};
      return {kind:"server",json:async p=>parseJSON(await call(p,true)),text:p=>call(p,false)}}
    return null})();
  return _ai}
/* ---- XP: points for real revision. Exam marks pay once per question; repeatable activities have daily caps. ---- */
const XPK="gcseasy-xp";
const dkeyL=()=>{const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")};
function xpLedger(){let x=null;try{x=JSON.parse(localStorage.getItem(XPK)||"null")}catch(e){}x=x||{};x.total=x.total||0;x.days=x.days||{};x.aw=x.aw||{};return x}
function xpToast(n){try{let t=document.getElementById("xptoast");if(!t){t=document.createElement("div");t.id="xptoast";t.className="xptoast";t.setAttribute("aria-live","polite");document.body.appendChild(t)}
  t.textContent="+"+n+" XP";t.classList.remove("show");void t.offsetWidth;t.classList.add("show");clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove("show"),1600)}catch(e){}}
/* add XP. cat + cap limit a category per day; key makes it once-only (stores the most paid for that key) */
function addXP(n,cat,cap,key){n=Math.max(0,Math.round(n||0));if(!n)return 0;const x=xpLedger(),td=dkeyL();const d=x.days[td]=x.days[td]||{pts:0,cat:{}};
  if(key){const prev=x.aw[key]||0;if(n<=prev)return 0;const add=n-prev;x.aw[key]=n;n=add}
  if(cap){const used=d.cat[cat]||0;n=Math.min(n,Math.max(0,cap-used))}if(!n){try{localStorage.setItem(XPK,JSON.stringify(x))}catch(e){}return 0}
  d.pts+=n;d.cat[cat]=(d.cat[cat]||0)+n;x.total+=n;
  const keep=Object.keys(x.days).sort().slice(-60);x.days=Object.fromEntries(keep.map(k=>[k,x.days[k]]));
  try{localStorage.setItem(XPK,JSON.stringify(x))}catch(e){}xpToast(n);clearTimeout(addXP._s);addXP._s=setTimeout(()=>lbSync(),4000);return n}
function xpStats(){const x=xpLedger(),now=new Date();let week=0,today=0;const td=dkeyL();
  for(let i=0;i<7;i++){const d=new Date(now);d.setDate(d.getDate()-i);const k=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");week+=(x.days[k]||{}).pts||0}
  today=(x.days[td]||{}).pts||0;const level=Math.floor(Math.sqrt(x.total/40))+1,lo=40*(level-1)**2,hi=40*level**2;
  return {total:x.total,week,today,level,into:x.total-lo,need:hi-lo}}
/* ---- AI quota: "3 of 40 used today · resets at 1:00am" on any element with class aiquota ---- */
let QUOTA=null;
const resetTime=()=>{const t=QUOTA&&QUOTA.resetsAt?new Date(QUOTA.resetsAt):(()=>{const d=new Date();d.setUTCHours(24,0,0,0);return d})();return t.toLocaleTimeString("en-GB",{hour:"numeric",minute:"2-digit",hour12:true}).replace(" ","").replace(":00","")};
function quotaText(){if(!QUOTA)return "";const left=Math.max(0,QUOTA.limit-QUOTA.used);
  if(QUOTA.siteUsed!=null&&QUOTA.siteUsed>=QUOTA.siteLimit)return `The free AI has hit today's limit for the whole site. It resets at ${resetTime()}.`;
  return left?`AI marking: ${QUOTA.used} of ${QUOTA.limit} used today · resets at ${resetTime()}`:`You've used all ${QUOTA.limit} AI marks today. They reset at ${resetTime()}.`}
function setQuota(d){QUOTA=Object.assign(QUOTA||{},d);drawQuota()}
function drawQuota(){const t=quotaText();document.querySelectorAll(".aiquota").forEach(el=>{el.textContent=t;el.hidden=!t;el.classList.toggle("out",!!QUOTA&&QUOTA.used>=QUOTA.limit)})}
async function loadQuota(){if(!API||(window.claude&&window.claude.use))return;try{const r=await fetch(API+"/ai/usage");if(r.ok)setQuota(await r.json())}catch(e){}}
function aiLimitMsg(){return `You've used all ${QUOTA?QUOTA.limit:40} AI marks today. They reset at ${resetTime()}. Use the mark scheme for now.`}
/* ---- class leaderboards (server only) ---- */
const LBK="gcseasy-me";
function me(){let m=null;try{m=JSON.parse(localStorage.getItem(LBK)||"null")}catch(e){}if(!m||!m.id){m={id:(crypto.randomUUID?crypto.randomUUID():String(Math.random()).slice(2)+Date.now()),name:"",groups:[]};try{localStorage.setItem(LBK,JSON.stringify(m))}catch(e){}}return m}
function saveMe(m){try{localStorage.setItem(LBK,JSON.stringify(m))}catch(e){}}
async function lbCall(path,body){if(!API)throw {code:"no_server"};const r=await fetch(API+path,body?{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)}:{});const d=await r.json().catch(()=>({}));if(!r.ok)throw {code:d.code||"error",message:d.error};return d}
function myStats(){const L=getLog(),t=dayStart();const days=new Set(L.map(x=>{const d=new Date(x.s);d.setHours(0,0,0,0);return d.getTime()}));
  let dc={};try{dc=JSON.parse(localStorage.getItem("gcseasy-daily")||"{}")||{}}catch(e){}
  Object.keys(dc.done||{}).forEach(k=>days.add(new Date(k+"T00:00:00").getTime()));
  let streak=0,d=t;if(!days.has(d))d-=864e5;while(days.has(d)){streak++;d-=864e5}
  const mins=Math.round(L.filter(x=>x.s>=t-6*864e5).reduce((a,x)=>a+(x.d!=null?x.d:x.e-x.s),0)/60000);
  const td=new Date().toISOString().slice(0,10);const today=dc.done&&dc.done[td];
  const xs=xpStats();return {streak,mins:xs.week,daily:today?{date:td,score:today.score,of:today.of}:null,cards:xs.total}}
async function lbSync(force){const m=me();if(!API||!m.name||!m.groups.length)return;const st=myStats();const sig=JSON.stringify([m.name,m.groups,st]);
  let last={};try{last=JSON.parse(localStorage.getItem("gcseasy-lbsent")||"{}")}catch(e){}
  if(!force&&last.sig===sig&&Date.now()-(last.t||0)<6*3600e3)return;
  for(const g of m.groups){try{await lbCall("/lb/score",{code:g,id:m.id,name:m.name,stats:st})}catch(e){}}
  try{localStorage.setItem("gcseasy-lbsent",JSON.stringify({sig,t:Date.now()}))}catch(e){}}
function boot(){setupToggle();setupPapers();setupTimer();setupBotnav();setTimeout(lbSync,1500);loadQuota()}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();
window.GCSEasy={SUBJECTS,CATS,progress,report,AQA,PAPERS,getLog,setLog,getRun,nameOf,fmt,getGoal,setGoal,elapsed,todayMs,aiClient,parseJSON,API,drawQuota,aiLimitMsg,me,saveMe,lbCall,lbSync,myStats,addXP,xpStats};
})();
