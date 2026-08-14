const $ = id => document.getElementById(id);

const totals =
JSON.parse(localStorage.getItem("vkTotals")) || {
    calories:0,
    protein:0,
    carbs:0,
    water:0
};

const meals =
JSON.parse(localStorage.getItem("vkMeals")) || {
    breakfast:0,
    lunch:0,
    dinner:0,
    snack:0
};

let selectedFood = null;

function saveData(){

    localStorage.setItem(
        "vkTotals",
        JSON.stringify(totals)
    );

    localStorage.setItem(
        "vkMeals",
        JSON.stringify(meals)
    );
}

function updateDashboard(){

    $("calorieValue").textContent =
        totals.calories + "/2200";

    $("proteinValue").textContent =
        totals.protein + "/165";

    $("waterValue").textContent =
        totals.water.toFixed(1) + "/3";

    $("carbValue").textContent =
        totals.carbs + "/220";

    $("breakfastCount").textContent =
        meals.breakfast;

    $("lunchCount").textContent =
        meals.lunch;

    $("dinnerCount").textContent =
        meals.dinner;

    $("snackCount").textContent =
        meals.snack;
}

$("today").textContent =
new Date().toLocaleDateString(
    "tr-TR",
    {
        weekday:"long",
        day:"numeric",
        month:"long",
        year:"numeric"
    }
);

updateDashboard();

$("addWater").onclick = () => {

    totals.water += 0.25;

    saveData();

    updateDashboard();
};

$("foodSearch").addEventListener(
    "input",
    function(){

        const search =
        this.value
        .toLowerCase()
        .trim();

        $("foodResults").innerHTML = "";

        if(search.length < 2){

            return;
        }

        const results =
        foods.filter(food =>
            food.name
            .toLowerCase()
            .includes(search)
        );

        results.forEach(food => {

            const div =
            document.createElement("div");

            div.className =
            "foodItem";

            div.innerHTML =

            "<strong>" +

            food.name +

            "</strong><br>" +

            food.unit +

            " • " +

            food.kcal +

            " kcal";

            div.onclick = () => {

                selectedFood =
                food;
            };

            $("foodResults")
            .appendChild(div);

        });

    }
);

$("calculateFood").onclick =
() => {

    if(!selectedFood){

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

    const kcal =
    Math.round(
        selectedFood.kcal *
        ratio
    );

    const protein =
    Math.round(
        selectedFood.protein *
        ratio
    );

    const carbs =
    Math.round(
        selectedFood.carb *
        ratio
    );

    $("foodInfo").innerHTML =

    "🔥 " +

    kcal +

    " kcal<br>" +

    "🥩 " +

    protein +

    " g protein<br>" +

    "🍞 " +

    carbs +

    " g karbonhidrat";

    selectedFood.result = {

        kcal,
        protein,
        carbs
    };

};

$("addFood").onclick =
() => {

    if(!selectedFood ||
       !selectedFood.result){

        alert(
            "Önce hesapla."
        );

        return;
    }

    totals.calories +=
    selectedFood.result.kcal;

    totals.protein +=
    selectedFood.result.protein;

    totals.carbs +=
    selectedFood.result.carbs;

    const meal =
    $("mealType").value;

    meals[meal]++;

    saveData();

    updateDashboard();

    alert(
        "Besin eklendi."
    );

};
function updateExercise(){

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

    $("durationText").textContent =
    duration;

    $("speedText").textContent =
    speed;

    $("inclineText").textContent =
    incline;

    const weight =
    Number(
        $("weight")
        .value
    ) || 109;

    const met =
    3 +
    speed / 2 +
    incline / 4;

    const calories =
    Math.round(
        weight *
        0.0175 *
        met *
        duration
    );

    $("exerciseCalories")
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
        updateExercise
    );

});

updateExercise();

$("calculateTargets").onclick =
() => {

    const weight =
    Number(
        $("weight")
        .value
    );

    const height =
    Number(
        $("height")
        .value
    );

    const age =
    Number(
        $("age")
        .value
    );

    if(
        !weight ||
        !height ||
        !age
    ){

        return;
    }

    const bmr =
    Math.round(

        10 * weight +

        6.25 * height -

        5 * age +

        5

    );

    alert(

        "Bazal metabolizma: " +

        bmr +

        " kcal\n\nProtein hedefi: " +

        Math.round(
            weight * 1.5
        ) +

        " g"

    );

};

const historyData =
JSON.parse(
    localStorage.getItem(
        "vkHistory"
    )
) || [];

$("finishDay").onclick =
() => {

    historyData.push(

        new Date()
        .toLocaleDateString(
            "tr-TR"
        ) +

        " → " +

        totals.calories +

        " kcal"

    );

    localStorage.setItem(

        "vkHistory",

        JSON.stringify(
            historyData
        )

    );

    $("history").innerHTML =
    historyData.join(
        "<br>"
    );

    totals.calories = 0;
    totals.protein = 0;
    totals.carbs = 0;
    totals.water = 0;

    meals.breakfast = 0;
    meals.lunch = 0;
    meals.dinner = 0;
    meals.snack = 0;

    saveData();

    updateDashboard();

};

if(historyData.length){

    $("history").innerHTML =

    historyData.join(
        "<br>"
    );

}
