/* Year 11 Revision: shared study engine.
   A subject page calls Study.init({key, topics, cards, sets, figs, drill}).
   Part kinds: m = tick one box, n = numeric, f = several numeric fields,
   w = written (self-marked), L = levels-marked extended answer. */
window.Study=(function(){
let C,KEY,state={};
const $=id=>document.getElementById(id);
function load(){try{state=JSON.parse(localStorage.getItem(KEY)||"{}")||{}}catch(e){state={}}
  state.m=state.m||{};state.a=state.a||{};state.txt=state.txt||{};state.ai=state.ai||{};if(state.learn==null)state.learn=true;state.dr=state.dr||{r:0,t:0}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){}}
function chipRow(el,items,cur,cb){el.innerHTML="";items.forEach(([k,l])=>{const b=document.createElement("button");b.className="chip"+(k===cur?" on":"");b.textContent=l;b.onclick=()=>cb(k);el.appendChild(b)})}
function topicItems(){return [["All","All"],...(C.groups||[]).map((g,i)=>["@"+i,g[0]]),...Object.keys(C.topics).map(k=>[k,k])]}
const inTopic=(sel,k)=>sel==="All"||sel===k||(sel[0]==="@"&&C.groups[+sel.slice(1)][1].includes(k));
const tlab=k=>k===C.topics[k]?k:k+" "+C.topics[k];
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}

/* tabs */
function setupTabs(){
  const tabs=[...document.querySelectorAll("nav.tabs button")],ids=tabs.map(b=>b.dataset.p);
  function show(p,scroll){tabs.forEach(b=>b.setAttribute("aria-selected",b.dataset.p===p));ids.forEach(x=>$("p-"+x).hidden=x!==p);if(scroll)window.scrollTo(0,0);try{localStorage.setItem(KEY+"-tab",p)}catch(e){}}
  tabs.forEach(b=>b.onclick=()=>show(b.dataset.p,true));
  let t=null;try{t=localStorage.getItem(KEY+"-tab")}catch(e){}
  const h=location.hash.slice(1);if(ids.includes(h))t=h;
  if(t&&ids.includes(t))show(t,false);
}
/* Revise topics become cards you open and close. Open ones are remembered. */
function setupAccordion(){const rev=$("p-rev");if(!rev)return;const secs=[...rev.querySelectorAll("section.topic")];if(!secs.length)return;
  let open=null;try{open=JSON.parse(localStorage.getItem(KEY+"-open")||"null")}catch(e){}
  if(!Array.isArray(open))open=[secs[0].id];
  const keep=()=>{try{localStorage.setItem(KEY+"-open",JSON.stringify(secs.filter(x=>x.classList.contains("open")).map(x=>x.id)))}catch(e){}};
  secs.forEach(sec=>{const th=sec.querySelector(".th");if(!th)return;sec.classList.add("acc");
    const body=document.createElement("div");body.className="tbody";[...sec.children].filter(n=>n!==th).forEach(n=>body.appendChild(n));sec.appendChild(body);
    th.setAttribute("role","button");th.tabIndex=0;const set=o=>{sec.classList.toggle("open",o);th.setAttribute("aria-expanded",o)};set(open.includes(sec.id));
    const tog=()=>{set(!sec.classList.contains("open"));keep()};th.onclick=tog;th.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();tog()}}});
  const bar=document.createElement("div");bar.className="revtools";bar.innerHTML=`<span>Tap a topic to open it</span><button class="linkbtn" type="button" id="revall"></button>`;
  secs[0].before(bar);const lab=()=>{$("revall").textContent=secs.every(x=>x.classList.contains("open"))?"Close all":"Open all"};lab();
  $("revall").onclick=()=>{const all=!secs.every(x=>x.classList.contains("open"));secs.forEach(x=>{x.classList.toggle("open",all);x.querySelector(".th")?.setAttribute("aria-expanded",all)});keep();lab()};
  rev.addEventListener("click",e=>{if(e.target.closest(".th"))lab()})}
/* ---- Topic quizzes: read a topic, then quiz yourself on it (or on several at once) ---- */
function quizPool(tops){const out=[];const strip=h=>{const d=document.createElement("div");d.innerHTML=h;return d.textContent.trim()};
  const cards=C.cards.filter(c=>tops.includes(c[0]));
  cards.forEach(c=>{let wrong=shuffle(C.cards.filter(x=>x[0]===c[0]&&x[2]!==c[2]).map(x=>x[2]));
    if(wrong.length<3)wrong=wrong.concat(shuffle(C.cards.filter(x=>x[2]!==c[2]&&!wrong.includes(x[2])).map(x=>x[2])));
    const o=shuffle([c[2],...[...new Set(wrong)].slice(0,3)]);out.push({t:c[0],q:c[1],o,a:o.indexOf(c[2]),ex:""})});
  C.sets.forEach(set=>set.qs.forEach(Q=>Q.parts.forEach(p=>{const t=p.t||Q.t;if(p.k!=="m"||!tops.includes(t)||p.fig||p.data)return;if(/figure|graph|table|diagram|shown|extract|source/i.test(strip(p.q)))return;
    out.push({t,q:p.q,o:p.o,a:p.a,ex:p.ex||""})})));
  return out}
