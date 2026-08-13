function toggleSettings() {
    const panel = document.getElementById("settingsPanel");

    if (panel) {
        panel.classList.toggle("hidden");
    }
}

function showScreen(id) {
    const screens = document.querySelectorAll(".screen");

    screens.forEach(function (screen) {
        screen.classList.add("hidden");
    });

    const selected = document.getElementById(id);

    if (selected) {
        selected.classList.remove("hidden");
    }
}

function searchFood() {
    const input = document.getElementById("foodSearch");

    if (!input) return;

    const value = input.value.toLowerCase();

    const results = document.getElementById("foodResults");

    results.innerHTML = "";

    const foods = [
        "Beyaz peynir",
        "Kaşar peyniri",
        "Lor peyniri",
        "Siyah zeytin",
        "Yeşil zeytin",
        "Izgara tavuk",
        "Kuru fasulye",
        "Nohut",
        "Yoğurt",
        "Whey protein",
        "Fit browni"
    ];

    foods.forEach(function (food) {
        if (food.toLowerCase().includes(value)) {
            results.innerHTML +=
                '<div class="food-item">' +
                food +
                "</div>";
        }
    });
}

function addFood() {
    alert("Besin günlüğe eklendi.");
}

window.onload = function () {
    showScreen("homeScreen");
};
