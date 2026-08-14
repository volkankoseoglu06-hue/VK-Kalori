const $ = (id) => document.getElementById(id);

const storage = JSON.parse(localStorage.getItem("vkLife"));

const state = storage || {
  calories: 0,
  protein: 0,
  water: 0,
  sport: 0,

  goals: {
    calories: 2500,
    protein: 165,
    water: 3
  },

  dailyFoods: [],
  dailySports: [],
  customFoods: [],
  history: []
};

function saveState() {
  localStorage.setItem(
    "vkLife",
    JSON.stringify(state)
  );
}

function updateDashboard() {
  $("currentCalories").textContent =
    state.calories;

  $("targetCalories").textContent =
    state.goals.calories;

  $("currentProtein").textContent =
    state.protein;

  $("targetProtein").textContent =
    state.goals.protein;

  $("currentWater").textContent =
    state.water.toFixed(1);

  $("targetWater").textContent =
    state.goals.water;

  $("currentSport").textContent =
    state.sport;
}

function renderDailyFoods() {
  const container =
    $("dailyFoods");

  container.innerHTML = "";

  if (
    state.dailyFoods.length === 0
  ) {
    container.innerHTML =
      "<p>Henüz besin eklenmedi.</p>";

    return;
  }

  state.dailyFoods.forEach(
    (food, index) => {
      const item =
        document.createElement("div");

      item.className =
        "food-item";

      item.innerHTML = `
        <strong>${food.name}</strong><br>
        🔥 ${food.kcal} kcal<br>
        🥩 ${food.protein} g

        <div class="food-actions">
          <button
            class="small-btn"
            onclick="removeFood(${index})">
            ❌ Sil
          </button>
        </div>
      `;

      container.appendChild(
        item
      );
    }
  );
}

window.removeFood =
  function (index) {
    const food =
      state.dailyFoods[index];

    state.calories -=
      food.kcal;

    state.protein -=
      food.protein;

    state.dailyFoods.splice(
      index,
      1
    );

    saveState();

    refresh();
  };

function renderDailySports() {
  const container =
    $("dailySports");

  container.innerHTML = "";

  if (
    state.dailySports.length === 0
  ) {
    return;
  }

  state.dailySports.forEach(
    (sport, index) => {
      const item =
        document.createElement(
          "div"
        );

      item.className =
        "food-item";

      item.innerHTML = `
        💪 ${sport} kcal

        <div class="food-actions">
          <button
            class="small-btn"
            onclick="removeSport(${index})">
            ❌ Sil
          </button>
        </div>
      `;

      container.appendChild(
        item
      );
    }
  );
}

window.removeSport =
  function (index) {
    state.sport -=
      state.dailySports[index];

    state.dailySports.splice(
      index,
      1
    );

    saveState();

    refresh();
  };

function refresh() {
  updateDashboard();

  renderDailyFoods();

  renderDailySports();
}
/* BESİN ARAMA */

function renderFoodResults(keyword = "") {
  const container = $("foodResults");

  if (!container) return;

  container.innerHTML = "";

  const allFoods = [
    ...foods,
    ...state.customFoods
  ];

  const filtered = allFoods.filter((food) =>
    food.name
      .toLowerCase()
      .includes(keyword.toLowerCase())
  );

  filtered.forEach((food) => {
    const item =
      document.createElement("div");

    item.className = "food-item";

    const kcal =
      food.kcal || food.k;

    const protein =
      food.protein || food.p;

    const unit =
      food.unit || "adet";

    item.innerHTML = `
      <strong>${food.name}</strong><br>

      🔥 ${kcal} kcal<br>

      🥩 ${protein} g<br>

      📏 ${unit}<br>

      <div class="food-actions">

        <button
          class="small-btn"
          onclick="addFood(
            '${food.name}',
            ${kcal},
            ${protein}
          )">

          ➕ Ekle

        </button>

      </div>
    `;

    container.appendChild(item);
  });
}

window.addFood = function (
  name,
  kcal,
  protein
) {
  state.calories += kcal;

  state.protein += protein;

  state.dailyFoods.push({
    name,
    kcal,
    protein
  });

  saveState();

  refresh();
};

if ($("foodSearch")) {
  $("foodSearch").addEventListener(
    "input",
    (e) => {
      renderFoodResults(
        e.target.value
      );
    }
  );
}

