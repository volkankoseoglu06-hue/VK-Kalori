const qs=s=>document.querySelector(s),qsa=s=>document.querySelectorAll(s);
let water=0;
function renderFoods(list=foods){qs("#foodResults").innerHTML=list.map(f=>`<div>${f.name} - ${f.kcal} kcal</div>`).join("")}
renderFoods();
qs("#foodSearch").oninput=e=>renderFoods(foods.filter(f=>f.name.toLowerCase().includes(e.target.value.toLowerCase())));
qsa(".bottomNav button").forEach(b=>b.onclick=()=>{qsa(".page").forEach(p=>p.classList.remove("active"));qs("#"+b.dataset.page).classList.add("active");});
qs("#addWater").onclick=()=>{water+=0.25;qs("#summary").textContent=`Su: ${water.toFixed(2)} L`;};
qs("#duration").oninput=e=>{qs("#sportOut").textContent=`Süre: ${e.target.value} dk`;};qs("#duration").dispatchEvent(new Event("input"));
qs("#finishDay").onclick=()=>{let h=JSON.parse(localStorage.getItem("hist")||"[]");h.push(new Date().toLocaleDateString());localStorage.setItem("hist",JSON.stringify(h));qs("#historyList").innerHTML=h.join("<br>");};
qs("#addCustom").onclick=()=>{let n=prompt("Besin adı");let k=prompt("Kalori");if(n&&k){foods.push({name:n,kcal:+k});renderFoods();}};