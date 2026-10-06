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
let S=load();let day=1;let selected=null;let active=false;let activeSet=1;let activeExercise=0;
function load(){try{return JSON.parse(localStorage.getItem(WORKOUT_KEY))||{logs:[],weights:{},done:{}}}catch(e){return{logs:[],weights:{},done:{}}}}
function save(){localStorage.setItem(WORKOUT_KEY,JSON.stringify(S))}
function today(){
 const d=new Date();
 const y=d.getFullYear();
 const m=String(d.getMonth()+1).padStart(2,'0');
 const day=String(d.getDate()).padStart(2,'0');
 return `${y}-${m}-${day}`;
}
function key(id){return day+'_'+id}
function initWorkout(){
 if(!document.getElementById('workoutPage'))return;
 tabs();render();history();
 document.getElementById('workoutDayTabs').onclick=e=>{let b=e.target.closest('[data-day]');if(!b)return;day=+b.dataset.day;tabs();render()};
 document.getElementById('workoutDetail').onclick=e=>{let b=e.target.closest('[data-open]');if(b)open(+b.dataset.open);let d=e.target.closest('[data-done]');if(d)toggle(+d.dataset.done)};
 document.getElementById('workoutModal').onclick=e=>{if(e.target.id==='workoutModal'||e.target.matches('[data-close]'))close();if(e.target.matches('[data-save]'))log()};
 const planWalk=(minutes)=>{document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));document.getElementById('sportPage').classList.add('active');document.getElementById('sportType').value='walk';document.getElementById('sportDuration').value=minutes;document.getElementById('sportSpeed').value=5;document.getElementById('sportIncline').value=0;if(typeof calculateSport==='function')calculateSport();};
 document.getElementById('walkingPreButton').onclick=()=>planWalk(10);
 document.getElementById('walkingPostButton').onclick=()=>planWalk(20);
 document.getElementById('walkingRestButton').onclick=()=>planWalk(30);
 document.getElementById('startWorkoutButton').onclick=()=>{if(active){stopWorkout()}else startGuided()};
 ['workoutWeight','workoutSetsDone','workoutRepsDone'].forEach(id=>document.getElementById(id).oninput=preview);
}
function tabs(){const icons=['🅰️','🅱️','🆑'];document.getElementById('workoutDayTabs').innerHTML=[1,2,3].map((d,i)=>'<button class="workout-day '+(d===day?'active':'')+'" data-day="'+d+'"><span class="day-icon">'+icons[i]+'</span><span class="day-label"><strong>Gün '+d+'</strong><small>'+W[d].name.replace('Full Body ','')+'</small></span><span class="day-arrow">›</span></button>').join('')}
function startGuided(){clearInterval(timer);Object.keys(S.done).forEach(k=>{if(S.done[k]===today())delete S.done[k]});save();active=true;activeExercise=0;activeSet=1;render();renderActive();const b=document.getElementById('startWorkoutButton');b.textContent='⏹️ Antrenmanı Durdur';b.classList.add('stop-workout')}
function stopWorkout(){active=false;clearInterval(timer);sec=90;const b=document.getElementById('startWorkoutButton');b.textContent='▶️ Yeni Antrenman';b.classList.remove('stop-workout');renderActive()}

