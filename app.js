const $ = id => document.getElementById(id);

const DEFAULTS = {
  eaten: 0,
  burned: 0,
  protein: 0,
  water: 0,
  dailyFoods: [],
  dailySports: [],
  customFoods: [],
  history: [],
  goals: { calories: 2500, protein: 165, water: 3 }
};

let state = loadState();
let selectedFood = null;
let lastFoodCalc = null;
let lastSportCalc = 0;

function loadState(){
  const raw = localStorage.getItem('vk_yasam_kocu');
  if(!raw) return structuredClone(DEFAULTS);
  try{
    const saved = JSON.parse(raw);
    return normalizeState(saved);
  }catch(e){
    return structuredClone(DEFAULTS);
  }
}

function normalizeState(s){
  const out = structuredClone(DEFAULTS);
  if(!s || typeof s !== 'object') return out;
  out.eaten = Number.isFinite(Number(s.eaten)) ? Number(s.eaten) : 0;
  out.burned = Number.isFinite(Number(s.burned)) ? Number(s.burned) : 0;
  out.protein = Number.isFinite(Number(s.protein)) ? Number(s.protein) : 0;
  out.water = Number.isFinite(Number(s.water)) ? Number(s.water) : 0;
  out.dailyFoods = Array.isArray(s.dailyFoods) ? s.dailyFoods : [];
  out.dailySports = Array.isArray(s.dailySports) ? s.dailySports : [];
  out.customFoods = Array.isArray(s.customFoods) ? s.customFoods : [];
  out.history = Array.isArray(s.history) ? s.history : [];
  out.goals = {
    calories: Number.isFinite(Number(s.goals?.calories)) ? Number(s.goals.calories) : 2500,
    protein: Number.isFinite(Number(s.goals?.protein)) ? Number(s.goals.protein) : 165,
    water: Number.isFinite(Number(s.goals?.water)) ? Number(s.goals.water) : 3
  };
  return out;
}

function save(){ localStorage.setItem('vk_yasam_kocu', JSON.stringify(state)); }
function safeNum(v){ const n=Number(v); return Number.isFinite(n) ? n : 0; }
function netCalories(){ return state.eaten - state.burned; }

function updateDashboard(){
  $('currentCalories').textContent = Math.round(netCalories());
  $('currentProtein').textContent = Math.round(state.protein);
  $('currentWater').textContent = state.water.toFixed(1);
  $('currentSport').textContent = Math.round(state.burned);
  $('eatenCalories').textContent = Math.round(state.eaten);
  $('burnedCalories').textContent = Math.round(state.burned);
  $('netCalories').textContent = Math.round(netCalories());
  $('targetCalories').textContent = state.goals.calories;
  $('targetProtein').textContent = state.goals.protein;
  $('targetWater').textContent = state.goals.water;
  $('today').textContent = new Date().toLocaleDateString('tr-TR');
}

function renderFoods(){
  const box = $('dailyFoods');
  box.innerHTML = '';
  if(!state.dailyFoods.length){ box.innerHTML = '<div class="food-item">Henüz besin eklenmedi.</div>'; return; }
  state.dailyFoods.forEach((food,index)=>{
    const div=document.createElement('div');
    div.className='food-item';
    div.innerHTML = `<strong>${food.name}</strong><br>⚖️ ${food.amount} ${food.unit}<br>🔥 ${Math.round(food.calories)} kcal<br>🥩 ${Math.round(food.protein)} g<button class="remove-food">❌ Sil</button>`;
    div.querySelector('.remove-food').onclick=()=>{
      state.eaten = Math.max(0,state.eaten-safeNum(food.calories));
      state.protein = Math.max(0,state.protein-safeNum(food.protein));
      state.dailyFoods.splice(index,1);
      save(); updateDashboard(); renderFoods();
    };
    box.appendChild(div);
  });
}

