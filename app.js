const $ = (id) => document.getElementById(id);

let selectedFood = null;
let calculatedFood = null;

let sportDay = true;

let totals = JSON.parse(localStorage.getItem("vkTotals")) || {
    calories: 0,
    protein: 0,
    carbs: 0,
    water: 0
};

let meals = JSON.parse(localStorage.getItem("vkMeals")) || {
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    snack: 0
};

let favorites = JSON.parse(localStorage.getItem("vkFavorites")) || [];

let history = JSON.parse(localStorage.getItem("vkHistory")) || [];

let weights = JSON.parse(localStorage.getItem("vkWeights")) || [];

let targets = JSON.parse(localStorage.getItem("vkTargets")) || {
    calories: 2200,
    protein: 165,
    carbs: 220,
    water: 3.5
};

function saveAll() {

    localStorage.setItem(
        "vkTotals",
        JSON.stringify(totals)
    );

    localStorage.setItem(
        "vkMeals",
        JSON.stringify(meals)
    );

    localStorage.setItem(
        "vkFavorites",
        JSON.stringify(favorites)
    );

    localStorage.setItem(
        "vkHistory",
        JSON.stringify(history)
    );

    localStorage.setItem(
        "vkWeights",
        JSON.stringify(weights)
    );

    localStorage.setItem(
        "vkTargets",
        JSON.stringify(targets)
    );
}

$("todayDate").textContent =
    new Date().toLocaleDateString(
        "tr-TR",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

function updateDashboard() {

    $("calorieText").textContent =
        totals.calories +
        " / " +
        targets.calories;

    $("proteinText").textContent =
        totals.protein +
        " / " +
        targets.protein;

    $("waterText").textContent =
        totals.water.toFixed(1) +
        " / " +
        targets.water;

    $("carbText").textContent =
        totals.carbs +
        " / " +
        targets.carbs;

    $("breakfastCount").textContent =
        meals.breakfast;

    $("lunchCount").textContent =
        meals.lunch;

    $("dinnerCount").textContent =
        meals.dinner;

    $("snackCount").textContent =
        meals.snack;
}

updateDashboard();

$("addWater").onclick = () => {

    totals.water += 0.25;

    saveAll();

    updateDashboard();
};

function renderFoods(list) {

    $("foodResults").innerHTML = "";

    list.forEach(food => {

        const div =
            document.createElement("div");

        div.className =
            "food-item";

        const favorite =
            favorites.includes(food.name)
                ? "❤️"
                : "🤍";

        div.innerHTML =
            "<strong>" +
            food.name +
            "</strong><br>" +
            food.unit +
            " • " +
            food.kcal +
            " kcal<br>" +
            favorite;

        div.onclick = () => {

            selectedFood = food;
        };

        $("foodResults")
            .appendChild(div);
    });
}

$("foodSearch").addEventListener(
    "input",
    function () {

        const value =
            this.value
                .trim()
                .toLowerCase();

        if (value.length < 2) {

            $("foodResults")
                .innerHTML = "";

            return;
        }

        const filtered =
            foods.filter(food =>
                food.name
                    .toLowerCase()
                    .includes(value)
            );

        renderFoods(filtered);
    }
);

$("calculateFood").onclick =
    () => {

        if (!selectedFood) {

            alert(
                "Besin seç."
            );

            return;
        }

        const amount =
            Number(
                $("foodAmount")
                    .value
            );

        const ratio =
            amount /
            selectedFood.gram;

        calculatedFood = {

            name:
                selectedFood.name,

            kcal:
                Math.round(
                    selectedFood.kcal *
                    ratio
                ),

            protein:
                Math.round(
                    selectedFood.protein *
                    ratio
                ),

            carbs:
                Math.round(
                    selectedFood.carb *
                    ratio
                )
        };

        $("foodCalculation")
            .innerHTML =

            "🔥 " +
            calculatedFood.kcal +
            " kcal<br>" +

            "🥩 " +
            calculatedFood.protein +
            " g protein<br>" +

            "🍞 " +
            calculatedFood.carbs +
            " g karbonhidrat";
    };

$("addFood").onclick =
    () => {

        if (!calculatedFood) {

            alert(
                "Önce hesapla."
            );

            return;
        }

        totals.calories +=
            calculatedFood.kcal;

        totals.protein +=
            calculatedFood.protein;

        totals.carbs +=
            calculatedFood.carbs;

        const meal =
            $("mealSelect")
                .value;

        meals[meal]++;

        saveAll();

        updateDashboard();

        alert(
            "Besin eklendi."
        );
    };

function calculateSport() {

    const duration =
        Number(
            $("duration")
                .value
        );

    const speed =
        Number(
            $("speed")
                .value
        );

    const incline =
        Number(
            $("incline")
                .value
        );

    const calories =
        Math.round(
            (duration / 60) *
            (50 + speed * incline)
        );

    $("sportCalories")
        .innerHTML =
        "🔥 " +
        calories +
        " kcal";
}

["duration", "speed", "incline"]
    .forEach(id => {

        $(id).addEventListener(
            "input",
            calculateSport
        );
    });

calculateSport();

$("sportMode").onclick =
    () => {

        sportDay = true;

        $("sportMode")
            .classList
            .add("active");

        $("normalMode")
            .classList
            .remove("active");
    };

$("normalMode").onclick =
    () => {

        sportDay = false;

        $("normalMode")
            .classList
            .add("active");

        $("sportMode")
            .classList
            .remove("active");
    };

$("saveTargets").onclick =
    () => {

        targets.calories =
            Number(
                $("targetCalories")
                    .value
            ) || targets.calories;

        targets.protein =
            Number(
                $("targetProtein")
                    .value
            ) || targets.protein;

        targets.carbs =
            Number(
                $("targetCarbs")
                    .value
            ) || targets.carbs;

        targets.water =
            Number(
                $("targetWater")
                    .value
            ) || targets.water;

        saveAll();

        updateDashboard();

        alert(
            "Hedefler kaydedildi."
        );
    };

$("saveWeight").onclick =
    () => {

        const weight =
            $("weightInput")
                .value;

        if (!weight) return;

        weights.push(weight);

        $("weightHistory")
            .innerHTML =
            weights.join(
                "<br>"
            );

        saveAll();
    };

$("finishDay").onclick =
    () => {

        history.push({

            date:
                new Date()
                    .toLocaleDateString(
                        "tr-TR"
                    ),

            calories:
                totals.calories,

            protein:
                totals.protein
        });

        $("history")
            .innerHTML =
            history
                .map(
                    item =>
                        item.date +
                        " - " +
                        item.calories +
                        " kcal"
                )
                .join("<br>");

        totals = {
            calories: 0,
            protein: 0,
            carbs: 0,
            water: 0
        };

        meals = {
            breakfast: 0,
            lunch: 0,
            dinner: 0,
            snack: 0
        };

        saveAll();

        updateDashboard();

        alert(
            "Gün kaydedildi."
        );
    };

if (weights.length) {

    $("weightHistory")
        .innerHTML =
        weights.join("<br>");
}

if (history.length) {

    $("history")
        .innerHTML =
        history
            .map(
                item =>
                    item.date +
                    " - " +
                    item.calories +
                    " kcal"
            )
            .join("<br>");
}
