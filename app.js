const $ = id => document.getElementById(id);

const DEFAULTS = {
  name: '',
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

  out.name = String(s.name || '').trim().slice(0,30);
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
    const raw=localStorage.getItem('vk_workout_log_v2');
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
  setText('currentCaloriesGoal',Math.round(calorieGoal).toLocaleString('tr-TR'));
  setText('currentProtein',Math.round(state.protein));
  setText('currentProteinGoal',Math.round(proteinGoal).toLocaleString('tr-TR'));
  setText('currentWater',state.water.toFixed(1));
  setText('currentWaterGoal',waterGoal.toLocaleString('tr-TR',{minimumFractionDigits:1,maximumFractionDigits:1}));
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

function historyDateMs(item){
  if(Number(item?.at)>0)return Number(item.at);
  const raw=String(item?.date||'');
  const m=raw.match(/^(\\d{1,2})[./](\\d{1,2})[./](\\d{4})$/);
  if(m)return new Date(Number(m[3]),Number(m[2])-1,Number(m[1]),12).getTime();
  const parsed=Date.parse(raw);
  return Number.isFinite(parsed)?parsed:0;
}
function hasNutritionData(item){
  return !!item && (
    Number(item.eaten)>0 ||
    Number(item.protein)>0 ||
    Number(item.water)>0 ||
    (Array.isArray(item.foods)&&item.foods.length>0)
  );
}
function nutritionPeriodData(){
  const todayFoods=Array.isArray(state.dailyFoods)?state.dailyFoods:[];
  // Ana sayfadaki kayitlarla ayni kaynagi kullan: state.eaten/protein.
  // Gunluk liste eski kayitlarda eksik olsa bile ozet sifira dusmesin.
  const loggedCalories=todayFoods.reduce((sum,food)=>sum+safeNum(food.calories),0);
  const loggedProtein=todayFoods.reduce((sum,food)=>sum+safeNum(food.protein),0);
  const todayFoodCalories=Math.max(safeNum(state.eaten),loggedCalories);
  const todayFoodProtein=Math.max(safeNum(state.protein),loggedProtein);
  const today={
    date:new Date().toLocaleDateString('tr-TR'),
    at:new Date().setHours(12,0,0,0),
    eaten:Math.round(todayFoodCalories),
    protein:Math.round(todayFoodProtein*10)/10,
    water:Number(state.water.toFixed(1)),
    foods:todayFoods
  };
  const history=Array.isArray(state.history)?state.history:[];
  const yesterday=history
    .filter(hasNutritionData)
    .slice()
    .sort((a,b)=>historyDateMs(b)-historyDateMs(a))[0]||null;
  const cutoff=Date.now()-7*24*60*60*1000;
  const rows=history.filter(h=>hasNutritionData(h)&&historyDateMs(h)>=cutoff);
  if(hasNutritionData(today))rows.unshift(today);
  const unique=rows.filter((row,index,self)=>{
    const key=historyDateMs(row);
    return index===self.findIndex(x=>Math.abs(historyDateMs(x)-key)<24*60*60*1000);
  });
  const average=unique.length?{
    calories:Math.round(unique.reduce((s,h)=>s+(Number(h.eaten)||0),0)/unique.length),
    protein:Math.round(unique.reduce((s,h)=>s+(Number(h.protein)||0),0)/unique.length),
    water:Number((unique.reduce((s,h)=>s+(Number(h.water)||0),0)/unique.length).toFixed(1)),
    days:unique.length
  }:{calories:0,protein:0,water:0,days:0};
  return {today,yesterday,average};
}
function updateFoodPeriod(){
  const tabs=document.querySelectorAll('.food-tabs button');
  tabs.forEach((tab,index)=>tab.classList.toggle('active',(['today','yesterday','week'][index]||'today')===foodPeriod));
  const data=nutritionPeriodData();
  let summary=data.today;
  if(foodPeriod==='yesterday'){
    summary=data.yesterday?{
      calories:Number(data.yesterday.eaten)||0,
      protein:Number(data.yesterday.protein)||0,
      water:Number(data.yesterday.water)||0
    }:{calories:0,protein:0,water:0};
  }else if(foodPeriod==='week'){
    summary=data.average;
  }
  const set=(id,v)=>{const el=$(id);if(el)el.textContent=v};
  const periodCalories=safeNum(summary.calories);
  const periodProtein=safeNum(summary.protein);
  const periodWater=safeNum(summary.water);
  set('foodPageCalories',Math.round(periodCalories));
  set('foodPageProtein',Math.round(periodProtein));
  set('foodPageWater',periodWater.toFixed(1));
  // Beslenme özet kartı da sekme değişiminde doğrudan güncellensin.
  const calorieGoal=Math.max(1,Number(state.goals.calories)||1800);
  const proteinGoal=Math.max(1,Number(state.goals.protein)||165);
  const waterGoal=Math.max(0.1,Number(state.goals.water)||3);
  set('nutritionSummaryCalories',Math.round(periodCalories)+' / '+calorieGoal+' kcal');
  set('nutritionSummaryProtein',Math.round(periodProtein)+' / '+proteinGoal+' g');
  set('nutritionSummaryWater',periodWater.toFixed(1)+' / '+waterGoal.toFixed(1)+' L');
  const label=document.querySelector('.nutrition-period-label');
  if(label)label.textContent=foodPeriod==='today'?'BUGÜNÜN BESLENMESİ':foodPeriod==='yesterday'?'DÜNÜN BESLENMESİ':'SON 7 GÜN ORTALAMASI';
}
function renderNutritionPage(){
  const data=nutritionPeriodData();
  let summary=data.today;
  let foods=Array.isArray(state.dailyFoods)?state.dailyFoods:[];
  let eyebrow='BUGÜNÜN BESLENMESİ';
  let periodNote='Günlük hedef';
  let countLabel=foods.length+' kayıt';
  if(foodPeriod==='yesterday'){
    summary=data.yesterday?{calories:Number(data.yesterday.eaten)||0,protein:Number(data.yesterday.protein)||0,water:Number(data.yesterday.water)||0}:{calories:0,protein:0,water:0};
    foods=Array.isArray(data.yesterday?.foods)?data.yesterday.foods:[];
    eyebrow='DÜNÜN BESLENMESİ';
    periodNote='Dünün özeti';
    countLabel=foods.length?foods.length+' kayıt':'Özet kayıt';
  }else if(foodPeriod==='week'){
    summary=data.average;
    foods=[];
    eyebrow='SON 7 GÜN ORTALAMASI';
    periodNote=summary.days+' veri girilen gün';
    countLabel=summary.days+' veri girilen gün';
  }
  const calorieGoal=Math.max(1,Number(state.goals.calories)||1800);
  const proteinGoal=Math.max(1,Number(state.goals.protein)||165);
  const waterGoal=Math.max(0.1,Number(state.goals.water)||3);
  const set=(id,value)=>{const el=$(id);if(el)el.textContent=value;};
  set('nutritionPeriodLabel',eyebrow);
  set('nutritionPeriodNote',periodNote);
  set('nutritionFoodTitle',foodPeriod==='week'?'Haftalık özet':foodPeriod==='yesterday'?'Dünün besinleri':'Bugünün besinleri');
  set('nutritionFoodCount',countLabel);
  const summaryCalories=safeNum(summary.calories);
  const summaryProtein=safeNum(summary.protein);
  const summaryWater=safeNum(summary.water);
  set('nutritionSummaryCalories',Math.round(summaryCalories)+' / '+calorieGoal+' kcal');
  set('nutritionSummaryProtein',Math.round(summaryProtein)+' / '+proteinGoal+' g');
  set('nutritionSummaryWater',summaryWater.toFixed(1)+' / '+waterGoal.toFixed(1)+' L');

  const list=$('nutritionFoodList');
  if(list){
    if(foodPeriod==='week'){
      list.innerHTML='<div class="empty-state">Haftalık ortalama, sadece veri girilen günler üzerinden hesaplanıyor.</div>';
    }else if(!foods.length){
      list.innerHTML='<div class="empty-state">'+(foodPeriod==='yesterday'?'Dün için ayrıntılı besin kaydı bulunmuyor.':'Bugün henüz öğün eklenmedi.')+'</div>';
    }else{
      const order=['Kahvaltı','Öğle','Akşam','Ara Öğün'];
      list.innerHTML=order.filter(meal=>foods.some(f=>(f.meal||'Ara Öğün')===meal)).map(meal=>{
        const mealFoods=foods.map((food,index)=>({...food,index})).filter(f=>(f.meal||'Ara Öğün')===meal);
        const totalKcal=Math.round(mealFoods.reduce((n,f)=>n+Number(f.calories||0),0));
        return '<div class="meal-group"><div class="meal-group-head"><strong>'+meal+'</strong><span>'+totalKcal+' kcal</span></div>'+
          mealFoods.map(food=>'<div class="nutrition-food-row"><div><strong>'+food.name+'</strong><small>'+food.amount+' '+food.unit+'</small></div><span>'+Math.round(food.calories)+' kcal<br><small>'+Math.round(food.protein)+' g protein</small></span>'+(foodPeriod==='today'?'<button type="button" data-remove-nutrition="'+food.index+'">×</button>':'')+'</div>').join('')+
        '</div>';
      }).join('');
    }
  }
  if(list)list.querySelectorAll('[data-remove-nutrition]').forEach(btn=>btn.onclick=()=>{
    const index=Number(btn.dataset.removeNutrition);
    const food=state.dailyFoods[index];if(!food)return;
    state.eaten=Math.max(0,state.eaten-safeNum(food.calories));
    state.protein=Math.max(0,state.protein-safeNum(food.protein));
    state.dailyFoods.splice(index,1);
    save();updateDashboard();renderNutritionPage();renderFoods();
  });
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
      save();updateDashboard();renderNutritionPage();renderFoods();
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

function normalizeFoodSearchText(value){
  return String(value||'')
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\\u0300-\\u036f]/g,'')
    .replace(/ı/g,'i')
    .replace(/ğ/g,'g')
    .replace(/ü/g,'u')
    .replace(/ş/g,'s')
    .replace(/ö/g,'o')
    .replace(/ç/g,'c')
    .replace(/[^a-z0-9\\s]/g,' ')
    .replace(/\\s+/g,' ')
    .trim();
}