function renderSports(){
  const box = $('dailySports');
  box.innerHTML = '';
  if(!state.dailySports.length){ box.innerHTML = '<div class="food-item">Henüz spor eklenmedi.</div>'; return; }
  state.dailySports.forEach((sport,index)=>{
    const div=document.createElement('div');
    div.className='food-item';
    div.innerHTML = `<strong>💪 ${sport.name}</strong><br>⏱️ ${sport.duration} dk<br>🔥 ${Math.round(sport.calories)} kcal<button class="remove-sport">❌ Sil</button>`;
    div.querySelector('.remove-sport').onclick=()=>{
      state.burned = Math.max(0,state.burned-safeNum(sport.calories));
      state.dailySports.splice(index,1);
      save(); updateDashboard(); renderSports();
    };
    box.appendChild(div);
  });
}

function searchFood(text){
  const results=$('foodResults');
  results.innerHTML='';
  const q=text.trim().toLocaleLowerCase('tr-TR');
  if(q.length<2) return;
  const list=[...foods,...state.customFoods];
  const filtered=list.filter(f=>String(f.name).toLocaleLowerCase('tr-TR').includes(q));
  if(!filtered.length){ results.innerHTML='<div class="food-item">Besin bulunamadı. Yeni besin ekleyebilirsin.</div>'; return; }
  filtered.forEach(food=>{
    const item=document.createElement('div');
    item.className='food-item';
    item.innerHTML=`<strong>${food.name}</strong><br>🔥 ${food.kcal} kcal<br>🥩 ${food.protein} g<br><small>${food.unit || '100 g'}</small>`;
    item.onclick=()=>selectFood(food);
    results.appendChild(item);
  });
}

function selectFood(food){
  selectedFood=food;
  $('foodCalcCard').style.display='block';
  $('selectedFoodName').textContent=food.name;
  const defaultUnit = food.unit.includes('ml') ? 'ml' : food.unit==='adet' ? 'adet' : food.unit==='dilim' ? 'dilim' : food.unit==='porsiyon' ? 'porsiyon' : food.unit==='ölçek' ? 'ölçek' : 'gram';
  $('foodUnit').value=defaultUnit;
  $('foodAmount').value = defaultUnit==='gram' || defaultUnit==='ml' ? 100 : 1;
  calculateFood();
}

function calculateFood(){
  if(!selectedFood) return null;
  const amount=Math.max(0,safeNum($('foodAmount').value));
  const unit=$('foodUnit').value;
  let factor=1;
  if(unit==='gram' || unit==='ml') factor=amount/100;
  else factor=amount;
  const calories=Math.round(safeNum(selectedFood.kcal)*factor);
  const protein=Math.round(safeNum(selectedFood.protein)*factor*10)/10;
  lastFoodCalc={calories,protein,amount,unit,food:selectedFood};
  $('foodCalculated').textContent=`${calories} kcal / ${protein} g protein`;
  return lastFoodCalc;
}

$('foodSearch').addEventListener('input',e=>searchFood(e.target.value));
$('foodAmount').addEventListener('input',calculateFood);
$('foodUnit').addEventListener('change',calculateFood);
$('calculateFoodButton').addEventListener('click',calculateFood);
$('addFoodButton').addEventListener('click',()=>{
  const result=calculateFood();
  if(!result) return;
  state.eaten += result.calories;
  state.protein += result.protein;
  state.dailyFoods.push({name:result.food.name,calories:result.calories,protein:result.protein,amount:result.amount,unit:result.unit});
  save(); updateDashboard(); renderFoods();
});

$('saveFoodButton').addEventListener('click',()=>{
  const name=$('newFoodName').value.trim();
  const kcal=safeNum($('newFoodCalories').value);
  const protein=safeNum($('newFoodProtein').value);
  const unit=$('newFoodUnit').value;
  if(!name || kcal<0 || protein<0){ alert('Besin adı, kalori ve protein gir.'); return; }
  state.customFoods.push({name,kcal,protein,unit});
  save();
  $('newFoodName').value=''; $('newFoodCalories').value=''; $('newFoodProtein').value='';
  alert('Besin kaydedildi. Şimdi aratarak kullanabilirsin.');
});

