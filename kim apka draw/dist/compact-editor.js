/* Keep tools collapsed on phones, alongside the live measurement workspace. */
(()=>{
 const small=()=>window.innerWidth<=600;
 const original=renderEditor;
 renderEditor=function(){original();const strip=document.querySelector('#content .add-strip');if(!strip)return;
 const picker=document.createElement('details');picker.className='element-picker';picker.open=!small();
 const title=document.createElement('summary');title.textContent='＋ Dodaj element · gniazda, otwory, instalacje';strip.before(picker);picker.append(title,strip);
 strip.addEventListener('click',event=>{if(small()&&event.target.closest('button:not(:disabled)'))picker.open=false;},true);
 };
 let wasSmall=small();window.addEventListener('resize',()=>{const now=small();if(now!==wasSmall){const picker=document.querySelector('.element-picker');if(picker)picker.open=!now;wasSmall=now;}});
 if(typeof projectReady!=='undefined'&&projectReady&&view==='wall')render();
})();