let QZ=null;
function openQuiz(preset){let sheet=$("qzsheet");if(!sheet){sheet=document.createElement("div");sheet.id="qzsheet";sheet.className="qzsheet";sheet.setAttribute("role","dialog");sheet.setAttribute("aria-modal","true");sheet.setAttribute("aria-label","Topic quiz");document.body.appendChild(sheet)}
  sheet.hidden=false;document.body.classList.add("qzopen");
  const keys=Object.keys(C.topics).filter(k=>C.cards.some(c=>c[0]===k));
  let sel=preset&&preset.length?preset.slice():keys.slice();let len=10;
  const close=()=>{sheet.hidden=true;document.body.classList.remove("qzopen");QZ=null};
  const top=(title)=>`<div class="qzbar"><b>${title}</b><button type="button" class="qzx" id="qzx" aria-label="Close quiz">✕</button></div>`;
  function setup(){const n=quizPool(sel).length;
    sheet.innerHTML=top("Quiz me")+`<div class="qzin"><p class="qzlab">Choose topics</p>${(C.groups||[["",keys]]).map(([lab,gk],gi)=>{gk=gk.filter(k=>keys.includes(k));if(!gk.length)return"";const allOn=gk.every(k=>sel.includes(k));return `${lab?`<div class="qzgh"><span>${lab}</span><button type="button" class="linkbtn" data-g="${gi}">${allOn?"Clear":"Select all"} ${lab}</button></div>`:""}<div class="qzchips">${gk.map(k=>`<button type="button" class="chip${sel.includes(k)?" on":""}" data-k="${k}" aria-pressed="${sel.includes(k)}">${tlab(k)}</button>`).join("")}</div>`}).join("")}
      <div class="qzrow"><button type="button" class="linkbtn" id="qzall">${sel.length===keys.length?"Clear all":"Select all"}</button><span>${n} questions available</span></div>
      <p class="qzlab">How many questions?</p><div class="qzchips">${[5,10,20].map(x=>`<button type="button" class="chip${x===len?" on":""}" data-len="${x}">${x}</button>`).join("")}</div>
      <button type="button" class="btn p qzgo" id="qzgo"${n?"":" disabled"}>Start quiz</button></div>`;
    $("qzx").onclick=close;
    sheet.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>{const k=b.dataset.k;sel=sel.includes(k)?sel.filter(x=>x!==k):[...sel,k];setup()});
    sheet.querySelectorAll("[data-g]").forEach(b=>b.onclick=()=>{const gk=C.groups[+b.dataset.g][1].filter(k=>keys.includes(k));const allOn=gk.every(k=>sel.includes(k));sel=allOn?sel.filter(k=>!gk.includes(k)):[...new Set([...sel,...gk])];setup()});
    sheet.querySelectorAll("[data-len]").forEach(b=>b.onclick=()=>{len=+b.dataset.len;setup()});
    $("qzall").onclick=()=>{sel=sel.length===keys.length?[]:keys.slice();setup()};
    $("qzgo").onclick=()=>start(shuffle(quizPool(sel)).slice(0,len))}
  function start(items){QZ={items,i:0,ans:[]};step()}
  function step(){const q=QZ.items[QZ.i];const label=sel.length===1?(sel[0]===C.topics[sel[0]]?sel[0]:sel[0]+" "+C.topics[sel[0]]):`${sel.length} topics`;
    sheet.innerHTML=top(label)+`<div class="qzin"><div class="qzdots">${QZ.items.map((_,k)=>`<i class="${k<QZ.i?(QZ.ans[k]===QZ.items[k].a?"ok":"no"):k===QZ.i?"now":""}"></i>`).join("")}</div>
      <p class="qzmeta">Question ${QZ.i+1} of ${QZ.items.length} · ${q.t}</p><p class="qzq">${q.q}</p><div class="opts">${q.o.map((o,k)=>`<button class="opt" data-j="${k}">${o}</button>`).join("")}</div><div id="qzfb"></div></div>`;
    $("qzx").onclick=close;
    sheet.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{const j=+b.dataset.j;QZ.ans[QZ.i]=j;sheet.querySelectorAll(".opt").forEach((x,k)=>{x.disabled=true;if(k===q.a)x.classList.add("right");else if(k===j)x.classList.add("wrong")});
      const ok=j===q.a,last=QZ.i>=QZ.items.length-1;if(ok&&window.GCSEasy)GCSEasy.addXP(1,"quiz",60);$("qzfb").innerHTML=`<div class="fb ${ok?"ok":"no"}">${ok?"Correct":"Not quite"}</div>${q.ex?`<div class="panel ms">${q.ex}</div>`:""}<button type="button" class="btn p qzgo" id="qznext">${last?"See my score":"Next"}</button>`;
      $("qznext").onclick=()=>{if(last)end();else{QZ.i++;step()}};$("qznext").focus({preventScroll:true})});
    sheet.scrollTop=0}
  function end(){const it=QZ.items,got=it.filter((q,k)=>QZ.ans[k]===q.a).length,per={};it.forEach((q,k)=>{per[q.t]=per[q.t]||{g:0,n:0};per[q.t].n++;if(QZ.ans[k]===q.a)per[q.t].g++});
    const wrong=it.filter((q,k)=>QZ.ans[k]!==q.a);
    sheet.innerHTML=top("Your score")+`<div class="qzin"><p class="qzbig">${got} / ${it.length}</p><p class="qzmeta">${got===it.length?"Perfect. Try a different topic or more questions.":got/it.length>=.7?"Good work. Go over the ones you missed below.":"Reread the topic notes, then try again."}</p>
      <div class="bars">${Object.entries(per).map(([k,v])=>{const pc=Math.round(v.g/v.n*100);return `<div class="bar"><span>${k}</span><span class="tr"><i class="${pc<50?"lo":pc>=75?"hi":""}" style="width:${pc}%"></i></span><span>${v.g}/${v.n}</span></div>`}).join("")}</div>
      ${wrong.length?`<p class="qzlab" style="margin-top:16px">Ones to learn</p><div class="qzwrong">${wrong.map(q=>`<div><b>${q.q}</b><span>${q.o[q.a]}</span></div>`).join("")}</div>`:""}
      <div class="qzrow2">${wrong.length?`<button type="button" class="btn p" id="qzretry">Retry the ${wrong.length} I got wrong</button>`:""}<button type="button" class="btn" id="qznew">New quiz</button></div></div>`;
    $("qzx").onclick=close;if($("qzretry"))$("qzretry").onclick=()=>start(shuffle(wrong.map(q=>Object.assign({},q))));$("qznew").onclick=setup;sheet.scrollTop=0}
  sheet.onkeydown=e=>{if(e.key==="Escape")close()};
  if(preset&&preset.length)start(shuffle(quizPool(sel)).slice(0,len));else setup();$("qzx").focus({preventScroll:true})}
function setupTopicQuiz(){const rev=$("p-rev");if(!rev||!C.cards.length)return;
  rev.querySelectorAll("section.topic").forEach(sec=>{const k=sec.id;if(!C.topics[k]||!C.cards.some(c=>c[0]===k))return;const host=sec.querySelector(".tbody")||sec;
    const b=document.createElement("button");b.type="button";b.className="btn p qzbtn";b.textContent="Quiz me on "+(k===C.topics[k]?k:C.topics[k]);b.onclick=()=>openQuiz([k]);host.appendChild(b)});
  const bar=rev.querySelector(".revtools");const b=document.createElement("button");b.type="button";b.className="qzopenbtn";b.textContent="Quiz me";b.onclick=()=>openQuiz();
  if(bar)bar.prepend(b);else{const d=document.createElement("div");d.className="revtools";d.appendChild(b);rev.prepend(d)}}
function setupJump(){const el=$("jump");if(!el)return;
  const mk=(host,k)=>{const b=document.createElement("button");b.className="chip";b.textContent=tlab(k);b.onclick=()=>{const s=$(k);if(s){if(s.classList.contains("acc")&&!s.classList.contains("open"))s.querySelector(".th").click();s.scrollIntoView({behavior:"smooth"})}};host.appendChild(b)};
  if(C.groups){el.classList.add("cgroups");C.groups.forEach(([lab,ks])=>{const g=document.createElement("div");g.className="cgroup";g.innerHTML=`<span class="cglab">${lab}</span>`;const r=document.createElement("div");r.className="chips";ks.forEach(k=>mk(r,k));g.appendChild(r);el.appendChild(g)})}
  else Object.keys(C.topics).forEach(k=>mk(el,k))}

