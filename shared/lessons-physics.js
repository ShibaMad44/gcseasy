/* Physics topic lessons (P1, P3, P4, P5, P7, P8). P2 and P6 are in lessons.js. */
(function(){const {L,B,A,T,SVG,N,BN}=window.LSN;

const SANKEY=SVG(540,300,"Sankey diagram for a filament lamp",`
<path d="M20 70 L220 70 L220 170 L20 170 Z" class="d-c4"/>
<path d="M220 70 L350 70 L350 58 L378 80 L350 102 L350 90 L220 90 Z" class="d-c4"/>
<path d="M220 90 C282 90 300 112 300 170 L300 222 L316 222 L260 268 L204 222 L220 222 Z" class="d-c2"/>
${N(115,120,1,"Electrical: 100 J")}
${L(300,72,300,36,2,"Light: 20 J (useful)")}
${L(300,232,340,262,3,"Thermal: 80 J (wasted)")}
${T(10,200,"Arrow width = amount","cap","start")}${T(10,216,"of energy","cap","start")}`);

const STATES=SVG(420,200,"Particles in a solid, a liquid and a gas",`
<rect x="14" y="40" width="120" height="120" rx="8" class="d-c0"/><rect x="150" y="40" width="120" height="120" rx="8" class="d-c0"/><rect x="286" y="40" width="120" height="120" rx="8" class="d-c0"/>
${[0,1,2,3,4].map(r=>[0,1,2,3,4].map(c=>`<circle cx="${34+c*20}" cy="${60+r*20}" r="9" class="d-c1"/>`).join("")).join("")}
${[[166,148],[186,150],[206,148],[226,149],[246,148],[172,130],[193,131],[214,128],[236,131],[256,131],[180,111],[201,112],[222,110],[244,112],[190,93],[212,93]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="9" class="d-c1"/>`).join("")}
${[[306,62],[372,58],[338,92],[392,104],[302,128],[352,140],[386,146]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="9" class="d-c1"/>`).join("")}
${N(74,24,1,"Solid")}${N(210,24,2,"Liquid")}${N(346,24,3,"Gas")}
${T(74,182,"fixed pattern, vibrate","cap")}${T(210,182,"touching, move around","cap")}${T(346,182,"far apart, fast, random","cap")}`);

const HALF=(()=>{let d="";for(let t=0;t<=320;t+=4){const y=220-200*Math.pow(.5,t/80);d+=(t?" L":"M")+(50+t)+" "+y.toFixed(1)}
return SVG(420,270,"Half-life graph",`
<path d="M50 14 L50 220 L390 220" class="d-no"/>
<path d="${d}" class="d-line" style="stroke:#D2433B"/>
<path d="M50 120 L130 120 L130 220 M50 170 L210 170 L210 220" class="d-ln" stroke-dasharray="4 4"/>
${T(44,24,"800","sm","end")}${T(44,124,"400","sm","end")}${T(44,174,"200","sm","end")}${T(44,224,"0","sm","end")}
${[0,2,4,6,8].map((h,i)=>T(50+i*80,236,h,"sm")).join("")}
${T(220,256,"Time (hours)","cap")}${T(70,12,"Activity (Bq)","cap","start")}
${L(130,120,190,80,1,"After 2 h: 400")}
${L(210,170,270,130,2,"After 4 h: 200")}`)})();

const FBD=SVG(420,270,"Free body diagram of a car",`
<rect x="150" y="110" width="110" height="40" rx="10" class="d-c1"/><rect x="172" y="88" width="64" height="26" rx="8" class="d-c1"/>
<circle cx="176" cy="152" r="11" class="d-c6"/><circle cx="234" cy="152" r="11" class="d-c6"/>
${A(262,130,350,130,"red")}${A(148,130,70,130,"blue")}${A(205,166,205,240)}${A(205,86,205,22)}
${N(372,116,1,"Driving force")}${N(70,112,2,"Air resistance")}${N(205,258,3,"Weight")}${N(290,30,4,"Normal contact force")}`);

const MAGNET=SVG(520,240,"Magnetic field around a bar magnet",`
<path d="M150 112 C110 30 290 30 250 112" class="d-ar"/><path d="M150 112 C90 -10 310 -10 250 112" class="d-ar"/>
<path d="M150 128 C110 210 290 210 250 128" class="d-ar"/><path d="M150 128 C90 250 310 250 250 128" class="d-ar"/>
<path d="M150 120 L60 120" class="d-ar"/><path d="M340 120 L252 120" class="d-ar"/>
<rect x="150" y="104" width="50" height="32" class="d-c2"/><rect x="200" y="104" width="50" height="32" class="d-c1"/>
${T(175,125,"N","big")}${T(225,125,"S","big")}
${L(225,46,260,16,1,"Field lines: N to S")}
${L(150,120,90,160,2,"Strongest at the poles","end")}`,-100);

const STAR=SVG(520,300,"Life cycle of a star",`
${BN(10,16,140,40,"c5",1,"Nebula")}${BN(190,16,140,40,"c5",2,"Protostar")}${BN(370,16,140,40,"c4",3,"Main sequence")}
${A(150,36,188,36)}${A(330,36,368,36)}
${A(400,57,200,108)}${A(460,57,420,108)}
${T(150,84,"Sun-sized stars","cap","start")}${T(432,84,"bigger stars","cap","end")}
${BN(110,110,150,38,"c2",4,"Red giant")}${BN(320,110,170,38,"c2",5,"Red supergiant")}
${A(185,148,185,176)}${A(405,148,405,176)}
${BN(110,178,150,38,"c0",6,"White dwarf")}${BN(320,178,170,38,"c4",7,"Supernova")}
${A(185,216,185,244)}${A(370,216,345,244)}${A(440,216,460,244)}
${BN(110,246,150,38,"c6",8,"Black dwarf")}${BN(290,246,110,38,"c1",9,"Neutron star")}${BN(410,246,105,38,"c6",10,"Black hole")}`);

window.LESSONS.physics.push(
{id:"energy",topic:"P1",title:"Energy stores, efficiency and power",mins:9,steps:[
 {t:"learn",h:"Energy is stored and transferred",html:`<p>Energy is never used up. It is <b>transferred</b> from one <b>store</b> to another.</p><ul><li>Stores: <b>kinetic</b>, <b>gravitational potential</b>, <b>elastic potential</b>, <b>thermal</b>, <b>chemical</b>, <b>magnetic</b>, <b>electrostatic</b>, <b>nuclear</b>.</li><li>It is transferred by <b>heating</b>, by <b>forces doing work</b>, or by an <b>electric current</b>.</li><li><b>Conservation of energy</b>: energy can't be created or destroyed, only transferred, stored or dissipated.</li></ul>`},
 {t:"diagram",h:"A Sankey diagram",svg:SANKEY,html:`<p>A filament lamp transfers 100 J of electrical energy. Only 20 J becomes useful light; 80 J is wasted heating the surroundings. Wasted energy is said to be <b>dissipated</b>.</p>`},
 {t:"learn",h:"The equations",html:`<div class="formula">kinetic energy = ½ × mass × speed²</div><div class="formula">GPE = mass × g × height</div><div class="formula">efficiency = useful output ÷ total input</div><div class="formula">power = energy ÷ time</div><p>g = 9.8 N/kg on Earth. Power is in <b>watts</b>: 1 W = 1 J every second.</p>`},
 {t:"example",h:"Worked example",html:`<p><b>A 60 kg runner moves at 5 m/s. What is her kinetic energy?</b></p><ol class="steps"><li>Square the speed first: 5² = 25.</li><li>½ × 60 × 25 = <b>750 J</b>.</li></ol><p><b>Efficiency of the lamp above:</b> 20 ÷ 100 = 0.2, or <b>20%</b>.</p>`},
 {t:"q",h:"Quick check",q:"A kettle transfers energy to the water and the surroundings. Which store does the wasted energy end up in?",o:["The chemical store of the kettle","The thermal store of the surroundings","The kinetic store of the water","The gravitational store of the kettle"],a:1,ex:"Wasted energy is usually dissipated into the thermal store of the surroundings."},
 {t:"num",h:"Your turn",q:"A motor takes in 500 J and gives out 400 J of useful energy. What is its efficiency as a percentage?",ans:80,tol:.01,unit:"%",ex:"400 ÷ 500 = 0.8 = 80%."},
 {t:"mistake",h:"Common mistake",html:`<p>Forgetting to <b>square the speed</b> in the kinetic energy equation, or squaring the whole of ½mv. Square the speed first, then multiply. Also, efficiency can never be more than 100% (or 1).</p>`},
 {t:"sum",h:"Summary",bullets:["Energy is transferred between stores, never created or destroyed","KE = ½mv²; GPE = mgh","efficiency = useful ÷ total","power = energy ÷ time, in watts","Reduce waste with lubrication and insulation"]}]},

{id:"particles",topic:"P3",title:"Density, states of matter and heating",mins:9,steps:[
 {t:"learn",h:"The particle model",html:`<p>Everything is made of particles. How they are arranged and how much energy they have explains density and changes of state.</p><p><b>Internal energy</b> is the total kinetic and potential energy of all the particles in a system.</p>`},
 {t:"diagram",h:"Solids, liquids and gases",svg:STATES,html:`<p>Solids are usually the densest, because the particles are packed closest together. Gases have the lowest density.</p>`},
 {t:"learn",h:"The equations",html:`<div class="formula">density = mass ÷ volume</div><div class="formula">ΔE = m × c × Δθ</div><div class="formula">E = m × L</div><p><b>c</b> (specific heat capacity): energy to raise 1 kg by 1 °C. <b>L</b> (specific latent heat): energy to change the state of 1 kg <b>with no temperature change</b>.</p>`},
 {t:"example",h:"Worked example",html:`<p><b>How much energy raises 2 kg of water from 20 °C to 70 °C? (c = 4200 J/kg°C)</b></p><ol class="steps"><li>Temperature change: 70 − 20 = 50 °C.</li><li>ΔE = 2 × 4200 × 50.</li><li>= <b>420 000 J</b> (420 kJ).</li></ol>`},
 {t:"q",h:"Quick check",q:"While ice is melting, its temperature stays at 0 °C. What is the energy being used for?",o:["Making the particles move faster","Breaking the bonds between particles","Increasing the mass","Cooling the surroundings"],a:1,ex:"During a change of state, energy goes into breaking bonds (latent heat), so the temperature doesn't rise."},
 {t:"num",h:"Your turn",q:"A block has a mass of 540 g and a volume of 200 cm³. What is its density in g/cm³?",ans:2.7,tol:.01,unit:"g/cm³",ex:"540 ÷ 200 = 2.7 g/cm³ (it's aluminium)."},
 {t:"mistake",h:"Common mistake",html:`<p>Mixing up <b>specific heat capacity</b> (temperature changes) and <b>specific latent heat</b> (state changes, temperature stays the same). Also check units: 1 g/cm³ = 1000 kg/m³.</p>`},
 {t:"sum",h:"Summary",bullets:["density = mass ÷ volume","Solid → liquid → gas: particles further apart and faster","ΔE = mcΔθ when temperature changes","E = mL during a change of state","Gas pressure rises with temperature: faster particles hit the walls harder and more often"]}]},

{id:"atoms",topic:"P4",title:"Nuclear radiation and half-life",mins:9,steps:[
 {t:"learn",h:"Unstable nuclei",html:`<p>Some nuclei are unstable. They give out radiation at random to become more stable: this is <b>radioactive decay</b>.</p><div class="tbl"><table><tr><th></th><th>What it is</th><th>Stopped by</th><th>Ionising</th></tr><tr><td><b>Alpha (α)</b></td><td>2 protons + 2 neutrons</td><td>Paper, a few cm of air</td><td>Most</td></tr><tr><td><b>Beta (β)</b></td><td>A fast electron from the nucleus</td><td>A few mm of aluminium</td><td>Medium</td></tr><tr><td><b>Gamma (γ)</b></td><td>An EM wave</td><td>Thick lead or concrete</td><td>Least</td></tr></table></div>`},
 {t:"learn",h:"Decay equations",html:`<p>Mass number (top) and atomic number (bottom) must balance on both sides.</p><ul><li><b>Alpha</b>: mass number − 4, atomic number − 2.</li><li><b>Beta</b>: mass number stays the same, atomic number + 1 (a neutron turns into a proton).</li><li><b>Gamma</b>: no change to either number.</li></ul>`},
 {t:"diagram",h:"Half-life",svg:HALF,html:`<p><b>Half-life</b> is the time it takes for the number of unstable nuclei (or the activity) to halve. Here it is <b>2 hours</b>.</p>`},
 {t:"example",h:"Worked example",html:`<p><b>A sample has an activity of 800 Bq and a half-life of 2 hours. What is the activity after 6 hours?</b></p><ol class="steps"><li>Number of half-lives: 6 ÷ 2 = 3.</li><li>Halve three times: 800 → 400 → 200 → <b>100 Bq</b>.</li></ol>`},
 {t:"q",h:"Quick check",q:"Uranium-238 decays by alpha emission. What happens to its mass number?",o:["It goes up by 4","It goes down by 4","It goes down by 2","It stays the same"],a:1,ex:"An alpha particle has a mass number of 4, so the nucleus loses 4."},
 {t:"num",h:"Your turn",q:"A sample's activity falls from 1600 Bq to 200 Bq in 24 minutes. What is its half-life in minutes?",ans:8,tol:.01,unit:"minutes",ex:"1600 → 800 → 400 → 200 is 3 half-lives. 24 ÷ 3 = 8 minutes."},
 {t:"mistake",h:"Common mistake",html:`<p>Confusing <b>contamination</b> and <b>irradiation</b>. Irradiation is being exposed to radiation from outside; the object does <b>not</b> become radioactive. Contamination is when radioactive atoms get <b>on or inside</b> something, which is more dangerous because the exposure continues.</p>`},
 {t:"sum",h:"Summary",bullets:["Alpha: most ionising, stopped by paper","Beta: fast electron, stopped by aluminium","Gamma: EM wave, reduced by thick lead","Half-life: time for activity to halve","Irradiation ≠ contamination"]}]},

{id:"forces",topic:"P5",title:"Forces, motion and Newton's laws",mins:10,steps:[
 {t:"learn",h:"Forces are vectors",html:`<p>A <b>vector</b> has size and direction (force, velocity, displacement, acceleration). A <b>scalar</b> has size only (speed, distance, mass, time).</p><p>The <b>resultant force</b> is the single force that has the same effect as all the forces together.</p>`},
 {t:"diagram",h:"Forces on a car",svg:FBD,html:`<p>If the driving force equals air resistance, the resultant force is zero, so the car moves at a <b>steady speed</b>. If the driving force is bigger, it <b>accelerates</b>.</p>`},
 {t:"learn",h:"Newton's laws and the equations",html:`<ol class="steps"><li><b>First law</b>: if the resultant force is zero, an object stays still or keeps moving at the same velocity.</li><li><b>Second law</b>: F = m × a.</li><li><b>Third law</b>: when two objects interact, they exert equal and opposite forces on each other.</li></ol><div class="formula">weight = mass × g</div><div class="formula">acceleration = change in velocity ÷ time</div>`},
 {t:"example",h:"Worked example",html:`<p><b>A 1200 kg car has a driving force of 3000 N and air resistance of 600 N. What is its acceleration?</b></p><ol class="steps"><li>Resultant force: 3000 − 600 = 2400 N.</li><li>a = F ÷ m = 2400 ÷ 1200.</li><li>= <b>2 m/s²</b>.</li></ol>`},
 {t:"q",h:"Quick check",q:"A skydiver falls at terminal velocity. What is the resultant force on her?",o:["Equal to her weight","Zero","Equal to air resistance","Upwards"],a:1,ex:"At terminal velocity, weight and air resistance are balanced, so the resultant force is zero and the speed is constant."},
 {t:"num",h:"Your turn",q:"A cyclist speeds up from 2 m/s to 10 m/s in 4 s. What is the acceleration in m/s²?",ans:2,tol:.01,unit:"m/s²",ex:"(10 − 2) ÷ 4 = 2 m/s²."},
 {t:"mistake",h:"Common mistake",html:`<p>Mixing up <b>mass</b> (kg, the same everywhere) and <b>weight</b> (N, a force that depends on gravity). Another: forgetting that stopping distance = <b>thinking distance + braking distance</b>.</p>`},
 {t:"sum",h:"Summary",bullets:["Resultant force zero → steady speed or still","F = ma; W = mg","a = Δv ÷ t","Area under a velocity–time graph = distance","Stopping distance = thinking + braking distance"]}]},

{id:"magnets",topic:"P7",title:"Magnetic fields, electromagnets and the motor effect",mins:9,steps:[
 {t:"learn",h:"Magnets and fields",html:`<p>A magnetic field is the area around a magnet where a force acts on another magnet or magnetic material (iron, steel, nickel, cobalt).</p><ul><li>Like poles <b>repel</b>; unlike poles <b>attract</b>.</li><li>A <b>permanent magnet</b> has its own field. An <b>induced magnet</b> only becomes magnetic in a field, and is always attracted.</li></ul>`},
 {t:"diagram",h:"The field around a bar magnet",svg:MAGNET,html:`<p>Field lines point from <b>north to south</b>. The field is strongest at the poles, where the lines are closest.</p>`},
 {t:"learn",h:"Electromagnets and the motor effect",html:`<p>A current in a wire creates a magnetic field around it. Coiling the wire into a <b>solenoid</b> and adding an <b>iron core</b> makes a strong electromagnet you can switch on and off.</p><p>A current-carrying wire in a magnetic field feels a force: the <b>motor effect</b>.</p><div class="formula">F = B × I × l</div><p>Use <b>Fleming's left-hand rule</b>: <b>F</b>irst finger = field, se<b>C</b>ond finger = current, thu<b>M</b>b = motion (force).</p>`},
 {t:"example",h:"Worked example",html:`<p><b>A 0.5 m wire carries 4 A in a field of 0.2 T. What is the force on it?</b></p><p>F = 0.2 × 4 × 0.5 = <b>0.4 N</b>.</p>`},
 {t:"q",h:"Quick check",q:"Which change would make an electromagnet stronger?",o:["Using fewer turns of wire","Removing the iron core","Increasing the current","Using a plastic core"],a:2,ex:"More current, more turns or an iron core all make it stronger."},
 {t:"num",h:"Your turn",q:"A wire 0.25 m long in a 0.4 T field feels a force of 0.3 N. What current flows? (I = F ÷ Bl)",ans:3,tol:.01,unit:"A",ex:"I = 0.3 ÷ (0.4 × 0.25) = 0.3 ÷ 0.1 = 3 A."},
 {t:"mistake",h:"Common mistake",html:`<p>Saying an induced magnet can <b>repel</b>. Induced magnetism always causes attraction. Also, field lines never cross.</p>`},
 {t:"sum",h:"Summary",bullets:["Field lines go N → S; closest = strongest","Induced magnets always attract","Solenoid + iron core = strong electromagnet","Motor effect: F = BIl","Fleming's left-hand rule: field, current, motion"]}]},

{id:"space",topic:"P8",title:"The life cycle of a star and the universe",mins:8,steps:[
 {t:"learn",h:"How a star is born",html:`<p>A star forms from a <b>nebula</b>, a cloud of dust and gas. Gravity pulls it together into a <b>protostar</b>, which heats up. When it's hot enough, hydrogen nuclei <b>fuse</b> into helium and it becomes a <b>main sequence</b> star.</p><p>It stays stable because the outward pressure from fusion <b>balances</b> the inward pull of gravity.</p>`},
 {t:"diagram",h:"The life cycle",svg:STAR,html:`<p>What happens at the end depends on the star's <b>mass</b>. Elements heavier than iron are made in <b>supernovae</b>.</p>`},
 {t:"learn",h:"Orbits and red-shift",html:`<ul><li>Gravity keeps planets, moons and satellites in <b>circular orbits</b>. Their velocity changes (direction changes) even though speed is constant.</li><li><b>Red-shift</b>: light from distant galaxies is shifted to longer wavelengths. More distant galaxies are more red-shifted, so they are moving away faster.</li><li>This is evidence that the universe is <b>expanding</b>, which supports the <b>Big Bang</b> theory.</li></ul>`},
 {t:"example",h:"Worked example: a 4-mark answer",html:`<p><b>Explain how red-shift supports the Big Bang theory.</b></p><p>Light from distant galaxies is red-shifted (1), so they are moving away from us (1). Galaxies further away are more red-shifted, so they are moving faster (1). This means the universe is expanding, as if it started from one very small, hot point (1).</p>`},
 {t:"q",h:"Quick check",q:"What happens to a star like the Sun after the red giant stage?",o:["It becomes a supernova","It becomes a white dwarf","It becomes a black hole","It becomes a neutron star"],a:1,ex:"Stars about the size of the Sun become white dwarfs, then cool into black dwarfs."},
 {t:"q",h:"Your turn",q:"Why is a main sequence star stable?",o:["It has run out of hydrogen","Fusion pressure outwards balances gravity inwards","Gravity has stopped acting","It is cooling down"],a:1,ex:"The two forces are in equilibrium, so the star neither collapses nor expands."},
 {t:"mistake",h:"Common mistake",html:`<p>Saying the Sun will become a black hole or a supernova. Only stars much bigger than the Sun do that. Another: thinking red-shift means the galaxies are actually red. It means the wavelength is <b>longer</b>.</p>`},
 {t:"sum",h:"Summary",bullets:["Nebula → protostar → main sequence","Sun-sized: red giant → white dwarf → black dwarf","Massive: red supergiant → supernova → neutron star or black hole","Main sequence: fusion balances gravity","Red-shift → universe expanding → Big Bang"]}]}
);
})();
