const $ = (id) => document.getElementById(id);

const state = JSON.parse(
    localStorage.getItem("vkLife")
) || {

    calories: 0,
    protein: 0,
    water: 0,
    sport: 0,

    weight: 109,
    height: 175,
    age: 32,

    history: []
};

function saveState() {

    localStorage.setItem(
        "vkLife",
        JSON.stringify(state)
    );

}

function updateDate() {

    $("todayDate").textContent =
        new Date().toLocaleDateString(
            "tr-TR"
        );

}

function updateTargets() {

    const bmr =
        10 * state.weight +
        6.25 * state.height -
        5 * state.age +
        5;

    const proteinTarget =
        Math.round(
            state.weight * 1.5
        );

    $("calorieTarget").textContent =
        `${state.calories}/${Math.round(bmr)}`;

    $("proteinTarget").textContent =
        `${state.protein}/${proteinTarget}`;

    $("waterTarget").textContent =
        `${state.water.toFixed(1)}/3`;

    $("sportTarget").textContent =
        state.sport;

    $("summaryCalories").textContent =
        state.calories;

    $("summaryProtein").textContent =
        state.protein;

    $("summaryWater").textContent =
        state.water.toFixed(1);

    $("summarySport").textContent =
        state.sport;

}

function calculateSport() {

    const duration =
        Number(
            $("sportDuration").value
        );

    const speed =
        Number(
            $("sportSpeed").value
        );

    const incline =
        Number(
            $("sportIncline").value
        );

    $("durationValue").textContent =
        duration;

    $("speedValue").textContent =
        speed;

    $("inclineValue").textContent =
        incline;

    const calories =
        Math.round(
            duration *
            (speed * 1.2) *
            (1 + incline / 10)
        );

    state.sport = calories;

    $("sportCalories").textContent =
        `Yakılan kalori: ${calories} kcal`;

    updateTargets();

    saveState();

}

function loadHistory() {

    if (
        state.history.length === 0
    ) {

        $("historyList").textContent =
            "Henüz kayıt yok.";

        return;

    }

    $("historyList").innerHTML =
        state.history
            .map(
                item =>
                    `<div>${item}</div>`
            )
            .join("");

}

function showPage(page) {

    document
        .querySelectorAll(".page")
        .forEach(pageItem => {

            pageItem.classList.remove(
                "active"
            );

        });

    $(page).classList.add(
        "active"
    );

}

document
    .querySelectorAll(".nav-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showPage(
                    button.dataset.page
                );

            }
        );

    });

$("profileBtn")
    .addEventListener(
        "click",
        () => {

            showPage(
                "profilePage"
            );

        }
    );

$("addWaterBtn")
    .addEventListener(
        "click",
        () => {

            state.water += 0.25;

            updateTargets();

            saveState();

        }
    );

$("finishDayBtn")
    .addEventListener(
        "click",
        () => {

            state.history.unshift(

                `${new Date()
                    .toLocaleDateString(
                        "tr-TR"
                    )} | Kalori: ${state.calories}
| Protein: ${state.protein} g
| Su: ${state.water.toFixed(1)} L
| Spor: ${state.sport} kcal`

            );

            state.calories = 0;
            state.protein = 0;
            state.water = 0;
            state.sport = 0;

            loadHistory();

            updateTargets();

            saveState();

        }
    );

$("saveProfileBtn")
    .addEventListener(
        "click",
        () => {

            state.weight =
                Number(
                    $("userWeight").value
                ) || state.weight;

            state.height =
                Number(
                    $("userHeight").value
                ) || state.height;

            state.age =
                Number(
                    $("userAge").value
                ) || state.age;

            updateTargets();

            saveState();

            alert(
                "Profil kaydedildi."
            );

        }
    );

$("sportDuration")
    .addEventListener(
        "input",
        calculateSport
    );

$("sportSpeed")
    .addEventListener(
        "input",
        calculateSport
    );

$("sportIncline")
    .addEventListener(
        "input",
        calculateSport
    );

$("userWeight").value =
    state.weight;

$("userHeight").value =
    state.height;

$("userAge").value =
    state.age;

updateDate();

updateTargets();

calculateSport();

loadHistory();
