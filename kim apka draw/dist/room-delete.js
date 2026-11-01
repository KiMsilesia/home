/* Undo is scoped to the currently opened project object, never another account. */
const RoomRemoval=(()=>{
 let history=[];
 const panel=document.querySelector('body > aside');
 const remove=document.createElement('button');remove.className='add-room room-remove';remove.textContent='− Usuń bieżący pokój';remove.onclick=ask;
 const undo=document.createElement('button');undo.className='add-room';undo.textContent='↶ Cofnij usunięcie pokoju';undo.hidden=true;undo.onclick=restore;
 panel.querySelector('.add-room').after(remove,undo);
 function update(){history=history.filter(h=>h.project===data);undo.hidden=!history.length;remove.disabled=!projectReady;remove.title=projectReady?'Usuń: '+room().name:'';}
 function ask(){if(!projectReady)return;if(data.rooms.length<=1){toast('Projekt musi mieć co najmniej jedno pomieszczenie. Dodaj nowe, aby usunąć obecne.');return;}
 const project=data,id=room().id,name=room().name;
 modal(`<h2>Usunąć „${esc(name)}”?</h2><p>Usuniesz ten pokój wraz z jego pomiarami, zdjęciami i połączeniami z innymi pokojami.</p><p class="muted">Możesz cofnąć usunięcie w menu, dopóki nie zamkniesz lub nie zmienisz projektu.</p><div class="dialog-actions"><button id="cancelRoomRemoval">Anuluj</button><button class="danger" id="confirmRoomRemoval">Usuń pomieszczenie</button></div>`);
 document.getElementById('cancelRoomRemoval').onclick=closeDialog;
 document.getElementById('confirmRoomRemoval').onclick=()=>{if(data!==project)return;erase(id);closeDialog();};
 }
 function geometry(r){return JSON.stringify([r.x,r.y,r.points]);}
 function erase(id){if(!projectReady||data.rooms.length<=1)return false;const index=data.rooms.findIndex(r=>r.id===id);if(index<0)return false;
 history.push({project:data,index,room:copy(data.rooms[index]),links:copy(data.links.filter(l=>l.a===id||l.b===id)),geometry:new Map(data.rooms.map(r=>[r.id,geometry(r)]))});
 data.rooms.splice(index,1);data.links=data.links.filter(l=>l.a!==id&&l.b!==id);roomId=data.rooms[Math.min(index,data.rooms.length-1)].id;wall=0;view='wall';activeElement=null;activeField=null;shapeDraft=null;deletedElement=null;save();render();toast('Usunięto pokój. W menu możesz cofnąć usunięcie.');return true;
 }
 function restore(){update();const h=history.pop();if(!h)return false;if(data.rooms.some(r=>r.id===h.room.id))return false;data.rooms.splice(Math.min(h.index,data.rooms.length),0,h.room);
 let skipped=0;for(const l of h.links){const a=data.rooms.find(r=>r.id===l.a),b=data.rooms.find(r=>r.id===l.b);if(a&&b&&geometry(a)===h.geometry.get(a.id)&&geometry(b)===h.geometry.get(b.id)&&!data.links.some(x=>x.id===l.id))data.links.push(l);else skipped++;}
 roomId=h.room.id;wall=0;view='wall';activeElement=null;activeField=null;shapeDraft=null;save();render();toast(skipped?'Przywrócono pokój. Zmienione połączenia wymagają ponownego połączenia ścian.':'Przywrócono pokój z pomiarami i połączeniami.');return true;
 }
 const previousRender=render;render=function(){previousRender();update()};update();return {ask,erase,restore};
})();