function renderActive(){let panel=document.getElementById('activeWorkoutPanel');if(!panel)return;if(!active){panel.innerHTML='';return}let x=W[day].ex[activeExercise],total=W[day].ex.length;panel.innerHTML='<div class="active-workout"><span class="eyebrow">AKTİF ANTRENMAN</span><h3>'+x[0]+'</h3><div>'+x[1]+' • '+activeSet+'/'+x[2]+' set • '+x[3]+' tekrar</div><div class="set-controls"><input id="activeWeight" type="number" min="0" step="0.5" placeholder="Ağırlık kg" value="'+(S.weights[key(x[0])]||'')+'"><input id="activeReps" type="number" min="1" value="'+((x[3].match(/^\\d+/)||['10'])[0])+'"></div><div class="active-set"><span>Set '+activeSet+' hazır</span><button id="completeActiveSet">✓ Seti Tamamla</button></div><div class="active-next">Hareket '+(activeExercise+1)+'/'+total+' • Sonraki: '+(W[day].ex[activeExercise+1]?.[0]||'Antrenman biter')+'</div><button class="technique-btn" id="activeTechnique">▶ Tekniği göster</button></div>';document.getElementById('completeActiveSet').onclick=completeActiveSet;document.getElementById('activeTechnique').onclick=()=>open(activeExercise)}
function completeActiveSet(){let x=W[day].ex[activeExercise],wt=+document.getElementById('activeWeight').value||0,reps=+document.getElementById('activeReps').value||10;S.logs.unshift({date:today(),day,exercise:x[0],weight:wt,sets:1,reps,rpe:7});if(wt)S.weights[key(x[0])]=wt;save();if(activeSet<x[2])activeSet++;else if(activeExercise<W[day].ex.length-1){activeExercise++;activeSet=1}else{active=false;clearInterval(timer);const b=document.getElementById('startWorkoutButton');b.textContent='🔄 Yeni Antrenman';b.classList.remove('stop-workout');alert('Antrenman tamamlandı 🎉')}render();history();renderActive();if(typeof updateDashboard==='function')updateDashboard()}
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
function history(){document.getElementById('workoutHistory').innerHTML=S.logs.slice(0,15).map(x=>'<div class="workout-history-item"><strong>'+new Date(x.date+'T12:00:00').toLocaleDateString('tr-TR')+'</strong><span>Gün '+x.day+' • '+x.exercise+'</span><span>'+x.weight+' kg × '+x.sets+' × '+x.reps+' • RPE '+x.rpe+'</span></div>').join('')||'<div class="empty-state">Henüz kayıt yok. İlk antrenmandan sonra burada görünecek.</div>'};
return '<svg class="exercise-svg exercise-'+t+'" viewBox="0 0 240 200" role="img" aria-label="Animasyonlu '+t+' hareketi"><line class="ground" x1="30" y1="182" x2="210" y2="182"/><g class="body-move">'+(figures[t]||figures.squat)+'</g></svg>';
}
document.addEventListener('DOMContentLoaded',initWorkout)function svg(t){
 const muscles={
  squat:['Quadriceps','Gluteus maximus','Hamstrings','Core'],
  press:['Göğüs','Ön omuz','Triceps'],
  row:['Sırt','Arka omuz','Biceps'],
  hinge:['Hamstring','Kalça','Bel stabilizatörleri'],
  curl:['Biceps','Ön kol'],
  bridge:['Kalça','Arka bacak'],
  raise:['Yan omuz','Üst sırt'],
  core:['Karın','Kalça fleksörleri','Core'],
  walk:['Baldır','Quadriceps','Kalça','Hamstring']
 };
 const label=(muscles[t]||muscles.squat).map(x=>'<span>'+x+'</span>').join('');
 const head=(x,y)=>'<circle cx="'+x+'" cy="'+y+'" r="10" class="body-line"/>';
 const line=(d)=>'<path d="'+d+'" class="body-line"/>';
 const db=(x,y)=>'<rect x="'+x+'" y="'+y+'" width="10" height="18" rx="3" class="equipment"/>';
 const bench='<path d="M48 158h108" class="bench"/><path d="M62 158l-7 24M142 158l7 24" class="bench"/>';
 let a='',b='',hotA='',hotB='';
 if(t==='squat'){
  a=head(120,35)+line('M120 48v48M120 60l-28 22M120 60l28 22M120 96l-22 43-8 40M120 96l22 43 8 40')+db(112,63)+db(118,63);
  b=head(120,48)+line('M120 61l8 35M128 70l-30 15M128 70l28 10M128 96l-28 20 8 42M128 96l28 20-8 42')+db(116,75)+db(122,75);
  hotA='<ellipse cx="103" cy="135" rx="9" ry="18" class="muscle-hot"/><ellipse cx="137" cy="135" rx="9" ry="18" class="muscle-hot"/><ellipse cx="120" cy="103" rx="16" ry="9" class="muscle-hot"/>';
  hotB='<ellipse cx="105" cy="116" rx="11" ry="17" class="muscle-hot"/><ellipse cx="143" cy="116" rx="11" ry="17" class="muscle-hot"/><ellipse cx="128" cy="101" rx="18" ry="10" class="muscle-hot"/>';
 }else if(t==='press'){
  a=bench+head(94,132)+line('M102 137l38 12 35-3M110 142l-12-23M110 142l-7 25M175 146l-18-21M175 146l10 21')+db(93,111)+db(169,119);
  b=bench+head(94,132)+line('M102 137l38 12 35-3M110 142l-14-35M110 142l-8 29M175 146l-15-34M175 146l9 28')+db(93,93)+db(170,94);
  hotA='<ellipse cx="123" cy="143" rx="18" ry="9" class="muscle-hot"/><ellipse cx="105" cy="139" rx="7" ry="9" class="muscle-hot"/>';
  hotB='<ellipse cx="123" cy="143" rx="18" ry="9" class="muscle-hot"/><ellipse cx="104" cy="137" rx="7" ry="9" class="muscle-hot"/>';
 }else if(t==='row'){
  a=head(139,52)+line('M132 63l-30 36-35 30M102 99l-24-4-20 12M102 99l30 20 24 22M102 99l-8-22M102 99l24-22')+db(62,101)+db(118,72);
  b=head(139,52)+line('M132 63l-30 36-35 30M102 99l-25-7-20 7M102 99l32 8 30 12M102 99l-5-25M102 99l24-25')+db(66,87)+db(120,67);
  hotA='<ellipse cx="113" cy="91" rx="22" ry="9" class="muscle-hot"/><ellipse cx="128" cy="82" rx="9" ry="8" class="muscle-hot"/>';
  hotB='<ellipse cx="113" cy="94" rx="23" ry="9" class="muscle-hot"/><ellipse cx="128" cy="84" rx="9" ry="8" class="muscle-hot"/>';
 }else if(t==='hinge'){
  a=head(120,35)+line('M120 48v48M120 60l-28 22M120 60l28 22M120 96l-22 43-8 40M120 96l22 43 8 40')+db(87,80)+db(143,80);
  b=head(145,58)+line('M136 67l-38 33-35 27M98 100l-24-3-18 10M98 100l31 20 25 20M98 100l-15 38-5 39M98 100l28 38 7 39')+db(67,91)+db(125,108);
  hotA='<ellipse cx="103" cy="133" rx="10" ry="22" class="muscle-hot"/><ellipse cx="137" cy="133" rx="10" ry="22" class="muscle-hot"/><ellipse cx="120" cy="99" rx="18" ry="8" class="muscle-hot"/>';
  hotB='<ellipse cx="89" cy="120" rx="11" ry="20" class="muscle-hot"/><ellipse cx="112" cy="125" rx="11" ry="20" class="muscle-hot"/><ellipse cx="108" cy="99" rx="22" ry="8" class="muscle-hot"/>';
 }else if(t==='curl'){
  a=head(120,35)+line('M120 48v60M120 60l-32 28-8 30M120 60l32 28 8 30M120 108l-25 35-5 38M120 108l25 35 5 38')+db(78,118)+db(150,118);
  b=head(120,35)+line('M120 48v60M120 60l-32 20 14 27M120 60l32 20-14 27M120 108l-25 35-5 38M120 108l25 35 5 38')+db(96,102)+db(134,102);
  hotA='<ellipse cx="91" cy="94" rx="7" ry="13" class="muscle-hot"/><ellipse cx="149" cy="94" rx="7" ry="13" class="muscle-hot"/>';
  hotB='<ellipse cx="101" cy="90" rx="8" ry="13" class="muscle-hot"/><ellipse cx="139" cy="90" rx="8" ry="13" class="muscle-hot"/>';
 }else if(t==='bridge'){
  a=head(66,132)+line('M78 128l40-28 50 18 20 32M118 100l-8-35M118 100l25-35M165 118l-4 42')+bench;
  b=head(66,132)+line('M78 128l42-46 48 10 20 32M120 82l-9-33M120 82l25-30M168 92l-7 68')+bench;
  hotA='<ellipse cx="118" cy="105" rx="15" ry="8" class="muscle-hot"/>';
  hotB='<ellipse cx="120" cy="86" rx="17" ry="9" class="muscle-hot"/><ellipse cx="151" cy="91" rx="9" ry="8" class="muscle-hot"/>';
 }else if(t==='raise'){
  a=head(120,35)+line('M120 48v60M120 60l-30 35-10 28M120 60l30 35 10 28M120 108l-25 35-5 38M120 108l25 35 5 38')+db(78,120)+db(152,120);
  b=head(120,35)+line('M120 48v60M120 60l-55 5-20 20M120 60l55 5 20 20M120 108l-25 35-5 38M120 108l25 35 5 38')+db(43,78)+db(177,78);
  hotA='<ellipse cx="91" cy="71" rx="8" ry="9" class="muscle-hot"/><ellipse cx="149" cy="71" rx="8" ry="9" class="muscle-hot"/>';
  hotB='<ellipse cx="82" cy="66" rx="10" ry="8" class="muscle-hot"/><ellipse cx="158" cy="66" rx="10" ry="8" class="muscle-hot"/>';
 }else if(t==='core'){
  a=head(92,92)+line('M105 97l45 15 28-8M150 112l-20 28M150 112l25 25M130 140l-22 25-18 8M175 137l20 20 8 15') ;
  b=head(92,92)+line('M105 97l45 15 28-8M150 112l-5 36M150 112l38 5M145 148l-20 28M188 117l22 18') ;
  hotA='<ellipse cx="132" cy="108" rx="20" ry="9" class="muscle-hot"/>';
  hotB='<ellipse cx="132" cy="108" rx="20" ry="9" class="muscle-hot"/>';
 }else{
  a=head(120,35)+line('M120 48v60M120 60l-28 24M120 60l28 24M120 108l-25 36-8 37M120 108l25 28 10-35') ;
  b=head(120,35)+line('M120 48v60M120 60l-28 18M120 60l32 15M120 108l-25 28-8 39M120 108l28 37 18-12') ;
  hotA='<ellipse cx="104" cy="137" rx="9" ry="17" class="muscle-hot"/><ellipse cx="136" cy="137" rx="9" ry="17" class="muscle-hot"/>';
  hotB='<ellipse cx="104" cy="132" rx="9" ry="17" class="muscle-hot"/><ellipse cx="140" cy="137" rx="9" ry="17" class="muscle-hot"/>';
 }
 const svg='<svg class="exercise-svg exercise-'+t+'" viewBox="0 0 240 200" role="img" aria-label="'+t+' başlangıç ve hareket animasyonu"><line class="ground" x1="25" y1="183" x2="215" y2="183"/><g class="pose pose-a">'+hotA+a+'</g><g class="pose pose-b">'+hotB+b+'</g></svg>';
 return '<div class="exercise-visual"><div class="visual-stage">'+svg+'<div class="visual-labels"><span>BAŞLANGIÇ</span><b>↕</b><span>HAREKET</span></div></div><div class="working-title">ÇALIŞAN BÖLGELER</div><div class="working-muscles">'+label+'</div></div>';
}
document.addEventListener('DOMContentLoaded',initWorkout);