/* Keep tools collapsed on phones, alongside the live measurement workspace. */
(()=>{
 const small=()=>window.innerWidth<=600;
 let floatPosition=null,minimized=false,positionPreview=()=>{};
 function floatingPreview(){
 const stage=document.querySelector('.editor-stage'),card=stage?.querySelector('.model-card');if(!card)return;
 const expand=card.querySelector('.tiny');if(expand){expand.setAttribute('aria-label','Powiększ podgląd 3D');}
 const bar=card.querySelector('.card-top');bar.classList.add('float-grip');bar.title='Przeciągnij podgląd 3D';
 const grip=document.createElement('span');grip.className='float-label';grip.textContent='⠿ 3D';bar.prepend(grip);
 const fold=document.createElement('button');fold.type='button';fold.className='float-fold';bar.append(fold);
 function foldState(){card.classList.toggle('preview-minimized',minimized);fold.textContent=minimized?'＋':'−';fold.setAttribute('aria-label',minimized?'Rozwiń miniaturę 3D':'Zwiń miniaturę 3D');fold.setAttribute('aria-expanded',String(!minimized));}
 fold.onclick=()=>{minimized=!minimized;foldState();place()};foldState();
 function place(){if(!small())return;const maxX=Math.max(0,stage.clientWidth-card.offsetWidth),maxY=Math.max(0,stage.clientHeight-card.offsetHeight);const pos=floatPosition||{x:maxX,y:5};card.style.left=Math.max(0,Math.min(maxX,pos.x))+'px';card.style.top=Math.max(0,Math.min(maxY,pos.y))+'px';}
 let drag=null;
 bar.addEventListener('pointerdown',e=>{if(!small()||e.target.closest('button'))return;e.preventDefault();const a=card.getBoundingClientRect();drag={id:e.pointerId,x:e.clientX,y:e.clientY,left:a.left-stage.getBoundingClientRect().left,top:a.top-stage.getBoundingClientRect().top};bar.setPointerCapture(e.pointerId)});
 bar.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;floatPosition={x:drag.left+e.clientX-drag.x,y:drag.top+e.clientY-drag.y};place()});
 const end=()=>{drag=null};bar.addEventListener('pointerup',end);bar.addEventListener('pointercancel',end);bar.addEventListener('lostpointercapture',end);
 positionPreview=place;requestAnimationFrame(place);
 }
 const original=renderEditor;
 renderEditor=function(){original();const strip=document.querySelector('#content .add-strip');if(!strip)return;
 const picker=document.createElement('details');picker.className='element-picker';picker.open=!small();
 const title=document.createElement('summary');title.textContent='＋ Dodaj element';strip.before(picker);picker.append(title,strip);
 const notice=document.getElementById('editNotice');if(small()&&notice)notice.textContent='';
 if(small()){document.querySelectorAll('.room-measures label').forEach((label,i)=>label.textContent=['Obrys X · mm','Obrys Y · mm','Wysokość · mm'][i]);}
 const heading=document.querySelector('.editor-heading'),measures=document.querySelector('.room-measures');
 if(heading&&measures){const name=heading.firstElementChild,button=heading.querySelector('button');heading.classList.add('room-summary');name.classList.add('room-name-group');name.querySelector('.eyebrow')?.remove();const input=name.querySelector('input');input.id='roomSummaryName';const label=document.createElement('label');label.htmlFor=input.id;label.textContent='Pomieszczenie';name.prepend(label);button.classList.add('room-outline');heading.insertBefore(measures,button);measures.querySelectorAll('label').forEach((label,i)=>{label.textContent=['Obrys X · mm','Obrys Y · mm','Wysokość · mm'][i];const field=label.parentElement.querySelector('input');if(field)label.htmlFor=field.id;});}
 floatingPreview();
 strip.addEventListener('click',event=>{if(small()&&event.target.closest('button:not(:disabled)'))picker.open=false;},true);
 };
 let wasSmall=small();window.addEventListener('resize',()=>{const now=small();if(now!==wasSmall){const picker=document.querySelector('.element-picker');if(picker)picker.open=!now;wasSmall=now;}positionPreview();});
 if(typeof projectReady!=='undefined'&&projectReady&&view==='wall')render();
})();