function getFoodCatalog(){
  const baseFoods=(typeof foods!=='undefined' && Array.isArray(foods))?foods:[];
  const customFoods=Array.isArray(state.customFoods)?state.customFoods:[];
  return [...baseFoods,...customFoods];
}

function searchFood(text){
  const results=$('foodResults');
  if(!results)return;

  const query=normalizeFoodSearchText(text);
  const list=getFoodCatalog();
  const filtered=query
    ? list.filter(food=>{
        const haystack=normalizeFoodSearchText((food.name||'')+' '+(food.unit||''));
        return haystack.includes(query);
      })
    : list;

  results.innerHTML='';

  if(!filtered.length){
    results.innerHTML='<div class="food-search-empty">Bu isimle besin bulunamadı. Farklı bir kelime deneyebilirsin.</div>';
    results.classList.add('food-results-open');
    return;
  }

  results.classList.add('food-results-open');

  const fragment=document.createDocumentFragment();
  filtered.slice(0,80).forEach(food=>{
    const item=document.createElement('button');
    item.type='button';
    item.className='food-search-result';
    item.innerHTML='<span><strong>'+food.name+'</strong><small>'+ (food.unit||'100 g') +'</small></span><span><b>'+food.kcal+' kcal</b><small>'+food.protein+' g protein</small></span>';
    item.onclick=()=>selectFood(food);
    fragment.appendChild(item);
  });
  results.appendChild(fragment);
  if(filtered.length>80){
    const more=document.createElement('div');
    more.className='food-search-empty';
    more.textContent='İlk 80 sonuç gösteriliyor. Daha net arama yapabilirsin.';
    results.appendChild(more);
  }
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
  const results=$('foodResults');
  const search=$('foodSearch');
  if(results){results.innerHTML='';results.classList.remove('food-results-open');}
  if(search){search.value='';search.setAttribute('aria-label','Besin ara');}
  $('foodCalcCard')?.scrollIntoView({behavior:'smooth',block:'nearest'});
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

  const meal=$('foodMeal')?.value||'Ara Öğün';
  state.dailyFoods.push({
    name: result.food.name,
    calories: result.calories,
    protein: result.protein,
    amount: result.amount,
    unit: result.unit,
    meal
  });

  save();
  updateDashboard();
  updateFoodPeriod();
  renderFoods();
  renderNutritionPage();
}


