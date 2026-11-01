/* Biology topic lessons (B3–B7). B1 and B2 are in lessons.js. */
(function(){const {L,B,A,T,SVG,N,BN}=window.LSN;

const IMMUNE=SVG(480,270,"Antibody levels after a vaccine and a later infection",`
<path d="M50 14 L50 220 L440 220" class="d-no"/>
<path d="M50 150 L440 150" class="d-ln" stroke-dasharray="4 4"/>
<path d="M50 215 L60 215 C80 215 95 178 110 178 C125 178 140 205 170 208 L230 208 C245 208 255 40 272 40 C300 40 340 100 435 120" class="d-line" style="stroke:#2F6FD6"/>
<path d="M60 220 L60 200 M230 220 L230 200" class="d-line"/>
${T(60,236,"vaccine","sm")}${T(230,236,"real pathogen","sm")}${T(245,258,"Time","cap")}${T(58,12,"Antibody level","cap","start")}
${T(438,144,"enough to protect you","cap","end")}
${L(110,178,140,118,1,"Primary: slow, small")}
${L(272,40,306,22,2,"Secondary: fast, large")}`);

const LEAF=SVG(460,300,"What goes in and out of a leaf in photosynthesis",`
<path d="M70 140 Q200 30 340 140 Q200 250 70 140 Z" class="d-c3"/><path d="M40 160 L70 140" class="d-line"/>
<circle cx="50" cy="45" r="22" class="d-light"/>${A(76,62,140,104,"")}
${A(420,72,320,114)}${A(320,168,420,212)}${A(122,262,146,186,"blue")}
${N(150,36,1,"Light energy")}${N(420,54,2,"CO₂ in")}${N(420,234,3,"O₂ out")}${N(120,282,4,"Water in")}
${N(205,134,5,"Glucose made")}${T(205,158,"in the chloroplasts","cap")}`);

const FEED=SVG(460,320,"Negative feedback control of blood glucose",`
${B(10,16,200,44,"c2","Blood glucose too high")}${BN(250,16,200,44,"c4",1,"Pancreas: insulin")}
${BN(250,92,200,44,"c4",2,"Liver: glucose → glycogen")}${B(10,92,200,44,"c3","Glucose falls to normal")}
${A(212,38,248,38)}${A(350,62,350,90)}${A(248,114,214,114)}
${B(10,176,200,44,"c1","Blood glucose too low")}${BN(250,176,200,44,"c4",3,"Pancreas: glucagon")}
${BN(250,252,200,44,"c4",4,"Liver: glycogen → glucose")}${B(10,252,200,44,"c3","Glucose rises to normal")}
${A(212,198,248,198)}${A(350,222,350,250)}${A(248,274,214,274)}
${T(230,160,"Each change is reversed: negative feedback","cap")}`);

const PUNNETT=SVG(440,290,"Punnett square for Bb × Bb",`
${T(220,24,"Parent 1 (Bb) gametes","sm")}${T(70,155,"Parent 2","sm")}${T(70,171,"(Bb)","sm")}
${T(180,58,"B","big")}${T(260,58,"b","big")}${T(122,115,"B","big")}${T(122,195,"b","big")}
<rect x="140" y="70" width="80" height="80" class="d-c3"/><rect x="220" y="70" width="80" height="80" class="d-c3"/><rect x="140" y="150" width="80" height="80" class="d-c3"/><rect x="220" y="150" width="80" height="80" class="d-c4"/>
${N(180,110,1,"BB")}${N(260,110,2,"Bb")}${N(180,190,3,"Bb")}${N(260,190,4,"bb")}
${T(220,256,"B = brown (dominant), b = blue (recessive)","cap")}${T(220,274,"3 brown : 1 blue, so a 25% chance of blue","cap")}`);

const CARBON=SVG(520,290,"The carbon cycle",`
${B(140,14,180,40,"c1","Carbon dioxide in the air")}
${B(10,140,120,40,"c3","Plants")}${B(170,140,120,40,"c4","Animals")}${B(170,240,120,40,"c6","Decomposers")}${B(330,240,120,40,"c2","Fossil fuels")}
${A(140,40,40,138)}${A(110,138,170,56)}${A(132,160,168,160)}${A(230,138,230,56)}
${A(70,182,168,256)}${A(230,182,230,238)}${A(292,250,310,56)}${A(390,238,320,46)}
${N(30,88,1,"photosynthesis")}${N(172,104,2,"respiration")}${N(420,150,3,"combustion")}
${T(150,200,"eaten","cap")}${T(92,236,"death, waste","cap")}${T(236,98,"respiration","cap","start")}`,-50);

window.LESSONS.biology.push(
{id:"immune",topic:"B3",title:"Pathogens, the immune system and vaccines",mins:9,steps:[
 {t:"learn",h:"Pathogens cause disease",html:`<p>A <b>pathogen</b> is a microorganism that causes infectious disease.</p><div class="tbl"><table><tr><th>Type</th><th>Example</th><th>How it harms you</th></tr><tr><td><b>Virus</b></td><td>Measles, HIV, TMV (plants)</td><td>Reproduces inside cells, then bursts them</td></tr><tr><td><b>Bacteria</b></td><td>Salmonella, gonorrhoea</td><td>Reproduce fast and make toxins</td></tr><tr><td><b>Fungus</b></td><td>Rose black spot</td><td>Spores spread; damages leaves</td></tr><tr><td><b>Protist</b></td><td>Malaria</td><td>Spread by mosquitoes (vectors)</td></tr></table></div>`},
 {t:"learn",h:"How your body fights back",html:`<p>First line: the <b>skin</b>, <b>nose hairs and mucus</b>, <b>cilia</b> in the airways and <b>stomach acid</b> stop pathogens getting in.</p><p>If they get in, <b>white blood cells</b>:</p><ol class="steps"><li><b>Engulf</b> pathogens (phagocytosis).</li><li>Make <b>antibodies</b> that lock on to the pathogen's antigens.</li><li>Make <b>antitoxins</b> that neutralise toxins.</li></ol>`},
 {t:"diagram",h:"How a vaccine protects you",svg:IMMUNE,html:`<p>A vaccine contains a <b>dead or inactive</b> form of the pathogen. White blood cells make antibodies and <b>memory cells</b>. If the real pathogen arrives, memory cells make antibodies <b>faster and in larger amounts</b>, so you don't get ill.</p>`},
 {t:"example",h:"Worked example: a 4-mark answer",html:`<p><b>Explain why antibiotics can't be used to treat a cold.</b></p><p>Colds are caused by a <b>virus</b> (1). Antibiotics only kill <b>bacteria</b> (1). Viruses live and reproduce <b>inside the body's cells</b> (1), so it is hard to kill them without damaging the cells (1). Painkillers only treat the symptoms.</p>`},
 {t:"q",h:"Quick check",q:"What do antibodies attach to?",o:["Toxins","Antigens on the pathogen","Red blood cells","Memory cells"],a:1,ex:"Each antibody fits the specific antigen on one type of pathogen."},
 {t:"q",h:"Your turn",q:"Why does the use of antibiotics need to be reduced?",o:["They cause viruses to spread","They make bacteria grow faster","Overuse helps antibiotic-resistant bacteria to survive and spread","They stop vaccines working"],a:2,ex:"Resistant bacteria survive treatment and reproduce, e.g. MRSA."},
 {t:"mistake",h:"Common mistake",html:`<p>Saying a vaccine "contains antibodies". It contains an <b>inactive pathogen</b> (antigens); your own white blood cells make the antibodies and memory cells.</p>`},
 {t:"sum",h:"Summary",bullets:["Pathogens: viruses, bacteria, fungi, protists","White blood cells engulf, make antibodies and antitoxins","Vaccines → memory cells → fast secondary response","Antibiotics kill bacteria, not viruses","New drugs are tested for toxicity, efficacy and dose, using double-blind trials"]}]},

{id:"photo",topic:"B4",title:"Photosynthesis and respiration",mins:10,steps:[
 {t:"learn",h:"Photosynthesis",html:`<p>Plants make glucose in their <b>chloroplasts</b> using light energy. It is <b>endothermic</b>: it takes in energy.</p><div class="formula">carbon dioxide + water → glucose + oxygen</div><div class="formula">6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂</div>`},
 {t:"diagram",h:"What goes in and out",svg:LEAF,html:`<p>CO₂ enters through the <b>stomata</b>. Water comes up from the roots in the <b>xylem</b>. Glucose is used for respiration, starch (storage), cellulose (cell walls), proteins and fats.</p>`},
 {t:"learn",h:"Limiting factors and respiration",html:`<p>The rate of photosynthesis is limited by whichever is in shortest supply: <b>light intensity</b>, <b>CO₂ concentration</b>, <b>temperature</b> or the amount of <b>chlorophyll</b>.</p><p><b>Respiration</b> releases energy from glucose in every living cell. It is <b>exothermic</b>.</p><div class="formula">Aerobic: glucose + oxygen → carbon dioxide + water</div><div class="formula">Anaerobic (muscles): glucose → lactic acid</div><p>Anaerobic respiration releases much less energy and causes an <b>oxygen debt</b>.</p>`},
 {t:"example",h:"Worked example: reading a graph",html:`<p><b>A graph of rate against light intensity rises, then levels off. Explain why.</b></p><ol class="steps"><li>At first, more light means more photosynthesis: <b>light is the limiting factor</b>.</li><li>Then the line levels off: something else, like <b>CO₂ or temperature</b>, has become the limiting factor.</li></ol>`},
 {t:"q",h:"Quick check",q:"Where in the cell does photosynthesis happen?",o:["Mitochondria","Nucleus","Chloroplasts","Ribosomes"],a:2,ex:"Chloroplasts contain chlorophyll, which absorbs light."},
 {t:"q",h:"Your turn",q:"During hard exercise, muscles start respiring anaerobically. What builds up?",o:["Glucose","Lactic acid","Oxygen","Ethanol"],a:1,ex:"Lactic acid builds up and causes muscle fatigue. Yeast makes ethanol instead."},
 {t:"mistake",h:"Common mistake",html:`<p>Saying "plants photosynthesise instead of respiring". Plants respire <b>all the time</b>, day and night. They photosynthesise only when there is light. Also: respiration <b>releases</b> energy, it doesn't "make" it.</p>`},
 {t:"sum",h:"Summary",bullets:["Photosynthesis: CO₂ + water → glucose + oxygen (endothermic)","Limiting factors: light, CO₂, temperature, chlorophyll","Aerobic respiration: glucose + oxygen → CO₂ + water","Anaerobic in muscles: glucose → lactic acid","Oxygen debt is repaid after exercise"]}]},

{id:"glucose",topic:"B5",title:"Homeostasis and blood glucose",mins:9,steps:[
 {t:"learn",h:"Keeping conditions steady",html:`<p><b>Homeostasis</b> keeps conditions inside the body constant: <b>body temperature</b>, <b>blood glucose</b> and <b>water levels</b>.</p><p>Every control system has <b>receptors</b> (detect a change), a <b>coordination centre</b> (brain, spinal cord or pancreas) and <b>effectors</b> (muscles or glands that bring about a response).</p>`},
 {t:"learn",h:"Nerves vs hormones",html:`<div class="tbl"><table><tr><th></th><th>Nervous system</th><th>Hormones</th></tr><tr><td>Signal</td><td>Electrical impulses along neurones</td><td>Chemicals in the blood</td></tr><tr><td>Speed</td><td>Very fast</td><td>Slower</td></tr><tr><td>Effect</td><td>Short-lived, precise area</td><td>Longer-lasting, wider area</td></tr></table></div><p>A <b>reflex arc</b>: receptor → sensory neurone → relay neurone → motor neurone → effector. It's automatic and doesn't involve the conscious brain.</p>`},
 {t:"diagram",h:"Blood glucose control",svg:FEED,html:`<p>The <b>pancreas</b> monitors blood glucose. <b>Insulin</b> lowers it; <b>glucagon</b> raises it.</p>`},
 {t:"example",h:"Worked example: diabetes",html:`<p><b>Compare type 1 and type 2 diabetes.</b></p><p><b>Type 1</b>: the pancreas produces <b>too little insulin</b>. Treated with insulin injections.</p><p><b>Type 2</b>: body cells <b>stop responding</b> to insulin. Treated with a carbohydrate-controlled diet and exercise. Obesity is a risk factor.</p>`},
 {t:"q",h:"Quick check",q:"After a meal, blood glucose rises. Which hormone does the pancreas release?",o:["Glucagon","Adrenaline","Insulin","Thyroxine"],a:2,ex:"Insulin makes cells take in glucose and the liver store it as glycogen."},
 {t:"q",h:"Your turn",q:"What happens in a reflex arc after the relay neurone?",o:["The impulse goes to the sensory neurone","The impulse goes to the motor neurone","The receptor is stimulated","The brain decides what to do"],a:1,ex:"Receptor → sensory → relay → motor → effector."},
 {t:"mistake",h:"Common mistake",html:`<p>Mixing up <b>glucagon</b> (a hormone) and <b>glycogen</b> (the stored carbohydrate in the liver and muscles). Tip: glucag<b>on</b> turns glucose production <b>on</b>.</p>`},
 {t:"sum",h:"Summary",bullets:["Homeostasis: receptor → coordination centre → effector","Nerves: fast, electrical; hormones: slower, chemical","Insulin lowers glucose; glucagon raises it","Type 1: no insulin; type 2: cells don't respond","Negative feedback reverses any change"]}]},

{id:"genetics",topic:"B6",title:"Genetic crosses and inheritance",mins:9,steps:[
 {t:"learn",h:"The key words",html:`<ul><li><b>Gene</b>: a section of DNA that codes for a protein.</li><li><b>Allele</b>: a different version of a gene.</li><li><b>Dominant</b> (capital letter) shows up with one copy; <b>recessive</b> (small letter) needs two copies.</li><li><b>Homozygous</b>: two the same (BB or bb). <b>Heterozygous</b>: two different (Bb).</li><li><b>Genotype</b>: the alleles (Bb). <b>Phenotype</b>: the characteristic you see (brown eyes).</li></ul>`},
 {t:"diagram",h:"A Punnett square",svg:PUNNETT,html:`<p>Write one parent's gametes along the top and the other's down the side, then fill in each box.</p>`},
 {t:"example",h:"Worked example",html:`<p><b>Cystic fibrosis is caused by a recessive allele (f). Two carriers (Ff) have a child. What is the chance it has cystic fibrosis?</b></p><ol class="steps"><li>Gametes: F and f from each parent.</li><li>Offspring: FF, Ff, Ff, ff.</li><li>Only ff has the disorder: 1 in 4 = <b>25%</b> (a 3:1 ratio of unaffected to affected).</li></ol>`},
 {t:"q",h:"Quick check",q:"A person has the genotype Tt. What is this called?",o:["Homozygous dominant","Heterozygous","Homozygous recessive","Recessive"],a:1,ex:"Two different alleles = heterozygous."},
 {t:"num",h:"Your turn",q:"A cross is Bb × bb. What percentage of the offspring will be bb?",ans:50,tol:.01,unit:"%",ex:"Offspring: Bb, Bb, bb, bb. 2 out of 4 = 50%."},
 {t:"learn",h:"Sex and variation",html:`<p>Humans have 23 pairs of chromosomes. Females are <b>XX</b>, males are <b>XY</b>, so there is always a 50% chance of a boy or a girl.</p><p><b>Evolution by natural selection</b>: there is variation; individuals best suited to the environment survive and breed; they pass on their alleles; over time the species changes.</p>`},
 {t:"mistake",h:"Common mistake",html:`<p>Thinking the ratio is a prediction of exact numbers. A 3:1 ratio means each child has a 25% <b>chance</b>; a family of 4 could easily have no blue-eyed children.</p>`},
 {t:"sum",h:"Summary",bullets:["Dominant needs one copy; recessive needs two","Genotype = alleles; phenotype = what you see","Heterozygous × heterozygous → 3:1","Females XX, males XY","Natural selection: variation, survival, reproduction, inheritance"]}]},

{id:"ecology",topic:"B7",title:"Ecosystems, the carbon cycle and sampling",mins:9,steps:[
 {t:"learn",h:"Communities",html:`<p>A <b>community</b> is all the populations living in a habitat. Organisms compete: plants for <b>light, space, water and minerals</b>; animals for <b>food, mates and territory</b>.</p><p>A food chain starts with a <b>producer</b> (a plant that photosynthesises). Arrows show the direction energy flows. If predators fall, prey numbers rise, then fall again: predator–prey cycles.</p>`},
 {t:"diagram",h:"The carbon cycle",svg:CARBON,html:`<p>Carbon is removed from the air by <b>photosynthesis</b> and returned by <b>respiration</b> (plants, animals and decomposers) and <b>combustion</b>.</p>`},
 {t:"learn",h:"Sampling with quadrats",html:`<ol class="steps"><li>Place quadrats <b>randomly</b> (using random coordinates) to avoid bias.</li><li>Count the organisms in each quadrat.</li><li>Find the <b>mean</b> per quadrat.</li><li>Scale up: mean × (total area ÷ quadrat area).</li></ol><p>Use a <b>transect</b> to see how the distribution changes across an area, e.g. from a path to a field.</p>`},
 {t:"example",h:"Worked example",html:`<p><b>10 quadrats (each 1 m²) found 4, 6, 3, 5, 2, 7, 4, 5, 3, 1 daisies. The field is 200 m². Estimate the population.</b></p><ol class="steps"><li>Total = 40, so the mean = 40 ÷ 10 = 4 per m².</li><li>4 × 200 = <b>800 daisies</b>.</li></ol>`},
 {t:"num",h:"Your turn",q:"The mean is 3 dandelions per 0.25 m² quadrat. The field is 100 m². Estimate the population.",ans:1200,tol:.5,unit:"dandelions",ex:"100 ÷ 0.25 = 400 quadrats' worth. 3 × 400 = 1200."},
 {t:"q",h:"Quick check",q:"Which process returns carbon from dead organisms to the air?",o:["Photosynthesis","Respiration by decomposers","Combustion","Feeding"],a:1,ex:"Bacteria and fungi break down dead material and release CO₂ as they respire."},
 {t:"mistake",h:"Common mistake",html:`<p>Placing quadrats where it "looks interesting". That introduces <b>bias</b>. Always use random coordinates, and use more quadrats for a more <b>representative</b> result.</p>`},
 {t:"sum",h:"Summary",bullets:["Producers start every food chain","Photosynthesis removes CO₂; respiration and combustion return it","Decomposers recycle carbon and minerals","Quadrats: random, find the mean, scale up","Transects show changes in distribution"]}]}
);
})();
