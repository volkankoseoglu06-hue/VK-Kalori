/* VK LIFE — Workout Engine v2
 * Single source of truth for workout sessions.
 * No duplicated card/set logic. Sets are user-created only.
 */
const WORKOUT_KEY='vk_workout_log_v2';

const WORKOUTS={
  1:{name:'Full Body 1',focus:'Göğüs • sırt • arka bacak • kol • core',exercises:[
    {name:'Dambıl Bench Press',muscles:['Göğüs','Ön omuz','Triceps'],sets:3,reps:'8–12',image:'db-bench-press',cues:['Ayaklarını yere sağlam bas.','Dambılları göğsün orta hattına kontrollü indir.','Bilekleri nötr tut ve yukarı it.']},
    {name:'Tek Kol Dambıl Row',muscles:['Sırt','Arka omuz','Biceps'],sets:3,reps:'8–12 / kol',image:'single-arm-db-row',cues:['Bench üzerinde destek al.','Dambılı kalçaya doğru çek.','Gövdeyi sabit tut.']},
    {name:'Dambıl Romanian Deadlift',muscles:['Arka bacak','Kalça'],sets:3,reps:'8–12',image:'dumbbell-romanian-deadlift',cues:['Dizleri hafif bük.','Kalçayı geriye gönder.','Dambılları bacaklara yakın tut.']},
    {name:'Hammer Curl',muscles:['Biceps','Ön kol'],sets:2,reps:'10–12',image:'hammer-curl',cues:['Avuçlar birbirine baksın.','Dirsekleri gövdeye yakın tut.','Yukarı kontrollü, aşağı yavaş.']},
    {name:'Bench Mekik',muscles:['Karın','Core'],sets:2,reps:'10–15',image:'crunches',cues:['Bench düz konumda olsun.','Ayaklarını yere sağlam bas.','Sadece kürek kemiklerini kontrollü kaldır.']}
  ]},
  2:{name:'Full Body 2',focus:'Bacak • üst göğüs • sırt • omuz • triceps',exercises:[
    {name:'Destekli Split Squat',muscles:['Quadriceps','Kalça','Hamstring'],sets:3,reps:'8–10 / kol',image:'dumbbell-split-squat',cues:['Bir elinle benchden destek al.','Kontrollü şekilde aşağı in.','Ön ayağından kuvvet alarak kalk.']},
    {name:'Eğimli Dambıl Press',muscles:['Üst göğüs','Ön omuz','Triceps'],sets:3,reps:'8–12',image:'incline-db-press',cues:['Bench açısını orta seviyede ayarla.','Kürek kemiklerini geriye-aşağı al.','Dambılları kontrollü indir ve it.']},
    {name:'Bench Destekli Dambıl Row',muscles:['Sırt','Rhomboid','Arka omuz'],sets:3,reps:'10–12',image:'single-arm-chest-supported-dumbbell-row',cues:['Göğsünü eğimli bench üzerine destekle.','Dambılları kaburgalara doğru çek.','Üst noktada kısa sıkıştır.']},
    {name:'Dambıl Biceps Curl',muscles:['Biceps','Ön kol'],sets:2,reps:'10–12',image:'bicep-curl',cues:['Dirsekleri sabit tut.','Dambılları kontrollü kıvır.','Aşağı inerken ağırlığı bırakma.']},
    {name:'Oturarak Dambıl Shoulder Press',muscles:['Ön omuz','Yan omuz','Triceps'],sets:2,reps:'8–12',image:'seated-db-press',cues:['Sırtını bench ile destekle.','Dambılları omuz hizasından başlat.','Momentum almadan yukarı it.']},
    {name:'Dambıl Overhead Triceps Extension',muscles:['Triceps'],sets:2,reps:'10–12',image:'overhead-tricep-extension',cues:['Dambılı iki elinle baş üstünde tut.','Dirsekleri sabit tut.','Kontrollü indirip triceps ile uzat.']}
  ]},
  3:{name:'Full Body 3',focus:'Bacak • göğüs • sırt • omuz • kol • core',exercises:[
    {name:'Dambıl Front Squat',muscles:['Quadriceps','Gluteus','Core'],sets:3,reps:'8–12',image:'dumbbell-front-squat',cues:['Dambılları omuz hizasında tut.','Diz ve kalçayı kontrollü bük.','Topuklardan kuvvet alarak kalk.']},
    {name:'Dambıl Floor Press',muscles:['Göğüs','Triceps','Ön omuz'],sets:3,reps:'8–12',image:'dumbbell-floor-press',cues:['Sırtüstü yat ve dizleri bük.','Üst kollar yere yaklaşınca dur.','Dambılları kontrollü yukarı it.']},
    {name:'Bench Destekli Rear-Delt Row',muscles:['Arka omuz','Üst sırt','Rhomboid'],sets:2,reps:'10–15',image:'rear-delt-fly',cues:['Göğsünü bench üzerine destekle.','Dirsekleri yana açarak çek.','Üst noktada arka omuzları sık.']},
    {name:'Lateral Raise',muscles:['Yan omuz','Deltoid'],sets:2,reps:'10–15',image:'lateral-raise',cues:['Kollar hafif bükülü olsun.','Dambılları omuz hizasına kadar kaldır.','İnerken ağırlığı bırakma.']},
    {name:'Incline Dumbbell Curl',muscles:['Biceps'],sets:2,reps:'10–12',image:'incline-db-curl',cues:['Bench’i eğimli konuma al.','Dirsekleri sabit tut.','Kontrollü şekilde kıvır.']},
    {name:'Bench Mekik',muscles:['Karın','Core'],sets:2,reps:'10–15',image:'crunches',cues:['Bench düz konumda olsun.','Ayaklarını yere sağlam bas.','Kontrollü şekilde yüksel ve dön.']}
  ]}
};

