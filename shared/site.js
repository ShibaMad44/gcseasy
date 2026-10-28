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
 S("biology","Biology","sci","Bi","--bio","AQA",{live:true,href:"biology.html",board:"AQA · 8461 · Papers 1 and 2 · B1–B7",features:["Notes","Flashcards","Required practicals","Exam questions","Maths drill"]}),
 S("chemistry","Chemistry","sci","Ch","--chem","AQA",{live:true,href:"chemistry.html",board:"AQA · 8462 · Papers 1 and 2 · C1–C10",features:["Notes","Flashcards","Required practicals","Bonding deep dive","Exam questions","Calc drill"]}),
 S("physics","Physics","sci","Ph","--phys","AQA",{live:true,href:"physics.html",board:"AQA · 8463 · Papers 1 and 2 · P1–P8",features:["Notes","Flashcards","Required practicals","Exam questions","Equations drill"],spec:"8463",tips:["Practise rearranging equations and always give units.","Required practicals come up every year: know the method and variables.","Show every step of a calculation for method marks."]}),
 S("combined-science","Combined Science","sci","Cs","--phys","AQA",{live:true,href:"combined-science.html",board:"AQA · 8464 · Trilogy",features:["Biology","Chemistry","Physics","Triple content hidden"],spec:"8464",tips:["Revise all three sciences evenly; each has its own papers.","Learn the required practicals for biology, chemistry and physics.","Use the Biology, Chemistry and Physics pages for Paper 1 and 2 topics, skipping anything marked Triple."]}),
 S("maths","Maths","math","Ma","--math","Edexcel",{live:true,href:"maths.html",board:"Edexcel · 1MA1 · Higher",features:["Topic checklist","MathsWatch clips","Practice generator","Formulas to learn"]}),
 S("english-language","English Language","eng","El","--eng","AQA",{live:true,href:"english-language.html",board:"AQA · 8700 · Papers 1 and 2",features:["Paper 1 guide","Paper 2 guide","Timings","Structures"],spec:"8700",tips:["Know the order, marks and timing of every question on each paper.","Quote short phrases and analyse the effect of specific words.","Plan creative writing for five minutes before you start."]}),
 S("english-literature","English Literature","eng","Lt","--eng","OCR",{live:true,href:"english-literature.html",board:"OCR · J352 · Papers 1 and 2",features:["Inspector Calls","Jekyll and Hyde","Conflict poetry","Romeo and Juliet","Quote test","Essay practice"]}),
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
  b.onclick=()=>{const next=isDark()?"light":"dark";const go=()=>{document.documentElement.setAttribute("data-theme",next);try{localStorage.setItem(TKEY,next)}catch(e){}upd()};const calm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;if(document.startViewTransition&&!calm)document.startViewTransition(go);else{const r=document.documentElement;r.classList.add("theming");go();setTimeout(()=>r.classList.remove("theming"),450)}}})}
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
    const links=nav.querySelectorAll("a:not(.navpp)"),last=links[links.length-1];nav.insertBefore(a,last?last.nextSibling:nav.querySelector(".themebtn"))}
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
const authH=async()=>{try{return window.GCSEasyAuth&&GCSEasyAuth.enabled?await GCSEasyAuth.headers():{}}catch(e){return {}}};
function parseJSON(t){t=String(t||"").trim();try{return JSON.parse(t)}catch(e){}const f=t.match(/```(?:json)?\s*([\s\S]*?)```/);if(f){try{return JSON.parse(f[1])}catch(e){}}
  const a=t.indexOf("{"),b=t.lastIndexOf("}");if(a>=0&&b>a){try{return JSON.parse(t.slice(a,b+1))}catch(e){}}const err=new Error("bad json");err.code="invalid_json";err.text=t;throw err}
