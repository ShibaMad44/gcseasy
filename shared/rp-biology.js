/* AQA Biology required practicals. rp:true puts them in the "Required practicals" list. */
(function(){const {L,B,A,T,SVG,N,BN,K}=window.LSN;
const V=q=>"AQA GCSE biology required practical "+q;
const vars=(iv,dv,cv)=>`<div class="tbl"><table><tr><th>Independent (you change)</th><td>${iv}</td></tr><tr><th>Dependent (you measure)</th><td>${dv}</td></tr><tr><th>Control (keep the same)</th><td>${cv}</td></tr></table></div>`;
const ol=a=>`<ol class="steps">${a.map(x=>`<li>${x}</li>`).join("")}</ol>`;
const TRIPLE=`<p class="note">Triple (separate) Biology only: not in Combined Science.</p>`;

const SLIDE=SVG(520,230,"Preparing a microscope slide",`
<rect x="60" y="150" width="300" height="16" rx="2" fill="#e6f3ff" stroke="var(--ink)" stroke-width="1.4"/>
<ellipse cx="210" cy="148" rx="44" ry="4" fill="#f3e3b0" stroke="var(--ink)"/><ellipse cx="210" cy="145" rx="22" ry="5" fill="#b5651d" opacity=".8"/>
<path d="M168 147 L262 98" stroke="#9fd3ff" stroke-width="5"/><path d="M262 100 L372 40" stroke="var(--ink)" stroke-width="3"/><rect x="368" y="22" width="14" height="30" rx="4" transform="rotate(60 375 37)" class="d-c6"/>
${L(90,166,70,204,1,"Glass slide")}${L(190,146,150,108,2,"Onion skin + iodine","end")}${L(220,121,232,60,3,"Coverslip at an angle","end")}${L(318,70,360,98,4,"Mounted needle")}`);

const AGAR=SVG(540,270,"Zones of inhibition on an agar plate",`
<circle cx="180" cy="135" r="110" class="d-c0"/><circle cx="180" cy="135" r="100" fill="#f3e3b0" stroke="var(--ink)"/>
<circle cx="135" cy="100" r="32" fill="#fff" stroke="var(--muted)" stroke-dasharray="3 3"/><circle cx="230" cy="105" r="20" fill="#fff" stroke="var(--muted)" stroke-dasharray="3 3"/><circle cx="180" cy="185" r="9" fill="#fff" stroke="var(--muted)" stroke-dasharray="3 3"/>
${[[135,100],[230,105],[180,185]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="6" class="d-c0"/>`).join("")}
<path d="M103 100 L167 100" class="d-ar"/>
${L(150,118,320,40,1,"Clear zone: bacteria killed")}${L(230,105,320,100,2,"Paper disc + antiseptic")}${L(180,185,320,190,3,"Control disc (water)")}${L(250,200,320,240,4,"Agar with bacteria")}
${T(135,92,"d","sm")}`);

const OSMO=SVG(480,250,"Potato cylinders in different sugar solutions",`
${[0,.2,.4,.6,.8].map((c,i)=>`${K.tube(40+i*88,30,34,150,.75,`rgba(111,166,245,${.15+c*.6})`)}<rect x="${49+i*88}" y="${100+i*2}" width="16" height="${44-i*4}" rx="2" fill="#f3e3b0" stroke="var(--ink)"/>${T(57+i*88,206,c.toFixed(1)+" M","sm")}`).join("")}
${T(240,232,"Sugar concentration (mol/dm³) →","cap")}`);

window.LESSONS.biology.push(
{id:"rp-micro",topic:"B1",rp:true,title:"Microscopy: looking at cells",mins:8,steps:[
 {t:"learn",h:"The aim",html:`<p>Use a light microscope to observe, draw and label plant or animal cells, and work out the magnification.</p><p>Equipment: microscope, slide, coverslip, onion, forceps, iodine solution, mounted needle.</p>`},
 {t:"diagram",h:"Preparing the slide",svg:SLIDE,html:`<p>Lowering the coverslip at an angle stops <b>air bubbles</b> getting trapped, which would block the view.</p>`},
 {t:"learn",h:"Method",html:ol(["Peel a thin layer of onion epidermis with forceps and lay it flat on a slide with a drop of water.","Add a drop of <b>iodine</b> to stain the cells.","Lower a coverslip with a mounted needle.","Start on the <b>lowest power</b> objective; focus with the coarse, then fine, focus.","Switch to a higher power and refocus with the fine focus.","Draw with clear pencil lines, no shading, label, and write the magnification."]),vid:V("microscopy")},
 {t:"example",h:"Working out the size",html:`<p><b>A cell is 15 mm long in your drawing. The magnification is ×100. How big is the real cell?</b></p><p>real size = image ÷ magnification = 15 ÷ 100 = 0.15 mm = <b>150 µm</b>.</p>`},
 {t:"q",h:"Quick check",q:"Why is iodine added to the onion cells?",o:["To kill the cells","To stain them so structures are easier to see","To stop air bubbles","To make them grow"],a:1,ex:"Iodine stains starch and makes the nucleus and cell wall show up."},
 {t:"num",h:"Your turn",q:"An eyepiece is ×10 and the objective is ×40. What is the total magnification?",ans:400,tol:.01,unit:"×",ex:"10 × 40 = 400."},
 {t:"mistake",h:"Errors and improvements",html:`<ul><li><b>Air bubbles</b>: lower the coverslip at an angle.</li><li>Specimen too thick: light can't pass through. Use a single layer of cells.</li><li>Drawings: no shading or sketchy lines; draw what you see, not a textbook cell.</li></ul>`},
 {t:"sum",h:"Summary",bullets:["Thin layer, stain, coverslip at an angle","Lowest power first, then higher","Coarse focus, then fine focus","Clear pencil drawing with labels","real size = image ÷ magnification"],vid:V("microscopy")}]},

