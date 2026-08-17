const foods = [

/* KAHVALTILIKLAR */

{name:"Yumurta",kcal:78,protein:6,unit:"adet"},
{name:"Yumurta beyazı",kcal:17,protein:4,unit:"adet"},
{name:"Süt (1 bardak - 200 ml)",kcal:122,protein:6,unit:"bardak"},
{name:"Yarım yağlı süt (1 bardak - 200 ml)",kcal:94,protein:7,unit:"bardak"},
{name:"Laktozsuz süt (1 bardak - 200 ml)",kcal:92,protein:6,unit:"bardak"},
  
{name:"Beyaz peynir (1 kibrit kutusu - 30 g)",kcal:80,protein:4,unit:"adet"},
{name:"Kaşar peyniri (1 dilim - 20 g)",kcal:81,protein:5,unit:"dilim"},
{name:"Lor peyniri (1 yemek kaşığı - 30 g)",kcal:30,protein:5,unit:"kaşık"},
{name:"Labne (1 yemek kaşığı - 20 g)",kcal:58,protein:1,unit:"kaşık"},
{name:"Mozzarella (1 dilim - 30 g)",kcal:84,protein:7,unit:"dilim"},
{name:"Tulum peyniri (1 dilim - 30 g)",kcal:109,protein:7,unit:"dilim"},
{name:"Çeçil peyniri (1 porsiyon - 30 g)",kcal:87,protein:8,unit:"porsiyon"},

{name:"Yoğurt (1 kase - 200 g)",kcal:122,protein:8,unit:"kase"},
{name:"Süzme yoğurt (1 kase - 200 g)",kcal:194,protein:20,unit:"kase"},
{name:"Krem peynir (1 yemek kaşığı - 30 g)",kcal:100,protein:2,unit:"kaşık"},
{name:"Sek Quark (1 kutu - 140 g)",kcal:105,protein:18,unit:"kutu"},

{name:"Siyah zeytin",kcal:5,protein:0.1,unit:"adet"},
{name:"Yeşil zeytin",kcal:4,protein:0.1,unit:"adet"},

{name:"Karabuğday patlağı",kcal:19,protein:1,unit:"adet"},

{name:"Ekşi mayalı ekmek (1 dilim - 35 g)",kcal:85,protein:3,unit:"dilim"},
{name:"Tam buğday ekmeği (1 dilim - 30 g)",kcal:70,protein:3,unit:"dilim"},

{name:"Menemen",kcal:160,protein:8,unit:"porsiyon"},
{name:"Omlet (2 yumurta)",kcal:180,protein:12,unit:"porsiyon"},
{name:"Tereyağı (1 çay kaşığı - 5 g)",kcal:36,protein:0,unit:"adet"},
{name:"Zeytinyağı (1 yemek kaşığı - 10 ml)",kcal:80,protein:0,unit:"adet"},

{name:"Bal (1 yemek kaşığı - 21 g)",kcal:64,protein:0,unit:"kaşık"},
{name:"Reçel (1 yemek kaşığı - 20 g)",kcal:56,protein:0,unit:"kaşık"},
{name:"Tahin (1 yemek kaşığı - 15 g)",kcal:89,protein:3,unit:"kaşık"},
{name:"Pekmez (1 yemek kaşığı - 20 g)",kcal:58,protein:0,unit:"kaşık"},

{name:"Domates (1 orta boy - 120 g)",kcal:22,protein:1,unit:"adet"},
{name:"Salatalık (1 orta boy - 100 g)",kcal:15,protein:1,unit:"adet"},
{name:"Biber (1 adet - 100 g)",kcal:20,protein:1,unit:"adet"},
{name:"Közlenmiş biber (1 adet - 80 g)",kcal:25,protein:1,unit:"adet"},

{name:"Brokoli (1 porsiyon - 150 g)",kcal:53,protein:5,unit:"porsiyon"},
{name:"Ispanak (1 porsiyon - 180 g)",kcal:41,protein:5,unit:"porsiyon"},
{name:"Kabak (1 orta boy - 200 g)",kcal:34,protein:2,unit:"adet"},
{name:"Patlıcan (1 orta boy - 300 g)",kcal:75,protein:3,unit:"adet"},
{name:"Avokado (1/2 adet - 75 g)",kcal:120,protein:2,unit:"adet"},
{name:"Fıstık ezmesi (1 yemek kaşığı - 16 g)",kcal:95,protein:4,unit:"kaşık"},

/* CHEF PİLAV (CEVİZLİDERE) */

{name:"Chef Pilav Tereyağlı Pirinç Pilavı (250 g)",kcal:390,protein:7,unit:"porsiyon"},
{name:"Chef Pilav Tereyağlı Pirinç Pilavı (125 g)",kcal:195,protein:4,unit:"yarım porsiyon"},

{name:"Chef Pilav Tereyağlı Nohutlu Pirinç Pilavı (250 g)",kcal:430,protein:10,unit:"porsiyon"},
{name:"Chef Pilav Tereyağlı Nohutlu Pirinç Pilavı (125 g)",kcal:215,protein:5,unit:"yarım porsiyon"},

{name:"Pilav Üstü Tavuk Izgara (250 g tereyağlı pirinç pilavı + 85 g çiğ tavuk ızgara + salata + turşu)",kcal:690,protein:34,unit:"menü"},

{name:"Pilav Üstü Köri Soslu Tavuk (250 g nohutlu pirinç pilavı + 200 g tavuk + köri sosu + salata)",kcal:930,protein:58,unit:"menü"},

{name:"Pilav Üstü Double Tavuk Döner (250 g tereyağlı pirinç pilavı + 130 g tavuk döner + salata + turşu)",kcal:860,protein:42,unit:"menü"},

{name:"Cazip Sporcu Izgara (250 g tereyağlı pirinç pilavı + 180 g çiğ bonfile tavuk + salata + turşu + kola)",kcal:980,protein:55,unit:"menü"},

{name:"Double Izgara (250 g tereyağlı pirinç pilavı + 270-300 g çiğ tavuk ızgara + salata + turşu)",kcal:1050,protein:82,unit:"menü"},

{name:"Sporcu Izgara Pilavı (250 g tereyağlı pirinç pilavı + 170-190 g çiğ tavuk ızgara + salata + turşu)",kcal:880,protein:55,unit:"menü"},

{name:"Sporcu Pilavı (250 g tereyağlı nohutlu pirinç pilavı + 150 g tavuk + salata + turşu)",kcal:820,protein:50,unit:"menü"},

{name:"Pilav Üstü Tavuk (250 g tereyağlı nohutlu pirinç pilavı + 80 g tavuk + salata + turşu)",kcal:670,protein:31,unit:"menü"},

  
/* MAKARNALAR */

{name:"Makarna (180 g)",kcal:220,protein:8,unit:"porsiyon"},
{name:"Tam buğday makarna (180 g)",kcal:190,protein:8,unit:"porsiyon"},
{name:"Kaşarlı makarna (200 g)",kcal:340,protein:12,unit:"porsiyon"},


{name:"Et sote",kcal:320,protein:30,unit:"porsiyon"},
{name:"Tas kebabı",kcal:340,protein:28,unit:"porsiyon"},
{name:"Izgara köfte",kcal:300,protein:26,unit:"porsiyon"},
{name:"Tavuk sote",kcal:280,protein:32,unit:"porsiyon"},
{name:"Fırında tavuk",kcal:260,protein:34,unit:"porsiyon"},
{name:"Tavuk kanat",kcal:320,protein:24,unit:"100 g"},
{name:"Patates salatası",kcal:220,protein:5,unit:"porsiyon"},
{name:"Patates kroket",kcal:280,protein:6,unit:"100 g"},
{name:"Kaşarlı patates",kcal:310,protein:8,unit:"porsiyon"},

  /* İÇECEKLER */

{name:"Kola (330 ml)",kcal:139,protein:0,unit:"kutu"},
{name:"Zero kola (330 ml)",kcal:1,protein:0,unit:"kutu"},
{name:"Fanta (330 ml)",kcal:148,protein:0,unit:"kutu"},
{name:"Meyve suyu (200 ml)",kcal:90,protein:1,unit:"bardak"},
{name:"Şalgam (300 ml)",kcal:35,protein:1,unit:"şişe"},
{name:"Enerji içeceği (250 ml)",kcal:112,protein:0,unit:"kutu"},

/* SOSLAR */

{name:"Ketçap (1 yemek kaşığı)",kcal:20,protein:0,unit:"adet"},
{name:"Mayonez (1 yemek kaşığı)",kcal:94,protein:0,unit:"adet"},
{name:"Acı sos (1 yemek kaşığı)",kcal:10,protein:0,unit:"adet"},
{name:"Barbekü sos (1 yemek kaşığı)",kcal:35,protein:0,unit:"adet"},
{name:"Sarımsaklı mayonez (1 yemek kaşığı)",kcal:100,protein:0,unit:"adet"},
{name:"Hardal (1 yemek kaşığı)",kcal:15,protein:1,unit:"adet"},

/* ATIŞTIRMALIKLAR */

{name:"Patlamış mısır (100 g)",kcal:390,protein:12,unit:"100 g"},
{name:"Kraker (1 paket)",kcal:220,protein:4,unit:"adet"},
{name:"Cips (100 g)",kcal:540,protein:7,unit:"100 g"},
{name:"Çubuk kraker (100 g)",kcal:380,protein:10,unit:"100 g"},
{name:"Peynirli sandviç",kcal:340,protein:14,unit:"adet"},
{name:"Ton balıklı sandviç",kcal:420,protein:28,unit:"adet"},
{name:"Tavuklu sandviç",kcal:450,protein:32,unit:"adet"},

/* TATLILAR */

{name:"Baklava (1 dilim)",kcal:180,protein:3,unit:"adet"},
{name:"Künefe (200 g)",kcal:520,protein:10,unit:"porsiyon"},
{name:"Sütlaç (200 g)",kcal:260,protein:8,unit:"kase"},
{name:"Kazandibi (200 g)",kcal:280,protein:7,unit:"kase"},
{name:"Profiterol (200 g)",kcal:450,protein:8,unit:"porsiyon"},
{name:"Cheesecake (1 dilim)",kcal:420,protein:8,unit:"adet"},
{name:"Magnolia (250 g)",kcal:480,protein:7,unit:"porsiyon"},
{name:"Dondurma (100 g)",kcal:210,protein:4,unit:"porsiyon"},
{name:"Çikolata (100 g)",kcal:540,protein:7,unit:"100 g"},
{name:"Bisküvi (1 paket)",kcal:450,protein:7,unit:"adet"},

/* KOMAGENE */

{name:"Komagene Çiğ Köfte (100 g)",kcal:180,protein:5,unit:"100 g"},
{name:"Komagene Çiğ Köfte (250 g)",kcal:450,protein:13,unit:"porsiyon"},

{name:"Komagene Dürüm (1 adet - 220 g)",kcal:420,protein:10,unit:"adet"},
{name:"Komagene Mega Dürüm (1 adet - 320 g)",kcal:620,protein:15,unit:"adet"},
{name:"Komagene Double Dürüm (1 adet - 420 g)",kcal:790,protein:20,unit:"adet"},

{name:"Komagene Etsiz Çiğ Köfte Menü (350 g)",kcal:650,protein:18,unit:"menü"},
{name:"Komagene Mega Menü (500 g)",kcal:900,protein:25,unit:"menü"},
{name:"Komagene Aile Boyu Menü (1000 g)",kcal:1800,protein:50,unit:"menü"},

{name:"Komagene Lavaş (1 adet - 60 g)",kcal:160,protein:5,unit:"adet"},
{name:"Komagene Mini Lavaş (1 adet - 30 g)",kcal:80,protein:2,unit:"adet"},

{name:"Komagene Nar Ekşisi (1 yemek kaşığı)",kcal:45,protein:0,unit:"adet"},
{name:"Komagene Acı Sos (1 yemek kaşığı)",kcal:10,protein:0,unit:"adet"},

{name:"Komagene Ayran (300 ml)",kcal:110,protein:6,unit:"şişe"},
{name:"Komagene Şalgam (300 ml)",kcal:35,protein:1,unit:"şişe"},

{name:"Komagene Marul (50 g)",kcal:8,protein:1,unit:"porsiyon"},
{name:"Komagene Turşu (50 g)",kcal:12,protein:0,unit:"porsiyon"},

/* ÇORBALAR */

{name:"Mercimek çorbası (250 ml)",kcal:150,protein:8,unit:"kase"},
{name:"Ezogelin çorbası (250 ml)",kcal:140,protein:6,unit:"kase"},
{name:"Yayla çorbası (250 ml)",kcal:120,protein:5,unit:"kase"},
{name:"Tarhana çorbası (250 ml)",kcal:130,protein:4,unit:"kase"},
{name:"Domates çorbası (250 ml)",kcal:110,protein:3,unit:"kase"},
{name:"Tavuk suyu çorba (250 ml)",kcal:100,protein:8,unit:"kase"},
{name:"İşkembe çorbası (250 ml)",kcal:180,protein:12,unit:"kase"},
{name:"Sebze çorbası (250 ml)",kcal:90,protein:3,unit:"kase"},

/* EV YEMEKLERİ */

{name:"Patates yemeği (250 g)",kcal:220,protein:5,unit:"porsiyon"},
{name:"Köfteli patates yemeği (300 g)",kcal:380,protein:22,unit:"porsiyon"},
{name:"Etli patates yemeği (300 g)",kcal:420,protein:28,unit:"porsiyon"},
{name:"Patates püresi (200 g)",kcal:180,protein:4,unit:"porsiyon"},
{name:"Kaşarlı patates püresi (200 g)",kcal:260,protein:8,unit:"porsiyon"},
{name:"Taze fasulye (250 g)",kcal:170,protein:5,unit:"porsiyon"},
{name:"Bezelye yemeği (250 g)",kcal:220,protein:8,unit:"porsiyon"},
{name:"Türlü (250 g)",kcal:180,protein:6,unit:"porsiyon"},
{name:"Bamya yemeği (250 g)",kcal:160,protein:5,unit:"porsiyon"},
{name:"Karnabahar yemeği (250 g)",kcal:140,protein:6,unit:"porsiyon"},
{name:"Karnıyarık (1 adet)",kcal:300,protein:16,unit:"porsiyon"},
{name:"Musakka (250 g)",kcal:280,protein:18,unit:"porsiyon"},
{name:"Mantı (250 g)",kcal:350,protein:14,unit:"porsiyon"},
{name:"Dolma (7 adet)",kcal:220,protein:8,unit:"porsiyon"},
{name:"Sarma (10 adet)",kcal:180,protein:6,unit:"porsiyon"},

/* ŞARKÜTERİ */

{name:"Hindi füme (1 dilim - 10 g)",kcal:11,protein:2,unit:"dilim"},
{name:"Hindi füme (1 paket - 60 g)",kcal:66,protein:12,unit:"paket"},

{name:"Dana kaburga füme (1 dilim - 10 g)",kcal:18,protein:3,unit:"dilim"},
{name:"Dana kaburga füme (1 paket - 70 g)",kcal:123,protein:20,unit:"paket"},

{name:"Beyaz peynir (1 dilim - 30 g)",kcal:80,protein:4,unit:"dilim"},
{name:"Lor peyniri (1 dilim - 30 g)",kcal:30,protein:5,unit:"dilim"},

{name:"Sucuk (1 dilim - 5 g)",kcal:23,protein:1,unit:"dilim"},
{name:"Pastırma (1 dilim - 4 g)",kcal:10,protein:1.2,unit:"dilim"},
{name:"Salam (1 dilim)",kcal:14,protein:0.8,unit:"dilim"},
{name:"Hindi salam (1 dilim - 10 g)",kcal:12,protein:1,unit:"dilim"},
{name:"Dana jambon (1 dilim - 10 g)",kcal:15,protein:2,unit:"dilim"},

/* SEK QUARK */

{name:"Sek Quark sade (140 g)",kcal:120,protein:20,unit:"kutu"},
{name:"Sek Quark çilekli (140 g)",kcal:135,protein:20,unit:"kutu"},
{name:"Sek Quark vanilyalı (140 g)",kcal:140,protein:20,unit:"kutu"},
{name:"Sek Quark limonlu cheesecake (140 g)",kcal:145,protein:20,unit:"kutu"},

/* TAVUK VE ET */

{name:"Izgara tavuk",kcal:165,protein:31,unit:"100 g"},
{name:"Tavuk göğsü",kcal:165,protein:31,unit:"100 g"},
{name:"Tavuk şiş",kcal:180,protein:30,unit:"100 g"},
{name:"Tavuk döner",kcal:215,protein:22,unit:"100 g"},
{name:"Biftek",kcal:220,protein:28,unit:"100 g"},
{name:"Köfte",kcal:250,protein:20,unit:"100 g"},
{name:"Et döner",kcal:290,protein:23,unit:"100 g"},
{name:"Kavurma",kcal:300,protein:24,unit:"100 g"},
{name:"Çıtır tavuk (100 g)",kcal:290,protein:20,unit:"100 g"},
{name:"Nugget (6 adet)",kcal:270,protein:14,unit:"porsiyon"},

/* BALIK */

{name:"Ton balığı",kcal:132,protein:28,unit:"100 g"},
{name:"Light ton balığı",kcal:110,protein:26,unit:"100 g"},
{name:"Somon",kcal:208,protein:20,unit:"100 g"},
{name:"Levrek",kcal:124,protein:24,unit:"100 g"},
{name:"Çipura",kcal:135,protein:20,unit:"100 g"},
{name:"Hamsi",kcal:131,protein:20,unit:"100 g"},

/* BAKLİYATLAR */

{name:"Kuru fasulye",kcal:170,protein:10,unit:"porsiyon"},
{name:"Nohut",kcal:180,protein:9,unit:"porsiyon"},
{name:"Yeşil mercimek",kcal:190,protein:13,unit:"porsiyon"},
{name:"Tavuklu pilav",kcal:420,protein:28,unit:"porsiyon"},
{name:"Etli kuru fasulye",kcal:280,protein:18,unit:"porsiyon"},
{name:"İmam bayıldı",kcal:210,protein:4,unit:"porsiyon"},

/* KARBONHİDRATLAR */

{name:"Yulaf",kcal:389,protein:17,unit:"100 g"},
{name:"Pirinç pilavı",kcal:220,protein:4,unit:"porsiyon"},
{name:"Bulgur pilavı",kcal:180,protein:5,unit:"porsiyon"},
{name:"Patates",kcal:77,protein:2,unit:"100 g"},
{name:"Fırın patates",kcal:93,protein:2,unit:"100 g"},
{name:"Lahmacun",kcal:220,protein:11,unit:"adet"},
{name:"Pizza",kcal:285,protein:12,unit:"dilim"},
{name:"Hamburger",kcal:295,protein:17,unit:"adet"},
{name:"Tost",kcal:350,protein:16,unit:"adet"},
{name:"Simit",kcal:272,protein:9,unit:"adet"},
{name:"Pide",kcal:450,protein:20,unit:"adet"},

/* KURUYEMİŞLER */

{name:"Badem",kcal:7,protein:0.3,unit:"adet"},
{name:"Fındık",kcal:9,protein:0.2,unit:"adet"},
{name:"Ceviz",kcal:26,protein:0.6,unit:"adet"},
{name:"Kaju",kcal:9,protein:0.3,unit:"adet"},
{name:"Antep fıstığı",kcal:4,protein:0.2,unit:"adet"},
{name:"Yer fıstığı",kcal:6,protein:0.3,unit:"adet"},
{name:"Ay çekirdeği",kcal:3,protein:0.1,unit:"adet"},
{name:"Kabak çekirdeği",kcal:5,protein:0.3,unit:"adet"},
{name:"Leblebi",kcal:4,protein:0.2,unit:"adet"},
{name:"Kuru üzüm",kcal:3,protein:0.03,unit:"adet"},
{name:"Kuru kayısı",kcal:17,protein:0.5,unit:"adet"},
{name:"Hurma",kcal:23,protein:0.2,unit:"adet"},

/* MEYVELER */

{name:"Elma",kcal:95,protein:0,unit:"adet"},
{name:"Muz",kcal:105,protein:1,unit:"adet"},
{name:"Portakal",kcal:62,protein:1,unit:"adet"},
{name:"Mandalina",kcal:47,protein:1,unit:"adet"},
{name:"Çilek",kcal:32,protein:1,unit:"100 g"},
{name:"Karpuz",kcal:30,protein:1,unit:"100 g"},

/* PROTEİN ÜRÜNLERİ */

{name:"Protein tozu",kcal:100,protein:20,unit:"25 g"},
{name:"Proteinli puding",kcal:150,protein:20,unit:"adet"},
{name:"Proteinli süt",kcal:180,protein:25,unit:"250 ml"},
{name:"Kreatin",kcal:0,protein:0,unit:"5 g"},
{name:"Proteinli süt (500 ml)",kcal:360,protein:50,unit:"şişe"},
{name:"Pınar Protein Süt (500 ml)",kcal:360,protein:50,unit:"şişe"},
{name:"Danone YoPro (160 g)",kcal:146,protein:15,unit:"kutu"},
{name:"İçim Fit Protein (500 ml)",kcal:325,protein:40,unit:"şişe"},
  

/* PROTEIN OCEAN */

{name:"Protein Ocean Protein Bar (50 g)",kcal:200,protein:20,unit:"adet"},
{name:"Protein Ocean Big Boy Protein Bar (50 g)",kcal:210,protein:20,unit:"adet"},
{name:"Protein Ocean Fıstıklı Protein Bar (50 g)",kcal:220,protein:20,unit:"adet"},
{name:"Protein Ocean Kakaolu Protein Bar (50 g)",kcal:200,protein:20,unit:"adet"},
{name:"Protein Ocean Hindistan Cevizli Protein Bar (50 g)",kcal:205,protein:20,unit:"adet"},

/* PROTEINOCEAN TAKVİYELERİ */

{name:"Protein Ocean Kreatin (5 g)",kcal:0,protein:0,unit:"ölçek"},
{name:"Protein Ocean Elektrolit (2 g)",kcal:0,protein:0,unit:"ölçek"},
{name:"Protein Ocean Energy Gel (60 ml)",kcal:121,protein:0,unit:"adet"},
{name:"Magnimore Plus",kcal:0,protein:0,unit:"tablet"},
{name:"D3 + K2",kcal:0,protein:0,unit:"damla"},
{name:"B12",kcal:0,protein:0,unit:"tablet"},

/* İÇECEKLER */

{name:"Çay",kcal:0,protein:0,unit:"bardak"},
{name:"Ayran",kcal:37,protein:2,unit:"100 ml"},
{name:"Kefir",kcal:60,protein:3.5,unit:"100 ml"},
{name:"Maden suyu",kcal:0,protein:0,unit:"şişe"},
{name:"Şekersiz soda",kcal:0,protein:0,unit:"şişe"},
{name:"Limonata (250 ml)",kcal:110,protein:0,unit:"bardak"},
  
/* KAHVELER */

{name:"Türk kahvesi",kcal:7,protein:0,unit:"fincan"},
{name:"Espresso",kcal:3,protein:0,unit:"fincan"},
{name:"Buzlu espresso",kcal:3,protein:0,unit:"fincan"},
{name:"Americano",kcal:5,protein:0,unit:"fincan"},
{name:"Buzlu americano",kcal:5,protein:0,unit:"fincan"},
{name:"Filtre kahve",kcal:5,protein:0,unit:"fincan"},
{name:"Latte",kcal:120,protein:6,unit:"fincan"},
{name:"Buzlu latte",kcal:120,protein:6,unit:"fincan"},


/* DÜRÜMLER */

{name:"Hatay dürüm",kcal:780,protein:38,unit:"adet"},
{name:"Tavuk dürüm",kcal:540,protein:35,unit:"adet"},
{name:"Et dürüm",kcal:690,protein:38,unit:"adet"},
{name:"Adana dürüm",kcal:720,protein:36,unit:"adet"},
{name:"Urfa dürüm",kcal:680,protein:34,unit:"adet"},
{name:"Tantuni",kcal:620,protein:32,unit:"adet"},
{name:"Tavuk tantuni",kcal:520,protein:34,unit:"adet"},

/* HAMBURGERLER */

{name:"Big Mac Menü",kcal:1080,protein:32,unit:"menü"},
{name:"Cheeseburger Menü",kcal:920,protein:28,unit:"menü"},
{name:"Cheeseburger",kcal:320,protein:18,unit:"adet"},
{name:"Texas Burger",kcal:980,protein:48,unit:"porsiyon"},
{name:"Smoke Burger",kcal:1050,protein:52,unit:"porsiyon"},
{name:"Cheddar Burger",kcal:1100,protein:50,unit:"porsiyon"},
{name:"BBQ Burger",kcal:1020,protein:49,unit:"porsiyon"},
{name:"Texas Steak",kcal:780,protein:60,unit:"porsiyon"},
{name:"Dana Kaburga",kcal:850,protein:55,unit:"porsiyon"},
{name:"BBQ Tavuk",kcal:690,protein:52,unit:"porsiyon"},
{name:"Çıtır Tavuk Burger",kcal:920,protein:40,unit:"porsiyon"},
{name:"King Chicken",kcal:620,protein:28,unit:"adet"},
{name:"King Chicken Menü",kcal:1120,protein:36,unit:"menü"},
{name:"Whopper",kcal:690,protein:31,unit:"adet"},
{name:"Whopper Menü",kcal:1170,protein:38,unit:"menü"},
{name:"Double Whopper",kcal:930,protein:48,unit:"adet"},
{name:"Double Whopper Menü",kcal:1410,protein:55,unit:"menü"},
{name:"Chicken Royale",kcal:660,protein:30,unit:"adet"},
{name:"Chicken Royale Menü",kcal:1140,protein:37,unit:"menü"},
{name:"Big King",kcal:540,protein:27,unit:"adet"},
{name:"Big King Menü",kcal:1020,protein:34,unit:"menü"},
{name:"Patates kızartması (orta)",kcal:340,protein:4,unit:"adet"},
{name:"Soğan halkası (8 adet)",kcal:280,protein:5,unit:"porsiyon"},
  
  /* TEXAS SMOKE HOUSE */

{name:"Texas Burger Menü",kcal:1350,protein:58,unit:"menü"},
{name:"Smoke Burger Menü",kcal:1420,protein:60,unit:"menü"},
{name:"Cheddar Burger Menü",kcal:1450,protein:62,unit:"menü"},
{name:"BBQ Burger Menü",kcal:1380,protein:59,unit:"menü"},
{name:"Patates sepeti (170 g)",kcal:420,protein:6,unit:"porsiyon"},

/* PİZZALAR */

{name:"Margherita Pizza",kcal:285,protein:12,unit:"dilim"},
{name:"Karışık Pizza",kcal:320,protein:14,unit:"dilim"},
{name:"Sucuklu Pizza",kcal:340,protein:15,unit:"dilim"},
{name:"Bol Malzemeli Pizza",kcal:360,protein:17,unit:"dilim"},

/* TAVUK DÜNYASI (standart servis tabağı) */

{name:"Kekiklim",kcal:850,protein:48,unit:"tabak"},
{name:"Şefin Tavası",kcal:920,protein:45,unit:"tabak"},
{name:"Acılı Kaşarlı",kcal:980,protein:50,unit:"tabak"},
{name:"Kremalı Mantarlı",kcal:950,protein:46,unit:"tabak"},
{name:"Barbekü Soslu",kcal:970,protein:48,unit:"tabak"},
{name:"Köri Soslu",kcal:940,protein:46,unit:"tabak"},
{name:"Soya Soslu",kcal:910,protein:45,unit:"tabak"},
{name:"Izgara Tavuk Dünyası",kcal:800,protein:52,unit:"tabak"},
  
];