let _ai;
function aiClient(){if(_ai)return _ai;
  _ai=(async()=>{
    if(window.claude&&typeof window.claude.use==="function"){try{const f=await window.claude.use("sample");if(f)return {kind:"claude",json:(p,o)=>f.json(p,Object.assign({modelTier:"default",cache:false},o||{})),text:async(p,o)=>(await f(p,Object.assign({cache:false},o||{}))).text}}catch(e){}}
    if(API){const call=async(prompt,json)=>{let r;try{r=await fetch(API+"/ai",{method:"POST",headers:Object.assign({"Content-Type":"application/json"},await authH()),body:JSON.stringify({prompt:String(prompt).slice(0,24000),json})})}catch(e){throw {code:"upstream_error"}}
        const d=await r.json().catch(()=>({}));if(d&&d.limit)setQuota(d);
        if(!r.ok){if((d.code==="signin"||d.code==="verify")&&window.GCSEasyAuth)GCSEasyAuth.open(d.code);throw {code:d.code||(r.status===429?"rate_limited":"upstream_error"),message:d.error}}return d.text};
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
  d.pts+=n;d.cat[cat]=(d.cat[cat]||0)+n;x.total+=n;ev(String(cat||"other").replace(/[^a-z]/g,"").slice(0,14)||"other");
  const keep=Object.keys(x.days).sort().slice(-60);x.days=Object.fromEntries(keep.map(k=>[k,x.days[k]]));
  try{localStorage.setItem(XPK,JSON.stringify(x))}catch(e){}xpToast(n);checkBadges();reminders.seen();clearTimeout(addXP._s);addXP._s=setTimeout(()=>lbSync(),4000);return n}
function xpStats(){const x=xpLedger(),now=new Date();let week=0,today=0;const td=dkeyL();
  for(let i=0;i<7;i++){const d=new Date(now);d.setDate(d.getDate()-i);const k=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");week+=(x.days[k]||{}).pts||0}
  today=(x.days[td]||{}).pts||0;const level=Math.floor(Math.sqrt(x.total/40))+1,lo=40*(level-1)**2,hi=40*level**2;
  return {total:x.total,week,today,level,into:x.total-lo,need:hi-lo}}
/* ---- Smart quiz questions, shared by Quiz me and the daily challenge.
   Wrong answers come from questions of the same TYPE (an adaptation for an adaptation, a date for a date),
   with the same answer shape and similar length. rnd lets the daily challenge stay the same for everyone. ---- */
const QG=(()=>{
const STOP=new Set("the a an of to in and or is are what which why how does do for on with by its it as at be from that this name give state define meaning vs".split(" "));
const norm=s=>String(s).toLowerCase().replace(/<[^>]+>/g,"").replace(/[‘’']/g,"").replace(/[^a-z0-9%.À-ɏ ]+/g," ").replace(/\s+/g," ").trim();
const words=s=>norm(s).split(" ").filter(w=>w&&!STOP.has(w)).map(w=>w.replace(/(ing|ed|es|s)$/,""));
const jac=(a,b)=>{const A=new Set(a),B=new Set(b);if(!A.size||!B.size)return 0;let n=0;A.forEach(x=>{if(B.has(x))n++});return n/(A.size+B.size-n)};
const parts=a=>String(a).split(/\s*[;,]\s*|\s+and\s+/).filter(Boolean).length;
const numIn=a=>{const m=String(a).replace(/,(?=\d{3})/g,"").match(/-?\d+(\.\d+)?/);return m?+m[0]:null};
const WORDNUM=["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve"];
const UNITS=["Joule (J)","Watt (W)","Newton (N)","Coulomb (C)","Volt (V)","Ohm (\u03a9)","Hertz (Hz)","Pascal (Pa)","Becquerel (Bq)","Kilogram (kg)","Metre per second (m/s)","Ampere (A)"];
const SCIENTISTS=["Rutherford","Thomson","Bohr","Dalton","Chadwick","Mendeleev","Becquerel","Marie Curie","Faraday","Newton","Darwin","Fleming","Jenner","Mendel","Watson and Crick","Avogadro"];
// what the question is asking for
function qtype(q){const s=String(q).toLowerCase();
  if(/stage direction/.test(s))return "stagedir";
  if(/^(act|ch|chapter) \d+ ·/.test(s))return "quote";
  const T=[["diff",/\bvs\b|difference between|compare|versus/],["list",/^\d+\b|^name (the )?\d|^(two|three|four|five|six|seven|eight)\b|^list|^give \d|\d+ (ways|types|factors|examples|causes|effects|methods)|^factors|factors affecting/],["adapt",/adapt/],["func",/\b(function|job|role|purpose)\b|what does .{1,30} do\b/],["eq",/equation|formula|\bcalculat|symbol equation|word equation/],
    ["unit",/\bunits?\b/],["who",/^who\b|who (discovered|proposed|developed|wrote|invented)/],["when",/^when\b|what year|which year|\bdate\b|\bset\b\?|published/],
    ["where",/^where\b|location|found in|which part/],["howmany",/how many|how much|^%|\bnumber of\b|percentage|\brate\b|\bcost\b|\bdeaths?\b|\bfigures?\b/],
    ["why",/^why\b|reason|why is|why are/],["steps",/steps|stages|process|sequence|order of|how .{1,40} forms?\b/],
    ["list",/^\d+\b|^name (the )?\d|^(two|three|four|five|six|seven|eight)\b|^list|^give \d|\d+ (ways|types|factors|examples|causes|effects|methods)/],
    ["example",/example|e\.g\./],["cause",/caus|effects?\b|impacts?|consequence|risk factor/],["test",/\btest for\b|test\b|indicator|observation/],
    ["type",/what type|which type|kind of|classif/],
    ["def",/^(define|what is|what are|meaning|definition)|meaning$|what does .{1,40} mean/]];
  for(const [k,re] of T)if(re.test(s))return k;
  return s.split(/\s+/).length<=5&&!/\?$/.test(s)?"term":"other"}
function kind(a){const s=String(a).trim(),w=s.split(/\s+/).length;
  if(/^(about |around |~|over |under |almost )?[-−£$]?\d[\d,.]*\s*(%|[a-zA-Z°²³/]{0,8})?(\s|$)/i.test(s)&&w<=4)return "num";
  if(/[=→÷×^√]/.test(s)&&w<=10)return "formula";
  const p=parts(s);if(p>=3)return "list"+Math.min(p,5);if(p===2)return "pair";
  return w<=2?"word":w<=6?"short":"long"}
function wordNumFakes(a,rnd){const i=WORDNUM.indexOf(norm(a));if(i<0)return [];const c=String(a)[0]===String(a)[0].toUpperCase();
  return [i-2,i-1,i+1,i+2,i+3].filter(x=>x>=0&&x<WORDNUM.length).map(x=>[rnd(),WORDNUM[x]]).sort((p,q)=>p[0]-q[0]).map(x=>c?x[1][0].toUpperCase()+x[1].slice(1):x[1])}
// change every number in a longer answer ("650; 326" -> "600; 301", "Spring 1912" -> "Spring 1909")
function allNumberFakes(a,rnd){if(!/\d/.test(a))return [];const out=new Set();const ks=[[.8,-3],[1.25,2],[.6,-8],[1.5,5]];
  for(const [k,yd] of ks){const f=String(a).replace(/\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?/g,m=>{const n=+m.replace(/,/g,"");if(n>=1700&&n<=2100&&Number.isInteger(n))return String(n+yd);const v=Math.round(n*k*100)/100;return (Number.isInteger(n)?Math.round(v):v).toLocaleString("en-GB")});if(f!==a)out.add(f)}
  return [...out].map(x=>[rnd(),x]).sort((p,q)=>p[0]-q[0]).map(x=>x[1])}
function numberFakes(a,rnd){const n=numIn(a);if(n==null)return [];const s=String(a);const dec=(String(n).split(".")[1]||"").length;
  const yr=n>=1700&&n<=2100&&Number.isInteger(n);
  const vals=yr?[n-3,n-1,n+2,n+5,n-10]:[...new Set([.5,.75,1.5,2,1.25,.8,3].map(k=>+(n*k).toFixed(dec)).concat(Number.isInteger(n)&&n<30?[n-2,n-1,n+1,n+2]:[]).filter(x=>x!==n&&x>=0))];
  return vals.map(v=>[rnd(),s.replace(/-?\d[\d,.]*/,(yr?v:v.toLocaleString("en-GB")))]).sort((a,b)=>a[0]-b[0]).map(x=>x[1])}
const who=q=>{const m=String(q).match(/·\s*([^:]+):/);return m?m[1].trim().toLowerCase():""};
function distractors(card,pool,k,rnd){rnd=rnd||Math.random;const qt=qtype(card.q),ka=kind(card.a),qa=words(card.q),aa=words(card.a),na=norm(card.a),la=String(card.a).length,wc=who(card.q);
  const seen=new Set([na]);const scored=[];
  pool.forEach(x=>{if(x===card||(x.q===card.q&&x.a===card.a))return;const nx=norm(x.a);if(!nx||seen.has(nx))return;
    if(nx.length>4&&(na.includes(nx)||nx.includes(na)))return; // so close it could also be right
    const xt=qtype(x.q);let s=0;
    if(xt===qt||((xt==="def"||xt==="term")&&(qt==="def"||qt==="term")))s+=6;else if((qt==="quote"&&xt==="stagedir")||(qt==="stagedir"&&xt==="quote"))s-=6;
    if(x.t===card.t)s+=2.5;const kx=kind(x.a);if(kx===ka)s+=3;else if(kx.slice(0,4)===ka.slice(0,4))s+=1.5;
    s+=3*jac(qa,words(x.q))+1.5*jac(aa,words(x.a));
    if(wc&&who(x.q)===wc)s+=1.5;
    s-=Math.abs(Math.log((String(x.a).length+4)/(la+4)))*2.2;
    s+=rnd()*1.2;scored.push([s,x.a,nx,xt===qt])});
  scored.sort((a,b)=>b[0]-a[0]);
  const out=[];
  const add=(arr,max)=>{for(const f of arr){if(out.length>=max)break;const nf=norm(f);if(nf&&!seen.has(nf)){seen.add(nf);out.push(f)}}};
  if(ka==="num")add(numberFakes(card.a,rnd),2);
  else if(WORDNUM.includes(norm(card.a)))add(wordNumFakes(card.a,rnd),3);
  else if((qt==="howmany"||qt==="when")&&/\d/.test(card.a))add(allNumberFakes(card.a,rnd),2);
  // not enough questions of the same type in this subject: use realistic fakes
  const sameType=scored.filter(x=>x[3]).length;
  if(qt==="unit"&&sameType<k&&/\(.{1,4}\)|^[a-z]{1,4}$/i.test(card.a))add(UNITS.map(x=>[rnd(),x]).sort((p,q)=>p[0]-q[0]).map(x=>x[1]),k);
  if(qt==="who"&&sameType<k&&/^[A-Z][\w\u00c0-\u024f]+( (and )?[A-Z][\w\u00c0-\u024f]+){0,2}$/.test(String(card.a).trim()))add(SCIENTISTS.map(x=>[rnd(),x]).sort((p,q)=>p[0]-q[0]).map(x=>x[1]),k);
  if(ka==="num"){ // numbers only: real figures from similar questions first, then made-up nearby figures
    for(const [,a,nx] of scored){if(out.length>=k)break;if(seen.has(nx)||kind(a)!=="num")continue;seen.add(nx);out.push(a)}
    add(numberFakes(card.a,rnd),k);}
  for(const [,a,nx] of scored){if(out.length>=k)break;if(seen.has(nx))continue;seen.add(nx);out.push(a)}
  return out}
// French words that are the same (or nearly) in English are free marks: leave them out of quizzes
function cognate(q,a){const deacc=w=>w.normalize("NFD").replace(/[\u0300-\u036f]/g,"");
  const fr=deacc(norm(String(q).replace(/\((m|f|mpl|fpl|pl|e)\)/gi,"")).replace(/^(le|la|les|l|un|une|des|du|de)\s+/,"").split(/\s*\/\s*/)[0].replace(/^(le|la|les|l|un|une)\s+/,""));
  if(!fr)return false;const stem=w=>w.replace(/(que|ie|ite|e|s|x)$/,"");
  return String(a).split(/\s*[,;\/]\s*/).some(alt=>{const en=deacc(norm(alt)).replace(/^(the|a|an|to)\s+/,"");if(!en)return false;
    if(fr===en||(fr.length>=4&&stem(fr)===stem(en)))return true;
    return fr.length>=5&&lev(fr,en)<=(en.length>=7?2:1)})}
const typable=a=>{const s=String(a).replace(/\(.*?\)/g,"").trim();return s.length<=28&&s.split(/\s+/).length<=4&&!/[;,=→]/.test(s)};
function lev(a,b){const m=a.length,n=b.length;if(!m)return n;if(!n)return m;let p=[...Array(n+1).keys()];
  for(let i=1;i<=m;i++){const c=[i];for(let j=1;j<=n;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=c}return p[n]}
function check(input,answer){const strip=s=>norm(s).replace(/\b(the|a|an|to)\b/g,"").replace(/\s+/g," ").trim();
  const alts=String(answer).replace(/\(.*?\)/g,"").split(/\s+\/\s+|\s+or\s+/).map(strip).filter(Boolean);const u=strip(input);if(!u)return {ok:false};
  const ni=numIn(input),na=numIn(answer);
  if(na!=null&&kind(answer)==="num")return {ok:ni!=null&&Math.abs(ni-na)<=Math.max(.011,Math.abs(na)*.005),exact:true};
  if(alts.includes(u))return {ok:true,exact:true};
  const raw=String(answer).replace(/\s+/g,"").toLowerCase();if(raw&&String(input).replace(/\s+/g,"").toLowerCase()===raw)return {ok:true,exact:true};
  for(const a of alts){const d=lev(u,a);if(d<=Math.max(1,Math.floor(a.length/6)))return {ok:true,exact:false,want:a}}
  return {ok:false}}
// a ready-made multiple-choice question from a card
function mcq(card,pool,rnd){rnd=rnd||Math.random;const o=[card.a,...distractors(card,pool,3,rnd)].map(x=>[rnd(),x]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);return {q:card.q,o,a:o.indexOf(card.a)}}
return {distractors,typable,check,kind,qtype,cognate,mcq}})();
/* ---- How you're doing on each topic: last 20 results per topic, from quizzes, flashcards and exam questions ---- */
const TPK="gcseasy-topics";
function topicStats(){try{return JSON.parse(localStorage.getItem(TPK)||"{}")||{}}catch(e){return {}}}
function topicResult(sid,t,score,src){if(!sid||!t)return;const v=typeof score==="boolean"?(score?1:0):Math.max(0,Math.min(1,+score||0));
  const all=topicStats(),s=all[sid]=all[sid]||{},r=s[t]=s[t]||{h:[],at:0};r.h.push(Math.round(v*100)/100);if(r.h.length>20)r.h=r.h.slice(-20);r.at=Date.now();
  const d=dkeyL();if(!s.__day||s.__day.d!==d)s.__day={d,cards:0,qs:0,t:{}};if(src==="card")s.__day.cards++;else s.__day.qs++;s.__day.t[t]=(s.__day.t[t]||0)+1;
  try{localStorage.setItem(TPK,JSON.stringify(all))}catch(e){}checkBadges()}
const mastery=r=>{const h=(r&&r.h)||[];return (h.reduce((a,b)=>a+b,0)+1)/(h.length+2)};
const topicName=(sid,t)=>((window.GCSE_TOPICS||{})[sid]||{})[t]||t;
function weakTopics(limit){const all=topicStats(),out=[];for(const sid in all)for(const t in all[sid]){if(t.startsWith("__"))continue;const r=all[sid][t];if((r.h||[]).length<3)continue;
    const m=mastery(r);if(m<.8)out.push({sid,t,m,n:r.h.length,at:r.at})}return out.sort((a,b)=>a.m-b.m||a.at-b.at).slice(0,limit||5)}
function todayCounts(sid){const s=topicStats()[sid];return s&&s.__day&&s.__day.d===dkeyL()?s.__day:{cards:0,qs:0,t:{}}}
/* ---- Badges: milestones worked out from what you've done; earned ones are kept with the date ---- */
const BGK="gcseasy-badges";
const BADGES=[
 ["streak3","On a roll","3-day streak","\ud83d\udd25",d=>[d.streak,3]],["streak7","One week strong","7-day streak","\ud83d\udd25",d=>[d.streak,7]],
 ["streak14","Fortnight focus","14-day streak","\u26a1",d=>[d.streak,14]],["streak30","Unstoppable","30-day streak","\ud83c\udfc6",d=>[d.streak,30]],
 ["xp100","Getting started","Earn 100 XP","\u2b50",d=>[d.xp,100]],["xp500","Rising star","Earn 500 XP","\ud83c\udf1f",d=>[d.xp,500]],
 ["xp1000","Revision pro","Earn 1,000 XP","\ud83d\udcab",d=>[d.xp,1000]],["xp5000","Legend","Earn 5,000 XP","\ud83d\udc51",d=>[d.xp,5000]],
 ["cards100","Card shark","Review 100 flashcards","\ud83c\udccf",d=>[d.cards,100]],["cards1000","Memory machine","Review 1,000 flashcards","\ud83e\udde0",d=>[d.cards,1000]],
 ["quiz50","Quiz whizz","50 quiz questions right","\u2705",d=>[d.quiz,50]],["exam50","Mark collector","Earn 50 exam marks","\ud83d\udcdd",d=>[d.exam,50]],
 ["daily5","Perfect day","Score 5/5 in a daily challenge","\ud83c\udfaf",d=>[d.perfect,1]],["daily10","Daily habit","Finish 10 daily challenges","\ud83d\udcc5",d=>[d.dailies,10]],
 ["master","Topic master","Get 90%+ on a topic (10+ answers)","\ud83c\udf93",d=>[d.master,1]],["subjects3","All-rounder","Practise 3 different subjects","\ud83c\udf0d",d=>[d.subjects,3]],
 ["classy","Team player","Join a class","\ud83e\udd1d",d=>[d.inClass,1]],["app","Pocket revision","Install the app","\ud83d\udcf1",d=>[d.app,1]]];
function badgeData(){const x=xpLedger(),cat=k=>Object.values(x.days).reduce((a,d)=>a+((d.cat||{})[k]||0),0);
  let dc={};try{dc=JSON.parse(localStorage.getItem("gcseasy-daily")||"{}")||{}}catch(e){}const done=Object.values(dc.done||{});
  const ts=topicStats();let master=0;const subs=new Set();for(const sid in ts)for(const t in ts[sid]){if(t.startsWith("__"))continue;subs.add(sid);const r=ts[sid][t];if((r.h||[]).length>=10&&mastery(r)>=.9)master=1}
  let st=0;try{st=myStats().streak}catch(e){}
  return {streak:st,xp:x.total,cards:cat("cards"),quiz:cat("quiz"),exam:cat("exam"),perfect:done.some(d=>d.score>=5)?1:0,dailies:done.length,master,subjects:subs.size,
    inClass:(me().groups||[]).length?1:0,app:standalone()?1:0}}
function earnedBadges(){try{return JSON.parse(localStorage.getItem(BGK)||"{}")||{}}catch(e){return {}}}
function badgeList(){const d=badgeData(),got=earnedBadges();return BADGES.map(([id,name,how,icon,f])=>{const [v,need]=f(d);return {id,name,how,icon,at:got[id]||null,v:Math.min(v,need),need}})}
let bgBusy=false;
function checkBadges(){if(bgBusy)return;bgBusy=true;setTimeout(()=>{bgBusy=false;try{const got=earnedBadges(),fresh=badgeList().filter(b=>!b.at&&b.v>=b.need);if(!fresh.length)return;
  fresh.forEach(b=>got[b.id]=Date.now());try{localStorage.setItem(BGK,JSON.stringify(got))}catch(e){}
  fresh.forEach((b,i)=>setTimeout(()=>badgeToast(b),i*2200));ev("badge",fresh.length);try{dispatchEvent(new CustomEvent("gcseasy:badges",{detail:fresh}))}catch(e){}clearTimeout(addXP._s);addXP._s=setTimeout(()=>lbSync(),3000)}catch(e){}},400)}
function badgeToast(b){const t=document.createElement("div");t.className="bgtoast";t.setAttribute("role","status");t.innerHTML=`<span class="bi">${b.icon}</span><span><small>Badge unlocked</small><b>${b.name}</b></span>`;
  document.body.appendChild(t);requestAnimationFrame(()=>t.classList.add("show"));setTimeout(()=>{t.classList.remove("show");setTimeout(()=>t.remove(),400)},3400)}
/* ---- Daily reminders (push notifications). Only sent if you haven't revised yet that day. ---- */
const RMK="gcseasy-reminder";
const TZ=(()=>{try{return Intl.DateTimeFormat().resolvedOptions().timeZone||"Europe/London"}catch(e){return "Europe/London"}})();
const reminders={
  supported:()=>"serviceWorker" in navigator&&"PushManager" in window&&"Notification" in window&&!!window.GCSEASY_VAPID&&!!API,
  needsInstall:()=>isIOS()&&!standalone(),
  get(){try{return JSON.parse(localStorage.getItem(RMK)||"null")}catch(e){return null}},
  async enable(hour){if(!reminders.supported())throw new Error(reminders.needsInstall()?"On iPhone, install the app first (Share \u2192 Add to Home Screen), then turn reminders on from the app.":"This browser can't show reminders.");
    const perm=await Notification.requestPermission();if(perm!=="granted")throw new Error("Notifications are blocked. Allow them for this site in your browser settings, then try again.");
    const reg=await navigator.serviceWorker.register("/sw.js");await navigator.serviceWorker.ready;
    const key=Uint8Array.from(atob(GCSEASY_VAPID.replace(/-/g,"+").replace(/_/g,"/")+"=".repeat((4-GCSEASY_VAPID.length%4)%4)),c=>c.charCodeAt(0));
    let sub=await reg.pushManager.getSubscription();if(!sub)sub=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:key});
    const r=await fetch(API+"/push/sub",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sub:sub.toJSON(),hour,tz:TZ})});const d=await r.json().catch(()=>({}));
    if(!r.ok)throw new Error(d.error||"Couldn't turn reminders on. Try again later.");
    try{origSetRM(JSON.stringify({id:d.id,hour}))}catch(e){}ev("reminderon");return d},
  async disable(){const cur=reminders.get();try{const reg=await navigator.serviceWorker.getRegistration();const sub=reg&&await reg.pushManager.getSubscription();if(sub)await sub.unsubscribe()}catch(e){}
    if(cur&&cur.id&&API)await fetch(API+"/push/off",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:cur.id})}).catch(()=>{});try{localStorage.removeItem(RMK)}catch(e){}},
  async test(){const cur=reminders.get();if(!cur||!cur.id)throw new Error("Turn reminders on first.");const r=await fetch(API+"/push/test",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:cur.id})});
    const d=await r.json().catch(()=>({}));if(!r.ok){if(d.code==="gone"){try{localStorage.removeItem(RMK)}catch(e){}}throw new Error(d.error||"Couldn't send a test.")}return true},
  seen(){const cur=reminders.get();if(!cur||!cur.id||!API)return;const d=dkeyL();if(cur.seen===d)return;cur.seen=d;try{origSetRM(JSON.stringify(cur))}catch(e){}
    fetch(API+"/push/seen",{method:"POST",keepalive:true,headers:{"Content-Type":"application/json"},body:JSON.stringify({id:cur.id,tz:TZ})}).catch(()=>{})}};