/* flashcards */
let fcTopic="All",deck=[],idx=0,flipped=false;
/* Flashcards with spaced repetition: "Got it" pushes a card further into the future
   (1, 3, 7, 16, 35 days); "Again" brings it back now. "Due" shows only what needs reviewing today. */
const GAPS=[0,1,3,7,16,35];
const ckey=c=>c[0]+"|"+String(c[1]).slice(0,60);
function setupCards(){
  const card=$("card");if(!card)return;state.srs=state.srs||{};if(!state.fcMode)state.fcMode="due";
  const mrow=document.createElement("div");mrow.className="chips";mrow.id="fcm";$("fcf").before(mrow);
  const prog=document.createElement("div");prog.className="fcprog";$("card").before(prog);
  const now=()=>Date.now(),isDue=c=>{const r=state.srs[ckey(c)];return !r||r.due<=now()};
  const pool=()=>C.cards.filter(c=>inTopic(fcTopic,c[0]));
  const build=()=>{let d=pool();if(state.fcMode==="due")d=d.filter(isDue);deck=shuffle(d);idx=0;flipped=false;render()};
  const render=()=>{
    const p=pool(),due=p.filter(isDue).length,known=p.filter(c=>(state.srs[ckey(c)]||{}).b>=3).length;
    chipRow(mrow,[["due",`Due now (${due})`],["all","All cards"]],state.fcMode,k=>{state.fcMode=k;save();build()});
    chipRow($("fcf"),topicItems(),fcTopic,k=>{fcTopic=k;build()});
    prog.innerHTML=`<div class="fcbar"><i style="width:${p.length?known/p.length*100:0}%"></i></div><span>${known} of ${p.length} cards learned</span>`;
    const pos=$("fcpos"),left=$("fcleft");
    if(!deck.length){card.className="card";card.innerHTML=state.fcMode==="due"?'<div class="lab">All caught up</div><div class="q">Nothing due right now.</div><div class="a">Cards come back when you\'re about to forget them. Switch to "All cards" to keep going.</div>':'<div class="lab">Done</div><div class="q">Deck cleared.</div><div class="a">Tap "Shuffle &amp; restart" to go again.</div>';pos.textContent="";left.textContent="0 left";return}
    const c=deck[idx];pos.textContent=c[0]===C.topics[c[0]]?c[0]:c[0]+" · "+C.topics[c[0]];left.textContent=deck.length+" left";
    card.className="card"+(flipped?" flipped":"");
    card.innerHTML=flipped?`<div class="lab">Answer</div><div class="a">${c[2]}</div>`:`<div class="lab">Question · tap to flip</div><div class="q">${c[1]}</div>`};
  const mark=ok=>{if(!deck.length)return;const c=deck[idx],k=ckey(c),r=state.srs[k]||{b:0,due:0};
    const wasDue=r.due<=now();if(ok){r.b=Math.min(r.b+1,GAPS.length-1);r.due=now()+GAPS[r.b]*864e5;deck.splice(idx,1);if(wasDue&&window.GCSEasy)GCSEasy.addXP(1,"cards",150)}else{r.b=0;r.due=now();deck.push(deck.splice(idx,1)[0])}
    state.srs[k]=r;save();if(idx>=deck.length)idx=0;flipped=false;render()};
  card.onclick=()=>{if(!deck.length)return;flipped=!flipped;render()};
  $("fcgot").onclick=()=>mark(true);$("fcagain").onclick=()=>mark(false);
  $("fcshuf").onclick=build;
  document.addEventListener("keydown",e=>{if($("p-fc").hidden||/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName))return;
    if(e.key===" "){e.preventDefault();card.click()}else if(e.key==="ArrowRight")mark(true);else if(e.key==="ArrowLeft")mark(false)});
  build();
}

/* charts: everything placed with one scale per axis */
function fmt(v){return String(+v.toFixed(2))}
function smooth(P){if(P.length<3)return "M"+P.map(p=>p.join(" ")).join("L");let d=`M${P[0][0].toFixed(1)} ${P[0][1].toFixed(1)}`;
  for(let i=0;i<P.length-1;i++){const p0=P[i-1]||P[i],p1=P[i],p2=P[i+1],p3=P[i+2]||p2;
    const c1=[p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6],c2=[p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6];
    d+=`C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`}return d}
function chart(o){
  const W=o.w||340,H=o.h||230,L=50,R=16,T=16,B=44,X=o.x,Y=o.y;
  const sx=x=>L+(x-X.min)/(X.max-X.min)*(W-L-R),sy=y=>T+(Y.max-y)/(Y.max-Y.min)*(H-T-B);
  let s="";
  (o.bands||[]).forEach(b=>{s+=`<rect class="band" x="${sx(b.x0)}" y="${T}" width="${sx(b.x1)-sx(b.x0)}" height="${H-T-B}"/><text class="an" x="${(sx(b.x0)+sx(b.x1))/2}" y="${T+11}" text-anchor="middle">${b.label}</text>`});
  const ny=Math.round((Y.max-Y.min)/Y.step),nx=Math.round((X.max-X.min)/X.step);
  for(let i=0;i<=ny;i++){const v=Y.min+i*Y.step,y=sy(v);s+=`<path class="gr" d="M${L} ${y}H${W-R}"/><text class="tk" x="${L-6}" y="${y+3.5}" text-anchor="end">${fmt(v)}</text>`}
  for(let i=0;i<=nx;i++){const v=X.min+i*X.step,x=sx(v);s+=`<path class="gr" d="M${x} ${T}V${H-B}"/><text class="tk" x="${x}" y="${H-B+14}" text-anchor="middle">${fmt(v)}</text>`}
  s+=`<path class="ax" d="M${L} ${T}V${H-B}H${W-R}"/>`;
  if(Y.min<0)s+=`<path class="ax" d="M${L} ${sy(0)}H${W-R}"/>`;
  (o.vlines||[]).forEach(v=>{s+=`<path class="vl" d="M${sx(v.x)} ${T}V${H-B}"/><text class="an" x="${sx(v.x)+4}" y="${T+11}">${v.label}</text>`});
  o.series.forEach((se,i)=>{const P=se.pts.map(([x,y])=>[sx(x),sy(y)]);
    const d=se.smooth?smooth(P):"M"+P.map(p=>p[0].toFixed(1)+" "+p[1].toFixed(1)).join("L");
    if(se.line!==false)s+=`<path class="ln s${i}" d="${d}"/>`;
    if(se.dots)P.forEach(p=>s+=`<circle class="dt s${i}" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.5"/>`);
    if(se.label){const p=se.labelAt?[sx(se.labelAt[0]),sy(se.labelAt[1])]:P[P.length-1];s+=`<text class="s${i}t" x="${p[0].toFixed(1)}" y="${(p[1]-8).toFixed(1)}" text-anchor="end">${se.label}</text>`}});
  (o.marks||[]).forEach(m=>{const x=sx(m.x),y=sy(m.y);s+=`<circle class="mkp" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.5"/><text class="an b" x="${(x+(m.dx||8)).toFixed(1)}" y="${(y+(m.dy||-6)).toFixed(1)}">${m.label}</text>`});
  s+=`<text class="al" x="${(L+W-R)/2}" y="${H-8}" text-anchor="middle">${X.label}</text><text class="al" transform="translate(13 ${(T+H-B)/2}) rotate(-90)" text-anchor="middle">${Y.label}</text>`;
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${o.alt||"Graph"}">${s}</svg>`;
}
function table(head,rows){return `<div class="tbl dtable"><table><tr>${head.map(h=>`<th>${h}</th>`).join("")}</tr>${rows.map(r=>`<tr>${r.map(c=>`<td${typeof c==="number"?' class="num"':""}>${c}</td>`).join("")}</tr>`).join("")}</table></div>`}

