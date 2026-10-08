const ALLOWED_ORIGIN = "https://volkankoseoglu06-hue.github.io";

function corsHeaders(origin) {
  const allow = origin === ALLOWED_ORIGIN ? origin : ALLOWED_ORIGIN;
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json; charset=utf-8"
  };
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders(origin)
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, origin);
    }

    if (!env.OPENAI_API_KEY) {
      return json({ error: "OPENAI_API_KEY is not configured" }, 500, origin);
    }

    try {
      const body = await request.json();
      const image = String(body.image || "");
      const catalog = String(body.catalog || "");

      if (!image.startsWith("data:image/")) {
        return json({ error: "Invalid image" }, 400, origin);
      }

      if (!catalog || catalog.length > 60000) {
        return json({ error: "Invalid food catalog" }, 400, origin);
      }

      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + env.OPENAI_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: env.OPENAI_MODEL || "gpt-5.6-luna",
          store: false,
          input: [{
            role: "user",
            content: [
              {
                type: "input_text",
                text:
                  "Sen VK LIFE uygulamasinin yemek fotografi analiz motorusun. " +
                  "Fotografta gorunen yenilebilir yemek ve icecekleri belirle. " +
                  "Asagidaki besin kataloğundan fotografla en iyi eslesen kayitlari sec. " +
                  "Katalog disinda isim uydurma. Sos, yag veya garnitur belirginse ayri kalem yap. " +
                  "Porsiyon miktarini fotografla makul sekilde tahmin et. " +
                  "100 g birimli kayitlarda amount gram olarak, 100 ml birimli kayitlarda amount ml olarak ver. " +
                  "Diger birimlerde amount o birimden kac tane/porsiyon oldugunu ver. " +
                  "Ornegin unit='adet' ise 1.0, unit='porsiyon' ise 1.0 gibi. " +
                  "Goruntu belirsizse confidence dusuk ver. Kalori veya protein uydurma; uygulama katalog degerlerini kullanacak. " +
                  "En fazla 8 kalem don. " +
                  "\n\nKATALOG:\n" + catalog
              },
              {
                type: "input_image",
                image_url: image,
                detail: "high"
              }
            ]
          }],
          text: {
            format: {
              type: "json_schema",
              name: "vk_food_analysis",
              strict: true,
              schema: {
                type: "object",
                additionalProperties: false,
                properties: {
                  items: {
                    type: "array",
                    maxItems: 8,
                    items: {
                      type: "object",
                      additionalProperties: false,
                      properties: {
                        foodName: { type: "string" },
                        amount: { type: "number", minimum: 0.1 },
                        displayUnit: { type: "string" },
                        confidence: { type: "number", minimum: 0, maximum: 100 }
                      },
                      required: ["foodName", "amount", "displayUnit", "confidence"]
                    }
                  }
                },
                required: ["items"]
              }
            }
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        return json({ error: "OpenAI request failed", detail: errorText.slice(0, 500) }, 502, origin);
      }

      const data = await response.json();
      const text = data.output_text || "";
      let parsed;

      try {
        parsed = JSON.parse(text);
      } catch {
        return json({ error: "AI returned invalid JSON" }, 502, origin);
      }

      return json({ items: Array.isArray(parsed.items) ? parsed.items : [] }, 200, origin);
    } catch (error) {
      return json({ error: "Analysis failed", detail: String(error?.message || error) }, 500, origin);
    }
  }
};