const origSetRM=v=>localStorage.setItem(RMK,v);
/* ---- AI quota: "3 of 40 used today · resets at 1:00am" on any element with class aiquota ---- */
let QUOTA=null;
const resetTime=()=>{const t=QUOTA&&QUOTA.resetsAt?new Date(QUOTA.resetsAt):(()=>{const d=new Date();d.setUTCHours(24,0,0,0);return d})();return t.toLocaleTimeString("en-GB",{hour:"numeric",minute:"2-digit",hour12:true}).replace(" ","").replace(":00","")};
function quotaText(){if(!QUOTA)return "";if(QUOTA.signin)return "AI marking: make a free account to get 40 marks a day.";const left=Math.max(0,QUOTA.limit-QUOTA.used);
  if(QUOTA.siteUsed!=null&&QUOTA.siteUsed>=QUOTA.siteLimit)return `The free AI has hit today's limit for the whole site. It resets at ${resetTime()}.`;
  return left?`AI marking: ${QUOTA.used} of ${QUOTA.limit} used today · resets at ${resetTime()}`:`You've used all ${QUOTA.limit} AI marks today. They reset at ${resetTime()}.`}
function setQuota(d){QUOTA=Object.assign(QUOTA||{},d);drawQuota()}
function drawQuota(){const t=quotaText();document.querySelectorAll(".aiquota").forEach(el=>{el.textContent=t;el.hidden=!t;el.classList.toggle("out",!!QUOTA&&QUOTA.used>=QUOTA.limit)})}
async function loadQuota(){if(!API||(window.claude&&window.claude.use))return;try{const r=await fetch(API+"/ai/usage",{headers:await authH()});if(r.ok){const d=await r.json();QUOTA=null;setQuota(Object.assign({signin:false},d))}}catch(e){}}
function aiLimitMsg(){return `You've used all ${QUOTA?QUOTA.limit:40} AI marks today. They reset at ${resetTime()}. Use the mark scheme for now.`}
/* ---- class leaderboards (server only) ---- */
const LBK="gcseasy-me";
function me(){let m=null;try{m=JSON.parse(localStorage.getItem(LBK)||"null")}catch(e){}if(!m||!m.id){m={id:(crypto.randomUUID?crypto.randomUUID():String(Math.random()).slice(2)+Date.now()),name:"",groups:[]};try{localStorage.setItem(LBK,JSON.stringify(m))}catch(e){}}return m}
function saveMe(m){try{localStorage.setItem(LBK,JSON.stringify(m))}catch(e){}}
async function lbCall(path,body){if(!API)throw {code:"no_server"};const h=await authH();const r=await fetch(API+path,body?{method:"POST",headers:Object.assign({"Content-Type":"application/json"},h),body:JSON.stringify(body)}:{headers:h});const d=await r.json().catch(()=>({}));
  if(!r.ok){if((d.code==="signin"||d.code==="verify")&&window.GCSEasyAuth)GCSEasyAuth.open(d.code==="verify"?"verify":"classes");throw {code:d.code||"error",message:d.error}}return d}
