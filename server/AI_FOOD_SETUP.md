# VK LIFE AI Yemek Analizi

Bu katman GitHub Pages tarafındaki uygulamadan fotoğrafı güvenli bir sunucuya gönderir. OpenAI API anahtarı frontend'e konmaz.

## 1. Cloudflare Worker

Cloudflare Workers'da yeni bir Worker oluştur ve `server/cloudflare-worker.js` içeriğini Worker kodu olarak kullan.

## 2. OpenAI anahtarını gizli değişken olarak ekle

Worker secrets bölümünde:

- `OPENAI_API_KEY` = OpenAI API anahtarın

İsteğe bağlı değişken:

- `OPENAI_MODEL` = `gpt-5.6-luna`

Anahtar kesinlikle `app.js`, `ai-config.js` veya GitHub'a yüklenen başka bir dosyaya yazılmamalı.

## 3. Worker adresini uygulamaya bağla

Worker yayınlandıktan sonra örnek adres:

`https://vk-life-ai.<subdomain>.workers.dev`

Bu adresi `ai-config.js` içindeki:

`window.VK_AI_ENDPOINT = "";`

alanına yaz.

## 4. Akış

1. Kullanıcı yemek fotoğrafı çeker.
2. Tarayıcı fotoğrafı küçültür.
3. Worker görseli OpenAI Responses API'ye gönderir.
4. AI yalnızca VK LIFE besin kataloğundaki uygun kayıtları ve tahmini miktarı döndürür.
5. Uygulama kalori ve proteini kendi `foods.js` verisinden hesaplar.
6. Kullanıcı miktarı düzenleyebilir.
7. Kullanıcı onaylarsa besinler günlüğe eklenir.

## 5. Önemli

Fotoğraf analizi tahminidir. Özellikle ev yemeklerinde yağ miktarı ve porsiyon boyutu fotoğraftan kesin olarak bilinemeyebilir.

Üretim ortamında Worker tarafında Cloudflare Rate Limiting/WAF de etkinleştirilmesi önerilir.
