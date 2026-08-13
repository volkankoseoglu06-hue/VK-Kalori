let totals = JSON.parse(localStorage.getItem("vkTotals")) || {
    calorie: 0,
    protein: 0,
    carb: 0,
    fat: 0
};

function saveData() {
    localStorage.setItem(
        "vkTotals",
        JSON.stringify(totals)
    );
}

function updateTotals() {

    document.getElementById(
        "totalCalories"
    ).textContent =
        Math.round(totals.calorie);

    document.getElementById(
        "totalProtein"
    ).textContent =
        Math.round(totals.protein);

    document.getElementById(
        "totalCarb"
    ).textContent =
        Math.round(totals.carb);

    document.getElementById(
        "totalFat"
    ).textContent =
        Math.round(totals.fat);

    saveData();
}

document.addEventListener(
    "DOMContentLoaded",
    updateTotals
);

function openPage(pageId) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove(
                "active"
            );

        });

    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.remove(
                "active"
            );

        });

    document
        .getElementById(pageId)
        .classList.add(
            "active"
        );
}

function searchFoods() {

    const text =
        document
            .getElementById(
                "foodSearch"
            )
            .value
            .toLowerCase()
            .trim();

    const results =
        document.getElementById(
            "foodResults"
        );

    results.innerHTML = "";

    if (!text) {

        return;

    }

    const filtered =
        foods.filter(food =>
            food.name
                .toLowerCase()
                .includes(text)
        );

    if (filtered.length === 0) {

        results.innerHTML = `

            <div class="food-item">

                🤔 Bunu mu demek istediniz?

            </div>

            <div class="food-item">

                🍗 Tavuk göğsü

            </div>

            <div class="food-item">

                🥤 Protein tozu

            </div>

            <div class="food-item">

                🥚 Yumurta

            </div>

        `;

        return;
    }

    filtered.forEach(food => {

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

                <button
                    onclick="addFood('${food.name}')">

                    ➕ Öğüne Ekle

                </button>

            </div>

        `;

    });
}

function addFood(foodName) {

    const meal =
        prompt(
            "Öğün seç:\n\nKahvaltı\nÖğle\nAkşam\nAra Öğün"
        );

    if (!meal) {

        return;

    }

    const food =
        foods.find(
            item =>
                item.name === foodName
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

        " " +

        meal +

        " öğününe eklendi."

    );
}
