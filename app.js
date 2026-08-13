let totals = {
  calorie: 0,
  protein: 0,
  carb: 0,
  fat: 0
};

function openPage(pageId) {

  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");
}

function searchFoods() {

  const input =
    document.getElementById("foodSearch")
      .value
      .toLowerCase()
      .trim();

  const results =
    document.getElementById("foodResults");

  results.innerHTML = "";

  if (!input) {
    return;
  }

  const filtered =
    foods.filter(food =>
      food.name.toLowerCase().includes(input)
    );

  if (filtered.length === 0) {

    results.innerHTML = `
      <div class="food-item">
        Bunu mu demek istediniz?

        <div class="suggestion">
          Tavuk göğsü
        </div>

        <div class="suggestion">
          Protein tozu
        </div>

        <div class="suggestion">
          Yumurta
        </div>
      </div>
    `;

    return;
  }

  filtered.forEach(food => {

    results.innerHTML += `

      <div class="food-item">

        <strong>${food.name}</strong>

        <br>

        ${food.unit}

        <br>

        ${food.calorie} kcal

        <br>

        Protein: ${food.protein} g

        <br>

        <button onclick="addFood('${food.name}')">

          Öğüne ekle

        </button>

      </div>

    `;
  });
}

function addFood(foodName) {

  const food =
    foods.find(
      item => item.name === foodName
    );

  if (!food) {
    return;
  }

  totals.calorie += food.calorie;
  totals.protein += food.protein;
  totals.carb += food.carb;
  totals.fat += food.fat;

  updateTotals();

  alert(
    food.name +
    " eklendi."
  );
}

function updateTotals() {

  document.getElementById(
    "totalCalories"
  ).textContent =
    Math.round(
      totals.calorie
    );

  document.getElementById(
    "totalProtein"
  ).textContent =
    Math.round(
      totals.protein
    );

  document.getElementById(
    "totalCarb"
  ).textContent =
    Math.round(
      totals.carb
    );

  document.getElementById(
    "totalFat"
  ).textContent =
    Math.round(
      totals.fat
    );
}

function askAI() {

  const question =
    document.getElementById(
      "aiQuestion"
    ).value;

  const answer =
    document.getElementById(
      "aiAnswer"
    );

  if (!question) {
    return;
  }

  answer.innerHTML =
    `
      Günlük protein hedefin
      150 g olabilir.

      Daha ayrıntılı yapay zeka
      entegrasyonu sonraki
      sürümde eklenecek.
    `;
}
