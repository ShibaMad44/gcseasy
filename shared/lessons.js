/* GCSEasy step-by-step lessons. Each lesson: learn → diagram → worked example → check → apply → common mistake → summary.
   Diagrams are drawn here as SVG so they match the site's colours in light and dark mode.
   Label groups (class "lb") can be hidden to test yourself: the number badges stay, the words disappear. */
(function(){
const L=(x,y,tx,ty,n,txt,anchor)=>`<g class="lb" data-n="${n}"><line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" class="d-ln"/><circle cx="${x}" cy="${y}" r="3" class="d-dot"/><g class="lbt"><text x="${anchor==="end"?tx-6:tx+6}" y="${ty+4}" text-anchor="${anchor||"start"}" class="d-tx">${txt}</text></g><g class="lbn"><circle cx="${anchor==="end"?tx-12:tx+12}" cy="${ty}" r="10" class="d-nb"/><text x="${anchor==="end"?tx-12:tx+12}" y="${ty+4}" text-anchor="middle" class="d-nt">${n}</text></g></g>`;

/* ---------- diagrams ---------- */
const MICRO=`<svg viewBox="-85 0 495 300" class="ldiag" role="img" aria-label="Labelled light microscope">
<rect x="120" y="262" width="150" height="16" rx="5" class="d-fill2"/>
<path d="M176 84 L228 92 Q244 96 242 120 L238 262" class="d-thick"/>
<rect x="146" y="16" width="20" height="16" rx="3" class="d-fill"/>
<rect x="140" y="32" width="32" height="104" rx="4" class="d-fill"/>
<rect x="132" y="136" width="48" height="12" rx="4" class="d-fill2"/>
<rect x="138" y="148" width="10" height="24" rx="2" class="d-fill"/><rect x="152" y="148" width="10" height="30" rx="2" class="d-fill"/><rect x="166" y="148" width="10" height="20" rx="2" class="d-fill"/>
<rect x="96" y="188" width="140" height="9" rx="3" class="d-fill2"/>
<rect x="132" y="182" width="44" height="6" rx="2" class="d-glass"/>
<circle cx="242" cy="150" r="13" class="d-fill"/><circle cx="242" cy="182" r="8" class="d-fill"/>
<circle cx="157" cy="236" r="11" class="d-light"/><path d="M157 222 L157 200" class="d-ray"/>
${L(156,22,70,22,1,"Eyepiece lens","end")}
${L(157,175,70,140,2,"Objective lenses","end")}
${L(110,192,70,200,3,"Stage","end")}
${L(150,185,70,172,4,"Slide","end")}
${L(254,150,300,140,5,"Coarse focus")}
${L(249,182,300,186,6,"Fine focus")}
${L(157,247,70,250,7,"Light source","end")}
${L(238,230,300,232,8,"Arm")}
</svg>`;

const HEART=`<svg viewBox="-118 0 625 330" class="ldiag" role="img" aria-label="Labelled diagram of the heart">
<text x="195" y="322" text-anchor="middle" class="d-cap">Seen from the front, so the heart's left side is on the right of the picture</text>
<path d="M92 92 L92 18 M112 92 L112 18" class="d-vblue"/>
<path d="M150 170 C150 120 146 70 120 40 L104 24" class="d-vbluef"/>
<path d="M232 178 C232 110 236 60 270 34 L300 30" class="d-vredf"/>
<path d="M330 118 L380 118 M330 132 L380 132" class="d-vred"/>
<rect x="60" y="92" width="112" height="78" rx="22" class="d-blue"/>
<rect x="60" y="176" width="112" height="112" rx="26" class="d-blue"/>
<rect x="212" y="92" width="118" height="78" rx="22" class="d-red"/>
<rect x="212" y="176" width="118" height="112" rx="26" class="d-red d-thickwall"/>
<rect x="178" y="92" width="28" height="196" rx="10" class="d-sept"/>
<path d="M92 172 l10 10 l10 -10 M250 172 l10 10 l10 -10" class="d-valve"/>
<path d="M98 40 L98 80" class="d-arrow-b"/><path d="M116 150 L116 205" class="d-arrow-b"/><path d="M140 250 C152 220 150 190 148 160" class="d-arrow-b"/>
<path d="M375 125 L340 125" class="d-arrow-r"/><path d="M270 150 L270 205" class="d-arrow-r"/><path d="M246 250 C234 220 234 190 236 150" class="d-arrow-r"/>
${L(116,131,30,120,1,"Right atrium","end")}
${L(80,250,30,250,2,"Right ventricle","end")}
${L(300,131,388,160,3,"Left atrium")}
${L(318,250,388,250,4,"Left ventricle")}
${L(102,30,30,30,5,"Vena cava","end")}
${L(130,52,30,72,6,"Pulmonary artery","end")}
${L(360,118,370,92,7,"Pulmonary vein")}
${L(272,34,330,16,8,"Aorta")}
${L(102,179,30,186,9,"Valve","end")}
${L(192,230,200,306,10,"Septum")}
</svg>`;

const CYCLE=`<svg viewBox="0 0 520 300" class="ldiag" role="img" aria-label="The cell cycle">
<circle cx="130" cy="150" r="92" class="d-ring1"/>
<path d="M130 58 A92 92 0 0 1 222 150" class="d-ring2"/>
<path d="M222 150 A92 92 0 0 1 195 215" class="d-ring3"/>
<text x="92" y="146" text-anchor="middle" class="d-big">Interphase</text><text x="92" y="164" text-anchor="middle" class="d-cap">grow + copy DNA</text>
<text x="226" y="88" class="d-tx">Mitosis</text><text x="178" y="258" class="d-tx">Cytokinesis</text>
<g transform="translate(270,30)"><circle cx="40" cy="30" r="26" class="d-cell"/><circle cx="40" cy="30" r="12" class="d-nuc"/><path d="M34 26 l6 6 M40 26 l-6 6 M42 26 l5 6" class="d-chr"/><text x="80" y="34" class="d-cap">1 Cell with its chromosomes</text></g>
<g transform="translate(270,95)"><circle cx="40" cy="30" r="28" class="d-cell"/><path d="M30 24 l8 10 M38 24 l-8 10 M44 24 l8 10 M52 24 l-8 10" class="d-chr"/><text x="80" y="34" class="d-cap">2 DNA copied: X shapes</text></g>
<g transform="translate(270,160)"><circle cx="40" cy="30" r="28" class="d-cell"/><path d="M20 26 l6 8 M26 26 l-6 8 M54 26 l6 8 M60 26 l-6 8" class="d-chr"/><path d="M32 30 L22 30 M48 30 L58 30" class="d-ray"/><text x="80" y="34" class="d-cap">3 Copies pulled apart</text></g>
<g transform="translate(270,225)"><circle cx="22" cy="30" r="18" class="d-cell"/><circle cx="62" cy="30" r="18" class="d-cell"/><path d="M18 26 l5 7 M23 26 l-5 7 M58 26 l5 7 M63 26 l-5 7" class="d-chr"/><text x="88" y="34" class="d-cap">4 Two identical cells</text></g>
</svg>`;

const TRI=`<svg viewBox="0 0 400 230" class="ldiag" role="img" aria-label="Moles formula triangle">
<path d="M200 20 L340 200 L60 200 Z" class="d-fill"/><path d="M110 132 L290 132 M200 132 L200 200" class="d-line"/>
<text x="200" y="102" text-anchor="middle" class="d-big">mass (g)</text>
<text x="146" y="176" text-anchor="middle" class="d-big">moles</text><text x="254" y="176" text-anchor="middle" class="d-big">Mr</text>
<text x="200" y="224" text-anchor="middle" class="d-cap">Cover what you want. Side by side = multiply; one above the other = divide.</text>
</svg>`;

const EMS=(()=>{const cols=["#8E7CC3","#6FA8DC","#E06666","#F6B26B","#A64D79","#76A5AF","#93C47D"],names=["Radio","Micro-waves","Infrared","Visible","Ultra-violet","X-rays","Gamma"];
  let wave="M20 40";for(let x=20;x<=380;x+=2){const t=(x-20)/360,f=.035+t*t*.55;wave+=` L${x} ${40+16*Math.sin(((x-20)*f))}`}
  return `<svg viewBox="0 0 400 190" class="ldiag" role="img" aria-label="Electromagnetic spectrum">
<path d="${wave}" class="d-wave"/>
${names.map((n,i)=>`<g class="lb" data-n="${i+1}"><rect x="${20+i*51.4}" y="70" width="51.4" height="44" fill="${cols[i]}" opacity=".85"/><g class="lbt"><text x="${45.7+i*51.4}" y="${n.includes("-")?88:96}" text-anchor="middle" class="d-band">${n.includes("-")?n.split("-").map((p,k)=>`<tspan x="${45.7+i*51.4}" dy="${k?13:0}">${p}${k?"":"-"}</tspan>`).join(""):n}</text></g><g class="lbn"><circle cx="${45.7+i*51.4}" cy="92" r="10" class="d-nb"/><text x="${45.7+i*51.4}" y="96" text-anchor="middle" class="d-nt">${i+1}</text></g></g>`).join("")}
<path d="M30 140 L370 140" class="d-arrow-r"/><text x="200" y="134" text-anchor="middle" class="d-cap">frequency and energy increase →</text>
<path d="M370 166 L30 166" class="d-arrow-b"/><text x="200" y="184" text-anchor="middle" class="d-cap">← wavelength increases</text>
</svg>`})();

const CIRC=`<svg viewBox="0 0 400 210" class="ldiag" role="img" aria-label="Series and parallel circuits">
<text x="100" y="18" text-anchor="middle" class="d-big">Series</text><text x="300" y="18" text-anchor="middle" class="d-big">Parallel</text>
<path d="M30 40 L170 40 L170 170 L30 170 Z" class="d-wire"/>
<g><rect x="88" y="30" width="24" height="20" class="d-bg"/><path d="M94 28 L94 52 M104 34 L104 46" class="d-line"/></g>
<g><circle cx="70" cy="170" r="11" class="d-bgc"/><path d="M62 162 L78 178 M78 162 L62 178" class="d-line"/></g>
<g><circle cx="130" cy="170" r="11" class="d-bgc"/><path d="M122 162 L138 178 M138 162 L122 178" class="d-line"/></g>
<g><circle cx="170" cy="105" r="12" class="d-bgc"/><text x="170" y="110" text-anchor="middle" class="d-sym">A</text></g>
<path d="M230 40 L370 40 L370 170 L230 170 Z M230 105 L370 105" class="d-wire"/>
<g><rect x="288" y="30" width="24" height="20" class="d-bg"/><path d="M294 28 L294 52 M304 34 L304 46" class="d-line"/></g>
<g><circle cx="300" cy="105" r="11" class="d-bgc"/><path d="M292 97 L308 113 M308 97 L292 113" class="d-line"/></g>
<g><circle cx="300" cy="170" r="11" class="d-bgc"/><path d="M292 162 L308 178 M308 162 L292 178" class="d-line"/></g>
<text x="100" y="200" text-anchor="middle" class="d-cap">one loop: same current everywhere</text>
<text x="300" y="200" text-anchor="middle" class="d-cap">branches: same p.d. across each</text>
${L(98,46,98,72,1,"Cell")}
${L(130,159,130,132,2,"Lamp","end")}
${L(158,105,128,105,3,"Ammeter","end")}
</svg>`;

/* ---------- lessons ---------- */
window.LESSONS={
biology:[
{id:"micro",topic:"B1",title:"Microscopes and magnification",mins:8,steps:[
 {t:"learn",h:"Why we use microscopes",html:`<p>Cells are far too small to see with your eyes. A <b>light microscope</b> uses lenses and light to make them look bigger.</p><ul><li><b>Magnification</b>: how many times bigger the image is than the real object.</li><li><b>Resolution</b>: how clearly you can see two points that are close together as separate.</li><li>An <b>electron microscope</b> has a much higher magnification and resolution, so you can see tiny structures like ribosomes and the inside of mitochondria.</li></ul>`},
 {t:"diagram",h:"Parts of a light microscope",svg:MICRO,html:`<p>Light shines up through the slide. The <b>objective lens</b> and the <b>eyepiece lens</b> both magnify. Use the <b>coarse focus</b> first on the lowest power, then the <b>fine focus</b>.</p>`},
 {t:"learn",h:"The magnification equation",html:`<div class="formula">magnification = size of image ÷ size of real object</div><p><b>Total magnification</b> = eyepiece × objective. A ×10 eyepiece with a ×40 objective gives ×400.</p><p><b>Units must match.</b> 1 mm = 1000 µm (micrometres). Convert before you divide.</p>`},
 {t:"example",h:"Worked example",html:`<p><b>A cell's image is 12 mm wide. The magnification is ×400. How big is the real cell in µm?</b></p><ol class="steps"><li>Rearrange: real size = image size ÷ magnification.</li><li>12 mm ÷ 400 = <b>0.03 mm</b>.</li><li>Convert to µm: 0.03 × 1000 = <b>30 µm</b>.</li></ol>`},
 {t:"q",h:"Quick check",q:"A microscope has a ×10 eyepiece and a ×40 objective. What is the total magnification?",o:["×50","×400","×4","×4000"],a:1,ex:"Multiply them: 10 × 40 = 400."},
 {t:"num",h:"Your turn",q:"An image is 6 mm long. The real object is 0.002 mm long. Calculate the magnification.",ans:3000,tol:.5,unit:"×",ex:"6 ÷ 0.002 = 3000, so the magnification is ×3000. Both lengths were already in mm, so no conversion was needed."},
 {t:"mistake",h:"Common mistake",html:`<p>Dividing lengths in <b>different units</b>, like an image in mm and a cell in µm. Always convert both to the same unit first, then divide.</p>`},
 {t:"sum",h:"Summary",bullets:["magnification = image size ÷ real size","total magnification = eyepiece × objective","1 mm = 1000 µm: convert before dividing","Electron microscopes have higher magnification and resolution"]}]},
{id:"heart",topic:"B2",title:"The heart and blood flow",mins:9,steps:[
 {t:"learn",h:"A double pump",html:`<p>The heart is two pumps side by side. The <b>right side</b> pumps blood to the <b>lungs</b> to pick up oxygen. The <b>left side</b> pumps oxygenated blood to the <b>rest of the body</b>.</p><p>This is a <b>double circulation</b>: blood passes through the heart twice on each full trip around the body.</p>`},
 {t:"diagram",h:"Label the heart",svg:HEART,html:`<p><span class="tag-b">Blue</span> = deoxygenated blood (right side). <span class="tag-r">Red</span> = oxygenated blood (left side). <b>Valves</b> stop blood flowing backwards.</p>`},
 {t:"learn",h:"The route, step by step",html:`<ol class="steps"><li><b>Vena cava</b> brings blood from the body into the <b>right atrium</b>.</li><li>Through a valve into the <b>right ventricle</b>.</li><li>Pumped up the <b>pulmonary artery</b> to the lungs, where it picks up oxygen.</li><li>Back through the <b>pulmonary vein</b> into the <b>left atrium</b>.</li><li>Through a valve into the <b>left ventricle</b>.</li><li>Pumped out of the <b>aorta</b> to the body.</li></ol>`},
 {t:"example",h:"Worked example: a 3-mark explanation",html:`<p><b>Explain why the left ventricle has a thicker wall than the right ventricle.</b></p><p>The left ventricle pumps blood <b>all around the body</b> (1), while the right ventricle only pumps it to the nearby <b>lungs</b> (1). So the left ventricle needs more muscle to pump at a <b>higher pressure</b> (1).</p>`},
 {t:"q",h:"Quick check",q:"Which blood vessel carries blood from the heart to the lungs?",o:["Pulmonary vein","Aorta","Pulmonary artery","Vena cava"],a:2,ex:"Arteries carry blood away from the heart. The pulmonary artery goes to the lungs."},
 {t:"q",h:"Your turn",q:"Blood has just left the lungs. Which chamber does it enter next?",o:["Right atrium","Left atrium","Right ventricle","Left ventricle"],a:1,ex:"Pulmonary vein → left atrium → left ventricle → aorta."},
 {t:"mistake",h:"Common mistake",html:`<p>Mixing up left and right. Diagrams show the heart <b>from the front</b>, so its left side is on the <b>right of the picture</b>. Another: thinking all arteries carry oxygenated blood. The pulmonary artery carries <b>deoxygenated</b> blood. Arteries carry blood <b>away from</b> the heart.</p>`},
 {t:"sum",h:"Summary",bullets:["Right side → lungs; left side → body","Vena cava → RA → RV → pulmonary artery → lungs → pulmonary vein → LA → LV → aorta","Valves prevent backflow","Left ventricle wall is thickest: it pumps to the whole body"]}]},
{id:"cycle",topic:"B1",title:"The cell cycle and mitosis",mins:7,steps:[
 {t:"learn",h:"Why cells divide",html:`<p>Body cells divide by <b>mitosis</b> for <b>growth</b>, <b>repair</b> of damaged tissue and <b>asexual reproduction</b>. Each division makes <b>two genetically identical</b> cells.</p>`},
 {t:"diagram",h:"The cell cycle",svg:CYCLE,html:`<p>The cycle has three stages: interphase, mitosis and cytokinesis.</p>`},
 {t:"learn",h:"The three stages",html:`<ol class="steps"><li><b>Interphase</b>: the cell grows, makes more sub-cellular structures such as ribosomes and mitochondria, and <b>copies its DNA</b> so each chromosome becomes two copies.</li><li><b>Mitosis</b>: one set of chromosomes is pulled to each end of the cell, and the nucleus divides.</li><li><b>Cytokinesis</b>: the cytoplasm and cell membrane divide to form two identical cells.</li></ol>`},
 {t:"example",h:"Worked example",html:`<p><b>A human body cell has 46 chromosomes. How many chromosomes are in each cell made by mitosis, and why?</b></p><p><b>46.</b> The DNA is copied before division, then one full set goes to each new cell, so the new cells are identical to the parent cell.</p>`},
 {t:"q",h:"Quick check",q:"In which stage is the DNA copied?",o:["Mitosis","Cytokinesis","Interphase","Fertilisation"],a:2,ex:"DNA is copied during interphase, before the cell divides."},
 {t:"q",h:"Your turn",q:"Why must DNA be copied before a cell divides?",o:["So each new cell gets a full, identical set of chromosomes","So the cell can grow bigger","To make the cell divide faster","So the new cells have half the chromosomes"],a:0,ex:"Without copying, each new cell would only get half the genetic information. Halving the chromosome number happens in meiosis, not mitosis."},
 {t:"mistake",h:"Common mistake",html:`<p>Mixing up <b>mitosis</b> (two identical body cells, full chromosome number) with <b>meiosis</b> (four different gametes, half the chromosomes). Also, don't say "mitosis copies the DNA": the copying happens in interphase.</p>`},
 {t:"sum",h:"Summary",bullets:["Mitosis: growth, repair, asexual reproduction","Interphase: grow, more organelles, copy DNA","Mitosis: chromosomes pulled apart, nucleus divides","Cytokinesis: cytoplasm and membrane divide","Result: two genetically identical cells"]}]}
],
chemistry:[
{id:"moles",topic:"C3",title:"Moles, mass and Mr",mins:9,steps:[
 {t:"learn",h:"What is a mole?",html:`<p>A <b>mole</b> is an amount of substance: it always contains the same number of particles, <b>6.02 × 10²³</b> (the Avogadro constant, Higher tier).</p><p>The <b>relative formula mass (Mr)</b> is the sum of the relative atomic masses (Ar) of all the atoms in the formula. One mole of a substance has a mass equal to its Mr in grams.</p>`},
 {t:"example",h:"Working out Mr",html:`<p><b>Find the Mr of water, H₂O.</b> (Ar: H = 1, O = 16)</p><ol class="steps"><li>Two hydrogen atoms: 2 × 1 = 2.</li><li>One oxygen atom: 16.</li><li>Add them: 2 + 16 = <b>18</b>.</li></ol><p><b>CO₂</b>: 12 + (2 × 16) = <b>44</b>.</p>`},
 {t:"diagram",h:"The formula triangle",svg:TRI,html:`<div class="formula">moles = mass ÷ Mr</div><p>Rearranged: mass = moles × Mr, and Mr = mass ÷ moles.</p>`},
 {t:"example",h:"Worked example",html:`<p><b>How many moles are in 22 g of carbon dioxide (Mr 44)?</b></p><p>moles = 22 ÷ 44 = <b>0.5 mol</b>.</p><p><b>What is the mass of 0.25 mol of NaOH (Mr 40)?</b></p><p>mass = 0.25 × 40 = <b>10 g</b>.</p>`},
 {t:"num",h:"Quick check",q:"How many moles are in 36 g of water (Mr 18)?",ans:2,tol:.001,unit:"mol",ex:"36 ÷ 18 = 2 mol."},
 {t:"num",h:"Your turn",q:"What is the mass of 3 mol of oxygen gas, O₂? (Ar of O = 16)",ans:96,tol:.01,unit:"g",ex:"Mr of O₂ = 2 × 16 = 32. Mass = 3 × 32 = 96 g."},
 {t:"mistake",h:"Common mistake",html:`<p>Using the Ar of an element when the substance is a molecule. Oxygen gas is <b>O₂</b>, so its Mr is <b>32</b>, not 16. The same goes for H₂, N₂ and Cl₂.</p>`},
 {t:"sum",h:"Summary",bullets:["Mr = add up the Ar of every atom in the formula","moles = mass ÷ Mr","mass = moles × Mr","Watch for diatomic gases: O₂, H₂, N₂, Cl₂"]}]}
],
physics:[
{id:"ems",topic:"P6",title:"The electromagnetic spectrum",mins:8,steps:[
 {t:"learn",h:"One family of waves",html:`<p>Electromagnetic (EM) waves are <b>transverse</b> waves that transfer energy. They all travel at the <b>same speed in a vacuum</b>: 3 × 10⁸ m/s.</p><p>They form a continuous <b>spectrum</b>, grouped by wavelength and frequency.</p>`},
 {t:"diagram",h:"The order of the spectrum",svg:EMS,html:`<p>A way to remember the order: <b>R</b>ich <b>M</b>en <b>I</b>n <b>V</b>egas <b>U</b>se e<b>X</b>pensive <b>G</b>adgets. Radio has the <b>longest</b> wavelength; gamma has the <b>highest</b> frequency and energy.</p>`},
 {t:"learn",h:"Uses and dangers",html:`<div class="tbl"><table><tr><th>Wave</th><th>Use</th></tr><tr><td>Radio</td><td>TV and radio broadcasts</td></tr><tr><td>Microwaves</td><td>Satellite communication, cooking</td></tr><tr><td>Infrared</td><td>Heaters, thermal cameras, cooking</td></tr><tr><td>Visible</td><td>Fibre optics, seeing</td></tr><tr><td>Ultraviolet</td><td>Energy-efficient lamps, sun tanning</td></tr><tr><td>X-rays and gamma</td><td>Medical imaging and treatment</td></tr></table></div><p>UV, X-rays and gamma are <b>ionising</b>: they can damage cells and cause cancer.</p>`},
 {t:"example",h:"Worked example",html:`<p><b>A radio station broadcasts at 100 MHz. What is the wavelength?</b></p><ol class="steps"><li>Convert: 100 MHz = 100 000 000 Hz = 1 × 10⁸ Hz.</li><li>Use v = fλ, so λ = v ÷ f.</li><li>λ = 3 × 10⁸ ÷ 1 × 10⁸ = <b>3 m</b>.</li></ol>`},
 {t:"q",h:"Quick check",q:"Which EM wave has the highest frequency?",o:["Radio","Ultraviolet","Gamma","Infrared"],a:2,ex:"Gamma rays are at the high-frequency, short-wavelength end."},
 {t:"q",h:"Your turn",q:"A microwave has a wavelength of 0.12 m. What is its frequency? (v = 3 × 10⁸ m/s)",o:["3.6 × 10⁷ Hz","2.5 × 10⁹ Hz","2.5 × 10⁸ Hz","4.0 × 10⁻¹⁰ Hz"],a:1,ex:"f = v ÷ λ = 3 × 10⁸ ÷ 0.12 = 2.5 × 10⁹ Hz."},
 {t:"mistake",h:"Common mistake",html:`<p>Forgetting to convert prefixes: k = × 10³, M = × 10⁶, G = × 10⁹. Another: saying EM waves travel at different speeds. In a vacuum they're all the same; what changes is the wavelength and frequency.</p>`},
 {t:"sum",h:"Summary",bullets:["Order: radio, microwaves, infrared, visible, UV, X-rays, gamma","All transverse, all 3 × 10⁸ m/s in a vacuum","Longer wavelength = lower frequency","UV, X-rays and gamma are ionising","v = fλ: convert MHz and GHz first"]}]},
{id:"circ",topic:"P2",title:"Series and parallel circuits",mins:8,steps:[
 {t:"learn",h:"Two ways to connect",html:`<p>In a <b>series</b> circuit the components are in one loop. In a <b>parallel</b> circuit the current splits into branches.</p>`},
 {t:"diagram",h:"The two circuits",svg:CIRC,html:`<p>Each circuit has a <b>cell</b> and two <b>lamps</b>. The <b>ammeter</b> is always connected in series to measure current.</p>`},
 {t:"learn",h:"The rules",html:`<div class="tbl"><table><tr><th></th><th>Series</th><th>Parallel</th></tr><tr><td>Current</td><td>The same everywhere</td><td>Splits between branches; branch currents add up to the total</td></tr><tr><td>Potential difference</td><td>Shared between components</td><td>The same across each branch</td></tr><tr><td>Total resistance</td><td>R₁ + R₂</td><td>Less than the smallest resistor</td></tr><tr><td>If one lamp breaks</td><td>Everything goes off</td><td>The others stay on</td></tr></table></div>`},
 {t:"example",h:"Worked example",html:`<p><b>A 4 Ω and a 6 Ω resistor are in series with a 12 V battery. What is the current?</b></p><ol class="steps"><li>Total resistance = 4 + 6 = 10 Ω.</li><li>V = IR, so I = V ÷ R.</li><li>I = 12 ÷ 10 = <b>1.2 A</b>.</li></ol>`},
 {t:"num",h:"Quick check",q:"Two branches of a parallel circuit carry 0.4 A and 0.6 A. What is the current from the cell?",ans:1,tol:.001,unit:"A",ex:"In parallel, branch currents add up: 0.4 + 0.6 = 1.0 A."},
 {t:"q",h:"Your turn",q:"Why are the lights in a house wired in parallel?",o:["So they all share the same current","So each light can be switched on and off on its own and keeps working if another breaks","So the total resistance is bigger","So the voltage is shared between them"],a:1,ex:"In parallel each branch gets the full p.d. and works independently."},
 {t:"mistake",h:"Common mistake",html:`<p>Thinking that adding resistors in parallel increases the total resistance. It <b>decreases</b> it, because the current has more paths to flow through.</p>`},
 {t:"sum",h:"Summary",bullets:["Series: same current, p.d. shared, R total = R₁ + R₂","Parallel: same p.d., currents add up, R total gets smaller","Ammeters in series, voltmeters in parallel","V = IR"]}]}
]};
})();
