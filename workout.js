const WORKOUT_KEY='vk_workout_log_v1';
const W={
1:{name:'Full Body A',focus:'Temel kuvvet • kontrollü tempo',ex:[
['Goblet Squat','Bacak • kalça',3,'8–12','squat',['Dambılı göğüste tut.','Kalça ve dizleri birlikte bükerek kontrollü in.','Topuklardan kuvvet alarak kalk.'],['Dizleri içeri düşürme.','Ağırlığı öne savurma.'],'ACE Exercise Library','https://www.acefitness.org/resources/everyone/exercise-library/equipment/dumbbells/'],
['Dambıl Bench Press','Göğüs • ön omuz • triceps',3,'8–12','press',['Ayaklar yere sağlam bassın; baş, omuz ve kalça bench ile temaslı kalsın.','Dambılları kontrollü göğsün orta hattına indir.','Bilekleri nötr tutup yukarı it.'],['Dambılları zıplatma.','Belini aşırı çukurlaştırma.'],'ACE Chest Press','https://www.acefitness.org/resources/everyone/exercise-library/19/chest-press/'],
['Tek Kol Dambıl Row','Sırt • arka omuz • biceps',3,'8–12/kol','row',['Bir el ve aynı taraftaki diz bench üzerinde destek olsun.','Dambılı kalçaya doğru çek.','Gövdeyi sabit tut.'],['Gövdeyi döndürme.','Momentumla savurma.'],'ACE Workout Builder','https://www.acefitness.org/continuing-education/certified/april-2025/8841/the-ace-workout-builder-for-high-intensity-resistance-training/'],
['Dambıl Romanian Deadlift','Arka bacak • kalça',2,'8–12','hinge',['Dizleri hafif bük, kalçayı geriye gönder.','Dambılları bacaklara yakın indir.','Kalçayı öne getirerek kalk.'],['Belden kamburlaşma.','Ağırlığı öne savurma.'],'ACE Workout Builder','https://www.acefitness.org/continuing-education/certified/april-2025/8841/the-ace-workout-builder-for-high-intensity-resistance-training/'],
['Hammer Curl','Biceps • ön kol',2,'10–12','curl',['Avuçlar birbirine bakacak.','Dirsekleri gövdeye yakın tut.','Yukarı kontrollü, aşağı yavaş.'],['Belden momentum alma.','Dirsekleri öne kaçırma.'],'ACE Workout Builder','https://www.acefitness.org/continuing-education/certified/april-2025/8841/the-ace-workout-builder-for-high-intensity-resistance-training/']]},
2:{name:'Full Body B',focus:'Çekiş • omuz • tek taraflı bacak',ex:[
['Destekli Split Squat','Bacak • kalça',3,'8–10/kol','squat',['Bench yanında hafif destek kullan.','Ön ayağın tamamı yerde kalsın.','Kontrollü alçal ve öndeki bacaktan yüksel.'],['Dizi içeri kaçırma.','Denge bozuluyorsa ağırlığı azalt.'],'ACE Exercise Library','https://www.acefitness.org/resources/everyone/exercise-library/equipment/dumbbells/'],
['Eğimli Dambıl Press','Üst göğüs • omuz • triceps',3,'8–12','press',['Bench açısını orta seviyede ayarla.','Kürek kemiklerini geriye-aşağı al.','Dambılları üst göğse indirip dengeli it.'],['Omuzları öne düşürme.','Ağırlığı kontrolsüz bırakma.'],'ACE Incline Chest Press','https://www.acefitness.org/resources/everyone/exercise-library/25/incline-chest-press/'],
['Bench Destekli Dambıl Row','Sırt • arka omuz',3,'10–12','row',['Göğsü eğimli bench üzerine destekle.','Dambılları kaburgalara doğru çek.','Üst noktada kısa sıkıştırıp yavaş bırak.'],['Boynu öne uzatma.','Omuzları kulaklara kaldırma.'],'ACE Exercise Library','https://www.acefitness.org/resources/everyone/exercise-library/'],
['Bench Glute Bridge','Kalça • arka bacak',3,'10–15','bridge',['Omuzları bench üzerine sabitle.','Kalçayı kontrollü kaldır.','Üstte kalçayı sık, belden aşırı yaylanma.'],['Hareketi belden yapma.','Savurma.'],'ACE Exercise Library','https://www.acefitness.org/resources/everyone/exercise-library/equipment/dumbbells/'],
['Oturarak Dambıl Shoulder Press','Omuz • triceps',2,'8–12','press',['Sırtlığı destek olarak kullan.','Dambılları omuz hizasından başlat.','Momentum almadan yukarı it.'],['Belden aşırı geriye yatma.','Dambılları çarpıştırma.'],'ACE Shoulder Guide','https://www.acefitness.org/continuing-education/prosource/september-2014/4972/dynamite-delts-ace-research-identifies-top-shoulder-exercises/']]},
3:{name:'Full Body C',focus:'Hareket kalitesi • omuz • core',ex:[
['Dambıl Front Squat','Bacak • kalça • core',3,'8–12','squat',['Dambılları omuzlarda güvenli konumda tut.','Gövdeyi kontrollü dik tut.','Topuklardan iterek kalk.'],['Dizleri içeri bırakma.','Gövdeyi öne yığma.'],'ACE Exercise Library','https://www.acefitness.org/resources/everyone/exercise-library/equipment/dumbbells/'],
['Dambıl Floor Press','Göğüs • triceps',3,'8–12','press',['Sırtüstü yat, dizleri bük.','Üst kollar yere hafifçe temas edince dur.','Dambılları kontrollü yukarı it.'],['Dirsekleri sertçe yere çarptırma.','Bilekleri bükme.'],'ACE Chest Press','https://www.acefitness.org/resources/everyone/exercise-library/19/chest-press/'],
['Rear-Delt Row','Arka omuz • üst sırt',2,'10–15','row',['Gövdeyi kontrollü öne eğ.','Dirsekleri yana açarak çek.','Üst sırtı sıkıp yavaş indir.'],['Boynu kaldırma.','Belden savurma.'],'ACE Shoulder Guide','https://www.acefitness.org/continuing-education/prosource/september-2014/4972/dynamite-delts-ace-research-identifies-top-shoulder-exercises/'],
['Lateral Raise','Yan omuz',2,'10–15','raise',['Kollar hafif bükülü.','Dambılları omuz hizasına kadar kontrollü kaldır.','İnerken ağırlığı bırakma.'],['Omuzları shrug yapma.','Ağırlığı savurma.'],'ACE Shoulder Guide','https://www.acefitness.org/continuing-education/prosource/september-2014/4972/dynamite-delts-ace-research-identifies-top-shoulder-exercises/'],
['Dead Bug','Core',2,'8–10/yan','core',['Karın bölgesini kontrollü sık.','Karşı kol ve bacağı yavaş uzat.','Nefesi tutma.'],['Bel kontrolünü kaybetme.','Hızı artırma.'],'ACE Exercise Library','https://www.acefitness.org/resources/everyone/exercise-library/']]}}
let S=load();let day=1;let selected=null;let timer=null;let sec=90;let active=false;let activeSet=1;let activeExercise=0;
function load(){try{return JSON.parse(localStorage.getItem(WORKOUT_KEY))||{logs:[],weights:{},done:{}}}catch(e){return{logs:[],weights:{},done:{}}}}
function save(){localStorage.setItem(WORKOUT_KEY,JSON.stringify(S))}
function today(){return new Date().toISOString().slice(0,10)}
function key(id){return day+'_'+id}
function initWorkout(){
 if(!document.getElementById('workoutPage'))return;
 tabs();render();history();
 document.getElementById('workoutDayTabs').onclick=e=>{let b=e.target.closest('[data-day]');if(!b)return;day=+b.dataset.day;tabs();render()};
 document.getElementById('workoutDetail').onclick=e=>{let b=e.target.closest('[data-open]');if(b)open(+b.dataset.open);let d=e.target.closest('[data-done]');if(d)toggle(+d.dataset.done)};
 document.getElementById('workoutModal').onclick=e=>{if(e.target.id==='workoutModal'||e.target.matches('[data-close]'))close();if(e.target.matches('[data-save]'))log()};
 document.getElementById('restTimerBtn').onclick=()=>rest(90); document.getElementById('walkingGoButton').onclick=()=>{document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));document.getElementById('sportPage').classList.add('active');document.getElementById('sportType').value='walk';document.getElementById('sportDuration').value=30;document.getElementById('sportSpeed').value=5;document.getElementById('sportIncline').value=0;if(typeof calculateSport==='function')calculateSport();}; document.getElementById('startWorkoutButton').onclick=()=>{if(active){stopWorkout()}else startGuided()};
 ['workoutWeight','workoutSetsDone','workoutRepsDone'].forEach(id=>document.getElementById(id).oninput=preview);
}
function tabs(){const icons=['🅰️','🅱️','🆑'];document.getElementById('workoutDayTabs').innerHTML=[1,2,3].map((d,i)=>'<button class="workout-day '+(d===day?'active':'')+'" data-day="'+d+'"><span class="day-icon">'+icons[i]+'</span><span class="day-label"><strong>Gün '+d+'</strong><small>'+W[d].name.replace('Full Body ','')+'</small></span><span class="day-arrow">›</span></button>').join('')}
function startGuided(){clearInterval(timer);Object.keys(S.done).forEach(k=>{if(S.done[k]===today())delete S.done[k]});save();active=true;activeExercise=0;activeSet=1;render();renderActive();const b=document.getElementById('startWorkoutButton');b.textContent='⏹️ Antrenmanı Durdur';b.classList.add('stop-workout')}
function stopWorkout(){active=false;clearInterval(timer);sec=90;const b=document.getElementById('startWorkoutButton');b.textContent='▶️ Yeni Antrenman';b.classList.remove('stop-workout');renderActive()}