/* question parts */
function panel(cls,title,html){const d=document.createElement("div");d.className="panel "+cls;d.innerHTML=`<div class="t">${title}</div>${html}`;return d}
function list(a){return "<ul>"+a.map(x=>"<li>"+x+"</li>").join("")+"</ul>"}
function markButtons(p,host){
  const mr=document.createElement("div");mr.className="marks";mr.innerHTML='<span class="lab">Marks you got:</span>';
  for(let m=0;m<=p.mk;m++){const b=document.createElement("button");b.className="mk"+(state.m[p.id]===m?" on":"");b.textContent=m;b.setAttribute("aria-label",m+" marks");
    b.onclick=()=>{setMark(p.id,m);mr.querySelectorAll(".mk").forEach(x=>x.classList.toggle("on",x===b))};mr.appendChild(b)}
  host.appendChild(mr)}
function setMark(id,m){state.m[id]=m;save();updScore();if(m>0&&window.GCSEasy&&GCSEasy.addXP)GCSEasy.addXP(m,"exam",/^AI/.test(id)?120:0,/^AI/.test(id)?null:"q:"+C.id+":"+id)}
function tagPills(p){return (p.tag||[]).map(t=>`<span class="pill ${t==="Triple"?"t":t==="HT"?"h":"u"}">${t}</span>`).join("")}

