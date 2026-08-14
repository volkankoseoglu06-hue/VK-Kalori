const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".bottom-nav button");

const today = new Date();

document.getElementById("todayDate").textContent =
today.toLocaleDateString("tr-TR");

navButtons.forEach(button => {

button.addEventListener("click", () => {

pages.forEach(page => {

page.classList.remove("active");

});

document
.getElementById(button.dataset.page)
.classList.add("active");

});

});

document
.getElementById("profileButton")
.addEventListener("click", () => {

pages.forEach(page => {

page.classList.remove("active");

});

document
.getElementById("profilePage")
.classList.add("active");

});

const foodDatabase = [

{
name:"Beyaz peynir",
kcal:265,
protein:14,
carb:4
},

{
name:"Kaşar peyniri",
kcal:404,
protein:25,
carb:2
},

{
name:"Lor peyniri",
kcal:92,
protein:18,
carb:3
},

{
name:"Izgara tavuk",
kcal:165,
protein:31,
carb:0
},

{
name:"Dana füme",
kcal:185,
protein:29,
carb:1
},

{
name:"Hindi füme",
kcal:110,
protein:21,
carb:2
},

{
name:"Kuru fasulye",
kcal:127,
protein:9,
carb:23
},

{
name:"Nohut",
kcal:164,
protein:9,
carb:27
},

{
name:"Biber dolması",
kcal:150,
protein:5,
carb:19
},

{
name:"Haşlanmış mısır",
kcal:96,
protein:3,
carb:21
},

{
name:"Fit browni",
kcal:280,
protein:22,
carb:18
},

{
name:"Protein tozu",
kcal:120,
protein:20,
carb:3
},

{
name:"Yoğurt",
kcal:61,
protein:3.5,
carb:5
}

];

let selectedFood = null;

const foodSearch =
document.getElementById("foodSearch");

const foodResults =
document.getElementById("foodResults");

foodSearch.addEventListener("input", () => {

const text =
foodSearch.value.toLowerCase();

foodResults.innerHTML = "";

if (text.length === 0) {

return;

}

foodDatabase
.filter(food =>
food.name
.toLowerCase()
.includes(text)
)

.forEach(food => {

const item =
document.createElement("div");

item.className =
"food-item";

item.textContent =
food.name +
" - " +
food.kcal +
" kcal";

item.addEventListener("click", () => {

selectedFood =
food;

});

foodResults
.appendChild(item);

});

});

let totals =

JSON.parse(
localStorage.getItem("vkTotals")
)

||

{

calorie:0,
protein:0,
water:0,
carb:0

};

function updateDashboard(){

document
.getElementById("calorieText")
.textContent =
totals.calorie;

document
.getElementById("proteinText")
.textContent =
totals.protein;

document
.getElementById("waterText")
.textContent =
totals.water;

document
.getElementById("carbText")
.textContent =
totals.carb;

}

updateDashboard();

document
.getElementById("addFoodButton")
.addEventListener("click", () => {

if(!selectedFood){

alert("Besin seç.");

return;

}

const amount =

parseFloat(

document
.getElementById("amountInput")
.value

);

const ratio =
amount / 100;

totals.calorie +=

Math.round(
selectedFood.kcal *
ratio
);

totals.protein +=

Math.round(
selectedFood.protein *
ratio
);

totals.carb +=

Math.round(
selectedFood.carb *
ratio
);

localStorage.setItem(

"vkTotals",

JSON.stringify(totals)

);

updateDashboard();

alert("Besin eklendi.");

});

document
.getElementById("addSportButton")
.addEventListener("click", () => {

const duration =

parseInt(

document
.getElementById("durationInput")
.value

);

const speed =

parseInt(

document
.getElementById("speedInput")
.value

);

const incline =

parseInt(

document
.getElementById("inclineInput")
.value

);

const kcal =

Math.round(

duration *
(speed + incline)

);

alert(

kcal +
" kcal yakıldı."

);

});

document
.getElementById("saveProfileButton")
.addEventListener("click", () => {

const weight =

parseFloat(

document
.getElementById("weightInput")
.value

);

if(!weight){

return;

}

const proteinTarget =

Math.round(weight * 1.5);

alert(

"Günlük protein hedefi: " +

proteinTarget +

" g"

);

});

document
.getElementById("finishDayButton")
.addEventListener("click", () => {

const history =

JSON.parse(

localStorage.getItem("vkHistory")

)

||

[];

history.push({

date:

new Date()
.toLocaleDateString("tr-TR"),

calorie:
totals.calorie,

protein:
totals.protein,

water:
totals.water,

carb:
totals.carb

});

localStorage.setItem(

"vkHistory",

JSON.stringify(history)

);

totals = {

calorie:0,
protein:0,
water:0,
carb:0

};

localStorage.setItem(

"vkTotals",

JSON.stringify(totals)

);

updateDashboard();

renderHistory();

alert(

"Gün tamamlandı."

);

});

function renderHistory(){

const list =

document
.getElementById("historyList");

const history =

JSON.parse(

localStorage.getItem("vkHistory")

)

||

[];

list.innerHTML = "";

history
.slice()
.reverse()
.forEach(day => {

const item =

document
.createElement("div");

item.className =
"history-item";

item.innerHTML =

"<b>" +

day.date +

"</b><br>" +

day.calorie +

" kcal<br>" +

day.protein +

" g protein";

list.appendChild(item);

});

}

renderHistory();
