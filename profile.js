const profile = {
    age: 32,
    height: 175,
    weight: 109,
    targetWeight: 85,
    calories: 1900,
    protein: 150,
    workouts: 3
};

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const age =
            document.getElementById(
                "profileAge"
            );

        if (!age) {

            return;

        }

        document.getElementById(
            "profileAge"
        ).textContent =
            profile.age;

        document.getElementById(
            "profileHeight"
        ).textContent =
            profile.height + " cm";

        document.getElementById(
            "profileWeight"
        ).textContent =
            profile.weight + " kg";

        document.getElementById(
            "profileTargetWeight"
        ).textContent =
            profile.targetWeight + " kg";

        document.getElementById(
            "profileCalories"
        ).textContent =
            profile.calories + " kcal";

        document.getElementById(
            "profileProtein"
        ).textContent =
            profile.protein + " g";

        document.getElementById(
            "profileWorkouts"
        ).textContent =
            profile.workouts + " gün";

    }
);
