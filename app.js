let totals = {
    calorie: 0,
    protein: 0,
    carb: 0,
    fat: 0
};

function openPage(pageId) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove(
                "active"
            );

        });

    document
        .getElementById(pageId)
        .classList.add(
            "active"
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

function addFood(index) {

    const food =
        foods[index];

    totals.calorie +=
        food.calorie;

    totals.protein +=
        food.protein;

    totals.carb +=
        food.carb;

    totals.fat +=
        food.fat;

    updateTotals();

    alert(
        food.name +
        " eklendi."
    );

}

function searchFoods() {

    const text =
        document
        .getElementById(
            "foodSearch"
        )
        .value
        .toLowerCase();

    const results =
        document
        .getElementById(
            "foodResults"
        );

    results.innerHTML =
        "";

    foods.forEach(
        (food,index) => {

        if (
            food.name
            .toLowerCase()
            .includes(text)
        ) {

            results.innerHTML += `

            <div class="food-item">

            <strong>

            ${food.name}

            </strong>

            <br>

            ${food.unit}

            <br>

            🔥 ${food.calorie} kcal

            <br>

            🥩 ${food.protein} g protein

            <br>

            <button onclick="addFood(${index})">

            ➕ Öğüne Ekle

            </button>

            </div>

            `;

        }

    });

}

document.addEventListener(

    "DOMContentLoaded",

    () => {

        updateTotals();

    }

);
