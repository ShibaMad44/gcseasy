/* GCSEasy exam guides: notebook-style cards, one per paper.
   Guide.render(el, papers). Each paper: {title, sub, total, split:[[label,time]], qs:[{n, marks, type, time, pts:[], flow:[]}], notes:[]} */
(function(){
const css=`
:root{--nb-rule:rgba(30,99,199,.13);--nb-margin:#E59A9A}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--nb-rule:rgba(111,166,245,.13);--nb-margin:#8E4A4A}}
:root[data-theme="dark"]{--nb-rule:rgba(111,166,245,.13);--nb-margin:#8E4A4A}
.nbs{display:grid;gap:22px}
.nb{position:relative;background-color:var(--surface);background-image:repeating-linear-gradient(to bottom,transparent 0,transparent 31px,var(--nb-rule) 31px,var(--nb-rule) 32px);border:1px solid var(--line);border-radius:6px 14px 14px 6px;padding:22px 18px 22px 66px;box-shadow:0 2px 0 var(--line)}
.nb::before{content:"";position:absolute;top:0;bottom:0;left:50px;border-left:2px solid var(--nb-margin)}
.nbhead{display:flex;flex-wrap:wrap;gap:12px 18px;justify-content:space-between;align-items:flex-start;margin-bottom:14px}
.nbhead h2{margin:0;font:700 1.35rem/1.25 var(--display)}
.nbhead p{margin:4px 0 0;color:var(--muted);font-size:.92rem}
.nbtime{display:grid;gap:2px;text-align:right;font:700 .8rem var(--mono);text-transform:uppercase;letter-spacing:.05em}
.nbtime b{font:700 1.15rem var(--display);text-transform:none;letter-spacing:0}
.nbtime span{color:var(--muted);font-weight:500}
.nbq{position:relative;padding:12px 0;border-top:1px dashed var(--line)}
.nbq:first-of-type{border-top:0}
.nbq .nbn{position:absolute;left:-62px;width:42px;text-align:right;top:12px;font:700 1rem var(--display);color:var(--accent);white-space:nowrap}
.nbmeta{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:6px}
.nbmeta span{font:700 .78rem var(--mono);padding:3px 8px;border-radius:6px;background:var(--bg);border:1px solid var(--line)}
.nbmeta .mk{background:var(--accent);border-color:var(--accent);color:var(--surface)}
.nbmeta .ty{font-family:var(--display);font-size:.95rem;border:0;background:none;padding:0 4px 0 0}
.nbq ul{margin:4px 0 0;padding-left:18px}
.nbq li{margin:2px 0}
.nbflow{display:flex;flex-wrap:wrap;gap:6px 4px;align-items:center;margin-top:8px}
.nbflow span{background:var(--accent-soft);color:var(--ink);border-radius:7px;padding:4px 9px;font-size:.88rem;font-weight:700}
.nbflow i{font-style:normal;color:var(--accent);font-weight:700}
.nbnotes{margin-top:12px;padding:12px 14px;border-radius:10px;background:var(--bg);border:1px solid var(--line)}
.nbnotes h3{margin:0 0 6px;font:700 .8rem var(--mono);text-transform:uppercase;letter-spacing:.06em;color:var(--accent)}
.nbnotes ul{margin:0;padding-left:18px}
@media (max-width:480px){.nb{padding:18px 14px 18px 46px}.nb::before{left:34px}.nbq .nbn{left:-44px;width:30px;font-size:.92rem}.nbtime{text-align:left}}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
function render(el,papers){
  el.innerHTML=`<div class="nbs">${papers.map(p=>`<article class="nb">
    <div class="nbhead"><div><h2>${p.title}</h2>${p.sub?`<p>${p.sub}</p>`:""}</div>
    <div class="nbtime">Total time<b>${p.total}</b>${(p.split||[]).map(([a,b])=>`<span>${a}: ${b}</span>`).join("")}</div></div>
    ${p.qs.map(q=>`<section class="nbq"><span class="nbn">${q.n}</span>
      <div class="nbmeta"><span class="ty">${q.type}</span><span class="mk">${q.marks} marks</span><span>${q.time}</span>${q.paras?`<span>${q.paras}</span>`:""}</div>
      ${q.pts&&q.pts.length?`<ul>${q.pts.map(x=>`<li>${x}</li>`).join("")}</ul>`:""}
      ${q.flow?`<div class="nbflow" aria-label="Structure">${q.flow.map(x=>`<span>${x}</span>`).join("<i>→</i>")}</div>`:""}
    </section>`).join("")}
    ${p.notes&&p.notes.length?`<div class="nbnotes"><h3>Notes</h3><ul>${p.notes.map(x=>`<li>${x}</li>`).join("")}</ul></div>`:""}
  </article>`).join("")}</div>`}
window.Guide={render};
})();
