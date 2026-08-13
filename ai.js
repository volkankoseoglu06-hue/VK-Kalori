const aiReplies = {

protein:
"Günlük protein hedefin yaklaşık 150 gram olabilir.",

kalori:
"Günlük kalori hedefin 1900 kcal olarak ayarlandı.",

spor:
"Antrenmandan sonra protein tüketmen toparlanmanı destekleyebilir.",

kilo:
"Düzenli kalori takibi kilo verme sürecini kolaylaştırır.",

karbonhidrat:
"Karbonhidrat miktarını antrenman yoğunluğuna göre ayarlayabilirsin."

};

function askAI() {

const input =
document.getElementById(
"aiQuestion"
);

const answer =
document.getElementById(
"aiAnswer"
);

const question =
input.value
.toLowerCase()
.trim();

if (!question) {

answer.innerHTML =
"Bir soru yaz.";

return;

}

let response =
"Sorunu anlayamadım. Beslenme, spor veya kalori hakkında soru sorabilirsin.";

Object.keys(aiReplies)
.forEach(key => {

if (
question.includes(key)
) {

response =
aiReplies[key];

}

});

answer.innerHTML =

"<strong>Sen:</strong><br>" +

input.value +

"<br><br>" +

"<strong>VK AI:</strong><br>" +

response;

input.value = "";

}
