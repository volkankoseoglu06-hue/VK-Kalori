const answers = {

protein:
"Günlük protein hedefin 150 gramdır. Tavuk, yumurta, yoğurt ve whey tüketebilirsin.",

kalori:
"Spor günlerinde 1900 kcal, normal günlerde 1700 kcal hedefleyebilirsin.",

spor:
"Haftada 3 gün düzenli antrenman hedefin için yeterlidir.",

kilo:
"109 kg'dan 85 kg'a ulaşmak için kalori açığını korumalısın.",

kahvaltı:
"Kahvaltıda yumurta, peynir, süt ve yoğurt iyi tercihlerdir.",

öğle:
"Öğle öğününde protein ve kompleks karbonhidrat birlikte tüketebilirsin.",

akşam:
"Akşam öğününde daha hafif beslenmeyi tercih edebilirsin.",

su:
"Günlük 3 litre su tüketmeyi hedefleyebilirsin.",

proteintozu:
"Antrenmandan sonra whey kullanabilirsin.",

mounjaro:
"Mounjaro kullanırken yeterli protein alımına dikkat etmelisin."

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

    if (!input || !output) {

        return;

    }

    const question =
        input.value.trim();

    if (!question) {

        return;

    }

    let response =
        "Beslenme ve spor hakkında soru sorabilirsin.";

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

    let html = "";

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

    input.value = "";

}

document.addEventListener(

    "DOMContentLoaded",

    () => {

        const button =
            document.querySelector(
                "#ai button"
            );

        if (button) {

            button.addEventListener(

                "click",

                askAI

            );

        }

    }

);