function myStats(){const L=getLog(),t=dayStart();const days=new Set(L.map(x=>{const d=new Date(x.s);d.setHours(0,0,0,0);return d.getTime()}));
  let dc={};try{dc=JSON.parse(localStorage.getItem("gcseasy-daily")||"{}")||{}}catch(e){}
  Object.keys(dc.done||{}).forEach(k=>days.add(new Date(k+"T00:00:00").getTime()));
  let streak=0,d=t;if(!days.has(d))d-=864e5;while(days.has(d)){streak++;d-=864e5}
  const mins=Math.round(L.filter(x=>x.s>=t-6*864e5).reduce((a,x)=>a+(x.d!=null?x.d:x.e-x.s),0)/60000);
  const td=new Date().toISOString().slice(0,10);const today=dc.done&&dc.done[td];
  const xs=xpStats(),xl=xpLedger(),dys={};
  for(let i=59;i>=0;i--){const dt=new Date(Date.now()-i*864e5),k=dt.getFullYear()+"-"+String(dt.getMonth()+1).padStart(2,"0")+"-"+String(dt.getDate()).padStart(2,"0");const v=xl.days[k];const dd=dc.done&&(dc.done[k]||dc.done[dt.toISOString().slice(0,10)]);
    if(v||dd)dys[k]=[(v&&v.pts)||0,(v&&v.cat.cards)||0,(v&&v.cat.quiz)||0,(v&&v.cat.exam)||0,dd?1:0]}
  return {streak,mins:xs.week,daily:today?{date:td,score:today.score,of:today.of}:null,cards:xs.total,badges:Object.keys(earnedBadges()).length,days:dys}}