function renderPart(p){
  const d=document.createElement("div");d.className="part";
  d.innerHTML=`<div class="phead"><span class="pid">${p.label||p.id}${tagPills(p)}</span><span class="pmk">[${p.mk} mark${p.mk>1?"s":""}]</span></div><p class="pq">${p.q}</p>`;
  if(p.fig){const f=document.createElement("div");f.className="fig";f.innerHTML=C.figs[p.fig]();d.appendChild(f)}
  if(p.data){const f=document.createElement("div");f.innerHTML=table(p.data[0],p.data[1]);d.appendChild(f.firstChild)}
  const body=document.createElement("div");d.appendChild(body);
  const out=document.createElement("div");const tools=document.createElement("div");tools.className="tools";
  let hintBox=null;
  if(p.hint&&state.learn){const hb=document.createElement("button");hb.className="btn sm";hb.textContent="Hint";
    hb.onclick=()=>{if(hintBox){hintBox.remove();hintBox=null;return}hintBox=panel("hint","How to approach it",p.hint);d.insertBefore(hintBox,body)};tools.appendChild(hb)}
  if(p.k==="m"){
    const o=document.createElement("div");o.className="opts";
    p.o.forEach((t,j)=>{const b=document.createElement("button");b.className="opt";b.textContent=t;b.onclick=()=>pick(j);o.appendChild(b)});
    body.appendChild(o);
    function pick(j){o.querySelectorAll(".opt").forEach((b,k)=>{b.disabled=true;if(k===p.a)b.classList.add("right");else if(k===j)b.classList.add("wrong")});
      const ok=j===p.a;out.innerHTML="";out.appendChild(Object.assign(document.createElement("div"),{className:"fb "+(ok?"ok":"no"),textContent:ok?"Correct":"Not quite"}));
      out.appendChild(panel("ms","Mark scheme",p.ex));if(p.mist)out.appendChild(panel("mist","Common mistake",p.mist));setMark(p.id,ok?p.mk:0);state.a[p.id]=j;save()}
    if(state.a[p.id]!=null)setTimeout(()=>pick(state.a[p.id]));
  } else if(p.k==="n"||p.k==="f"){
    const fs=p.k==="n"?[[null,p.ans]]:p.fs;
    const wrap=document.createElement("div");wrap.className=p.k==="n"?"num":"fields";
    const inputs=fs.map((f,i)=>{const id=`in-${p.id}-${i}`;
      if(p.k==="n")wrap.innerHTML+=`<input id="${id}" inputmode="decimal" placeholder="Your answer" aria-label="Answer">${p.unit?`<span class="u">${p.unit}</span>`:""}`;
      else wrap.innerHTML+=`<div class="fld"><label for="${id}">${f[0]}</label><input id="${id}" inputmode="decimal"></div>`;return id});
    body.appendChild(wrap);
    const cb=document.createElement("button");cb.className="btn sm p";cb.textContent="Check";tools.prepend(cb);
    const check=()=>{
      const els=inputs.map(i=>$(i));let right=0,empty=false;
      els.forEach((el,i)=>{const v=parseFloat(el.value.replace(/[^0-9.\-]/g,""));if(isNaN(v)){empty=true;return}
        const ok=Math.abs(v-fs[i][1])<=(p.tol||0)+1e-9;if(ok)right++;if(p.k==="f")el.className=ok?"ok":"no"});
      if(empty){out.innerHTML='<div class="fb no">Fill in every box first.</div>';return}
      const marks=p.k==="n"?(right?p.mk:0):Math.min(right,p.mk);
      out.innerHTML="";out.appendChild(Object.assign(document.createElement("div"),{className:"fb "+(marks===p.mk?"ok":"no"),textContent:marks===p.mk?"Correct":(p.k==="n"?"Not quite. Answer: "+p.ans+(p.unit?" "+p.unit:""):`${right} / ${fs.length} correct`)}));
      out.appendChild(panel("ms","Working",p.ex));if(p.mist)out.appendChild(panel("mist","Common mistake",p.mist));
      if(p.k==="n"&&marks<p.mk&&p.mk>1){out.appendChild(Object.assign(document.createElement("p"),{textContent:"In the real exam you'd still get method marks for correct working. Mark yourself:",style:"font-size:.9rem;color:var(--muted)"}));
        if(state.m[p.id]==null||state.m[p.id]===p.mk)setMark(p.id,0);markButtons(p,out)}
      else setMark(p.id,marks);
      state.a[p.id]=els.map(e=>e.value);save()};
    cb.onclick=check;wrap.addEventListener("keydown",e=>{if(e.key==="Enter")check()});
    if(state.a[p.id])setTimeout(()=>{inputs.forEach((i,k)=>$(i).value=state.a[p.id][k]||"");check()});
  } else {
    const ta=document.createElement("textarea");ta.id="ta-"+p.id;ta.placeholder="Write your answer here first, then mark it.";ta.value=state.txt[p.id]||"";
    ta.oninput=()=>{state.txt[p.id]=ta.value;save()};body.appendChild(ta);
    const sb=document.createElement("button");sb.className="btn sm p";sb.textContent="Mark it";tools.prepend(sb);
    let shown=false;
    const reveal=()=>{if(shown)return;shown=true;sb.remove();
      if(p.k==="L"){out.appendChild(panel("ms","Level descriptors",p.levels.map(l=>`<p class="lvl">${l}</p>`).join("")));out.appendChild(panel("ms","Points to include",list(p.ms)))}
      else out.appendChild(panel("ms",`Mark scheme · 1 mark each, max ${p.mk}`,list(p.ms)));
      if(p.mist)out.appendChild(panel("mist","Common mistake",p.mist));
      out.appendChild(panel("model",p.modelTitle||"Full-marks answer",p.model));markButtons(p,out)};
    sb.onclick=reveal;
    /* AI marking: only shown where the page can ask Claude */
    const ab=document.createElement("button");ab.className="btn sm ai";ab.textContent="✦ Mark with AI";ab.hidden=true;tools.insertBefore(ab,sb.nextSibling);
    const aiBox=document.createElement("div");out.appendChild(aiBox);
    getSample().then(f=>{if(f)ab.hidden=false});
    if(state.ai[p.id])showAI(aiBox,p,state.ai[p.id]);
    ab.onclick=async()=>{const ans=ta.value.trim();
      if(ans.split(/\s+/).length<3){aiBox.innerHTML='<div class="fb no">Write your answer first, then the AI can mark it.</div>';return}
      const f=await getSample();if(!f){ab.hidden=true;return}
      ab.disabled=true;ab.textContent="Marking…";aiBox.innerHTML='<div class="panel ai"><div class="t">AI examiner</div><p class="aiwait">Reading your answer… this can take up to a minute.</p></div>';
      try{const r=await f.json(aiPrompt(p,ans,d),{modelTier:"default",cache:false});
        const mark=Math.max(0,Math.min(p.mk,Math.round(+r.mark||0)));r.mark=mark;
        state.ai[p.id]=r;state.txt[p.id]=ta.value;setMark(p.id,mark);save();showAI(aiBox,p,r);reveal();
        out.querySelectorAll(".mk").forEach(x=>x.classList.toggle("on",+x.textContent===mark))}
      catch(e){const msg={daily_limit:"The free AI has used up today's allowance. It resets overnight, so try again tomorrow, or use the mark scheme for now.",busy:"Lots of people are using the AI right now. Try again in a minute.",not_granted:"AI marking wasn't allowed, so it's switched off for now. Use Mark it to mark yourself.",sampling_disabled:"AI marking isn't available on this account. Use Mark it to mark yourself.",rate_limited:(window.GCSEasy&&GCSEasy.aiLimitMsg?GCSEasy.aiLimitMsg():"You've used today's AI marks."),session_expired:"Sign in to Claude again to use AI marking.",invalid_json:"The AI reply came back garbled. Try again."}[e&&e.code]||"AI marking failed. Try again, or use Mark it.";
        aiBox.innerHTML=`<div class="fb no">${msg}</div>`;if(e&&(e.code==="not_granted"||e.code==="sampling_disabled"))ab.hidden=true}
      finally{ab.disabled=false;ab.textContent="✦ Mark again with AI"}};
    if(state.m[p.id]!=null)reveal();
  }
  d.appendChild(tools);d.appendChild(out);return d;
}

/* ---- AI marking helpers ---- */
let _sample;
function getSample(){return window.GCSEasy&&GCSEasy.aiClient?GCSEasy.aiClient():Promise.resolve(null)}
const strip=h=>{const t=document.createElement("div");t.innerHTML=String(h||"");return t.textContent.replace(/\s+/g," ").trim()};
const escH=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function aiPrompt(p,ans,partEl){
  /* the question stem and any extract sit before this part inside its question */
  let ctx="";let n=partEl.previousElementSibling;const bits=[];while(n){if(!n.classList.contains("part"))bits.unshift(n.innerText||n.textContent);n=n.previousElementSibling}
  ctx=bits.join("\n").replace(/\s+\n/g,"\n").trim().slice(0,6000);
  const subj=(document.title||"").split("·")[0].trim(),board=(document.querySelector(".sub")||{}).textContent||"";
  return `You are an experienced, fair GCSE examiner for ${subj} (${board.trim()}). Mark a student's answer exactly as the real exam board would, using the mark scheme below. Be honest: don't give marks for points that aren't actually made, but credit any valid alternative point the mark scheme would accept.

${ctx?`QUESTION CONTEXT / EXTRACT:\n${ctx}\n\n`:""}QUESTION (${p.mk} marks):
${strip(p.q)}

${p.k==="L"?`LEVEL DESCRIPTORS:\n${(p.levels||[]).map(strip).join("\n")}\n\nINDICATIVE CONTENT:\n`:`MARK SCHEME (1 mark per point, max ${p.mk}):\n`}${(p.ms||[]).map(x=>"- "+strip(x)).join("\n")}

MODEL ANSWER (for reference):
${strip(p.model)}

STUDENT ANSWER:
"""${ans.slice(0,12000)}"""

Reply with only a JSON object, no other text:
{"mark": integer 0-${p.mk}, ${p.k==="L"?`"level": "e.g. Level 4 (high)", `:""}"summary": "one or two sentences: overall verdict, speaking to the student as 'you'", "good": ["specific things they did well, quoting their words where useful"], "improve": ["specific, actionable fixes, most important first, at most 4"], "missed": ["mark scheme points they did not make"], "better": "a rewritten version of the student's answer that would get full marks, keeping their own ideas where they work${p.k==="L"?" (for a long essay, just rewrite the weakest paragraph and label it)":""}"}
Keep each list item to one sentence. UK spelling.`}
function showAI(box,p,r){const L=a=>Array.isArray(a)&&a.length?"<ul>"+a.map(x=>"<li>"+escH(x)+"</li>").join("")+"</ul>":"";
  box.innerHTML=`<div class="panel ai"><div class="t">AI examiner · ${escH(r.mark)} / ${p.mk}${r.level?" · "+escH(r.level):""}</div>
  <p class="aisum">${escH(r.summary)}</p>
  ${L(r.good)?`<p class="aih">What went well</p>${L(r.good)}`:""}
  ${L(r.improve)?`<p class="aih">How to improve</p>${L(r.improve)}`:""}
  ${L(r.missed)?`<p class="aih">Points you missed</p>${L(r.missed)}`:""}
  ${r.better?`<details class="aibetter"><summary>Your answer, improved</summary><p>${escH(r.better).replace(/\n+/g,"</p><p>")}</p></details>`:""}
  <p class="ainote">AI marking is a guide, not an official mark. Check it against the mark scheme below.</p></div>`}

