const $ = id => document.getElementById(id);

const DEFAULTS = {
  eaten: 0,
  burned: 0,
  protein: 0,
  water: 0,
  weight: 0,
  dayType: 'normal',
  dailyFoods: [],
  dailySports: [],
  customFoods: [],
  history: [],
  goals: {
    calories: 1800,
    protein: 165,
    water: 3
  }
};

const FRESH_START_VERSION='20261006-final20';
if(localStorage.getItem('vk_fresh_start_version')!==FRESH_START_VERSION){
  localStorage.removeItem('vk_yasam_kocu');
  localStorage.removeItem('vk_workout_log_v1');
  localStorage.setItem('vk_fresh_start_version',FRESH_START_VERSION);
}

let state = loadState();
let selectedFood = null;
let lastFoodCalc = null;
let lastSportCalc = 0;
let foodPeriod = 'today';

function safeNum(value){
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function loadState(){
  const raw = localStorage.getItem('vk_yasam_kocu');
  if(!raw) return structuredClone(DEFAULTS);

  try{
    return normalizeState(JSON.parse(raw));
  }catch(e){
    return structuredClone(DEFAULTS);
  }
}

function normalizeState(s){
  const out = structuredClone(DEFAULTS);
  if(!s || typeof s !== 'object') return out;

  out.eaten = safeNum(s.eaten);
  out.burned = safeNum(s.burned);
  out.protein = safeNum(s.protein);
  out.water = safeNum(s.water);
  out.weight = safeNum(s.weight);

  out.dayType = s.dayType === 'sport' ? 'sport' : 'normal';

  out.dailyFoods = Array.isArray(s.dailyFoods) ? s.dailyFoods : [];
  out.dailySports = Array.isArray(s.dailySports) ? s.dailySports : [];
  out.customFoods = Array.isArray(s.customFoods) ? s.customFoods : [];
  out.history = Array.isArray(s.history) ? s.history : [];

  out.goals = {
    calories: safeNum(s.goals?.calories) || (out.dayType === 'sport' ? 2100 : 1800),
    protein: safeNum(s.goals?.protein) || 165,
    water: safeNum(s.goals?.water) || 3
  };

  return out;
}

function save(){
  localStorage.setItem('vk_yasam_kocu', JSON.stringify(state));
}

function localDateKey(){
  const d=new Date();
  const y=d.getFullYear();
  const m=String(d.getMonth()+1).padStart(2,'0');
  const day=String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${day}`;
}

function netCalories(){
  return state.eaten - state.burned;
}

function getTodayWorkoutSummary(){
  const empty={done:0,sets:0,minutes:0};
  try{
    const raw=localStorage.getItem('vk_workout_log_v1');
    if(!raw)return empty;
    const data=JSON.parse(raw)||{};
    const todayKey=localDateKey();
    const resetAt=Number(data.dayResetAt)||0;
    const done=Object.values(data.done||{}).filter(v=>v===todayKey).length;
    const sets=(data.logs||[])
      .filter(x=>x.date===todayKey && (!resetAt || Number(x.at||0)>resetAt))
      .reduce((sum,x)=>sum+(Number(x.sets)||0),0);
    if(resetAt && done===0 && sets===0)return empty;
    const minutes=(state.dailySports||[]).filter(x=>x.name==='Ağırlık Antrenmanı').reduce((sum,x)=>sum+(Number(x.duration)||0),0);
    return {done,sets,minutes};
  }catch(e){
    return empty;
  }
}

function addWorkoutBurn(minutes,sets=13,met=3.5,sessionId=''){
  const weight=Number(state.weight)||0;
  if(weight<=0){
    alert('Ağırlık kalorisi için Profil bölümünden vücut ağırlığını gir.');
    return false;
  }

  const mins=Math.max(5,Math.min(180,Number(minutes)||45));
  const setCount=Math.max(1,Number(sets)||13);
  const intensity=Number(met)||3.5;

  // Net aktif enerji: (MET - 1) x kg x saat.
  const kcal=Math.max(0,Math.round(intensity*weight*(mins/60)));

  const existingIndex=sessionId
    ? state.dailySports.findIndex(x=>x.name==='Ağırlık Antrenmanı'&&x.sessionId===sessionId)
    : -1;

  if(existingIndex>=0){
    state.burned=Math.max(0,state.burned-safeNum(state.dailySports[existingIndex].calories));
    state.dailySports[existingIndex]={
      ...state.dailySports[existingIndex],
      duration:mins,
      sets:setCount,
      met:intensity,
      date:state.dailySports[existingIndex].date||localDateKey(),
      day:state.dailySports[existingIndex].day||window.__vkWorkoutDay||null,
      weight,
      calories:kcal
    };
  }else{
    const manualWeightExists=state.dailySports.some(x=>x.name==='Ağırlık Antrenmanı'||x.name==='Ağırlık');
    if(manualWeightExists)return false;

    state.dailySports.push({
      name:'Ağırlık Antrenmanı',
      duration:mins,
      sets:setCount,
      met:intensity,
      weight,
      calories:kcal,
      sessionId:sessionId||null,
      date:localDateKey(),
      day:window.__vkWorkoutDay||null
    });
  }

  state.burned+=kcal;
  save();
  updateDashboard();
  renderSports();
  return true;
}
function updateDashboard(){
  const calorieGoal=Math.max(1,state.goals.calories);
  const proteinGoal=Math.max(1,state.goals.protein);
  const waterGoal=Math.max(0.1,state.goals.water);
  const walkMinutes=state.dailySports
    .filter(s=>String(s.name||'').toLocaleLowerCase('tr-TR').includes('yürüy'))
    .reduce((sum,s)=>sum+(Number(s.duration)||0),0);
  const workout=getTodayWorkoutSummary();
  const eaten=Math.round(state.eaten);
  const burned=Math.round(state.burned);
  const net=eaten-burned;
  const walkBurned=Math.round((state.dailySports||[])
    .filter(s=>String(s.name||'').toLocaleLowerCase('tr-TR').includes('yürüy'))
    .reduce((sum,s)=>sum+(Number(s.calories)||0),0));
  const workoutBurned=Math.round((state.dailySports||[])
    .filter(s=>String(s.name||'')==='Ağırlık Antrenmanı')
    .reduce((sum,s)=>sum+(Number(s.calories)||0),0));
  const cardioBurned=Math.round((state.dailySports||[]).filter(s=>['Yürüyüş','Koşu','Bisiklet'].includes(String(s.name||''))).reduce((sum,s)=>sum+(Number(s.calories)||0),0));

  const setText=(id,value)=>{const el=$(id);if(el)el.textContent=value};
  const homeDate=$('homeDateBox'); if(homeDate){homeDate.textContent=new Date().toLocaleDateString('tr-TR',{day:'2-digit',month:'2-digit',year:'numeric'});} 
  setText('currentCalories',eaten);
  setText('currentProtein',Math.round(state.protein));
  setText('currentWater',state.water.toFixed(1));
  setText('currentSport',burned);
  setText('currentBurned',burned);
  setText('currentWorkout',workout.done);
  setText('currentNet',net);
  setText('summaryWalk',walkMinutes);
  setText('summaryWorkout',workout.done);
  setText('summaryWorkoutDetail',workout.sets+' set / '+Math.round(workout.minutes)+' dk');
  setText('summaryWorkoutSets',workout.sets);
  setText('summaryEaten',eaten);
  setText('summaryEatenLabel',eaten+' kcal');
  setText('summaryBurned',burned);
  setText('summaryCardioCalories',cardioBurned+' kcal');
  setText('summaryWorkoutCalories',workoutBurned+' kcal');
  setText('summaryNet',net);
  setText('summaryWater',state.water.toFixed(1));
  setText('summaryProtein',Math.round(state.protein));
  setText('summaryFoodCount',eaten+' kcal');
  setText('homeRemainingCalories',Math.max(0,Math.round(calorieGoal-eaten)));
  const progressEl=$('homeCalorieProgress'); if(progressEl)progressEl.style.width=Math.max(0,Math.min(100,(eaten/calorieGoal)*100))+'%';
  setText('foodPageCalories',eaten);
  setText('foodPageProtein',Math.round(state.protein));
  setText('foodPageWater',state.water.toFixed(1));
  setText('summaryCalorieGoal',Math.round(calorieGoal));
  setText('summaryWaterGoal',waterGoal.toFixed(1));
  setText('homeCalorieGoal',Math.round(calorieGoal));
  setText('homeProteinGoal',Math.round(proteinGoal));
  setText('homeWaterGoal',waterGoal.toFixed(1));
  const headerWeight=$('headerWeightValue');
  if(headerWeight) headerWeight.textContent = state.weight>0 ? Number(state.weight).toLocaleString('tr-TR',{maximumFractionDigits:1}) : '—';

  const setRing=(selector,pct)=>{
    const el=document.querySelector(selector);
    if(el)el.style.setProperty('--ring-pct',Math.max(0,Math.min(100,pct))+'%');
  };
  setRing('.walk-ring',(walkMinutes/30)*100);
  setRing('.strength-ring',(workout.done/5)*100);
  setRing('.calorie-ring',(eaten/calorieGoal)*100);
  setRing('.burned-ring',Math.min(100,(burned/500)*100));
  setRing('.net-ring',(net/calorieGoal)*100);
  setRing('.water-ring',(state.water/waterGoal)*100);
  setRing('.protein-ring',(state.protein/proteinGoal)*100);
  setRing('.sets-ring',Math.min(100,(workout.sets/13)*100));

  const headerToday=$('headerToday');
  if(headerToday) headerToday.textContent=new Date().toLocaleDateString('tr-TR',{day:'2-digit',month:'2-digit',year:'numeric'});
  updateDayButtons();
}
function updateDayButtons(){
  const normal = $('normalDayBtn');
  const sport = $('sportDayBtn');
  if(!normal || !sport) return;

  normal.classList.toggle('active', state.dayType === 'normal');
  sport.classList.toggle('active', state.dayType === 'sport');
}

function setDayType(type){
  state.dayType = type === 'sport' ? 'sport' : 'normal';
  state.goals.calories = state.dayType === 'sport' ? 2100 : 1800;
  save();
  updateDashboard();
}

function updateFoodPeriod(){
  const tabs=document.querySelectorAll('.food-tabs button');
  tabs.forEach((tab,index)=>tab.classList.toggle('active',(['today','yesterday','week'][index]||'today')===foodPeriod));

  const today={calories:Math.round(state.eaten),protein:Math.round(state.protein),water:Number(state.water.toFixed(1))};
  const history=Array.isArray(state.history)?state.history:[];
  let summary=today;
  if(foodPeriod==='yesterday'){
    const h=history[0];
    summary=h?{calories:Number(h.eaten)||0,protein:Number(h.protein)||0,water:Number(h.water)||0}:{calories:0,protein:0,water:0};
  }else if(foodPeriod==='week'){
    const rows=history.slice(0,6);
    summary={
      calories:rows.reduce((s,h)=>s+(Number(h.eaten)||0),today.calories),
      protein:rows.reduce((s,h)=>s+(Number(h.protein)||0),today.protein),
      water:Number((rows.reduce((s,h)=>s+(Number(h.water)||0),today.water)).toFixed(1))
    };
  }
  const set=(id,v)=>{const el=$(id);if(el)el.textContent=v};
  set('foodPageCalories',Math.round(summary.calories));
  set('foodPageProtein',Math.round(summary.protein));
  set('foodPageWater',Number(summary.water).toFixed(1));
  const title=document.querySelector('.food-tabs');
  if(title) title.setAttribute('data-period',foodPeriod);
}
function renderFoods(){
  const box = $('dailyFoods');
  if(!box) return;
  box.innerHTML = '';
  if(!state.dailyFoods.length){
    box.innerHTML = '<div class="empty-state">Henüz besin eklenmedi.</div>';
    return;
  }
  state.dailyFoods.forEach((food,index)=>{
    const div=document.createElement('div');
    div.className='food-item compact-food';
    div.innerHTML='<span class="food-name">'+food.name+'</span><span class="food-meta">'+food.amount+' '+food.unit+' • '+Math.round(food.calories)+' kcal • '+Math.round(food.protein)+' g</span><button class="remove-food" aria-label="Besini sil">×</button>';
    div.querySelector('.remove-food').onclick=()=>{
      state.eaten=Math.max(0,state.eaten-safeNum(food.calories));
      state.protein=Math.max(0,state.protein-safeNum(food.protein));
      state.dailyFoods.splice(index,1);
      save();updateDashboard();renderFoods();
    };
    box.appendChild(div);
  });
}

function renderSports(){
  const box = $('dailySports');
  if(!box) return;

  box.innerHTML = '';

  if(!state.dailySports.length){
    box.innerHTML = '<div class="food-item">Henüz spor eklenmedi.</div>';
    return;
  }

  state.dailySports.forEach((sport,index)=>{
    const div = document.createElement('div');
    div.className = 'food-item';

    const sportIcon = sport.name==='Koşu' ? '🏃' : sport.name==='Bisiklet' ? '🚴' : sport.name==='Yürüyüş' ? '🚶' : '🏋️';
    div.innerHTML = `
      <strong>${sportIcon} ${sport.name}</strong>
      <br>
      ⏱️ ${sport.duration} dk
      <br>
      🔥 ${Math.round(sport.calories)} kcal
      <button class="remove-sport">❌ Sil</button>
    `;

    div.querySelector('.remove-sport').onclick = ()=>{
      state.burned = Math.max(0, state.burned - safeNum(sport.calories));
      state.dailySports.splice(index,1);
      save();
      updateDashboard();
      renderSports();
    };

    box.appendChild(div);
  });
}

function searchFood(text){
  const results = $('foodResults');
  if(!results) return;

  results.innerHTML = '';

  const query = text.trim().toLocaleLowerCase('tr-TR');

  if(query.length < 2){
    results.innerHTML = '<div class="food-item">En az 2 harf yaz.</div>';
    return;
  }

  const list = [...foods, ...state.customFoods];

  const filtered = list.filter(food =>
    String(food.name).toLocaleLowerCase('tr-TR').includes(query)
  );

  if(!filtered.length){
    results.innerHTML = '<div class="food-item"><strong>Besin bulunamadı.</strong><br><small>Kalori ve protein değerini girerek hemen ekleyebilirsin.</small><button type="button" class="quick-custom-food" style="margin-top:8px;width:100%;padding:9px;border:0;border-radius:10px;background:#111827;color:#fff;font-weight:800">➕ Bu besini ekle</button></div>';
    results.querySelector('.quick-custom-food').onclick=()=>{const name=$('newFoodName');if(name){name.value=text.trim();name.focus();name.scrollIntoView({behavior:'smooth',block:'center'});}};
    return;
  }

  filtered.forEach(food=>{
    const item = document.createElement('div');
    item.className = 'food-item';

    item.innerHTML = `
      <strong>${food.name}</strong>
      <br>
      🔥 ${food.kcal} kcal
      <br>
      🥩 ${food.protein} g
      <br>
      <small>${food.unit || '100 g'}</small>
    `;

    item.onclick = ()=>selectFood(food);
    results.appendChild(item);
  });
}

function detectUnit(unit){
  const normalized = String(unit || '').toLocaleLowerCase('tr-TR');

  if(normalized.includes('ml')) return 'ml';
  if(normalized.includes('adet')) return 'adet';
  if(normalized.includes('dilim')) return 'dilim';
  if(normalized.includes('porsiyon')) return 'porsiyon';
  if(normalized.includes('kase')) return 'kase';

  if(
    normalized.includes('ölçek') ||
    normalized.includes('olcek') ||
    normalized.includes('25 g')
  ){
    return 'olcek';
  }

  return 'gram';
}

function selectFood(food){
  selectedFood = food;

  $('foodCalcCard').style.display = 'block';
  $('selectedFoodName').textContent = food.name;

  const unit = detectUnit(food.unit);

  $('foodUnit').value = unit;
  $('foodAmount').value = (unit === 'gram' || unit === 'ml') ? 100 : 1;

  calculateFood();
}

function calculateFood(){
  if(!selectedFood) return null;

  const amount = Math.max(0, safeNum($('foodAmount').value));
  if(amount <= 0) return null;

  const unit = $('foodUnit').value;

  let factor = 1;

  if(unit === 'gram' || unit === 'ml'){
    factor = amount / 100;
  }else{
    factor = amount;
  }

  const calories = Math.round(safeNum(selectedFood.kcal) * factor);
  const protein = Math.round(safeNum(selectedFood.protein) * factor * 10) / 10;

  lastFoodCalc = {
    calories,
    protein,
    amount,
    unit,
    food: selectedFood
  };

  $('foodCalculated').textContent =
    `${calories} kcal / ${protein} g protein`;

  return lastFoodCalc;
}

function addFood(){
  const result = calculateFood();

  if(!result){
    alert('Önce bir besin seçip miktar gir.');
    return;
  }

  state.eaten += result.calories;
  state.protein += result.protein;

  state.dailyFoods.push({
    name: result.food.name,
    calories: result.calories,
    protein: result.protein,
    amount: result.amount,
    unit: result.unit
  });

  save();
  updateDashboard();
  renderFoods();
}

function saveCustomFood(){
  const name = $('newFoodName').value.trim();
  const kcal = safeNum($('newFoodCalories').value);
  const protein = safeNum($('newFoodProtein').value);
  const unit = $('newFoodUnit').value;

  if(!name || kcal < 0 || protein < 0){
    alert('Besin adı, kalori ve protein gir.');
    return;
  }

  state.customFoods.push({
    name,
    kcal,
    protein,
    unit
  });

  save();

  $('newFoodName').value = '';
  $('newFoodCalories').value = '';
  $('newFoodProtein').value = '';

  alert('Besin kaydedildi. Aratarak kullanabilirsin.');
}

function calculateSport(){
  const type = $('sportType').value;
  const duration = Math.max(0, safeNum($('sportDuration').value));
  const speed = Math.max(0, safeNum($('sportSpeed').value));
  const incline = Math.max(0, safeNum($('sportIncline').value));

  $('durationLabel').textContent = duration;
  $('speedLabel').textContent = speed;
  $('inclineLabel').textContent = incline;

  const factors = {
    walk: 1.0,
    run: 1.45,
    bike: 0.85,
    weights: 0.90,
    stairs: 1.55
  };

  const factor = factors[type] || 1.0;

  const calories = Math.round(
    duration *
    speed *
    factor *
    (1 + incline / 20)
  );

  lastSportCalc = calories;

  $('sportResult').textContent =
    `Yakılan kalori: ${calories} kcal`;

  return calories;
}

function addSport(){
  const type = $('sportType').value;

  const labels = {
    walk: 'Yürüyüş',
    run: 'Koşu',
    bike: 'Bisiklet',
    weights: 'Ağırlık',
    stairs: 'Merdiven'
  };

  const calories = calculateSport();
  const duration = safeNum($('sportDuration').value);

  state.burned += calories;

  state.dailySports.push({
    name: labels[type] || 'Spor',
    duration,
    calories
  });

  save();
  updateDashboard();
  renderSports();
}

function renderHistory(filter='daily'){
  const box=$('historyList');
  if(!box)return;
  const tabs=document.querySelectorAll('.history-tabs button');
  tabs.forEach((b,i)=>b.classList.toggle('active',['daily','workout','cardio','weight'][i]===filter));

  if(filter==='daily'){
    if(!state.history.length){box.innerHTML='<div class="history-item">Henüz geçmiş kaydı yok.</div>';return;}
    box.innerHTML=state.history.map((item,index)=>'<div class="history-item"><strong>'+item.date+'</strong><br>🔥 Alınan: '+item.eaten+' kcal<br>💪 Yakılan: '+item.burned+' kcal<br>⚖️ Net: '+item.net+' kcal<br>🥩 Protein: '+item.protein+' g<br>💧 Su: '+item.water+' L <button class="remove-history" data-history-index="'+index+'">❌ Sil</button></div>').join('');
    box.querySelectorAll('[data-history-index]').forEach(btn=>btn.onclick=()=>{state.history.splice(Number(btn.dataset.historyIndex),1);save();renderHistory('daily');});
    return;
  }

  if(filter==='cardio'){
    const rows=(state.dailySports||[]).filter(x=>['Yürüyüş','Koşu','Bisiklet'].includes(x.name));
    box.innerHTML=rows.length?rows.slice().reverse().map(x=>'<div class="history-item"><strong>'+x.name+'</strong><br>⏱️ '+(x.duration||0)+' dk<br>🔥 '+(x.calories||0)+' kcal</div>').join(''):'<div class="history-item">Henüz kardiyo kaydı yok.</div>';
    return;
  }

  if(filter==='workout' || filter==='weight'){
    const raw=localStorage.getItem('vk_workout_log_v1');
    let data={logs:[],weights:{},done:{}};
    try{data=raw?JSON.parse(raw):data;}catch(e){}
    if(filter==='workout'){
      const logs=(data.logs||[]).filter(x=>!x.autoDone);
      box.innerHTML=logs.length?logs.slice().reverse().slice(0,30).map(x=>'<div class="history-item"><strong>'+x.exercise+'</strong><br>📅 '+x.date+' • Gün '+x.day+'<br>🏋️ '+(x.sets||0)+' set • '+(x.reps||'-')+' tekrar</div>').join(''):'<div class="history-item">Henüz antrenman kaydı yok.</div>';
    }else{
      const weight=Number(state.weight)||0;
      box.innerHTML='<div class="history-item"><strong>⚖️ Güncel Ağırlık</strong><br>'+ (weight?weight.toFixed(1)+' kg':'Henüz kilo girilmedi.') +'</div>';
    }
    return;
  }
}


function finishDay(){
  const record = {
    date: new Date().toLocaleDateString('tr-TR'),
    eaten: Math.round(state.eaten),
    burned: Math.round(state.burned),
    net: Math.round(netCalories()),
    protein: Math.round(state.protein),
    water: Number(state.water.toFixed(1)),
    dayType: state.dayType
  };

  state.history.unshift(record);

  state.eaten = 0;
  state.burned = 0;
  state.protein = 0;
  state.water = 0;
  state.dailyFoods = [];
  state.dailySports = [];

  // Günü Bitir: bugünün antrenman işaretlerini sıfırla,
  // ancak geçmiş set/tekrar/ağırlık kayıtlarını koru.
  try{
    const raw=localStorage.getItem('vk_workout_log_v1');
    const workoutData=raw?JSON.parse(raw):{logs:[],weights:{},done:{}};
    workoutData.done={};
    workoutData.dayResetAt=Date.now();
    workoutData.session=null;
    localStorage.setItem('vk_workout_log_v1',JSON.stringify(workoutData));
  }catch(e){}

  if(typeof resetWorkoutDay==='function')resetWorkoutDay();

  save();
  refreshAll();

  alert('Gün kaydedildi. Antrenman ekranı da sıfırlandı.');
}
function resetAllData(){
  if(!confirm('Beslenme, kardiyo, antrenman geçmişi, kilo ve tüm kayıtlar silinsin mi?'))return;
  localStorage.removeItem('vk_yasam_kocu');
  localStorage.removeItem('vk_workout_log_v1');
  state=structuredClone(DEFAULTS);
  selectedFood=null;
  lastFoodCalc=null;
  lastSportCalc=0;
  foodPeriod='today';
  if(typeof load==='function')S=load();
  if(typeof day!=='undefined')day=1;
  if(typeof active!=='undefined')active=false;
  if(typeof activeSessionId!=='undefined')activeSessionId='';
  if(typeof activePausedMs!=='undefined')activePausedMs=0;
  if(typeof activeStartedAt!=='undefined')activeStartedAt=0;
  if(typeof clearElapsedTicker==='function')clearElapsedTicker();
  save();
  if(typeof renderSports==='function')renderSports();
  if(typeof renderHistory==='function')renderHistory();
  if(typeof render==='function')render();
  if(typeof history==='function')history();
  refreshAll();
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  $('homePage')?.classList.add('active');
  document.querySelectorAll('.bottom-nav button').forEach(b=>b.classList.toggle('active',b.dataset.page==='homePage'));
  alert('Tüm veriler sıfırlandı. Baştan başlayabilirsin.');
}

function saveProfile(){
  const calories = safeNum($('profileCalories').value);
  const protein = safeNum($('profileProtein').value);
  const water = safeNum($('profileWater').value);
  const weight = safeNum($('profileWeight').value);

  if(calories > 0) state.goals.calories = calories;
  if(protein > 0) state.goals.protein = protein;
  if(water > 0) state.goals.water = water;
  if(weight > 0) state.weight = weight;

  save();
  updateDashboard();

  alert('Profil ve hedefler kaydedildi.');
}

function addWater(){
  state.water = Number((state.water + 0.25).toFixed(2));
  save();
  updateDashboard();
}

function setupNavigation(){
  const buttons=document.querySelectorAll('.bottom-nav button, .brand');
  buttons.forEach(button=>{
    button.addEventListener('click',()=>{
      document.querySelectorAll('.page').forEach(page=>page.classList.remove('active'));
      const page=$(button.dataset.page);
      if(page)page.classList.add('active');
      document.querySelectorAll('.bottom-nav button').forEach(b=>b.classList.toggle('active',b.dataset.page===button.dataset.page));
      window.scrollTo({top:0,behavior:'smooth'});
    });
  });

  const gear=$('profileHeaderButton');
  if(gear){
    gear.addEventListener('click',()=>{
      document.querySelectorAll('.page').forEach(page=>page.classList.remove('active'));
      $('profilePage')?.classList.add('active');
      document.querySelectorAll('.bottom-nav button').forEach(b=>b.classList.remove('active'));
      window.scrollTo({top:0,behavior:'smooth'});
    });
  }
}

function setupDayButtons(){
  // Gün tipi seçimi artık ana ekranda görünmüyor; hedefler profil üzerinden yönetiliyor.
}
function setupEvents(){
  const editGoalsButton=$('editGoalsButton');
  if(editGoalsButton){
    editGoalsButton.onclick=()=>{
      document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
      const profile=$('profilePage');
      if(profile)profile.classList.add('active');
      document.querySelectorAll('.bottom-nav button').forEach(b=>b.classList.toggle('active',b.dataset.page==='profilePage'));
    };
  }


  const historyTabs=document.querySelectorAll('.history-tabs button');
  historyTabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>{
      const types=['daily','workout','cardio','weight'];
      renderHistory(types[index]);
    });
  });

  const foodTabs=document.querySelectorAll('.food-tabs button');
  foodTabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>{
      foodPeriod=['today','yesterday','week'][index]||'today';
      updateFoodPeriod();
    });
  });

  $('foodSearch').addEventListener('input', event=>{
    searchFood(event.target.value);
  });

  $('foodAmount').addEventListener('input', calculateFood);

  $('foodUnit').addEventListener('change', calculateFood);

  $('calculateFoodButton').addEventListener(
    'click',
    calculateFood
  );

  $('addFoodButton').addEventListener(
    'click',
    addFood
  );

  $('saveFoodButton').addEventListener(
    'click',
    saveCustomFood
  );

  [
    'sportType',
    'sportDuration',
    'sportSpeed',
    'sportIncline'
  ].forEach(id=>{
    $(id).addEventListener('input', calculateSport);
    $(id).addEventListener('change', calculateSport);
  });

  // Kardiyo sekmeleri gerçek spor tipini değiştirir.
  const sportTabs=document.querySelectorAll('.sport-type-tabs button');
  sportTabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>{
      sportTabs.forEach(x=>x.classList.remove('active'));
      tab.classList.add('active');
      const typeMap=['walk','run','bike'];
      const type=typeMap[index]||'walk';
      const hidden=$('sportType');
      if(hidden) hidden.value=type;
      const speed=$('sportSpeed');
      const incline=$('sportIncline');
      if(type==='walk'){speed.min=3;speed.max=8;speed.value=Math.min(8,Math.max(3,Number(speed.value)||5));}
      if(type==='run'){speed.min=6;speed.max=15;speed.value=Math.min(15,Math.max(6,Number(speed.value)||8));}
      if(type==='bike'){speed.min=8;speed.max=35;speed.value=Math.min(35,Math.max(8,Number(speed.value)||18));}
      if(type==='stairs'){speed.min=3;speed.max=8;speed.value=Math.min(8,Math.max(3,Number(speed.value)||5));}
      calculateSport();
    });
  });

  $('calculateSportButton').addEventListener(
    'click',
    calculateSport
  );

  $('addSportButton').addEventListener(
    'click',
    addSport
  );

  const waterTargets = [$('waterButton'), $('homeWaterCard')].filter(Boolean);
  waterTargets.forEach(el=>el.addEventListener('click', addWater));
  waterTargets.forEach(el=>el.addEventListener('keydown', e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();addWater();}}));

  $('finishDayButton').addEventListener(
    'click',
    finishDay
  );

  $('saveProfileButton').addEventListener(
    'click',
    saveProfile
  );

  const resetAllButton=$('resetAllButton');
  if(resetAllButton) resetAllButton.addEventListener('click',resetAllData);
}

function refreshAll(){
  if($('profileWeight')) $('profileWeight').value = state.weight || '';
  if($('profileCalories')) $('profileCalories').value = state.goals.calories || '';
  if($('profileProtein')) $('profileProtein').value = state.goals.protein || '';
  if($('profileWater')) $('profileWater').value = state.goals.water || '';
  updateDashboard();
  renderFoods();
  updateFoodPeriod();
  renderSports();
  renderHistory();
}

setupNavigation();
setupEvents();
setupDayButtons();

refreshAll();
calculateSport();
