(()=>{
 const previous=renderPlan;
 renderPlan=function(){previous();const bar=document.createElement('div');bar.className='plan-rotation';
 const select=document.createElement('select');select.setAttribute('aria-label','Pomieszczenie do obrotu');
 for(const r of data.rooms){const option=document.createElement('option');option.value=r.id;option.textContent=r.name;option.selected=r.id===roomId;select.append(option)}
 select.onchange=()=>{roomId=select.value;wall=0;activeElement=null;activeField=null;shapeDraft=null;render()};bar.append(select);
 for(const [direction,label] of [[-1,'↶ 90°'],[1,'↷ 90°']]){const button=document.createElement('button');button.textContent=label;button.setAttribute('aria-label',direction===1?'Obróć wybrany pokój o 90 stopni w prawo':'Obróć wybrany pokój o 90 stopni w lewo');button.onclick=()=>{
  const r=room(),linked=data.links.some(l=>l.a===r.id||l.b===r.id);
  if(linked&&!confirm('Obrót odłączy połączenia tego pokoju z innymi ścianami. Kontynuować?'))return;
  try{const next=RoomRotation.rotate(r,direction);data.rooms[data.rooms.indexOf(r)]=next;data.links=data.links.filter(l=>l.a!==r.id&&l.b!==r.id);wall=0;activeElement=null;activeField=null;shapeDraft=null;save();render();toast('Obrócono „'+r.name+'”. Przeciągnij pokój do właściwego miejsca.');}catch(e){toast(e.message)}
 };bar.append(button)}
 document.querySelector('#content .card.plan').before(bar);
 };
 if(typeof projectReady!=='undefined'&&projectReady&&view==='plan')render();
})();
