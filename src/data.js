/* ================= DEMO DATA (deterministic) ================= */
const DEMO_TODAY = "2026-10-22";           // Thursday
const STORE_KEY = "ts_portal_v4";
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const AREAS=["Language","Mathematics","Science","Social & emotional","Creative arts","Physical"];
const AREA_E=["🗣️","🔢","🔬","❤️","🎨","🤸"];
const WINDOWS=[
  {id:"BL",name:"Baseline assessment",short:"Baseline",from:"2026-09-13",to:"2026-09-24",status:"published"},
  {id:"MT",name:"Term 1 mid-term review",short:"Mid-term",from:"2026-10-18",to:"2026-10-29",status:"entry"},
  {id:"T1",name:"Term 1 final assessment",short:"Term 1",from:"2026-12-06",to:"2026-12-14",status:"scheduled"},
];
const band=v=>v==null?null:v>=85?["X","Exceeding"]:v>=70?["S","Secure"]:v>=50?["D","Developing"]:["E","Emerging"];

function buildData(){
  const r=rng(20261022);
  const pick=a=>a[Math.floor(r()*a.length)];
  const CLASSES=[
    {id:"TW",name:"Twinklers",age:"3–12 months",cap:10,teacher:"T4",room:"Room 1",fee:160,ratio:3,color:"#ef7d6b",bg:"#ffe3dc",em:"🍼"},
    {id:"LS",name:"Little Stars",age:"1–2 years",cap:16,teacher:"T2",room:"Room 2",fee:150,ratio:8,color:"#f7a21e",bg:"#ffeccc",em:"🧸"},
    {id:"SF",name:"Sunflowers",age:"2–3 years",cap:20,teacher:"T1",room:"Room 3",fee:140,ratio:10,color:"#3fb37f",bg:"#d7f2e4",em:"🌻"},
    {id:"RB",name:"Rainbows",age:"3–4 years · Pre-KG",cap:22,teacher:"T3",room:"Room 4",fee:135,ratio:9,color:"#7c6bd6",bg:"#e7e1fb",em:"🌈"},
  ];
  const STAFF=[
    {id:"P1",name:"Dr. Huda Al-Said",role:"Principal",dept:"Leadership",salary:900,join:"2023-09-01",visa:null,firstAid:"2027-05-10",phone:"+968 9xxx 1101"},
    {id:"AD",name:"Ms. Rahma Al-Balushi",role:"School Administrator",dept:"Office",salary:450,join:"2024-01-14",visa:null,firstAid:"2027-02-01",phone:"+968 9xxx 1102"},
    {id:"AC",name:"Mr. Rajesh Menon",role:"Accountant",dept:"Accounts",salary:420,join:"2024-03-03",visa:"2027-03-02",firstAid:null,phone:"+968 9xxx 1103"},
    {id:"EX",name:"Ms. Lina Haddad",role:"Head of Assessment",dept:"Academics",salary:550,join:"2024-08-25",visa:"2027-08-24",firstAid:"2027-01-15",phone:"+968 9xxx 1104"},
    {id:"T1",name:"Ms. Priya Nair",role:"Lead Teacher · Sunflowers",dept:"Teaching",cls:"SF",salary:400,join:"2024-02-11",visa:"2027-03-15",firstAid:"2027-06-30",phone:"+968 9xxx 1105"},
    {id:"T2",name:"Ms. Amal Al-Hinai",role:"Lead Teacher · Little Stars",dept:"Teaching",cls:"LS",salary:420,join:"2023-09-01",visa:null,firstAid:"2026-11-30",phone:"+968 9xxx 1106"},
    {id:"T3",name:"Ms. Sara Al-Busaidi",role:"Lead Teacher · Rainbows",dept:"Teaching",cls:"RB",salary:420,join:"2023-09-01",visa:null,firstAid:"2027-04-20",phone:"+968 9xxx 1107"},
    {id:"T4",name:"Ms. Grace Thomas",role:"Lead Teacher · Twinklers",dept:"Teaching",cls:"TW",salary:400,join:"2024-09-01",visa:"2027-01-05",firstAid:"2027-09-01",phone:"+968 9xxx 1108"},
    {id:"A1",name:"Ms. Joy Santos",role:"Teaching Assistant",dept:"Teaching",cls:"TW",salary:230,join:"2024-09-01",visa:"2026-11-12",firstAid:"2027-03-01",phone:"+968 9xxx 1109"},
    {id:"A2",name:"Ms. Fatma Al-Rashdi",role:"Teaching Assistant",dept:"Teaching",cls:"LS",salary:240,join:"2024-02-01",visa:null,firstAid:"2027-02-11",phone:"+968 9xxx 1110"},
    {id:"A3",name:"Ms. Mary Joseph",role:"Teaching Assistant",dept:"Teaching",cls:"SF",salary:230,join:"2025-01-10",visa:"2027-07-19",firstAid:"2026-12-05",phone:"+968 9xxx 1111"},
    {id:"A4",name:"Ms. Noor Al-Shukaili",role:"Teaching Assistant",dept:"Teaching",cls:"RB",salary:240,join:"2024-09-01",visa:null,firstAid:"2027-08-08",phone:"+968 9xxx 1112"},
    {id:"A5",name:"Ms. Rose Fernandes",role:"Teaching Assistant",dept:"Teaching",cls:"TW",salary:230,join:"2025-09-01",visa:"2027-08-30",firstAid:"2027-08-30",phone:"+968 9xxx 1113"},
    {id:"N1",name:"Ms. Ancy George",role:"Nurse",dept:"Health",salary:350,join:"2024-01-07",visa:"2027-01-06",firstAid:"2027-10-01",phone:"+968 9xxx 1114"},
    {id:"S1",name:"Mr. Kamal Hossain",role:"Facilities & Security",dept:"Operations",salary:200,join:"2023-09-01",visa:"2026-12-20",firstAid:null,phone:"+968 9xxx 1115"},
    {id:"S2",name:"Ms. Lakshmi Devi",role:"Housekeeping",dept:"Operations",salary:180,join:"2024-04-01",visa:"2027-04-01",firstAid:null,phone:"+968 9xxx 1116"},
  ];
  const G=["Layla","Aisha","Mariam","Zara","Mia","Noor","Reem","Salma","Hiba","Sara","Fatima","Lina","Maya","Amira","Jana","Hessa","Ruqaya","Sophia","Ananya","Eliana","Lujain","Shahd","Ghala","Tala"];
  const B=["Omar","Yusuf","Hamad","Salim","Adam","Zayd","Ali","Ahmed","Faris","Rayan","Ibrahim","Khalid","Ethan","Aarav","Musab","Talal","Nasser","Hassan","Ilyas","Leo","Moaz","Azzan","Sultan","Rashid"];
  const L=["Al-Balushi","Al-Rawahi","Al-Farsi","Al-Kindi","Al-Hinai","Al-Busaidi","Al-Lawati","Al-Maskari","Al-Saadi","Al-Abri","Al-Riyami","Al-Habsi","Rahman","Siddiqui","Khan","Fernandes","Menon","Al-Shukaili","Al-Wahaibi","Haddad","Al-Zadjali","Al-Mahrouqi","Patel","Al-Amri"];
  const PF=["Fatma","Mariam","Sana","Hina","Joanna","Asma","Muna","Shamsa","Ruba","Deepa","Huda","Nawal","Aisha","Khadija"];
  const PM=["Khalid","Ahmed","Nasser","Said","Imran","Hamed","Mohammed","Salim","Saif","Rahul","Yaqoob","Hilal"];
  const counts={TW:8,LS:14,SF:18,RB:22};
  const ageMo={TW:[3,12],LS:[12,24],SF:[24,36],RB:[36,48]};
  const kids=[];let id=1;const usedNames=new Set(["Layla Al-Harthy","Hamad Al-Harthy"]);
  CLASSES.forEach(c=>{
    for(let i=0;i<counts[c.id];i++){
      let first,last,gender,nm;
      if(c.id==="SF"&&i===0){first="Layla";last="Al-Harthy";gender="F"}
      else if(c.id==="TW"&&i===0){first="Hamad";last="Al-Harthy";gender="M"}
      else{do{gender=r()<.5?"F":"M";first=pick(gender==="F"?G:B);last=pick(L);nm=first+" "+last}while(usedNames.has(nm));usedNames.add(nm)}
      const months=ageMo[c.id][0]+Math.floor(r()*(ageMo[c.id][1]-ageMo[c.id][0]));
      const dob=new Date(2026,9,22);dob.setMonth(dob.getMonth()-months);dob.setDate(1+Math.floor(r()*27));
      const isH=last==="Al-Harthy";
      const mom=isH?"Fatma Al-Harthy":pick(PF)+" "+last, dad=isH?"Said Al-Harthy":pick(PM)+" "+last;
      const ability=isH&&first==="Layla"?.78:.45+r()*.45;
      const joined=r()<.18?"2026-09-"+String(1+Math.floor(r()*25)).padStart(2,"0"):(2024+Math.floor(r()*2))+"-0"+(1+Math.floor(r()*8))+"-0"+(1+Math.floor(r()*8));
      kids.push({id:"K"+String(id++).padStart(3,"0"),first,last,name:first+" "+last,gender,cls:c.id,dob:dob.toISOString().slice(0,10),months,
        mother:mom,father:dad,phone:"+968 9"+Math.floor(1000000+r()*8999999),email:(mom.split(" ")[0]+"."+last.replace(/^Al-/,"")).toLowerCase()+"@email.com",
        allergy:isH&&first==="Layla"?"None":r()<.12?pick(["Peanuts","Dairy","Eggs","Gluten","Sesame"]):"None",
        blood:pick(["O+","A+","B+","AB+","O-","A-"]),joined:joined<"2026-09-01"?joined:joined,newJoiner:joined>="2026-09-01",
        attBase:isH?.965:.84+r()*.15,ability,discount:isH&&first==="Hamad"?10:0,
        pickup:[[mom,"Mother"],[dad,"Father"]].concat(r()<.4||isH?[[pick(PF)+" "+last,isH?"Aunt":"Grandmother"]]:[]),
        nationality:last.startsWith("Al-")?"Omani":pick(["Indian","Pakistani","Filipino","British","Jordanian","Egyptian"]),
        vacc:r()<.07?"expired":"valid",consent:r()<.94});
    }
  });
  // school days (Sun-Thu) from 30 Aug to today
  const days=[];const d=new Date("2026-08-30T00:00:00");const end=new Date(DEMO_TODAY+"T00:00:00");
  const HOL=[];
  while(d<=end){const wd=d.getDay();if(wd>=0&&wd<=4)days.push(d.toISOString().slice(0,10));d.setDate(d.getDate()+1)}
  const att={},checkin={};
  kids.forEach(k=>{
    let s="";for(let i=0;i<days.length;i++){
      const wdPenalty=new Date(days[i]).getDay()===0?.03:new Date(days[i]).getDay()===4?.02:0;
      const x=r();s+= x<k.attBase-wdPenalty ? (r()<.06?"L":"P") : "A";
    }
    // today: some not yet decided
    const last=s.slice(-1);
    att[k.id]=s;
    const h=7+Math.floor(r()*2),m=Math.floor(r()*60);checkin[k.id]=last==="A"?null:`${h}:${String(m).padStart(2,"0")}`;
  });
  const layla=kids.find(k=>k.name==="Layla Al-Harthy"),hamad=kids.find(k=>k.name==="Hamad Al-Harthy");
  const fx=(s,i,c)=>s.slice(0,i)+c+s.slice(i+1);let la=att[layla.id].replace(/A/g,"P");la=fx(fx(fx(la,6,"A"),19,"A"),27,"L");att[layla.id]=la.slice(0,-1)+"P";checkin[layla.id]="7:42";
  att[hamad.id]=att[hamad.id].slice(0,-1)+"P";checkin[hamad.id]="7:42";

  // assessments
  const marks={BL:{},MT:{}};const comments={};
  const entryRate={TW:1,LS:.45,SF:.72,RB:.86};
  kids.forEach((k,ki)=>{
    marks.BL[k.id]=AREAS.map((a,i)=>Math.round(Math.min(98,Math.max(28,k.ability*100+(r()-.5)*24+(i===4?6:0)))));
    const entered=k.id===layla.id||r()<entryRate[k.cls];
    marks.MT[k.id]=entered?marks.BL[k.id].map(v=>Math.min(99,v+Math.round(r()*11))):AREAS.map(()=>null);
    comments[k.id]=pick([
      `${k.first} is settling in beautifully and loves creative activities.`,
      `${k.first} shows growing confidence and enjoys circle time with friends.`,
      `${k.first} is curious and engaged; we're working on sharing and turn-taking.`,
      `${k.first} has made lovely progress with language and following routines.`,
      `${k.first} enjoys outdoor play and is developing strong motor skills.`]);
  });
  comments[layla.id]="Layla is a joyful, curious learner. She loves painting and stories, shares kindly with friends and is beginning to recognise letters in her name. Next step: counting objects to 10.";
  const moderation={TW:"submitted",LS:"entry",SF:"entry",RB:"entry"};

  // fees
  const months=[["2026-09","September"],["2026-10","October"],["2026-11","November"]];
  const invoices=[],payments=[];let inv=1001,rcp=1001;
  kids.forEach(k=>{
    const c=CLASSES.find(c=>c.id===k.cls);
    if(k.newJoiner){invoices.push({no:"INV-"+inv++,kid:k.id,month:"2026-09",item:"Registration fee",amount:50,issued:"2026-08-25",due:"2026-09-01",status:"paid"})}
    months.forEach(([m,mn],mi)=>{
      const amt=+(c.fee*(1-k.discount/100)).toFixed(3);
      let status,paidOn=null;
      const x=r();
      if(mi===0){status=x<.98?"paid":"overdue"}
      else if(mi===1){status=x<.88?"paid":"overdue"}
      else{status=x<.34?"paid":"due"}
      if(k.cls==="SF"&&k.first==="Layla"&&mi===2)status="due";
      if(k.last==="Al-Harthy"&&mi<2)status="paid";
      if(k.last==="Al-Harthy"&&mi===2)status="due";
      const items=mi===0&&r()<.3?[["Tuition – "+mn,amt],["Uniform set",18]]:[["Tuition – "+mn,amt]];
      const total=items.reduce((s,x)=>s+x[1],0);
      const iss=mi===0?"2026-08-20":mi===1?"2026-09-20":"2026-10-20",due=m+"-01";
      const o={no:"INV-"+inv++,kid:k.id,month:m,item:items.map(x=>x[0]).join(" + "),lines:items,amount:total,issued:iss,due,status};
      invoices.push(o);
      if(status==="paid"){
        const pd=new Date(due);pd.setDate(pd.getDate()-6+Math.floor(r()*14));if(pd>new Date(DEMO_TODAY))pd.setTime(new Date(DEMO_TODAY).getTime()-86400000*Math.floor(r()*3));
        const method=r()<.58?"Card":r()<.7?"Bank transfer":"Cash";
        payments.push({no:"RCP-"+rcp++,inv:o.no,kid:k.id,amount:total,method,card:method==="Card"?String(1000+Math.floor(r()*8999)):null,date:pd.toISOString().slice(0,10),by:method==="Card"?"Parent portal":"Accounts"});
      }
    });
  });
  invoices.forEach(i=>{if(i.item==="Registration fee"){const pd=i.issued;payments.push({no:"RCP-"+rcp++,inv:i.no,kid:i.kid,amount:50,method:"Bank transfer",card:null,date:"2026-08-28",by:"Accounts"})}});
  payments.sort((a,b)=>b.date.localeCompare(a.date));
  const history=[ // previous months (collected, invoiced, expenses) in OMR
    ["Jan",7420,7650,6980],["Feb",7510,7700,7020],["Mar",7380,7700,7110],["Apr",7290,7560,7050],["May",7600,7800,7140],["Jun",6900,7300,6870],["Jul",3900,4100,6420],["Aug",4600,4800,6610]];
  const expenses=[
    ["2026-10-01","Rent","Premises rent – October",1250,"Bank transfer"],
    ["2026-10-03","Utilities","Electricity & water – September",386,"Bank transfer"],
    ["2026-10-05","Supplies","Art & craft materials",142.5,"Card"],
    ["2026-10-06","Food","Snacks & fruit – week 1",128.4,"Cash"],
    ["2026-10-12","Food","Snacks & fruit – week 2",131.2,"Cash"],
    ["2026-10-13","Maintenance","AC servicing (4 units)",95,"Cash"],
    ["2026-10-15","Supplies","Diapers & wipes (bulk)",210,"Card"],
    ["2026-10-18","Marketing","Instagram promotion",60,"Card"],
    ["2026-10-19","Food","Snacks & fruit – week 3",126.8,"Cash"],
    ["2026-10-20","Licences","Software & internet",48,"Card"],
  ];
  const admissions=[
    {id:"AQ1",child:"Noor Al-Saadi",age:"2y 4m",prog:"Sunflowers",parent:"Muna Al-Saadi",phone:"+968 9xxx 2201",src:"Instagram",stage:"Enquiry",date:"2026-10-21",start:"Jan 2027"},
    {id:"AQ2",child:"Adam Rashid",age:"3y 1m",prog:"Rainbows",parent:"Deepa Rashid",phone:"+968 9xxx 2202",src:"Website",stage:"Tour booked",date:"2026-10-19",start:"Dec 2026",tour:"2026-10-25 9:30"},
    {id:"AQ3",child:"Reem Al-Lawati",age:"4y",prog:"Rainbows",parent:"Asma Al-Lawati",phone:"+968 9xxx 2203",src:"Referral",stage:"Applied",date:"2026-10-12",start:"Jan 2027"},
    {id:"AQ4",child:"Ilyas Khan",age:"1y 2m",prog:"Little Stars",parent:"Sana Khan",phone:"+968 9xxx 2204",src:"WhatsApp",stage:"Offer sent",date:"2026-10-08",start:"Nov 2026"},
    {id:"AQ5",child:"Tala Al-Amri",age:"8m",prog:"Twinklers",parent:"Shamsa Al-Amri",phone:"+968 9xxx 2205",src:"Walk-in",stage:"Enrolled",date:"2026-10-01",start:"Nov 2026"},
    {id:"AQ6",child:"Faris Al-Habsi",age:"2y 9m",prog:"Sunflowers",parent:"Ruba Al-Habsi",phone:"+968 9xxx 2206",src:"Website",stage:"Enquiry",date:"2026-10-20",start:"Jan 2027"},
    {id:"AQ7",child:"Sophia Menon",age:"3y 5m",prog:"Rainbows",parent:"Deepa Menon",phone:"+968 9xxx 2207",src:"Instagram",stage:"Tour booked",date:"2026-10-16",start:"Jan 2027",tour:"2026-10-27 10:30"},
    {id:"AQ8",child:"Azzan Al-Maskari",age:"1y 6m",prog:"Little Stars",parent:"Huda Al-Maskari",phone:"+968 9xxx 2208",src:"Referral",stage:"Applied",date:"2026-10-10",start:"Dec 2026"},
    {id:"AQ9",child:"Ghala Al-Riyami",age:"10m",prog:"Twinklers",parent:"Nawal Al-Riyami",phone:"+968 9xxx 2209",src:"Website",stage:"Enrolled",date:"2026-09-22",start:"Oct 2026"},
    {id:"AQ10",child:"Leo Patel",age:"2y 2m",prog:"Sunflowers",parent:"Deepa Patel",phone:"+968 9xxx 2210",src:"Walk-in",stage:"Enquiry",date:"2026-10-22",start:"Nov 2026"},
  ];
  const events=[
    {date:"2026-10-26",title:"Show & tell: My favourite toy",cls:"SF",type:"Class"},
    {date:"2026-10-29",title:"Early closure 12:00 – staff training",cls:"All",type:"Closure"},
    {date:"2026-11-02",title:"Parent–teacher meetings week",cls:"All",type:"Meeting"},
    {date:"2026-11-12",title:"Healthy snack day",cls:"All",type:"Event"},
    {date:"2026-11-18",title:"National Day celebration 🇴🇲",cls:"All",type:"Event"},
    {date:"2026-11-19",title:"National Day holiday (dates TBC)",cls:"All",type:"Holiday"},
    {date:"2026-12-10",title:"Winter concert",cls:"All",type:"Event"},
    {date:"2026-12-17",title:"Term 1 ends · reports published",cls:"All",type:"Academic"},
    {date:"2026-10-08",title:"Flu vaccination clinic",cls:"All",type:"Health"},
    {date:"2026-09-24",title:"Baseline reports published",cls:"All",type:"Academic"},
  ];
  const news=[
    {id:"N1",date:"2026-10-20",title:"National Day celebration – 18 November",body:"Children may wear traditional dress. Parents are welcome to join us at 10:00 for songs and a small exhibition.",to:"All",by:"Dr. Huda Al-Said",reads:51},
    {id:"N2",date:"2026-10-18",title:"Parent–teacher meetings",body:"Book a 15-minute slot with your child's teacher for the week of 2 November. Slots open in the portal on 26 October.",to:"All",by:"Ms. Rahma Al-Balushi",reads:47},
    {id:"N3",date:"2026-10-15",title:"Show & tell: 'My favourite toy'",body:"Sunflowers will have show & tell on Monday 26 October. Please send one labelled toy.",to:"SF",by:"Ms. Priya Nair",reads:16},
    {id:"N4",date:"2026-10-06",title:"Flu vaccination clinic",body:"The clinic runs on 8 October. Please upload updated vaccination cards after your child's dose.",to:"All",by:"Ms. Ancy George",reads:58},
  ];
  const messages=[
    {id:"M1",kid:layla.id,with:"T1",subject:"Layla's lunch",msgs:[
      {from:"parent",t:"2026-10-21 13:05",x:"Hi Ms. Priya, did Layla eat her lunch today? She was a bit fussy this morning."},
      {from:"staff",t:"2026-10-21 13:22",x:"Hi Fatma! She ate most of it and had seconds of fruit 🍉 She was very happy after her nap."},
      {from:"parent",t:"2026-10-21 13:25",x:"That's great, thank you so much!"}]},
    {id:"M2",kid:hamad.id,with:"T4",subject:"Hamad's bottle times",msgs:[
      {from:"parent",t:"2026-10-20 08:10",x:"Hamad has started having his bottle at 10:30 instead of 10:00 this week."},
      {from:"staff",t:"2026-10-20 08:40",x:"Noted, I've updated his routine card. Thank you!"}]},
    {id:"M3",kid:kids.find(k=>k.cls==="SF"&&k.id!==layla.id).id,with:"T1",subject:"Toilet training",msgs:[
      {from:"parent",t:"2026-10-22 07:58",x:"Good morning, we've started toilet training at home. Could you try at school too?"}]},
    {id:"M4",kid:kids.filter(k=>k.cls==="SF")[3].id,with:"T1",subject:"Pick-up today",msgs:[
      {from:"parent",t:"2026-10-22 09:15",x:"My sister Muna will pick up today at 12:30. She is on the approved list."},
      {from:"staff",t:"2026-10-22 09:20",x:"Thank you, noted ✅"}]},
  ];
  const leave=[
    {id:"LV1",kid:kids.filter(k=>k.cls==="SF")[1].id,from:"2026-10-23",to:"2026-10-23",reason:"Doctor's appointment",status:"pending",at:"2026-10-22 07:30"},
    {id:"LV2",kid:kids.filter(k=>k.cls==="RB")[2].id,from:"2026-10-26",to:"2026-10-28",reason:"Family travel",status:"pending",at:"2026-10-21 18:12"},
    {id:"LV3",kid:kids.filter(k=>k.cls==="LS")[4].id,from:"2026-10-20",to:"2026-10-21",reason:"Fever",status:"approved",at:"2026-10-20 06:50"},
  ];
  const incidents=[
    {id:"IN1",date:"2026-10-22 10:40",kid:kids.filter(k=>k.cls==="RB")[5].id,type:"Minor injury",detail:"Bumped knee on the playground. Cleaned and ice pack applied.",by:"Ms. Noor Al-Shukaili",ack:false},
    {id:"IN2",date:"2026-10-20 11:15",kid:kids.filter(k=>k.cls==="LS")[2].id,type:"Illness",detail:"Temperature 38.2°C. Parent called; child collected at 11:45.",by:"Ms. Ancy George",ack:true},
    {id:"IN3",date:"2026-10-16 09:30",kid:kids.filter(k=>k.cls==="SF")[6].id,type:"Medication",detail:"Prescribed antibiotic given at 9:30 as per parent's form.",by:"Ms. Ancy George",ack:true},
    {id:"IN4",date:"2026-10-09 12:05",kid:kids.filter(k=>k.cls==="TW")[3].id,type:"Allergy check",detail:"Mild rash after lunch; monitored, no further symptoms. Parent informed.",by:"Ms. Grace Thomas",ack:true},
  ];
  // daily reports today
  const daily={};
  kids.forEach(k=>{const a=att[k.id].slice(-1);if(a==="A"){daily[k.id]={entries:[],mood:-1,note:""};return}
    const e=[[checkin[k.id].padStart(5,"0"),"🚗","Checked in"]];
    if(r()<.9)e.push(["08:30","🥣","Breakfast – "+pick(["ate all","ate some","ate all"])]);
    if(r()<.8)e.push(["09:15","🎨",pick(["Painting & circle time","Blocks & puzzles","Story time","Music & movement","Sand & water play"])]);
    daily[k.id]={entries:e,mood:1+Math.floor(r()*3),note:""}});
  daily[layla.id]={entries:[["07:42","🚗","Checked in by Mum"],["08:30","🥣","Breakfast – oats & banana (ate all)"],["09:15","🎨","Painting & circle time"],["10:20","🛝","Outdoor play"],["11:45","🍛","Lunch – rice & chicken (ate all)"],["12:30","😴","Nap 12:30 – 13:50"]],mood:3,note:"Layla loved painting today and shared her crayons with friends. She ate all her lunch! 🌟"};
  daily[hamad.id]={entries:[["07:42","🚗","Checked in by Mum"],["08:45","🍼","Bottle – 180 ml"],["09:30","😴","Nap 9:30 – 10:40"],["10:50","🧷","Nappy – wet"],["11:15","🎵","Music & sensory play"]],mood:3,note:"Hamad giggled all through music time and is pulling himself up on the soft blocks!"};
  const photos=[["🎨",layla.id,"SF"],["🧸",null,"SF"],["🌻",null,"SF"],["🧩",layla.id,"SF"],["🎵",hamad.id,"TW"],["🛝",null,"SF"],["🍉",layla.id,"SF"],["📚",null,"RB"],["🫧",hamad.id,"TW"],["🧱",null,"LS"]];
  const inventory=[
    {item:"Diapers (size 3–4)",cat:"Care",qty:46,unit:"packs",min:20,cost:4.2},
    {item:"Baby wipes",cat:"Care",qty:18,unit:"packs",min:25,cost:1.1},
    {item:"Hand sanitiser 500ml",cat:"Hygiene",qty:12,unit:"bottles",min:10,cost:1.8},
    {item:"Washable paint set",cat:"Art",qty:6,unit:"sets",min:8,cost:6.5},
    {item:"A3 drawing paper",cat:"Art",qty:14,unit:"reams",min:6,cost:3.2},
    {item:"Play dough",cat:"Art",qty:30,unit:"tubs",min:15,cost:0.9},
    {item:"Fruit & snacks",cat:"Food",qty:3,unit:"days left",min:2,cost:25},
    {item:"Formula milk",cat:"Food",qty:9,unit:"tins",min:6,cost:5.4},
    {item:"First-aid refills",cat:"Health",qty:4,unit:"kits",min:3,cost:7},
    {item:"School T-shirts (S/M)",cat:"Uniform",qty:38,unit:"pcs",min:20,cost:3.5},
  ];
  const lessons=[
    {cls:"SF",week:"Week 9 · 18–22 Oct",theme:"Colours all around us",areas:["Creative arts","Language","Science"],acts:["Colour-mixing with paints","Colour hunt walk","Story: 'Mouse Paint'","Arabic colour song"],status:"Approved"},
    {cls:"SF",week:"Week 10 · 25–29 Oct",theme:"My favourite toy",areas:["Language","Social & emotional"],acts:["Show & tell","Sorting toys by size","Sharing circle","Build a toy shop"],status:"Submitted"},
    {cls:"RB",week:"Week 9 · 18–22 Oct",theme:"Numbers 1–10",areas:["Mathematics","Physical"],acts:["Number hopscotch","Counting beads","Number formation in sand","Song: '10 little stars'"],status:"Approved"},
    {cls:"LS",week:"Week 9 · 18–22 Oct",theme:"Animals on the farm",areas:["Language","Science"],acts:["Animal sounds","Touch & feel book","Farm sensory tray"],status:"Approved"},
    {cls:"TW",week:"Week 9 · 18–22 Oct",theme:"Textures & sounds",areas:["Physical","Science"],acts:["Tummy time with textures","Rattle play","Mirror play"],status:"Approved"},
  ];
  const homework=[
    {cls:"SF",date:"2026-10-22",title:"Find something red at home",detail:"Take a photo of 3 red things at home and share in the portal.",done:[layla.id]},
    {cls:"SF",date:"2026-10-19",title:"Practise our colour song",detail:"Sing the Arabic colour song with your child.",done:[]},
    {cls:"RB",date:"2026-10-21",title:"Count the spoons",detail:"Count spoons while setting the table together.",done:[]},
  ];
  const timetable={
    TW:[["7:30","Arrival & cuddles"],["8:30","Bottles & breakfast"],["9:30","Nap / quiet time"],["10:45","Sensory play"],["11:30","Music & rhymes"],["12:00","Lunch & home time"]],
    LS:[["7:30","Arrival & free play"],["8:30","Breakfast"],["9:00","Circle time"],["9:30","Messy play"],["10:30","Outdoor play"],["11:30","Lunch"],["12:15","Nap"],["13:30","Home time"]],
    SF:[["7:30","Arrival & free play"],["8:30","Breakfast"],["9:00","Circle time (EN/AR)"],["9:15","IPC learning activity"],["10:20","Outdoor play"],["11:00","Story & phonics"],["11:45","Lunch"],["12:30","Nap"],["13:50","Home time"]],
    RB:[["7:30","Arrival & free play"],["8:15","Breakfast"],["8:45","Circle & calendar"],["9:00","Phonics"],["9:40","Maths activity"],["10:20","Outdoor play"],["11:00","Arabic & Islamic studies"],["11:40","Creative arts"],["12:30","Lunch & home time"]],
  };
  const commsLog=[
    {t:"2026-10-22 07:42",ch:"WhatsApp",to:"Fatma Al-Harthy",x:"Layla & Hamad checked in at 7:42 ✅"},
    {t:"2026-10-21 09:00",ch:"SMS",to:"14 parents",x:"Reminder: November fees are due on 1 Nov. Pay online: portal link"},
    {t:"2026-10-20 16:00",ch:"WhatsApp",to:"All parents (62)",x:"National Day celebration – 18 November"},
    {t:"2026-10-20 11:20",ch:"Call",to:"Parent of "+kids.filter(k=>k.cls==="LS")[2].first,x:"Child unwell – collected 11:45"},
    {t:"2026-10-18 10:05",ch:"Email",to:"All parents (62)",x:"Parent–teacher meetings week 2 Nov"},
  ];
  const site={banner:"Now enrolling for January 2027: book your visit today!",showBanner:true,heroTitle:"Where little stars begin to shine.",phone:"+968 9958 8453"};
  return {v:3,CLASSES,STAFF,kids,days,att,checkin,marks,comments,moderation,invoices,payments,history,expenses,admissions,events,news,messages,leave,incidents,daily,photos,inventory,lessons,homework,timetable,commsLog,site,windows:WINDOWS.map(w=>({...w})),payrollRun:{"2026-09":true,"2026-10":false}};
}
