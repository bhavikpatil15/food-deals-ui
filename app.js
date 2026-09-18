// banner tickets derived from the data
const SLIDES=[50,40,30].map(t=>{const ds=DISHES.filter(d=>off(d)>=t);
  return{t,rests:[...new Set(ds.map(d=>d.r))],n:ds.length};}).filter(s=>s.n);
let si=0,tier=SLIDES[0].t,cat="All",filt=null,timer;

function paintBanner(){
  const s=SLIDES[si], names=s.rests.map(r=>`<b>${r}</b>`).join(" • ");
  banner.innerHTML=`<span class="kicker">TODAY'S TICKET</span>
    <span id="bigNum">${s.t}<small>% off</small></span>
    <span id="bTag">${s.n} dishes worth grabbing</span>
    <p id="bSub">Across ${s.rests.length} kitchens near you</p>
    <div class="tear"><div class="marq">${names} • ${names} • </div></div>
    <span id="stamp">SAVE<br>NOW</span>`;
  dots.innerHTML=SLIDES.map((_,i)=>`<i class="${i===si?'on':''}"></i>`).join("");
}
paintBanner();
timer=setInterval(()=>{si=(si+1)%SLIDES.length;paintBanner();},4200);
banner.onclick=()=>{clearInterval(timer);tier=SLIDES[si].t;cat="All";filt=null;show("deals");render();};
function show(id){home.classList.toggle("hide",id!=="home");deals.classList.toggle("hide",id!=="deals");scrollTo(0,0);}

function render(){
  const pool=DISHES.filter(d=>off(d)>=tier);
  title.textContent=`${tier}% off and better`;
  const cats=["All",...new Set(pool.map(d=>d.cat))];
  if(!cats.includes(cat))cat="All";
  tabs.innerHTML=cats.map(c=>`<button class="${c===cat?'on':''}" onclick="cat='${c}';render()">${c}</button>`).join("");
  filters.innerHTML=[["u200","Under ₹200"],["mid","₹200–₹400"],["hi","Deepest cut first"]]
    .map(([k,l])=>`<button class="${filt===k?'on':''}" onclick="filt=filt==='${k}'?null:'${k}';render()">${l}</button>`).join("");

  let items=pool.filter(d=>cat==="All"||d.cat===cat);
  if(filt==="u200")items=items.filter(d=>d.p<200);
  if(filt==="mid")items=items.filter(d=>d.p>=200&&d.p<=400);
  if(filt==="hi")items=[...items].sort((a,b)=>off(b)-off(a));

  const byRest={};items.forEach(d=>(byRest[d.r]??=[]).push(d));
  const groups=Object.entries(byRest);

  list.innerHTML=groups.length?groups.map(([r,ds],i)=>`
    <section class="rest" style="animation-delay:${i*70}ms">
      <div class="rhead"><h3>${r}</h3><span class="rate">★ ${ds[0].rate}</span></div>
      <p class="meta">${ds[0].time} · ${ds[0].km} km · ${ds.length} discounted ${ds.length>1?"dishes":"dish"}</p>
      <div class="row">${ds.map(d=>`
        <article class="dish">
          <span class="pic">${d.ic}</span><h4>${d.n}</h4>
          <div class="price"><span class="new" data-to="${d.p}" data-from="${d.mrp}">₹${d.mrp}</span>
          <span class="old">₹${d.mrp}</span></div>
          <span class="save">You save ₹${d.mrp-d.p} · ${off(d)}%</span>
        </article>`).join("")}</div>
      <button class="menu">See the full menu</button>
    </section>`).join("")
    :`<div class="empty"><b>Nothing in this bracket</b>Try another category or clear the price filter.</div>`;
  countPrices();
}

// prices tick down from MRP to the deal price
function countPrices(){
  if(matchMedia("(prefers-reduced-motion:reduce)").matches)
    return list.querySelectorAll(".new").forEach(e=>e.textContent="₹"+e.dataset.to);
  list.querySelectorAll(".new").forEach((e,i)=>{
    const from=+e.dataset.from,to=+e.dataset.to,t0=performance.now()+i*70+250;
    (function step(now){
      const k=Math.min(1,Math.max(0,(now-t0)/520)), e3=1-Math.pow(1-k,3);
      e.textContent="₹"+Math.round(from+(to-from)*e3);
      if(k<1)requestAnimationFrame(step);
    })(performance.now());
  });
}
