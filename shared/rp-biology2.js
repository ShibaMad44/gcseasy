/* AQA Biology required practicals, part 2. */
(function(){const {L,B,A,T,SVG,N,BN,K}=window.LSN;
const V=q=>"AQA GCSE biology required practical "+q;
const vars=(iv,dv,cv)=>`<div class="tbl"><table><tr><th>Independent (you change)</th><td>${iv}</td></tr><tr><th>Dependent (you measure)</th><td>${dv}</td></tr><tr><th>Control (keep the same)</th><td>${cv}</td></tr></table></div>`;
const ol=a=>`<ol class="steps">${a.map(x=>`<li>${x}</li>`).join("")}</ol>`;
const TRIPLE=`<p class="note">Triple (separate) Biology only: not in Combined Science.</p>`;

const FOOD=SVG(480,280,"Positive results for the four food tests",`
${[["Benedict's","#c0392b","sugar","blue → brick red"],["Iodine","#1c1c3a","starch","orange → blue-black"],["Biuret","#8e44ad","protein","blue → purple"],["Sudan III","#f6eecf","lipid","red layer on top"]].map(([n,c,f,r],i)=>`${K.tube(50+i*110,50,40,150,.7,c)}${i===3?`<rect x="${51.5+i*110}" y="${94}" width="37" height="12" fill="#D2433B"/>`:""}${N(70+i*110,28,i+1,n)}${T(70+i*110,226,f,"sm")}${r.split(" → ").map((x,k)=>T(70+i*110,244+k*15,k?x:(r.includes("→")?x+" →":x),"cap")).join("")}`).join("")}`);

const ENZ=SVG(520,270,"Investigating the effect of pH on amylase",`
${K.beaker(40,100,170,130,.75)}${K.tube(100,40,26,170,.8,"#f3f0e0")}${K.therm(170,40,150)}
${K.tile(250,120,4,2,["#1c1c3a","#1c1c3a","#26264a","#4a3f3a","#9a5a26","#c8782e","#d08a3a","#d08a3a"])}
<path d="M285 58 L285 104" stroke="var(--ink)" stroke-width="3"/><ellipse cx="285" cy="52" rx="7" ry="9" class="d-c6"/>
${L(113,70,60,22,1,"Starch + amylase + buffer")}${L(60,215,26,252,2,"Water bath","start")}${L(170,110,222,76,3,"Thermometer")}${L(330,190,340,244,4,"Spotting tile + iodine")}${L(390,170,450,104,5,"Orange: no starch","end")}`);

const PHOTO=SVG(540,270,"Investigating light intensity and photosynthesis",`
<path d="M10 236 L520 236" class="d-line"/>${K.ruler(80,222,220,14)}
<path d="M60 168 L60 236" stroke="var(--ink)" stroke-width="4"/>${K.lampL(60,150)}${A(84,150,270,150,"dash")}
${K.beaker(280,110,100,124,.8)}${K.tube(318,70,26,150,.85)}
<path d="M331 212 C322 192 340 176 330 150" fill="none" stroke="#3d8b37" stroke-width="5" stroke-linecap="round"/>${K.bubbles(331,138,5)}
${L(60,132,40,96,1,"Lamp","start")}${L(190,236,190,258,2,"Distance d (cm)")}${L(334,180,420,176,3,"Pondweed")}${L(336,110,420,96,4,"Oxygen bubbles")}${L(290,200,232,180,5,"Water heat shield","end")}`);

const REACT=SVG(540,260,"Ruler drop reaction time test",`
${K.ruler(200,20,30,200,true)}<rect x="150" y="16" width="56" height="26" rx="10" class="d-c2"/>
<ellipse cx="190" cy="214" rx="10" ry="18" class="d-c2"/><ellipse cx="240" cy="214" rx="10" ry="18" class="d-c2"/>
${A(270,40,270,100,"red")}${T(278,74,"drops","cap","start")}
${L(170,28,100,28,1,"Partner holds the top","end")}${L(244,214,300,236,2,"Thumb and finger at 0")}${L(230,140,300,140,3,"Read the catch here")}`,-70);

const PLANT=SVG(480,260,"Plant responses to light and gravity",`
<path d="M220 100 L220 40 L20 40 L20 210 L220 210 L220 140" class="d-no"/>${K.lampL(258,120)}${A(240,120,224,120)}
<rect x="40" y="194" width="160" height="14" class="d-c3"/>
${[60,95,130,165].map(x=>`<path d="M${x} 194 C${x} 164 ${x+10} 146 ${x+30} 132" fill="none" stroke="#3d8b37" stroke-width="3"/><ellipse cx="${x+33}" cy="130" rx="6" ry="3" fill="#3d8b37"/>`).join("")}
<circle cx="370" cy="120" r="72" class="d-c0"/>
${[345,395].map(x=>`<ellipse cx="${x}" cy="112" rx="7" ry="5" fill="#c9a26b" stroke="var(--ink)"/><path d="M${x} 117 C${x-6} 140 ${x+4} 160 ${x} 176" fill="none" stroke="#8a6a45" stroke-width="3"/><path d="M${x} 107 C${x+6} 90 ${x-4} 76 ${x} 62" fill="none" stroke="#3d8b37" stroke-width="3"/>`).join("")}
${T(370,32,"Dish turned on its side","cap")}${N(120,236,1,"Shoots bend to the light")}${N(370,224,2,"Roots down, shoots up")}`);

const FIELD=SVG(480,260,"A transect from shade to open ground",`
<path d="M0 200 L480 200" class="d-line"/><rect x="30" y="70" width="14" height="130" fill="#8a6a45"/><circle cx="37" cy="66" r="42" class="d-grass"/>
<path d="M60 216 L470 216" stroke="#D2433B" stroke-width="3" stroke-dasharray="8 5"/>
${[[80,2],[160,4],[240,7],[320,10],[400,14]].map(([x,n])=>`<rect x="${x}" y="160" width="40" height="40" class="d-no"/><path d="M${x+13} 160 L${x+13} 200 M${x+27} 160 L${x+27} 200 M${x} 173 L${x+40} 173 M${x} 187 L${x+40} 187" class="d-ln"/>${[...Array(n)].map((_,i)=>`<circle cx="${x+5+(i*13)%34}" cy="${164+Math.floor(i*13/34)*8}" r="2.6" fill="#3d8b37"/>`).join("")}`).join("")}
${T(100,150,"shade","cap")}${T(420,150,"full light","cap")}
${L(100,160,140,110,1,"Quadrat every 2 m")}${L(270,216,250,244,2,"Tape measure: the transect")}`);

const DECAY=SVG(520,270,"Investigating temperature and the rate of decay",`
${K.beaker(60,110,200,120,.7)}${K.tube(130,44,28,170,.75,"#f5a3c7")}${K.therm(230,60,150)}
<path d="M144 6 L144 34" stroke="var(--ink)" stroke-width="3"/><ellipse cx="144" cy="4" rx="7" ry="8" class="d-c6"/>
${L(144,22,90,22,1,"Lipase added","end")}${L(150,150,290,124,2,"Milk + indicator (pink)")}${L(232,90,290,70,3,"Thermometer")}${L(250,210,290,200,4,"Water bath")}
${T(190,256,"Time how long the pink takes to disappear","cap")}`,-40);

window.LESSONS.biology.push(
{id:"rp-food",topic:"B2",rp:true,title:"Food tests",mins:8,steps:[
 {t:"learn",h:"The aim",html:`<p>Use chemical reagents to test foods for <b>sugars</b>, <b>starch</b>, <b>proteins</b> and <b>lipids</b>.</p><p>First grind the food with distilled water using a pestle and mortar, then filter it to get a solution.</p>`},
 {t:"diagram",h:"The four positive results",svg:FOOD,html:`<p>A negative result means the colour doesn't change: Benedict's stays blue, iodine stays orange-brown, Biuret stays blue.</p>`},
 {t:"learn",h:"Method for each test",html:ol(["<b>Reducing sugars</b>: add Benedict's solution and heat in a water bath at about 75 °C for 5 minutes. Blue → green → yellow → <b>brick red</b> (more sugar).","<b>Starch</b>: add a few drops of iodine solution. Orange-brown → <b>blue-black</b>.","<b>Protein</b>: add Biuret solution. Blue → <b>purple / lilac</b>.","<b>Lipids</b>: add Sudan III stain and shake. A <b>red-stained oily layer</b> forms on top. (Or the ethanol emulsion test: a cloudy white layer.)"]),vid:V("food tests")},
 {t:"example",h:"Reading the results",html:`<p><b>A food turns Benedict's orange and iodine blue-black. What does it contain?</b></p><p>Some <b>reducing sugar</b> (orange: a medium amount) and <b>starch</b>.</p>`},
 {t:"q",h:"Quick check",q:"Which reagent needs to be heated?",o:["Iodine","Biuret","Benedict's","Sudan III"],a:2,ex:"Benedict's needs a hot water bath; the others work at room temperature."},
 {t:"q",h:"Your turn",q:"A solution turns purple with Biuret. What does it contain?",o:["Starch","Protein","Lipid","Sugar"],a:1,ex:"Biuret tests for protein."},
 {t:"mistake",h:"Errors and safety",html:`<ul><li>Wear <b>eye protection</b>: the reagents are irritants.</li><li>Heat Benedict's in a <b>water bath</b>, not directly in a flame.</li><li>Ethanol is <b>flammable</b>: keep it away from flames.</li><li>Colour judgements are subjective: compare against a control tube.</li></ul>`},
 {t:"sum",h:"Summary",bullets:["Benedict's (heat): blue → brick red = sugar","Iodine: orange → blue-black = starch","Biuret: blue → purple = protein","Sudan III: red layer = lipid","Goggles; water bath; no flames near ethanol"],vid:V("food tests")}]},

{id:"rp-enzymes",topic:"B2",rp:true,title:"Enzymes: the effect of pH on amylase",mins:9,steps:[
 {t:"learn",h:"The aim",html:`<p>Investigate how pH affects the rate at which amylase breaks down starch.</p>${vars("pH (using buffer solutions)","Time for the starch to be broken down","Temperature, volume and concentration of amylase and starch")}`},
 {t:"diagram",h:"The set-up",svg:ENZ,html:`<p>Iodine turns blue-black while starch is still there. When a drop stays <b>orange-brown</b>, all the starch has been broken down.</p>`},
 {t:"learn",h:"Method",html:ol(["Put a drop of iodine into each well of a spotting tile.","Put amylase, starch solution and a pH buffer in separate tubes in a water bath (e.g. 35 °C) to warm up.","Mix them and start the stopwatch.","Every 30 seconds, put a drop of the mixture onto a new well of iodine.","Record the time when the iodine stays orange-brown.","Repeat with other pH buffers."]),vid:V("enzymes amylase pH")},
 {t:"example",h:"Calculating the rate",html:`<p><b>At pH 6, the starch was gone after 90 s.</b></p><p>rate = 1000 ÷ time = 1000 ÷ 90 = <b>11.1 s⁻¹</b>.</p><p>The pH with the shortest time (highest rate) is the <b>optimum</b>. At extreme pH the active site changes shape, so the enzyme is <b>denatured</b>.</p>`},
 {t:"num",h:"Your turn",q:"Using rate = 1000 ÷ time, what is the rate if the starch is gone after 120 s? (2 dp)",ans:8.33,tol:.01,unit:"s⁻¹",ex:"1000 ÷ 120 = 8.33."},
 {t:"q",h:"Quick check",q:"Why is the water bath used?",o:["To change the pH","To keep the temperature constant, as a control variable","To dissolve the iodine","To make the starch blue"],a:1,ex:"Temperature also affects enzyme activity."},
 {t:"mistake",h:"Errors and improvements",html:`<ul><li>Sampling every 30 s means the real time could be up to 30 s earlier: sample more often for better resolution.</li><li>Colour change is subjective: compare with a reference colour.</li><li>Repeat each pH and take a mean.</li></ul>`},
 {t:"sum",h:"Summary",bullets:["Iodine: blue-black = starch present","Sample every 30 s onto a spotting tile","Record when iodine stays orange-brown","Rate = 1000 ÷ time","Water bath keeps temperature constant"],vid:V("enzymes amylase pH")}]},

{id:"rp-photo",topic:"B4",rp:true,title:"Photosynthesis: light intensity",mins:9,steps:[
 {t:"learn",h:"The aim",html:`<p>Investigate the effect of light intensity on the rate of photosynthesis, using pondweed.</p>${vars("Distance from the lamp (light intensity)","Number of bubbles per minute (or volume of gas)","Temperature, CO₂ concentration (sodium hydrogencarbonate), same piece of pondweed")}`},
 {t:"diagram",h:"The set-up",svg:PHOTO,html:`<p>The bubbles are <b>oxygen</b>, made in photosynthesis. Sodium hydrogencarbonate in the water provides CO₂.</p>`},
 {t:"learn",h:"Method",html:ol(["Put the pondweed in a boiling tube of sodium hydrogencarbonate solution.","Place the lamp 10 cm away and leave for 5 minutes to adjust.","Count the bubbles in 1 minute (or collect the gas in a gas syringe).","Repeat at 20, 30, 40 and 50 cm.","Repeat the whole experiment and calculate means."]),vid:V("photosynthesis pondweed")},
 {t:"example",h:"The inverse square law",html:`<p>Light intensity ∝ 1 ÷ distance². If you <b>double</b> the distance, the light intensity becomes a <b>quarter</b>.</p><p>So the rate falls quickly as the lamp moves away, then levels off when another factor limits photosynthesis.</p>`},
 {t:"num",h:"Your turn",q:"Light intensity at 10 cm is 100 units. Using the inverse square law, what is it at 20 cm?",ans:25,tol:.01,unit:"units",ex:"Double the distance → 1/2² = 1/4. 100 ÷ 4 = 25."},
 {t:"q",h:"Quick check",q:"Why is a beaker of water placed between the lamp and the pondweed?",o:["To add CO₂","To absorb heat so temperature stays constant","To make more bubbles","To block the light"],a:1,ex:"A lamp also heats; temperature must be controlled. An LED lamp helps too."},
 {t:"mistake",h:"Errors and improvements",html:`<ul><li>Bubbles vary in size: collecting the gas in a <b>gas syringe</b> or measuring cylinder is more accurate.</li><li>Background light in the room changes the light intensity: do it in a darkened room.</li><li>Leave time to adjust at each distance.</li></ul>`},
 {t:"sum",h:"Summary",bullets:["Pondweed in sodium hydrogencarbonate","Change distance; count bubbles per minute","Heat shield or LED to control temperature","Intensity ∝ 1/d²","Gas syringe is more accurate than counting"],vid:V("photosynthesis pondweed")}]},

{id:"rp-react",topic:"B5",rp:true,title:"Reaction time",mins:7,steps:[
 {t:"learn",h:"The aim",html:`<p>Investigate the effect of a factor, such as caffeine or practice, on human reaction time.</p>${vars("A factor, e.g. caffeine drink or not","Distance the ruler falls before it is caught","Same person dropping, same hand, same starting position, no warning")}`},
 {t:"diagram",h:"The ruler drop test",svg:REACT,html:`<p>The shorter the distance, the faster the reaction. A conversion table turns distance into time.</p>`},
 {t:"learn",h:"Method",html:ol(["Sit with your arm resting on a table edge.","Your partner holds a ruler vertically with the zero between your thumb and finger.","Without warning, they drop it; you catch it as fast as you can.","Record the distance at the top of your thumb.","Repeat several times, then repeat after the change (e.g. a caffeinated drink)."]),vid:V("reaction time ruler drop")},
 {t:"example",h:"Finding a mean",html:`<p><b>Three catches: 18 cm, 16 cm and 17 cm.</b></p><p>mean = (18 + 16 + 17) ÷ 3 = <b>17 cm</b>.</p><p>Ignore an <b>anomaly</b> (a result far from the others) when calculating the mean.</p>`},
 {t:"num",h:"Your turn",q:"Catches of 22 cm, 18 cm and 20 cm. What is the mean distance (cm)?",ans:20,tol:.01,unit:"cm",ex:"60 ÷ 3 = 20 cm."},
 {t:"q",h:"Quick check",q:"Why shouldn't the dropper give a warning?",o:["It's against the rules","You'd anticipate the drop, so it wouldn't measure true reaction time","The ruler would fall faster","It would be too loud"],a:1,ex:"Predicting the drop makes the reaction look faster than it is."},
 {t:"mistake",h:"Errors and improvements",html:`<ul><li>People get faster with practice: do a few practice drops first.</li><li>Different people have different reaction times: test the same person before and after.</li><li>Computer reaction tests give more precise times.</li></ul>`},
 {t:"sum",h:"Summary",bullets:["Catch a dropped ruler; record the distance","No warning; same hand and start position","Repeat and take a mean","Shorter distance = faster reaction","Ignore anomalies"],vid:V("reaction time ruler drop")}]},

{id:"rp-plant",triple:true,topic:"B5",rp:true,title:"Plant responses to light and gravity",mins:7,steps:[
 {t:"learn",h:"The aim",html:`${TRIPLE}<p>Investigate the effect of light or gravity on the growth of newly germinated seedlings.</p>${vars("Direction of light (or gravity)","Direction and length of growth","Type of seed, water, temperature, time")}`},
 {t:"diagram",h:"What happens",svg:PLANT,html:`<p><b>Phototropism</b>: shoots grow towards light. <b>Gravitropism</b>: roots grow towards gravity (down), shoots away from it.</p>`},
 {t:"learn",h:"Method",html:ol(["Place 10 cress seeds on damp cotton wool in Petri dishes.","Put one dish in a box with a slit, so light comes from one side; keep a control in all-round light or darkness.","For gravity, turn a dish on its side.","Leave for a few days, keeping the cotton wool damp.","Measure the length and observe the direction of growth each day."]),vid:V("plant responses light seedlings")},
 {t:"example",h:"Explaining the result",html:`<p><b>Why do shoots bend towards the light?</b></p><p>The hormone <b>auxin</b> collects on the <b>shaded</b> side of the shoot (1). It makes cells there <b>elongate</b> more (1), so the shoot bends towards the light (1).</p>`},
 {t:"q",h:"Quick check",q:"What is phototropism?",o:["Roots growing down","Growth towards or away from light","Seeds germinating in the dark","Leaves falling off"],a:1,ex:"Photo = light, tropism = growth response."},
 {t:"q",h:"Your turn",q:"In roots, auxin on the lower side…",o:["Speeds up growth, so roots bend up","Slows growth, so roots bend down","Has no effect","Makes roots photosynthesise"],a:1,ex:"In roots auxin inhibits elongation, so the root curves downwards."},
 {t:"mistake",h:"Errors and improvements",html:`<ul><li>Seedlings dry out: keep the cotton wool damp.</li><li>Use several seeds and take a mean length.</li><li>Keep a control to compare against.</li></ul>`},
 {t:"sum",h:"Summary",bullets:["Shoots grow towards light","Roots grow towards gravity","Auxin moves to the shaded side","Cells there elongate","Use a control and several seeds"],vid:V("plant responses light seedlings")}]},

{id:"rp-field",topic:"B7",rp:true,title:"Field investigations: quadrats and transects",mins:8,steps:[
 {t:"learn",h:"The aim",html:`<p>Measure the population size of a plant species using <b>random quadrats</b>, and how its distribution changes using a <b>transect</b>.</p>${vars("Distance along the transect (e.g. from a tree)","Number of plants or percentage cover in each quadrat","Quadrat size, time of year, method of counting")}`},
 {t:"diagram",h:"A transect",svg:FIELD,html:`<p>Measure an abiotic factor such as <b>light intensity</b> at each quadrat too, so you can link it to the distribution.</p>`},
 {t:"learn",h:"Method",html:ol(["Lay a tape measure from one area to another, e.g. from under a tree to open ground.","Place a quadrat at regular intervals, e.g. every 2 m.","Count the plants (or estimate percentage cover) in each quadrat.","Measure light intensity (or another factor) at each point.","For population size: place quadrats at <b>random coordinates</b>, find the mean per quadrat and scale up to the whole area."]),vid:V("quadrats transect")},
 {t:"example",h:"Estimating a population",html:`<p><b>Mean = 6 daisies per 0.25 m² quadrat. The field is 50 m².</b></p><p>50 ÷ 0.25 = 200 quadrats' worth. 6 × 200 = <b>1200 daisies</b>.</p>`},
 {t:"num",h:"Your turn",q:"Mean = 4 plants per 1 m² quadrat. The field is 300 m². Estimate the population.",ans:1200,tol:.5,unit:"plants",ex:"4 × 300 = 1200."},
 {t:"q",h:"Quick check",q:"Why are quadrats placed at random coordinates when estimating population size?",o:["To save time","To avoid bias","To find the rarest plants","Because it's easier"],a:1,ex:"Choosing places yourself might favour areas with more or fewer plants."},
 {t:"mistake",h:"Errors and improvements",html:`<ul><li>Too few quadrats: use more for a more representative sample.</li><li>Counting plants on the edge of the quadrat: decide a rule (e.g. count if more than half inside).</li><li>Light changes with clouds: take readings at the same time.</li></ul>`},
 {t:"sum",h:"Summary",bullets:["Random quadrats → population size","Transect → change in distribution","Regular intervals along a tape","Measure abiotic factors too","Mean × (area ÷ quadrat area)"],vid:V("quadrats transect")}]},

{id:"rp-decay",triple:true,topic:"B7",rp:true,title:"Decay: the effect of temperature",mins:8,steps:[
 {t:"learn",h:"The aim",html:`${TRIPLE}<p>Investigate how temperature affects the rate of decay of fresh milk, by measuring pH change.</p>${vars("Temperature of the water bath","Time for the indicator to change colour","Volumes of milk, sodium carbonate and lipase; type of indicator")}`},
 {t:"diagram",h:"The set-up",svg:DECAY,html:`<p>Lipase breaks down fat in the milk into <b>fatty acids</b>, which lower the pH. Phenolphthalein turns from pink to colourless when the solution is no longer alkaline.</p>`},
 {t:"learn",h:"Method",html:ol(["Put milk, sodium carbonate solution (alkaline) and a few drops of phenolphthalein in a test tube: it turns pink.","Put it in a water bath at a set temperature, with a separate tube of lipase.","When both reach the temperature, add the lipase and start timing.","Stop the clock when the pink colour disappears.","Repeat at other temperatures, e.g. 20, 30, 40, 50 °C."]),vid:V("decay milk lipase temperature")},
 {t:"example",h:"Calculating the rate",html:`<p><b>At 30 °C the colour changed after 200 s.</b></p><p>rate = 1 ÷ time = 1 ÷ 200 = <b>0.005 s⁻¹</b>.</p><p>The rate rises with temperature up to the optimum for lipase, then falls as the enzyme denatures.</p>`},
 {t:"num",h:"Your turn",q:"The colour changes after 250 s. What is the rate (1 ÷ time) in s⁻¹?",ans:.004,tol:.0001,unit:"s⁻¹",ex:"1 ÷ 250 = 0.004 s⁻¹."},
 {t:"q",h:"Quick check",q:"Why does the pH fall?",o:["Lipase is acidic","Fatty acids are produced as fat is broken down","Sodium carbonate is added","The milk gets warmer"],a:1,ex:"Lipase digests lipids into fatty acids and glycerol."},
 {t:"mistake",h:"Errors and improvements",html:`<ul><li>The end-point colour is hard to judge: use a colour reference or a pH probe.</li><li>Let both tubes reach the bath temperature before mixing.</li><li>Repeat each temperature and take a mean.</li></ul>`},
 {t:"sum",h:"Summary",bullets:["Milk + sodium carbonate + phenolphthalein = pink","Lipase makes fatty acids, so pH falls","Time until colourless","Rate = 1 ÷ time","Warm both tubes first"],vid:V("decay milk lipase temperature")}]}
);
})();