let barcodeStream=null;
let barcodeTimer=null;
let barcodeReaderControls=null;
let barcodeOcrTimer=null;
let barcodeOcrBusy=false;
let lastSmartProduct=null;

function stopBarcodeCamera(){
  if(barcodeTimer){clearTimeout(barcodeTimer);barcodeTimer=null;}
  if(barcodeOcrTimer){clearTimeout(barcodeOcrTimer);barcodeOcrTimer=null;}
  barcodeOcrBusy=false;
  if(barcodeReaderControls){
    try{barcodeReaderControls.stop();}catch(e){}
    barcodeReaderControls=null;
  }
  if(barcodeStream){
    barcodeStream.getTracks().forEach(track=>track.stop());
    barcodeStream=null;
  }
  const video=$('barcodeVideo');
  if(video)video.srcObject=null;
}

function closeSmartFoodModal(){
  stopBarcodeCamera();
  const modal=$('smartFoodModal');
  if(modal){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
  }
  lastSmartProduct=null;
}

function openSmartFoodModal(mode='barcode'){
  const modal=$('smartFoodModal');
  if(!modal)return;
  stopBarcodeCamera();
  const barcode=$('barcodeScannerPanel');
  const photo=$('smartPhotoPanel');
  const result=$('smartFoodResult');
  const title=$('smartFoodTitle');
  const eyebrow=$('smartFoodEyebrow');
  if(result){result.hidden=true;result.innerHTML='';}
  if(mode==='barcode'){
    eyebrow.textContent='AKILLI BESİN EKLE';
    title.textContent='Barkod Tara';
    barcode.hidden=false;
    photo.hidden=true;
  }else{
    eyebrow.textContent=mode==='food'?'FOTOĞRAFTAN BESİN':'ETİKET FOTOĞRAFI';
    title.textContent=mode==='food'?'Yemek Fotoğrafı':'Etiket Fotoğrafı';
    barcode.hidden=true;
    photo.hidden=false;
    const input=$('smartPhotoInput');
    if(input){input.value='';}
    const preview=$('smartPhotoPreview');
    if(preview){preview.hidden=true;preview.removeAttribute('src');}
  }
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');

  if(mode==='barcode'){
    requestAnimationFrame(()=>startBarcodeScanner());
  }
}

function addSmartProductToLog(product){
  if(!product)return;
  const kcal=safeNum(product.kcal100);
  const protein=safeNum(product.protein100);
  if(kcal<=0 && protein<=0){
    alert('Bu üründe kullanılabilir kalori/protein bilgisi bulunamadı.');
    return;
  }

  selectedFood={
    name:product.name,
    kcal,
    protein,
    unit:'100 g',
    source:'Open Food Facts',
    barcode:product.barcode,
    carbs:product.carbs100,
    fat:product.fat100,
    sugar:product.sugar100
  };

  const card=$('foodCalcCard');
  if(card)card.style.display='block';
  if($('selectedFoodName'))$('selectedFoodName').textContent=product.name;
  if($('foodUnit'))$('foodUnit').value='gram';
  if($('foodAmount'))$('foodAmount').value=100;
  calculateFood();
  closeSmartFoodModal();
  $('foodCalcCard')?.scrollIntoView({behavior:'smooth',block:'nearest'});
}

async function lookupBarcode(code){
  const clean=String(code||'').replace(/\D/g,'');
  if(clean.length<8){
    alert('Geçerli bir barkod numarası gir.');
    return false;
  }
  const status=$('barcodeStatus');
  if(status)status.textContent='Ürün aranıyor...';
  try{
    const response=await fetch('https://world.openfoodfacts.org/api/v2/product/'+encodeURIComponent(clean)+'.json?fields=product_name,brands,nutriments,serving_size,quantity,image_url,code');
    if(!response.ok)throw new Error('network');
    const data=await response.json();
    if(Number(data.status)!==1 || !data.product)throw new Error('not-found');
    const p=data.product;
    const n=p.nutriments||{};
    const kcal=safeNum(n['energy-kcal_100g'] ?? n['energy-kcal']);
    const protein=safeNum(n.proteins_100g ?? n.proteins);
    const carbs=safeNum(n.carbohydrates_100g ?? n.carbohydrates);
    const fat=safeNum(n.fat_100g ?? n.fat);
    const sugar=safeNum(n.sugars_100g ?? n.sugars);
    const name=String(p.product_name||p.generic_name||'Barkodlu ürün').trim();
    lastSmartProduct={
      name,
      brand:String(p.brands||'').trim(),
      barcode:clean,
      kcal100:kcal,
      protein100:protein,
      carbs100:carbs,
      fat100:fat,
      sugar100:sugar,
      servingSize:String(p.serving_size||'').trim(),
      quantity:String(p.quantity||'').trim(),
      image:String(p.image_url||'').trim()
    };
    const result=$('smartFoodResult');
    if(result){
      result.hidden=false;
      result.innerHTML='<div class="smart-product-card">'+
        (lastSmartProduct.image?'<img src="'+lastSmartProduct.image+'" alt="">':'')+
        '<div><strong>'+lastSmartProduct.name+'</strong>'+
        (lastSmartProduct.brand?'<small>'+lastSmartProduct.brand+'</small>':'')+
        '<p><b>'+Math.round(kcal)+' kcal</b> • '+protein+' g protein / 100 g</p>'+
        '<small class="smart-source-note">Kaynak: Open Food Facts • Etiket üzerindeki değer farklıysa miktarı/hesabı kontrol edebilirsin.</small>'+
        '<p class="smart-product-macros">Karb. '+carbs+' g • Yağ '+fat+' g • Şeker '+sugar+' g</p>'+
        (lastSmartProduct.servingSize?'<small>Porsiyon: '+lastSmartProduct.servingSize+'</small>':'')+
        '</div></div>'+
        '<button class="primary smart-use-product" id="useSmartProductButton" type="button">Bu Ürünü Kullan</button>';
    }
    const useButton=$('useSmartProductButton');
    if(useButton)useButton.onclick=()=>addSmartProductToLog(lastSmartProduct);
    if(status)status.textContent='Ürün bulundu. Miktarı kontrol et; eklemek için Bu Ürünü Kullan butonuna bas.';
    return true;
  }catch(e){
    if(status)status.textContent='Ürün bulunamadı. Barkodu kontrol edip tekrar dene.';
    return false;
  }
}

