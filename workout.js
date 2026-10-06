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
function save(){localStorage.setItem(WORKOUT_KEY,JSON.stringify(S))}
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
  save();
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
      const button=document.getElementById('startWorkoutButton');
      if(button)button.textContent='⏹️ Antrenmanı Bitir • '+formatDuration(sessionElapsedMs());
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

  document.getElementById('workoutDetail').onclick=e=>{
    const b=e.target.closest('[data-open]');
    if(b)open(+b.dataset.open);
    const d=e.target.closest('[data-done]');
    if(d)saveExerciseFromCard(+d.dataset.done);
  };

  document.getElementById('startWorkoutButton').onclick=()=>{
    if(active)finishSession(false);
    else if(S.session && S.session.status==='paused' && S.session.day===day)resumeWorkout();
    else startGuided();
  };

  startElapsedTicker();
}

function tabs(){
  const icons=['🅰️','🅱️','🆑'];
  document.getElementById('workoutDayTabs').innerHTML=[1,2,3].map((d,i)=>
    '<button class="workout-day '+(d===day?'active':'')+'" data-day="'+d+'"><span class="day-icon">'+icons[i]+'</span><span class="day-label"><strong>Gün '+d+'</strong><small>'+W[d].name.replace('Full Body ','')+'</small></span><span class="day-arrow">›</span></button>'
  ).join('');
}
function startGuided(){
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
  save();
  render();
  renderActive();
  startElapsedTicker();
}
function resumeWorkout(){
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
  save();
  renderActive();
  startElapsedTicker();
}
function finishSession(autoComplete=false){
  if(!S.session && !active)return;

  const elapsed=sessionElapsedMs();
  const minutes=Math.max(5,Math.min(180,elapsed/60000));
  const sets=activeSessionSets || Number(S.session?.sets)||0;

  active=false;
  activePausedMs=elapsed;
  activeStartedAt=0;
  clearElapsedTicker();

  if(autoComplete){
    W[day].ex.forEach(ex=>{S.done[key(ex[0])]=today()});
  }

  if(sets>0 && typeof addWorkoutBurn==='function'){
    const density=sets/Math.max(1,minutes);
    const met=density>=0.50?5.8:(density>=0.30?5.0:3.5);
    addWorkoutBurn(minutes,sets,met,activeSessionId);
  }

  S.session={
    ...(S.session||{}),
    id:activeSessionId||S.session?.id||('session_'+Date.now()),
    day,
    status:'paused',
    elapsedMs:elapsed,
    activeSet,
    activeExercise,
    sets
  };
  save();

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
      save();
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
    'Tek Kol Dambıl Row':'single-arm-dumbbell-row',
    'Dambıl Romanian Deadlift':'dumbbell-romanian-deadlift',
    'Hammer Curl':'hammer-curl',
    'Destekli Split Squat':'dumbbell-split-squat',
    'Eğimli Dambıl Press':'incline-dumbbell-press',
    'Bench Destekli Dambıl Row':'single-arm-chest-supported-dumbbell-row',
    'Bench Glute Bridge':'glute-bridge',
    'Oturarak Dambıl Shoulder Press':'seated-db-press',
    'Dambıl Front Squat':'dumbbell-front-squat',
    'Dambıl Floor Press':'dumbbell-floor-press',
    'Rear-Delt Row':'rear-delt-row',
    'Lateral Raise':'dumbbell-lateral-raise',
    'Dead Bug':'dead-bug'
  };
  const id=ids[name];
  return id ? 'https://exercise-dataset.com/images/flat/'+id+'-'+pose+'.webp' : '';
}
function exerciseCardImage(name){
  const start=exerciseImage(name,'start');
  const peak=exerciseImage(name,'peak');
  if(!start)return '<div class="exercise-image-fallback">🏋️</div>';
  return '<div class="exercise-image-wrap"><img src="'+start+'" alt="'+name+' başlangıç" loading="lazy"><img src="'+peak+'" alt="" class="exercise-image-peak" loading="lazy"></div>';
}
function render(){
  const title=document.getElementById('workoutTitle');
  const subtitle=document.getElementById('workoutSubtitle');
  const progress=document.getElementById('workoutProgress');
  const detail=document.getElementById('workoutDetail');
  if(!title||!subtitle||!progress||!detail)return;

  const plan=W[day];
  const doneCount=plan.ex.filter(ex=>S.done[key(ex[0])]===today()).length;
  const todayLogs=(S.logs||[]).filter(log=>log.date===today()&&log.day===day&&!log.autoDone);
  const totalSets=todayLogs.reduce((sum,log)=>sum+(Number(log.sets)||0),0);
  const minutes=stateWorkoutMinutes();
  title.textContent=plan.name;
  subtitle.textContent=plan.focus;
  progress.innerHTML='<strong>'+doneCount+'/5</strong><span>hareket</span>';

  const startButton=document.getElementById('startWorkoutButton');
  if(startButton){
    if(active)startButton.textContent='⏹ Antrenmanı Bitir • '+formatDuration(sessionElapsedMs());
    else if(S.session?.status==='paused'&&S.session.day===day)startButton.textContent='▶ Antrenmana Devam Et • '+formatDuration(Number(S.session.elapsedMs)||0);
    else startButton.textContent='▶ Antrenmanı Başlat';
  }

  detail.innerHTML=plan.ex.map((x,i)=>{
    const k=key(x[0]);
    const saved=(S.logs||[]).find(log=>log.date===today()&&log.day===day&&log.exercise===x[0]&&!log.autoDone);
    const wt=saved?.weight ?? S.weights[k] ?? '';
    const sets=saved?.sets ?? x[2];
    const reps=saved?.reps ?? Number((x[3].match(/^\d+/)||['10'])[0]);
    const isDone=S.done[k]===today();
    const muscles=x[1].split(' • ').map(m=>'<span>'+m+'</span>').join('');
    return '<article class="exercise-card modern-exercise-card '+(isDone?'done':'')+'">'+
      '<button class="exercise-main" type="button" data-open="'+i+'">'+exerciseCardImage(x[0])+'<div class="exercise-info"><div class="exercise-title-row"><h3>'+x[0]+'</h3><span class="exercise-check">'+(isDone?'✓':'○')+'</span></div><div class="muscle-tags">'+muscles+'</div><div class="exercise-prescription"><span>3 set</span><span>'+x[3]+' tekrar</span></div></div></button>'+
      '<div class="workout-entry-grid"><label>Ağırlık (kg)<input data-weight="'+i+'" type="number" min="0" step="0.5" value="'+wt+'" placeholder="0"></label><label>Set<input data-sets="'+i+'" type="number" min="1" max="10" value="'+sets+'"></label><label>Tekrar<input data-reps="'+i+'" type="number" min="1" max="50" value="'+reps+'"></label></div>'+
      '<div class="exercise-actions"><button class="technique-btn" data-open="'+i+'">Detay / Nasıl yapılır</button><button class="done-btn" data-done="'+i+'">'+(isDone?'✓ Kaydedildi':'Setleri Kaydet')+'</button></div>'+
    '</article>';
  }).join('');

  const stats=document.querySelector('.workout-quick-stats');
  if(stats){
    stats.querySelector('[data-stat="moves"]').textContent=doneCount+'/5';
    stats.querySelector('[data-stat="sets"]').textContent=totalSets;
    stats.querySelector('[data-stat="time"]').textContent=minutes+' dk';
    stats.querySelector('[data-stat="kcal"]').textContent=workoutKcalToday();
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
  return Math.round((state?.dailySports||[]).filter(x=>x.name==='Ağırlık Antrenmanı').reduce((s,x)=>s+(Number(x.calories)||0),0));
}
function renderActive(){
  const panel=document.getElementById('activeWorkoutPanel');
  if(!panel)return;

  if(!active){
    const paused=S.session&&S.session.status==='paused'&&S.session.day===day;
    panel.innerHTML=paused
      ? '<div class="active-workout paused-workout"><div><strong>⏸️ Antrenman durduruldu</strong><span id="pausedWorkoutInfo">'+formatDuration(Number(S.session.elapsedMs)||0)+' • '+(Number(S.session.sets)||0)+' set tamamlandı</span></div><button class="resume-inline" type="button">▶️ Devam Et</button></div>'
      : '';
    const resume=panel.querySelector('.resume-inline');
    if(resume)resume.onclick=resumeWorkout;
    return;
  }

  const x=W[day].ex[activeExercise];
  const total=W[day].ex.length;
  const defaultWeight=S.weights[key(x[0])]||'';
  const defaultReps=(x[3].match(/^\d+/)||['10'])[0];

  panel.innerHTML='<div class="active-workout">'+
    '<div class="active-workout-head"><div><span class="eyebrow">AKTİF ANTRENMAN</span><h3>'+x[0]+'</h3><p>'+x[1]+' • '+(activeExercise+1)+'/'+total+' hareket</p></div><div class="elapsed-box"><small>Süre</small><strong id="workoutElapsed">'+formatDuration(sessionElapsedMs())+'</strong></div></div>'+
    '<div class="set-controls three"><label>Ağırlık (kg)<input id="activeWeight" type="number" min="0" step="0.5" placeholder="0" value="'+defaultWeight+'"></label><label>Set<input id="activeSetInput" type="number" min="1" max="3" value="'+activeSet+'" readonly></label><label>Tekrar<input id="activeReps" type="number" min="1" max="50" value="'+defaultReps+'"></label></div>'+
    '<div class="active-set"><span>Set '+activeSet+' / '+x[2]+'</span><button id="completeActiveSet">✓ Seti Tamamla</button></div>'+
    '<div class="active-next">Sonraki: '+(W[day].ex[activeExercise+1]?.[0]||'Antrenman biter')+'</div>'+
    '<button class="technique-btn" id="activeTechnique">▶ Tekniği göster</button>'+
  '</div>';

  document.getElementById('completeActiveSet').onclick=completeActiveSet;
  document.getElementById('activeTechnique').onclick=()=>open(activeExercise);
}
function saveExerciseFromCard(i){
  const x=W[day].ex[i],k=key(x[0]);
  const weight=Math.max(0,Number(document.querySelector('[data-weight="'+i+'"]')?.value)||0);
  const sets=Math.max(1,Math.min(10,Number(document.querySelector('[data-sets="'+i+'"]')?.value)||x[2]));
  const reps=Math.max(1,Math.min(50,Number(document.querySelector('[data-reps="'+i+'"]')?.value)||10));

  S.logs=(S.logs||[]).filter(log=>!(log.date===today()&&log.day===day&&log.exercise===x[0]&&!log.autoDone));
  S.logs.unshift({date:today(),at:Date.now(),day,exercise:x[0],weight,sets,reps,rpe:7});
  if(weight)S.weights[k]=weight;
  S.done[k]=today();
  save();

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
      if(S.session){S.session.sets=totalSets;S.session.elapsedMs=Date.now()-activeStartedAt+activePausedMs;S.session.status='active'}
      finishSession(true);
    }else if(typeof addWorkoutBurn==='function'){
      addWorkoutBurn(sessionMinutes,totalSets,met,'direct_'+today()+'_'+day);
      W[day].ex.forEach(ex=>{S.done[key(ex[0])]=today()});
      save();
    }
  }

  render();
  history();
  if(typeof updateDashboard==='function')updateDashboard();
}
function open(i){
  selected=W[day].ex[i];
  document.getElementById('workoutModalTitle').textContent=selected[0];
  document.getElementById('workoutModalMuscle').textContent=selected[1];
  const start=exerciseImage(selected[0],'start');
  const peak=exerciseImage(selected[0],'peak');
  document.getElementById('workoutAnimation').innerHTML=
    '<div class="real-exercise-view">'+
      '<img src="'+start+'" alt="'+selected[0]+' başlangıç" class="real-exercise-img start-img">'+
      '<img src="'+peak+'" alt="'+selected[0]+' hareket" class="real-exercise-img peak-img">'+
      '<div class="real-exercise-labels"><span>BAŞLANGIÇ</span><b>↕</b><span>HAREKET</span></div>'+
    '</div>';
  document.getElementById('workoutCues').innerHTML=selected[5].map(x=>'<li>'+x+'</li>').join('');
  document.getElementById('workoutMistakes').innerHTML=selected[6].map(x=>'<li>'+x+'</li>').join('');
  document.getElementById('workoutSource').innerHTML='<a target="_blank" rel="noopener" href="https://repdb.co">Exercise data by RepDB ↗</a>';
  document.getElementById('workoutModal').classList.add('open');
}
function close(){document.getElementById('workoutModal').classList.remove('open');selected=null}
function history(){
  document.getElementById('workoutHistory').innerHTML=S.logs.slice(0,15).map(x=>
    '<div class="workout-history-item"><strong>'+new Date(x.date+'T12:00:00').toLocaleDateString('tr-TR')+'</strong><span>Gün '+x.day+' • '+x.exercise+'</span><span>'+x.weight+' kg × '+x.sets+' × '+x.reps+' • RPE '+x.rpe+'</span></div>'
  ).join('')||'<div class="empty-state">Henüz kayıt yok. İlk antrenmandan sonra burada görünecek.</div>';
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
  save();
  render();
  renderActive();
  history();
  if(typeof updateDashboard==='function')updateDashboard();
}
document.addEventListener('DOMContentLoaded',initWorkout);
