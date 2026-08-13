const answers = {

    protein:
    "Protein hedefini tamamlamak için tavuk, yumurta, yoğurt ve whey tüketebilirsin.",

    kalori:
    "Spor gününde 1900 kcal, normal günde 1700 kcal hedefleyebilirsin.",

    spor:
    "Antrenmandan sonraki 1 saat içinde protein almak toparlanmayı destekler.",

    kilo:
    "Kalori açığını koruyarak kilo vermeye devam edebilirsin.",

    kahvaltı:
    "Yumurta, peynir ve süt iyi bir kahvaltı seçeneğidir.",

    su:
    "Günlük 3 litre su tüketmeye çalış.",

    mounjaro:
    "Mounjaro kullanırken yeterli protein almak önemlidir."

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
        input.value.trim();

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

    let html = "";

    history.forEach(item => {

        html += `

        <div class="meal-item">

        <div>

        <strong>👤 Sen</strong>

        <br>

        ${item.question}

        <br><br>

        <strong>🤖 VK AI</strong>

        <br>

        ${item.response}

        </div>

        </div>

        `;

    });

    output.innerHTML =
        html;

    input.value = "";

}
