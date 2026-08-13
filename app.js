const defaultFoods = [
    {
        name: "Beyaz peynir",
        kcal: 265,
        protein: 14,
        carb: 4,
        fat: 21
    },
    {
        name: "Kaşar peyniri",
        kcal: 404,
        protein: 25,
        carb: 2,
        fat: 33
    },
    {
        name: "Lor peyniri",
        kcal: 92,
        protein: 18,
        carb: 3,
        fat: 1
    },
    {
        name: "Siyah zeytin",
        kcal: 115,
        protein: 1,
        carb: 6,
        fat: 11
    },
    {
        name: "Yeşil zeytin",
        kcal: 145,
        protein: 1,
        carb: 4,
        fat: 15
    },
    {
        name: "Izgara tavuk",
        kcal: 165,
        protein: 31,
        carb: 0,
        fat: 4
    },
    {
        name: "Izgara köfte",
        kcal: 250,
        protein: 26,
        carb: 5,
        fat: 15
    },
    {
        name: "Biber dolması",
        kcal: 150,
        protein: 5,
        carb: 19,
        fat: 6
    },
    {
        name: "Haşlanmış mısır",
        kcal: 96,
        protein: 3,
        carb: 21,
        fat: 1
    },
    {
        name: "Kuru fasulye",
        kcal: 127,
        protein: 9,
        carb: 23,
        fat: 1
    },
    {
        name: "Nohut",
        kcal: 164,
        protein: 9,
        carb: 27,
        fat: 3
    },
    {
        name: "Yoğurt",
        kcal: 61,
        protein: 3,
        carb: 5,
        fat: 3
    },
    {
        name: "Whey protein",
        kcal: 120,
        protein: 20,
        carb: 3,
        fat: 2
    }
];

let customFoods =
    JSON.parse(localStorage.getItem("vkCustomFoods")) || [];

let diary =
    JSON.parse(localStorage.getItem("vkDiary")) || [];

const foods =
    [...defaultFoods, ...customFoods];

function toggleSettings() {
    document
        .getElementById("settingsPanel")
        .classList
        .toggle("hidden");
}

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {
            screen.classList.add("hidden");
        });

    document
        .getElementById(id)
        .classList.remove("hidden");
}

function searchFood() {

    const input =
        document
            .getElementById("foodSearch")
            .value
            .toLowerCase();

    const results =
        document
            .getElementById("foodResults");

    results.innerHTML = "";

    if (input.length === 0) {
        return;
    }

    const filtered =
        foods.filter(food =>
            food.name
                .toLowerCase()
                .includes(input)
        );

    if (filtered.length === 0) {

        results.innerHTML = `
            <div class="food-item">
                Besin bulunamadı.

                <br><br>

                <button onclick="createFood()">
                    Yeni besin oluştur
                </button>
            </div>
        `;

        return;
    }

    filtered.forEach(food => {

        results.innerHTML += `
            <div
                class="food-item"
                onclick="selectFood('${food.name}')">

                <strong>
                    ${food.name}
                </strong>

                <br>

                ${food.kcal} kcal
            </div>
        `;
    });
}

let selectedFood = null;

function selectFood(name) {

    selectedFood =
        foods.find(
            food => food.name === name
        );
}

function addFood() {

    if (!selectedFood) {

        alert("Bir besin seç.");

        return;
    }

    diary.push(selectedFood);

    localStorage.setItem(
        "vkDiary",
        JSON.stringify(diary)
    );

    alert(
        selectedFood.name +
        " günlüğe eklendi."
    );
}

function createFood() {

    const name =
        prompt("Besin adı");

    if (!name) {
        return;
    }

    const kcal =
        prompt("Kalori");

    const protein =
        prompt("Protein");

    const carb =
        prompt("Karbonhidrat");

    const fat =
        prompt("Yağ");

    const food = {

        name,

        kcal: Number(kcal),

        protein: Number(protein),

        carb: Number(carb),

        fat: Number(fat)
    };

    customFoods.push(food);

    localStorage.setItem(
        "vkCustomFoods",
        JSON.stringify(customFoods)
    );

    alert("Besin kaydedildi.");

    location.reload();
}

function calculateWalkingCalories(
    weight,
    duration,
    speed,
    incline
) {

    const met =
        3 +
        speed / 2 +
        incline / 4;

    return Math.round(
        weight *
        0.0175 *
        met *
        duration
    );
}

showScreen("homeScreen");