async function scanBarcodeDigitsWithOCR(){
  const video=$('barcodeVideo');
  const status=$('barcodeStatus');
  if(!video || video.readyState<2 || barcodeOcrBusy)return;
  barcodeOcrBusy=true;
  try{
    if(!window.Tesseract)throw new Error('ocr-missing');
    const canvas=document.createElement('canvas');
    const width=Math.min(1280,video.videoWidth||1280);
    const height=Math.round(width*0.42);
    canvas.width=width;
    canvas.height=height;
    const ctx=canvas.getContext('2d',{willReadFrequently:true});
    ctx.drawImage(video,0,Math.max(0,(video.videoHeight-height)/2),video.videoWidth,height,0,0,width,height);
    const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',0.88));
    if(!blob)throw new Error('frame');
    const worker=smartOcrWorker||(smartOcrWorker=await Tesseract.createWorker('eng',1));
    const ret=await worker.recognize(blob);
    const digits=String(ret.data?.text||'').replace(/[^0-9]/g,'');
    const candidates=digits.match(/(?:\d{13}|\d{12}|\d{8})/g)||[];
    const code=candidates.find(x=>/^(?:[789]\d{12}|\d{12}|\d{8})$/.test(x));
    if(code){
      if(status)status.textContent='Barkod rakamları okundu: '+code;
      const found=await lookupBarcode(code);
      if(found)stopBarcodeCamera();
      return;
    }
  }catch(e){}finally{
    barcodeOcrBusy=false;
  }
  if(barcodeStream)barcodeOcrTimer=setTimeout(scanBarcodeDigitsWithOCR,900);
}

async function startBarcodeScanner(){
  const video=$('barcodeVideo');
  const status=$('barcodeStatus');
  const button=$('startBarcodeButton');
  if(!video)return;

  stopBarcodeCamera();
  video.setAttribute('playsinline','true');
  video.setAttribute('autoplay','true');
  video.muted=true;
  if(button)button.textContent='⏳ Kamera açılıyor...';
  if(status)status.textContent='Kamera açılıyor...';

  const handleCode=async(code)=>{
    const clean=String(code||'').replace(/[^0-9]/g,'');
    if(clean.length<8)return false;
    if(status)status.textContent='Barkod okundu: '+clean;
    const found=await lookupBarcode(clean);
    if(found){
      stopBarcodeCamera();
      if(button)button.textContent='📷 Kamerayı Aç';
    }else if(status){
      status.textContent='Ürün bulunamadı. Barkodu tekrar kameraya göster...';
    }
    return found;
  };

  try{
    // Önce tarayıcının kendi BarcodeDetector motorunu dene.
    // Chrome/Android tarafında EAN-13/EAN-8 gibi hazır ürün barkodlarında daha hızlıdır.
    if('BarcodeDetector' in window){
      let detector=null;
      try{
        const supported=typeof BarcodeDetector.getSupportedFormats==='function'
          ? await BarcodeDetector.getSupportedFormats()
          : [];
        const wanted=['ean_13','ean_8','upc_a','upc_e','code_128'];
        const formats=supported.length?wanted.filter(x=>supported.includes(x)):wanted;
        detector=new BarcodeDetector({formats:formats.length?formats:undefined});
      }catch(e){detector=null;}

      if(detector){
        barcodeStream=await navigator.mediaDevices.getUserMedia({
          video:{
            facingMode:{ideal:'environment'},
            width:{ideal:1920},
            height:{ideal:1080},
            focusMode:{ideal:'continuous'}
          },
          audio:false
        });
        video.srcObject=barcodeStream;
        await video.play();
        if(button)button.textContent='⏹ Kamerayı Kapat';
        if(status)status.textContent='Barkodu çerçevenin ortasına getir. Otomatik okunacak...';
        barcodeOcrTimer=setTimeout(scanBarcodeDigitsWithOCR,2500);

        const scanNative=async()=>{
          if(!barcodeStream)return;
          try{
            const codes=await detector.detect(video);
            for(const item of codes){
              if(item?.rawValue && await handleCode(item.rawValue))return;
            }
          }catch(e){}
          if(barcodeStream)barcodeTimer=setTimeout(scanNative,120);
        };
        scanNative();
        return;
      }
    }

    // Native motor yoksa ZXing ile sürekli tarama.
    if(window.ZXingBrowser?.BrowserMultiFormatReader){
      const reader=new ZXingBrowser.BrowserMultiFormatReader();
      if(status)status.textContent='ZXing barkod motoru hazırlanıyor...';

      barcodeReaderControls=await reader.decodeFromConstraints(
        {
          video:{
            facingMode:{ideal:'environment'},
            width:{ideal:1920},
            height:{ideal:1080},
            focusMode:{ideal:'continuous'}
          },
          audio:false
        },
        video,
        async(result)=>{
          if(result?.getText)await handleCode(result.getText());
        }
      );

      if(button)button.textContent='⏹ Kamerayı Kapat';
      if(status)status.textContent='Barkodu çerçevenin ortasına getir. Otomatik okunacak...';
      barcodeOcrTimer=setTimeout(scanBarcodeDigitsWithOCR,1800);
      return;
    }

    throw new Error('barcode-engine-missing');
  }catch(e){
    stopBarcodeCamera();
    if(button)button.textContent='📷 Kamerayı Aç';
    if(status)status.textContent='Otomatik barkod motoru başlatılamadı. Barkod numarasını elle girebilirsin.';
  }
}

