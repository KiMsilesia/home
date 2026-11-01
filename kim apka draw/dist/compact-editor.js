/* Keep tools collapsed on phones, alongside the live measurement workspace. */
(()=>{
 const small=()=>window.innerWidth<=600;
 let floatPosition=null,minimized=false,positionPreview=()=>{};
 function floatingPreview(){
 const card=document.querySelector('.editor-stage .model-card');if(!card)return;
 document.querySelector('#content').append(card);card.classList.add('bottom-preview');
 const expand=card.querySelector('.tiny');if(expand)expand.setAttribute('aria-label','Powiększ podgląd 3D');
 const bar=card.querySelector('.card-top'),fold=document.createElement('button');fold.type='button';bar.append(fold);
 function state(){card.classList.toggle('preview-minimized',minimized);fold.textContent=minimized?'Rozwiń':'Zwiń';fold.setAttribute('aria-expanded',String(!minimized));}
 fold.onclick=()=>{minimized=!minimized;state()};state();
 }
 const original=renderEditor;
 renderEditor=function(){original();const strip=document.querySelector('#content .add-strip');if(!strip)return;
 const picker=document.createElement('details');picker.className='element-picker';picker.open=!small();
 const title=document.createElement('summary');title.textContent='＋ Dodaj element';strip.before(picker);picker.append(title,strip);
 const notice=document.getElementById('editNotice');if(notice)notice.textContent='';
 if(small()){document.querySelectorAll('.room-measures label').forEach((label,i)=>label.textContent=['Obrys X · mm','Obrys Y · mm','Wysokość · mm'][i]);}
 const heading=document.querySelector('.editor-heading'),measures=document.querySelector('.room-measures');
 if(heading&&measures){const name=heading.firstElementChild,button=heading.querySelector('button');heading.classList.add('room-summary');name.classList.add('room-name-group');name.querySelector('.eyebrow')?.remove();const input=name.querySelector('input');input.id='roomSummaryName';const label=document.createElement('label');label.htmlFor=input.id;label.textContent='Pomieszczenie';name.prepend(label);button.classList.add('room-outline');heading.insertBefore(measures,button);measures.querySelectorAll('label').forEach((label,i)=>{label.textContent=['Obrys X · mm','Obrys Y · mm','Wysokość · mm'][i];const field=label.parentElement.querySelector('input');if(field)label.htmlFor=field.id;});}
 floatingPreview();
 strip.addEventListener('click',event=>{if(small()&&event.target.closest('button:not(:disabled)'))picker.open=false;},true);
 };
 let wasSmall=small();window.addEventListener('resize',()=>{const now=small();if(now!==wasSmall){const picker=document.querySelector('.element-picker');if(picker)picker.open=!now;wasSmall=now;}positionPreview();});
 if(typeof projectReady!=='undefined'&&projectReady&&view==='wall')render();
})();
