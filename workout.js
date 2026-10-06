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
Object.values(W).forEach(dayPlan=>dayPlan.ex.forEach(exercise=>{exercise[2]=3;}));
let S=load();
let day=1;
let selected=null;
let active=false;
let activeSet=1;
let activeExercise=0;
let activeStartedAt=0;
let activePausedMs=0;
let activeSessionSets=0;
let activeSessionId='';
let elapsedTicker=null;

function load(){
  try{
    const data=JSON.parse(localStorage.getItem(WORKOUT_KEY));
    if(!data)return{logs:[],weights:{},done:{},dayResetAt:0,session:null};
    data.logs=Array.isArray(data.logs)?data.logs:[];
    data.weights=data.weights||{};
    data.done=data.done||{};
    data.dayResetAt=Number(data.dayResetAt)||0;
    data.session=data.session||null;
    return data;
  }catch(e){
    return{logs:[],weights:{},done:{},dayResetAt:0,session:null};
  }
}
function saveWorkoutState(){localStorage.setItem(WORKOUT_KEY,JSON.stringify(S))}
function today(){
  const d=new Date();
  const y=d.getFullYear();
  const m=String(d.getMonth()+1).padStart(2,'0');
  const day=String(d.getDate()).padStart(2,'0');
  return y+'-'+m+'-'+day;
}
function key(id){return day+'_'+id}
function sessionElapsedMs(){
  const base=Number(activePausedMs)||0;
  return active && activeStartedAt ? base+(Date.now()-activeStartedAt) : base;
}
function sessionMinutes(){
  return Math.max(1,Math.round(sessionElapsedMs()/60000));
}
function formatDuration(ms){
  const total=Math.max(0,Math.floor(ms/1000));
  const h=Math.floor(total/3600);
  const m=Math.floor((total%3600)/60);
  const s=total%60;
  return (h?String(h).padStart(2,'0')+':':'')+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
}
function syncSessionFromStorage(){
  const s=S.session;
  if(!s || s.day!==day)return false;
  activeSet=Math.max(1,Number(s.activeSet)||1);
  activeExercise=Math.max(0,Math.min(W[day].ex.length-1,Number(s.activeExercise)||0));
  activePausedMs=Math.max(0,Number(s.elapsedMs)||0);
  activeSessionSets=Math.max(0,Number(s.sets)||0);
  activeSessionId=String(s.id||'');
  if(s.status==='active'){
    active=true;
    activeStartedAt=Date.now();
    return true;
  }
  active=false;
  activeStartedAt=0;
  return false;
}
function persistSession(status='active'){
  S.session={
    id:activeSessionId,
    day,
    status,
    startedAt:activeStartedAt||0,
    elapsedMs:sessionElapsedMs(),
    activeSet,
    activeExercise,
    sets:activeSessionSets
  };
  saveWorkoutState();
}
function clearElapsedTicker(){
  if(elapsedTicker){clearInterval(elapsedTicker);elapsedTicker=null}
}
function startElapsedTicker(){
  clearElapsedTicker();
  elapsedTicker=setInterval(()=>{
    if(active){
      const timer=document.getElementById('workoutElapsed');
      if(timer)timer.textContent=formatDuration(sessionElapsedMs());
      const liveKcal=document.querySelector('[data-stat="kcal"]');
      if(liveKcal)liveKcal.textContent=workoutLoggedKcal();
      const liveTime=document.querySelector('[data-stat="time"]');
      if(liveTime)liveTime.textContent=(active?Math.max(0,Math.round(sessionElapsedMs()/60000)):stateWorkoutMinutes())+' dk';
      const button=document.getElementById('startWorkoutButton');
      if(button){
        const copy=button.querySelector('.workout-start-copy strong');
        if(copy)copy.textContent='Antrenmana Devam Ediyor';
        else button.textContent='Antrenmana Devam Ediyor';
      }
    }
  },1000);
}
function initWorkout(){
  if(!document.getElementById('workoutPage'))return;

  tabs();
  syncSessionFromStorage();
  render();
  history();
  renderActive();

  document.getElementById('workoutDayTabs').onclick=e=>{
    const b=e.target.closest('[data-day]');
    if(!b)return;
    if(active){
      alert('Aktif antrenmanı önce bitir veya durdur.');
      return;
    }
    day=+b.dataset.day;
    tabs();
    syncSessionFromStorage();
    render();
    renderActive();
  };

  const historyEl=document.getElementById('workoutHistory');
  if(historyEl){
    historyEl.onclick=e=>{
      const btn=e.target.closest('[data-delete-history]');
      if(!btn)return;
      e.preventDefault();
      e.stopPropagation();
      deleteHistory(btn.dataset.deleteHistory);
    };
  }

  document.getElementById('workoutDetail').onclick=e=>{
    const add=e.target.closest('[data-add-set]');
    if(add){ addSetFromCard(+add.dataset.addSet); return; }
    const complete=e.target.closest('[data-complete]');
    if(complete){ completeExerciseFromCard(+complete.dataset.complete); return; }
    const b=e.target.closest('[data-open]');
    if(b)open(+b.dataset.open);
  };

  document.getElementById('workoutModal').onclick=e=>{
    if(e.target.closest('[data-modal-save]')){saveExerciseFromModal();return}
    if(e.target.closest('[data-add-modal-set]')){addModalSetRow();return}
    const remove=e.target.closest('[data-remove-set]');
    if(remove){remove.closest('.modal-set-row')?.remove();syncModalSetCount();return}
    if(e.target.closest('[data-close]'))close();
  };

  document.getElementById('startWorkoutButton').onclick=()=>{
    if(active){pauseWorkout();return;}
    if(S.session && S.session.status==='paused' && S.session.day===day)resumeWorkout();
    else startGuided();
  };

  startElapsedTicker();
}

