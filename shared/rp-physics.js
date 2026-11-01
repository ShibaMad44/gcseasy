/* AQA Physics required practicals. */
(function(){const {L,B,A,T,SVG,N,BN,K}=window.LSN;
const V=q=>"AQA GCSE physics required practical "+q;
const vars=(iv,dv,cv)=>`<div class="tbl"><table><tr><th>Independent (you change)</th><td>${iv}</td></tr><tr><th>Dependent (you measure)</th><td>${dv}</td></tr><tr><th>Control (keep the same)</th><td>${cv}</td></tr></table></div>`;
const ol=a=>`<ol class="steps">${a.map(x=>`<li>${x}</li>`).join("")}</ol>`;
const TRIPLE=`<p class="note">Triple (separate) Physics only: not in Combined Science.</p>`;

const SHC=SVG(560,270,"Measuring specific heat capacity",`
<rect x="146" y="96" width="168" height="138" rx="6" fill="#f4e9d8" stroke="var(--muted)" stroke-dasharray="6 4"/>
<rect x="160" y="110" width="140" height="110" class="d-c6"/><rect x="190" y="60" width="14" height="130" fill="#555"/>${K.therm(262,50,140)}
<rect x="20" y="24" width="110" height="40" rx="6" class="d-c4"/>${T(75,49,"Joulemeter","sm")}${K.wire("M130 44 L197 44 L197 60")}
${L(190,90,120,120,1,"Immersion heater","end")}${L(262,64,330,44,2,"Thermometer")}${L(300,190,340,190,3,"Aluminium block (1 kg)")}${L(150,216,110,248,4,"Insulation","end")}`,-20);

const INSUL=SVG(500,280,"Comparing insulating materials",`
${K.beaker(60,90,110,140,.8)}${K.therm(115,40,170)}
<rect x="236" y="84" width="138" height="152" rx="6" fill="#f4e9d8" stroke="var(--muted)" stroke-dasharray="6 4"/>${K.beaker(250,90,110,140,.8)}<rect x="244" y="80" width="122" height="8" class="d-c6"/>${K.therm(305,30,180)}
${N(115,256,1,"No insulation")}${N(305,256,2,"Layers + lid")}${L(374,160,400,130,3,"Insulation")}`);

const RESW=SVG(560,270,"Measuring how resistance depends on the length of a wire",`
${K.ruler(80,170,340,18)}<path d="M80 168 L420 168" stroke="#b87333" stroke-width="3"/>
${K.wire("M90 166 L90 60 L300 60 L300 166")}${K.meter(160,60,"A")}${K.cell(250,60)}
${K.wire("M90 168 L90 230 L300 230 L300 168")}${K.meter(195,230,"V")}
<path d="M84 160 L96 160 L90 172 Z" fill="#555"/><path d="M294 160 L306 160 L300 172 Z" fill="#555"/>
${L(300,162,340,130,1,"Clip: move to change length")}${L(173,60,200,30,2,"Ammeter in series")}${L(208,230,330,246,3,"Voltmeter across the wire")}${L(390,188,400,212,4,"Metre ruler")}`);

const IVC=SVG(520,270,"Circuit for finding I–V characteristics",`
${K.wire("M80 60 L400 60 L400 200 L80 200 Z")}${K.cell(250,60)}${K.meter(160,60,"A")}
${K.res(160,200)}<path d="M140 214 L182 186" class="d-ar"/>${K.res(320,200)}
${K.wire("M290 200 L290 240 L350 240 L350 200")}${K.meter(320,240,"V")}
${N(320,178,1,"Component")}${N(160,232,2,"Variable resistor")}${L(173,60,210,30,3,"Ammeter in series")}${L(333,240,380,256,4,"Voltmeter across it")}`);

const panel=(ox,n,t,d)=>`<path d="M${ox+10} 110 L${ox+130} 110 M${ox+70} 50 L${ox+70} 170" class="d-no"/><path d="${d}" fill="none" stroke="#2F6FD6" stroke-width="2.5"/>${N(ox+70,30,n,t)}${T(ox+132,124,"V","cap","end")}${T(ox+76,56,"I","cap","start")}`;
const IVG=SVG(480,200,"I–V graphs for three components",`
${panel(10,1,"Resistor","M30 160 L130 60")}${panel(170,2,"Filament lamp","M180 150 C210 146 225 128 240 110 C255 92 270 74 300 70")}${panel(330,3,"Diode","M340 110 L412 110 C420 108 425 90 430 50")}
${T(240,194,"Straight line = constant resistance (at constant temperature)","cap")}`);

const DENS=SVG(480,280,"Finding the volume of an irregular object",`
<rect x="62" y="105" width="106" height="123" class="d-water"/><path d="M60 80 L60 230 L170 230 L170 80" class="d-glassw"/><path d="M170 106 L205 126" stroke="var(--ink)" stroke-width="4"/>
<path d="M115 40 L115 150" stroke="var(--ink)"/><rect x="97" y="150" width="36" height="28" rx="8" fill="#999" stroke="var(--ink)"/>
<circle cx="208" cy="134" r="3" fill="#6FA8DC" class="d-pulse"/>${K.cyl(200,140,46,100,.35)}
<path d="M340 160 L400 160 L400 216 L340 216 Z" class="d-c1"/><path d="M340 160 L360 144 L420 144 L400 160 Z M400 160 L420 144 L420 200 L400 216 Z" class="d-c1"/>
${T(380,240,"Regular block: V = l × w × h","cap")}
${L(115,60,180,40,1,"Object on a thread")}${L(204,126,260,100,2,"Displaced water")}${L(246,200,290,196,3,"Measuring cylinder")}${L(150,228,150,258,4,"Eureka can")}`);

const SPRING=SVG(440,300,"Measuring the extension of a spring",`
${K.stand(80,20,250,110,40)}${K.spring(190,40,120,12)}<path d="M190 160 L190 172" class="d-line"/>
<rect x="176" y="172" width="28" height="4" class="d-c6"/>${[176,188,200].map(y=>`<rect x="170" y="${y}" width="40" height="10" class="d-c6"/>`).join("")}
${K.ruler(232,30,24,230,true)}<path d="M190 166 L232 166" stroke="#D2433B" stroke-width="2"/>
${L(198,100,290,80,1,"Spring")}${L(250,140,290,124,2,"Ruler, vertical")}${L(226,166,290,170,3,"Pointer")}${L(210,200,290,214,4,"Masses (1 N each)")}`);

const TROLL=SVG(560,280,"Investigating force, mass and acceleration",`
<rect x="20" y="170" width="400" height="14" class="d-c6"/><circle cx="420" cy="168" r="10" class="d-c0"/>
<rect x="90" y="138" width="90" height="28" rx="4" class="d-c1"/><circle cx="105" cy="170" r="7" class="d-c6"/><circle cx="165" cy="170" r="7" class="d-c6"/><rect x="120" y="110" width="30" height="28" class="d-c4"/>
<path d="M180 150 L414 160 M430 168 L430 228" stroke="var(--ink)" stroke-width="1.5"/>${[228,238,248].map(y=>`<rect x="420" y="${y}" width="20" height="8" class="d-c6"/>`).join("")}
${[236,336].map(x=>`<rect x="${x}" y="96" width="10" height="74" fill="#555"/><circle cx="${x+5}" cy="124" r="4" fill="#D2433B" class="d-pulse"/>`).join("")}
${L(135,118,80,80,1,"Card on trolley","end")}${L(241,100,270,60,2,"Light gates")}${L(424,160,450,124,3,"Pulley")}${L(430,250,380,268,4,"Hanging masses","end")}`,-50);

const RIPPLE=SVG(560,290,"A ripple tank",`
${K.lampL(240,22)}<path d="M240 40 L130 190 M240 40 L370 190" class="d-ln" stroke-dasharray="4 4"/>
<rect x="90" y="70" width="300" height="50" class="d-sea"/><rect x="96" y="50" width="22" height="12" class="d-c6"/><rect x="100" y="60" width="14" height="50" class="d-c6"/>
<rect x="80" y="190" width="320" height="50" class="d-c0"/>${[130,170,210,250,290,330,370].map(x=>`<path d="M${x} 194 L${x} 236" stroke="var(--ink)" stroke-width="3" opacity=".55"/>`).join("")}
${A(172,230,208,230)}${T(190,224,"λ","big")}
${L(258,22,320,22,1,"Lamp above")}${L(100,80,40,60,2,"Vibrating bar","end")}${L(360,110,400,144,3,"Ripple tank")}${L(90,240,66,266,4,"Wave pattern on paper","start")}`,-70);

const LESLIE=SVG(640,270,"A Leslie cube and infrared detector",`
<path d="M110 90 L160 60 L280 60 L230 90 Z" fill="#eee" stroke="var(--ink)"/><rect x="110" y="90" width="120" height="120" fill="#222" stroke="var(--ink)"/><path d="M230 90 L280 60 L280 180 L230 210 Z" fill="#d6d6d6" stroke="var(--ink)"/>
<path d="M175 50 q6 -10 0 -20 M195 50 q6 -10 0 -20 M215 50 q6 -10 0 -20" fill="none" stroke="var(--muted)" stroke-width="1.5"/>
<rect x="380" y="118" width="70" height="44" rx="6" class="d-c6"/><path d="M380 126 L350 116 L350 164 L380 154 Z" class="d-c6"/>
${A(314,200,284,200)}${A(316,200,346,200)}${T(315,222,"same distance","cap")}
${L(112,150,60,150,1,"Matt black face","end")}${L(262,170,300,240,2,"Shiny silver face")}${L(415,120,430,90,3,"Infrared detector")}${L(200,64,226,26,4,"Hot water inside")}`,-60);

const REFR=SVG(560,290,"Refraction through a glass block",`
<rect x="140" y="110" width="200" height="90" class="d-c1" opacity=".8"/>
<path d="M200 60 L200 250" class="d-ln" stroke-dasharray="5 4"/>
<rect x="60" y="20" width="46" height="24" rx="3" class="d-c6" transform="rotate(35 83 32)"/>
${A(102,44,196,107,"red")}<path d="M200 110 L240 200" stroke="#D2433B" stroke-width="2"/>${A(240,200,296,264,"red")}
<path d="M200 80 A30 30 0 0 0 175.4 92.8" class="d-no"/><path d="M200 140 A30 30 0 0 0 212.2 137.4" class="d-no"/>${T(186,76,"i","big")}${T(214,160,"r","big")}
${L(72,30,40,70,1,"Ray box","end")}${L(200,66,240,40,2,"Normal (90° to surface)")}${L(320,150,360,150,3,"Glass block")}${L(270,235,320,250,4,"Ray bends back out")}`,-60);

window.LESSONS.physics.push(
{id:"rp-shc",topic:"P1",rp:true,title:"Specific heat capacity",mins:9,steps:[
 {t:"learn",h:"The aim",html:`<p>Find the specific heat capacity of a material (e.g. a 1 kg aluminium block): the energy needed to raise 1 kg by 1 °C.</p>${vars("Energy supplied (time heating)","Temperature of the block","Mass of block, power of heater, insulation")}`},
 {t:"diagram",h:"The set-up",svg:SHC,html:`<p>A drop of water in the thermometer hole improves contact. Insulation reduces energy lost to the surroundings.</p>`},
 {t:"learn",h:"Method",html:ol(["Measure the mass of the block.","Wrap it in insulation and put the heater and thermometer in the holes.","Record the starting temperature and zero the joulemeter (or use V and I with a stopwatch).","Switch on and record energy and temperature every minute for 10 minutes.","Plot temperature against energy supplied."]),vid:V("specific heat capacity")},
 {t:"example",h:"Calculating c",html:`<div class="formula">c = energy ÷ (mass × temperature change)</div><p><b>15 000 J raises a 1 kg block by 16.7 °C.</b></p><p>c = 15 000 ÷ (1 × 16.7) = <b>898 J/kg°C</b> (aluminium is about 900).</p><p>From the graph: c = 1 ÷ (mass × gradient).</p>`},
 {t:"num",h:"Your turn",q:"18 000 J raises a 1.0 kg block by 20 °C. What is its specific heat capacity (J/kg°C)?",ans:900,tol:.5,unit:"J/kg°C",ex:"18 000 ÷ (1 × 20) = 900 J/kg°C."},
 {t:"q",h:"Quick check",q:"Why is the measured value usually higher than the true value?",o:["The thermometer is wrong","Some energy is lost to the surroundings, so not all of it heats the block","The block gets heavier","The joulemeter adds energy"],a:1,ex:"Lost energy means more energy is recorded for the same temperature rise."},
 {t:"mistake",h:"Errors and improvements",html:`<ul><li>Energy lost to the surroundings: use more insulation.</li><li>The temperature keeps rising after switching off: record the highest temperature.</li><li>Poor thermometer contact: add a drop of water or oil.</li></ul>`},
 {t:"sum",h:"Summary",bullets:["Insulated block, heater, thermometer, joulemeter","Energy and temperature every minute","c = E ÷ (m × Δθ)","c = 1 ÷ (m × gradient)","Heat loss makes c too high"],vid:V("specific heat capacity")}]},

{id:"rp-insul",triple:true,topic:"P1",rp:true,title:"Thermal insulation",mins:7,steps:[
 {t:"learn",h:"The aim",html:`${TRIPLE}<p>Investigate how the type or thickness of insulation affects how fast a beaker of hot water cools.</p>${vars("Type of material, or number of layers","Temperature drop over a set time","Volume and starting temperature of water, beaker size, time, room temperature")}`},
 {t:"diagram",h:"The set-up",svg:INSUL,html:`<p>The best insulator gives the <b>smallest</b> temperature drop.</p>`},
 {t:"learn",h:"Method",html:ol(["Pour the same volume of hot water (e.g. 80 °C) into each beaker.","Wrap one in the insulating material and add a lid; leave a control beaker unwrapped.","Record the temperature every 3 minutes for 20 minutes.","Repeat with different materials or numbers of layers.","Plot cooling curves (temperature against time)."]),vid:V("thermal insulation")},
 {t:"example",h:"Comparing results",html:`<p><b>In 20 minutes, beaker A falls from 80 °C to 62 °C; beaker B (insulated) from 80 °C to 70 °C.</b></p><p>A drops 18 °C; B drops <b>10 °C</b>. B loses energy more slowly, so its insulation works better.</p>`},
 {t:"num",h:"Your turn",q:"Water cools from 78 °C to 64 °C. What is the temperature drop (°C)?",ans:14,tol:.01,unit:"°C",ex:"78 − 64 = 14 °C."},
 {t:"q",h:"Quick check",q:"Why must every beaker start at the same temperature?",o:["It looks neater","Hotter water cools faster, so it wouldn't be a fair test","Thermometers only read one temperature","It saves water"],a:1,ex:"The rate of cooling depends on the temperature difference with the room."},
 {t:"mistake",h:"Errors and improvements",html:`<ul><li>Different starting temperatures: wait until all are at the same start.</li><li>Use a lid on every beaker, or none, to keep it fair.</li><li>Data loggers record temperatures more precisely.</li></ul>`},
 {t:"sum",h:"Summary",bullets:["Same volume and starting temperature","Wrap one; keep an unwrapped control","Temperature every 3 minutes","Smallest drop = best insulator","Plot cooling curves"],vid:V("thermal insulation")}]},

{id:"rp-resistance",topic:"P2",rp:true,title:"Resistance of a wire",mins:9,steps:[
 {t:"learn",h:"The aim",html:`<p>Investigate how the length of a wire affects its resistance. (You can also test resistors in series and parallel.)</p>${vars("Length of wire","Resistance (from V and I)","Material, thickness of wire, temperature, supply p.d.")}`},
 {t:"diagram",h:"The circuit",svg:RESW,html:`<p>The <b>ammeter</b> goes in series; the <b>voltmeter</b> goes in parallel across the length of wire being tested.</p>`},
 {t:"learn",h:"Method",html:ol(["Attach the wire along a metre ruler with crocodile clips.","Put one clip at 0 cm and the other at 10 cm.","Close the switch, record V and I, then open the switch.","Move the clip to 20, 30… 100 cm and repeat.","Calculate R = V ÷ I and plot resistance against length."]),vid:V("resistance of a wire")},
 {t:"example",h:"Calculating R",html:`<div class="formula">resistance = potential difference ÷ current</div><p><b>V = 1.2 V, I = 0.40 A.</b> R = 1.2 ÷ 0.40 = <b>3.0 Ω</b>.</p><p>The graph is a straight line through the origin: resistance is <b>directly proportional</b> to length.</p>`},
 {t:"num",h:"Your turn",q:"V = 2.0 V and I = 0.50 A. What is the resistance (Ω)?",ans:4,tol:.001,unit:"Ω",ex:"2.0 ÷ 0.50 = 4 Ω."},
 {t:"q",h:"Quick check",q:"Why should the switch be opened between readings?",o:["To save the battery only","To stop the wire heating up, which would change its resistance","To reset the ammeter","To move the ruler"],a:1,ex:"Temperature is a control variable: hot wires have higher resistance."},
 {t:"mistake",h:"Errors and improvements",html:`<ul><li>The wire heating up: use a low current and switch off between readings.</li><li>Clips not exactly at the marks: read the ruler carefully at eye level.</li><li>The graph may not pass through zero because of contact resistance at the clips.</li></ul>`},
 {t:"sum",h:"Summary",bullets:["Ammeter in series; voltmeter in parallel","Change length with a crocodile clip","R = V ÷ I","Longer wire → more resistance (proportional)","Low current; switch off to avoid heating"],vid:V("resistance of a wire")}]},

{id:"rp-iv",topic:"P2",rp:true,title:"I–V characteristics",mins:9,steps:[
 {t:"learn",h:"The aim",html:`<p>Find how the current through a component changes with the potential difference across it, for a <b>resistor</b>, a <b>filament lamp</b> and a <b>diode</b>.</p>`},
 {t:"diagram",h:"The circuit",svg:IVC,html:`<p>The <b>variable resistor</b> changes the current, so you can take a range of readings.</p>`},
 {t:"learn",h:"Method",html:ol(["Set up the circuit with the component, an ammeter in series and a voltmeter across the component.","Use the variable resistor to change the p.d.; record V and I each time.","Swap the supply connections round to get negative values.","Repeat for each component and plot I (y-axis) against V (x-axis)."]),vid:V("IV characteristics")},
 {t:"diagram",h:"What the graphs show",svg:IVG,html:`<p><b>Lamp</b>: as it heats up, its resistance increases, so the line curves. <b>Diode</b>: current flows in one direction only, once the p.d. is above about 0.7 V.</p>`},
 {t:"q",h:"Quick check",q:"Which component has a straight-line I–V graph through the origin?",o:["Filament lamp","Diode","Resistor at constant temperature","Thermistor"],a:2,ex:"It's ohmic: current is proportional to p.d."},
 {t:"q",h:"Your turn",q:"Why does a filament lamp's graph curve?",o:["Its resistance falls as it heats","Its resistance rises as it heats up","It only conducts one way","The ammeter is wrong"],a:1,ex:"Hotter metal ions vibrate more, so electrons collide more."},
 {t:"mistake",h:"Errors and improvements",html:`<ul><li>Connecting the voltmeter in series: it must be in <b>parallel</b> across the component.</li><li>Components heat up: switch off between readings (except the lamp, where heating is the point).</li><li>Take enough readings near the diode's threshold.</li></ul>`},
 {t:"sum",h:"Summary",bullets:["Variable resistor changes current","Reverse the supply for negative values","Resistor: straight line","Lamp: S-shaped curve (resistance rises)","Diode: one direction only"],vid:V("IV characteristics")}]},

{id:"rp-density",topic:"P3",rp:true,title:"Density",mins:8,steps:[
 {t:"learn",h:"The aim",html:`<p>Find the density of regular objects, irregular objects and liquids.</p><div class="formula">density = mass ÷ volume</div>`},
 {t:"diagram",h:"Measuring volume",svg:DENS,html:`<p>For an irregular object, the volume of water it <b>displaces</b> equals its own volume.</p>`},
 {t:"learn",h:"Method",html:ol(["<b>Regular object</b>: measure length, width and height with a ruler; V = l × w × h. Find its mass on a balance.","<b>Irregular object</b>: fill a eureka can to the spout, lower the object in on a thread, and collect the displaced water in a measuring cylinder.","<b>Liquid</b>: put a measuring cylinder on a zeroed balance, add a volume of liquid and record the mass.","Calculate density = mass ÷ volume."]),vid:V("density eureka can")},
 {t:"example",h:"Worked example",html:`<p><b>A stone has a mass of 270 g and displaces 100 cm³ of water.</b></p><p>density = 270 ÷ 100 = <b>2.7 g/cm³</b>.</p>`},
 {t:"num",h:"Your turn",q:"An object has a mass of 79 g and a volume of 10 cm³. What is its density (g/cm³)?",ans:7.9,tol:.01,unit:"g/cm³",ex:"79 ÷ 10 = 7.9 g/cm³ (iron)."},
 {t:"q",h:"Quick check",q:"How should you read a measuring cylinder?",o:["From the top of the meniscus, from above","At eye level, from the bottom of the meniscus","Tilted at an angle","From below"],a:1,ex:"Reading at eye level avoids parallax error."},
 {t:"mistake",h:"Errors and improvements",html:`<ul><li>Water splashing out of the eureka can: lower the object gently.</li><li>Not waiting for the spout to stop dripping before you start.</li><li>Use a measuring cylinder with a smaller scale for better resolution.</li></ul>`},
 {t:"sum",h:"Summary",bullets:["density = mass ÷ volume","Regular: V = l × w × h","Irregular: displacement in a eureka can","Read the meniscus at eye level","1 cm³ of water = 1 ml"],vid:V("density eureka can")}]},

{id:"rp-spring",topic:"P5",rp:true,title:"Force and extension of a spring",mins:8,steps:[
 {t:"learn",h:"The aim",html:`<p>Investigate the relationship between the force on a spring and its extension.</p>${vars("Force (weight of masses added)","Extension of the spring","Same spring, ruler kept vertical")}`},
 {t:"diagram",h:"The set-up",svg:SPRING,html:`<p>Extension = new length − original length.</p>`},
 {t:"learn",h:"Method",html:ol(["Hang the spring from a clamp stand with a ruler beside it, clamped vertically.","Record the original length using a pointer on the bottom of the spring.","Add a 1 N mass and record the new length.","Keep adding masses, recording the length each time.","Calculate each extension and plot force against extension."]),vid:V("force extension spring")},
 {t:"example",h:"Hooke's law",html:`<div class="formula">force = spring constant × extension (F = ke)</div><p><b>A 4 N force stretches a spring by 0.08 m.</b> k = 4 ÷ 0.08 = <b>50 N/m</b>.</p><p>The straight part of the graph shows extension is proportional to force, up to the <b>limit of proportionality</b>.</p>`},
 {t:"num",h:"Your turn",q:"A spring has k = 25 N/m. A 2 N force is applied. What is the extension in metres?",ans:.08,tol:.001,unit:"m",ex:"e = F ÷ k = 2 ÷ 25 = 0.08 m."},
 {t:"q",h:"Quick check",q:"What is the gradient of the force–extension graph?",o:["The mass","The spring constant","The weight","The length"],a:1,ex:"Gradient = force ÷ extension = k."},
 {t:"mistake",h:"Errors and safety",html:`<ul><li>Read the ruler at eye level, level with the pointer, to avoid parallax error.</li><li>Wear eye protection: a spring can snap back.</li><li>Don't overload the spring past its elastic limit, or it won't return to its original length.</li></ul>`},
 {t:"sum",h:"Summary",bullets:["Add 1 N masses; measure length each time","Extension = new − original length","F = ke; gradient = k","Straight line until the limit of proportionality","Eye level; eye protection"],vid:V("force extension spring")}]},

{id:"rp-accel",topic:"P5",rp:true,title:"Force, mass and acceleration",mins:9,steps:[
 {t:"learn",h:"The aim",html:`<p>Investigate how (a) the force on a trolley and (b) its mass affect its acceleration.</p>${vars("Force (hanging mass) or mass of trolley","Acceleration (from the light gates)","For (a): total mass of the system; for (b): the force")}`},
 {t:"diagram",h:"The set-up",svg:TROLL,html:`<p>The light gates time the card on the trolley. A data logger uses those times to work out the acceleration.</p>`},
 {t:"learn",h:"Method",html:ol(["Attach a string to the trolley, over the pulley, to a mass hanger.","Release the trolley and record the acceleration from the light gates.","<b>Changing force</b>: move masses from the trolley to the hanger one at a time, so the total mass stays the same.","<b>Changing mass</b>: add masses to the trolley, keeping the hanging mass the same.","Repeat each reading and take a mean."]),vid:V("acceleration trolley light gates")},
 {t:"example",h:"Newton's second law",html:`<div class="formula">force = mass × acceleration (F = ma)</div><p><b>F = 0.5 N on a 0.25 kg trolley.</b> a = 0.5 ÷ 0.25 = <b>2 m/s²</b>.</p><p>Results: acceleration ∝ force; acceleration ∝ 1 ÷ mass.</p>`},
 {t:"num",h:"Your turn",q:"A force of 1.2 N gives an acceleration of 3 m/s². What is the mass (kg)?",ans:.4,tol:.001,unit:"kg",ex:"m = F ÷ a = 1.2 ÷ 3 = 0.4 kg."},
 {t:"q",h:"Quick check",q:"Why move masses from the trolley to the hanger, rather than adding new ones?",o:["It's faster","To keep the total mass constant, as a control","Light gates need it","To slow the trolley"],a:1,ex:"The hanging mass is also being accelerated, so total mass must stay the same."},
 {t:"mistake",h:"Errors and improvements",html:`<ul><li>Friction slows the trolley: tilt the bench slightly so the trolley just rolls at a steady speed (compensating for friction).</li><li>Stopwatches add human reaction time: light gates are more accurate.</li><li>Catch the hanging masses safely.</li></ul>`},
 {t:"sum",h:"Summary",bullets:["Trolley, string, pulley, hanging mass","Light gates measure acceleration","Move masses to keep total mass constant","a ∝ F; a ∝ 1/m","F = ma"],vid:V("acceleration trolley light gates")}]},

{id:"rp-waves",topic:"P6",rp:true,title:"Waves in a ripple tank and on a string",mins:9,steps:[
 {t:"learn",h:"The aim",html:`<p>Measure the frequency, wavelength and speed of waves in a ripple tank and on a stretched string.</p><div class="formula">wave speed = frequency × wavelength (v = fλ)</div>`},
 {t:"diagram",h:"The ripple tank",svg:RIPPLE,html:`<p>The lamp casts shadows of the waves onto paper below, so you can measure them with a ruler.</p>`},
 {t:"learn",h:"Method",html:ol(["Set the vibrating bar so it just touches the water and makes low-frequency waves.","<b>Wavelength</b>: measure across 10 waves on the paper and divide by 10.","<b>Frequency</b>: count waves passing a point in 10 s and divide by 10 (or read the signal generator).","Calculate v = fλ.","<b>String</b>: a vibration generator and a pulley with masses. Adjust the frequency until a clear standing wave forms; measure across several half-wavelengths."]),vid:V("waves ripple tank")},
 {t:"example",h:"Worked example",html:`<p><b>10 waves span 15 cm; the frequency is 12 Hz.</b></p><ol class="steps"><li>λ = 15 ÷ 10 = 1.5 cm = 0.015 m.</li><li>v = 12 × 0.015 = <b>0.18 m/s</b>.</li></ol>`},
 {t:"num",h:"Your turn",q:"A wave on a string has f = 50 Hz and λ = 0.4 m. What is its speed (m/s)?",ans:20,tol:.01,unit:"m/s",ex:"50 × 0.4 = 20 m/s."},
 {t:"q",h:"Quick check",q:"Why measure across 10 waves rather than one?",o:["It looks better","It reduces the uncertainty in each wavelength","Waves are too small to see","The ruler is 10 cm long"],a:1,ex:"Dividing a longer measurement by 10 gives a more accurate wavelength."},
 {t:"mistake",h:"Errors and improvements",html:`<ul><li>Waves move too fast to measure: use a <b>stroboscope</b> to "freeze" them, or take a photo with a ruler in view.</li><li>Ripple tank water can spill near electrics: take care.</li><li>Masses on the string could fall: keep feet clear.</li></ul>`},
 {t:"sum",h:"Summary",bullets:["v = fλ","Measure across several waves and divide","Count waves in 10 s for frequency","Strobe or photo to freeze waves","String: measure half-wavelengths of the standing wave"],vid:V("waves ripple tank")}]},

{id:"rp-radiation",topic:"P6",rp:true,title:"Infrared radiation and surfaces",mins:7,steps:[
 {t:"learn",h:"The aim",html:`<p>Investigate how the colour and texture of a surface affect how much infrared radiation it emits (or absorbs).</p>${vars("Type of surface","Infrared reading on the detector","Water temperature, distance from detector, size of surface")}`},
 {t:"diagram",h:"The Leslie cube",svg:LESLIE,html:`<p>All four faces are at the same temperature, so any difference in reading is due to the <b>surface</b>.</p>`},
 {t:"learn",h:"Method",html:ol(["Fill a Leslie cube with hot water from a kettle and put the lid on.","Point the infrared detector at one face from a set distance (e.g. 10 cm).","Record the reading, then repeat for each face at the same distance.","Compare: matt black, shiny black, matt white, shiny silver."]),vid:V("infrared radiation Leslie cube")},
 {t:"example",h:"The results",html:`<p><b>Matt black</b> gives the highest reading: it's the best <b>emitter</b> (and absorber) of infrared. <b>Shiny silver</b> gives the lowest: it's the worst emitter and best <b>reflector</b>.</p>`},
 {t:"q",h:"Quick check",q:"Which surface emits the most infrared radiation?",o:["Shiny silver","Matt white","Matt black","Shiny white"],a:2,ex:"Dark, matt surfaces are the best emitters and absorbers."},
 {t:"q",h:"Your turn",q:"Why is the detector kept the same distance from each face?",o:["To protect it from the heat","Because the reading depends on distance, so it's a control variable","So it fits on the bench","To make it faster"],a:1,ex:"Closer means a higher reading."},
 {t:"mistake",h:"Errors and safety",html:`<ul><li>The water cools during the experiment: take all readings quickly.</li><li>Hot water can scald: take care pouring.</li><li>A digital detector is more precise than judging by hand.</li></ul>`},
 {t:"sum",h:"Summary",bullets:["Leslie cube full of hot water","Same distance for every face","Matt black: best emitter and absorber","Shiny silver: worst emitter, best reflector","Work quickly before the water cools"],vid:V("infrared radiation Leslie cube")}]},

{id:"rp-light",triple:true,topic:"P6",rp:true,title:"Reflection and refraction",mins:8,steps:[
 {t:"learn",h:"The aim",html:`${TRIPLE}<p>Investigate how light is reflected by a mirror and refracted by different transparent materials, such as glass and Perspex blocks.</p>`},
 {t:"diagram",h:"Refraction through a block",svg:REFR,html:`<p>Light <b>slows down</b> in glass, so it bends <b>towards</b> the normal on the way in, and away from it on the way out.</p>`},
 {t:"learn",h:"Method",html:ol(["Put the block on paper and draw around it.","Shine a thin ray from a ray box into the block at an angle.","Mark the incoming and outgoing rays with small crosses; remove the block and join them up.","Draw the <b>normal</b> at 90° to the surface where the ray enters.","Measure the angles of incidence and refraction with a protractor.","Repeat for different angles and different materials. (For reflection, use a plane mirror: angle of incidence = angle of reflection.)"]),vid:V("refraction glass block")},
 {t:"example",h:"Reading your results",html:`<p><b>At 40° incidence, glass gives a refraction angle of 25°; Perspex gives 27°.</b></p><p>Glass bends the light more (a smaller angle of refraction), so light slows down more in glass.</p>`},
 {t:"q",h:"Quick check",q:"From where are angles of incidence and refraction measured?",o:["The surface of the block","The normal","The ray box","The edge of the paper"],a:1,ex:"Always measure from the normal, a line at 90° to the surface."},
 {t:"q",h:"Your turn",q:"For a mirror, how do the angles of incidence and reflection compare?",o:["Reflection is always bigger","They are equal","Reflection is always 90°","Incidence is double"],a:1,ex:"The law of reflection."},
 {t:"mistake",h:"Errors and improvements",html:`<ul><li>A wide ray is hard to mark: use a narrow slit for a thin ray.</li><li>Measuring from the surface instead of the normal.</li><li>The ray box gets hot: don't touch the bulb.</li></ul>`},
 {t:"sum",h:"Summary",bullets:["Draw around the block; mark rays with crosses","Draw the normal at 90°","Measure angles from the normal","Into glass: bends towards the normal","Mirror: incidence = reflection"],vid:V("refraction glass block")}]}
);
})();
