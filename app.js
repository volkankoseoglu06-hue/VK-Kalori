const $ = (id) => document.getElementById(id);

const storage = JSON.parse(localStorage.getItem("vkLife"));

const state = storage || {
  calories: 0,
  protein: 0,
  water: 0,
  sport: 0,
  goals: { calories: 2500, protein: 165, water: 3 },
  dailyFoods: [],
  dailySports: [],
  customFoods: [],
  history: []
};

state.dailyFoods ||= [];
state.dailySports ||= [];
state.customFoods ||= [];
state.history ||= [];
state.goals ||= { calories: 2500, protein: 165, water: 3 };

function saveState(){ localStorage.setItem("vkLife", JSON.stringify(state)); }
function refresh(){ updateDashboard(); renderDailyFoods(); renderDailySports(); renderHistory(); }
function updateDashboard(){
  $("currentCalories").textContent = Math.round(state.calories);
  $("targetCalories").textContent = state.goals.calories;
  $("currentProtein").textContent = Math.round(state.protein);
  $("targetProtein").textContent = state.goals.protein;
  $("currentWater").textContent = state.water.toFixed(1);
  $("targetWater").textContent = state.goals.water;
  $("currentSport").textContent = Math.round(state.sport);
  const today = new Date().toLocaleDateString("tr-TR", {weekday:"long", day:"numeric", month:"long", year:"numeric"});
  const todayEl = $("today"); if(todayEl) todayEl.textContent = today;
}
function renderDailyFoods(){
  const c=$("dailyFoods"); if(!c) return; c.innerHTML="";
  if(!state.dailyFoods.length){ c.innerHTML="<p>Henüz besin eklenmedi.</p>"; return; }
  state.dailyFoods.forEach((f,i)=>{
    const el=document.createElement("div"); el.className="food-item";
    el.innerHTML=`<strong>${f.name}</strong><br>🔥 ${Math.round(f.kcal)} kcal<br>🥩 ${Math.round(f.protein)} g<div class="food-actions"><button class="small-btn" onclick="removeFood(${i})">❌ Sil</button></div>`;
    c.appendChild(el);
  });
}
window.removeFood=function(i){ const f=state.dailyFoods[i]; if(!f) return; state.calories=Math.max(0,state.calories-f.kcal); state.protein=Math.max(0,state.protein-f.protein); state.dailyFoods.splice(i,1); saveState(); refresh(); };
function renderDailySports(){
  const c=$("dailySports"); if(!c) return; c.innerHTML="";
  if(!state.dailySports.length) return;
  state.dailySports.forEach((s,i)=>{ const el=document.createElement("div"); el.className="food-item"; el.innerHTML=`💪 ${Math.round(s.calories)} kcal<div class="food-actions"><button class="small-btn" onclick="removeSport(${i})">❌ Sil</button></div>`; c.appendChild(el); });
}
window.removeSport=function(i){ const s=state.dailySports[i]; if(!s) return; state.sport=Math.max(0,state.sport-s.calories); state.dailySports.splice(i,1); saveState(); refresh(); };
function allFoods(){ return [...foods, ...state.customFoods]; }
function renderFoodResults(keyword=""){
  const c=$("foodResults"); if(!c) return; c.innerHTML="";
  if(keyword.trim().length<2) return;
  const q=keyword.toLowerCase().trim();
  allFoods().filter(f=>f.name.toLowerCase().includes(q)).forEach((f,idx)=>{
    const el=document.createElement("div"); el.className="food-item";
    el.innerHTML=`<strong>${f.name}</strong><br>🔥 ${f.kcal} kcal<br>🥩 ${f.protein} g<br>📏 ${f.unit || "adet"}<div class="food-actions"><button class="small-btn" data-food-index="${idx}">➕ Ekle</button></div>`;
    el.querySelector("button").onclick=()=>addFood(f.name, f.kcal, f.protein);
    c.appendChild(el);
  });
  if(!c.children.length) c.innerHTML='<div class="food-item">Besin bulunamadı. Aşağıdan kendi besinini ekleyebilirsin.</div>';
}
function addFood(name,kcal,protein){ state.calories+=Number(kcal)||0; state.protein+=Number(protein)||0; state.dailyFoods.push({name,kcal:Number(kcal)||0,protein:Number(protein)||0}); saveState(); refresh(); }
if($("foodSearch")) $("foodSearch").addEventListener("input",e=>renderFoodResults(e.target.value));
if($("saveFoodButton")) $("saveFoodButton").addEventListener("click",()=>{
  const name=$("newFoodName").value.trim(), kcal=Number($("newFoodCalories").value), protein=Number($("newFoodProtein").value), unit=$("newFoodUnit").value;
  if(!name || !Number.isFinite(kcal) || !Number.isFinite(protein)){ alert("Besin adı, kalori ve protein gir."); return; }
  state.customFoods.push({name,kcal,protein,unit}); saveState(); $("newFoodName").value=""; $("newFoodCalories").value=""; $("newFoodProtein").value=""; alert("Besin kaydedildi.");
});
if($("waterButton")) $("waterButton").addEventListener("click",()=>{ state.water=Number((state.water+0.25).toFixed(2)); saveState(); refresh(); });
if($("saveProfileButton")) $("saveProfileButton").addEventListener("click",()=>{
  const cal=Number($("profileCalories").value), pro=Number($("profileProtein").value), water=Number($("profileWater").value);
  if(Number.isFinite(cal)&&cal>0) state.goals.calories=cal;
  if(Number.isFinite(pro)&&pro>0) state.goals.protein=pro;
  if(Number.isFinite(water)&&water>0) state.goals.water=water;
  saveState(); refresh(); alert("Hedefler kaydedildi.");
});
let lastCalculatedSport=0;
function calculateSport(){
  const duration=Number($("sportDuration").value), speed=Number($("sportSpeed").value), incline=Number($("sportIncline").value);
  $("durationLabel").textContent=duration; $("speedLabel").textContent=speed; $("inclineLabel").textContent=incline;
  const calories=Math.round(duration*speed*(1+incline/10)); lastCalculatedSport=calories; $("sportResult").textContent=`Yakılan kalori: ${calories} kcal`; return calories;
}
["sportDuration","sportSpeed","sportIncline"].forEach(id=>{ if($(id)) $(id).addEventListener("input",calculateSport); });
if($("calculateSportButton")) $("calculateSportButton").addEventListener("click",calculateSport);
if($("addSportButton")) $("addSportButton").addEventListener("click",()=>{ const calories=lastCalculatedSport||calculateSport(); state.sport+=calories; state.dailySports.push({calories}); saveState(); refresh(); alert("Spor günlüğe eklendi."); });
function renderHistory(){ const c=$("historyList"); if(!c) return; c.innerHTML=state.history.length?state.history.join(""):"Henüz kayıt yok."; }
if($("finishDayButton")) $("finishDayButton").addEventListener("click",()=>{
  const today=new Date().toLocaleDateString("tr-TR");
  state.history.unshift(`<div class="history-item"><strong>${today}</strong><br>🔥 ${Math.round(state.calories)} kcal<br>🥩 ${Math.round(state.protein)} g<br>💧 ${state.water.toFixed(1)} L<br>💪 ${Math.round(state.sport)} kcal</div>`);
  state.calories=0; state.protein=0; state.water=0; state.sport=0; state.dailyFoods=[]; state.dailySports=[]; saveState(); refresh(); alert("Gün geçmişe kaydedildi.");
});
document.querySelectorAll(".bottom-nav button").forEach(btn=>btn.addEventListener("click",()=>{ document.querySelectorAll(".page").forEach(p=>p.classList.remove("active")); const page=$(btn.dataset.page); if(page) page.classList.add("active"); }));
if($("sportDuration")) calculateSport();
refresh();