async function lbSync(force){const m=me();if(!API||!m.name||!m.groups.length)return;const st=myStats();const sig=JSON.stringify([m.name,m.groups,st]);
  let last={};try{last=JSON.parse(localStorage.getItem("gcseasy-lbsent")||"{}")}catch(e){}
  if(!force&&last.sig===sig&&Date.now()-(last.t||0)<6*3600e3)return;
  for(const g of m.groups){try{await lbCall("/lb/score",{code:g,id:m.id,name:m.name,stats:st})}catch(e){}}
  try{localStorage.setItem("gcseasy-lbsent",JSON.stringify({sig,t:Date.now()}))}catch(e){}}
/* ---- anonymous page-view count for the owner dashboard (no cookies; the visitor ID changes every day) ---- */
function hit(){if(!API||!/^https?:$/.test(location.protocol)||/^(localhost|127\.)/.test(location.hostname))return;
  let nv=0;try{if(!localStorage.getItem("gcseasy-seen")){nv=1;localStorage.setItem("gcseasy-seen","1")}}catch(e){}
  try{fetch(API+"/hit",{method:"POST",keepalive:true,headers:{"Content-Type":"application/json"},body:JSON.stringify({p:location.pathname,r:document.referrer,s:!!(window.GCSEasyAuth&&GCSEasyAuth.user()),a:standalone(),n:nv})}).catch(()=>{})}catch(e){}}