function tabs(){
  const icons=['🅰️','🅱️','🆑'];
  document.getElementById('workoutDayTabs').innerHTML=[1,2,3].map((d,i)=>
    '<button class="workout-day '+(d===day?'active':'')+'" data-day="'+d+'"><span class="day-label"><strong>Gün '+d+'</strong></span></button>'
  ).join('');
}
function startGuided(){
  window.__vkWorkoutDay=day;
  // Yeni seans başlatılıyorsa o günün eski "Yaptım" işaretlerini temizle.
  if(!S.session || S.session.status==='finished' || S.session.day!==day){
    Object.keys(S.done).forEach(k=>{if(S.done[k]===today())delete S.done[k]});
  }
  active=true;
  activeExercise=0;
  activeSet=1;
  activeStartedAt=Date.now();
  activePausedMs=0;
  activeSessionSets=0;
  activeSessionId='session_'+Date.now();
  S.session={id:activeSessionId,day,status:'active',startedAt:activeStartedAt,elapsedMs:0,activeSet,activeExercise,sets:0};
  saveWorkoutState();
  render();
  renderActive();
  startElapsedTicker();
}
function resumeWorkout(){
  window.__vkWorkoutDay=day;
  if(!S.session || S.session.day!==day)return startGuided();
  activeSet=Math.max(1,Number(S.session.activeSet)||1);
  activeExercise=Math.max(0,Math.min(W[day].ex.length-1,Number(S.session.activeExercise)||0));
  activePausedMs=Math.max(0,Number(S.session.elapsedMs)||0);
  activeSessionSets=Math.max(0,Number(S.session.sets)||0);
  activeSessionId=String(S.session.id||('session_'+Date.now()));
  active=true;
  activeStartedAt=Date.now();
  S.session.status='active';
  S.session.startedAt=activeStartedAt;
  saveWorkoutState();
  renderActive();
  startElapsedTicker();
}
function pauseWorkout(){
  if(!active)return;
  const elapsed=sessionElapsedMs();
  active=false;
  activePausedMs=elapsed;
  activeStartedAt=0;
  clearElapsedTicker();
  S.session={
    ...(S.session||{}),
    id:activeSessionId||S.session?.id||('session_'+Date.now()),
    day,
    status:'paused',
    elapsedMs:elapsed,
    activeSet,
    activeExercise,
    sets:activeSessionSets||Number(S.session?.sets)||0
  };
  saveWorkoutState();
  render();
  history();
  renderActive();
}
function completeWorkout(){
  window.__vkWorkoutDay=day;
  if(!S.session && !active)return;
  finishSession(true);
}
function finishSession(autoComplete=false){
  if(!S.session && !active)return;

  const elapsed=sessionElapsedMs();
  const minutes=Math.max(5,Math.min(180,elapsed/60000));
  window.__vkWorkoutDay=day;
  const sets=activeSessionSets || Number(S.session?.sets)||0;

  active=false;
  activePausedMs=elapsed;
  activeStartedAt=0;
  clearElapsedTicker();

  if(autoComplete){
    W[day].ex.forEach(ex=>{S.done[key(ex[0])]=today()});
  }

  if(sets>0 && typeof addWorkoutBurn==='function'){
    window.__vkWorkoutDay=day;
    const density=sets/Math.max(1,minutes);
    const met=density>=0.50?5.8:(density>=0.30?5.0:3.5);
    addWorkoutBurn(minutes,sets,met,activeSessionId);
  }

  S.session={
    ...(S.session||{}),
    id:activeSessionId||S.session?.id||('session_'+Date.now()),
    day,
    status:'finished',
    elapsedMs:elapsed,
    activeSet,
    activeExercise,
    sets
  };
  saveWorkoutState();

  const b=document.getElementById('startWorkoutButton');
  if(b){
    b.textContent='▶️ Antrenmana Devam Et • '+formatDuration(elapsed);
    b.classList.remove('stop-workout');
  }
  render();
  renderActive();
  history();
  if(typeof updateDashboard==='function')updateDashboard();

  if(autoComplete)alert('Antrenman tamamlandı 🎉');
}
function completeActiveSet(){
  if(!active)return;
  const x=W[day].ex[activeExercise];
  const weight=Math.max(0,Number(document.getElementById('activeWeight')?.value)||0);
  const reps=Math.max(1,Number(document.getElementById('activeReps')?.value)||10);

  activeSessionSets++;
  S.logs.unshift({
    date:today(),
    at:Date.now(),
    sessionId:activeSessionId,
    day,
    exercise:x[0],
    weight,
    sets:1,
    reps,
    rpe:7
  });
  if(weight)S.weights[key(x[0])]=weight;

  if(activeSet>=x[2]){
    S.done[key(x[0])]=today();
    if(activeExercise<W[day].ex.length-1){
      activeExercise++;
      activeSet=1;
    }else{
      saveWorkoutState();
      finishSession(true);
      return;
    }
  }else{
    activeSet++;
  }

  persistSession('active');
  render();
  renderActive();
  history();
  if(typeof updateDashboard==='function')updateDashboard();
}
function exerciseImage(name,pose='start'){
  const ids={
    'Goblet Squat':'goblet-squat',
    'Dambıl Bench Press':'db-bench-press',
    'Tek Kol Dambıl Row':'single-arm-db-row',
    'Dambıl Romanian Deadlift':'dumbbell-romanian-deadlift',
    'Hammer Curl':'hammer-curl',
    'Destekli Split Squat':'dumbbell-split-squat',
    'Eğimli Dambıl Press':'incline-db-press',
    'Bench Destekli Dambıl Row':'single-arm-chest-supported-dumbbell-row',
    'Bench Glute Bridge':'glute-bridge',
    'Oturarak Dambıl Shoulder Press':'seated-db-press',
    'Dambıl Front Squat':'dumbbell-front-squat',
    'Dambıl Floor Press':'dumbbell-floor-press',
    'Rear-Delt Row':'rear-delt-fly',
    'Lateral Raise':'lateral-raise',
    'Dead Bug':'dead-bug'
  };
  const id=ids[name];
  return id ? 'https://exercise-dataset.com/images/flat/'+id+'-'+pose+'.webp' : '';
}
const MUSCLE_TARGETS={
  'Goblet Squat':['Quadriceps','Gluteus','Hamstring'],
  'Dambıl Bench Press':['Göğüs','Ön omuz','Triceps'],
  'Tek Kol Dambıl Row':['Sırt','Arka omuz','Biceps'],
  'Dambıl Romanian Deadlift':['Hamstring','Gluteus','Bel'],
  'Hammer Curl':['Biceps','Brachialis','Ön kol'],
  'Destekli Split Squat':['Quadriceps','Gluteus','Hamstring'],
  'Eğimli Dambıl Press':['Üst göğüs','Ön omuz','Triceps'],
  'Bench Destekli Dambıl Row':['Sırt','Rhomboid','Arka omuz'],
  'Bench Glute Bridge':['Gluteus','Hamstring','Core'],
  'Oturarak Dambıl Shoulder Press':['Ön omuz','Yan omuz','Triceps'],
  'Dambıl Front Squat':['Quadriceps','Gluteus','Core'],
  'Dambıl Floor Press':['Göğüs','Triceps','Ön omuz'],
  'Bench Destekli Rear-Delt Row':['Arka omuz','Üst sırt','Rhomboid'],
  'Lateral Raise':['Yan omuz','Deltoid'],
  'Dead Bug':['Karın','Core']
};
function exerciseCardImage(name){
  const start=exerciseImage(name,'start');
  const peak=exerciseImage(name,'peak');
  if(!start)return '<div class="exercise-image-fallback">🏋️</div>';
  const zoneMap={
  'Goblet Squat':'lower glute thigh',
  'Dambıl Bench Press':'chest shoulder triceps',
  'Tek Kol Dambıl Row':'back biceps rear',
  'Dambıl Romanian Deadlift':'hamstring glute back',
  'Hammer Curl':'biceps forearm',
  'Destekli Split Squat':'lower glute thigh',
  'Eğimli Dambıl Press':'chest shoulder triceps',
  'Bench Destekli Dambıl Row':'back biceps rear',
  'Bench Glute Bridge':'glute hamstring',
  'Oturarak Dambıl Shoulder Press':'shoulder triceps',
  'Dambıl Front Squat':'lower glute core',
  'Dambıl Floor Press':'chest shoulder triceps',
  'Bench Destekli Rear-Delt Row':'rear back',
  'Lateral Raise':'shoulder',
  'Dead Bug':'core'
  };
  const zones=(zoneMap[name]||'').split(' ').filter(Boolean);
  const hot=zones.map(z=>'<span class="muscle-hotspot muscle-hotspot-'+z+'"></span>').join('');
  return '<div class="exercise-image-wrap"><img src="'+start+'" alt="'+name+' başlangıç" loading="lazy"><img src="'+peak+'" alt="" class="exercise-image-peak" loading="lazy"><span class="muscle-hotspots" aria-hidden="true">'+hot+'</span></div>';
}
function exerciseKcalForLog(log){
  const bodyWeight=Math.max(40,Math.min(220,Number(state?.weight)||109));
  const details=Array.isArray(log?.setDetails)&&log.setDetails.length
    ? log.setDetails
    : [{weight:Number(log?.weight)||0,reps:Number(log?.reps)||10}];
  return Math.max(3,Math.round(details.reduce((sum,set)=>{
    const reps=Math.max(1,Number(set.reps)||10);
    const load=Math.max(0,Number(set.weight)||0);
    const volume=reps*Math.max(1,load);
    const base=reps*0.18;
    const loadFactor=Math.min(2.2,1+(load/bodyWeight)*1.8);
    const volumeFactor=Math.min(2.2,1+volume/(bodyWeight*40));
    return sum+(base*loadFactor*volumeFactor);
  },0)));
}
function exerciseVolumeForLog(log){
  const details=Array.isArray(log?.setDetails)&&log.setDetails.length
    ? log.setDetails
    : [{weight:Number(log?.weight)||0,reps:Number(log?.reps)||10}];
  return Math.round(details.reduce((sum,set)=>sum+(Math.max(0,Number(set.weight)||0)*Math.max(1,Number(set.reps)||10)),0));
}
function exerciseRepsLabel(log){
  const details=Array.isArray(log?.setDetails)&&log.setDetails.length?log.setDetails:[{reps:Number(log?.reps)||10}];
  const vals=details.map(s=>Number(s.reps)||10);
  return vals.every(v=>v===vals[0]) ? String(vals[0]) : 'farklı';
}
function workoutLoggedKcal(){
  return (S.logs||[])
    .filter(log=>log.date===today()&&log.day===day&&!log.autoDone)
    .reduce((sum,log)=>sum+exerciseKcalForLog(log),0);
}
function render(){
  const title=document.getElementById('workoutTitle');
  const subtitle=document.getElementById('workoutSubtitle');
  const detail=document.getElementById('workoutDetail');
  if(!title||!subtitle||!detail)return;

  const plan=W[day];
  const doneCount=plan.ex.filter(ex=>S.done[key(ex[0])]===today()).length;
  const todayLogs=(S.logs||[]).filter(log=>log.date===today()&&log.day===day&&!log.autoDone);
  const totalSets=todayLogs.reduce((sum,log)=>sum+(Number(log.sets)||0),0);

  title.textContent='Antrenman';
  subtitle.textContent=plan.name+' • '+plan.focus;

  const startButton=document.getElementById('startWorkoutButton');
  const timer=document.getElementById('workoutElapsed');
  if(startButton){
    const copy=startButton.querySelector('.workout-start-copy strong');
    const small=startButton.querySelector('.workout-start-copy small');
    const panel=startButton.closest('.workout-start-panel');
    let actions=panel?.querySelector('.workout-session-actions');
    if(!actions&&panel){
      actions=document.createElement('div');
      actions.className='workout-session-actions';
      actions.innerHTML='<button type="button" class="session-pause-btn">Durdur</button><button type="button" class="session-finish-btn">Antrenmanı Tamamla</button>';
      panel.appendChild(actions);
      actions.querySelector('.session-pause-btn').onclick=(ev)=>{ev.stopPropagation();pauseWorkout();};
      actions.querySelector('.session-finish-btn').onclick=(ev)=>{ev.stopPropagation();completeWorkout();};
    }
    if(active){
      if(copy)copy.textContent='Antrenmana Devam Ediyor';
      if(small)small.textContent='Süreyi takip et ve setlerini kaydet';
      startButton.classList.add('is-running');
      if(timer)timer.textContent=formatDuration(sessionElapsedMs());
      if(actions)actions.style.display='flex';
    }else if(S.session?.status==='paused'&&S.session.day===day){
      if(copy)copy.textContent='Antrenmana Devam Et';
      if(small)small.textContent='Kaldığın yerden devam et';
      startButton.classList.remove('is-running');
      if(timer)timer.textContent=formatDuration(Number(S.session.elapsedMs)||0);
      if(actions)actions.style.display='flex';
      const pauseBtn=actions?.querySelector('.session-pause-btn');
      if(pauseBtn)pauseBtn.textContent='Devam Et';
    }else{
      if(copy)copy.textContent='Antrenmanı Başlat';
      if(small)small.textContent='Süreyi başlat ve setlerini kaydet';
      startButton.classList.remove('is-running');
      if(timer)timer.textContent='00:00';
      if(actions)actions.style.display='none';
    }
  }

  detail.innerHTML=plan.ex.map((x,i)=>{
    const k=key(x[0]);
    const saved=(S.logs||[]).find(log=>log.date===today()&&log.day===day&&log.exercise===x[0]&&!log.autoDone);
    const sets=saved?.sets ?? x[2];
    const reps=saved?.reps ?? Number((x[3].match(/^\\d+/)||['10'])[0]);
    const weight=saved?.weight ?? S.weights[k] ?? '';
    const isDone=S.done[k]===today();
    const kcal=isDone&&saved?exerciseKcalForLog(saved):0;
    const volume=isDone&&saved?exerciseVolumeForLog(saved):0;
    return '<article class="exercise-card modern-exercise-card '+(isDone?'done':'')+'">'+
      '<div class="exercise-main">'+
        '<button class="exercise-visual" type="button" data-open="'+i+'">'+exerciseCardImage(x[0])+'</button>'+
        '<div class="exercise-info">'+
          '<div class="exercise-title-row"><button class="exercise-open exercise-title-button" type="button" data-open="'+i+'"><h3>'+x[0]+'</h3></button><div class="exercise-actions-large"><button class="inline-add" type="button" data-add-set="'+i+'" aria-label="Set ekle">+</button><button class="inline-complete '+(isDone?'completed':'')+'" type="button" data-complete="'+i+'" aria-label="Hareketi tamamla">✓</button></div></div>'+
          '<div class="exercise-result">'+
            '<span class="compact-metric">🔥 <b>'+kcal+' kcal</b></span>'+
            '<span class="compact-metric">🏋️ <b>'+volume+' kg</b></span>'+
            '<span class="compact-metric">▱ <b>'+sets+' × '+reps+'</b></span>'+
          '</div>'+
          '<div class="exercise-inline-controls">'+
            '<label class="inline-field"><small>Ağırlık (kg)</small><input aria-label="Ağırlık kg" data-weight="'+i+'" type="number" min="0" step="0.5" value="'+weight+'" placeholder="0"></label>'+
            '<label class="inline-field"><small>Set</small><input aria-label="Set" data-sets="'+i+'" type="number" min="1" max="10" value="'+sets+'" placeholder="1"></label>'+
            '<label class="inline-field"><small>Tekrar</small><input aria-label="Tekrar" data-reps="'+i+'" type="number" min="1" max="50" value="'+reps+'" placeholder="10"></label>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div class="exercise-inline-controls">'+
        '<label class="inline-field"><small>Ağırlık (kg)</small><input aria-label="Ağırlık kg" data-weight="'+i+'" type="number" min="0" step="0.5" value="'+weight+'" placeholder="0"></label>'+
        '<label class="inline-field"><small>Set</small><input aria-label="Set" data-sets="'+i+'" type="number" min="1" max="10" value="'+sets+'" placeholder="1"></label>'+
        '<label class="inline-field"><small>Tekrar</small><input aria-label="Tekrar" data-reps="'+i+'" type="number" min="1" max="50" value="'+reps+'" placeholder="10"></label>'+
      '</div>'+
    '</article>';
  }).join('');

  const stats=document.querySelector('.workout-quick-stats');
  if(stats){
    stats.querySelector('[data-stat="moves"]').textContent=doneCount+'/5';
    stats.querySelector('[data-stat="sets"]').textContent=totalSets;
    stats.querySelector('[data-stat="time"]').textContent=stateWorkoutMinutes()+' dk';
    stats.querySelector('[data-stat="kcal"]').textContent=workoutLoggedKcal();
  }
}
function stateWorkoutMinutes(){
  const sessionMinutes=S.session?.day===day ? Number(S.session.elapsedMs||0)/60000 : 0;
  return Math.round(Math.max(sessionMinutes, todayWorkoutLoggedMinutes()));
}
function todayWorkoutLoggedMinutes(){
  const sport=state?.dailySports||[];
  return Math.round(sport.filter(x=>x.name==='Ağırlık Antrenmanı').reduce((s,x)=>s+(Number(x.duration)||0),0));
}
function workoutKcalToday(){
  const currentId=activeSessionId||S.session?.id||'';
  const committed=Math.round((state?.dailySports||[])
    .filter(x=>x.name==='Ağırlık Antrenmanı' && x.sessionId!==currentId)
    .reduce((s,x)=>s+(Number(x.calories)||0),0));
  const sessionOpen=active || (S.session?.day===day && S.session?.status==='paused');
  if(!sessionOpen)return committed + Math.round((state?.dailySports||[])
    .filter(x=>x.name==='Ağırlık Antrenmanı' && x.sessionId===currentId)
    .reduce((s,x)=>s+(Number(x.calories)||0),0));
  const mins=sessionElapsedMs()/60000;
  if(mins<=0)return committed;
  const weight=Number(state?.weight)||0;
  if(weight<=0)return committed;
  const sets=activeSessionSets||Number(S.session?.sets)||0;
  const density=sets/Math.max(1,mins);
  const met=density>=0.50?5.8:(density>=0.30?5.0:3.5);
  return committed+Math.max(0,Math.round((met-1)*weight*(mins/60)));
}
function renderActive(){
  const panel=document.getElementById('activeWorkoutPanel');
  if(panel)panel.innerHTML='';
}
function syncWorkoutBurnToDashboard(){
  if(typeof state==='undefined')return;
  const kcal=workoutLoggedKcal();
  const logs=(S.logs||[]).filter(log=>log.date===today()&&log.day===day&&!log.autoDone);
  const sets=logs.reduce((sum,log)=>sum+(Number(log.sets)||0),0);
  const duration=stateWorkoutMinutes();
  state.dailySports=Array.isArray(state.dailySports)?state.dailySports:[];
  let entry=state.dailySports.find(x=>x.name==='Ağırlık Antrenmanı' && x.workoutDay===day && x.workoutDate===today());
  const old=Number(entry?.calories)||0;
  if(!entry){
    entry={name:'Ağırlık Antrenmanı',duration,sets,met:0,weight:Number(state.weight)||0,calories:kcal,workoutDay:day,workoutDate:today(),sessionId:activeSessionId||S.session?.id||('workout_'+today()+'_'+day)};
    state.dailySports.push(entry);
  }else{
    entry.duration=duration;
    entry.sets=sets;
    entry.weight=Number(state.weight)||entry.weight||0;
    entry.calories=kcal;
  }
  state.burned=Math.max(0,(Number(state.burned)||0)-old+kcal);
  if(typeof save==='function')saveWorkoutState();
  if(typeof updateDashboard==='function')updateDashboard();
  if(typeof renderSports==='function')renderSports();
}

