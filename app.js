/* ==========================
   VK YAŞAM KOÇU - APP.JS
   BÖLÜM 1/3
========================== */

const $ = (id) => document.getElementById(id);

const state = {
  profile: JSON.parse(localStorage.getItem("vk_profile")) || {
    age: "",
    height: "",
    weight: "",
    targetWeight: ""
  },

  totals: JSON.parse(localStorage.getItem("vk_totals")) || {
    calories: 0,
    protein: 0,
    carbs: 0,
    water: 0
  },

  meals: JSON.parse(localStorage.getItem("vk_meals")) || {
    breakfast: [],
    lunch: [],
    dinner: [],
    snack: []
  },

  history: JSON.parse(localStorage.getItem("vk_history")) || [],

  favorites: JSON.parse(localStorage.getItem("vk_favorites")) || []
};

function saveState() {
  localStorage.setItem(
    "vk_profile",
    JSON.stringify(state.profile)
  );

  localStorage.setItem(
    "vk_totals",
    JSON.stringify(state.totals)
  );

  localStorage.setItem(
    "vk_meals",
    JSON.stringify(state.meals)
  );

  localStorage.setItem(
    "vk_history",
    JSON.stringify(state.history)
  );

  localStorage.setItem(
    "vk_favorites",
    JSON.stringify(state.favorites)
  );
}

function showPage(pageId) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  $(pageId).classList.add("active");
}

document.querySelectorAll(".nav-btn").forEach((button) => {
  button.addEventListener("click", () => {
    showPage(button.dataset.page);
  });
});

$("profileBtn").addEventListener("click", () => {
  showPage("profilePage");
});

