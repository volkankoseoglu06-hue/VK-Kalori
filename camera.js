document.addEventListener("DOMContentLoaded", () => {

    const photoInput = document.querySelector(
        'input[type="file"]'
    );

    const analyzeButton = document.querySelector(
        "#photo button"
    );

    if (!photoInput || !analyzeButton) {
        return;
    }

    analyzeButton.addEventListener(
        "click",
        analyzePhoto
    );

});

function analyzePhoto() {

    const fileInput =
        document.querySelector(
            'input[type="file"]'
        );

    const results =
        document.getElementById(
            "analysisResults"
        );

    if (!fileInput.files.length) {

        alert(
            "Önce bir fotoğraf seç."
        );

        return;
    }

    results.innerHTML = `

        <div class="food-item">

            🤖 Analiz ediliyor...

        </div>

    `;

    setTimeout(() => {

        const detectedFoods = [

            {
                name: "Tavuk göğsü",
                amount: "220 g",
                calorie: 363
            },

            {
                name: "Pirinç pilavı",
                amount: "180 g",
                calorie: 234
            },

            {
                name: "Ayran",
                amount: "200 ml",
                calorie: 68
            }

        ];

        let totalCalories = 0;

        let html = "";

        detectedFoods.forEach(food => {

            totalCalories += food.calorie;

            html += `

                <div class="food-item">

                    <strong>

                        ${food.name}

                    </strong>

                    <br>

                    ⚖️ ${food.amount}

                    <br>

                    🔥 ${food.calorie} kcal

                </div>

            `;

        });

        html += `

            <div class="food-item">

                <strong>

                    🔥 Toplam:

                    ${totalCalories} kcal

                </strong>

            </div>

        `;

        results.innerHTML = html;

    }, 1500);

}

function addAnalyzedMeal() {

    alert(

        "Öğün kaydedildi."

    );

}