const EXERCISE_IDS=Object.fromEntries(Object.values(WORKOUTS).flatMap(w=>w.exercises).map(e=>[e.name,e.image]));
let S=loadWorkout();
let workoutDay=1;
let selectedExerciseIndex=null;
let sessionTimer=null;
let sessionStartedAt=0;
let sessionElapsedBeforeStart=0;

function emptyState(){return {logs:[],weights:{},done:{},session:null,history:[]};}
function loadWorkout(){
  try{
    const v2=JSON.parse(localStorage.getItem(WORKOUT_KEY));
    if(v2)return normalizeWorkout(v2);
    // One-time migration from the previous engine.
    const oldRaw=localStorage.getItem('vk_workout_log_v1');
    if(oldRaw){
      const old=JSON.parse(oldRaw);
      const migrated={...emptyState(),weights:old.weights||{},done:old.done||{}};
      migrated.logs=(old.logs||[]).map(x=>({
        date:x.date,at:Number(x.at)||Date.now(),sessionId:x.sessionId||null,day:Number(x.day)||1,
        exercise:x.exercise,sets:Number(x.sets)||0,reps:Number(x.reps)||10,weight:Number(x.weight)||0,
        setDetails:Array.isArray(x.setDetails)?x.setDetails:[]
      }));
      localStorage.setItem(WORKOUT_KEY,JSON.stringify(migrated));
      return migrated;
    }
  }catch(e){}
  return emptyState();
}
function normalizeWorkout(v){
  const s=emptyState();
  s.logs=Array.isArray(v.logs)?v.logs:[];
  s.weights=v.weights&&typeof v.weights==='object'?v.weights:{};
  s.done=v.done&&typeof v.done==='object'?v.done:{};
  s.session=v.session||null;
  s.history=Array.isArray(v.history)?v.history:[];
  return s;
}
function saveWorkout(){localStorage.setItem(WORKOUT_KEY,JSON.stringify(S));}
function todayKey(){const d=new Date();const y=d.getFullYear();const m=String(d.getMonth()+1).padStart(2,'0');const day=String(d.getDate()).padStart(2,'0');return y+'-'+m+'-'+day;}
function exerciseKey(name){return workoutDay+'_'+name;}
function currentLogs(){return S.logs.filter(x=>x.date===todayKey()&&Number(x.day)===workoutDay);}
function sessionLogs(){return S.logs.filter(x=>x.sessionId&&x.sessionId===S.session?.id);}
function formatTime(ms){const s=Math.max(0,Math.floor(ms/1000));return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');}
function elapsedMs(){return sessionElapsedBeforeStart+(sessionStartedAt?Date.now()-sessionStartedAt:0);}
function sessionMinutes(){return Math.round(elapsedMs()/60000);}

function exerciseImage(name,pose='start'){
  const id=EXERCISE_IDS[name];
  return id?'https://raw.githubusercontent.com/RepDB/exercise-dataset/main/images/flat/'+id+'-'+pose+'.webp':'';
}
function imageMarkup(ex){
  const start=exerciseImage(ex.name,'start'), peak=exerciseImage(ex.name,'peak');
  if(!start)return '<div class="exercise-visual-fallback">🏋️</div>';
  return '<div class="exercise-visual"><img src="'+start+'" alt="'+ex.name+'" loading="lazy"><img src="'+peak+'" alt="" class="exercise-peak" loading="lazy"></div>';
}
function getExerciseLog(index){
  const ex=WORKOUTS[workoutDay].exercises[index];
  return currentLogs().find(x=>x.exercise===ex.name);
}
function getSets(index){return getExerciseLog(index)?.setDetails||[];}
function totalSets(){return currentLogs().reduce((n,x)=>n+(Number(x.sets)||0),0);}
function totalReps(){return currentLogs().reduce((n,x)=>n+(x.setDetails||[]).reduce((m,s)=>m+(Number(s.reps)||0),0),0);}
function totalVolume(){return Math.round(currentLogs().reduce((n,x)=>n+(x.setDetails||[]).reduce((m,s)=>m+(Number(s.weight)||0)*(Number(s.reps)||0),0),0)*10)/10;}
function previousMaxWeight(name){
  return S.logs
    .filter(x=>x.exercise===name&&x.date!==todayKey())
    .flatMap(x=>x.setDetails||[])
    .reduce((m,s)=>Math.max(m,Number(s.weight)||0),0);
}
function currentWorkoutPRs(){
  return currentLogs().map(log=>{
    const current=Math.max(...(log.setDetails||[]).map(s=>Number(s.weight)||0),0);
    const previous=previousMaxWeight(log.exercise);
    return current>previous&&current>0?{name:log.exercise,weight:current,previous}:null;
  }).filter(Boolean);
}
function allPersonalRecords(){
  const best={};
  const prs=[];
  [...S.logs].sort((a,b)=>(Number(a.at)||0)-(Number(b.at)||0)).forEach(log=>{
    const current=Math.max(...(log.setDetails||[]).map(s=>Number(s.weight)||0),0);
    if(!current)return;
    const previous=Number(best[log.exercise])||0;
    if(current>previous){
      prs.push({name:log.exercise,weight:current,date:log.date,at:Number(log.at)||0});
      best[log.exercise]=current;
    }
  });
  return prs;
}
function achievementBadges(rows,totalVolume,prCount){
  const workoutCount=rows.length;
  return [
    workoutCount>=1?{icon:'🏁',title:'İlk Antrenman',text:'İlk antrenmanını tamamladın.'}:null,
    workoutCount>=5?{icon:'🔥',title:'5 Antrenman',text:'5 antrenmanı geride bıraktın.'}:null,
    workoutCount>=10?{icon:'💪',title:'10 Antrenman',text:'10 antrenman tamamlandı.'}:null,
    workoutCount>=25?{icon:'🏆',title:'25 Antrenman',text:'Düzenlilik seviyen yükseliyor.'}:null,
    totalVolume>=1000?{icon:'⚡',title:'1 Ton Hacim',text:'Toplam 1.000 kg hacmi geçtin.'}:null,
    totalVolume>=5000?{icon:'🚀',title:'5 Ton Hacim',text:'Toplam 5.000 kg hacmi geçtin.'}:null,
    prCount>=1?{icon:'🥇',title:'İlk Rekor',text:'İlk kişisel rekorunu kırdın.'}:null,
    prCount>=5?{icon:'🏅',title:'5 Rekor',text:'5 kişisel rekor kırdın.'}:null
  ].filter(Boolean);
}

function previousWorkoutSummary(){
  const previous=(S.history||[]).filter(x=>Number(x.day)===workoutDay&&x.date!==todayKey()).sort((a,b)=>(Number(b.at)||0)-(Number(a.at)||0))[0];
  return previous||null;
}
function workoutComparison(){
  const previous=previousWorkoutSummary();
  if(!previous)return null;
  const currentVolume=totalVolume();
  const previousVolume=Number(previous.volume)||0;
  if(!previousVolume)return null;
  return {previous,volumeDiff:Math.round((currentVolume-previousVolume)*10)/10,volumePct:Math.round(((currentVolume-previousVolume)/previousVolume)*100)};
}
function doneCount(){return WORKOUTS[workoutDay].exercises.filter(e=>S.done[exerciseKey(e.name)]===todayKey()).length;}

function renderDayTabs(){
  const host=document.getElementById('workoutDayTabs');if(!host)return;
  host.innerHTML=[1,2,3].map(d=>'<button class="workout-day '+(d===workoutDay?'active':'')+'" data-day="'+d+'">'+WORKOUTS[d].name+'</button>').join('');
}
function exerciseHistory(name){
  return S.logs
    .filter(x=>x.exercise===name && Number(x.day)===workoutDay && x.date!==todayKey())
    .sort((a,b)=>(Number(b.at)||0)-(Number(a.at)||0));
}
function lastPerformance(name){
  const log=exerciseHistory(name)[0];
  return log?.setDetails?.length ? log : null;
}
function progressionRecommendation(ex){
  const last=lastPerformance(ex.name);
  if(!last)return null;
  const sets=last.setDetails||[];
  const targetMatch=String(ex.reps).match(/(\d+)/);
  const targetMax=targetMatch?Number(targetMatch[1]):12;
  const allAtTop=sets.length>0 && sets.every(s=>Number(s.reps)>=targetMax);
  const avgWeight=sets.reduce((n,s)=>n+Number(s.weight||0),0)/Math.max(1,sets.length);
  const step=avgWeight>=10?2:1;
  const suggested=allAtTop?avgWeight+step:avgWeight;
  return {
    last,
    suggested:Math.round(suggested*10)/10,
    reason:allAtTop?'Tüm setlerde tekrar hedefinin üst sınırına ulaştın.':'Önce geçen antrenmandaki ağırlıkla tekrarları tamamla.'
  };
}
function performanceMarkup(ex){
  const rec=progressionRecommendation(ex);
  if(!rec){
    return '<div class="exercise-performance empty">İlk kaydın olacak. Setlerini gir, sonraki antrenmanda burada geçmiş performansını göreceksin.</div>';
  }
  const sets=rec.last.setDetails.map((s,n)=>'<span>'+ (n+1)+'. '+Number(s.weight||0)+' kg × '+Number(s.reps||0)+'</span>').join('');
  const suggestion=rec.suggested?'<b>Öneri: '+rec.suggested+' kg</b>':'';
  return '<div class="exercise-performance"><div><small>Son antrenman</small><strong>'+new Date(rec.last.date+'T12:00:00').toLocaleDateString('tr-TR',{day:'2-digit',month:'short'})+'</strong></div><div class="performance-sets">'+sets+'</div><div class="performance-recommendation">'+suggestion+'<small>'+rec.reason+'</small></div></div>';
}

function renderWorkout(){
  const host=document.getElementById('workoutDetail');if(!host)return;
  const plan=WORKOUTS[workoutDay];
  const subtitle=document.getElementById('workoutSubtitle');
  if(subtitle)subtitle.textContent=plan.name;
  host.innerHTML=plan.exercises.map((ex,i)=>{
    const sets=getSets(i), done=S.done[exerciseKey(ex.name)]===todayKey();
    return '<article class="workout-exercise '+(done?'is-done':'')+'">'+
      '<button class="exercise-main" data-open-exercise="'+i+'" type="button">'+
        imageMarkup(ex)+
        '<span class="exercise-info"><strong>'+ex.name+'</strong><span class="exercise-tags">'+ex.muscles.map(m=>'<em>'+m+'</em>').join('')+'</span><span class="exercise-prescription">'+ex.sets+' set hedef • '+ex.reps+'</span></span>'+
        '<span class="exercise-state">'+(done?'✓':'›')+'</span>'+
      '</button>'+
      performanceMarkup(ex)+
      '<div class="exercise-last">'+(sets.length?sets.map((s,n)=>'<span>'+ (n+1)+'. '+Number(s.weight||0)+' kg × '+Number(s.reps||0)+'</span>').join(''):'Henüz set girilmedi')+'</div>'+
    '</article>';
  }).join('');
  const progress=document.querySelector('.workout-list-head span');
  if(progress)progress.textContent=doneCount()+'/'+plan.exercises.length;
  updateStats();
}

function updateStats(){
  const set=(key,val)=>{const el=document.querySelector('[data-stat="'+key+'"]');if(el)el.textContent=val};
  set('moves',doneCount()+'/'+WORKOUTS[workoutDay].exercises.length);
  set('sets',totalSets());
  set('time',sessionMinutes()+' dk');
  set('kcal',workoutCalories());
  updateTimerUI();
}
function workoutCalories(){
  const weight=(typeof state!=='undefined' ? Number(state.weight) : 0)||0;
  if(!weight)return 0;
  const mins=Math.max(0.1,elapsedMs()/60000);
  const sets=Math.max(1,totalSets());
  const density=sets/Math.max(1,mins);
  const met=density>=.5?5.8:density>=.3?5:3.5;
  return Math.max(0,Math.round(met*weight*(mins/60)));
}
function updateTimerUI(){
  const timer=document.getElementById('headerWorkoutElapsed');if(timer)timer.textContent=formatTime(elapsedMs());
  const btn=document.getElementById('startWorkoutButton');
  if(!btn)return;
  const status=S.session?.status;
  if(status==='active'){
    btn.innerHTML='<span class="workout-play">Ⅱ</span><span><strong>Durdur</strong><small>Antrenman devam ediyor</small></span>';
    btn.classList.add('is-running');
  }else if(status==='paused'){
    btn.innerHTML='<span class="workout-play">▶</span><span><strong>Devam Et</strong><small>Kaydedilmiş antrenman</small></span>';
    btn.classList.remove('is-running');
  }else if(status==='finished'){
    btn.innerHTML='<span class="workout-play">✓</span><span><strong>Tamamlandı</strong><small>Yeni antrenman başlatabilirsin</small></span>';
    btn.classList.remove('is-running');
  }else{
    btn.innerHTML='<span class="workout-play">▶</span><span><strong>Antrenmanı Başlat</strong><small>Setleri sen ekle</small></span>';
    btn.classList.remove('is-running');
  }
  const finish=document.getElementById('finishWorkoutButton');
  if(finish){finish.disabled=!currentLogs().length||status==='finished';finish.textContent=status==='finished'?'✓ Antrenman Tamamlandı':'✓ Antrenmanı Tamamla';}
}
function startTicker(){clearInterval(sessionTimer);sessionTimer=setInterval(()=>updateStats(),1000);}
function stopTicker(){clearInterval(sessionTimer);sessionTimer=null;}

function startWorkout(){
  if(S.session?.status==='active'){pauseWorkout();return;}
  if(S.session?.status==='paused'){resumeWorkout();return;}
  const id='session_'+Date.now();
  S.session={id,day:workoutDay,status:'active',elapsedMs:0,sets:0,startedAt:Date.now()};
  sessionElapsedBeforeStart=0;sessionStartedAt=Date.now();
  saveWorkout();updateTimerUI();startTicker();
}
function resumeWorkout(){
  if(!S.session)return startWorkout();
  S.session.status='active';sessionElapsedBeforeStart=Number(S.session.elapsedMs)||0;sessionStartedAt=Date.now();saveWorkout();startTicker();updateTimerUI();
}
function pauseWorkout(){
  if(!S.session||S.session.status!=='active')return;
  sessionElapsedBeforeStart=elapsedMs();sessionStartedAt=0;
  S.session.elapsedMs=sessionElapsedBeforeStart;S.session.sets=totalSets();S.session.status='paused';
  saveWorkout();stopTicker();updateStats();
}
function finishWorkout(){
  if(S.session?.status==='finished'){return;}
  if(!currentLogs().length){alert('Önce en az 1 set ekle.');return;}
  const duration=S.session?Math.max(1,sessionMinutes()):0;
  const prs=currentWorkoutPRs();
  const id=S.session?.id||'session_'+Date.now();
  const sets=totalSets();
  const kcal=workoutCalories();
  const reps=totalReps();
  const volume=totalVolume();
  const completedMoves=doneCount();
  if(typeof window.addWorkoutBurn==='function'){
    window.__vkWorkoutDay=workoutDay;
    window.addWorkoutBurn(duration,sets,5,id);
  }
  S.session={id,day:workoutDay,status:'finished',elapsedMs:Math.max(elapsedMs(),duration*60000),sets};
  S.history.unshift({id,date:todayKey(),at:Date.now(),day:workoutDay,minutes:duration,sets,reps,volume,kcal,moves:completedMoves});
  saveWorkout();stopTicker();
  renderWorkout();renderHistory();updateTimerUI();
  openWorkoutSummary({duration,sets,reps,volume,kcal,moves:completedMoves});
  if(typeof window.updateDashboard==='function')window.updateDashboard();
}
function resetWorkoutDay(){
  stopTicker();sessionStartedAt=0;sessionElapsedBeforeStart=0;
  S.done={};S.session=null;
  const today=todayKey();
  S.logs=S.logs.filter(x=>x.date!==today);
  saveWorkout();renderWorkout();renderHistory();updateStats();
}

function openExercise(index){
  selectedExerciseIndex=index;
  const ex=WORKOUTS[workoutDay].exercises[index];
  const existing=getSets(index);
  document.getElementById('workoutModalTitle').textContent=ex.name;
  document.getElementById('workoutModalMuscle').innerHTML=ex.muscles.map(m=>'<span class="modal-muscle-tag">'+m+'</span>').join('');
  const start=exerciseImage(ex.name,'start'),peak=exerciseImage(ex.name,'peak');
  document.getElementById('workoutAnimation').innerHTML=start?'<div class="exercise-modal-visual"><img src="'+start+'" alt="'+ex.name+'"><img src="'+peak+'" alt="" class="exercise-peak"></div>':'<div class="exercise-modal-fallback">🏋️</div>';
  document.getElementById('workoutCues').innerHTML=ex.cues.map(c=>'<li>'+c+'</li>').join('');
  renderModalSets(existing);
  const rec=progressionRecommendation(ex);
  let hint=document.getElementById('workoutProgressionHint');
  if(!hint){
    hint=document.createElement('div');
    hint.id='workoutProgressionHint';
    hint.className='workout-progression-hint';
    document.querySelector('.modal-set-actions')?.before(hint);
  }
  hint.innerHTML=rec
    ? '<strong>💡 Sonraki hedef: '+rec.suggested+' kg</strong><small>'+rec.reason+'</small>'
    : '<strong>💡 İlk antrenman</strong><small>Setlerini kaydet; sonraki antrenmanda hedef önerilecek.</small>';
  document.getElementById('workoutSource').innerHTML='<a href="https://repdb.co" target="_blank" rel="noopener">Exercise data by RepDB ↗</a>';
  document.getElementById('workoutModal').classList.add('open');
}

function renderModalSets(sets){
  const list=document.getElementById('modalSetList');if(!list)return;
  if(!sets.length){list.innerHTML='<div class="modal-set-head"><span>SET</span><span>KG</span><span>TEKRAR</span><span></span></div><div class="modal-empty-sets">Henüz set yok. <b>+ Set Ekle</b> ile ilk setini gir.</div>';return;}
  list.innerHTML='<div class="modal-set-head"><span>SET</span><span>KG</span><span>TEKRAR</span><span></span></div>'+sets.map((s,i)=>'<div class="modal-set-row"><b>Set '+(i+1)+'</b><input class="modal-set-weight" type="number" min="0" step=".5" value="'+(s.weight??'')+'" placeholder="0"><input class="modal-set-reps" type="number" min="1" max="50" value="'+(s.reps??'')+'" placeholder="0"><button data-remove-set type="button" aria-label="Seti sil">×</button></div>').join('');
}
function addModalSet(){
  const list=document.getElementById('modalSetList');if(!list)return;
  if(list.querySelector('.modal-empty-sets'))list.innerHTML='';
  const n=list.querySelectorAll('.modal-set-row').length+1;
  if(!list.querySelector('.modal-set-head')){
    const head=document.createElement('div');head.className='modal-set-head';head.innerHTML='<span>SET</span><span>KG</span><span>TEKRAR</span><span></span>';list.prepend(head);
  }
  const row=document.createElement('div');row.className='modal-set-row';
  row.innerHTML='<b>Set '+n+'</b><input class="modal-set-weight" type="number" min="0" step=".5" placeholder="kg"><input class="modal-set-reps" type="number" min="1" max="50" placeholder="Tekrar"><button data-remove-set type="button">×</button>';
  list.appendChild(row);
}
function readModalSets(){
  return [...document.querySelectorAll('#modalSetList .modal-set-row')].map(row=>({weight:Math.max(0,Number(row.querySelector('.modal-set-weight').value)||0),reps:Math.max(1,Number(row.querySelector('.modal-set-reps').value)||0)})).filter(x=>x.reps>0);
}
function saveExerciseFromModal(){
  if(selectedExerciseIndex===null)return;
  const ex=WORKOUTS[workoutDay].exercises[selectedExerciseIndex];
  const sets=readModalSets();
  if(!sets.length){alert('Önce en az 1 set ekle.');return;}
  const sessionId=S.session?.id||null;
  S.logs=S.logs.filter(x=>!(x.date===todayKey()&&x.day===workoutDay&&x.exercise===ex.name));
  S.logs.unshift({date:todayKey(),at:Date.now(),sessionId,day:workoutDay,exercise:ex.name,sets:sets.length,reps:sets[0].reps,weight:sets[0].weight,setDetails:sets});
  S.weights[exerciseKey(ex.name)]=sets[sets.length-1].weight;
  S.done[exerciseKey(ex.name)]=todayKey();
  if(S.session){S.session.sets=totalSets();if(S.session.status==='active')S.session.elapsedMs=elapsedMs();}
  saveWorkout();closeExercise();renderWorkout();renderHistory();
  if(typeof window.updateDashboard==='function')window.updateDashboard();
}
function closeExercise(){document.getElementById('workoutModal')?.classList.remove('open');selectedExerciseIndex=null;}

function openWorkoutSummary(data){
  const modal=document.getElementById('workoutSummaryModal');
  if(!modal)return;
  const comparison=workoutComparison();
  const prs=currentWorkoutPRs();
  const prHtml=prs.length
    ? '<div class="summary-pr-card"><div><strong>🏆 '+prs.length+' yeni rekor</strong><span>Bu antrenmanda kişisel en yüksek ağırlıkların</span></div><div class="summary-pr-list">'+prs.map(x=>'<span>'+x.name+' <b>'+x.weight+' kg</b></span>').join('')+'</div></div>'
    : '';
  const compareHtml=comparison
    ? '<div class="summary-comparison '+(comparison.volumeDiff>=0?'positive':'negative')+'"><strong>'+(comparison.volumeDiff>=0?'↗':'↘')+' '+Math.abs(comparison.volumePct)+'%</strong><span>Toplam hacim '+(comparison.volumeDiff>=0?'arttı':'azaldı')+'</span></div>'
    : '<div class="summary-comparison"><strong>İlk kayıt</strong><span>Bir sonraki antrenmanda gelişimini burada göreceksin.</span></div>';
  document.getElementById('summaryWorkoutTitle').textContent=WORKOUTS[workoutDay].name+' tamamlandı';
  document.getElementById('summaryWorkoutStats').innerHTML=[
    ['Süre',formatTime(data.duration*60000)],['Hareket',data.moves],['Set',data.sets],['Tekrar',data.reps],['Hacim',data.volume+' kg'],['Yakım',data.kcal+' kcal']
  ].map(x=>'<div class="summary-stat"><strong>'+x[1]+'</strong><span>'+x[0]+'</span></div>').join('');
  document.getElementById('summaryWorkoutCompare').innerHTML=compareHtml+prHtml;
  modal.classList.add('open');
}
function closeWorkoutSummary(){document.getElementById('workoutSummaryModal')?.classList.remove('open');}


function workoutHistoryWithVolume(){
  return (S.history||[]).map(h=>{
    if(Number(h.volume)>0)return h;
    const volume=S.logs.filter(x=>x.date===h.date&&Number(x.day)===Number(h.day)).reduce((n,x)=>n+(x.setDetails||[]).reduce((m,s)=>m+(Number(s.weight)||0)*(Number(s.reps)||0),0),0);
    return {...h,volume:Math.round(volume*10)/10};
  }).sort((a,b)=>(Number(b.at)||0)-(Number(a.at)||0));
}
function renderWorkoutProgress(){
  const box=document.getElementById('historyList');
  if(!box)return;
  const rows=workoutHistoryWithVolume();
  if(!rows.length){box.innerHTML='<div class="history-item">İlerlemeyi görmek için en az bir antrenmanı tamamla.</div>';return;}
  const totalVolume=rows.reduce((n,x)=>n+(Number(x.volume)||0),0);
  const totalSets=rows.reduce((n,x)=>n+(Number(x.sets)||0),0);
  const last=rows[0];
  const previous=rows[1];
  const change=previous&&Number(previous.volume)>0?Math.round(((Number(last.volume||0)-Number(previous.volume))/Number(previous.volume))*100):null;
  const maxWeight=S.logs.reduce((max,x)=>Math.max(max,...(x.setDetails||[]).map(s=>Number(s.weight)||0)),0);
  const chart=rows.slice(0,8).reverse().map(x=>{
    const max=Math.max(...rows.slice(0,8).map(y=>Number(y.volume)||0),1);
    const pct=Math.max(4,Math.round((Number(x.volume||0)/max)*100));
    return '<div class="progress-bar-row"><span>'+new Date(x.date+'T12:00:00').toLocaleDateString('tr-TR',{day:'2-digit',month:'short'})+'</span><div><i style="width:'+pct+'%"></i></div><b>'+Math.round(Number(x.volume||0))+' kg</b></div>';
  }).join('');
  const exerciseNames=[...new Set(Object.values(WORKOUTS).flatMap(w=>w.exercises.map(e=>e.name)))];
  const best=exerciseNames.map(name=>{
    const bestSet=S.logs.filter(x=>x.exercise===name).flatMap(x=>x.setDetails||[]).reduce((m,s)=>Math.max(m,Number(s.weight)||0),0);
    return {name,bestSet};
  }).filter(x=>x.bestSet>0).sort((a,b)=>b.bestSet-a.bestSet).slice(0,5);
  const bestHtml=best.length?best.map(x=>'<div class="progress-exercise-row"><span>'+x.name+'</span><strong>'+x.bestSet+' kg</strong></div>').join(''):'<div class="empty-state">Hareket kaydı oluştukça burada en yüksek ağırlıkların görünecek.</div>';
  const prRows=allPersonalRecords().sort((a,b)=>(b.at||0)-(a.at||0));
  const prCount=prRows.length;
  const badges=achievementBadges(rows,totalVolume,prCount);
  const badgeHtml=badges.length?badges.map(x=>'<div class="achievement-badge"><span>'+x.icon+'</span><div><strong>'+x.title+'</strong><small>'+x.text+'</small></div></div>').join(''):'<div class="empty-state">İlk antrenmanını tamamladığında rozetlerin burada açılacak.</div>';
  const recentPrHtml=prRows.slice(0,5).map(x=>'<div class="progress-pr-row"><span><b>'+x.name+'</b><small>'+new Date(x.date+'T12:00:00').toLocaleDateString('tr-TR',{day:'2-digit',month:'short'})+'</small></span><strong>'+x.weight+' kg</strong></div>').join('')||'<div class="empty-state">Yeni kişisel rekorların burada görünecek.</div>';
  box.innerHTML='<div class="progress-hero"><div><small>ANTRENMAN PERFORMANSI</small><h2>Gücünü takip et</h2><p>Hacim, rekor ve gelişimini tek ekranda gör.</p></div><span>📈</span></div>'+
    '<div class="progress-kpi-grid"><div><strong>'+rows.length+'</strong><span>Antrenman</span></div><div><strong>'+Math.round(totalVolume)+'</strong><span>Toplam kg</span></div><div><strong>'+totalSets+'</strong><span>Toplam set</span></div><div><strong>'+maxWeight+'</strong><span>En yüksek kg</span></div></div>'+
    (change!==null?'<div class="progress-change '+(change>=0?'up':'down')+'"><strong>'+(change>=0?'↗':'↘')+' '+Math.abs(change)+'%</strong><span>Son antrenman hacim değişimi</span></div>':'')+
    '<div class="progress-card"><div class="progress-card-head"><strong>Hacim trendi</strong><small>Son 8 antrenman</small></div><div class="progress-chart">'+chart+'</div></div>'+
    '<div class="progress-card"><div class="progress-card-head"><strong>Kazanılan rozetler</strong><small>'+badges.length+' adet</small></div><div class="achievement-grid">'+badgeHtml+'</div></div>'+
    '<div class="progress-card"><div class="progress-card-head"><strong>Son kişisel rekorlar</strong><small>'+prCount+' toplam</small></div>'+recentPrHtml+'</div>'+
    '<div class="progress-card"><div class="progress-card-head"><strong>En yüksek ağırlıklar</strong><small>Hareket bazında</small></div>'+bestHtml+'</div>';
}

function renderHistory(){
  const host=document.getElementById('workoutHistory');if(!host)return;
  const rows=(S.history||[]).slice(0,10);
  host.innerHTML=rows.length?rows.map(x=>'<article class="history-session"><div><strong>'+new Date(x.date+'T12:00:00').toLocaleDateString('tr-TR',{day:'2-digit',month:'short',year:'numeric'})+'</strong><span>Full Body '+x.day+'</span></div><div><b>'+x.sets+'</b><small>Set</small></div><div><b>'+x.volume+' kg</b><small>Hacim</small></div><div><b>'+x.minutes+' dk</b><small>Süre</small></div></article>').join(''):'<div class="empty-state">Henüz tamamlanan antrenman yok.</div>';
}

function bindWorkout(){
  const page=document.getElementById('workoutPage');if(!page)return;
  renderDayTabs();renderWorkout();renderHistory();
  document.getElementById('startWorkoutButton')?.addEventListener('click',startWorkout);
  document.querySelector('.workout-timer-icon')?.addEventListener('click',startWorkout);
  document.getElementById('finishWorkoutButton')?.addEventListener('click',finishWorkout);
  document.getElementById('workoutDayTabs')?.addEventListener('click',e=>{const b=e.target.closest('[data-day]');if(!b)return;if(S.session?.status==='active'){alert('Önce antrenmanı durdur.');return;}workoutDay=Number(b.dataset.day);renderDayTabs();renderWorkout();updateStats();});
  document.getElementById('workoutDetail')?.addEventListener('click',e=>{const b=e.target.closest('[data-open-exercise]');if(b)openExercise(Number(b.dataset.openExercise));});
  document.getElementById('workoutSummaryModal')?.addEventListener('click',e=>{
    if(e.target.closest('[data-summary-close]')||e.target.id==='workoutSummaryModal')closeWorkoutSummary();
  });
  document.getElementById('workoutModal')?.addEventListener('click',e=>{
    if(e.target.closest('[data-add-modal-set]'))addModalSet();
    else if(e.target.closest('[data-modal-save]'))saveExerciseFromModal();
    else if(e.target.closest('[data-remove-set]')){e.target.closest('.modal-set-row')?.remove();relabelModalSets();}
    else if(e.target.closest('[data-close]')||e.target.id==='workoutModal')closeExercise();
  });
  if(S.session?.day===workoutDay){
    sessionElapsedBeforeStart=Number(S.session.elapsedMs)||0;
    if(S.session.status==='active'){sessionStartedAt=Date.now();startTicker();}
  }
  updateTimerUI();
}
function relabelModalSets(){
  document.querySelectorAll('#modalSetList .modal-set-row b').forEach((b,i)=>b.textContent='Set '+(i+1));
  if(!document.querySelector('#modalSetList .modal-set-row')) document.querySelector('#modalSetList .modal-set-head')?.remove();
}

function history(){renderHistory();}
function tabs(){renderDayTabs();}
function render(){renderWorkout();}
function renderActive(){updateTimerUI();}
function startGuided(){startWorkout();}
function resumeWorkoutSession(){resumeWorkout();}
function completeWorkout(){finishWorkout();}
function deleteHistory(id){
  S.history=S.history.filter(x=>x.id!==id);
  if(typeof state!=='undefined' && state.dailySports)state.dailySports=state.dailySports.filter(x=>x.sessionId!==id);
  saveWorkout();if(typeof window.save==='function')window.save();renderHistory();renderWorkout();
  if(typeof window.updateDashboard==='function')window.updateDashboard();
  if(typeof window.renderSports==='function')window.renderSports();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindWorkout,{once:true});else bindWorkout();
