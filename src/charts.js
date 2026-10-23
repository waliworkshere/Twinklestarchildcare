/* ================= CHARTS (dependency-free SVG, sized to container) ================= */
let CH=[];
function chart(type,opts,h){const id="ch"+Math.random().toString(36).slice(2,8);CH.push({id,type,opts,h:h||220});return `<div class="chart" id="${id}" style="height:${h||220}px"></div>`}
function drawCharts(){CH.forEach(c=>{const el=document.getElementById(c.id);if(!el)return;const w=Math.max(200,el.clientWidth);el.innerHTML=DRAW[c.type](c.opts,w,c.h)})}
let _rz;addEventListener("resize",()=>{clearTimeout(_rz);_rz=setTimeout(drawCharts,150)});
const fmtK=v=>Math.abs(v)>=1000?(v/1000).toFixed(v>=10000?0:1)+"k":String(Math.round(v*10)/10);
function niceMax(v){if(v<=0)return 1;const p=Math.pow(10,Math.floor(Math.log10(v)));const n=v/p;return (n<=1?1:n<=2?2:n<=2.5?2.5:n<=5?5:10)*p}
function axes(w,h,pad,max,fmt,ticks){let s="";for(let i=0;i<=ticks;i++){const v=max*i/ticks,y=h-pad.b-(h-pad.t-pad.b)*i/ticks;
  s+=`<line x1="${pad.l}" x2="${w-pad.r}" y1="${y}" y2="${y}" stroke="#e8ebf2" ${i?'stroke-dasharray="3 4"':''}/><text x="${pad.l-8}" y="${y+4}" text-anchor="end">${fmt(v)}</text>`}return s}
