/* VK Life workout interaction patch */
(function(){
  function patchWorkoutModal(){
    if(typeof window.open!=='function' || window.__vkWorkoutOpenPatched)return;
    const originalOpen=window.open;
    window.open=function(i){
      originalOpen(i);
      const selectedName=(typeof W!=='undefined' && W[day] && W[day].ex[i]) ? W[day].ex[i][0] : '';
      const saved=(typeof S!=='undefined' && typeof isCurrentWorkoutLog==='function')
        ? (S.logs||[]).find(log=>isCurrentWorkoutLog(log)&&log.exercise===selectedName)
        : null;
      if(!saved || !Array.isArray(saved.setDetails) || !saved.setDetails.length){
        const list=document.getElementById('modalSetList');
        if(list)list.innerHTML='<div class="modal-empty-sets">Henüz set eklenmedi. Her seti <b>+ Set ekle</b> ile kendin gir.</div>';
        if(typeof syncModalSetCount==='function')syncModalSetCount();
      }
    };
    window.__vkWorkoutOpenPatched=true;
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',patchWorkoutModal);
  else patchWorkoutModal();
})();