const profile = JSON.parse(localStorage.getItem("vkProfile")) || {
    age: 32,
    height: 175,
    weight: 109,
    targetWeight: 85,
    dailyCalories: 1900,
    dailyProtein: 150,
    workoutsPerWeek: 3,
    waterGoal: 3
};

function saveProfile() {

    localStorage.setItem(
        "vkProfile",
        JSON.stringify(profile)
    );

}

function loadProfile() {

    const elements = {

        age: document.getElementById("profileAge"),

        height: document.getElementById("profileHeight"),

        weight: document.getElementById("profileWeight"),

        targetWeight: document.getElementById("profileTargetWeight"),

        calories: document.getElementById("profileCalories"),

        protein: document.getElementById("profileProtein"),

        workouts: document.getElementById("profileWorkouts")

    };

    if (elements.age) {

        elements.age.textContent =
            profile.age;

        elements.height.textContent =
            profile.height + " cm";

        elements.weight.textContent =
            profile.weight + " kg";

        elements.targetWeight.textContent =
            profile.targetWeight + " kg";

        elements.calories.textContent =
            profile.dailyCalories + " kcal";

        elements.protein.textContent =
            profile.dailyProtein + " g";

        elements.workouts.textContent =
            profile.workoutsPerWeek + " gün";

    }

}

document.addEventListener(
    "DOMContentLoaded",
    loadProfile
);
