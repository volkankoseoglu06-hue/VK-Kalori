const foods = [

/* KAHVALTILIKLAR */

{name:"Yumurta",kcal:78,protein:6,unit:"adet"},
{name:"Yumurta beyazı",kcal:17,protein:4,unit:"adet"},
{name:"Beyaz peynir",kcal:265,protein:14,unit:"100 g"},
{name:"Kaşar peyniri",kcal:404,protein:25,unit:"100 g"},
{name:"Lor peyniri",kcal:100,protein:18,unit:"100 g"},
{name:"Labne",kcal:290,protein:6,unit:"100 g"},
{name:"Süzme yoğurt",kcal:97,protein:10,unit:"100 g"},
{name:"Yoğurt",kcal:61,protein:4,unit:"100 g"},
{name:"Zeytin",kcal:5,protein:0.1,unit:"adet"},
{name:"Karabuğday patlağı",kcal:19,protein:1,unit:"adet"},
{name:"Ekşi mayalı ekmek",kcal:85,protein:3,unit:"dilim"},
{name:"Tam buğday ekmeği",kcal:70,protein:3,unit:"dilim"},
{name:"Menemen",kcal:160,protein:8,unit:"porsiyon"},
{name:"Omlet",kcal:180,protein:12,unit:"porsiyon"},
{name:"Bal",kcal:64,protein:0,unit:"yemek kaşığı"},
{name:"Reçel",kcal:56,protein:0,unit:"yemek kaşığı"},
{name:"Tahin",kcal:89,protein:3,unit:"yemek kaşığı"},
{name:"Pekmez",kcal:58,protein:0,unit:"yemek kaşığı"},
{name:"Mozzarella",kcal:280,protein:22,unit:"100 g"},
{name:"Tulum peyniri",kcal:363,protein:22,unit:"100 g"},
{name:"Çeçil peyniri",kcal:290,protein:27,unit:"100 g"},
{name:"Siyah zeytin",kcal:5,protein:0.1,unit:"adet"},
{name:"Yeşil zeytin",kcal:4,protein:0.1,unit:"adet"},
{name:"Domates",kcal:18,protein:1,unit:"100 g"},
{name:"Salatalık",kcal:15,protein:1,unit:"100 g"},
{name:"Biber",kcal:20,protein:1,unit:"100 g"},
{name:"Közlenmiş biber",kcal:31,protein:1,unit:"100 g"},
{name:"Brokoli",kcal:35,protein:3,unit:"100 g"},
{name:"Ispanak",kcal:23,protein:3,unit:"100 g"},
{name:"Kabak",kcal:17,protein:1,unit:"100 g"},
{name:"Patlıcan",kcal:25,protein:1,unit:"100 g"},

/* TAVUK VE ET */

{name:"Izgara tavuk",kcal:165,protein:31,unit:"100 g"},
{name:"Tavuk göğsü",kcal:165,protein:31,unit:"100 g"},
{name:"Tavuk şiş",kcal:180,protein:30,unit:"100 g"},
{name:"Tavuk döner",kcal:215,protein:22,unit:"100 g"},
{name:"Hindi füme",kcal:110,protein:20,unit:"100 g"},
{name:"Dana kaburga füme",kcal:175,protein:28,unit:"100 g"},
{name:"Biftek",kcal:220,protein:28,unit:"100 g"},
{name:"Köfte",kcal:250,protein:20,unit:"100 g"},
{name:"Et döner",kcal:290,protein:23,unit:"100 g"},
{name:"Pastırma",kcal:250,protein:30,unit:"100 g"},
{name:"Kavurma",kcal:300,protein:24,unit:"100 g"},

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
{name:"Mercimek çorbası",kcal:150,protein:8,unit:"kase"},
{name:"Tavuklu pilav",kcal:420,protein:28,unit:"porsiyon"},
{name:"Etli kuru fasulye",kcal:280,protein:18,unit:"porsiyon"},
{name:"Mantı",kcal:350,protein:14,unit:"porsiyon"},
{name:"Dolma",kcal:220,protein:8,unit:"porsiyon"},
{name:"Sarma",kcal:180,protein:6,unit:"porsiyon"},
{name:"Karnıyarık",kcal:300,protein:16,unit:"porsiyon"},
{name:"Musakka",kcal:280,protein:18,unit:"porsiyon"},
{name:"İmam bayıldı",kcal:210,protein:4,unit:"porsiyon"},

/* KARBONHİDRATLAR */

{name:"Yulaf",kcal:389,protein:17,unit:"100 g"},
{name:"Pirinç pilavı",kcal:220,protein:4,unit:"porsiyon"},
{name:"Bulgur pilavı",kcal:180,protein:5,unit:"porsiyon"},
{name:"Makarna",kcal:220,protein:8,unit:"porsiyon"},
{name:"Patates",kcal:77,protein:2,unit:"100 g"},
{name:"Fırın patates",kcal:93,protein:2,unit:"100 g"},
{name:"Lahmacun",kcal:220,protein:11,unit:"adet"},
{name:"Pizza",kcal:285,protein:12,unit:"dilim"},
{name:"Hamburger",kcal:295,protein:17,unit:"adet"},
{name:"Cheeseburger",kcal:320,protein:18,unit:"adet"},
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
{name:"Protein bar",kcal:200,protein:20,unit:"adet"},
{name:"Proteinli puding",kcal:150,protein:20,unit:"adet"},
{name:"Proteinli süt",kcal:180,protein:25,unit:"250 ml"},
{name:"Kreatin",kcal:0,protein:0,unit:"5 g"},

/* İÇECEKLER */

{name:"Çay",kcal:0,protein:0,unit:"bardak"},
{name:"Türk kahvesi",kcal:7,protein:0,unit:"fincan"},
{name:"Americano",kcal:10,protein:0,unit:"fincan"},
{name:"Latte",kcal:120,protein:6,unit:"bardak"},
{name:"Ayran",kcal:37,protein:2,unit:"100 ml"},
{name:"Kefir",kcal:60,protein:3.5,unit:"100 ml"},
{name:"Maden suyu",kcal:0,protein:0,unit:"şişe"}

];