/* score across every set */
let ALL=[],TOTAL=0;
function updScore(){
  const sc=$("sc");if(!sc)return;
  let got=0,tot=0;const by={};
  ALL.forEach(([t,p])=>{by[t]=by[t]||{g:0,t:0};if(state.m[p.id]!=null){got+=state.m[p.id];tot+=p.mk;by[t].g+=state.m[p.id];by[t].t+=p.mk}});
  sc.textContent=got+" / "+tot;
  if(window.GCSEasy&&C.id)GCSEasy.report(C.id,{got,tot,answered:ALL.filter(([,p])=>state.m[p.id]!=null).length,parts:ALL.length,marks:TOTAL});
  $("scsub").textContent=`marks on parts you've answered · ${TOTAL} available across all sets`;
  const bars=$("bars");bars.innerHTML="";let weak=null;
  Object.keys(C.topics).forEach(k=>{const b=by[k]||{g:0,t:0};const pc=b.t?Math.round(b.g/b.t*100):0;
    const r=document.createElement("div");r.className="bar";
    r.innerHTML=`<span>${k}</span><span class="tr"><i class="${b.t?(pc<50?"lo":pc>=75?"hi":""):""}" style="width:${b.t?pc:0}%"></i></span><span>${b.t?pc+"%":"–"}</span>`;bars.appendChild(r);
    if(b.t>=4&&(!weak||pc<weak.pc))weak={k,pc}});
  $("weak").innerHTML=weak?(weak.pc<75?`Weakest so far: <b>${weak.k} ${C.topics[weak.k]}</b> (${weak.pc}%). Reread that section in Revise, then redo the parts you dropped marks on.`:"Strong across the board so far. Try the other sets or switch to Exam mode."):"Answer a few parts to see which topic needs work.";
}

/* sets: papers and the drill */
function renderSets(){
  const host=$("paper");if(!host)return;
  const items=C.sets.map(s=>[s.id,s.name]);if(C.drill)items.push(["drill","Calc drill"]);items.push(["ai","✦ Endless questions"]);
  if(!items.some(i=>i[0]===state.set))state.set=items[0][0];
  chipRow($("sets"),items,state.set,k=>{state.set=k;save();renderSets()});
  $("m-learn").classList.toggle("on",state.learn);$("m-exam").classList.toggle("on",!state.learn);
  host.innerHTML="";
  if(state.set==="drill"){renderDrill(host);return}
  if(state.set==="ai"){renderAI(host);return}
  const set=C.sets.find(s=>s.id===state.set);
  if(set.blurb)host.innerHTML=`<p class="setblurb">${set.blurb}</p>`;
  set.qs.forEach(Q=>{const b=document.createElement("div");b.className="qblock";
    const qm=Q.parts.reduce((s,p)=>s+p.mk,0);
    b.innerHTML=`<div class="qtitle"><span class="n">${Q.n}</span><span class="t">${Q.title}</span><span class="tp">${Q.t} · ${qm} marks</span></div>${Q.intro?`<div class="intro">${Q.intro}</div>`:""}`;
    Q.parts.forEach(p=>b.appendChild(renderPart(p)));host.appendChild(b)});
  updScore();
}
/* ---- Endless questions: Claude writes a fresh exam-style question, then marks it ---- */
let aiTopic="Mixed",aiLevel="Mixed",aiType="Mixed",aiBusy=null;
function subjInfo(){const name=(document.title||"").split("·")[0].trim();const S=(window.GCSEasy&&GCSEasy.SUBJECTS||[]).find(x=>x.name===name)||{};return {name,board:((document.querySelector(".top .sub")||{}).textContent||"").trim(),papers:S.papers,exam:S.exam}}
function renderAI(host){const si=subjInfo();
  const links=`<p class="ailinks">For real past papers: ${si.papers?`<a href="${si.papers}" target="_blank" rel="noopener">${escH(si.exam)} past papers and mark schemes</a> · `:""}<a href="https://www.physicsandmathstutor.com/" target="_blank" rel="noopener">Physics &amp; Maths Tutor</a> (questions by topic) · <a href="https://www.savemyexams.com/" target="_blank" rel="noopener">Save My Exams</a></p>`;
  host.innerHTML=`<p class="setblurb">A new question every time, written in the style of real ${escH(si.board.split("·").slice(0,2).join("·"))} papers: same command words, mark allocations and layout. Answer it, then check it or mark it with AI. These don't count towards the paper score.</p>
  <div class="aibar"><div><span class="lab2">Topic</span><div class="chips" id="aitop"></div></div><div><span class="lab2">Level</span><div class="chips" id="ailev"></div></div><div><span class="lab2">Type</span><div class="chips" id="aityp"></div></div></div>
  <div class="row" style="margin:6px 0 12px"><button class="btn p" id="aigo">✦ New question</button></div><p class="aiquota" hidden></p><div id="aiq"></div>${links}`;
  chipRow($("aitop"),[["Mixed","Any topic"],...Object.keys(C.topics).map(k=>[k,k===C.topics[k]?k:k+" "+C.topics[k]])],aiTopic,k=>{aiTopic=k;renderAI(host)});
  chipRow($("ailev"),[["Mixed","Mixed"],["Core","Grade 4–6"],["Stretch","Grade 7–9"]],aiLevel,k=>{aiLevel=k;renderAI(host)});
  chipRow($("aityp"),[["Mixed","Mixed"],["Short","Short answer"],["Long","Extended (6+ marks)"]].concat(C.drill?[["Calc","Calculations"]]:[]),aiType,k=>{aiType=k;renderAI(host)});
  const box=$("aiq");
  getSample().then(f=>{if(!f){$("aigo").disabled=true;box.innerHTML=`<div class="panel ms"><div class="t">AI not available here</div>Endless questions need the AI, which isn't available on this copy of the site. Use GCSEasy at its main address, or try the other sets and the past paper links below.</div>`}});
  if(state.aiq&&!aiBusy)drawAIQ(box,state.aiq);
  $("aigo").onclick=()=>genAI(box);if(window.GCSEasy&&GCSEasy.drawQuota)GCSEasy.drawQuota()}