let smartOcrWorker=null;

function parseNutritionText(text){
  const normalized=String(text||'')
    .replace(/[|]/g,'1')
    .replace(/,/g,'.')
    .replace(/\s+/g,' ')
    .trim();

  const findValue=(patterns)=>{
    for(const pattern of patterns){
      const match=normalized.match(pattern);
      if(match){
        const value=Number(String(match[1]).replace(',','.'));
        if(Number.isFinite(value))return value;
      }
    }
    return 0;
  };

  const kcal=findValue([
    /(?:energy|enerji)[^0-9]{0,30}(\d+(?:\.\d+)?)\s*(?:kcal|kcal)?/i,
    /(\d+(?:\.\d+)?)\s*kcal/i
  ]);
  const protein=findValue([
    /(?:protein|prote[iı]n)[^0-9]{0,30}(\d+(?:\.\d+)?)\s*g?/i
  ]);
  const carbs=findValue([
    /(?:carbohydrate|karbonhidrat)[^0-9]{0,30}(\d+(?:\.\d+)?)\s*g?/i
  ]);
  const fat=findValue([
    /(?:fat|ya[gğ] ?|yağ)[^0-9]{0,30}(\d+(?:\.\d+)?)\s*g?/i
  ]);
  const sugar=findValue([
    /(?:sugars|[sş]eker)[^0-9]{0,30}(\d+(?:\.\d+)?)\s*g?/i
  ]);

  return {kcal,protein,carbs,fat,sugar,text:normalized};
}

const VK_AI_ENDPOINT=String(window.VK_AI_ENDPOINT||'').trim();

function foodCatalogForAi(){
  return [...foods,...(state.customFoods||[])].map((food,index)=>({
    id:index,
    name:String(food.name||''),
    unit:String(food.unit||''),
    kcal:safeNum(food.kcal),
    protein:safeNum(food.protein)
  })).filter(x=>x.name);
}

function imageFileToDataUrl(file){
  return new Promise((resolve,reject)=>{
    const reader=new FileReader();
    reader.onload=()=>{
      const source=new Image();
      source.onload=()=>{
        const maxSide=1600;
        const scale=Math.min(1,maxSide/Math.max(source.naturalWidth,source.naturalHeight));
        const canvas=document.createElement('canvas');
        canvas.width=Math.max(1,Math.round(source.naturalWidth*scale));
        canvas.height=Math.max(1,Math.round(source.naturalHeight*scale));
        const ctx=canvas.getContext('2d');
        ctx.drawImage(source,0,0,canvas.width,canvas.height);
        resolve(canvas.toDataURL('image/jpeg',0.82));
      };
      source.onerror=()=>reject(new Error('Fotoğraf işlenemedi'));
      source.src=String(reader.result||'');
    };
    reader.onerror=()=>reject(reader.error||new Error('Fotoğraf okunamadı'));
    reader.readAsDataURL(file);
  });
}

function aiFoodCatalogText(){
  return foodCatalogForAi().map(x=>x.name+' | birim: '+x.unit).join('\n');
}

