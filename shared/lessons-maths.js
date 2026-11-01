/* Maths lessons (Edexcel 1MA1 Higher): four worked-example lessons per strand. */
(function(){const {L,B,A,T,SVG,N,BN}=window.LSN;window.LESSONS=window.LESSONS||{};
const F=(t)=>`<div class="formula">${t}</div>`;

const PERC=SVG(440,200,"Bar model for a reverse percentage",`
${T(20,32,"Original price: 100%","sm","start")}<rect x="20" y="40" width="300" height="40" rx="6" class="d-c1"/>${N(170,60,1,"£50")}
${T(20,112,"New price: 120% = £60","sm","start")}<rect x="20" y="120" width="300" height="40" rx="6" class="d-c3"/><rect x="320" y="120" width="60" height="40" rx="6" class="d-c4"/>
${T(170,144,"100%","sm")}${T(350,144,"+20%","sm")}${T(220,190,"£60 ÷ 1.2 = £50","big")}`);

const BOUNDS=SVG(460,160,"Error interval on a number line",`
<path d="M40 90 L420 90" class="d-line"/>${[60,150,240,330,420].map((x,i)=>`<path d="M${x} 84 L${x} 96" class="d-line"/>${T(x,114,["4.2","4.25","4.3","4.35","4.4"][i],"sm")}`).join("")}
<path d="M150 90 L330 90" stroke="#2F6FD6" stroke-width="8"/><circle cx="150" cy="90" r="7" class="d-dot"/><circle cx="330" cy="90" r="7" class="d-c0" style="stroke-width:2.5"/>
${N(150,56,1,"4.25 included")}${N(330,56,2,"4.35 not")}${T(240,148,"4.25 ≤ x < 4.35","big")}`);

const RATIO=SVG(440,170,"Bar model for sharing in a ratio",`
${T(215,36,"£40 shared in the ratio 3 : 2, so 5 equal parts","sm")}
${[0,1,2,3,4].map(i=>`<rect x="${40+i*70}" y="50" width="70" height="40" class="d-c${i<3?1:2}"/>${T(75+i*70,75,"£8","sm")}`).join("")}
${N(145,120,1,"Amy: 3 × £8 = £24")}${N(320,120,2,"Ben: 2 × £8 = £16")}${T(220,155,"£40 ÷ 5 = £8 per part","cap")}`);

const ax=(ox,oy,x1,y1,xs,ys)=>`<path d="M${ox} ${y1} L${ox} ${oy} M${ox} ${oy} L${x1} ${oy}" class="d-no"/>`;
const LINE=SVG(500,260,"Graph of y = 2x + 1 with a gradient triangle",`
${ax(80,230,400,14)}${[1,2,3,4,5,6].map(x=>T(80+x*50,246,x,"sm")).join("")}${[2,4,6,8,10,12].map(y=>T(72,234-y*18,y,"sm","end")).join("")}
<path d="M80 212 L330 32" class="d-line" style="stroke:#2F6FD6"/>
<path d="M130 176 L230 176 L230 104" class="d-line" style="stroke:#D2433B" stroke-dasharray="5 4"/>
${N(180,192,1,"run = 2")}${N(272,140,2,"rise = 4")}
${L(80,212,30,212,3,"c = 1","end")}`,-60);

const QUAD=(()=>{const X=x=>160+x*50,Y=y=>120-y*20;let d="";for(let x=-1.6;x<=3.61;x+=.1){const y=x*x-2*x-3;d+=(d?" L":"M")+X(x).toFixed(1)+" "+Y(y).toFixed(1)}
return SVG(540,260,"Graph of y = x² − 2x − 3",`
<path d="M40 120 L400 120 M160 14 L160 240" class="d-no"/>${[-2,-1,1,2,3,4].map(x=>T(X(x),136,x,"sm")).join("")}
<path d="${d}" class="d-line" style="stroke:#2F6FD6"/>
<circle cx="${X(-1)}" cy="120" r="4" class="d-dot"/><circle cx="${X(3)}" cy="120" r="4" class="d-dot"/><circle cx="${X(1)}" cy="${Y(-4)}" r="4" class="d-dot"/><circle cx="160" cy="${Y(-3)}" r="4" class="d-dot"/>
${L(X(-1),120,80,70,1,"Root x = −1","end")}${L(X(3),120,340,70,2,"Root x = 3")}${L(X(1),Y(-4),260,236,3,"Turning point (1, −4)")}${L(160,Y(-3),110,210,4,"y-intercept −3","end")}`,-60)})();

const SIMUL=SVG(440,260,"Two straight lines crossing at the solution",`
${ax(60,230,400,20)}${[1,2,3,4,5,6,7,8].map(x=>T(60+x*40,246,x,"sm")).join("")}${[2,4,6,8,10].map(y=>T(52,234-y*20,y,"sm","end")).join("")}
<path d="M60 210 L380 50" class="d-line" style="stroke:#2F6FD6"/><path d="M60 90 L340 230" class="d-line" style="stroke:#D2433B"/>
<circle cx="180" cy="150" r="5" class="d-dot"/>
${N(330,52,1,"y = x + 1")}${N(320,196,2,"x + y = 7")}${L(180,150,240,150,3,"Solution: (3, 4)")}`);

const SEQ=SVG(440,210,"Differences of a quadratic sequence",`
${[3,8,15,24,35].map((t,i)=>T(60+i*80,50,t,"big")).join("")}
${[5,7,9,11].map((t,i)=>`<path d="M${66+i*80} 58 L${100+i*80} 86 L${134+i*80} 58" class="d-ln"/>${T(100+i*80,104,"+"+t,"sm")}`).join("")}
${[0,1,2].map(i=>`<path d="M${106+i*80} 110 L${140+i*80} 136 L${174+i*80} 110" class="d-ln"/>${T(140+i*80,154,"+2","sm")}`).join("")}
${N(220,186,1,"Second difference 2, so n²")}${T(14,50,"Terms","cap","start")}`,-10);

const TRIG=SVG(470,260,"Right-angled triangle with sides labelled from angle θ",`
<path d="M60 220 L380 220 L380 60 Z" class="d-c1"/><path d="M366 220 L366 206 L380 206" class="d-no"/>
<path d="M100 220 A40 40 0 0 0 95.8 202.1" class="d-no"/>${T(116,212,"θ","big")}
${N(220,242,1,"Adjacent")}${N(428,140,2,"Opposite")}${N(196,122,3,"Hypotenuse")}`);

const CIRC=SVG(400,290,"Angle at the centre is twice the angle at the circumference",`
<circle cx="200" cy="150" r="100" class="d-no"/>
<path d="M182.6 51.5 L118.1 207.4 M182.6 51.5 L281.9 207.4 M200 150 L118.1 207.4 M200 150 L281.9 207.4" class="d-line"/>
<circle cx="200" cy="150" r="3.5" class="d-dot"/>${T(200,140,"O","sm")}${T(180,42,"C","sm")}${T(106,218,"A","sm")}${T(294,218,"B","sm")}
${N(200,180,1,"2x")}${N(184,86,2,"x")}${T(200,280,"Angle at the centre = 2 × angle at the circumference","cap")}`);

const SECTOR=SVG(460,250,"A sector of a circle",`
<path d="M120 210 L280 210 A160 160 0 0 0 200 71.4 Z" class="d-c4"/>
<path d="M150 210 A30 30 0 0 0 135 184" class="d-no"/>${T(158,198,"θ","big")}
${L(200,210,220,238,1,"Radius r")}${L(258.6,130,300,96,2,"Arc length")}${N(196,168,3,"Sector area")}`);

const POLY=SVG(440,280,"Interior and exterior angles of a regular hexagon",`
<path d="M260 140 L215 62 L125 62 L80 140 L125 218 L215 218 Z" class="d-c1"/>
<path d="M260 140 L292 85" class="d-line" stroke-dasharray="5 4"/>
${N(222,140,1,"120°")}${N(268,98,2,"60°")}
${T(220,262,"Interior + exterior = 180°. Exterior angles add up to 360°.","cap")}`);

const TREE=SVG(470,290,"Probability tree diagram",`
<path d="M30 150 L170 80 M30 150 L170 220 M180 80 L320 40 M180 80 L320 120 M180 220 L320 180 M180 220 L320 260" class="d-line"/>
${T(164,68,"R","sm")}${T(164,244,"B","sm")}${T(326,44,"R","sm","start")}${T(326,124,"B","sm","start")}${T(326,184,"R","sm","start")}${T(326,264,"B","sm","start")}
${T(88,104,"3/5","sm")}${T(88,206,"2/5","sm")}${T(244,50,"3/5","sm")}${T(244,114,"2/5","sm")}${T(244,190,"3/5","sm")}${T(244,254,"2/5","sm")}
${N(410,40,1,"RR = 9/25")}${N(410,120,2,"RB = 6/25")}${N(410,180,3,"BR = 6/25")}${N(410,260,4,"BB = 4/25")}`);

const HIST=SVG(500,270,"Histogram with unequal class widths",`
<path d="M60 20 L60 230 L430 230" class="d-no"/>
${[0,10,20,30,40].map(x=>T(60+x*9,246,x,"sm")).join("")}${[1,2,3,4,5].map(y=>T(52,234-y*40,y,"sm","end")).join("")}
<rect x="60" y="170" width="90" height="60" class="d-c1"/><rect x="150" y="70" width="45" height="160" class="d-c1"/><rect x="195" y="102" width="45" height="128" class="d-c1"/><rect x="240" y="206" width="180" height="24" class="d-c1"/>
${T(66,16,"Frequency density","cap","start")}${T(240,264,"Time (minutes)","cap")}
${L(172,90,250,56,1,"fd = 20 ÷ 5 = 4")}${L(330,216,350,170,2,"freq = 0.6 × 20 = 12")}`);

const BOX=SVG(470,220,"A box plot",`
<path d="M136 85 L184 85 M288 85 L360 85 M136 70 L136 100 M360 70 L360 100" class="d-line"/>
<rect x="184" y="60" width="104" height="50" class="d-c4"/><path d="M232 60 L232 110" class="d-line"/>
${N(136,40,1,"Min")}${N(184,40,2,"LQ")}${N(232,40,3,"Median")}${N(288,40,4,"UQ")}${N(360,40,5,"Max")}
<path d="M184 124 L184 132 L288 132 L288 124" class="d-no"/>${T(236,150,"IQR = 31 − 18 = 13","sm")}
<path d="M40 190 L440 190" class="d-line"/>${[0,10,20,30,40,50].map(v=>`<path d="M${40+v*8} 186 L${40+v*8} 194" class="d-line"/>${T(40+v*8,210,v,"sm")}`).join("")}`);

window.LESSONS.maths=[
/* ---------- Number ---------- */
{id:"indices",topic:"N",title:"Indices and surds",mins:9,steps:[
 {t:"learn",h:"The index laws",html:`<div class="tbl"><table><tr><th>Rule</th><th>Example</th></tr><tr><td>a<sup>m</sup> × a<sup>n</sup> = a<sup>m+n</sup></td><td>x<sup>5</sup> × x<sup>3</sup> = x<sup>8</sup></td></tr><tr><td>a<sup>m</sup> ÷ a<sup>n</sup> = a<sup>m−n</sup></td><td>x<sup>7</sup> ÷ x<sup>2</sup> = x<sup>5</sup></td></tr><tr><td>(a<sup>m</sup>)<sup>n</sup> = a<sup>mn</sup></td><td>(x<sup>3</sup>)<sup>4</sup> = x<sup>12</sup></td></tr><tr><td>a<sup>0</sup> = 1</td><td>7<sup>0</sup> = 1</td></tr><tr><td>a<sup>−n</sup> = 1 ÷ a<sup>n</sup></td><td>2<sup>−3</sup> = 1/8</td></tr><tr><td>a<sup>1/n</sup> = ⁿ√a</td><td>27<sup>1/3</sup> = 3</td></tr></table></div>`},
 {t:"example",h:"Worked example: fractional powers",html:`<p><b>Work out 8<sup>2/3</sup> and 27<sup>−2/3</sup>.</b></p><ol class="steps"><li>The bottom of the fraction is the <b>root</b>; the top is the <b>power</b>.</li><li>8<sup>2/3</sup> = (∛8)² = 2² = <b>4</b>.</li><li>27<sup>−2/3</sup>: the minus means "1 over". (∛27)² = 9, so the answer is <b>1/9</b>.</li></ol><p>Always do the root first: the numbers stay small.</p>`},
 {t:"learn",h:"Surds",html:`<p>A <b>surd</b> is a root that isn't a whole number, like √2. Leave it as a surd for an exact answer.</p><ul><li><b>Simplify</b>: find a square factor. √12 = √4 × √3 = <b>2√3</b>.</li><li><b>Rationalise</b> a denominator: multiply top and bottom by the surd. 6/√3 = 6√3/3 = <b>2√3</b>.</li><li>For 1/(3 + √2), multiply by (3 − √2) to use the difference of two squares.</li></ul>`},
 {t:"q",h:"Quick check",q:"Simplify y<sup>4</sup> × y<sup>6</sup> ÷ y<sup>3</sup>.",o:["y<sup>7</sup>","y<sup>13</sup>","y<sup>8</sup>","y<sup>24</sup>"],a:0,ex:"4 + 6 − 3 = 7."},
 {t:"num",h:"Your turn",q:"Work out 16<sup>3/4</sup>.",ans:8,tol:.001,unit:"",ex:"Fourth root of 16 is 2. Then 2³ = 8."},
 {t:"q",h:"One more",q:"Simplify √50.",o:["25√2","5√2","2√5","10√5"],a:1,ex:"√50 = √25 × √2 = 5√2."},
 {t:"mistake",h:"Common mistake",html:`<p>Multiplying the powers when you multiply terms: x<sup>5</sup> × x<sup>3</sup> is x<sup>8</sup>, not x<sup>15</sup>. And a negative power doesn't make the answer negative: 2<sup>−3</sup> = 1/8.</p>`},
 {t:"sum",h:"Summary",bullets:["Multiply: add powers; divide: subtract; bracket: multiply","Power 0 = 1; negative = reciprocal","Fraction power: root first, then power","Simplify surds with a square factor","Rationalise: multiply top and bottom by the surd"]}]},

{id:"percent",topic:"N",title:"Percentages, multipliers and compound interest",mins:9,steps:[
 {t:"learn",h:"Use a multiplier",html:`<p>Turn every percentage change into one number to multiply by.</p><div class="tbl"><table><tr><th>Change</th><th>Multiplier</th></tr><tr><td>Increase by 15%</td><td>× 1.15</td></tr><tr><td>Decrease by 15%</td><td>× 0.85</td></tr><tr><td>Increase by 3%</td><td>× 1.03</td></tr></table></div>${F("percentage change = change ÷ original × 100")}`},
 {t:"diagram",h:"Reverse percentages",svg:PERC,html:`<p>After a 20% increase, a price is £60. The £60 is <b>120%</b> of the original, so <b>divide</b> by the multiplier: £60 ÷ 1.2 = £50. Don't take 20% off £60.</p>`},
 {t:"example",h:"Worked example: compound interest",html:`<p><b>£2000 is invested at 3% compound interest for 4 years. Find the final amount.</b></p><ol class="steps"><li>Multiplier: 1.03.</li><li>For 4 years: 2000 × 1.03⁴.</li><li>= 2251.0176… = <b>£2251.02</b>.</li></ol>${F("amount = original × multiplier<sup>number of years</sup>")}`},
 {t:"num",h:"Your turn",q:"A car worth £12 000 loses 15% of its value each year. What is it worth after 2 years? (in £)",ans:8670,tol:.5,unit:"£",ex:"12 000 × 0.85² = 12 000 × 0.7225 = £8670."},
 {t:"num",h:"Quick check",q:"A price goes up from £40 to £50. What is the percentage increase?",ans:25,tol:.01,unit:"%",ex:"Change 10 ÷ original 40 × 100 = 25%."},
 {t:"q",h:"One more",q:"In a sale, a coat costs £68 after 15% off. What was the original price?",o:["£78.20","£80","£57.80","£83"],a:1,ex:"£68 is 85%, so £68 ÷ 0.85 = £80."},
 {t:"mistake",h:"Common mistake",html:`<p>Finding the percentage of the <b>new</b> amount in a reverse percentage question. If £68 is after 15% off, then £68 is 85% of the original. Divide by 0.85.</p>`},
 {t:"sum",h:"Summary",bullets:["Increase x%: × (1 + x/100); decrease: × (1 − x/100)","% change = change ÷ original × 100","Reverse %: divide by the multiplier","Compound: original × multiplierⁿ","Simple interest is the same amount each year"]}]},

{id:"bounds",topic:"N",title:"Bounds and error intervals",mins:8,steps:[
 {t:"learn",h:"Rounding hides a range",html:`<p>If a length is 4.3 cm to 1 decimal place, the real value could be anything that rounds to 4.3. Go <b>half a unit</b> either side: half of 0.1 is 0.05.</p><p>Lower bound 4.25, upper bound 4.35.</p>`},
 {t:"diagram",h:"Writing an error interval",svg:BOUNDS,html:`<p>Use ≤ for the lower bound and &lt; for the upper bound: 4.35 would round up to 4.4.</p><p><b>Truncated</b> to 1 dp (chopped off): 4.3 ≤ x &lt; 4.4.</p>`},
 {t:"learn",h:"Bounds in calculations",html:`<div class="tbl"><table><tr><th>To find the upper bound of…</th><th>Use</th></tr><tr><td>a + b</td><td>UB a + UB b</td></tr><tr><td>a − b</td><td>UB a − LB b</td></tr><tr><td>a × b</td><td>UB a × UB b</td></tr><tr><td>a ÷ b</td><td>UB a ÷ LB b</td></tr></table></div><p>For lower bounds, swap them over.</p>`},
 {t:"example",h:"Worked example",html:`<p><b>a = 12 to the nearest whole number; b = 2.5 to 1 dp. Find the upper bound of a ÷ b.</b></p><ol class="steps"><li>UB of a = 12.5; LB of b = 2.45.</li><li>12.5 ÷ 2.45 = <b>5.102…</b></li></ol>`},
 {t:"num",h:"Your turn",q:"A square has sides of 8 cm to the nearest cm. What is the upper bound of its perimeter (in cm)?",ans:34,tol:.001,unit:"cm",ex:"UB of a side = 8.5 cm. 4 × 8.5 = 34 cm."},
 {t:"q",h:"Quick check",q:"m = 70 kg to the nearest 10 kg. What is the error interval?",o:["65 ≤ m < 75","69.5 ≤ m < 70.5","60 ≤ m < 80","65 < m ≤ 75"],a:0,ex:"Half of 10 is 5."},
 {t:"mistake",h:"Common mistake",html:`<p>Using both upper bounds for a division or subtraction. To make a ÷ b as <b>big</b> as possible, divide by the <b>smallest</b> b.</p>`},
 {t:"sum",h:"Summary",bullets:["Bounds: half a unit either side","Error interval: LB ≤ x < UB","Truncation: LB ≤ x < LB + 1 unit","UB of a − b = UB a − LB b","UB of a ÷ b = UB a ÷ LB b"]}]},

{id:"ratio",topic:"N",title:"Ratio and proportion",mins:9,steps:[
 {t:"learn",h:"Ratios",html:`<p>A ratio compares parts. Simplify by dividing both parts by the same number: 12 : 8 = 3 : 2.</p><p>To <b>share</b> an amount: add the parts, find one part, then multiply.</p>`},
 {t:"diagram",h:"Sharing with a bar model",svg:RATIO,html:`<p>Check: £24 + £16 = £40.</p>`},
 {t:"learn",h:"Direct and inverse proportion",html:`<p><b>Direct</b> (y ∝ x): y = kx. Double one, double the other.</p><p><b>Inverse</b> (y ∝ 1/x): y = k ÷ x. Double one, halve the other.</p><p>Find k with the values you're given, then use the formula.</p>`},
 {t:"example",h:"Worked example",html:`<p><b>y is directly proportional to x². y = 50 when x = 5. Find y when x = 3.</b></p><ol class="steps"><li>y = kx².</li><li>50 = k × 25, so k = 2.</li><li>y = 2 × 3² = <b>18</b>.</li></ol>`},
 {t:"num",h:"Your turn",q:"Share £360 in the ratio 4 : 5. How much is the larger share (in £)?",ans:200,tol:.01,unit:"£",ex:"9 parts. 360 ÷ 9 = 40. 5 × 40 = £200."},
 {t:"q",h:"Quick check",q:"4 workers take 6 days to build a wall. How long would 3 workers take?",o:["4.5 days","8 days","7 days","5 days"],a:1,ex:"Inverse proportion: 4 × 6 = 24 worker-days. 24 ÷ 3 = 8 days."},
 {t:"mistake",h:"Common mistake",html:`<p>Dividing by one part of the ratio instead of the <b>total</b> number of parts. In 3 : 2 there are 5 parts.</p>`},
 {t:"sum",h:"Summary",bullets:["Simplify ratios by a common factor","Share: total parts → one part → multiply","Direct: y = kx; inverse: y = k/x","Find k first, then substitute","Always check the parts add up"]}]},

/* ---------- Algebra ---------- */
{id:"lines",topic:"A",title:"Straight-line graphs",mins:9,steps:[
 {t:"learn",h:"y = mx + c",html:`<p><b>m</b> is the <b>gradient</b> (steepness). <b>c</b> is the <b>y-intercept</b> (where the line crosses the y-axis).</p>${F("gradient = change in y ÷ change in x")}<ul><li><b>Parallel</b> lines have the same gradient.</li><li><b>Perpendicular</b> gradients multiply to −1: flip and change the sign.</li></ul>`},
 {t:"diagram",h:"Finding the gradient",svg:LINE,html:`<p>Gradient = 4 ÷ 2 = 2, and the line crosses the y-axis at 1, so its equation is <b>y = 2x + 1</b>.</p>`},
 {t:"example",h:"Worked example",html:`<p><b>Find the equation of the line through (1, 3) and (3, 7).</b></p><ol class="steps"><li>m = (7 − 3) ÷ (3 − 1) = 2.</li><li>Substitute (1, 3): 3 = 2 × 1 + c, so c = 1.</li><li><b>y = 2x + 1</b>.</li></ol><p>A line perpendicular to it has gradient <b>−½</b>.</p>`},
 {t:"num",h:"Your turn",q:"Find the gradient of the line through (2, 5) and (6, 13).",ans:2,tol:.001,unit:"",ex:"(13 − 5) ÷ (6 − 2) = 8 ÷ 4 = 2."},
 {t:"q",h:"Quick check",q:"What is the gradient of a line perpendicular to y = 3x − 2?",o:["3","−3","1/3","−1/3"],a:3,ex:"Flip 3 to 1/3 and change the sign: −1/3."},
 {t:"q",h:"One more",q:"Which line is parallel to y = 4x + 1?",o:["y = x + 4","y = 4x − 7","y = −4x + 1","y = ¼x + 1"],a:1,ex:"Parallel lines have the same gradient: 4."},
 {t:"mistake",h:"Common mistake",html:`<p>Writing change in x over change in y. Gradient is <b>up ÷ across</b>. Also, rearrange to y = … before reading m: in 2y = 6x + 4, the gradient is 3, not 6.</p>`},
 {t:"sum",h:"Summary",bullets:["y = mx + c: m gradient, c intercept","Gradient = rise ÷ run","Parallel: same m","Perpendicular: m₁ × m₂ = −1","Rearrange to y = … first"]}]},

{id:"quadratics",topic:"A",title:"Solving quadratics",mins:10,steps:[
 {t:"learn",h:"Three methods",html:`<ol class="steps"><li><b>Factorise</b>: x² − 2x − 3 = (x − 3)(x + 1) = 0, so x = 3 or x = −1.</li><li><b>Quadratic formula</b> (on the formula sheet): x = (−b ± √(b² − 4ac)) ÷ 2a. Use it when it won't factorise.</li><li><b>Complete the square</b>: x² − 2x − 3 = (x − 1)² − 4.</li></ol>`},
 {t:"diagram",h:"What the solutions mean",svg:QUAD,html:`<p>The solutions (roots) are where the curve crosses the x-axis. Completing the square gives the <b>turning point</b>: (x − 1)² − 4 has its minimum at (1, −4).</p>`},
 {t:"example",h:"Worked example: the formula",html:`<p><b>Solve 2x² + 3x − 4 = 0 to 2 dp.</b></p><ol class="steps"><li>a = 2, b = 3, c = −4.</li><li>b² − 4ac = 9 + 32 = 41.</li><li>x = (−3 ± √41) ÷ 4.</li><li>x = <b>0.85</b> or x = <b>−2.35</b>.</li></ol>`},
 {t:"num",h:"Your turn",q:"Find the positive solution of x² + x − 12 = 0.",ans:3,tol:.001,unit:"",ex:"(x + 4)(x − 3) = 0, so x = 3 or x = −4."},
 {t:"q",h:"Quick check",q:"What is the turning point of y = (x + 2)² + 5?",o:["(2, 5)","(−2, 5)","(2, −5)","(−2, −5)"],a:1,ex:"(x + p)² + q has its turning point at (−p, q)."},
 {t:"q",h:"One more",q:"Factorise x² − 49.",o:["(x − 7)²","(x + 7)(x − 7)","(x − 49)(x + 1)","x(x − 49)"],a:1,ex:"The difference of two squares: a² − b² = (a + b)(a − b)."},
 {t:"mistake",h:"Common mistake",html:`<p>Getting the signs wrong in the formula. Put <b>brackets</b> round negative numbers: if b = −5, then b² = (−5)² = 25, and −b = 5.</p>`},
 {t:"sum",h:"Summary",bullets:["Make it = 0 first","Factorise, then set each bracket to 0","Formula when it won't factorise","(x + p)² + q → turning point (−p, q)","Roots are where the curve crosses the x-axis"]}]},

{id:"simul",topic:"A",title:"Simultaneous equations",mins:9,steps:[
 {t:"learn",h:"Two equations, two unknowns",html:`<p>You need values of x and y that make <b>both</b> equations true.</p><ol class="steps"><li>Make the coefficients of one letter the same (multiply an equation if needed).</li><li><b>Add</b> if the signs are different; <b>subtract</b> if they're the same.</li><li>Solve, then substitute back to find the other letter.</li><li>Check in the other equation.</li></ol>`},
 {t:"example",h:"Worked example: elimination",html:`<p><b>Solve 3x + 2y = 16 and x + 2y = 8.</b></p><ol class="steps"><li>Both have +2y, so subtract: 2x = 8, so x = 4.</li><li>Substitute: 4 + 2y = 8, so y = 2.</li><li>Check: 3(4) + 2(2) = 16 ✓.</li></ol>`},
 {t:"diagram",h:"The graph view",svg:SIMUL,html:`<p>The solution of y = x + 1 and x + y = 7 is where the lines <b>cross</b>: x = 3, y = 4.</p><p>Higher: with a quadratic or a circle, <b>substitute</b> the linear equation into the other one. You can get two pairs of answers.</p>`},
 {t:"num",h:"Your turn",q:"Solve 2x + y = 11 and x − y = 1. What is x?",ans:4,tol:.001,unit:"",ex:"Add them: 3x = 12, so x = 4 (and y = 3)."},
 {t:"q",h:"Quick check",q:"For 5x + 3y = 19 and 2x + 3y = 10, what should you do first?",o:["Add the equations","Subtract the equations","Multiply both by 3","Square both"],a:1,ex:"Both have +3y, so subtract: 3x = 9, x = 3."},
 {t:"mistake",h:"Common mistake",html:`<p>Subtracting wrongly with negatives: 2y − (−3y) = 5y. Write the subtraction out line by line.</p>`},
 {t:"sum",h:"Summary",bullets:["Match one coefficient","Same signs subtract; different signs add","Substitute back, then check","Solution = where the graphs cross","With a quadratic, substitute"]}]},

{id:"sequences",topic:"A",title:"Linear and quadratic sequences",mins:8,steps:[
 {t:"learn",h:"Linear sequences",html:`<p>A linear sequence goes up or down by the same amount each time.</p><p>5, 8, 11, 14…: the difference is 3, so start with <b>3n</b>. 3 × 1 = 3, but the first term is 5, so add 2: <b>nth term = 3n + 2</b>.</p>`},
 {t:"diagram",h:"Quadratic sequences",svg:SEQ,html:`<p>If the <b>second</b> difference is constant, it's quadratic. Halve the second difference for the number in front of n².</p>`},
 {t:"example",h:"Worked example",html:`<p><b>Find the nth term of 3, 8, 15, 24, 35.</b></p><ol class="steps"><li>Second difference 2, so start with 1n².</li><li>Subtract n² (1, 4, 9, 16, 25): 2, 4, 6, 8, 10.</li><li>That's 2n.</li><li><b>nth term = n² + 2n</b>. Check n = 3: 9 + 6 = 15 ✓.</li></ol>`},
 {t:"num",h:"Your turn",q:"What is the 20th term of the sequence 3n + 2?",ans:62,tol:.001,unit:"",ex:"3 × 20 + 2 = 62."},
 {t:"q",h:"Quick check",q:"Is 100 a term in the sequence 3n + 2?",o:["Yes, n = 33","No: 3n = 98 doesn't give a whole number","Yes, n = 34","Yes, n = 98"],a:1,ex:"98 ÷ 3 = 32.67, not a whole number."},
 {t:"mistake",h:"Common mistake",html:`<p>Writing "n + 3" for a sequence that goes up in 3s. The difference goes <b>in front of n</b>: 3n + something.</p>`},
 {t:"sum",h:"Summary",bullets:["Linear: common difference → dn + c","Quadratic: constant second difference","n² coefficient = half the second difference","Subtract the n² part, then find the linear part","Test a term is in it: solve for n"]}]},

/* ---------- Geometry ---------- */
{id:"trig",topic:"G",title:"Pythagoras and trigonometry",mins:10,steps:[
 {t:"learn",h:"Pythagoras",html:`<p>In a right-angled triangle, the longest side (opposite the right angle) is the <b>hypotenuse</b>.</p>${F("a² + b² = c²")}<p>Finding the hypotenuse: square, <b>add</b>, square root. Finding a shorter side: square, <b>subtract</b>, square root.</p>`},
 {t:"diagram",h:"Naming the sides for trig",svg:TRIG,html:`<p><b>SOH CAH TOA</b>: sin θ = O ÷ H, cos θ = A ÷ H, tan θ = O ÷ A.</p>`},
 {t:"example",h:"Worked example",html:`<p><b>The hypotenuse is 10 cm and θ = 30°. Find the opposite side.</b></p><ol class="steps"><li>O and H: use sin.</li><li>O = 10 × sin 30° = 10 × 0.5 = <b>5 cm</b>.</li></ol><p><b>Finding an angle:</b> O = 5, A = 12, so θ = tan⁻¹(5 ÷ 12) = <b>22.6°</b>.</p>`},
 {t:"num",h:"Your turn",q:"The two shorter sides of a right-angled triangle are 6 cm and 8 cm. How long is the hypotenuse (in cm)?",ans:10,tol:.01,unit:"cm",ex:"6² + 8² = 36 + 64 = 100. √100 = 10."},
 {t:"q",h:"Quick check",q:"You know the adjacent side and the hypotenuse. Which ratio do you use?",o:["sin","cos","tan","Pythagoras"],a:1,ex:"CAH: cos θ = adjacent ÷ hypotenuse."},
 {t:"learn",h:"Exact values (non-calculator)",html:`<div class="tbl"><table><tr><th></th><th>0°</th><th>30°</th><th>45°</th><th>60°</th><th>90°</th></tr><tr><td>sin</td><td>0</td><td>½</td><td>√2/2</td><td>√3/2</td><td>1</td></tr><tr><td>cos</td><td>1</td><td>√3/2</td><td>√2/2</td><td>½</td><td>0</td></tr><tr><td>tan</td><td>0</td><td>√3/3</td><td>1</td><td>√3</td><td>—</td></tr></table></div>`},
 {t:"mistake",h:"Common mistake",html:`<p>Calculator in <b>radians</b> mode. Check it shows "D" (degrees): sin 30 should give 0.5.</p>`},
 {t:"sum",h:"Summary",bullets:["a² + b² = c² (c = hypotenuse)","Label O, A, H from the angle","SOH CAH TOA","Use inverse (sin⁻¹ etc.) to find angles","Learn the exact values for 30°, 45°, 60°"]}]},

{id:"angles",topic:"G",title:"Angles, parallel lines and polygons",mins:8,steps:[
 {t:"learn",h:"Angle facts",html:`<ul><li>Angles on a straight line add to <b>180°</b>; around a point to <b>360°</b>; in a triangle to <b>180°</b>.</li><li>Vertically opposite angles are equal.</li><li>Parallel lines: <b>alternate</b> angles are equal (Z), <b>corresponding</b> angles are equal (F), <b>co-interior</b> angles add to 180° (C).</li></ul>`},
 {t:"diagram",h:"Polygon angles",svg:POLY,html:`${F("sum of interior angles = (n − 2) × 180°")}${F("exterior angle of a regular polygon = 360° ÷ n")}`},
 {t:"example",h:"Worked example",html:`<p><b>Find the interior angle of a regular hexagon.</b></p><ol class="steps"><li>Exterior angle = 360 ÷ 6 = 60°.</li><li>Interior = 180 − 60 = <b>120°</b>.</li></ol><p>Or: sum = 4 × 180 = 720°, and 720 ÷ 6 = 120°.</p>`},
 {t:"num",h:"Your turn",q:"What is the sum of the interior angles of an octagon (in degrees)?",ans:1080,tol:.01,unit:"°",ex:"(8 − 2) × 180 = 1080°."},
 {t:"num",h:"One more",q:"A regular polygon has exterior angles of 24°. How many sides does it have?",ans:15,tol:.01,unit:"sides",ex:"360 ÷ 24 = 15."},
 {t:"mistake",h:"Common mistake",html:`<p>Not giving <b>reasons</b>. "Give reasons" questions need the angle fact in words, like "alternate angles are equal", not just "Z angles".</p>`},
 {t:"sum",h:"Summary",bullets:["Straight line 180°; point 360°; triangle 180°","Alternate and corresponding equal; co-interior 180°","Interior sum = (n − 2) × 180°","Regular exterior = 360° ÷ n","Write reasons in full"]}]},

{id:"circles",topic:"G",title:"Circle theorems",mins:9,steps:[
 {t:"learn",h:"The theorems",html:`<ol class="steps"><li>The angle at the <b>centre</b> is twice the angle at the circumference.</li><li>The angle in a <b>semicircle</b> is 90°.</li><li>Angles in the <b>same segment</b> are equal.</li><li>Opposite angles of a <b>cyclic quadrilateral</b> add up to 180°.</li><li>A <b>tangent</b> meets a radius at 90°.</li><li>Two tangents from the same point are equal in length.</li><li><b>Alternate segment</b>: the angle between a tangent and a chord equals the angle in the alternate segment.</li><li>A perpendicular from the centre to a chord <b>bisects</b> the chord.</li></ol>`},
 {t:"diagram",h:"The centre and the circumference",svg:CIRC,html:`<p>Both angles stand on the same arc AB.</p>`},
 {t:"example",h:"Worked example",html:`<p><b>Angle ACB = 35°. Find angle AOB, then angle OAB.</b></p><ol class="steps"><li>AOB = 2 × 35 = <b>70°</b> (angle at the centre is twice the angle at the circumference).</li><li>OA = OB (radii), so triangle OAB is isosceles.</li><li>OAB = (180 − 70) ÷ 2 = <b>55°</b> (base angles of an isosceles triangle).</li></ol>`},
 {t:"num",h:"Your turn",q:"In a cyclic quadrilateral, one angle is 112°. What is the opposite angle (in degrees)?",ans:68,tol:.01,unit:"°",ex:"Opposite angles add to 180°. 180 − 112 = 68°."},
 {t:"q",h:"Quick check",q:"A triangle is drawn in a circle with one side as the diameter. What is the angle opposite the diameter?",o:["45°","60°","90°","180°"],a:2,ex:"The angle in a semicircle is 90°."},
 {t:"mistake",h:"Common mistake",html:`<p>Forgetting that two radii make an <b>isosceles triangle</b>. It's the hidden step in lots of circle questions.</p>`},
 {t:"sum",h:"Summary",bullets:["Centre = 2 × circumference","Semicircle = 90°","Same segment angles are equal","Cyclic quadrilateral: opposites add to 180°","Tangent ⟂ radius; look for isosceles triangles"]}]},

{id:"area",topic:"G",title:"Sectors, volume and similar shapes",mins:9,steps:[
 {t:"learn",h:"Circles and sectors",html:`${F("area = πr²")}${F("circumference = 2πr")}<p>A <b>sector</b> is a fraction of a circle: θ out of 360.</p>${F("sector area = θ/360 × πr²")}${F("arc length = θ/360 × 2πr")}`},
 {t:"diagram",h:"A sector",svg:SECTOR,html:`<p>The perimeter of a sector is the arc length <b>plus two radii</b>.</p>`},
 {t:"example",h:"Worked example",html:`<p><b>A sector has radius 6 cm and angle 60°. Find its area and arc length.</b></p><ol class="steps"><li>60/360 = 1/6.</li><li>Area = 1/6 × π × 36 = 6π = <b>18.8 cm²</b>.</li><li>Arc = 1/6 × 2 × π × 6 = 2π = <b>6.28 cm</b>.</li></ol>`},
 {t:"num",h:"Your turn",q:"Find the volume of a cylinder with radius 3 cm and height 10 cm, to 1 dp (in cm³).",ans:282.7,tol:.1,unit:"cm³",ex:"πr²h = π × 9 × 10 = 90π = 282.7 cm³."},
 {t:"learn",h:"Similar shapes",html:`<p>If lengths are multiplied by <b>k</b>, areas are multiplied by <b>k²</b> and volumes by <b>k³</b>.</p><p>Example: two similar jugs have heights 10 cm and 20 cm (k = 2). The big one holds 2³ = 8 times as much.</p>`},
 {t:"q",h:"Quick check",q:"Two similar shapes have areas in the ratio 1 : 9. What is the ratio of their lengths?",o:["1 : 3","1 : 9","1 : 27","1 : 81"],a:0,ex:"Area factor k² = 9, so k = 3."},
 {t:"mistake",h:"Common mistake",html:`<p>Using the diameter instead of the radius. Halve the diameter first.</p>`},
 {t:"sum",h:"Summary",bullets:["Sector area = θ/360 × πr²","Arc length = θ/360 × 2πr","Cylinder volume = πr²h","Similar: length k, area k², volume k³","Use the radius, not the diameter"]}]},

/* ---------- Statistics and probability ---------- */
{id:"prob",topic:"S",title:"Probability and tree diagrams",mins:9,steps:[
 {t:"learn",h:"The rules",html:`<ul><li>P(not A) = 1 − P(A).</li><li><b>AND</b> (independent events): <b>multiply</b>.</li><li><b>OR</b> (can't both happen): <b>add</b>.</li><li>Expected frequency = probability × number of trials.</li></ul>`},
 {t:"diagram",h:"A tree diagram",svg:TREE,html:`<p>A bag has 3 red and 2 blue counters. One is taken, <b>replaced</b>, then another is taken. Multiply <b>along</b> the branches; add <b>between</b> outcomes.</p>`},
 {t:"example",h:"Worked example",html:`<p><b>Find the probability of getting one of each colour.</b></p><ol class="steps"><li>RB: 3/5 × 2/5 = 6/25.</li><li>BR: 2/5 × 3/5 = 6/25.</li><li>Add: <b>12/25</b>.</li></ol><p><b>Without replacement</b>, the second branches change: after a red, there are 2 red and 2 blue left, so 2/4 each.</p>`},
 {t:"num",h:"Your turn",q:"Using the tree diagram, what is P(both blue) as a decimal?",ans:.16,tol:.001,unit:"",ex:"2/5 × 2/5 = 4/25 = 0.16."},
 {t:"q",h:"Quick check",q:"P(rain) = 0.3. What is P(no rain)?",o:["0.3","0.6","0.7","1.3"],a:2,ex:"1 − 0.3 = 0.7."},
 {t:"mistake",h:"Common mistake",html:`<p>Adding along the branches instead of multiplying. Along = AND = multiply. Also check each pair of branches adds to 1.</p>`},
 {t:"sum",h:"Summary",bullets:["P(not A) = 1 − P(A)","AND: multiply; OR: add","Multiply along branches, add between outcomes","Without replacement: the second fractions change","Expected frequency = P × trials"]}]},

{id:"averages",topic:"S",title:"Averages from frequency tables",mins:8,steps:[
 {t:"learn",h:"Reading a frequency table",html:`<div class="tbl"><table><tr><th>Goals (x)</th><th>Frequency (f)</th><th>f × x</th></tr><tr><td>0</td><td>3</td><td>0</td></tr><tr><td>1</td><td>5</td><td>5</td></tr><tr><td>2</td><td>7</td><td>14</td></tr><tr><td>3</td><td>5</td><td>15</td></tr><tr><td><b>Total</b></td><td><b>20</b></td><td><b>34</b></td></tr></table></div>${F("mean = total of f × x ÷ total frequency")}`},
 {t:"example",h:"Worked example",html:`<ol class="steps"><li><b>Mean</b> = 34 ÷ 20 = <b>1.7 goals</b>.</li><li><b>Median</b>: 20 values, so it's between the 10th and 11th. Running totals 3, 8, 15: both are in the "2" row, so the median is <b>2</b>.</li><li><b>Mode</b>: the highest frequency is 7, so the mode is <b>2</b>.</li></ol>`},
 {t:"learn",h:"Grouped data",html:`<p>When data is in groups (like 10 &lt; t ≤ 20), you don't know the exact values. Use the <b>midpoint</b> of each group as x. The answer is an <b>estimate</b> of the mean.</p><p>The <b>modal class</b> is the group with the highest frequency.</p>`},
 {t:"num",h:"Your turn",q:"x = 1, 2, 3 have frequencies 4, 3, 3. What is the mean?",ans:1.9,tol:.001,unit:"",ex:"f × x: 4 + 6 + 9 = 19. 19 ÷ 10 = 1.9."},
 {t:"q",h:"Quick check",q:"Why is the mean from grouped data only an estimate?",o:["The frequencies might be wrong","We use midpoints, not the actual values","The median is more accurate","There are too many groups"],a:1,ex:"The real values in each group are unknown."},
 {t:"mistake",h:"Common mistake",html:`<p>Dividing by the number of <b>rows</b> instead of the total <b>frequency</b>. Here that's 20, not 4.</p>`},
 {t:"sum",h:"Summary",bullets:["Mean = Σfx ÷ Σf","Median: find the middle position with running totals","Mode = highest frequency","Grouped: use midpoints; it's an estimate","Modal class = group with the highest frequency"]}]},

{id:"histograms",topic:"S",title:"Histograms",mins:8,steps:[
 {t:"learn",h:"Unequal class widths",html:`<p>When classes are different widths, a histogram plots <b>frequency density</b>, not frequency. Then the <b>area</b> of each bar shows the frequency.</p>${F("frequency density = frequency ÷ class width")}`},
 {t:"diagram",h:"Reading a histogram",svg:HIST,html:`<p>Frequency = frequency density × class width. A wide, short bar can hold as many people as a tall, thin one.</p>`},
 {t:"example",h:"Worked example",html:`<p><b>The class 10 &lt; t ≤ 15 has a frequency of 20. Find its frequency density.</b></p><p>Width = 5, so fd = 20 ÷ 5 = <b>4</b>.</p><p><b>Estimate how many took between 12 and 15 minutes:</b> 3 out of 5 of that bar, so 3/5 × 20 = <b>12</b>.</p>`},
 {t:"num",h:"Your turn",q:"A bar for 20 < t ≤ 40 has a frequency density of 0.6. What is its frequency?",ans:12,tol:.01,unit:"",ex:"0.6 × 20 = 12."},
 {t:"q",h:"Quick check",q:"What does the area of a histogram bar represent?",o:["Frequency density","Frequency","Class width","The mean"],a:1,ex:"Area = fd × width = frequency."},
 {t:"mistake",h:"Common mistake",html:`<p>Plotting frequency on the y-axis. With unequal widths that makes wide classes look far too big.</p>`},
 {t:"sum",h:"Summary",bullets:["fd = frequency ÷ class width","Area of bar = frequency","Label the y-axis 'frequency density'","For part of a class, take that fraction of the bar","No gaps between bars"]}]},

{id:"boxplots",topic:"S",title:"Cumulative frequency and box plots",mins:9,steps:[
 {t:"learn",h:"Cumulative frequency",html:`<p>Cumulative frequency is a <b>running total</b>. Plot each one at the <b>upper end</b> of its class and join with a smooth curve.</p><p>For n values: median at n ÷ 2, lower quartile at n ÷ 4, upper quartile at 3n ÷ 4. Read across from the y-axis, then down.</p>`},
 {t:"diagram",h:"A box plot",svg:BOX,html:`<p>A box plot shows the five key values. The box covers the middle 50% of the data.</p>`},
 {t:"example",h:"Worked example: comparing",html:`<p><b>Class A: median 24, IQR 13. Class B: median 30, IQR 6. Compare their test scores.</b></p><ol class="steps"><li><b>Average</b>: Class B's median is higher, so on average B scored better.</li><li><b>Spread</b>: Class B's IQR is smaller, so its scores were more consistent.</li></ol><p>Always compare one average and one measure of spread, <b>in context</b>.</p>`},
 {t:"num",h:"Your turn",q:"LQ = 18 and UQ = 31. What is the interquartile range?",ans:13,tol:.01,unit:"",ex:"31 − 18 = 13."},
 {t:"q",h:"Quick check",q:"There are 80 values on a cumulative frequency graph. At what cumulative frequency do you read the upper quartile?",o:["20","40","60","75"],a:2,ex:"3 × 80 ÷ 4 = 60."},
 {t:"mistake",h:"Common mistake",html:`<p>Comparing without context, like "B's median is higher". Say what it means: "on average, Class B scored higher marks".</p>`},
 {t:"sum",h:"Summary",bullets:["Plot cumulative frequency at the upper class boundary","Median n/2, LQ n/4, UQ 3n/4","IQR = UQ − LQ","Box plot: min, LQ, median, UQ, max","Compare an average and a spread, in context"]}]}
];
})();
