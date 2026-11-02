(()=>{
 let project=null;const states=new Map();
 const original=renderPlan;
 renderPlan=function(){original();const svg=document.getElementById('planSvg');if(!svg)return;if(project!==data){states.clear();project=data;}
 const base=svg.getAttribute('viewBox').split(/\s+/).map(Number),key=room().elevation||0;let c=states.get(key);if(!c){c={x:base[0]+base[2]/2,y:base[1]+base[3]/2,w:base[2],h:base[3],zoom:1};states.set(key,c);}
 const bar=document.createElement('div');bar.className='plan-camera';bar.innerHTML='<button aria-label="Oddal plan">−</button><span class="plan-zoom-percent"></span><button aria-label="Przybliż plan">+</button><button class="plan-fit">Dopasuj</button><label><input type="checkbox" id="planPanMode">Przesuwaj widok</label>';
 document.querySelector('.card.plan .drawing').before(bar);
 function apply(){svg.setAttribute('viewBox',`${c.x-c.w/c.zoom/2} ${c.y-c.h/c.zoom/2} ${c.w/c.zoom} ${c.h/c.zoom}`);bar.querySelector('span').textContent=Math.round(c.zoom*100)+'%';svg.updateCadMarkers?.();}
 function zoom(f,a={x:c.x,y:c.y}){const next=Math.max(1,Math.min(20,c.zoom*f)),ratio=c.zoom/next;c.x=a.x+(c.x-a.x)*ratio;c.y=a.y+(c.y-a.y)*ratio;c.zoom=next;apply();}
 const buttons=bar.querySelectorAll('button');buttons[0].onclick=()=>zoom(1/1.5);buttons[1].onclick=()=>zoom(1.5);buttons[2].onclick=()=>{const visible=data.rooms.filter(r=>(r.elevation||0)===key),b=Geom.bounds(visible.flatMap(r=>r.points.map(p=>({x:r.x+p.x,y:r.y+p.y}))));Object.assign(c,{x:b.x+b.w/2,y:b.y+b.d/2,w:b.w+1200,h:b.d+1200,zoom:1});apply();};
 const down=svg.onpointerdown,move=svg.onpointermove,up=svg.onpointerup,cancel=svg.onpointercancel;
 const pointers=new Map();let pan=null,pinch=null,roomDrag=false;
 const at=(x,y,m=svg.getScreenCTM().inverse())=>new DOMPoint(x,y).matrixTransform(m);
 const pair=()=>{const p=[...pointers.values()];return {x:(p[0].x+p[1].x)/2,y:(p[0].y+p[1].y)/2,d:Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y)}};
 svg.onpointerdown=e=>{if(e.button!==0&&e.button!==1)return;e.preventDefault();pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});svg.setPointerCapture(e.pointerId);
 if(pointers.size===2){svg.cancelRoomDrag?.();roomDrag=false;pan=null;pinch=pair();return;}if(pointers.size>2)return;
 if(!e.target.closest('[data-id]')||e.shiftKey||e.button===1||document.getElementById('planPanMode').checked){const matrix=svg.getScreenCTM().inverse();pan={id:e.pointerId,matrix,p:at(e.clientX,e.clientY,matrix),x:c.x,y:c.y};}else{roomDrag=true;down(e);}
 };
 svg.onpointermove=e=>{if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===2){const next=pair();if(pinch&&pinch.d>0){const before=at(pinch.x,pinch.y),after=at(next.x,next.y);c.x+=before.x-after.x;c.y+=before.y-after.y;zoom(next.d/pinch.d,before);}pinch=next;return;}
 if(pan){const p=at(e.clientX,e.clientY,pan.matrix);c.x=pan.x+pan.p.x-p.x;c.y=pan.y+pan.p.y-p.y;apply();}else if(roomDrag){move(e);svg.updateCadMarkers?.();}
 };
 const end=e=>{if(!pointers.has(e.pointerId))return;pointers.delete(e.pointerId);if(roomDrag){roomDrag=false;(e.type==='pointerup'?up:cancel)(e);}pan=null;pinch=null;};
 svg.onpointerup=end;svg.onpointercancel=end;svg.onlostpointercapture=end;
 svg.addEventListener('wheel',e=>{e.preventDefault();if(pointers.size)return;const d=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?svg.clientHeight:1);zoom(Math.exp(Math.max(-1,Math.min(1,-d*.0015))),at(e.clientX,e.clientY));},{passive:false});
 svg.tabIndex=0;svg.setAttribute('aria-label','Plan lokalu — kółko i dwa palce przybliżają; tło przesuwa widok');svg.onkeydown=e=>{if(e.target!==svg)return;if(['+','=','-','Home'].includes(e.key))e.preventDefault();if(e.key==='+'||e.key==='=')zoom(1.5);if(e.key==='-')zoom(1/1.5);if(e.key==='Home')buttons[2].click();};apply();
 };
 if(typeof projectReady!=='undefined'&&projectReady&&view==='plan')render();
})();
