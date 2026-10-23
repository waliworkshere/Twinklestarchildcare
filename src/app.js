/* ================= CORE ================= */
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const f3=v=>(+v).toLocaleString("en-US",{minimumFractionDigits:3,maximumFractionDigits:3});
const f0=v=>Math.round(v).toLocaleString("en-US");
const MON=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const WD=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const fd=s=>{if(!s)return"—";const d=new Date(s.slice(0,10)+"T00:00:00");return d.getDate()+" "+MON[d.getMonth()]+(s.slice(0,4)!=="2026"?" "+s.slice(0,4):"")};
const fdl=s=>{const d=new Date(s.slice(0,10)+"T00:00:00");return WD[d.getDay()]+" "+d.getDate()+" "+MON[d.getMonth()]};
const ini=n=>n.replace(/^(Dr\.|Mrs?\.|Ms\.)\s*/,"").split(/\s+/).map(w=>w[0]).filter(c=>c&&/[A-Z]/.test(c)).slice(0,2).join("");
const nowT=()=>{const d=new Date();return String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0")};
const pct=(a,b)=>b?Math.round(a/b*100):0;
const monthName=m=>["","January","February","March","April","May","June","July","August","September","October","November","December"][+m.slice(5,7)];

let S;
function load(){try{const x=JSON.parse(localStorage.getItem(STORE_KEY)||"null");if(x&&x.v===3){S=x;return}}catch(e){}S=buildData();S.ui={}}
function save(){try{localStorage.setItem(STORE_KEY,JSON.stringify(S))}catch(e){}}
function resetDemo(){try{localStorage.removeItem(STORE_KEY);localStorage.removeItem("ts_enquiries")}catch(e){}S=buildData();S.ui={};toast("Demo data reset")}
load();

const K=id=>S.kids.find(k=>k.id===id);
const C=id=>S.CLASSES.find(c=>c.id===id);
const ST=id=>S.STAFF.find(s=>s.id===id);
const classKids=cid=>S.kids.filter(k=>k.cls===cid);
const TODAY_I=()=>S.days.length-1;
const todayAtt=k=>S.att[k.id][TODAY_I()];
function attRate(k,from=0,to){const s=S.att[k.id].slice(from,to);const p=[...s].filter(c=>c!=="A").length;return s.length?p/s.length:0}
function dayRate(i,list){list=list||S.kids;return list.filter(k=>S.att[k.id][i]!=="A").length/list.length}
function kidMarks(k,w){return S.marks[w][k.id]||AREAS.map(()=>null)}
const avg=a=>{a=a.filter(v=>v!=null);return a.length?a.reduce((s,v)=>s+v,0)/a.length:null};
function bandChip(v){const b=band(v);return b?`<span class="band ${b[0]}">${b[1]}</span>`:'<span class="st mute">Not entered</span>'}
function kidInvoices(k){return S.invoices.filter(i=>i.kid===k.id)}
function invStatus(i){return i.status==="paid"?'<span class="st ok">Paid</span>':i.status==="overdue"?'<span class="st bad">Overdue</span>':'<span class="st w">Due '+fd(i.due)+'</span>'}

/* ---------- UI helpers ---------- */
function toast(m){const d=document.createElement("div");d.className="toast";d.textContent=m;document.body.appendChild(d);setTimeout(()=>d.remove(),2800)}
function modal(html,cls=""){$("#modal").innerHTML=`<div class="modal-bg" onclick="if(event.target===this)closeModal()"><div class="modal ${cls}">${html}</div></div>`}
function closeModal(){$("#modal").innerHTML=""}
function mh(title,sub){return `<div class="mh noprint"><div><h3>${title}</h3>${sub?`<div class="hint" style="font-size:13px;color:var(--muted)">${sub}</div>`:""}</div><button class="x" onclick="closeModal()">×</button></div>`}
function drawer(html){$("#modal").innerHTML=`<div class="drawer-bg" onclick="if(event.target===this)closeModal()"><div class="drawer">${html}</div></div>`;drawCharts()}
function csv(name,rows){const s=rows.map(r=>r.map(c=>{c=String(c==null?"":c);return /[",\n]/.test(c)?'"'+c.replace(/"/g,'""')+'"':c}).join(",")).join("\n");
  const a=document.createElement("a");a.href=URL.createObjectURL(new Blob(["﻿"+s],{type:"text/csv"}));a.download=name;document.body.appendChild(a);a.click();a.remove();toast("Downloaded "+name)}
const docHead=(title,right)=>`<div class="dh"><svg><use href="#star"/></svg><div><b>Twinkle Star</b><small>International Child Care · Al Hail North 2, Seeb, Muscat · +968 9958 8453</small></div><div class="rt"><b style="font-size:16px">${title}</b><small>${right||""}</small></div></div>`;
function printDoc(){window.print()}

/* ---------- USERS & NAV ---------- */
const USERS={
  principal:{name:"Dr. Huda Al-Said",title:"Principal",emoji:"🎓",bg:"#14213d1f",desc:"Sees everything + analytics"},
  admin:{name:"Ms. Rahma Al-Balushi",title:"School Administrator",emoji:"🗂️",bg:"#13b5d622",desc:"Admissions, attendance, staff"},
  accounts:{name:"Mr. Rajesh Menon",title:"Accountant",emoji:"🧾",bg:"#1f9d6822",desc:"Fees, payments, payroll"},
  exams:{name:"Ms. Lina Haddad",title:"Head of Assessment",emoji:"📊",bg:"#7c6bd622",desc:"Assessments & report cards"},
  teacher:{name:"Ms. Priya Nair",title:"Lead Teacher · Sunflowers",emoji:"👩‍🏫",bg:"#f7a21e26",desc:"Class, reports, marks",cls:"SF",staff:"T1"},
  parent:{name:"Fatma Al-Harthy",title:"Parent of Layla & Hamad",emoji:"👨‍👩‍👧",bg:"#f7c51e33",desc:"Attendance, marks, fees"},
};
const NAVS={
  principal:[["Overview",[["overview","🏠","Dashboard"],["analytics","📈","Analytics"]]],
    ["Students",[["attendance","✅","Attendance"],["children","🧒","Students"],["admissions","📝","Admissions"],["incidents","🩹","Health & incidents"]]],
    ["Academics",[["assess","🎓","Assessments"],["gradebook","📊","Gradebook"],["reportcards","📄","Report cards"],["lessons","📚","Lesson plans"],["timetable","🕘","Timetables"]]],
    ["Finance",[["finance","💰","Finance"],["invoices","🧾","Fees & invoices"],["payments","💳","Payments"],["expenses","📉","Expenses & payroll"],["inventory","📦","Inventory"]]],
    ["Administration",[["staff","👥","Staff & HR"],["events","📅","Calendar & notices"],["comms","📨","Notifications log"],["idcards","🪪","ID cards"],["cms","🌐","Website"]]]],
  admin:[["Today",[["adminHome","🏠","Today"],["kiosk","📲","QR check-in"],["attendance","✅","Attendance"],["leave","🗓️","Absence requests"]]],
    ["Students",[["children","🧒","Students"],["admissions","📝","Admissions"],["incidents","🩹","Health & incidents"],["idcards","🪪","ID cards"]]],
    ["Operations",[["staff","👥","Staff & HR"],["timetable","🕘","Timetables"],["events","📅","Calendar & notices"],["messages","💬","Messages"],["comms","📨","Notifications log"],["inventory","📦","Inventory"],["cms","🌐","Website"]]]],
  accounts:[["Finance",[["finance","💰","Overview"],["invoices","🧾","Fees & invoices"],["payments","💳","Payments"],["expenses","📉","Expenses & payroll"],["inventory","📦","Inventory"]]],
    ["Families",[["children","🧒","Students"]]]],
  exams:[["Assessment",[["assess","🎓","Overview"],["gradebook","📊","Gradebook"],["reportcards","📄","Report cards"]]],
    ["Curriculum",[["lessons","📚","Lesson plans"],["timetable","🕘","Timetables"],["events","📅","Calendar"]]]],
  teacher:[["My class",[["teacherHome","🏠","My class"],["attendance","✅","Register"],["daily","📝","Daily reports"],["marks","✏️","Assessment entry"]]],
    ["Teaching",[["lessons","📚","Lesson plans"],["homework","🏡","Home learning"],["photos","📷","Photos"],["timetable","🕘","Timetable"]]],
    ["Communication",[["messages","💬","Messages"],["leave","🗓️","Absence requests"],["incidents","🩹","Incidents"],["events","📅","Calendar & notices"]]]],
  parent:[["",[["parentHome","🏠","Home"],["pAttendance","✅","Attendance"],["progress","📊","Progress"],["daily","📝","Daily report"],["fees","💳","Fees"],["photos","📷","Photos"],["homework","🏡","Home learning"],["messages","💬","Messages"],["pickup","🚸","Pick-up"],["timetable","🕘","Timetable"],["events","📅","Events & news"]]]],
};
const BNAV={principal:["overview","analytics","attendance","finance"],admin:["adminHome","attendance","admissions","children"],accounts:["finance","invoices","payments","expenses"],exams:["assess","gradebook","reportcards","lessons"],teacher:["teacherHome","attendance","daily","marks"],parent:["parentHome","pAttendance","progress","fees"]};

/* ---------- i18n for parent ---------- */
let lang="en";
const AR={"Home":"الرئيسية","Attendance":"الحضور","Progress":"التقدم","Daily report":"التقرير اليومي","Fees":"الرسوم","Photos":"الصور","Home learning":"التعلم المنزلي","Messages":"الرسائل","Pick-up":"الاستلام","Timetable":"الجدول","Events & news":"الفعاليات والأخبار","More":"المزيد",
  "Today":"اليوم","Checked in":"حضر","Absent today":"غائب اليوم","Not checked in yet":"لم يحضر بعد","Attendance this term":"الحضور هذا الفصل","Fees due":"رسوم مستحقة","Latest progress":"آخر تقييم","Next event":"الفعالية القادمة",
  "Pay now by card":"ادفع الآن بالبطاقة","Payment history":"سجل المدفوعات","Sign out":"خروج","Report an absence":"الإبلاغ عن غياب","Mood today":"المزاج اليوم","Note from the teacher":"ملاحظة من المعلمة","All paid — thank you!":"تم الدفع بالكامل — شكراً لكم!",
  "Approved pick-up people":"الأشخاص المصرح لهم بالاستلام","Pick-up pass":"تصريح الاستلام","Learning areas":"مجالات التعلم","Teacher's comment":"تعليق المعلمة","Report card":"بطاقة التقرير","Announcements":"الإعلانات","Upcoming":"القادمة"};
const T=s=>lang==="ar"&&AR[s]?AR[s]:s;

/* ---------- LOGIN ---------- */
let me=null,view=null,param=null;
function renderLogin(){
  $("#demos").innerHTML=Object.entries(USERS).map(([u,x])=>`<button class="demo" onclick="login('${u}','demo123')"><span class="e" style="background:${x.bg}">${x.emoji}</span><span><b>${x.title.split(" · ")[0]}</b><small>${x.desc}</small></span></button>`).join("");
  $("#stars").innerHTML=Array.from({length:26},(_,i)=>`<span style="left:${(i*37)%100}%;top:${(i*53)%100}%;font-size:${6+(i*7)%14}px">✦</span>`).join("");
}
function login(u,p){
  if(!USERS[u]||p!=="demo123"){$("#lerr").textContent="Incorrect username or password. Tap a demo account below.";return}
  $("#lerr").textContent="";$("#lu").value="";$("#lp").value="";
  me={role:u,...USERS[u]};lang="en";document.documentElement.dir="ltr";
  if(u==="parent"&&!S.ui.kid)S.ui.kid=S.kids.find(k=>k.name==="Layla Al-Harthy").id;
  $("#login").classList.add("hidden");$("#app").classList.remove("hidden");
  $("#rbAv").textContent=$("#tAv").textContent=ini(me.name);$("#rbName").textContent=me.name;$("#rbRole").textContent=me.title;$("#tName").textContent=me.name.split(" ").slice(0,2).join(" ");
  $("#langBtn").classList.toggle("hidden",u!=="parent");
  try{location.hash=u}catch(e){}
  go(NAVS[u][0][1][0][0]);
}
function logout(){me=null;lang="en";document.documentElement.dir="ltr";closeModal();$("#app").classList.add("hidden");$("#login").classList.remove("hidden");window.scrollTo(0,0);try{history.replaceState(null,"",location.pathname)}catch(e){}}
function toggleLang(){lang=lang==="en"?"ar":"en";document.documentElement.dir=lang==="ar"?"rtl":"ltr";$("#langBtn").textContent=lang==="ar"?"English":"العربية";go(view,param)}

/* ---------- ROUTER ---------- */
function allowed(v){return NAVS[me.role].some(g=>g[1].some(i=>i[0]===v))}
function navLabel(v){for(const g of NAVS[me.role])for(const i of g[1])if(i[0]===v)return [i[1],T(i[2])];return["",""]}
function counts(){const c={};
  if(["admin","teacher"].includes(me.role))c.leave=S.leave.filter(l=>l.status==="pending"&&(me.role!=="teacher"||K(l.kid).cls===me.cls)).length;
  if(me.role==="admin")c.admissions=S.admissions.filter(a=>a.stage==="Enquiry").length;
  if(me.role==="principal")c.admissions=S.admissions.filter(a=>a.stage==="Enquiry").length;
  if(me.role==="exams"||me.role==="principal")c.assess=Object.values(S.moderation).filter(x=>x==="submitted").length;
  if(me.role==="parent")c.fees=S.invoices.filter(i=>parentKids().some(k=>k.id===i.kid)&&i.status!=="paid").length;
  if(me.role==="teacher"||me.role==="parent")c.messages=unread();
  if(me.role==="accounts")c.invoices=S.invoices.filter(i=>i.status==="overdue").length;
  ["admin","principal","accounts"].forEach(r=>{if(me.role===r)c.inventory=S.inventory.filter(i=>i.qty<i.min).length});
  return c}
function go(v,p){
  if(!allowed(v))v=NAVS[me.role][0][1][0][0];
  view=v;param=p;CH=[];
  const cn=counts();
  $("#snav").innerHTML=NAVS[me.role].map(([g,items])=>`${g?`<div style="font-size:10.5px;letter-spacing:.8px;text-transform:uppercase;opacity:.55;margin:12px 12px 6px">${g}</div>`:""}`+items.map(([k,i,l])=>`<button class="${k===v?"on":""}" onclick="go('${k}');closeSide()"><span class="i">${i}</span>${T(l)}${cn[k]?`<span class="cnt">${cn[k]}</span>`:""}</button>`).join("")).join("");
  const bn=BNAV[me.role];
  $("#bnav").innerHTML=bn.map(k=>{const[i,l]=navLabel(k);return `<button class="${k===v?"on":""}" onclick="go('${k}')"><span class="ic">${i}</span><span>${l}</span></button>`}).join("")+`<button class="${bn.includes(v)?"":"on"}" onclick="openSide()"><span class="ic">☰</span><span>${T("More")}</span></button>`;
  const[ic,lab]=navLabel(v);$("#ptitle").textContent=lab;$("#crumb").textContent=me.title;
  $("#bell .dot").classList.toggle("hidden",!notifs().length);
  let html;try{html=(V[v]||(()=>"<div class='card'>Coming soon</div>"))(p)}catch(e){console.error(e);html=`<div class="card">Something went wrong: ${esc(e.message)}</div>`}
  $("#main").innerHTML=html;
  requestAnimationFrame(drawCharts);
  window.scrollTo(0,0);save();
}
function openSide(){$(".side").classList.add("open");$(".scrim").classList.add("open")}
function closeSide(){$(".side").classList.remove("open");$(".scrim").classList.remove("open")}

/* ---------- NOTIFICATIONS ---------- */
function notifs(){const r=me.role,n=[];
  const unpaid=S.invoices.filter(i=>i.status==="overdue");
  if(["principal","accounts"].includes(r)&&unpaid.length)n.push(["💸",`${unpaid.length} overdue invoices`,"Total "+f3(unpaid.reduce((s,i)=>s+i.amount,0))+" OMR","invoices"]);
  if(["principal","admin"].includes(r)){const e=S.admissions.filter(a=>a.stage==="Enquiry");if(e.length)n.push(["📝",`${e.length} new admission enquiries`,"Latest: "+e[0].child,"admissions"]);
    const ex=S.STAFF.filter(s=>s.visa&&s.visa<"2026-12-31");if(ex.length)n.push(["🛂",`${ex.length} staff visas expire before 31 Dec`,ex.map(s=>s.name.split(" ").slice(0,2).join(" ")).join(", "),"staff"]);
    const inc=S.incidents.filter(i=>!i.ack);if(inc.length)n.push(["🩹",`${inc.length} incident awaiting parent acknowledgement`,K(inc[0].kid).name,"incidents"])}
  if(["principal","exams"].includes(r)){const sub=Object.entries(S.moderation).filter(x=>x[1]==="submitted");if(sub.length)n.push(["✅",`${sub.length} class submitted for moderation`,sub.map(x=>C(x[0]).name).join(", "),"assess"])}
  if(["principal","admin","accounts"].includes(r)){const low=S.inventory.filter(i=>i.qty<i.min);if(low.length)n.push(["📦",`${low.length} items below minimum stock`,low.map(i=>i.item).join(", "),"inventory"])}
  if(r==="teacher"){const l=S.leave.filter(l=>l.status==="pending"&&K(l.kid).cls===me.cls);if(l.length)n.push(["🗓️",`${l.length} absence request${l.length>1?"s":""} to review`,K(l[0].kid).name,"leave"]);
    const u=unread();if(u)n.push(["💬",`${u} unread parent message${u>1?"s":""}`,"","messages"]);n.push(["✏️","Mid-term marks due 29 Oct",`${entryPct(me.cls)}% of Sunflowers entered`,"marks"])}
  if(r==="parent"){parentKids().forEach(k=>{const due=kidInvoices(k).filter(i=>i.status!=="paid");if(due.length)n.push(["💳",`${k.first}'s ${monthName(due[0].month)} fee is due`,f3(due.reduce((s,i)=>s+i.amount,0))+" OMR · pay online","fees"])});
    n.push(["📅","Show & tell on Monday 26 Oct","Send one labelled toy","events"]);if(S.windows[1].status==="published")n.push(["📊","Mid-term progress report published","View Layla's report","progress"])}
  return n}
function toggleNotif(e){e.stopPropagation();const box=$("#notifBox");if(!box.classList.contains("hidden")){box.classList.add("hidden");return}
  const n=notifs();box.innerHTML=`<div style="font-weight:700;padding:6px 10px 8px">Notifications</div>`+(n.length?n.map(x=>`<button class="ni" style="width:100%;text-align:start" onclick="go('${x[3]}');$('#notifBox').classList.add('hidden')"><span style="font-size:18px">${x[0]}</span><span>${x[1]}<small>${esc(x[2])}</small></span></button>`).join(""):`<div class="list-empty">You're all caught up ✨</div>`);box.classList.remove("hidden")}
document.addEventListener("click",()=>{const b=$("#notifBox");if(b)b.classList.add("hidden")});

/* ---------- shared helpers for views ---------- */
function parentKids(){return S.kids.filter(k=>k.last==="Al-Harthy")}
function curKid(){return K(S.ui.kid)||parentKids()[0]}
function unread(){if(!me)return 0;if(me.role==="teacher")return S.messages.filter(m=>m.with===me.staff&&m.msgs[m.msgs.length-1].from==="parent").length;
  if(me.role==="parent")return S.messages.filter(m=>parentKids().some(k=>k.id===m.kid)&&m.msgs[m.msgs.length-1].from==="staff"&&!m.read).length;return 0}
function entryPct(cid){const ks=classKids(cid);let n=0,t=0;ks.forEach(k=>kidMarks(k,"MT").forEach(v=>{t++;if(v!=null)n++}));return pct(n,t)}
function kidAv(k,cls="sm"){return `<span class="av ${cls}" style="background:${C(k.cls).bg};color:#14213d">${ini(k.name)}</span>`}
function kidCell(k,sub){return `<span class="mini">${kidAv(k)}<span><b style="font-weight:600">${esc(k.name)}</b>${sub!==undefined?`<small>${sub}</small>`:""}</span></span>`}
function age(k){const m=k.months;return m<12?m+" months":Math.floor(m/12)+"y "+(m%12)+"m"}
function clsFilter(id,val,all=true){return `<select id="${id}" onchange="go(view,Object.assign({},param||{},{cls:this.value}))">${all?`<option value="">All classes</option>`:""}${S.CLASSES.map(c=>`<option value="${c.id}" ${val===c.id?"selected":""}>${c.name}</option>`).join("")}</select>`}
function qrSvg(seed){const r=rng(seed.split("").reduce((a,c)=>a*31+c.charCodeAt(0)|0,7));let cells="";
  for(let y=0;y<25;y++)for(let x=0;x<25;x++){const fin=(x<7&&y<7)||(x>17&&y<7)||(x<7&&y>17);let on;
    if(fin){const lx=x>17?x-18:x,ly=y>17?y-18:y;on=lx===0||lx===6||ly===0||ly===6||(lx>=2&&lx<=4&&ly>=2&&ly<=4)}else on=r()<.48;
    cells+=`<i style="background:${on?"#14213d":"#fff"}"></i>`}return `<div class="qr">${cells}</div>`}