/* ---- activity counts for the owner dashboard: just "3 quizzes, 12 cards" per visit, nothing personal ---- */
let EV={},evT=null;
function ev(name,n){if(!API)return;EV[name]=(EV[name]||0)+(n||1);clearTimeout(evT);evT=setTimeout(flushEv,15000)}
function flushEv(){if(!Object.keys(EV).length||!/^https?:$/.test(location.protocol)||/^(localhost|127\.)/.test(location.hostname)){EV={};return}const c=EV;EV={};clearTimeout(evT);
  try{fetch(API+"/ev",{method:"POST",keepalive:true,headers:{"Content-Type":"application/json"},body:JSON.stringify({c,s:!!(window.GCSEasyAuth&&GCSEasyAuth.user())})}).catch(()=>{})}catch(e){}}
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden")flushEv()});
/* ---- installable app: offline copy + home-screen icon ---- */
let installEvt=null;
const standalone=()=>matchMedia("(display-mode: standalone)").matches||navigator.standalone===true;
const isIOS=()=>/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
function paintInstall(){document.querySelectorAll("[data-install]").forEach(el=>{const mode=standalone()?"done":installEvt?"prompt":isIOS()?"ios":"manual";el.dataset.mode=mode;el.hidden=mode==="done"})}
async function install(){if(installEvt){installEvt.prompt();try{await installEvt.userChoice}catch(e){}installEvt=null;paintInstall();return "prompted"}return isIOS()?"ios":"manual"}
addEventListener("beforeinstallprompt",e=>{e.preventDefault();installEvt=e;paintInstall()});
addEventListener("appinstalled",()=>{installEvt=null;paintInstall();ev("install");flushEv()});
/* "Get the app" button in the header */
const DL='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/></svg>';
function installHelp(kind){let p=document.getElementById("apppop");if(!p){p=document.createElement("div");p.id="apppop";p.className="apppop";p.setAttribute("role","dialog");p.setAttribute("aria-label","Install the app");document.body.appendChild(p);
    document.addEventListener("click",e=>{if(!p.hidden&&!p.contains(e.target)&&!e.target.closest("#appbtnh,#appbtn"))p.hidden=true});document.addEventListener("keydown",e=>{if(e.key==="Escape")p.hidden=true})}
  p.innerHTML=`<button type="button" class="apx" aria-label="Close">\u2715</button><b>Install GCSEasy</b>`+(kind==="ios"?`<ol><li>Open this page in <b>Safari</b>.</li><li>Tap <b>Share</b> (the square with an arrow).</li><li>Tap <b>Add to Home Screen</b>.</li></ol>`
    :`<ol><li>Open the browser menu (<b>\u22ee</b> in Chrome or Edge).</li><li>Choose <b>Install app</b>, <b>Install GCSEasy</b> or <b>Add to Home screen</b>.</li></ol><p>On some school computers installing is switched off. You can still use the website.</p>`);
  p.querySelector(".apx").onclick=()=>p.hidden=true;p.hidden=false}
