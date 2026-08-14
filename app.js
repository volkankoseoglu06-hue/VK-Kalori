const $ = (id) => document.getElementById(id);

const state =
  JSON.parse(localStorage.getItem("vkLife")) || {
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

function save() {
  localStorage.setItem(
    "vkLife",
    JSON.stringify(state)
  );
}

function showPage(pageId) {
  document
    .querySelectorAll(".page")
    .forEach((page) =>
      page.classList.remove("active")
    );

  $(pageId).classList.add("active");
}

document
  .querySelectorAll(".bottom-nav button")
  .forEach((button) => {
    button.addEventListener("click", () => {
      showPage(button.dataset.page);
    });
  });

function updateDashboard() {
  $("currentCalories").textContent =
    Math.round(state.calories);

  $("targetCalories").textContent =
    state.goals.calories;

  $("currentProtein").textContent =
    Math.round(state.protein);

  $("targetProtein").textContent =
    state.goals.protein;

  $("currentWater").textContent =
    state.water.toFixed(1);

  $("targetWater").textContent =
    state.goals.water;

  $("currentSport").textContent =
    Math.round(state.sport);

  $("today").textContent =
    new Date().toLocaleDateString(
      "tr-TR"
    );
}

function renderFoodResults(keyword = "") {
  const results = $("foodResults");

  results.innerHTML = "";

  const list = [
    ...foods,
    ...state.customFoods
  ];

  list
    .filter((food) =>
      food.name
        .toLowerCase()
        .includes(
          keyword.toLowerCase()
        )
    )
    .forEach((food) => {
      const div =
        document.createElement("div");

      div.className = "food-item";

      div.innerHTML = `
        <strong>${food.name}</strong>
        <br>
        🔥 ${food.kcal} kcal
        <br>
        🥩 ${food.protein} g
        <br><br>
        <button class="small-btn">
        ➕ Ekle
        </button>
      `;

      div
        .querySelector("button")
        .addEventListener(
          "click",
          () => {
            state.calories +=
              food.kcal;

            state.protein +=
              food.protein;

            state.dailyFoods.push(
              food
            );

            save();

            updateDashboard();

            renderDailyFoods();
          }
        );

      results.appendChild(div);
    });
}

function renderDailyFoods() {
  const container =
    $("dailyFoods");

  container.innerHTML = "";

  state.dailyFoods.forEach(
    (food, index) => {
      const div =
        document.createElement("div");

      div.className =
        "food-item";

      div.innerHTML = `
        ${food.name}
        <button
        class="small-btn">
        ❌
        </button>
      `;

      div
        .querySelector("button")
        .addEventListener(
          "click",
          () => {
            state.calories -=
              food.kcal;

            state.protein -=
              food.protein;

            state.dailyFoods.splice(
              index,
              1
            );

            save();

            updateDashboard();

            renderDailyFoods();
          }
        );

      container.appendChild(div);
    }
  );
}

function calculateSport() {
  const duration =
    +$("sportDuration").value;

  const speed =
    +$("sportSpeed").value;

  const incline =
    +$("sportIncline").value;

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
        (1 + incline / 10)
    );

  $("sportResult").textContent =
    `Yakılan kalori: ${calories}`;

  return calories;
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

$("addSportButton")
  .addEventListener(
    "click",
    () => {
      const calories =
        calculateSport();

      state.sport += calories;

      state.dailySports.push(
        calories
      );

      save();

      updateDashboard();
    }
  );

$("waterButton")
  .addEventListener(
    "click",
    () => {
      state.water += 0.25;

      save();

      updateDashboard();
    }
  );

$("foodSearch")
  .addEventListener(
    "input",
    (e) => {
      renderFoodResults(
        e.target.value
      );
    }
  );

$("saveFoodButton")
  .addEventListener(
    "click",
    () => {
      const food = {
        name:
          $("newFoodName").value,

        kcal: Number(
          $("newFoodCalories")
            .value
        ),

        protein: Number(
          $("newFoodProtein")
            .value
        ),

        unit:
          $("newFoodUnit")
            .value
      };

      state.customFoods.push(
        food
      );

      save();

      alert(
        "Besin kaydedildi."
      );
    }
  );

$("saveProfileButton")
  .addEventListener(
    "click",
    () => {
      state.goals.calories =
        Number(
          $("profileCalories")
            .value
        ) || state.goals.calories;

      state.goals.protein =
        Number(
          $("profileProtein")
            .value
        ) || state.goals.protein;

      state.goals.water =
        Number(
          $("profileWater")
            .value
        ) || state.goals.water;

      save();

      updateDashboard();
    }
  );

$("finishDayButton")
  .addEventListener(
    "click",
    () => {
      state.history.unshift(
        `
        <div class="history-item">
        ${new Date().toLocaleDateString(
          "tr-TR"
        )}
        <br>
        🔥 ${state.calories}
        <br>
        🥩 ${state.protein}
        <br>
        💧 ${state.water}
        <br>
        💪 ${state.sport}
        </div>
      `
      );

      state.calories = 0;
      state.protein = 0;
      state.water = 0;
      state.sport = 0;

      state.dailyFoods = [];
      state.dailySports = [];

      save();

      location.reload();
    }
  );

function renderHistory() {
  $("historyList").innerHTML =
    state.history.join("");
}

updateDashboard();

renderDailyFoods();

renderFoodResults();

renderHistory();

calculateSport();
