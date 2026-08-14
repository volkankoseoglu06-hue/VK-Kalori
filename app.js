const $ = (id) => document.getElementById(id);

const state = JSON.parse(localStorage.getItem("vkLife")) || {
  eatenCalories: 0,
  burnedCalories: 0,
  protein: 0,
  water: 0,

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

function netCalories() {
  return (
    state.eatenCalories -
    state.burnedCalories
  );
}

function updateDashboard() {
  $("currentCalories").textContent =
    Math.round(netCalories());

  $("currentProtein").textContent =
    Math.round(state.protein);

  $("currentWater").textContent =
    state.water.toFixed(1);

  $("currentSport").textContent =
    Math.round(
      state.burnedCalories
    );

  $("targetCalories").textContent =
    state.goals.calories;

  $("targetProtein").textContent =
    state.goals.protein;

  $("targetWater").textContent =
    state.goals.water;

  $("today").textContent =
    new Date().toLocaleDateString(
      "tr-TR"
    );
}

function searchFoods(text) {
  const results =
    $("foodResults");

  results.innerHTML = "";

  if (text.length < 2) {
    return;
  }

  const list = [
    ...foods,
    ...state.customFoods
  ];

  list
    .filter((food) =>
      food.name
        .toLowerCase()
        .includes(
          text.toLowerCase()
        )
    )
    .forEach((food) => {
      const card =
        document.createElement(
          "div"
        );

      card.className =
        "food-item";

      card.innerHTML = `
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

      <input
      type="number"
      value="1"
      min="0.5"
      step="0.5"
      class="amount">

      <button>

      ➕ Günlüğe Ekle

      </button>
      `;

      const amount =
        card.querySelector(
          ".amount"
        );

      card
        .querySelector(
          "button"
        )
        .addEventListener(
          "click",
          () => {
            const multiplier =
              Number(
                amount.value
              );

            const kcal =
              food.kcal *
              multiplier;

            const protein =
              food.protein *
              multiplier;

            state.eatenCalories +=
              kcal;

            state.protein +=
              protein;

            state.dailyFoods.push({
              name:
                food.name,
              kcal,
              protein
            });

            save();

            updateDashboard();

            renderFoods();
          }
        );

      results.appendChild(
        card
      );
    });
}

function renderFoods() {
  const container =
    $("dailyFoods");

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
      ${food.name}

      <br>

      🔥 ${Math.round(
        food.kcal
      )}

      <br>

      🥩 ${Math.round(
        food.protein
      )}

      <button>

      ❌

      </button>
      `;

      div
        .querySelector(
          "button"
        )
        .addEventListener(
          "click",
          () => {
            state.eatenCalories -=
              food.kcal;

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

$("foodSearch")
  .addEventListener(
    "input",
    (e) =>
      searchFoods(
        e.target.value
      )
  );

$("saveFoodButton")
  .addEventListener(
    "click",
    () => {
      const food = {
        name:
          $("newFoodName")
            .value,

        kcal: Number(
          $(
            "newFoodCalories"
          ).value
        ),

        protein: Number(
          $(
            "newFoodProtein"
          ).value
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
function calculateSport() {
  const duration =
    Number(
      $("sportDuration").value
    );

  const speed =
    Number(
      $("sportSpeed").value
    );

  const incline =
    Number(
      $("sportIncline").value
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
      (1 + incline / 10)
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
      💪 ${sport.calories} kcal

      <button>
      ❌
      </button>
      `;

      div
        .querySelector(
          "button"
        )
        .addEventListener(
          "click",
          () => {
            state.burnedCalories -=
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

      state.burnedCalories +=
        calories;

      state.dailySports.push({
        calories
      });

      save();

      updateDashboard();

      renderSports();
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

function renderHistory() {
  $("historyList").innerHTML =
    state.history.join("");
}

$("finishDayButton")
  .addEventListener(
    "click",
    () => {
      const record = `
      <div class="history-item">

      <strong>
      ${new Date()
        .toLocaleDateString(
          "tr-TR"
        )}
      </strong>

      <br>

      🔥 Alınan:
      ${Math.round(
        state.eatenCalories
      )}

      <br>

      💪 Yakılan:
      ${Math.round(
        state.burnedCalories
      )}

      <br>

      ⚖️ Net:
      ${Math.round(
        netCalories()
      )}

      <br>

      🥩 Protein:
      ${Math.round(
        state.protein
      )} g

      <br>

      💧 Su:
      ${state.water.toFixed(
        1
      )} L

      </div>
      `;

      state.history.unshift(
        record
      );

      state.eatenCalories = 0;

      state.burnedCalories = 0;

      state.protein = 0;

      state.water = 0;

      state.dailyFoods = [];

      state.dailySports = [];

      save();

      renderFoods();

      renderSports();

      renderHistory();

      updateDashboard();

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
    button.addEventListener(
      "click",
      () => {
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
      }
    );
  });

updateDashboard();

renderFoods();

renderSports();

renderHistory();

calculateSport();
