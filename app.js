let totals = {
    calorie: 0,
    protein: 0,
    carb: 0,
    fat: 0
};

let currentMeal = "Kahvaltı";

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

    const gramSelect =
        document.querySelectorAll(
            "#foods select"
        )[0];

    const mealSelect =
        document.querySelectorAll(
            "#foods select"
        )[1];

    const gram =
        parseInt(
            gramSelect.value
        );

    currentMeal =
        mealSelect.value;

    const ratio =
        gram / 100;

    const calorie =
        food.calorie *
        ratio;

    const protein =
        food.protein *
        ratio;

    const carb =
        food.carb *
        ratio;

    const fat =
        food.fat *
        ratio;

    totals.calorie += calorie;

    totals.protein += protein;

    totals.carb += carb;

    totals.fat += fat;

    updateTotals();

    alert(

        food.name +

        "\n\n" +

        currentMeal +

        " öğününe eklendi."

    );

}

function searchFoods() {

    const input =
        document.getElementById(
            "foodSearch"
        );

    const results =
        document.getElementById(
            "foodResults"
        );

    const text =
        input.value
        .toLowerCase();

    results.innerHTML =
        "";

    foods.forEach(
        (
            food,
            index
        ) => {

            if (

                food.name
                .toLowerCase()
                .includes(
                    text
                )

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

<br><br>

<button onclick="addFood(${index})">

➕ Öğüne Ekle

</button>

</div>

`;

            }

        }

    );

}

document.addEventListener(

    "DOMContentLoaded",

    () => {

        updateTotals();

        const input =
            document.getElementById(
                "foodSearch"
            );

        if (input) {

            input.addEventListener(

                "keyup",

                searchFoods

            );

        }

        searchFoods();

    }

);