const DRAW={
  line(o,w,h){
    const pad={t:14,r:12,b:26,l:38},labs=o.labels,n=labs.length;
    const max=o.max||niceMax(Math.max(...o.series.flatMap(s=>s.data.filter(v=>v!=null))));
    const min=o.min||0;const fmt=o.fmt||fmtK;
    const X=i=>pad.l+(w-pad.l-pad.r)*(n===1?.5:i/(n-1)),Y=v=>h-pad.b-(h-pad.t-pad.b)*(v-min)/(max-min);
    let s=`<svg width="${w}" height="${h}">`;
    for(let i=0;i<=4;i++){const v=min+(max-min)*i/4,y=Y(v);s+=`<line x1="${pad.l}" x2="${w-pad.r}" y1="${y}" y2="${y}" stroke="#e8ebf2" ${i?'stroke-dasharray="3 4"':''}/><text x="${pad.l-8}" y="${y+4}" text-anchor="end">${fmt(v)}</text>`}
    const step=Math.ceil(n/Math.max(2,Math.floor((w-pad.l)/58)));
    labs.forEach((l,i)=>{if(i%step===0||i===n-1)s+=`<text x="${X(i)}" y="${h-8}" text-anchor="middle">${l}</text>`});
    o.series.forEach((se,si)=>{
      const pts=se.data.map((v,i)=>v==null?null:[X(i),Y(v)]).filter(Boolean);
      const d=pts.map((p,i)=>(i?"L":"M")+p[0].toFixed(1)+","+p[1].toFixed(1)).join("");
      if(o.area&&si===0&&pts.length)s+=`<path d="${d}L${pts[pts.length-1][0]},${h-pad.b}L${pts[0][0]},${h-pad.b}Z" fill="${se.color}" opacity=".12"/>`;
      s+=`<path d="${d}" fill="none" stroke="${se.color}" stroke-width="${se.w||2.5}" stroke-linejoin="round" stroke-linecap="round" ${se.dash?'stroke-dasharray="5 5"':''}/>`;
      if(n<=24)se.data.forEach((v,i)=>{if(v!=null)s+=`<circle cx="${X(i)}" cy="${Y(v)}" r="${n>14?2.5:3.5}" fill="#fff" stroke="${se.color}" stroke-width="2" data-tip="${se.name}: ${fmt(v)}${o.unit||""} · ${labs[i]}"/>`});
      else se.data.forEach((v,i)=>{if(v!=null)s+=`<rect x="${X(i)-4}" y="${pad.t}" width="8" height="${h-pad.t-pad.b}" fill="transparent" data-tip="${labs[i]}: ${fmt(v)}${o.unit||""}"/>`});
    });
    if(o.target!=null){const y=Y(o.target);s+=`<line x1="${pad.l}" x2="${w-pad.r}" y1="${y}" y2="${y}" stroke="#d64545" stroke-dasharray="4 4"/><text x="${w-pad.r}" y="${y-5}" text-anchor="end" style="fill:#d64545">Target ${fmt(o.target)}${o.unit||""}</text>`}
    return s+"</svg>";
  },
  bar(o,w,h){
    const pad={t:16,r:10,b:28,l:40},labs=o.labels,n=labs.length,ns=o.series.length;
    const tot=i=>o.stacked?o.series.reduce((s,se)=>s+(se.data[i]||0),0):Math.max(...o.series.map(se=>se.data[i]||0));
    const max=o.max||niceMax(Math.max(...labs.map((_,i)=>tot(i))));const fmt=o.fmt||fmtK;
    const gw=(w-pad.l-pad.r)/n,bw=Math.min(o.stacked?40:26,(gw*.7)/(o.stacked?1:ns));
    const Y=v=>(h-pad.t-pad.b)*v/max;
    let s=`<svg width="${w}" height="${h}">`+axes(w,h,pad,max,fmt,4);
    labs.forEach((l,i)=>{const cx=pad.l+gw*i+gw/2;let acc=0;
      o.series.forEach((se,si)=>{const v=se.data[i]||0,bh=Y(v);
        const x=o.stacked?cx-bw/2:cx-(bw*ns)/2+bw*si+1,y=o.stacked?h-pad.b-Y(acc)-bh:h-pad.b-bh;
        s+=`<rect x="${x}" y="${y}" width="${Math.max(2,bw-(o.stacked?0:2))}" height="${Math.max(0,bh)}" rx="${o.stacked?0:4}" fill="${se.color}" data-tip="${se.name}: ${fmt(v)}${o.unit||""} · ${l}"/>`;acc+=v});
      if(o.showTop&&!o.stacked){}
      s+=`<text x="${cx}" y="${h-9}" text-anchor="middle">${l}</text>`});
    return s+"</svg>";
  },
  hbar(o,w,h){ // o.items:[{label,value,color}] max
    const pad={l:Math.min(150,w*.34),r:46},n=o.items.length,bh=Math.min(22,(h-10)/n*.62),gap=(h-10)/n;
    const max=o.max||Math.max(...o.items.map(i=>i.value));const fmt=o.fmt||(v=>Math.round(v));
    let s=`<svg width="${w}" height="${h}">`;
    o.items.forEach((it,i)=>{const y=5+gap*i+(gap-bh)/2,bw=(w-pad.l-pad.r)*it.value/max;
      s+=`<text x="${pad.l-8}" y="${y+bh/2+4}" text-anchor="end" style="fill:#38405a;font-weight:500">${it.label}</text><rect x="${pad.l}" y="${y}" width="${w-pad.l-pad.r}" height="${bh}" rx="${bh/2}" fill="#eef1f6"/><rect x="${pad.l}" y="${y}" width="${Math.max(bh,bw)}" height="${bh}" rx="${bh/2}" fill="${it.color||"#14213d"}" data-tip="${it.label}: ${fmt(it.value)}${o.unit||""}"/><text x="${w-pad.r+6}" y="${y+bh/2+4}" style="fill:#1b2236;font-weight:700">${fmt(it.value)}${o.unit||""}</text>`});
    return s+"</svg>";
  },
  donut(o,w,h){
    const tot=o.data.reduce((s,d)=>s+d.value,0)||1,R=Math.min(h/2-6,w/4.2),r=R*.62,cx=Math.min(w/2,R+10),cy=h/2;let a=-Math.PI/2;
    let s=`<svg width="${w}" height="${h}">`;
    o.data.forEach(d=>{const ang=d.value/tot*Math.PI*2;if(ang<=0)return;const a2=a+Math.min(ang,Math.PI*2-.0001),lg=ang>Math.PI?1:0;
      const p=(rr,t)=>[cx+rr*Math.cos(t),cy+rr*Math.sin(t)];const[x1,y1]=p(R,a),[x2,y2]=p(R,a2),[x3,y3]=p(r,a2),[x4,y4]=p(r,a);
      s+=`<path d="M${x1},${y1}A${R},${R} 0 ${lg} 1 ${x2},${y2}L${x3},${y3}A${r},${r} 0 ${lg} 0 ${x4},${y4}Z" fill="${d.color}" stroke="#fff" stroke-width="2" data-tip="${d.label}: ${o.fmt?o.fmt(d.value):d.value} (${Math.round(d.value/tot*100)}%)"/>`;a=a2});
    s+=`<text x="${cx}" y="${cy-2}" text-anchor="middle" style="font-size:${Math.max(14,R/3.4)}px;font-weight:800;fill:#14213d">${o.center||""}</text><text x="${cx}" y="${cy+16}" text-anchor="middle">${o.sub||""}</text>`;
    const lx=cx+R+22;if(lx<w-60)o.data.forEach((d,i)=>{const y=cy-(o.data.length*22)/2+i*22+12;s+=`<rect x="${lx}" y="${y-9}" width="11" height="11" rx="3" fill="${d.color}"/><text x="${lx+18}" y="${y}" style="fill:#38405a">${d.label}</text><text x="${w-4}" y="${y}" text-anchor="end" style="fill:#1b2236;font-weight:700">${o.fmt?o.fmt(d.value):d.value}</text>`});
    return s+"</svg>";
  },
  funnel(o,w,h){const n=o.data.length,gh=(h-8)/n,max=o.data[0].value||1;let s=`<svg width="${w}" height="${h}">`;
    o.data.forEach((d,i)=>{const bw=Math.max(60,(w-150)*d.value/max),x=(w-150-bw)/2,y=4+gh*i;
      s+=`<rect x="${x}" y="${y}" width="${bw}" height="${gh-6}" rx="8" fill="${d.color}" data-tip="${d.label}: ${d.value}"/><text x="${x+bw/2}" y="${y+gh/2+1}" text-anchor="middle" style="fill:#fff;font-weight:800;font-size:13px">${d.value}</text><text x="${w-140}" y="${y+gh/2+1}" style="fill:#38405a;font-weight:600">${d.label}${i?` · ${Math.round(d.value/o.data[i-1].value*100)}%`:""}</text>`});
    return s+"</svg>"},
};
function spark(data,color,w=80,h=26){const max=Math.max(...data),min=Math.min(...data),X=i=>i*(w/(data.length-1)),Y=v=>h-2-(h-4)*(v-min)/((max-min)||1);
  return `<svg class="spark" width="${w}" height="${h}"><path d="${data.map((v,i)=>(i?"L":"M")+X(i).toFixed(1)+","+Y(v).toFixed(1)).join("")}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"/></svg>`}
// tooltip
(function(){const t=document.createElement("div");t.className="tip hidden";document.addEventListener("DOMContentLoaded",()=>document.body.appendChild(t));
  const show=e=>{const el=e.target.closest&&e.target.closest("[data-tip]");if(!el){t.classList.add("hidden");return}t.textContent=el.getAttribute("data-tip");t.classList.remove("hidden");const p=e.touches?e.touches[0]:e;t.style.left=p.clientX+"px";t.style.top=p.clientY+"px"};
  document.addEventListener("mousemove",show);document.addEventListener("touchstart",show,{passive:true});document.addEventListener("scroll",()=>t.classList.add("hidden"),true)})();
