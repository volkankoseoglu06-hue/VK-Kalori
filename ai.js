const answers = {

protein:
"Günlük protein hedefini tamamlamak için tavuk, yumurta, yoğurt ve protein tozu tüketebilirsin.",

kalori:
"Günlük kalori hedefin 1900 kaloridir.",

spor:
"Antrenmandan sonra protein tüketmek toparlanmayı destekler.",

kilo:
"Kalori açığı oluşturarak kilo vermeye devam edebilirsin.",

kahvaltı:
"Kahvaltıda yumurta, peynir ve süt iyi bir tercih olabilir.",

fotoğraf:
"Fotoğraf analizini kullanarak besinleri otomatik olarak ekleyebilirsin."

};

const history = [];

function askAI() {

const input =
document.getElementById(
"aiQuestion"
);

const output =
document.getElementById(
"aiAnswer"
);

const question =
input.value
.trim();

if (!question) {

return;

}

let response =
"Beslenme veya spor hakkında soru sorabilirsin.";

for (const key in answers) {

if (
question
.toLowerCase()
.includes(key)
) {

response =
answers[key];

break;

}

}

history.push({

question,

response

});

let html =
"";

history.forEach(item => {

html += `

<div class="food-item">

<strong>

👤 Sen

</strong>

<br>

${item.question}

<br><br>

<strong>

🤖 VK AI

</strong>

<br>

${item.response}

</div>

`;

});

output.innerHTML =
html;

input.value =
"";

}
