const foods = [

{name:"Yumurta",kcal:78,protein:6,unit:"adet"},
{name:"Yumurta beyazı",kcal:17,protein:4,unit:"adet"},
{name:"Beyaz peynir",kcal:90,protein:6,unit:"30 g"},
{name:"Kaşar peyniri",kcal:110,protein:7,unit:"30 g"},
{name:"Lor peyniri",kcal:98,protein:18,unit:"100 g"},
{name:"Labne",kcal:230,protein:8,unit:"100 g"},
{name:"Yoğurt",kcal:61,protein:4,unit:"100 g"},
{name:"Süzme yoğurt",kcal:97,protein:10,unit:"100 g"},
{name:"Ayran",kcal:37,protein:2,unit:"100 ml"},
{name:"Süt",kcal:61,protein:3,unit:"100 ml"},
{name:"Kefir",kcal:60,protein:3,unit:"100 ml"},

{name:"Izgara tavuk",kcal:165,protein:31,unit:"100 g"},
{name:"Tavuk göğsü",kcal:165,protein:31,unit:"100 g"},
{name:"Tavuk şiş",kcal:180,protein:30,unit:"100 g"},
{name:"Tavuk döner",kcal:215,protein:22,unit:"100 g"},
{name:"Hindi füme",kcal:110,protein:19,unit:"100 g"},
{name:"Dana kaburga füme",kcal:175,protein:28,unit:"100 g"},
{name:"Biftek",kcal:220,protein:28,unit:"100 g"},
{name:"Köfte",kcal:250,protein:20,unit:"100 g"},
{name:"Et döner",kcal:290,protein:23,unit:"100 g"},

{name:"Ton balığı",kcal:132,protein:28,unit:"100 g"},
{name:"Somon",kcal:208,protein:22,unit:"100 g"},
{name:"Levrek",kcal:124,protein:23,unit:"100 g"},
{name:"Çipura",kcal:135,protein:22,unit:"100 g"},

{name:"Karabuğday patlağı",kcal:19,protein:1,unit:"adet"},
{name:"Ekşi mayalı ekmek",kcal:85,protein:3,unit:"dilim"},
{name:"Tam buğday ekmeği",kcal:70,protein:3,unit:"dilim"},
{name:"Yulaf",kcal:389,protein:17,unit:"100 g"},
{name:"Pirinç pilavı",kcal:220,protein:4,unit:"porsiyon"},
{name:"Bulgur pilavı",kcal:180,protein:5,unit:"porsiyon"},
{name:"Makarna",kcal:220,protein:8,unit:"porsiyon"},
{name:"Patates",kcal:77,protein:2,unit:"100 g"},
{name:"Fırın patates",kcal:93,protein:2,unit:"100 g"},
{name:"Patates kızartması",kcal:312,protein:3,unit:"100 g"},

{name:"Kuru fasulye",kcal:170,protein:10,unit:"porsiyon"},
{name:"Nohut",kcal:180,protein:9,unit:"porsiyon"},
{name:"Yeşil mercimek",kcal:190,protein:13,unit:"porsiyon"},
{name:"Mercimek çorbası",kcal:150,protein:8,unit:"kase"},

{name:"Elma",kcal:95,protein:0,unit:"adet"},
{name:"Muz",kcal:105,protein:1,unit:"adet"},
{name:"Portakal",kcal:62,protein:1,unit:"adet"},
{name:"Mandalina",kcal:47,protein:1,unit:"adet"},
{name:"Çilek",kcal:32,protein:1,unit:"100 g"},
{name:"Karpuz",kcal:30,protein:1,unit:"100 g"},

{name:"Protein tozu",kcal:120,protein:24,unit:"ölçek"},
{name:"Protein bar",kcal:220,protein:20,unit:"adet"},
{name:"Proteinli puding",kcal:150,protein:20,unit:"adet"},

{name:"Çay",kcal:2,protein:0,unit:"bardak"},
{name:"Türk kahvesi",kcal:7,protein:0,unit:"fincan"},
{name:"Americano",kcal:15,protein:0,unit:"bardak"},
{name:"Latte",kcal:120,protein:6,unit:"bardak"},
{name:"Maden suyu",kcal:0,protein:0,unit:"şişe"}

  /* ZEYTİNLER */

{name:"Siyah zeytin",kcal:5,protein:0.1,unit:"1 adet"},
{name:"Yeşil zeytin",kcal:4,protein:0.1,unit:"1 adet"},
{name:"Zeytin ezmesi",kcal:315,protein:1.5,unit:"100 g"},

/* KURUYEMİŞLER */

{name:"Badem",kcal:7,protein:0.3,unit:"1 adet"},
{name:"Fındık",kcal:9,protein:0.2,unit:"1 adet"},
{name:"Ceviz",kcal:26,protein:0.6,unit:"1 adet"},
{name:"Kaju",kcal:9,protein:0.3,unit:"1 adet"},
{name:"Antep fıstığı",kcal:4,protein:0.2,unit:"1 adet"},
{name:"Yer fıstığı",kcal:6,protein:0.3,unit:"1 adet"},
{name:"Ay çekirdeği",kcal:3,protein:0.1,unit:"1 adet"},
{name:"Kabak çekirdeği",kcal:5,protein:0.3,unit:"1 adet"},
{name:"Leblebi",kcal:4,protein:0.2,unit:"1 adet"},
{name:"Kuru üzüm",kcal:3,protein:0.03,unit:"1 adet"},
{name:"Kuru kayısı",kcal:17,protein:0.5,unit:"1 adet"},
{name:"Hurma",kcal:23,protein:0.2,unit:"1 adet"},

/* ŞARKÜTERİ */

{name:"Dana kaburga füme",kcal:175,protein:28,unit:"100 g"},
{name:"Hindi füme",kcal:110,protein:20,unit:"100 g"},
{name:"Pastırma",kcal:250,protein:30,unit:"100 g"},
{name:"Sucuk",kcal:452,protein:24,unit:"100 g"},
{name:"Salam",kcal:336,protein:17,unit:"100 g"},
{name:"Sosis",kcal:301,protein:12,unit:"100 g"},
{name:"Kavurma",kcal:300,protein:24,unit:"100 g"},

/* BALIK */

{name:"Ton balığı",kcal:132,protein:28,unit:"100 g"},
{name:"Light ton balığı",kcal:110,protein:26,unit:"100 g"},
{name:"Somon",kcal:208,protein:20,unit:"100 g"},
{name:"Levrek",kcal:124,protein:24,unit:"100 g"},
{name:"Çipura",kcal:135,protein:20,unit:"100 g"},
{name:"Hamsi",kcal:131,protein:20,unit:"100 g"},
{name:"Uskumru",kcal:205,protein:19,unit:"100 g"},

/* PROTEİN */

{name:"Protein tozu",kcal:100,protein:20,unit:"1 ölçek"},
{name:"Protein bar",kcal:200,protein:20,unit:"1 adet"},
{name:"Proteinli puding",kcal:150,protein:20,unit:"1 adet"},
{name:"Proteinli süt",kcal:180,protein:25,unit:"250 ml"},
{name:"Kreatin",kcal:0,protein:0,unit:"5 g"},

/* PEYNİRLER */

{name:"Beyaz peynir",kcal:265,protein:14,unit:"100 g"},
{name:"Kaşar peyniri",kcal:404,protein:25,unit:"100 g"},
{name:"Lor peyniri",kcal:100,protein:18,unit:"100 g"},
{name:"Labne",kcal:290,protein:6,unit:"100 g"},
{name:"Mozzarella",kcal:280,protein:22,unit:"100 g"},
{name:"Tulum peyniri",kcal:363,protein:22,unit:"100 g"},
{name:"Çeçil peyniri",kcal:290,protein:27,unit:"100 g"},

/* İÇECEKLER */

{name:"Türk kahvesi",kcal:7,protein:0,unit:"1 fincan"},
{name:"Americano",kcal:10,protein:0,unit:"1 fincan"},
{name:"Latte",kcal:120,protein:6,unit:"1 fincan"},
{name:"Cappuccino",kcal:80,protein:5,unit:"1 fincan"},
{name:"Çay",kcal:0,protein:0,unit:"1 bardak"},
{name:"Maden suyu",kcal:0,protein:0,unit:"1 şişe"},
{name:"Kola",kcal:42,protein:0,unit:"100 ml"},
{name:"Ayran",kcal:37,protein:2,unit:"100 ml"},
{name:"Kefir",kcal:60,protein:3.5,unit:"100 ml"},

/* HAZIR YİYECEKLER */

{name:"Lahmacun",kcal:220,protein:11,unit:"1 adet"},
{name:"Pizza",kcal:285,protein:12,unit:"1 dilim"},
{name:"Hamburger",kcal:295,protein:17,unit:"1 adet"},
{name:"Cheeseburger",kcal:320,protein:18,unit:"1 adet"},
{name:"Börek",kcal:330,protein:9,unit:"1 porsiyon"},
{name:"Tost",kcal:350,protein:16,unit:"1 adet"},
{name:"Simit",kcal:272,protein:9,unit:"1 adet"},
{name:"Pide",kcal:450,protein:20,unit:"1 adet"}
];
