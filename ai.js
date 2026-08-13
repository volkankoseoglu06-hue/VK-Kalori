const aiAnswers = {

protein:
"Günlük protein hedefini tamamlamak için tavuk, yumurta, yoğurt ve protein tozu tüketebilirsin.",

kalori:
"Günlük kalori hedefini takip ederek ilerleyebilirsin.",

spor:
"Antrenmandan sonraki 1-2 saat içinde protein tüketmek toparlanmayı destekleyebilir.",

kahvaltı:
"Kahvaltıda yumurta, peynir ve süt iyi bir tercih olabilir.",

öğle:
"Öğle yemeğinde tavuk, pilav ve yoğurt tercih edebilirsin.",

akşam:
"Akşam yemeğinde protein ağırlıklı beslenebilirsin.",

fotoğraf:
"Fotoğraf analizinde tespit edilen besinleri kontrol edip gramajları düzenleyebilirsin."

};

const aiHistory = [];

function askAI() {

const questionInput =
document.getElementById(
"aiQuestion"
);

const answerBox =
document.getElementById(
"aiAnswer"
);

const question =
questionInput.value
.toLowerCase()
.trim();

if (!question) {

return;

}

let answer =
"Beslenme, spor ve kalori hakkında soru sorabilirsin.";

for (const key in aiAnswers) {

if (
question.includes(key)
) {

answer =
aiAnswers[key];

break;

}

}

aiHistory.push({

question:
questionInput.value,

answer:
answer

});

let html = "";

aiHistory.forEach(item => {

html += `

<div
style="
padding:12px;
margin-bottom:12px;
background:#f5f5f5;
border-radius:14px;
">

<strong>

Sen:

</strong>

<br>

${item.question}

<br><br>

<strong>

VK AI:

</strong>

<br>

${item.answer}

</div>

`;

});

answerBox.innerHTML = html;

questionInput.value = "";

}

function suggestFoods(text) {

const matches =
foods.filter(food =>

food.name
.toLowerCase()
.includes(
text.toLowerCase()
)

);

return matches
.slice(0,5);

}