function updateDate() {
  $("todayDate").textContent =
    new Date().toLocaleDateString("tr-TR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
}

function calculateBMR(weight, height, age) {
  return Math.round(
    10 * weight +
    6.25 * height -
    5 * age +
    5
  );
}

function updateTargets() {
  const weight =
    Number(state.profile.weight) || 0;

  const height =
    Number(state.profile.height) || 0;

  const age =
    Number(state.profile.age) || 0;

  const proteinTarget =
    Math.round(weight * 1.5);

  const waterTarget =
    (weight * 0.035).toFixed(1);

  const calorieTarget =
    calculateBMR(
      weight,
      height,
      age
    );

  const carbTarget =
    Math.round(calorieTarget * 0.45 / 4);

  $("targetCalories").textContent =
    calorieTarget;

  $("targetProtein").textContent =
    proteinTarget;

  $("targetWater").textContent =
    waterTarget;

  $("targetCarbs").textContent =
    carbTarget;

  $("bmrValue").textContent =
    calorieTarget;

  $("proteinGoalValue").textContent =
    proteinTarget;

  $("waterGoalValue").textContent =
    waterTarget;
}

function updateDashboard() {
  $("currentCalories").textContent =
    state.totals.calories;

  $("currentProtein").textContent =
    state.totals.protein;

  $("currentWater").textContent =
    state.totals.water.toFixed(1);

  $("currentCarbs").textContent =
    state.totals.carbs;
}

function updateMealSummary() {
  $("mealSummary").innerHTML = `
    <div>🍳 Kahvaltı:
      ${state.meals.breakfast.length}
    </div>

    <div>🍲 Öğle:
      ${state.meals.lunch.length}
    </div>

    <div>🍽️ Akşam:
      ${state.meals.dinner.length}
    </div>

    <div>☕ Ara Öğün:
      ${state.meals.snack.length}
    </div>
  `;
}

$("saveProfileBtn").addEventListener(
  "click",
  () => {

    state.profile.age =
      $("age").value;

    state.profile.height =
      $("height").value;

    state.profile.weight =
      $("weight").value;

    state.profile.targetWeight =
      $("targetWeight").value;

    saveState();

    updateTargets();

    alert(
      "Profil kaydedildi."
    );
  }
);

$("addWaterBtn").addEventListener(
  "click",
  () => {

    state.totals.water += 0.25;

    saveState();

    updateDashboard();
  }
);

function loadProfile() {
  $("age").value =
    state.profile.age;

  $("height").value =
    state.profile.height;

  $("weight").value =
    state.profile.weight;

  $("targetWeight").value =
    state.profile.targetWeight;
}

updateDate();

loadProfile();

updateTargets();

updateDashboard();

updateMealSummary();
/* ==========================
   VK YAŞAM KOÇU - APP.JS
   BÖLÜM 2/3
========================== */

const foods = [
  {name:"Beyaz peynir",kcal:265,protein:14,carb:4},
  {name:"Kaşar peyniri",kcal:404,protein:25,carb:2},
  {name:"Lor peyniri",kcal:92,protein:18,carb:3},
  {name:"Siyah zeytin",kcal:115,protein:1,carb:6},
  {name:"Yeşil zeytin",kcal:145,protein:1,carb:4},
  {name:"Izgara tavuk",kcal:165,protein:31,carb:0},
  {name:"Tavuk şiş",kcal:190,protein:29,carb:1},
  {name:"Hindi füme",kcal:110,protein:21,carb:2},
  {name:"Dana füme",kcal:185,protein:29,carb:1},
  {name:"Kuru fasulye",kcal:127,protein:9,carb:23},
  {name:"Nohut",kcal:164,protein:9,carb:27},
  {name:"Biber dolması",kcal:150,protein:5,carb:19},
  {name:"Haşlanmış mısır",kcal:96,protein:3,carb:21},
  {name:"Yoğurt",kcal:61,protein:3.5,carb:5},
  {name:"Protein tozu",kcal:120,protein:20,carb:3},
  {name:"Fit browni",kcal:280,protein:22,carb:18},
  {name:"Muz",kcal:89,protein:1,carb:23},
  {name:"Elma",kcal:52,protein:0.3,carb:14},
  {name:"Pilav",kcal:130,protein:2,carb:28},
  {name:"Makarna",kcal:158,protein:6,carb:31}
];

let selectedFood = null;
let calculatedFood = null;

function renderFoodResults(list){

  $("foodResults").innerHTML = "";

  list.forEach(food=>{

    const item = document.createElement("div");

    item.className = "food-item";

    const favorite =
      state.favorites.includes(food.name)
      ? "❤️"
      : "🤍";

    item.innerHTML = `
      <strong>${food.name}</strong><br>
      ${food.kcal} kcal

      <div style="margin-top:10px">

        <button
        class="mini-btn"
        data-food="${food.name}"
        data-action="favorite">

        ${favorite}

        </button>

      </div>
    `;

    item.addEventListener("click",()=>{

      selectedFood = food;

    });

    $("foodResults").appendChild(item);

  });

  document
  .querySelectorAll("[data-action='favorite']")
  .forEach(button=>{

    button.addEventListener("click",(event)=>{

      event.stopPropagation();

      const foodName =
      button.dataset.food;

      if(
        state.favorites.includes(foodName)
      ){

        state.favorites =
        state.favorites.filter(
          item=>item!==foodName
        );

      }else{

        state.favorites.push(foodName);

      }

      saveState();

      renderFoodResults(
        foods
      );

    });

  });

}

renderFoodResults(foods);

$("foodSearch")
.addEventListener("input",()=>{

  const value =
  $("foodSearch")
  .value
  .toLowerCase();

  const filtered =
  foods.filter(food=>

    food.name
    .toLowerCase()
    .includes(value)

  );

  renderFoodResults(filtered);

});

$("calculateFoodBtn")
.addEventListener("click",()=>{

  if(!selectedFood){

    alert(
      "Önce bir besin seç."
    );

    return;

  }

  const amount =
  Number(
    $("foodAmount").value
  );

  const ratio =
  amount/100;

  calculatedFood = {

    name:selectedFood.name,

    kcal:Math.round(
      selectedFood.kcal*ratio
    ),

    protein:Math.round(
      selectedFood.protein*ratio
    ),

    carb:Math.round(
      selectedFood.carb*ratio
    )

  };

  $("foodCalculation")
  .innerHTML = `

    <strong>

    ${calculatedFood.name}

    </strong>

    <br><br>

    🔥 ${calculatedFood.kcal} kcal

    <br>

    🥩 ${calculatedFood.protein} g

    <br>

    🍞 ${calculatedFood.carb} g

  `;

});

$("addFoodBtn")
.addEventListener("click",()=>{

  if(!calculatedFood){

    alert(
      "Önce hesapla."
    );

    return;

  }

  const meal =
  $("mealType").value;

  if(meal==="Kahvaltı"){

    state.meals.breakfast
    .push(calculatedFood);

  }

  if(meal==="Öğle"){

    state.meals.lunch
    .push(calculatedFood);

  }

  if(meal==="Akşam"){

    state.meals.dinner
    .push(calculatedFood);

  }

  if(meal==="Ara Öğün"){

    state.meals.snack
    .push(calculatedFood);

  }

  state.totals.calories +=
  calculatedFood.kcal;

  state.totals.protein +=
  calculatedFood.protein;

  state.totals.carbs +=
  calculatedFood.carb;

  saveState();

  updateDashboard();

  updateMealSummary();

  alert(
    "Besin eklendi."
  );

  calculatedFood = null;

});
/* ==========================
   VK YAŞAM KOÇU - APP.JS
   BÖLÜM 3/3
========================== */

function calculateWalkingCalories() {

  const weight =
    Number(state.profile.weight) || 0;

  const duration =
    Number($("sportDuration").value);

  const speed =
    Number($("sportSpeed").value);

  const incline =
    Number($("sportIncline").value);

  if (!weight) {

    $("sportCalories").textContent =
      "Önce profil bilgilerini gir.";

    return 0;
  }

  const met =
    2.5 +
    (speed * 0.45) +
    (incline * 0.15);

  const hours =
    duration / 60;

  const calories =
    Math.round(
      met *
      weight *
      hours
    );

  $("sportCalories").textContent =
    calories + " kcal";

  return calories;
}

[
  "sportDuration",
  "sportSpeed",
  "sportIncline"
].forEach(id => {

  $(id).addEventListener(
    "input",
    calculateWalkingCalories
  );

});

$("addSportBtn")
.addEventListener(
  "click",
  () => {

    const calories =
      calculateWalkingCalories();

    if (!calories) {
      return;
    }

    alert(
      calories +
      " kcal yakıldı."
    );
  }
);

function renderHistory() {

  const historyList =
    $("historyList");

  historyList.innerHTML =
    "";

  if (
    state.history.length === 0
  ) {

    historyList.innerHTML =
      "Henüz kayıt yok.";

    return;
  }

  state.history
    .slice()
    .reverse()
    .forEach(day => {

      const card =
        document.createElement(
          "div"
        );

      card.className =
        "history-item";

      card.innerHTML = `

        <strong>

        ${day.date}

        </strong>

        <br><br>

        🔥 ${day.calories} kcal

        <br>

        🥩 ${day.protein} g

        <br>

        💧 ${day.water} L

        <br>

        🍞 ${day.carbs} g

      `;

      historyList
        .appendChild(card);

    });

}

$("finishDayBtn")
.addEventListener(
  "click",
  () => {

    state.history.push({

      date:
        new Date()
        .toLocaleDateString(
          "tr-TR"
        ),

      calories:
        state.totals.calories,

      protein:
        state.totals.protein,

      water:
        state.totals.water
        .toFixed(1),

      carbs:
        state.totals.carbs

    });

    state.totals = {

      calories: 0,
      protein: 0,
      carbs: 0,
      water: 0

    };

    state.meals = {

      breakfast: [],
      lunch: [],
      dinner: [],
      snack: []

    };

    saveState();

    updateDashboard();

    updateMealSummary();

    renderHistory();

    alert(
      "Gün geçmişe kaydedildi."
    );

  }
);

renderHistory();

calculateWalkingCalories();

showPage(
  "homePage"
);
