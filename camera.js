function analyzePhoto() {

    const results =
        document.getElementById(
            "analysisResults"
        );

    if (!results) {

        return;

    }

    results.innerHTML = `

<div class="food-item">

🤖 Fotoğraf analiz ediliyor...

</div>

`;

    setTimeout(() => {

        const detectedFoods = [

            {
                name: "Tavuk göğsü",
                amount: "200 g",
                calorie: 330
            },

            {
                name: "Pirinç pilavı",
                amount: "150 g",
                calorie: 195
            },

            {
                name: "Ayran",
                amount: "200 ml",
                calorie: 68
            }

        ];

        let html = "";

        detectedFoods.forEach(food => {

            html += `

<div class="food-item">

<strong>

🍽️ ${food.name}

</strong>

<br>

⚖️ ${food.amount}

<br>

🔥 ${food.calorie} kcal

</div>

`;

        });

        html += `

<button onclick="addPhotoMeal()">

➕ Öğüne Ekle

</button>

`;

        results.innerHTML =
            html;

    }, 1500);

}

function addPhotoMeal() {

    totals.calorie += 593;

    totals.protein += 68;

    totals.carb += 47;

    totals.fat += 10;

    updateTotals();

    alert(

        "Fotoğraftaki öğün eklendi."

    );

}

document.addEventListener(

    "DOMContentLoaded",

    () => {

        const button =
            document.querySelector(
                "#photo button"
            );

        if (button) {

            button.addEventListener(

                "click",

                analyzePhoto

            );

        }

    }

);