/* YENİ BESİN EKLEME */

if ($("saveFoodButton")) {
  $("saveFoodButton").addEventListener(
    "click",
    () => {
      const name =
        $("newFoodName").value;

      const kcal =
        Number(
          $("newFoodCalories")
            .value
        );

      const protein =
        Number(
          $("newFoodProtein")
            .value
        );

      const unit =
        $("newFoodUnit").value;

      if (!name) {
        return;
      }

      state.customFoods.push({
        name,
        kcal,
        protein,
        unit
      });

      $("newFoodName").value =
        "";

      $("newFoodCalories").value =
        "";

      $("newFoodProtein").value =
        "";

      saveState();

      renderFoodResults();
    }
  );
}

/* SU EKLEME */

if ($("waterButton")) {
  $("waterButton").addEventListener(
    "click",
    () => {
      state.water += 0.25;

      saveState();

      refresh();
    }
  );
}

/* HEDEFLER */

if ($("saveProfileButton")) {
  $("saveProfileButton")
    .addEventListener(
      "click",
      () => {
        state.goals.calories =
          Number(
            $("profileCalories")
              .value
          ) ||
          state.goals.calories;

        state.goals.protein =
          Number(
            $("profileProtein")
              .value
          ) ||
          state.goals.protein;

        state.goals.water =
          Number(
            $("profileWater")
              .value
          ) ||
          state.goals.water;

        saveState();

        refresh();

        alert(
          "Hedefler kaydedildi."
        );
      }
    );
}

renderFoodResults();

refresh();
/* SPOR */

function calculateSport() {
  const duration =
    Number($("sportDuration").value);

  const speed =
    Number($("sportSpeed").value);

  const incline =
    Number($("sportIncline").value);

  $("durationLabel").textContent =
    duration;

  $("speedLabel").textContent =
    speed;

  $("inclineLabel").textContent =
    incline;

  const calories = Math.round(
    duration * speed * (1 + incline / 10)
  );

  $("sportResult").textContent =
    "Yakılan kalori: " +
    calories +
    " kcal";

  return calories;
}

if ($("sportDuration")) {
  $("sportDuration").addEventListener(
    "input",
    calculateSport
  );

  $("sportSpeed").addEventListener(
    "input",
    calculateSport
  );

  $("sportIncline").addEventListener(
    "input",
    calculateSport
  );
}

if ($("calculateSportButton")) {
  $("calculateSportButton")
    .addEventListener(
      "click",
      calculateSport
    );
}

if ($("addSportButton")) {
  $("addSportButton").addEventListener(
    "click",
    () => {
      const calories =
        calculateSport();

      state.sport += calories;

      state.dailySports.push(
        calories
      );

      saveState();

      refresh();
    }
  );
}

/* GÜNÜ BİTİR */

if ($("finishDayButton")) {
  $("finishDayButton")
    .addEventListener(
      "click",
      () => {
        const today =
          new Date().toLocaleDateString(
            "tr-TR"
          );

        state.history.unshift(`
          <div class="history-item">

            <strong>${today}</strong>

            <br>

            🔥 ${state.calories} kcal

            <br>

            🥩 ${state.protein} g

            <br>

            💧 ${state.water.toFixed(
              1
            )} L

            <br>

            💪 ${state.sport} kcal

          </div>
        `);

        state.calories = 0;
        state.protein = 0;
        state.water = 0;
        state.sport = 0;

        state.dailyFoods = [];
        state.dailySports = [];

        saveState();

        renderHistory();

        refresh();

        alert(
          "Gün geçmişe kaydedildi."
        );
      }
    );
}

/* GEÇMİŞ */

function renderHistory() {
  const history =
    $("historyList");

  if (!history) return;

  history.innerHTML =
    state.history.join("");
}

/* MENÜ */

document
  .querySelectorAll(
    ".bottom-nav button"
  )
  .forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        document
          .querySelectorAll(".page")
          .forEach((page) => {
            page.classList.remove(
              "active"
            );
          });

        $(
          button.dataset.page
        ).classList.add(
          "active"
        );
      }
    );
  });

/* BAŞLANGIÇ */

calculateSport();

renderFoodResults();

renderHistory();

refresh();
