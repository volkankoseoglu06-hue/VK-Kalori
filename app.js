let totals = {
    calorie: 0,
    protein: 0,
    carb: 0,
    fat: 0
};

let meals = {
    breakfast: [],
    lunch: [],
    dinner: [],
    snack: []
};

function openPage(pageId) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active");

        });

    document
        .getElementById(pageId)
        .classList.add("active");

}

function searchFoods() {

    const searchText =
        document
            .getElementById("foodSearch")
            .value
            .toLowerCase()
            .trim();

    const results =
        document
            .getElementById("foodResults");

    results.innerHTML = "";

    if (!searchText) {

        return;

    }

    const filteredFoods =
        foods.filter(food =>

            food.name
                .toLowerCase()
                .includes(searchText)

        );

    if (filteredFoods.length === 0) {

        results.innerHTML = `

            <div class="food-item">

                🤔 Bunu mu demek istediniz?

            </div>

            <div class="food-item">

                🥩 Tavuk göğsü

            </div>

            <div class="food-item">

                🥚 Yumurta

            </div>

            <div class="food-item">

                🥤 Protein tozu

            </div>

        `;

        return;

    }

    filteredFoods.forEach(food => {

        results.innerHTML += `

            <div class="food-item">

                <h3>

                    ${food.name}

                </h3>

                <p>

                    ${food.unit}

                </p>

                <p>

                    🔥 ${food.calorie} kcal

                </p>

                <p>

                    🥩 ${food.protein} g protein

                </p>

                <button
                    onclick="addFood('${food.name}')">

                    ➕ Öğüne Ekle

                </button>

            </div>

        `;

    });

}

function addFood(foodName) {

    const selectedFood =
        foods.find(

            food =>
                food.name === foodName

        );

    if (!selectedFood) {

        return;

    }

    totals.calorie += selectedFood.calorie;

    totals.protein += selectedFood.protein;

    totals.carb += selectedFood.carb;

    totals.fat += selectedFood.fat;

    updateTotals();

    alert(

        selectedFood.name +

        " eklendi."

    );

}

function updateTotals() {

    document
        .getElementById("totalCalories")
        .textContent =
        Math.round(
            totals.calorie
        );

    document
        .getElementById("totalProtein")
        .textContent =
        Math.round(
            totals.protein
        );

    document
        .getElementById("totalCarb")
        .textContent =
        Math.round(
            totals.carb
        );

    document
        .getElementById("totalFat")
        .textContent =
        Math.round(
            totals.fat
        );

}

function analyzePhoto() {

    const analysis =
        document
            .getElementById(
                "analysisResults"
            );

    analysis.innerHTML = `

        <div class="food-item">

            🍗 Tavuk göğsü
            - 200 g

        </div>

        <div class="food-item">

            🍚 Pirinç pilavı
            - 150 g

        </div>

        <div class="food-item">

            🥛 Ayran
            - 200 ml

        </div>

        <div class="food-item">

            🔥 Toplam:

            740 kcal

        </div>

    `;

}

function askAI() {

    const question =
        document
            .getElementById(
                "aiQuestion"
            )
            .value;

    const answer =
        document
            .getElementById(
                "aiAnswer"
            );

    if (!question) {

        return;

    }

    answer.innerHTML = `

        <strong>

            VK AI

        </strong>

        <br><br>

        Sorun:

        ${question}

        <br><br>

        Günlük protein
        hedefin 150 g.

    `;

}