function renderAiFoodResults(payload){
  const result=$('smartFoodResult');
  if(!result)return;
  const items=Array.isArray(payload?.items)?payload.items:[];
  if(!items.length){
    result.innerHTML='<div class="smart-ocr-fail"><strong>Yemek bulunamadı.</strong><small>Fotoğrafı biraz daha uzaktan ve tabağın tamamı görünecek şekilde tekrar çek.</small><button class="smart-secondary" id="aiFoodRetryButton" type="button">Tekrar Dene</button></div>';
    $('aiFoodRetryButton').onclick=()=>runFoodPhotoAnalysis(window.__vkSmartPhotoFile);
    return;
  }

  const catalog=foodCatalogForAi();
  const rows=items.map((item,index)=>{
    const food=catalog.find(x=>x.name===String(item.foodName||'').trim())||catalog.find(x=>x.name.toLocaleLowerCase('tr-TR')===String(item.foodName||'').trim().toLocaleLowerCase('tr-TR'));
    if(!food)return null;
    const amount=Math.max(0.1,Number(item.amount)||1);
    const multiplier=food.unit==='100 g'||food.unit==='100 ml' ? amount/100 : amount;
    return {
      index,
      food,
      amount,
      displayUnit:String(item.displayUnit||food.unit),
      multiplier,
      calories:Math.round(food.kcal*multiplier),
      protein:Number((food.protein*multiplier).toFixed(1)),
      confidence:Math.max(0,Math.min(100,Number(item.confidence)||0))
    };
  }).filter(Boolean);

  if(!rows.length){
    result.innerHTML='<div class="smart-ocr-fail"><strong>Yemekler eşleştirilemedi.</strong><small>Fotoğrafı tekrar çek veya Besin Ara bölümünden elle ekle.</small></div>';
    return;
  }

  window.__vkAiFoodRows=rows;
  result.innerHTML='<div class="ai-food-result">'+
    '<div class="ai-food-result-head"><strong>AI yemek analizi</strong><small>Değerler VK LIFE besin listesinden hesaplandı. Tahminleri kontrol et.</small></div>'+
    '<div class="ai-food-items">'+rows.map((row,i)=>
      '<div class="ai-food-item" data-ai-row-id="'+row.index+'">'+
      '<div><strong>'+row.food.name+'</strong><small>'+row.confidence+'% güven • '+row.displayUnit+'</small></div>'+
      '<label>Miktar<input class="ai-food-amount" type="number" min="0.1" step="0.1" value="'+row.amount+'"></label>'+
      '<div class="ai-food-macros"><b class="ai-food-kcal">'+row.calories+' kcal</b><span class="ai-food-protein">'+row.protein+' g protein</span></div>'+
      '<button class="smart-secondary ai-food-remove" type="button">Kaldır</button>'+
      '</div>'
    ).join('')+'</div>'+
    '<div class="ai-food-total" id="aiFoodTotal"></div>'+
    '<button class="primary" id="addAiFoodsButton" type="button">✓ Günlüğe Ekle</button>'+
    '<small class="ai-food-disclaimer">Fotoğraftan porsiyon tahmini yapılır; sonuçlar kesin ölçüm değildir.</small></div>';

  const refresh=()=>{
    const live=[];
    result.querySelectorAll('.ai-food-item').forEach((el,i)=>{
      const rowId=Number(el.dataset.aiRowId);
      const row=window.__vkAiFoodRows.find(x=>x.index===rowId);
      if(!row)return;
      row.amount=Math.max(0.1,Number(el.querySelector('.ai-food-amount')?.value)||1);
      row.multiplier=(row.food.unit==='100 g'||row.food.unit==='100 ml')?row.amount/100:row.amount;
      row.calories=Math.round(row.food.kcal*row.multiplier);
      row.protein=Number((row.food.protein*row.multiplier).toFixed(1));
      el.querySelector('.ai-food-kcal').textContent=row.calories+' kcal';
      el.querySelector('.ai-food-protein').textContent=row.protein+' g protein';
      live.push(row);
    });
    window.__vkAiFoodRows=live;
    const kcal=live.reduce((s,x)=>s+x.calories,0);
    const protein=live.reduce((s,x)=>s+x.protein,0);
    const total=$('aiFoodTotal');
    if(total)total.innerHTML='<strong>Toplam</strong><span>'+Math.round(kcal)+' kcal • '+Math.round(protein)+' g protein</span>';
  };
  result.querySelectorAll('.ai-food-amount').forEach(input=>input.addEventListener('input',refresh));
  result.querySelectorAll('.ai-food-remove').forEach(btn=>btn.addEventListener('click',()=>{btn.closest('.ai-food-item')?.remove();refresh();}));
  $('addAiFoodsButton').onclick=()=>{
    refresh();
    const meal=$('foodMeal')?.value||'Ara Öğün';
    (window.__vkAiFoodRows||[]).forEach(row=>{
      state.dailyFoods.push({
        name:row.food.name,
        amount:row.amount,
        unit:row.displayUnit,
        calories:row.calories,
        protein:row.protein,
        meal
      });
      state.eaten+=row.calories;
      state.protein+=row.protein;
    });
    save();updateDashboard();renderNutritionPage();renderFoods();closeSmartFoodModal();
  };
  refresh();
}

async function runFoodPhotoAnalysis(file){
  const result=$('smartFoodResult');
  if(!result)return;
  window.__vkSmartPhotoFile=file;
  result.hidden=false;
  if(!VK_AI_ENDPOINT){
    result.innerHTML='<div class="smart-ocr-fail"><strong>AI bağlantısı hazır değil.</strong><small>Fotoğraf analizi için güvenli AI sunucu adresi henüz tanımlanmadı. API anahtarını uygulamaya koymadan sunucu tarafında bağlayacağız.</small></div>';
    return;
  }
  result.innerHTML='<div class="smart-ocr-progress"><strong>Yemek analiz ediliyor...</strong><span>Fotoğraftaki yemekler ve porsiyonlar okunuyor.</span></div>';
  try{
    const image=await imageFileToDataUrl(file);
    const response=await fetch(VK_AI_ENDPOINT,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({image,catalog:aiFoodCatalogText()})
    });
    if(!response.ok)throw new Error('AI sunucu hatası');
    const payload=await response.json();
    renderAiFoodResults(payload);
  }catch(e){
    result.innerHTML='<div class="smart-ocr-fail"><strong>AI analizi başarısız.</strong><small>Bağlantıyı kontrol edip fotoğrafı tekrar analiz et.</small><button class="smart-secondary" id="aiFoodRetryButton" type="button">Tekrar Dene</button></div>';
    $('aiFoodRetryButton').onclick=()=>runFoodPhotoAnalysis(window.__vkSmartPhotoFile);
  }
}

