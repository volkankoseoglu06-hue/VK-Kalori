function analyzePhoto() {

const results =
document.getElementById(
"analysisResults"
);

results.innerHTML =

`
<div class="food-item">

🤖 Fotoğraf analiz ediliyor...

</div>
`;

setTimeout(() => {

results.innerHTML =

`
<div class="food-item">

🍗 Tavuk göğsü

<br>

⚖️ 200 g

<br>

🔥 330 kcal

</div>

<div class="food-item">

🍚 Pirinç pilavı

<br>

⚖️ 150 g

<br>

🔥 195 kcal

</div>

<div class="food-item">

🥛 Ayran

<br>

⚖️ 200 ml

<br>

🔥 68 kcal

</div>

<button onclick="addPhotoMeal()">

➕ Öğüne Ekle

</button>
`;

},1500);

}

function addPhotoMeal() {

alert(

"Öğün eklendi."

);

}