function renderActive(){let panel=document.getElementById('activeWorkoutPanel');if(!panel)return;if(!active){panel.innerHTML='';return}let x=W[day].ex[activeExercise],total=W[day].ex.length;panel.innerHTML='<div class="active-workout"><span class="eyebrow">AKTİF ANTRENMAN</span><h3>'+x[0]+'</h3><div>'+x[1]+' • '+activeSet+'/'+x[2]+' set • '+x[3]+' tekrar</div><div class="set-controls"><input id="activeWeight" type="number" min="0" step="0.5" placeholder="Ağırlık kg" value="'+(S.weights[key(x[0])]||'')+'"><input id="activeReps" type="number" min="1" value="'+((x[3].match(/^\\d+/)||['10'])[0])+'"></div><div class="active-set"><span>Set '+activeSet+' hazır</span><button id="completeActiveSet">✓ Seti Tamamla</button></div><div class="active-next">Hareket '+(activeExercise+1)+'/'+total+' • Sonraki: '+(W[day].ex[activeExercise+1]?.[0]||'Antrenman biter')+'</div><button class="technique-btn" id="activeTechnique">▶ Tekniği göster</button></div>';document.getElementById('completeActiveSet').onclick=completeActiveSet;document.getElementById('activeTechnique').onclick=()=>open(activeExercise)}
function completeActiveSet(){let x=W[day].ex[activeExercise],wt=+document.getElementById('activeWeight').value||0,reps=+document.getElementById('activeReps').value||10;S.logs.unshift({date:today(),day,exercise:x[0],weight:wt,sets:1,reps,rpe:7});if(wt)S.weights[key(x[0])]=wt;save();rest(90);if(activeSet<x[2])activeSet++;else if(activeExercise<W[day].ex.length-1){activeExercise++;activeSet=1}else{active=false;clearInterval(timer);const b=document.getElementById('startWorkoutButton');b.textContent='🔄 Yeni Antrenman';b.classList.remove('stop-workout');alert('Antrenman tamamlandı 🎉')}render();history();renderActive();if(typeof updateDashboard==='function')updateDashboard()}
function render(){
 let w=W[day],done=w.ex.filter(x=>S.done[key(x[0])]===today()).length;
 document.getElementById('workoutTitle').textContent=w.name;document.getElementById('workoutSubtitle').textContent=w.focus;document.getElementById('workoutProgress').textContent=done+'/'+w.ex.length+' hareket';
 const icons={squat:'🦵',press:'🏋️',row:'🪽',hinge:'🍑',curl:'💪',bridge:'🍑',raise:'💪',core:'🧱'};
 document.getElementById('workoutDetail').innerHTML=w.ex.map((x,i)=>{let k=key(x[0]),ok=S.done[k]===today(),wt=S.weights[k]||'',icon=icons[x[4]]||'🏋️';return '<article class="exercise-card '+(ok?'done':'')+'"><div class="exercise-icon">'+icon+'</div><div class="exercise-main" data-open="'+i+'"><div class="exercise-head"><div><h3>'+x[0]+'</h3><div class="muscle-tags">'+x[1].split(' • ').map(m=>'<span>'+m+'</span>').join('')+'</div></div><span class="exercise-check">'+(ok?'✓':'○')+'</span></div><div class="exercise-meta"><span>'+x[2]+' set</span><span>'+x[3]+' tekrar</span><span>'+x[6]+' sn</span>'+(wt?'<span>'+wt+' kg</span>':'')+'</div><button class="technique-btn" data-open="'+i+'">▶ Nasıl yapılır?</button></div><button class="done-btn" data-done="'+i+'">'+(ok?'✓ Yapıldı':'Yaptım')+'</button></article>'}).join('')
}
function toggle(i){let x=W[day].ex[i];let k=key(x[0]);S.done[k]=S.done[k]===today()?null:today();if(!S.done[k])delete S.done[k];save();render();if(typeof updateDashboard==='function')updateDashboard()}
function open(i){
 selected=W[day].ex[i];let k=key(selected[0]);
 document.getElementById('workoutModalTitle').textContent=selected[0];document.getElementById('workoutModalMuscle').textContent=selected[1];
 document.getElementById('workoutAnimation').innerHTML=svg(selected[4]);
 document.getElementById('workoutCues').innerHTML=selected[5].map(x=>'<li>'+x+'</li>').join('');
 document.getElementById('workoutMistakes').innerHTML=selected[6].map(x=>'<li>'+x+'</li>').join('');
 document.getElementById('workoutSource').innerHTML='<a target="_blank" rel="noopener" href="'+selected[8]+'">'+selected[7]+' ↗</a>';
 document.getElementById('workoutWeight').value=S.weights[k]||'';document.getElementById('workoutSetsDone').value=selected[2];document.getElementById('workoutRepsDone').value=(selected[3].match(/^\d+/)||['10'])[0];document.getElementById('workoutRpe').value='7';preview();document.getElementById('workoutModal').classList.add('open')
}
function preview(){document.getElementById('modalVolume').textContent=document.getElementById('workoutWeight').value||'—';document.getElementById('modalSets').textContent=document.getElementById('workoutSetsDone').value||'—';document.getElementById('modalReps').textContent=document.getElementById('workoutRepsDone').value||'—'}
function log(){
 if(!selected)return;let wt=+document.getElementById('workoutWeight').value||0,k=key(selected[0]);
 S.logs.unshift({date:today(),day,exercise:selected[0],weight:wt,sets:+document.getElementById('workoutSetsDone').value||0,reps:+document.getElementById('workoutRepsDone').value||0,rpe:+document.getElementById('workoutRpe').value||7});
 if(wt)S.weights[k]=wt;S.done[k]=today();save();close();render();history()
}
function close(){document.getElementById('workoutModal').classList.remove('open');selected=null}
function history(){document.getElementById('workoutHistory').innerHTML=S.logs.slice(0,15).map(x=>'<div class="workout-history-item"><strong>'+new Date(x.date+'T12:00:00').toLocaleDateString('tr-TR')+'</strong><span>Gün '+x.day+' • '+x.exercise+'</span><span>'+x.weight+' kg × '+x.sets+' × '+x.reps+' • RPE '+x.rpe+'</span></div>').join('')||'<div class="empty-state">Henüz kayıt yok. İlk antrenmandan sonra burada görünecek.</div>'}
function rest(n){clearInterval(timer);sec=n;let b=document.getElementById('restTimerBtn');timer=setInterval(()=>{b.textContent='⏱️ Dinlenme '+Math.floor(sec/60)+':'+String(sec%60).padStart(2,'0');if(sec--<=0){clearInterval(timer);b.textContent='⏱️ 90 sn dinlenme'}},1000)}
function svg(t){
const figures={
squat:`
<g class="human">
  <circle class="head" cx="120" cy="30" r="12"/>
  <path class="body" d="M120 44 L120 92"/>
  <path class="limb" d="M120 55 L88 68 L68 88"/>
  <path class="limb" d="M120 55 L152 68 L172 88"/>
  <path class="limb" d="M120 92 L92 125 L80 172"/>
  <path class="limb" d="M120 92 L148 125 L160 172"/>
  <path class="shoe" d="M70 174 L88 174 M150 174 L168 174"/>
  <path class="equipment" d="M82 67 H158 M86 61 V73 M154 61 V73"/>
</g>`,
press:`
<path class="bench" d="M55 145 H190 M72 145 L65 180 M170 145 L178 180 M72 128 H172"/>
<g class="human">
  <circle class="head" cx="77" cy="105" r="11"/>
  <path class="body" d="M88 110 L130 128"/>
  <path class="limb" d="M100 116 L92 88 L82 70"/>
  <path class="limb" d="M125 125 L135 96 L145 72"/>
  <path class="limb" d="M125 128 L155 145"/>
  <path class="limb" d="M104 120 L76 142"/>
  <path class="shoe" d="M151 145 H168"/>
  <path class="equipment" d="M72 68 H92 M65 63 V73 M99 63 V73 M135 70 H155 M128 65 V75 M162 65 V75"/>
</g>`,
row:`
<g class="human">
  <circle class="head" cx="112" cy="45" r="11"/>
  <path class="body" d="M105 56 L78 92 L105 112"/>
  <path class="limb" d="M78 92 L48 116 L35 145"/>
  <path class="limb" d="M78 92 L112 112 L145 142"/>
  <path class="limb" d="M105 112 L88 150"/>
  <path class="limb" d="M105 112 L128 150"/>
  <path class="shoe" d="M80 153 H97 M122 153 H139"/>
  <path class="equipment" d="M32 145 H55 M26 139 V151 M61 139 V151"/>
</g>`,
hinge:`
<g class="human">
  <circle class="head" cx="150" cy="48" r="11"/>
  <path class="body" d="M140 58 L102 92 L82 115"/>
  <path class="limb" d="M102 92 L68 120 L55 150"/>
  <path class="limb" d="M82 115 L105 150 L112 176"/>
  <path class="limb" d="M82 115 L60 150 L52 176"/>
  <path class="shoe" d="M43 178 H62 M104 178 H121"/>
  <path class="equipment" d="M63 116 H105 M58 110 V122 M110 110 V122"/>
</g>`,
curl:`
<g class="human">
  <circle class="head" cx="120" cy="30" r="12"/>
  <path class="body" d="M120 44 L120 105"/>
  <path class="limb" d="M120 55 L88 78 L90 106"/>
  <path class="limb" d="M120 55 L152 78 L150 106"/>
  <path class="limb" d="M120 105 L94 142 L88 174"/>
  <path class="limb" d="M120 105 L146 142 L152 174"/>
  <path class="shoe" d="M78 176 H96 M144 176 H162"/>
  <path class="equipment" d="M76 107 H104 M70 101 V113 M110 101 V113 M136 107 H164 M130 101 V113 M170 101 V113"/>
</g>`,
bridge:`
<g class="human">
  <circle class="head" cx="64" cy="132" r="11"/>
  <path class="body" d="M75 128 L112 100 L151 120"/>
  <path class="limb" d="M151 120 L174 151 L183 174"/>
  <path class="limb" d="M112 100 L132 72 L150 60"/>
  <path class="limb" d="M112 100 L92 72 L72 60"/>
  <path class="equipment" d="M90 104 H134"/>
</g>
<path class="bench" d="M105 150 H190 M122 150 L116 178 M178 150 L184 178"/>`,
raise:`
<g class="human">
  <circle class="head" cx="120" cy="30" r="12"/>
  <path class="body" d="M120 44 L120 105"/>
  <path class="limb" d="M120 55 L90 82 L62 104"/>
  <path class="limb" d="M120 55 L150 82 L178 104"/>
  <path class="limb" d="M120 105 L95 142 L90 174"/>
  <path class="limb" d="M120 105 L145 142 L150 174"/>
  <path class="shoe" d="M80 176 H98 M142 176 H160"/>
  <path class="equipment" d="M52 104 H70 M46 98 V110 M76 98 V110 M170 104 H188 M164 98 V110 M194 98 V110"/>
</g>`,
core:`
<g class="human">
  <circle class="head" cx="82" cy="95" r="11"/>
  <path class="body" d="M94 98 L130 108 L162 105"/>
  <path class="limb" d="M162 105 L190 126"/>
  <path class="limb" d="M130 108 L108 139 L85 166"/>
  <path class="limb" d="M130 108 L148 139 L172 164"/>
  <path class="limb" d="M104 98 L76 76"/>
</g>`
};
return '<svg class="exercise-svg exercise-'+t+'" viewBox="0 0 240 200" role="img" aria-label="Animasyonlu '+t+' hareketi"><line class="ground" x1="30" y1="182" x2="210" y2="182"/><g class="body-move">'+(figures[t]||figures.squat)+'</g></svg>';
}
document.addEventListener('DOMContentLoaded',initWorkout);