async function genAI(box){const f=await getSample();if(!f)return;const go=$("aigo");go.disabled=true;go.textContent="Writing a question…";
  box.innerHTML=`<div class="panel ai"><div class="t">✦ Writing your question</div><p class="aiwait">This usually takes 10–40 seconds.</p></div>`;aiBusy=true;
  const keys=Object.keys(C.topics),tk=aiTopic==="Mixed"?keys[Math.floor(Math.random()*keys.length)]:aiTopic;
  const sec=document.getElementById(tk)||document.getElementById("cx-"+tk.toLowerCase());
  const notes=sec?(sec.innerText||sec.textContent).replace(/\s+\n/g,"\n").slice(0,5000):"";
  const cards=(C.cards||[]).filter(c=>c[0]===tk).slice(0,40).map(c=>`- ${strip(c[1])} → ${strip(c[2])}`).join("\n");
  const ex=ALL.filter(([t])=>t===tk).sort(()=>Math.random()-.5).slice(0,3).map(([,p])=>`[${p.mk} marks, type ${p.k}] ${strip(p.q)}`).join("\n");
  const si=subjInfo();
  const typeRule=aiType==="Short"?"3 to 5 short parts of 1–3 marks each (tick-box, short answer, calculation where it fits).":aiType==="Long"?(C.id==="english-literature"?"ONE essay question worth 20 or 40 marks exactly like the real paper (type L, with 4–6 level descriptors), optionally with a short original extract.":"ONE or TWO parts including a 6-mark extended response (type L with 3 level descriptors).")+"":aiType==="Calc"?"3 to 4 calculation parts (type n), with units, needing rearranging and unit conversions like real papers.":"3 to 5 parts mixing types, building in difficulty, total 8–14 marks, like a real numbered question.";
  const prompt=`You write GCSE exam questions. Subject: ${si.name}. Specification: ${si.board}. Write ONE new, ORIGINAL exam question on topic "${tk}: ${C.topics[tk]}" in the exact style of recent real papers for this specification: same command words (state, describe, explain, calculate, compare, evaluate, suggest), mark allocations, stimulus style (a short unfamiliar context, data table described in text, or extract), and mark scheme style. Do NOT copy any real past paper question; invent a fresh scenario that tests the same knowledge, ideally in a context the student hasn't seen. NEVER refer to a graph, diagram, picture, map or figure, because the student cannot see one: put any data the question needs into the stimulus as plain text (e.g. a short list or a simple table written in words). Only use content on this specification and in the student's notes below.${document.body.classList.contains("combined")?" The student takes COMBINED science (AQA Trilogy 8464): do NOT test anything that is separate-science (Triple) only.":""}
Level: ${aiLevel==="Core"?"grade 4–6 (accessible but not trivial)":aiLevel==="Stretch"?"grade 7–9 (demanding, multi-step, higher tier)":"a mix from grade 4 to grade 8"}.
Structure: ${typeRule}

STUDENT'S NOTES FOR THIS TOPIC (content to test):
${notes}
${cards?"\nKEY FACTS:\n"+cards:""}
${ex?"\nSTYLE EXAMPLES from this site (don't repeat these):\n"+ex:""}

Reply with only JSON:
{"title":"short question heading, e.g. 'This question is about …'","stimulus":"optional context/extract/data the parts refer to (plain text, use line breaks for tables), or empty string","parts":[
 {"k":"m","mk":1,"q":"question text ending 'Tick one box.'","o":["option","option","option","option"],"a":index_of_correct,"ex":"why"},
 {"k":"n","mk":2,"q":"calculation question","ans":number,"unit":"unit","tol":allowed_error,"ex":"full worked solution"},
 {"k":"w","mk":3,"q":"written question","ms":["one creditworthy point per mark"],"model":"a full-marks answer"},
 {"k":"L","mk":6,"q":"extended question","levels":["Level 3 (5–6): …","Level 2 (3–4): …","Level 1 (1–2): …"],"ms":["indicative content point", "…"],"model":"a top-level answer"}
]}
Use only the part types needed. For "n", ans must be a plain number and tol a sensible rounding tolerance. Every mark must be earnable from the mark scheme. UK spelling.`;
  try{const r=await f.json(prompt,{modelTier:"default",cache:false});const q=cleanAI(r,tk);if(!q)throw {code:"invalid_json"};
    (state.aiq&&state.aiq.parts||[]).forEach(p=>{delete state.m[p.id];delete state.a[p.id];delete state.txt[p.id];delete state.ai[p.id]});
    state.aiq=q;save();drawAIQ(box,q)}
  catch(e){const c=e&&e.code;box.innerHTML=`<div class="fb no">${{daily_limit:"The free AI has used up today's allowance. It resets overnight, so try again tomorrow, or use the mark scheme for now.",busy:"Lots of people are using the AI right now. Try again in a minute.",not_granted:"Claude wasn't allowed, so endless questions are off for now.",sampling_disabled:"Claude isn't available on this account.",rate_limited:(window.GCSEasy&&GCSEasy.aiLimitMsg?GCSEasy.aiLimitMsg():"You've used today's AI marks."),session_expired:"Sign in to Claude again, then try again.",invalid_json:"The question came back garbled. Tap New question to try again."}[c]||"Something went wrong. Tap New question to try again."}</div>`}
  finally{aiBusy=null;go.disabled=false;go.textContent="✦ New question"}}
function cleanAI(r,tk){if(!r||!Array.isArray(r.parts))return null;const stamp=Date.now().toString(36);let i=0;
  const parts=r.parts.map(p=>{if(!p||typeof p.q!=="string")return null;const mk=Math.max(1,Math.min(40,Math.round(+p.mk||1)));const id=`AI${stamp}.${++i}`;const base={id,label:String(i),mk,q:escH(p.q),hint:null};
    if(p.k==="m"&&Array.isArray(p.o)&&p.o.length>=2&&p.o[+p.a]!=null)return Object.assign(base,{k:"m",o:p.o.map(String),a:+p.a,ex:escH(p.ex||"")});
    if(p.k==="n"&&isFinite(+p.ans))return Object.assign(base,{k:"n",ans:+p.ans,unit:String(p.unit||""),tol:Math.max(+p.tol||0,Math.abs(+p.ans)*0.01),ex:escH(p.ex||"")});
    if((p.k==="w"||p.k==="L")&&Array.isArray(p.ms)){const o=Object.assign(base,{k:p.k==="L"&&Array.isArray(p.levels)?"L":"w",ms:p.ms.map(escH),model:escH(p.model||"")});if(o.k==="L")o.levels=p.levels.map(escH);return o}
    return null}).filter(Boolean);
  if(!parts.length)return null;return {t:tk,title:escH(r.title||"New question"),stimulus:String(r.stimulus||""),parts}}
