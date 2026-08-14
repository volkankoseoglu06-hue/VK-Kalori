const $ = (id) => document.getElementById(id);

let totals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    water: 0
};

let meals = {
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    snack: 0
};

let selectedFood = null;
let calculatedFood = null;

const history =
    JSON.parse(
        localStorage.getItem("vkHistory")
    ) || [];

function updateDate() {

    $("todayDate").textContent =
        new Date().toLocaleDateString(
            "tr-TR",
            {
                weekday: "long",
                day: "numeric",
                month: "long"
            }
        );

}

updateDate();

function updateDashboard() {

    $("calorieText").textContent =
        totals.calories + " / 2200";

    $("proteinText").textContent =
        totals.protein + " / 165";

    $("waterText").textContent =
        totals.water.toFixed(1) + " / 3";

    $("carbText").textContent =
        totals.carbs + " / 220";

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

$("addWater").onclick = function () {

    totals.water += 0.25;

    updateDashboard();

};

function renderFoods(list) {

    $("foodResults").innerHTML = "";

    if (list.length === 0) {

        return;

    }

    list.forEach(food => {

        const div =
            document.createElement(
                "div"
            );

        div.className =
            "food-item";

        div.innerHTML =
            "<strong>" +
            food.name +
            "</strong><br>" +
            food.kcal +
            " kcal";

        div.onclick =
            function () {

                selectedFood =
                    food;

            };

        $("foodResults")
            .appendChild(div);

    });

}

$("foodSearch")
    .addEventListener(
        "input",
        function () {

            const value =
                this.value
                .trim()
                .toLowerCase();

            if (
                value.length < 2
            ) {

                $("foodResults")
                    .innerHTML = "";

                return;

            }

            const filtered =
                foods.filter(
                    food =>
                        food.name
                            .toLowerCase()
                            .includes(
                                value
                            )
                );

            renderFoods(
                filtered
            );

        }
    );

$("calculateFood")
    .onclick =
    function () {

        if (
            !selectedFood
        ) {

            alert(
                "Önce bir besin seç."
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

            carb:
                Math.round(
                    selectedFood.carb *
                    ratio
                ),

            fat:
                Math.round(
                    selectedFood.fat *
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
            calculatedFood.carb +
            " g karbonhidrat";

    };

$("addFood")
    .onclick =
    function () {

        if (
            !calculatedFood
        ) {

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
            calculatedFood.carb;

        updateDashboard();

        const meal =
            prompt(

                "1=Kahvaltı\n2=Öğle\n3=Akşam\n4=Ara Öğün"

            );

        if (
            meal === "1"
        ) {

            meals.breakfast++;

        }

        if (
            meal === "2"
        ) {

            meals.lunch++;

        }

        if (
            meal === "3"
        ) {

            meals.dinner++;

        }

        if (
            meal === "4"
        ) {

            meals.snack++;

        }

        updateDashboard();

        alert(
            calculatedFood.name +
            " eklendi."
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

            (
                50 +
                speed *
                incline
            )

        );

    $("sportCalories")
        .textContent =

        calories +
        " kcal";

}

[
    "duration",
    "speed",
    "incline"
]
    .forEach(id => {

        $(id)
            .addEventListener(
                "input",
                calculateSport
            );

    });

calculateSport();

function renderHistory() {

    $("history")
        .innerHTML = "";

    if (
        history.length === 0
    ) {

        $("history")
            .textContent =

            "Henüz kayıt yok.";

        return;

    }

    history
        .slice()
        .reverse()
        .forEach(day => {

            const div =
                document
                    .createElement(
                        "div"
                    );

            div.className =
                "food-item";

            div.innerHTML =

                day.date +

                "<br>🔥 " +

                day.calories +

                " kcal<br>🥩 " +

                day.protein +

                " g";

            $("history")
                .appendChild(
                    div
                );

        });

}

renderHistory();

$("finishDay")
    .onclick =
    function () {

        history.push({

            date:

                new Date()
                    .toLocaleDateString(
                        "tr-TR"
                    ),

            calories:
                totals.calories,

            protein:
                totals.protein,

            carbs:
                totals.carbs,

            water:
                totals.water

        });

        localStorage.setItem(

            "vkHistory",

            JSON.stringify(
                history
            )

        );

        totals = {

            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
            water: 0

        };

        meals = {

            breakfast: 0,
            lunch: 0,
            dinner: 0,
            snack: 0

        };

        updateDashboard();

        renderHistory();

        alert(
            "Gün kaydedildi."
        );

    };

$("sportMode")
    .onclick =
    function () {

        $("sportMode")
            .classList
            .add(
                "active"
            );

        $("normalMode")
            .classList
            .remove(
                "active"
            );

    };

$("normalMode")
    .onclick =
    function () {

        $("normalMode")
            .classList
            .add(
                "active"
            );

        $("sportMode")
            .classList
            .remove(
                "active"
            );

    };