async function runNutritionOcr(file){
  const result=$('smartFoodResult');
  if(!result)return;
  result.hidden=false;
  result.innerHTML='<div class="smart-ocr-progress"><strong>Etiket okunuyor...</strong><span id="ocrProgressText">Motor hazırlanıyor</span></div>';

  try{
    if(!window.Tesseract)throw new Error('OCR motoru yüklenemedi');
    if(!smartOcrWorker){
      smartOcrWorker=await Tesseract.createWorker('tur+eng',1,{
        logger:message=>{
          const pct=message.progress?Math.round(message.progress*100):0;
          const el=$('ocrProgressText');
          if(el)el.textContent=(message.status||'İşleniyor')+' '+pct+'%';
        }
      });
    }
    const ret=await smartOcrWorker.recognize(file);
    const parsed=parseNutritionText(ret.data.text);
    const confidence=Math.round(Number(ret.data.confidence)||0);

    if(!parsed.kcal && !parsed.protein && !parsed.carbs && !parsed.fat){
      result.innerHTML='<div class="smart-ocr-fail"><strong>Besin değerleri net okunamadı.</strong><small>Etiketi düz, yakın ve iyi ışıkta tekrar çek. Özellikle “100 g için” tablosu kadraja tamamen girsin.</small><button class="smart-secondary" id="ocrRetryButton" type="button">Tekrar Dene</button></div>';
      $('ocrRetryButton').onclick=()=>{$('smartPhotoInput')?.click();};
      return;
    }

    lastSmartProduct={
      name:'Fotoğraftan okunan ürün',
      barcode:'',
      kcal100:parsed.kcal,
      protein100:parsed.protein,
      carbs100:parsed.carbs,
      fat100:parsed.fat,
      sugar100:parsed.sugar,
      servingSize:'',
      quantity:'',
      image:''
    };

    result.innerHTML='<div class="smart-ocr-result">'+
      '<strong>Okunan değerler</strong>'+
      '<small>OCR güveni: '+confidence+'%</small>'+
      '<div class="ocr-macro-grid">'+
      '<div><b>'+parsed.kcal+'</b><span>kcal</span></div>'+
      '<div><b>'+parsed.protein+'</b><span>protein</span></div>'+
      '<div><b>'+parsed.carbs+'</b><span>karb.</span></div>'+
      '<div><b>'+parsed.fat+'</b><span>yağ</span></div>'+
      '</div>'+
      '<p>Değerler genellikle 100 g / 100 ml etiketi üzerinden okunur. Günlüğe eklemeden önce kontrol et.</p>'+
      '<button class="primary" id="useOcrProductButton" type="button">Değerleri Kullan</button></div>';
    $('useOcrProductButton').onclick=()=>addSmartProductToLog(lastSmartProduct);
  }catch(e){
    result.innerHTML='<div class="smart-ocr-fail"><strong>Etiket okunamadı.</strong><small>Fotoğrafı daha aydınlık ve düz çekip tekrar dene.</small></div>';
  }
}

function handleSmartPhoto(file){
  if(!file)return;
  const preview=$('smartPhotoPreview');
  if(!preview)return;
  const url=URL.createObjectURL(file);
  preview.src=url;
  preview.hidden=false;
  const modeTitle=$('smartFoodTitle')?.textContent||'';
  const result=$('smartFoodResult');
  if(result){
    result.hidden=false;
    result.innerHTML='<div class="smart-photo-ready"><strong>Fotoğraf hazır.</strong><small>'+ (modeTitle==='Etiket Fotoğrafı' ? 'Etiketteki besin değerlerini okumak için analizi başlat.' : 'Yemek fotoğrafı AI analizi için analizi başlat.') +'</small><button class="primary" id="analyzeSmartPhotoButton" type="button">🔎 Analiz Et</button></div>';
    $('analyzeSmartPhotoButton').onclick=()=>{
      if(modeTitle==='Etiket Fotoğrafı') runNutritionOcr(file);
      else runFoodPhotoAnalysis(file);
    };
  }
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
  renderNutritionPage();
  $('newFoodCard').style.display='none';
  $('toggleNewFoodButton').textContent='＋ Yeni Besin';

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
  tabs.forEach((b,i)=>b.classList.toggle('active',['daily','workout','cardio','weight','progress'][i]===filter));
  if(filter==='progress'){
    if(typeof renderWorkoutProgress==='function')renderWorkoutProgress();
    return;
  }

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
    const raw=localStorage.getItem('vk_workout_log_v2');
    let data={logs:[],weights:{},done:{}};
    try{data=raw?JSON.parse(raw):data;}catch(e){}
    if(filter==='workout'){
      const sports=(state.dailySports||[]).filter(x=>x.name==='Ağırlık Antrenmanı').slice().reverse();
      box.innerHTML=sports.length?sports.slice(0,20).map(x=>{
        const id=x.sessionId||'';
        return '<div class="history-item workout-history-row"><strong>🏋️ Ağırlık Antrenmanı</strong><button class="remove-history workout-delete-button" data-delete-workout="'+id+'">Sil</button><br>📅 '+(x.date||'')+' • Gün '+(x.day||'-')+'<br>⏱️ '+(x.duration||0)+' dk • 🏋️ '+(x.sets||0)+' set • 🔥 '+(x.calories||0)+' kcal</div>';
      }).join(''):'<div class="history-item">Henüz tamamlanan antrenman yok.</div>';
      box.querySelectorAll('[data-delete-workout]').forEach(btn=>btn.onclick=()=>{
        if(typeof deleteHistory==='function') deleteHistory(btn.dataset.deleteWorkout);
      });
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
    dayType: state.dayType,
    at: Date.now(),
    foods: Array.isArray(state.dailyFoods) ? state.dailyFoods.map(food=>({...food})) : []
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
    const raw=localStorage.getItem('vk_workout_log_v2');
    const workoutData=raw?JSON.parse(raw):{logs:[],weights:{},done:{}};
    workoutData.done={};
    workoutData.dayResetAt=Date.now();
    workoutData.session=null;
    localStorage.setItem('vk_workout_log_v2',JSON.stringify(workoutData));
  }catch(e){}

  if(typeof resetWorkoutDay==='function')resetWorkoutDay('all');

  save();
  refreshAll();

  alert('Gün kaydedildi. Antrenman ekranı da sıfırlandı.');
}
function resetAllData(){
  if(!confirm('Beslenme, kardiyo, antrenman geçmişi, kilo ve tüm kayıtlar silinsin mi?'))return;
  localStorage.removeItem('vk_yasam_kocu');
  localStorage.removeItem('vk_workout_log_v2');
  // Eski antrenman verisi yeniden migrate edilmesin.
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
  const name = String($('profileName')?.value || '').trim().slice(0,30);
  const calories = safeNum($('profileCalories').value);
  const protein = safeNum($('profileProtein').value);
  const water = safeNum($('profileWater').value);
  const weight = safeNum($('profileWeight').value);

  state.name = name;
  if(calories > 0) state.goals.calories = calories;
  if(protein > 0) state.goals.protein = protein;
  if(water > 0) state.goals.water = water;
  if(weight > 0) state.weight = weight;

  save();
  updateDashboard();

  refreshAll();
  alert('Profil ve hedefler kaydedildi.');
}

