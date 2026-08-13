const profile = {

    age: 32,

    height: 175,

    weight: 109,

    targetWeight: 85,

    sportCalories: 1900,

    normalCalories: 1700,

    proteinTarget: 150,

    waterTarget: 3,

    workoutDays: 3

};

document.addEventListener(

    "DOMContentLoaded",

    () => {

        const profilePage =
            document.getElementById(
                "profile"
            );

        if (!profilePage) {

            return;

        }

        profilePage.innerHTML = `

        <div class="card">

        <h2>

        👤 PROFİL

        </h2>

        <div class="meal-item">

        <span>

        Yaş

        </span>

        <strong>

        ${profile.age}

        </strong>

        </div>

        <div class="meal-item">

        <span>

        Boy

        </span>

        <strong>

        ${profile.height} cm

        </strong>

        </div>

        <div class="meal-item">

        <span>

        Kilo

        </span>

        <strong>

        ${profile.weight} kg

        </strong>

        </div>

        <div class="meal-item">

        <span>

        Hedef Kilo

        </span>

        <strong>

        ${profile.targetWeight} kg

        </strong>

        </div>

        <div class="meal-item">

        <span>

        Spor Günü

        </span>

        <strong>

        ${profile.sportCalories} kcal

        </strong>

        </div>

        <div class="meal-item">

        <span>

        Normal Gün

        </span>

        <strong>

        ${profile.normalCalories} kcal

        </strong>

        </div>

        <div class="meal-item">

        <span>

        Protein Hedefi

        </span>

        <strong>

        ${profile.proteinTarget} g

        </strong>

        </div>

        <div class="meal-item">

        <span>

        Su Hedefi

        </span>

        <strong>

        ${profile.waterTarget} L

        </strong>

        </div>

        <div class="meal-item">

        <span>

        Antrenman

        </span>

        <strong>

        Haftada ${profile.workoutDays} gün

        </strong>

        </div>

        </div>

        `;

    }

);