function drawAIQ(box,q){box.innerHTML="";const b=document.createElement("div");b.className="qblock";const qm=q.parts.reduce((s,p)=>s+p.mk,0);
  b.innerHTML=`<div class="qtitle"><span class="n">✦</span><span class="t">${q.title}</span><span class="tp">${q.t} · ${qm} marks</span></div>${q.stimulus.trim()?`<div class="intro aistim">${escH(q.stimulus).replace(/\n/g,"<br>")}</div>`:""}`;
  q.parts.forEach(p=>b.appendChild(renderPart(p)));box.appendChild(b)}
let dType="All",dCur=null;
function renderDrill(host){
  host.innerHTML=`<p class="setblurb">Every question here is generated with new numbers, so you can keep practising the maths until it's automatic. Drill results don't count towards the paper score.</p><div class="chips" id="dtypes"></div><div class="drill" id="drillbox"></div>`;
  chipRow($("dtypes"),[["All","All"],...C.drill.map(g=>[g.name,g.name])],dType,k=>{dType=k;dCur=null;renderDrill(host)});
  next();
  function next(){const pool=C.drill.filter(g=>dType==="All"||g.name===dType);const g=pool[Math.floor(Math.random()*pool.length)];dCur=Object.assign({name:g.name,t:g.t},g.make());draw()}
  function draw(){const q=dCur,box=$("drillbox");
    box.innerHTML=`<div class="meta"><span>${q.t} · ${q.name}</span><span>${state.dr.r} / ${state.dr.t} right</span></div><p class="dq">${q.q}</p><div class="num"><input id="drin" inputmode="decimal" placeholder="Your answer" aria-label="Answer">${q.unit?`<span class="u">${q.unit}</span>`:""}<button class="btn sm p" id="drchk">Check</button></div><div id="drfb"></div>`;
    const inp=$("drin"),go=()=>{const v=parseFloat(inp.value.replace(/[^0-9.\-]/g,""));if(isNaN(v)){$("drfb").innerHTML='<div class="fb no">Type a number first.</div>';return}
      const ok=Math.abs(v-q.ans)<=Math.max(Math.abs(q.ans)*0.02,q.tol||0)+1e-9;state.dr.t++;if(ok){state.dr.r++;if(window.GCSEasy)GCSEasy.addXP(1,"drill",60)}save();
      $("drchk").disabled=true;inp.disabled=true;
      $("drfb").innerHTML=`<div class="fb ${ok?"ok":"no"}">${ok?"Correct":"Not quite. Answer: "+q.ans+(q.unit?" "+q.unit:"")}</div><div class="panel ms"><div class="t">Working</div>${q.work}</div><div class="row"><button class="btn p" id="drnext">Next question</button></div>`;
      box.querySelector(".meta span:last-child").textContent=`${state.dr.r} / ${state.dr.t} right`;
      $("drnext").onclick=next};
    $("drchk").onclick=go;inp.onkeydown=e=>{if(e.key==="Enter")go()};
  }
}

/* Combined vs Triple science: one setting for all science pages */
const SCI=["biology","chemistry","physics"];
const tier=()=>{try{return localStorage.getItem("gcseasy-tier")||"triple"}catch(e){return "triple"}};
function applyTier(){if(!SCI.includes(C.id))return;const comb=tier()==="combined";document.body.classList.toggle("combined",comb);
  if(comb){C.sets.forEach(set=>{set.qs=set.qs.map(Q=>Object.assign({},Q,{parts:Q.parts.filter(p=>!(p.tag||[]).includes("Triple"))})).filter(Q=>Q.parts.length)});
    C.cards=C.cards.filter(c=>!/\(Triple\)|Triple only/i.test(c[1]+" "+c[2]))}
  document.querySelectorAll("#p-rev .pill.t,#p-rp .pill.t,#p-rc .pill.t").forEach(pl=>{if(pl.closest(".revtools,header"))return;
    const h=pl.closest("h3,h2");if(h&&!h.closest(".th")){h.classList.add("tri");let n=h.nextElementSibling;while(n&&!/^H[23]$/.test(n.tagName)){n.classList.add("tri");n=n.nextElementSibling}return}
    const c=pl.closest("li,tr,p,details,.warn,.struct,dd");if(c)c.classList.add("tri");if(c&&c.tagName==="DD"&&c.previousElementSibling)c.previousElementSibling.classList.add("tri")});
  const top=document.querySelector("header.top");if(top&&!document.getElementById("tier")){const t=document.createElement("div");t.className="tier";t.id="tier";t.setAttribute("role","group");t.setAttribute("aria-label","Course");
    t.innerHTML=`<button type="button" data-t="triple" aria-pressed="${!comb}">Triple</button><button type="button" data-t="combined" aria-pressed="${comb}">Combined</button>`;top.appendChild(t);
    t.querySelectorAll("button").forEach(b=>b.onclick=()=>{try{localStorage.setItem("gcseasy-tier",b.dataset.t)}catch(e){}location.reload()})}}
function init(cfg){
  C=cfg;KEY=cfg.key;load();applyTier();window.__STUDY=C;
  const cov=document.querySelector("#p-ex .cover");if(cov&&!cov.querySelector(".aiquota")){const q=document.createElement("p");q.className="aiquota";q.hidden=true;cov.appendChild(q)}
  ALL=[];C.sets.forEach(s=>s.qs.forEach(Q=>Q.parts.forEach(p=>ALL.push([p.t||Q.t,p]))));TOTAL=ALL.reduce((s,[,p])=>s+p.mk,0);
  setupTabs();setupAccordion();setupJump();setupCards();setupTopicQuiz();
  document.querySelectorAll("[data-fig]").forEach(el=>{if(C.figs[el.dataset.fig])el.innerHTML=C.figs[el.dataset.fig]()});
  if($("m-learn")){
    $("m-learn").onclick=()=>{state.learn=true;save();renderSets()};
    $("m-exam").onclick=()=>{state.learn=false;save();renderSets()};
    $("reset").onclick=()=>{const keep={learn:state.learn,set:state.set,dr:{r:0,t:0}};state=Object.assign({m:{},a:{},txt:{}},keep);save();renderSets()};
    renderSets();
  }
}
const r=(a,b,dp=0)=>+(a+Math.random()*(b-a)).toFixed(dp);
const pick=a=>a[Math.floor(Math.random()*a.length)];
return {init,chart,table,r,pick};
})();