function saveExerciseValues(i,weight,sets,reps,setDetails=null){
  const x=W[day].ex[i],k=key(x[0]);
  weight=Math.max(0,Number(weight)||0);
  sets=Math.max(1,Math.min(10,Number(sets)||x[2]));
  reps=Math.max(1,Math.min(50,Number(reps)||10));

  S.logs=(S.logs||[]).filter(log=>!(log.date===today()&&log.day===day&&log.exercise===x[0]&&!log.autoDone));
  let normalizedDetails=Array.isArray(setDetails)&&setDetails.length
    ? setDetails.map(s=>({weight:Math.max(0,Number(s.weight)||0),reps:Math.max(1,Number(s.reps)||10)}))
    : null;
  if(normalizedDetails) sets=normalizedDetails.length;
  S.logs.unshift({date:today(),at:Date.now(),sessionId:activeSessionId||S.session?.id||null,day,exercise:x[0],weight,sets,reps,rpe:7,setDetails:normalizedDetails});
  if(weight)S.weights[k]=weight;
  S.done[k]=today();
  if(active){
    const currentTotal=(S.logs||[]).filter(log=>log.date===today()&&log.day===day&&!log.autoDone)
      .reduce((sum,log)=>sum+(Number(log.sets)||0),0);
    activeSessionSets=currentTotal;
    persistSession('active');
  }else{
    saveWorkoutState();
  }

  const allDone=W[day].ex.every(ex=>S.done[key(ex[0])]===today());
  if(allDone){
    const todayLogs=S.logs.filter(log=>log.date===today()&&log.day===day&&!log.autoDone);
    const totalSets=todayLogs.reduce((sum,log)=>sum+(Number(log.sets)||0),0);
    const avgReps=todayLogs.length?todayLogs.reduce((sum,log)=>sum+(Number(log.reps)||0),0)/todayLogs.length:10;
    const sessionMinutes=active && activeStartedAt ? Math.max(5,(Date.now()-activeStartedAt+activePausedMs)/60000) : Math.max(20,totalSets*2.5+avgReps);
    const density=totalSets/Math.max(1,sessionMinutes);
    const met=density>=0.50?5.8:(density>=0.30?5.0:3.5);

    if(active){
      activeSessionSets=totalSets;
      if(S.session){S.session.sets=totalSets;S.session.elapsedMs=sessionElapsedMs();S.session.status='active'}
      finishSession(true);
    }else if(typeof addWorkoutBurn==='function'){
      addWorkoutBurn(sessionMinutes,totalSets,met,'direct_'+today()+'_'+day);
      W[day].ex.forEach(ex=>{S.done[key(ex[0])]=today()});
      saveWorkoutState();
    }
  }

  syncWorkoutBurnToDashboard();
  render();
  history();
  if(typeof updateDashboard==='function')updateDashboard();
}
function addSetFromCard(i){
  const w=Number(document.querySelector('[data-weight="'+i+'"]')?.value)||0;
  const reps=Number(document.querySelector('[data-reps="'+i+'"]')?.value)||10;
  const x=W[day].ex[i], k=key(x[0]);
  const existing=(S.logs||[]).find(log=>log.date===today()&&log.day===day&&log.exercise===x[0]&&!log.autoDone);
  const details=Array.isArray(existing?.setDetails)&&existing.setDetails.length
    ? existing.setDetails.map(s=>({weight:Number(s.weight)||0,reps:Number(s.reps)||10}))
    : [];
  details.push({weight:w,reps});
  const sets=details.length;
  const first=details[0]||{weight:w,reps};
  S.logs=(S.logs||[]).filter(log=>!(log.date===today()&&log.day===day&&log.exercise===x[0]&&!log.autoDone));
  S.logs.unshift({
    date:today(),at:Date.now(),sessionId:activeSessionId||S.session?.id||null,
    day,exercise:x[0],weight:first.weight,sets,reps:first.reps,rpe:7,setDetails:details
  });
  if(w)S.weights[k]=w;
  S.done[k]=false;
  if(active){activeSessionSets=(S.logs||[]).filter(log=>log.date===today()&&log.day===day&&!log.autoDone).reduce((sum,log)=>sum+(Number(log.sets)||0),0);persistSession('active')}
  saveWorkoutState(); render(); history(); if(typeof syncWorkoutBurnToDashboard==='function')syncWorkoutBurnToDashboard(); if(typeof updateDashboard==='function')updateDashboard();
}
function completeExerciseFromCard(i){
  const existing=(S.logs||[]).find(log=>log.date===today()&&log.day===day&&log.exercise===W[day].ex[i][0]&&!log.autoDone);
  const weight=document.querySelector('[data-weight="'+i+'"]')?.value||0;
  const sets=document.querySelector('[data-sets="'+i+'"]')?.value||W[day].ex[i][2];
  const reps=document.querySelector('[data-reps="'+i+'"]')?.value||10;
  saveExerciseValues(i,weight,sets,reps,existing?.setDetails||null);
}
function saveExerciseFromCard(i){
  const weight=document.querySelector('[data-weight="'+i+'"]')?.value||0;
  const sets=document.querySelector('[data-sets="'+i+'"]')?.value||W[day].ex[i][2];
  const reps=document.querySelector('[data-reps="'+i+'"]')?.value||10;
  saveExerciseValues(i,weight,sets,reps);
}
function saveExerciseFromModal(){
  if(!selected)return;
  const i=W[day].ex.findIndex(x=>x[0]===selected[0]);
  if(i<0)return;
  const details=collectModalSetDetails();
  const first=details[0]||{};
  const weight=first.weight ?? document.getElementById('modalWeight')?.value ?? 0;
  const reps=first.reps ?? document.getElementById('modalReps')?.value ?? 10;
  const sets=Math.max(1,Math.min(10,details.length || Number(document.getElementById('modalSets')?.value)||3));
  saveExerciseValues(i,weight,sets,reps,details);
  close();
}
function addModalSetRow(weight='',reps=10){
  const list=document.getElementById('modalSetList');
  if(!list)return;
  const n=list.querySelectorAll('.modal-set-row').length+1;
  const row=document.createElement('div');
  row.className='modal-set-row';
  row.innerHTML='<span>'+n+'. Set</span><input class="modal-set-weight" type="number" min="0" step="0.5" value="'+weight+'" placeholder="kg"><input class="modal-set-reps" type="number" min="1" max="50" value="'+reps+'" placeholder="tekrar"><button type="button" class="modal-remove-set" data-remove-set aria-label="Seti sil">×</button>';
  list.appendChild(row);
  syncModalSetCount();
}
function syncModalSetCount(){
  const list=document.getElementById('modalSetList');
  const input=document.getElementById('modalSets');
  if(list&&input)input.value=Math.max(1,list.querySelectorAll('.modal-set-row').length);
}
function collectModalSetDetails(){
  const list=document.getElementById('modalSetList');
  if(!list)return [];
  return [...list.querySelectorAll('.modal-set-row')].map(row=>({
    weight:Math.max(0,Number(row.querySelector('.modal-set-weight')?.value)||0),
    reps:Math.max(1,Number(row.querySelector('.modal-set-reps')?.value)||10)
  }));
}
function open(i){
  selected=W[day].ex[i];
  const saved=(S.logs||[]).find(log=>log.date===today()&&log.day===day&&log.exercise===selected[0]&&!log.autoDone);
  const weight=saved?.weight ?? S.weights[key(selected[0])] ?? '';
  const sets=saved?.sets ?? selected[2];
  const reps=saved?.reps ?? Number((selected[3].match(/^\\d+/)||['10'])[0]);

  document.getElementById('workoutModalTitle').textContent=selected[0];
  document.getElementById('workoutModalMuscle').innerHTML=selected[1].split(' • ').map(x=>'<span class="modal-muscle-tag">'+x+'</span>').join('');

  const start=exerciseImage(selected[0],'start');
  const peak=exerciseImage(selected[0],'peak');
  document.getElementById('workoutAnimation').innerHTML=
    '<div class="real-exercise-view">'+
      '<img src="'+start+'" alt="'+selected[0]+' başlangıç" class="real-exercise-img start-img">'+
      '<img src="'+peak+'" alt="'+selected[0]+' hareket" class="real-exercise-img peak-img">'+
      '<div class="real-exercise-labels"><span>BAŞLANGIÇ</span><b>↕</b><span>HAREKET</span></div>'+
    '</div>';

  document.getElementById('workoutCues').innerHTML=selected[5].map(x=>'<li>'+x+'</li>').join('');
  document.getElementById('modalWeight').value=weight;
  document.getElementById('modalSets').value=sets;
  document.getElementById('modalReps').value=reps;

  const setList=document.getElementById('modalSetList');
  if(setList){
    const details=Array.isArray(saved?.setDetails)&&saved.setDetails.length
      ? saved.setDetails
      : Array.from({length:Number(sets)||3},()=>({weight:Number(weight)||0,reps:Number(reps)||10}));
    setList.innerHTML=details.map((d,n)=>
      '<div class="modal-set-row"><span>'+(n+1)+'. Set</span><input class="modal-set-weight" type="number" min="0" step="0.5" value="'+(d.weight||0)+'" placeholder="kg"><input class="modal-set-reps" type="number" min="1" max="50" value="'+(d.reps||10)+'" placeholder="tekrar"><button type="button" class="modal-remove-set" data-remove-set aria-label="Seti sil">×</button></div>'
    ).join('');
  }

  document.getElementById('workoutSource').innerHTML='<a target="_blank" rel="noopener" href="https://repdb.co">Exercise data by RepDB ↗</a>';
  document.getElementById('workoutModal').classList.add('open');
}
function close(){document.getElementById('workoutModal').classList.remove('open');selected=null}
function deleteHistory(id){
  if(!id)return;
  const sports=Array.isArray(state?.dailySports)?state.dailySports:[];
  const removed=sports.filter(x=>(x.sessionId||'')===id && x.name==='Ağırlık Antrenmanı');
  const removedKcal=removed.reduce((sum,x)=>sum+(Number(x.calories)||0),0);
  state.dailySports=sports.filter(x=>!((x.sessionId||'')===id && x.name==='Ağırlık Antrenmanı'));
  if(removedKcal)state.burned=Math.max(0,(Number(state.burned)||0)-removedKcal);
  S.logs=(S.logs||[]).filter(log=>(log.sessionId||'')!==id);
  if(S.session?.id===id)S.session=null;
  saveWorkoutState();
  if(typeof save==='function')save();
  render();
  history();
  if(typeof updateDashboard==='function')updateDashboard();
  if(typeof renderSports==='function')renderSports();
}