function setupInstallBtn(){const nav=document.querySelector(".sitenav");if(!nav||document.getElementById("appbtnh"))return;
  const b=document.createElement("button");b.type="button";b.id="appbtnh";b.className="appbtnh";b.setAttribute("data-install","");b.innerHTML=DL+'<span class="l">Get the app</span><span class="s">App</span>';
  b.onclick=async()=>{ev("installclick");const r=await install();if(r!=="prompted")installHelp(r)};
  nav.insertBefore(b,nav.querySelector("#accbtn, #tbtn, .themebtn"));paintInstall()}
function setupSW(){if("serviceWorker" in navigator&&location.protocol==="https:")navigator.serviceWorker.register("/sw.js").catch(()=>{})}
/* subject tab rows: arrows + fade when tabs are hidden off the edge, and keep the chosen tab in view */
function setupTabScroll(){document.querySelectorAll("nav.tabs").forEach(nav=>{if(nav.parentElement.classList.contains("tabwrap"))return;
  const w=document.createElement("div");w.className="tabwrap";nav.before(w);w.appendChild(nav);
  const mk=(side,ch)=>{const b=document.createElement("button");b.type="button";b.className="tabmore "+side;b.setAttribute("aria-label",side==="r"?"More tabs":"Previous tabs");b.innerHTML=`<span aria-hidden="true">${ch}</span>`;
    b.onclick=()=>nav.scrollBy({left:(side==="r"?1:-1)*nav.clientWidth*.7,behavior:"smooth"});w.appendChild(b)};mk("r","\u203a");mk("l","\u2039");
  const upd=()=>{w.classList.toggle("canr",nav.scrollLeft+nav.clientWidth<nav.scrollWidth-4);w.classList.toggle("canl",nav.scrollLeft>4)};
  nav.addEventListener("scroll",upd,{passive:true});addEventListener("resize",upd);
  nav.addEventListener("click",e=>{const b=e.target.closest("button");if(b)b.scrollIntoView({inline:"center",block:"nearest",behavior:"smooth"})});
  setTimeout(upd,50);upd()})}

/* desktop layout: tabs + "on this page" in a sticky sidebar, content on the right. On phones the wrappers use display:contents so nothing changes. */
function setupLayout(){const tw=document.querySelector(".wrap > .tabwrap");if(!tw||document.querySelector(".sublayout"))return;
  const wrap=tw.parentElement;wrap.classList.add("haslayout");document.body.classList.add("haslay");
  const lay=document.createElement("div");lay.className="sublayout";const side=document.createElement("aside");side.className="subside";const main=document.createElement("div");main.className="submain";
  tw.before(lay);lay.append(side,main);const psw=wrap.querySelector(":scope > .papersw");if(psw)side.appendChild(psw);side.appendChild(tw);
  let n=lay.nextSibling;while(n){const nx=n.nextSibling;if(!(n.nodeType===1&&/^(SCRIPT|FOOTER)$/.test(n.tagName)))main.appendChild(n);n=nx}
  const toc=document.createElement("nav");toc.className="subtoc";toc.setAttribute("aria-label","On this page");side.appendChild(toc);
  let io=null;
  const lab=s=>{const sm=s.querySelector(".th .tile small"),h=s.querySelector("h2");const code=sm?sm.textContent.trim():"";const t=h?h.textContent.trim():s.id;return (code&&code.length>1&&!t.startsWith(code)?`<i>${code}</i>`:"")+`<span>${t.replace(/</g,"&lt;")}</span>`};
  const build=()=>{const pan=[...main.querySelectorAll(':scope > div[id^="p-"]')].find(x=>!x.hidden);if(io){io.disconnect();io=null}
    const items=pan?[...pan.querySelectorAll("h2.ptitle, section.topic[id]")].filter(x=>!x.hidden&&x.offsetParent!==null):[];
    const secs=items.filter(x=>x.matches("section"));if(secs.length<2){toc.innerHTML="";return}
    let html=`<p class="tochd">On this page</p>`;if(items[0].matches("section")&&items.some(x=>x.matches("h2.ptitle")))html+=`<p class="tocgrp">Paper 1</p>`;
    items.forEach(x=>{if(x.matches("h2.ptitle"))html+=`<p class="tocgrp">${x.textContent.split("·")[0].trim()}</p>`;else html+=`<a href="#${x.id}" data-id="${x.id}">${lab(x)}</a>`});
    toc.innerHTML=html;
    toc.querySelectorAll("a").forEach(a=>a.onclick=e=>{e.preventDefault();const s=document.getElementById(a.dataset.id);if(!s)return;if(s.classList.contains("acc")&&!s.classList.contains("open")){const th=s.querySelector(".th");if(th)th.click()}s.scrollIntoView({behavior:"smooth",block:"start"})});
    if("IntersectionObserver" in window){io=new IntersectionObserver(es=>{es.forEach(en=>{if(en.isIntersecting){toc.querySelectorAll("a").forEach(a=>a.classList.toggle("on",a.dataset.id===en.target.id))}})},{rootMargin:"-20% 0px -70% 0px"});secs.forEach(s=>io.observe(s))}};
  const mo=new MutationObserver(()=>setTimeout(build,20));main.querySelectorAll(':scope > div[id^="p-"]').forEach(p=>mo.observe(p,{attributes:true,attributeFilter:["hidden"]}));
  setTimeout(build,60);addEventListener("load",()=>setTimeout(build,100))}

