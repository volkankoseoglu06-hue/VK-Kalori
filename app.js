const $ = (id) => document.getElementById(id);

const state = {
  eaten: 0,
  burned: 0,
  protein: 0,
  water: 0,

  dailyFoods: [],
  dailySports: [],
  history: [],

  goals: {
    calories: 2500,
    protein: 165,
    water: 3
  }
};

let selectedFood = null;

function save() {
  localStorage.setItem(
    "vk_yasam_kocu",
    JSON.stringify(state)
  );
}

function load() {
  const data =
    localStorage.getItem(
      "vk_yasam_kocu"
    );

  if (!data) return;

  const saved =
    JSON.parse(data);

  Object.assign(
    state,
    saved
  );
}

function updateDashboard() {
  const net =
    state.eaten -
    state.burned;

  $("currentCalories").textContent =
    Math.round(net);

  $("currentProtein").textContent =
    Math.round(
      state.protein
    );

  $("currentWater").textContent =
    state.water.toFixed(1);

  $("currentSport").textContent =
    Math.round(
      state.burned
    );

  $("eatenCalories").textContent =
    Math.round(
      state.eaten
    );

  $("burnedCalories").textContent =
    Math.round(
      state.burned
    );

  $("netCalories").textContent =
    Math.round(net);

  $("targetCalories").textContent =
    state.goals.calories;

  $("targetProtein").textContent =
    state.goals.protein;

  $("targetWater").textContent =
    state.goals.water;

  if ($("today")) {
    $("today").textContent =
      new Date()
        .toLocaleDateString(
          "tr-TR"
        );
  }
}

function renderFoods() {
  const container =
    $("dailyFoods");

  if (!container) return;

  container.innerHTML = "";

  state.dailyFoods.forEach(
    (food, index) => {
      const div =
        document.createElement(
          "div"
        );

      div.className =
        "food-item";

      div.innerHTML = `
        <strong>
        ${food.name}
        </strong>

        <br>

        🔥 ${food.calories} kcal

        <br>

        🥩 ${food.protein} g

        <button
        class="remove-food">

        ❌ Sil

        </button>
      `;

      div
        .querySelector(
          ".remove-food"
        )
        .addEventListener(
          "click",
          () => {
            state.eaten -=
              food.calories;

            state.protein -=
              food.protein;

            state.dailyFoods.splice(
              index,
              1
            );

            save();

            updateDashboard();

            renderFoods();
          }
        );

      container.appendChild(
        div
      );
    }
  );
}

function searchFood(text) {
  const results =
    $("foodResults");

  results.innerHTML = "";

  if (text.length < 2) {
    return;
  }

  const filtered =
    foods.filter((food) =>
      food.name
        .toLowerCase()
        .includes(
          text.toLowerCase()
        )
    );

  filtered.forEach((food) => {
    const item =
      document.createElement(
        "div"
      );

    item.className =
      "food-item";

    item.innerHTML = `
      <strong>
      ${food.name}
      </strong>

      <br>

      🔥 ${food.kcal} kcal

      <br>

      🥩 ${food.protein} g

      <br>

      ${food.unit}
    `;

    item.addEventListener(
      "click",
      () => {
        selectedFood =
          food;

        $("foodCalcCard")
          .style.display =
          "block";

        $(
          "selectedFoodName"
        ).textContent =
          food.name;

        calculateFood();
      }
    );

    results.appendChild(
      item
    );
  });
}

function calculateFood() {
  if (!selectedFood)
    return;

  const amount =
    Number(
      $("foodAmount")
        .value
    );

  const unit =
    $("foodUnit").value;

  let factor = 1;

  if (
    unit === "gram" ||
    unit === "ml"
  ) {
    factor =
      amount / 100;
  } else {
    factor = amount;
  }

  const calories =
    Math.round(
      selectedFood.kcal *
        factor
    );

  const protein =
    Math.round(
      selectedFood.protein *
        factor
    );

  $("foodCalculated")
    .textContent =
    `${calories} kcal / ${protein} g protein`;

  return {
    calories,
    protein
  };
}
$("foodSearch").addEventListener(
  "input",
  (e) => {
    searchFood(
      e.target.value
    );
  }
);

$("foodAmount").addEventListener(
  "input",
  calculateFood
);

$("foodUnit").addEventListener(
  "change",
  calculateFood
);

$("calculateFoodButton")
  .addEventListener(
    "click",
    calculateFood
  );