function history(){
  const el=document.getElementById('workoutHistory');
  if(!el)return;
  const sessions={};
  (S.logs||[]).forEach(log=>{
    if(log.autoDone)return;
    const id=log.sessionId || ('direct_'+log.date+'_'+log.day);
    const key=id+'_'+log.date+'_'+log.day;
    if(!sessions[key])sessions[key]={date:log.date,day:log.day,sessionId:id,moves:new Set(),sets:0};
    sessions[key].moves.add(log.exercise);
    sessions[key].sets+=Number(log.sets)||0;
  });
  const sports=(state?.dailySports||[]).filter(x=>x.name==='Ağırlık Antrenmanı');
  const cards=sports.map(s=>{
    const id=s.sessionId||'';
    const matching=Object.values(sessions).find(x=>id && x.sessionId===id);
    const moves=matching?matching.moves.size:(matching?.moves?.size||0);
    const sets=Number(s.sets)||matching?.sets||0;
    const duration=Math.round(Number(s.duration)||0);
    const kcal=Math.round(Number(s.calories)||0);
    return '<div class="workout-history-summary" data-history-id="'+id+'"><button type="button" class="history-delete" data-delete-history="'+id+'" aria-label="Antrenman geçmişini sil">×</button><div class="history-summary-head"><strong>'+new Date((s.date||today())+'T12:00:00').toLocaleDateString('tr-TR',{day:'2-digit',month:'long',year:'numeric'})+'</strong><span>Gün '+(s.day||matching?.day||day)+'</span></div><div class="history-summary-grid"><div><b>'+(moves||'—')+'</b><small>Hareket</small></div><div><b>'+sets+'</b><small>Set</small></div><div><b>'+duration+' dk</b><small>Süre</small></div><div><b>'+kcal+' kcal</b><small>Yakım</small></div></div></div>';
  });
  el.innerHTML=cards.slice(-10).reverse().join('') || '<div class="empty-state">Henüz tamamlanan antrenman yok.</div>';
}
function resetWorkoutDay(){
  clearElapsedTicker();
  active=false;
  activeStartedAt=0;
  activePausedMs=0;
  activeSessionSets=0;
  activeSessionId='';
  S.done={};
  S.dayResetAt=Date.now();
  S.session=null;
  saveWorkoutState();
  render();
  renderActive();
  history();
  if(typeof updateDashboard==='function')updateDashboard();
}
document.addEventListener('DOMContentLoaded',initWorkout);