{id:"rp-microbio",triple:true,topic:"B1",rp:true,title:"Microbiology: antiseptics and bacteria",mins:9,steps:[
 {t:"learn",h:"The aim",html:`${TRIPLE}<p>Investigate the effect of antiseptics or antibiotics on bacterial growth, using the size of the clear zone (zone of inhibition) around each disc.</p>${vars("Type of antiseptic or antibiotic","Area of the clear zone","Type of bacteria, agar, disc size, incubation time and temperature")}`},
 {t:"diagram",h:"The agar plate after incubation",svg:AGAR,html:`<p>The bigger the clear zone, the more effective the antiseptic. The control disc shows the effect isn't from the paper itself.</p>`},
 {t:"learn",h:"Method: aseptic technique",html:ol(["Sterilise the inoculating loop by passing it through a <b>Bunsen flame</b>; work near the flame.","Spread bacteria evenly over sterile agar in a Petri dish.","Place paper discs soaked in different antiseptics, plus a control disc soaked in sterile water.","Tape the lid with <b>two strips</b>: not sealed all round, so oxygen can get in and harmful anaerobic bacteria don't grow.","Incubate upside down at <b>25 °C</b> (not 37 °C, to avoid growing human pathogens).","Measure the diameter of each clear zone and calculate its area."]),vid:V("microbiology antiseptic")},
 {t:"example",h:"Calculating the area",html:`<p><b>A clear zone has a diameter of 14 mm. Find its area.</b></p><ol class="steps"><li>radius = 14 ÷ 2 = 7 mm.</li><li>area = πr² = π × 7² = <b>153.9 mm²</b>.</li></ol>`},
 {t:"num",h:"Your turn",q:"A clear zone is 10 mm across. What is its area in mm², to 1 dp?",ans:78.5,tol:.06,unit:"mm²",ex:"r = 5 mm; π × 25 = 78.5 mm²."},
 {t:"q",h:"Quick check",q:"Why is the plate incubated at 25 °C in school?",o:["Bacteria die above 25 °C","To reduce the chance of growing pathogens that infect humans","Antiseptics don't work at 37 °C","Agar melts at 30 °C"],a:1,ex:"Human pathogens grow best near body temperature, 37 °C."},
 {t:"mistake",h:"Errors and improvements",html:`<ul><li>Contamination from the air or your hands: use aseptic technique and keep the lid on.</li><li>Uneven bacteria spread makes zones hard to compare.</li><li>Measure the diameter in two directions and take a mean.</li></ul>`},
 {t:"sum",h:"Summary",bullets:["Aseptic technique: flame the loop, work near the flame","Control disc with sterile water","Tape the lid with two strips; incubate at 25 °C","Bigger clear zone = more effective","Area = πr²"],vid:V("microbiology antiseptic")}]},

{id:"rp-osmosis",topic:"B1",rp:true,title:"Osmosis in potato",mins:9,steps:[
 {t:"learn",h:"The aim",html:`<p>Investigate the effect of different sugar or salt concentrations on the mass of potato tissue.</p>${vars("Concentration of the solution","Percentage change in mass","Size of cylinders, volume of solution, time, temperature, type of potato")}`},
 {t:"diagram",h:"The set-up",svg:OSMO,html:`<p>In dilute solutions water moves <b>into</b> the potato by osmosis, so it gains mass. In concentrated solutions water moves <b>out</b>, so it loses mass.</p>`},
 {t:"learn",h:"Method",html:ol(["Cut potato cylinders the same size with a cork borer and ruler.","Blot them dry and weigh each one.","Put each cylinder into a different concentration, with the same volume of solution.","Leave them for the same time (e.g. 24 hours) at the same temperature.","Remove, blot dry gently, and reweigh.","Calculate the percentage change in mass and plot it against concentration."]),vid:V("osmosis potato")},
 {t:"example",h:"Percentage change",html:`<p><b>A cylinder goes from 2.50 g to 2.80 g.</b></p><p>% change = (final − initial) ÷ initial × 100 = 0.30 ÷ 2.50 × 100 = <b>+12%</b>.</p><p>Where your line crosses 0% shows the concentration <b>inside</b> the potato cells: no net movement of water.</p>`},
 {t:"num",h:"Your turn",q:"A cylinder goes from 3.20 g to 2.88 g. What is the percentage change in mass?",ans:-10,tol:.01,unit:"%",ex:"(2.88 − 3.20) ÷ 3.20 × 100 = −10%."},
 {t:"q",h:"Quick check",q:"Why use percentage change in mass, not just change in mass?",o:["It's easier to measure","The cylinders may start with different masses, so % lets you compare fairly","It always gives a positive number","Balances can't measure grams"],a:1,ex:"Percentage change accounts for different starting masses."},
 {t:"mistake",h:"Errors and improvements",html:`<ul><li>Not blotting consistently: surface water adds mass. Blot every cylinder the same way.</li><li>Cylinders of different sizes have different surface areas.</li><li>Repeat each concentration and calculate a mean.</li></ul>`},
 {t:"sum",h:"Summary",bullets:["Same size cylinders, same volume, same time","Blot, weigh, soak, blot, reweigh","% change = change ÷ initial × 100","Gain in dilute; loss in concentrated","Crossing point = concentration inside the cells"],vid:V("osmosis potato")}]}
);
})();
