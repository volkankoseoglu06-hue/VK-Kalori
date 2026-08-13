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

    const selectedPage =
        document.getElementById(
            pageId
        );

    if (selectedPage) {

        selectedPage.classList.add(
            "active"
        );

    }

}

function updateDashboard() {

    const calorie =
        document.getElementById(
            "calorieValue"
        );

    const protein =
        document.getElementById(
            "proteinValue"
        );

    const carb =
        document.getElementById(
            "carbValue"
        );

    const fat =
        document.getElementById(
            "fatValue"
        );

    const remaining =
        document.getElementById(
            "remainingCalories"
        );

    if (calorie) {

        calorie.textContent =
            Math.round(
                totals.calorie
            );

    }

    if (protein) {

        protein.textContent =
            Math.round(
                totals.protein
            );

    }

    if (carb) {

        carb.textContent =
            Math.round(
                totals.carb
            );

    }

    if (fat) {

        fat.textContent =
            Math.round(
                totals.fat
            );

    }

    if (remaining) {

        remaining.textContent =
            1900 -
            Math.round(
                totals.calorie
            ) + " kcal";

    }

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

    updateDashboard();

    alert(
        food.name +
        " eklendi."
    );

}

function searchFoods() {

    const search =
        document
        .getElementById(
            "foodSearch"
        );

    if (!search) {

        return;

    }

    const text =
        search.value
        .toLowerCase();

    const results =
        document
        .getElementById(
            "foodResults"
        );

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

<div class="meal-item">

<div>

<strong>

${food.name}

</strong>

<br>

${food.unit}

<br>

🔥 ${food.calorie} kcal

</div>

<button onclick="addFood(${index})">

+

</button>

</div>

`;

            }

        }
    );

}

document.addEventListener(
    "DOMContentLoaded",
    updateDashboard
);
