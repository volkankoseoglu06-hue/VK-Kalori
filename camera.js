function analyzePhoto() {

    const results =
        document.getElementById(
            "analysisResults"
        );

    results.innerHTML =

    `
    <p>

    🤖 Fotoğraf analiz ediliyor...

    </p>
    `;

    setTimeout(() => {

        results.innerHTML =

        `

        <div class="meal-item">

        <div>

        🍗 Tavuk göğsü

        <br>

        200 g

        <br>

        🔥 330 kcal

        </div>

        </div>

        <div class="meal-item">

        <div>

        🍚 Pirinç pilavı

        <br>

        150 g

        <br>

        🔥 195 kcal

        </div>

        </div>

        <div class="meal-item">

        <div>

        🥛 Ayran

        <br>

        200 ml

        <br>

        🔥 68 kcal

        </div>

        </div>

        <button onclick="addPhotoMeal()">

        ➕ Öğüne Ekle

        </button>

        `;

    }, 1500);

}

function addPhotoMeal() {

    totals.calorie += 593;

    totals.protein += 68;

    totals.carb += 47;

    totals.fat += 11;

    updateDashboard();

    alert(
        "Öğün eklendi."
    );

}
