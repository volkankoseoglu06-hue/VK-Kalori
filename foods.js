const foods = [

/* KAHVALTILIKLAR */

{name:"Yumurta",kcal:78,protein:6,unit:"adet"},
{name:"Haşlanmış yumurta",kcal:78,protein:6,unit:"adet"},
{name:"Omlet",kcal:180,protein:13,unit:"porsiyon"},
{name:"Menemen",kcal:210,protein:12,unit:"porsiyon"},
{name:"Beyaz peynir",kcal:90,protein:6,unit:"dilim"},
{name:"Kaşar peyniri",kcal:110,protein:7,unit:"dilim"},
{name:"Lor peyniri",kcal:60,protein:11,unit:"100 g"},
{name:"Labne",kcal:80,protein:4,unit:"yemek kaşığı"},
{name:"Zeytin",kcal:40,protein:0,unit:"10 adet"},
{name:"Bal",kcal:64,protein:0,unit:"yemek kaşığı"},
{name:"Reçel",kcal:55,protein:0,unit:"yemek kaşığı"},
{name:"Karabuğday patlağı",kcal:19,protein:1,unit:"adet"},
{name:"Yulaf",kcal:117,protein:5,unit:"30 g"},
{name:"Granola",kcal:140,protein:4,unit:"30 g"},

/* EKMEKLER */

{name:"Ekşi mayalı ekmek",kcal:85,protein:3,unit:"dilim"},
{name:"Tam buğday ekmeği",kcal:70,protein:3,unit:"dilim"},
{name:"Çavdar ekmeği",kcal:65,protein:3,unit:"dilim"},
{name:"Kepek ekmeği",kcal:68,protein:3,unit:"dilim"},
{name:"Lavaş",kcal:180,protein:6,unit:"adet"},
{name:"Simit",kcal:270,protein:9,unit:"adet"},
{name:"Tost",kcal:320,protein:14,unit:"adet"},

/* TAVUK VE ET */

{name:"Izgara tavuk",kcal:165,protein:31,unit:"100 g"},
{name:"Tavuk göğsü",kcal:165,protein:31,unit:"100 g"},
{name:"Tavuk şiş",kcal:180,protein:30,unit:"100 g"},
{name:"Tavuk döner",kcal:215,protein:22,unit:"100 g"},
{name:"Hindi füme",kcal:35,protein:6,unit:"dilim"},
{name:"Dana kaburga füme",kcal:30,protein:5,unit:"dilim"},
{name:"Köfte",kcal:250,protein:20,unit:"100 g"},
{name:"Et döner",kcal:290,protein:23,unit:"100 g"},
{name:"Biftek",kcal:220,protein:28,unit:"100 g"},
{name:"Bonfile",kcal:210,protein:29,unit:"100 g"},
{name:"Kuzu eti",kcal:280,protein:25,unit:"100 g"},

/* BALIK */

{name:"Ton balığı",kcal:132,protein:28,unit:"100 g"},
{name:"Somon",kcal:208,protein:22,unit:"100 g"},
{name:"Levrek",kcal:124,protein:23,unit:"100 g"},
{name:"Çipura",kcal:135,protein:22,unit:"100 g"},
{name:"Hamsi",kcal:210,protein:20,unit:"100 g"},

/* SÜT ÜRÜNLERİ */

{name:"Yoğurt",kcal:120,protein:8,unit:"kase"},
{name:"Süzme yoğurt",kcal:150,protein:10,unit:"kase"},
{name:"Kefir",kcal:110,protein:6,unit:"bardak"},
{name:"Ayran",kcal:68,protein:3,unit:"bardak"},
{name:"Süt",kcal:122,protein:8,unit:"bardak"},
{name:"Proteinli yoğurt",kcal:140,protein:15,unit:"kase"},

/* BAKLİYAT */

{name:"Kuru fasulye",kcal:170,protein:10,unit:"porsiyon"},
{name:"Nohut",kcal:180,protein:9,unit:"porsiyon"},
{name:"Yeşil mercimek",kcal:190,protein:13,unit:"porsiyon"},
{name:"Barbunya",kcal:175,protein:9,unit:"porsiyon"},
{name:"Mercimek çorbası",kcal:150,protein:8,unit:"kase"},
{name:"Ezogelin çorbası",kcal:130,protein:6,unit:"kase"},
{name:"Tarhana çorbası",kcal:140,protein:5,unit:"kase"},

/* KARBONHİDRATLAR */

{name:"Pirinç pilavı",kcal:220,protein:4,unit:"porsiyon"},
{name:"Bulgur pilavı",kcal:180,protein:5,unit:"porsiyon"},
{name:"Makarna",kcal:220,protein:8,unit:"porsiyon"},
{name:"Tam buğday makarna",kcal:200,protein:9,unit:"porsiyon"},
{name:"Haşlanmış pirinç",kcal:130,protein:3,unit:"100 g"},
{name:"Patates",kcal:160,protein:4,unit:"porsiyon"},
{name:"Fırın patates",kcal:180,protein:4,unit:"porsiyon"},
{name:"Patates püresi",kcal:120,protein:3,unit:"100 g"},
{name:"Patates kızartması",kcal:312,protein:4,unit:"100 g"},

/* SEBZELER */

{name:"Taze fasulye",kcal:120,protein:4,unit:"porsiyon"},
{name:"Karnıyarık",kcal:280,protein:18,unit:"porsiyon"},
{name:"İmam bayıldı",kcal:220,protein:4,unit:"porsiyon"},
{name:"Biber dolması",kcal:190,protein:6,unit:"adet"},
{name:"Yaprak sarma",kcal:35,protein:1,unit:"adet"},
{name:"Bezelye",kcal:150,protein:7,unit:"porsiyon"},
{name:"Ispanak",kcal:90,protein:5,unit:"porsiyon"},
{name:"Brokoli",kcal:55,protein:4,unit:"100 g"},

/* FAST FOOD */

{name:"Hamburger",kcal:350,protein:18,unit:"adet"},
{name:"Cheeseburger",kcal:420,protein:22,unit:"adet"},
{name:"Pizza",kcal:285,protein:12,unit:"dilim"},
{name:"Lahmacun",kcal:220,protein:10,unit:"adet"},
{name:"Pide",kcal:430,protein:18,unit:"porsiyon"},
{name:"Tavuklu sandviç",kcal:340,protein:24,unit:"adet"},
{name:"Tost",kcal:320,protein:14,unit:"adet"},

/* MEYVELER */

{name:"Elma",kcal:95,protein:0,unit:"adet"},
{name:"Muz",kcal:105,protein:1,unit:"adet"},
{name:"Portakal",kcal:62,protein:1,unit:"adet"},
{name:"Mandalina",kcal:47,protein:1,unit:"adet"},
{name:"Çilek",kcal:49,protein:1,unit:"100 g"},
{name:"Karpuz",kcal:85,protein:2,unit:"dilim"},
{name:"Kavun",kcal:60,protein:1,unit:"dilim"},
{name:"Üzüm",kcal:70,protein:1,unit:"100 g"},
{name:"Şeftali",kcal:58,protein:1,unit:"adet"},
{name:"Kiraz",kcal:63,protein:1,unit:"100 g"},

/* KURUYEMİŞLER */

{name:"Badem",kcal:170,protein:6,unit:"30 g"},
{name:"Fındık",kcal:188,protein:4,unit:"30 g"},
{name:"Ceviz",kcal:196,protein:5,unit:"30 g"},
{name:"Antep fıstığı",kcal:170,protein:6,unit:"30 g"},
{name:"Kaju",kcal:165,protein:5,unit:"30 g"},

/* SPOR BESİNLERİ */

{name:"Protein tozu",kcal:120,protein:20,unit:"ölçek"},
{name:"Whey protein",kcal:120,protein:24,unit:"ölçek"},
{name:"Protein bar",kcal:220,protein:20,unit:"adet"},
{name:"Fit browni",kcal:280,protein:20,unit:"adet"},
{name:"Yüksek proteinli puding",kcal:150,protein:20,unit:"adet"},

/* İÇECEKLER */

{name:"Çay",kcal:2,protein:0,unit:"bardak"},
{name:"Türk kahvesi",kcal:7,protein:0,unit:"fincan"},
{name:"Americano",kcal:15,protein:0,unit:"bardak"},
{name:"Latte",kcal:120,protein:6,unit:"bardak"},
{name:"Kola",kcal:140,protein:0,unit:"kutu"},
{name:"Maden suyu",kcal:0,protein:0,unit:"şişe"}

];