$("addFoodButton")
  .addEventListener(
    "click",
    () => {
      if (!selectedFood)
        return;

      const result =
        calculateFood();

      state.eaten +=
        result.calories;

      state.protein +=
        result.protein;

      state.dailyFoods.push({
        name:
          selectedFood.name,
        calories:
          result.calories,
        protein:
          result.protein
      });

      save();

      updateDashboard();

      renderFoods();
    }
  );

function calculateSport() {
  const duration =
    Number(
      $("sportDuration")
        .value
    );

  const speed =
    Number(
      $("sportSpeed")
        .value
    );

  const incline =
    Number(
      $("sportIncline")
        .value
    );

  $("durationLabel").textContent =
    duration;

  $("speedLabel").textContent =
    speed;

  $("inclineLabel").textContent =
    incline;

  const calories =
    Math.round(
      duration *
        speed *
        (1 +
          incline / 10)
    );

  $("sportResult").textContent =
    `Yakılan kalori: ${calories} kcal`;

  return calories;
}

function renderSports() {
  const container =
    $("dailySports");

  container.innerHTML = "";

  state.dailySports.forEach(
    (sport, index) => {
      const div =
        document.createElement(
          "div"
        );

      div.className =
        "food-item";

      div.innerHTML = `
        💪
        ${sport.calories}
        kcal

        <button
        class="remove-sport">

        ❌ Sil

        </button>
      `;

      div
        .querySelector(
          ".remove-sport"
        )
        .addEventListener(
          "click",
          () => {
            state.burned -=
              sport.calories;

            state.dailySports.splice(
              index,
              1
            );

            save();

            updateDashboard();

            renderSports();
          }
        );

      container.appendChild(
        div
      );
    }
  );
}

$("sportDuration")
  .addEventListener(
    "input",
    calculateSport
  );

$("sportSpeed")
  .addEventListener(
    "input",
    calculateSport
  );

$("sportIncline")
  .addEventListener(
    "input",
    calculateSport
  );

$("calculateSportButton")
  .addEventListener(
    "click",
    calculateSport
  );

$("addSportButton")
  .addEventListener(
    "click",
    () => {
      const calories =
        calculateSport();

      state.burned +=
        calories;

      state.dailySports.push({
        calories
      });

      save();

      updateDashboard();

      renderSports();
    }
  );
function renderHistory() {
  const history =
    $("historyList");

  history.innerHTML = "";

  state.history.forEach(
    (item) => {
      const div =
        document.createElement(
          "div"
        );

      div.className =
        "history-item";

      div.innerHTML =
        item;

      history.appendChild(
        div
      );
    }
  );
}

$("waterButton")
  .addEventListener(
    "click",
    () => {
      state.water +=
        0.25;

      save();

      updateDashboard();
    }
  );

$("saveProfileButton")
  .addEventListener(
    "click",
    () => {
      const calories =
        Number(
          $("profileCalories")
            .value
        );

      const protein =
        Number(
          $("profileProtein")
            .value
        );

      const water =
        Number(
          $("profileWater")
            .value
        );

      if (calories > 0) {
        state.goals.calories =
          calories;
      }

      if (protein > 0) {
        state.goals.protein =
          protein;
      }

      if (water > 0) {
        state.goals.water =
          water;
      }

      save();

      updateDashboard();

      alert(
        "Hedefler kaydedildi."
      );
    }
  );

$("finishDayButton")
  .addEventListener(
    "click",
    () => {
      const net =
        state.eaten -
        state.burned;

      const record =
        `
        <strong>
        ${new Date().toLocaleDateString("tr-TR")}
        </strong>

        <br>

        🔥 Alınan:
        ${Math.round(state.eaten)} kcal

        <br>

        💪 Yakılan:
        ${Math.round(state.burned)} kcal

        <br>

        ⚖️ Net:
        ${Math.round(net)} kcal

        <br>

        🥩 Protein:
        ${Math.round(state.protein)} g

        <br>

        💧 Su:
        ${state.water.toFixed(1)} L
        `;

      state.history.unshift(
        record
      );

      state.eaten = 0;

      state.burned = 0;

      state.protein = 0;

      state.water = 0;

      state.dailyFoods = [];

      state.dailySports = [];

      save();

      updateDashboard();

      renderFoods();

      renderSports();

      renderHistory();

      alert(
        "Gün kaydedildi."
      );
    }
  );

document
  .querySelectorAll(
    ".top-nav button"
  )
  .forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        document
          .querySelectorAll(
            ".page"
          )
          .forEach(
            (page) =>
              page.classList.remove(
                "active"
              )
          );

        $(
          button.dataset.page
        ).classList.add(
          "active"
        );
      }
    );
  });

load();

updateDashboard();

renderFoods();

renderSports();

renderHistory();

calculateSport();
