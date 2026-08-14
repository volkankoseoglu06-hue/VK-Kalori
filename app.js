const $ = (id) => document.getElementById(id);

const state = {
  eaten: 0,
  burned: 0,
  protein: 0,
  water: 0,

  foodList: [],
  sportList: [],
  history: [],

  goals: {
    calories: 2500,
    protein: 170,
    water: 2.5
  }
};

let selectedFood = null;

function save() {
  localStorage.setItem(
    "vkLifeFinal",
    JSON.stringify(state)
  );
}

function load() {
  const data =
    localStorage.getItem(
      "vkLifeFinal"
    );

  if (!data) return;

  Object.assign(
    state,
    JSON.parse(data)
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

  $("today").textContent =
    new Date()
      .toLocaleDateString(
        "tr-TR"
      );
}

load();
updateDashboard();
function searchFoods(text) {
  const results =
    $("foodResults");

  results.innerHTML = "";

  if (text.length < 2) {
    return;
  }

  const allFoods = [
    ...foods,
    ...state.foodList
  ];

  const filtered =
    allFoods.filter((food) =>
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

    item.innerHTML =
      `
      <strong>
      ${food.name}
      </strong>

      <br>

      🔥 ${food.kcal} kcal

      <br>

      🥩 ${food.protein} g

      <br>

      <small>
      ${food.unit}
      </small>
      `;

    item.onclick = () => {
      selectedFood = food;

      $(
        "foodCalcCard"
      ).style.display =
        "block";

      $(
        "selectedFoodName"
      ).textContent =
        food.name;

      calculateFood();
    };

    results.appendChild(
      item
    );
  });
}

function calculateFood() {
  if (!selectedFood) {
    return;
  }

  const amount =
    Number(
      $("foodAmount")
        .value
    );

  const unit =
    $("foodUnit").value;

  let multiplier = 1;

  if (unit === "gram") {
    multiplier =
      amount / 100;
  }

  if (
    unit === "ml"
  ) {
    multiplier =
      amount / 100;
  }

  if (
    unit === "adet"
  ) {
    multiplier =
      amount;
  }

  if (
    unit === "dilim"
  ) {
    multiplier =
      amount;
  }

  if (
    unit === "porsiyon"
  ) {
    multiplier =
      amount;
  }

  if (
    unit === "ölçek"
  ) {
    multiplier =
      amount;
  }

  const calories =
    Math.round(
      selectedFood.kcal *
        multiplier
    );

  const protein =
    Math.round(
      selectedFood.protein *
        multiplier
    );

  $(
    "foodCalculated"
  ).textContent =
    `${calories} kcal / ${protein} g protein`;

  return {
    calories,
    protein
  };
}

$(
  "foodSearch"
).addEventListener(
  "input",
  (e) =>
    searchFoods(
      e.target.value
    )
);

$(
  "foodAmount"
).addEventListener(
  "input",
  calculateFood
);

$(
  "foodUnit"
).addEventListener(
  "change",
  calculateFood
);

$(
  "calculateFoodButton"
).addEventListener(
  "click",
  calculateFood
);

$(
  "addFoodButton"
).addEventListener(
  "click",
  () => {
    if (
      !selectedFood
    ) {
      return;
    }

    const result =
      calculateFood();

    state.eaten +=
      result.calories;

    state.protein +=
      result.protein;

    state.foodList.push({
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
function renderFoods() {
  const container =
    $("dailyFoods");

  container.innerHTML = "";

  state.foodList.forEach(
    (food, index) => {
      const card =
        document.createElement(
          "div"
        );

      card.className =
        "food-item";

      card.innerHTML =
        `
        <strong>
        ${food.name}
        </strong>

        <br>

        🔥 ${food.calories} kcal

        <br>

        🥩 ${food.protein} g

        <br>

        <button class="deleteFood">

        ❌

        </button>
        `;

      card
        .querySelector(
          ".deleteFood"
        )
        .onclick = () => {
          state.eaten -=
            food.calories;

          state.protein -=
            food.protein;

          state.foodList.splice(
            index,
            1
          );

          save();

          updateDashboard();

          renderFoods();
        };

      container.appendChild(
        card
      );
    }
  );
}

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

  $("durationLabel")
    .textContent =
    duration;

  $("speedLabel")
    .textContent =
    speed;

  $("inclineLabel")
    .textContent =
    incline;

  const calories =
    Math.round(
      duration *
        speed *
        (1 +
          incline /
            10)
    );

  $("sportResult")
    .textContent =
    `Yakılan kalori: ${calories} kcal`;

  return calories;
}

function renderSports() {
  const container =
    $("dailySports");

  container.innerHTML = "";

  state.sportList.forEach(
    (sport, index) => {
      const card =
        document.createElement(
          "div"
        );

      card.className =
        "food-item";

      card.innerHTML =
        `
        💪
        ${sport.calories}
        kcal

        <br>

        <button class="deleteSport">

        ❌

        </button>
        `;

      card
        .querySelector(
          ".deleteSport"
        )
        .onclick = () => {
          state.burned -=
            sport.calories;

          state.sportList.splice(
            index,
            1
          );

          save();

          updateDashboard();

          renderSports();
        };

      container.appendChild(
        card
      );
    }
  );
}

$(
  "sportDuration"
).addEventListener(
  "input",
  calculateSport
);

$(
  "sportSpeed"
).addEventListener(
  "input",
  calculateSport
);

$(
  "sportIncline"
).addEventListener(
  "input",
  calculateSport
);

$(
  "calculateSportButton"
).addEventListener(
  "click",
  calculateSport
);

$(
  "addSportButton"
).addEventListener(
  "click",
  () => {
    const calories =
      calculateSport();

    state.burned +=
      calories;

    state.sportList.push(
      {
        calories
      }
    );

    save();

    updateDashboard();

    renderSports();
  }
);
function renderHistory() {
  const list = $("historyList");

  list.innerHTML = "";

  state.history.forEach((item) => {
    const card =
      document.createElement("div");

    card.className =
      "history-item";

    card.innerHTML = item;

    list.appendChild(card);
  });
}

$("waterButton").addEventListener(
  "click",
  () => {
    state.water += 0.25;

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
      const record =
        `
      <strong>

      ${new Date()
        .toLocaleDateString(
          "tr-TR"
        )}

      </strong>

      <br>

      🔥 Alınan:

      ${Math.round(
        state.eaten
      )}

      kcal

      <br>

      💪 Yakılan:

      ${Math.round(
        state.burned
      )}

      kcal

      <br>

      ⚖️ Net:

      ${Math.round(
        state.eaten -
          state.burned
      )}

      kcal

      <br>

      🥩 Protein:

      ${Math.round(
        state.protein
      )}

      g

      <br>

      💧 Su:

      ${state.water.toFixed(
        1
      )}

      L
      `;

      state.history.unshift(
        record
      );

      state.eaten = 0;

      state.burned = 0;

      state.protein = 0;

      state.water = 0;

      state.foodList = [];

      state.sportList = [];

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
    ".bottom-nav button"
  )
  .forEach((button) => {
    button.onclick = () => {
      document
        .querySelectorAll(
          ".page"
        )
        .forEach((page) =>
          page.classList.remove(
            "active"
          )
        );

      $(
        button.dataset.page
      ).classList.add(
        "active"
      );
    };
  });

renderFoods();

renderSports();

renderHistory();

calculateSport();

updateDashboard();
