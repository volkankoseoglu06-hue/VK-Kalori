const $ = id => document.getElementById(id);

const DEFAULTS = {
  eaten: 0,
  burned: 0,
  protein: 0,
  water: 0,
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

function netCalories(){
  return state.eaten - state.burned;
}

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

function renderFoods(){
  const box = $('dailyFoods');
  if(!box) return;

  box.innerHTML = '';

  if(!state.dailyFoods.length){
    box.innerHTML = '<div class="food-item">Henüz besin eklenmedi.</div>';
    return;
  }

  state.dailyFoods.forEach((food,index)=>{
    const div = document.createElement('div');
    div.className = 'food-item';

    div.innerHTML = `
      <strong>${food.name}</strong>
      <br>
      ⚖️ ${food.amount} ${food.unit}
      <br>
      🔥 ${Math.round(food.calories)} kcal
      <br>
      🥩 ${Math.round(food.protein)} g
      <button class="remove-food">❌ Sil</button>
    `;

    div.querySelector('.remove-food').onclick = ()=>{
      state.eaten = Math.max(0, state.eaten - safeNum(food.calories));
      state.protein = Math.max(0, state.protein - safeNum(food.protein));
      state.dailyFoods.splice(index,1);
      save();
      updateDashboard();
      renderFoods();
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

    div.innerHTML = `
      <strong>💪 ${sport.name}</strong>
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
    results.innerHTML = '<div class="food-item">Besin bulunamadı. Yeni besin ekleyebilirsin.</div>';
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

function renderHistory(){
  const box = $('historyList');
  if(!box) return;

  box.innerHTML = '';

  if(!state.history.length){
    box.innerHTML =
      '<div class="history-item">Henüz geçmiş kaydı yok.</div>';
    return;
  }

  state.history.forEach((item,index)=>{
    const div = document.createElement('div');
    div.className = 'history-item';

    div.innerHTML = `
      <strong>${item.date}</strong>
      <br>
      🔥 Alınan: ${item.eaten} kcal
      <br>
      💪 Yakılan: ${item.burned} kcal
      <br>
      ⚖️ Net: ${item.net} kcal
      <br>
      🥩 Protein: ${item.protein} g
      <br>
      💧 Su: ${item.water} L
      <button class="remove-history">❌ Sil</button>
    `;

    div.querySelector('.remove-history').onclick = ()=>{
      state.history.splice(index,1);
      save();
      renderHistory();
    };

    box.appendChild(div);
  });
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

  save();
  refreshAll();

  alert('Gün kaydedildi.');
}

function saveProfile(){
  const calories = safeNum($('profileCalories').value);
  const protein = safeNum($('profileProtein').value);
  const water = safeNum($('profileWater').value);

  if(calories > 0) state.goals.calories = calories;
  if(protein > 0) state.goals.protein = protein;
  if(water > 0) state.goals.water = water;

  save();
  updateDashboard();

  alert('Hedefler kaydedildi.');
}

function addWater(){
  state.water = Number((state.water + 0.25).toFixed(2));
  save();
  updateDashboard();
}

function setupNavigation(){
  document.querySelectorAll('.top-nav button').forEach(button=>{
    button.addEventListener('click', ()=>{
      document.querySelectorAll('.page').forEach(page=>{
        page.classList.remove('active');
      });

      const page = $(button.dataset.page);

      if(page){
        page.classList.add('active');
      }
    });
  });
}

function setupDayButtons(){
  $('normalDayBtn').addEventListener('click', ()=>{
    setDayType('normal');
  });

  $('sportDayBtn').addEventListener('click', ()=>{
    setDayType('sport');
  });
}

function setupEvents(){

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

  $('calculateSportButton').addEventListener(
    'click',
    calculateSport
  );

  $('addSportButton').addEventListener(
    'click',
    addSport
  );

  $('waterButton').addEventListener(
    'click',
    addWater
  );

  $('finishDayButton').addEventListener(
    'click',
    finishDay
  );

  $('saveProfileButton').addEventListener(
    'click',
    saveProfile
  );
}

function refreshAll(){
  updateDashboard();
  renderFoods();
  renderSports();
  renderHistory();
}

setupNavigation();
setupEvents();
setupDayButtons();

refreshAll();
calculateSport();
