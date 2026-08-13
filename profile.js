const profile = {

    age: 32,

    height: 175,

    weight: 109,

    targetWeight: 85,

    caloriesSport: 1900,

    caloriesNormal: 1700,

    protein: 150,

    carb: 180,

    fat: 65,

    water: 3,

    workouts: 3

};

function loadProfile() {

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

👤 Profil

</h2>

<div class="profile-row">

<span>

Yaş

</span>

<span>

${profile.age}

</span>

</div>

<div class="profile-row">

<span>

Boy

</span>

<span>

${profile.height} cm

</span>

</div>

<div class="profile-row">

<span>

Kilo

</span>

<span>

${profile.weight} kg

</span>

</div>

<div class="profile-row">

<span>

Hedef Kilo

</span>

<span>

${profile.targetWeight} kg

</span>

</div>

<div class="profile-row">

<span>

Spor Günü

</span>

<span>

${profile.caloriesSport} kcal

</span>

</div>

<div class="profile-row">

<span>

Normal Gün

</span>

<span>

${profile.caloriesNormal} kcal

</span>

</div>

<div class="profile-row">

<span>

Protein

</span>

<span>

${profile.protein} g

</span>

</div>

<div class="profile-row">

<span>

Karbonhidrat

</span>

<span>

${profile.carb} g

</span>

</div>

<div class="profile-row">

<span>

Yağ

</span>

<span>

${profile.fat} g

</span>

</div>

<div class="profile-row">

<span>

Su

</span>

<span>

${profile.water} L

</span>

</div>

<div class="profile-row">

<span>

Antrenman

</span>

<span>

Haftada ${profile.workouts} gün

</span>

</div>

</div>

`;

}

document.addEventListener(

    "DOMContentLoaded",

    loadProfile

);