/* formulas: one clear pill per formula, real fractions for "a ÷ b", notes in small grey text */
const FX=(()=>{const SEP=/(?:\s|&nbsp;)*[·|](?:\s|&nbsp;)+|(?:&nbsp;){2,}(?!\s*\()/
function top(s){let d=0,o="";for(const ch of s.replace(/<[^>]+>/g,"")){if(ch==="(")d++;else if(ch===")")d--;else if(!d)o+=ch}return o}
function frac(side){const t0=side.trim();{const m=t0.match(/^\(([^()]*÷[^()]*)\)\s*×\s*(.+)$/);if(m){const f=frac(m[1]);if(f)return f+" × "+m[2]}}const t=t0;const parts=[];let d=0,cur="";const segs=t.split(/(<[^>]+>)/);
  // split on top-level ÷ ignoring tags
  let depth=0,idx=[];for(let i=0;i<t.length;i++){const c=t[i];if(c==="<"){i=t.indexOf(">",i);continue}if(c==="(")depth++;else if(c===")")depth--;else if(c==="÷"&&!depth)idx.push(i)}
  if(idx.length!==1)return null;const N=t.slice(0,idx[0]).trim(),D=t.slice(idx[0]+1).trim();if(!N||!D)return null;
  let D0=D,rest="";{let dp=0;for(let i=0;i<D.length;i++){const c=D[i];if(c==="<"){i=D.indexOf(">",i);continue}if(c==="(")dp++;else if(c===")")dp--;else if(c==="×"&&!dp){D0=D.slice(0,i).trim();rest=D.slice(i).trim();break}}}
  const tn=top(N),td=top(D0);if(/[÷=,;]|\s[+−-]\s/.test(tn)||/\b(max|min) of\b/i.test(N))return null;if(!D0||/[×÷=+−,;]|\s-\s/.test(td))return null;
  const un=x=>/^\((.*)\)$/.test(x)&&top(x)===""?x.slice(1,-1):x;
  return `<span class="fr" role="math" aria-label="${(N+" divided by "+D0).replace(/<[^>]+>/g,"").replace(/"/g,"")}"><span>${un(N)}</span><span>${un(D0)}</span></span>${rest?" "+rest:""}`}
function piece(p){const isF=/[=÷×→]|<su[bp]>|²|³/.test(p);if(!isF)return `<span class="fxt">${p}</span>`;let note="";const m=p.match(/^(.*?)(?:&nbsp;|\s)+(\((?:[^()]|\([^()]*\))*\))\s*$/);if(m&&(/&nbsp;\s*\($/.test(p.slice(0,p.length-m[2].length).trimEnd()+"(")||/[a-z]{3,}/i.test(m[2].replace(/<[^>]+>/g,"")))){p=m[1];note=m[2]}
  const sides=p.split(/\s=\s/);const out=sides.map(s=>frac(s)||s.trim());
  return `<span class="fx">${out.join(' <span class="eq">=</span> ')}${note?` <span class="fxn">${note}</span>`:""}</span>`}
function fmt(html){if(/<(table|div|ul|ol|p)\b/i.test(html))return null;const ps=html.split(SEP).map(x=>x.trim()).filter(Boolean);return ps.map(piece).join("")}
return fmt})();
function setupFormulas(){document.querySelectorAll(".formula,.eqs b,.ftbl td:nth-child(2)").forEach(el=>{if(el.dataset.fx)return;el.dataset.fx=1;const out=FX(el.innerHTML);if(out)el.innerHTML=out;el.classList.add("fxhost")})}
function boot(){setupFormulas();setTimeout(checkBadges,2500);setupTabScroll();setupLayout();setupToggle();setupPapers();setupTimer();setupInstallBtn();setupBotnav();setTimeout(lbSync,1500);loadQuota();hit();setupSW();paintInstall();
  if(window.GCSEasyAuth&&GCSEasyAuth.enabled){let was=!!GCSEasyAuth.user();GCSEasyAuth.onChange(u=>{if(!!u!==was){was=!!u;loadQuota()}})}}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();
window.GCSEasy={QG,reminders,badgeList,checkBadges,topicStats,topicResult,mastery,weakTopics,todayCounts,topicName,ev,installHelp,install,standalone,isIOS,authH,SUBJECTS,CATS,progress,report,AQA,PAPERS,getLog,setLog,getRun,nameOf,fmt,getGoal,setGoal,elapsed,todayMs,aiClient,parseJSON,API,drawQuota,aiLimitMsg,me,saveMe,lbCall,lbSync,myStats,addXP,xpStats};
})();