function addWater(amount=0.25){
  const ml=Math.max(0,safeNum(amount));
  state.water=Number((state.water+ml).toFixed(2));
  save();
  updateDashboard();
  renderNutritionPage();
}

function normalizeNutritionPageDom(){
  const foodPage=$('foodPage');
  if(!foodPage)return;
  ['toggleNewFoodButton','newFoodCard','nutritionFoodList'].forEach(id=>{
    const el=$(id);
    if(el && !foodPage.contains(el)) foodPage.appendChild(el.closest('.nutrition-food-log')||el);
  });
}

function setupNavigation(){
  const buttons=document.querySelectorAll('[data-page]');
  buttons.forEach(button=>{
    button.addEventListener('click',()=>{
      document.querySelectorAll('.page').forEach(page=>page.classList.remove('active'));
      const page=$(button.dataset.page);
      if(page)page.classList.add('active');
      document.querySelectorAll('.bottom-nav button').forEach(b=>b.classList.toggle('active',b.dataset.page===button.dataset.page));
      window.scrollTo({top:0,behavior:'smooth'});
    });
  });

  const settingsButton=$('settingsHomeButton');
  if(settingsButton){
    settingsButton.addEventListener('click',()=>{
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
function bindFoodSearch(){
  const input=$('foodSearch');
  if(!input)return;
  if(input.dataset.foodSearchBound==='1')return;
  input.dataset.foodSearchBound='1';

  const refresh=()=>{
    searchFood(input.value||'');
    const results=$('foodResults');
    if(results)results.classList.add('food-results-open');
  };

  input.addEventListener('focus',refresh);
  input.addEventListener('click',refresh);
  input.addEventListener('input',refresh);
  input.addEventListener('keyup',refresh);
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





  $('openBarcodeButton')?.addEventListener('click',()=>openSmartFoodModal('barcode'));
  $('openLabelPhotoButton')?.addEventListener('click',()=>openSmartFoodModal('label'));
  document.querySelectorAll('[data-smart-close]').forEach(btn=>btn.addEventListener('click',closeSmartFoodModal));
  $('smartFoodModal')?.addEventListener('click',e=>{if(e.target.id==='smartFoodModal')closeSmartFoodModal();});
  $('startBarcodeButton')?.addEventListener('click',()=>{
    if(barcodeStream){stopBarcodeCamera();$('startBarcodeButton').textContent='📷 Kamerayı Aç';return;}
    startBarcodeScanner();
  });
  $('lookupBarcodeButton')?.addEventListener('click',()=>lookupBarcode($('manualBarcodeInput')?.value||''));
  $('manualBarcodeInput')?.addEventListener('keydown',e=>{if(e.key==='Enter')lookupBarcode(e.target.value);});
  $('smartPhotoInput')?.addEventListener('change',e=>handleSmartPhoto(e.target.files?.[0]));

  const historyTabs=document.querySelectorAll('#historyTabs [data-history-filter]');
  historyTabs.forEach(tab=>{
    tab.addEventListener('click',()=>{
      renderHistory(tab.dataset.historyFilter||'daily');
    });
  });

  const foodTabs=document.querySelectorAll('.food-tabs button');
  foodTabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>{
      foodPeriod=['today','yesterday','week'][index]||'today';
      updateFoodPeriod();
      renderNutritionPage();
    });
  });

  bindFoodSearch();

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

  $('toggleNewFoodButton').addEventListener('click',()=>{
    const form=$('newFoodCard');
    if(!form)return;
    const open=form.style.display!=='none';
    form.style.display=open?'none':'block';
    $('toggleNewFoodButton').textContent=open?'＋ Yeni Besin':'− Yeni Besin';
    if(!open)$('newFoodName')?.focus();
  });

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
      const icons={walk:'🚶',run:'🏃',bike:'🚴'};
      const names={walk:'Bugünkü yürüyüş',run:'Bugünkü koşu',bike:'Bugünkü bisiklet'};
      if($('sportIcon')) $('sportIcon').textContent=icons[type]||'🚶';
      if($('sportHeroLabel')) $('sportHeroLabel').textContent=names[type]||'Bugünkü kardiyo';
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
  waterTargets.forEach(el=>el.addEventListener('click', e=>{
    if(e.target.closest('#homeWaterAddButton')) return;
    addWater();
  }));
  waterTargets.forEach(el=>el.addEventListener('keydown', e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();addWater();}}));
  const homeWaterAddButton=$('homeWaterAddButton');
  if(homeWaterAddButton) homeWaterAddButton.addEventListener('click',e=>{e.stopPropagation();addWater(0.25);});

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
  if($('profileName')) $('profileName').value = state.name || '';
  if($('homeHeaderDate')){
    const d=new Date();
    $('homeHeaderDate').textContent=d.toLocaleDateString('tr-TR',{day:'numeric',month:'long'});
  }
  if($('profileWeight')) $('profileWeight').value = state.weight || '';
  if($('profileCalories')) $('profileCalories').value = state.goals.calories || '';
  if($('profileProtein')) $('profileProtein').value = state.goals.protein || '';
  if($('profileWater')) $('profileWater').value = state.goals.water || '';
  updateDashboard();
  renderFoods();
  updateFoodPeriod();
  renderNutritionPage();
  renderSports();
  renderHistory();
}

normalizeNutritionPageDom();
bindFoodSearch();
setupNavigation();
setupEvents();
setupDayButtons();

refreshAll();
calculateSport();