function calculateSport(){
  const duration=Math.max(0,safeNum($('sportDuration').value));
  const speed=Math.max(0,safeNum($('sportSpeed').value));
  const incline=Math.max(0,safeNum($('sportIncline').value));
  $('durationLabel').textContent=duration;
  $('speedLabel').textContent=speed;
  $('inclineLabel').textContent=incline;
  const calories=Math.round(duration*speed*(1+incline/10));
  lastSportCalc=calories;
  $('sportResult').textContent=`Yakılan kalori: ${calories} kcal`;
  return calories;
}
['sportDuration','sportSpeed','sportIncline'].forEach(id=>$(id).addEventListener('input',calculateSport));
$('calculateSportButton').addEventListener('click',calculateSport);
$('addSportButton').addEventListener('click',()=>{
  const calories=calculateSport();
  state.burned += calories;
  state.dailySports.push({name:'Yürüyüş',duration:safeNum($('sportDuration').value),calories});
  save(); updateDashboard(); renderSports();
});

$('waterButton').addEventListener('click',()=>{ state.water=Number((state.water+0.25).toFixed(2)); save(); updateDashboard(); });

$('saveProfileButton').addEventListener('click',()=>{
  const cal=safeNum($('profileCalories').value); const pro=safeNum($('profileProtein').value); const water=safeNum($('profileWater').value);
  if(cal>0) state.goals.calories=cal; if(pro>0) state.goals.protein=pro; if(water>0) state.goals.water=water;
  save(); updateDashboard(); alert('Hedefler kaydedildi.');
});

function renderHistory(){
  const box=$('historyList'); box.innerHTML='';
  if(!state.history.length){ box.innerHTML='<div class="history-item">Henüz geçmiş kaydı yok.</div>'; return; }
  state.history.forEach((h,index)=>{
    const div=document.createElement('div'); div.className='history-item';
    div.innerHTML=`${h}<button class="remove-history">❌ Sil</button>`;
    div.querySelector('.remove-history').onclick=()=>{ state.history.splice(index,1); save(); renderHistory(); };
    box.appendChild(div);
  });
}

$('finishDayButton').addEventListener('click',()=>{
  const date=new Date().toLocaleDateString('tr-TR');
  state.history.unshift({date,eaten:Math.round(state.eaten),burned:Math.round(state.burned),net:Math.round(netCalories()),protein:Math.round(state.protein),water:Number(state.water.toFixed(1))});
  state.eaten=0; state.burned=0; state.protein=0; state.water=0; state.dailyFoods=[]; state.dailySports=[];
  save(); refreshAll(); alert('Gün kaydedildi.');
});

function refreshHistory(){
  const box=$('historyList'); box.innerHTML='';
  if(!state.history.length){ box.innerHTML='<div class="history-item">Henüz geçmiş kaydı yok.</div>'; return; }
  state.history.forEach((h,index)=>{
    const div=document.createElement('div'); div.className='history-item';
    div.innerHTML=`<strong>${h.date}</strong><br>🔥 Alınan: ${h.eaten} kcal<br>💪 Yakılan: ${h.burned} kcal<br>⚖️ Net: ${h.net} kcal<br>🥩 Protein: ${h.protein} g<br>💧 Su: ${h.water} L<br><button class="remove-history">❌ Sil</button>`;
    div.querySelector('.remove-history').onclick=()=>{ state.history.splice(index,1); save(); refreshHistory(); };
    box.appendChild(div);
  });
}

document.querySelectorAll('.top-nav button').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const page=$(btn.dataset.page); if(page) page.classList.add('active');
}));

function refreshAll(){ updateDashboard(); renderFoods(); renderSports(); refreshHistory(); }

refreshAll();
calculateSport();