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
