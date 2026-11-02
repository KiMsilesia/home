/* View navigation and camera gestures; measurements stay in model coordinates. */
(()=>{
 let project=null;const cameras=new Map();let current=null;
 const center=b=>({x:b[0]+b[2]/2,y:b[1]+b[3]/2});
 function apply(){const svg=document.querySelector('#wallCanvas>svg');if(!svg||!current)return;const c=current,b=c.base,w=b[2]/c.zoom,h=b[3]/c.zoom;
 c.x=Math.max(b[0]+w/2,Math.min(b[0]+b[2]-w/2,c.x));c.y=Math.max(b[1]+h/2,Math.min(b[1]+b[3]-h/2,c.y));
 svg.setAttribute('viewBox',`${c.x-w/2} ${c.y-h/2} ${w} ${h}`);const percent=document.getElementById('wallZoomPercent');if(percent)percent.textContent=Math.round(c.zoom*100)+'%';
 }
 function zoom(factor,anchor){if(!current)return;const c=current,a=anchor||{x:c.x,y:c.y},next=Math.max(1,Math.min(12,c.zoom*factor)),ratio=c.zoom/next;c.x=a.x+(c.x-a.x)*ratio;c.y=a.y+(c.y-a.y)*ratio;c.zoom=next;apply();}
 function fit(){if(!current)return;Object.assign(current,center(current.base),{zoom:1});apply();}
 function step(direction){const views=[...room().points.keys(),-1,-2],index=views.indexOf(wall);chooseSurface(views[(index+direction+views.length)%views.length]);}
 function updateCells(e){for(const k of ['x','y']){const input=document.getElementById(`cell-${e.id}-${k}`);if(input)input.value=e[k];}}
 bindWallDrag=function(){const host=document.getElementById('wallCanvas'),svg=host?.querySelector(':scope>svg');if(!svg)return;
 if(project!==data){cameras.clear();project=data;}const key=roomId+':'+wall,base=svg.getAttribute('viewBox').split(/\s+/).map(Number);current=cameras.get(key);
 if(!current||current.base.join()!==base.join()){current={base,...center(base),zoom:1};cameras.set(key,current);}apply();
 host.tabIndex=0;host.setAttribute('aria-label','Widok pomiarów: kółko lub dwa palce powiększają, przeciągnięcie tła przesuwa');
 const points=new Map();let drag=null,pinch=null;
 const point=(x,y,matrix=svg.getScreenCTM().inverse())=>new DOMPoint(x,y).matrixTransform(matrix);
 const pair=()=>{const p=[...points.values()];return {x:(p[0].x+p[1].x)/2,y:(p[0].y+p[1].y)/2,d:Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y)}};
 function rollback(){if(drag?.element){drag.element.x=drag.x;drag.element.y=drag.y;drag.node.removeAttribute('transform');updateCells(drag.element);update3D();}drag=null;}
 host.onpointerdown=e=>{if(e.button!==0)return;e.preventDefault();points.set(e.pointerId,{x:e.clientX,y:e.clientY});host.setPointerCapture(e.pointerId);
 if(points.size===2){rollback();pinch=pair();return;}if(points.size>2)return;
 const node=e.target.closest('[data-element]'),element=node&&room().elements.find(q=>q.id===node.dataset.element),matrix=svg.getScreenCTM().inverse();
 drag={id:e.pointerId,pt:point(e.clientX,e.clientY,matrix),matrix,cx:current.x,cy:current.y};
 if(element){Object.assign(drag,{element,node,x:element.x,y:element.y});activeElement=element.id;activeField={id:element.id,key:'x'};document.querySelectorAll('[data-row]').forEach(row=>row.classList.toggle('selected',row.dataset.row===element.id));}else host.focus({preventScroll:true});
 };
 host.onpointermove=e=>{if(!points.has(e.pointerId))return;points.set(e.pointerId,{x:e.clientX,y:e.clientY});
 if(points.size===2){const next=pair();if(pinch&&pinch.d>0){const before=point(pinch.x,pinch.y),after=point(next.x,next.y);current.x+=before.x-after.x;current.y+=before.y-after.y;zoom(next.d/pinch.d,before);}pinch=next;return;}
 if(!drag||drag.id!==e.pointerId)return;const p=point(e.clientX,e.clientY,drag.matrix);
 if(!drag.element){current.x=drag.cx+drag.pt.x-p.x;current.y=drag.cy+drag.pt.y-p.y;apply();return;}
 const element=drag.element,s=+svg.dataset.scale,next={...element,x:Math.round(drag.x+(p.x-drag.pt.x)/s),y:Math.round(drag.y+(p.y-drag.pt.y)/s*(wall<0?1:-1))};
 if(fits(room(),next)){element.x=next.x;element.y=next.y;drag.node.setAttribute('transform',`translate(${(element.x-drag.x)*s},${(element.y-drag.y)*s*(wall<0?1:-1)})`);updateCells(element);update3D();}
 };
 const end=e=>{if(!points.has(e.pointerId))return;points.delete(e.pointerId);if(drag?.id===e.pointerId){if(e.type!=='pointerup')rollback();else{if(drag.element&&(drag.element.x!==drag.x||drag.element.y!==drag.y))save();drag=null;}refreshGeometry();}else{drag=null;pinch=null;}};
 host.onpointerup=end;host.onpointercancel=end;host.onlostpointercapture=end;
 host.onwheel=e=>{e.preventDefault();if(points.size)return;const delta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?host.clientHeight:1);zoom(Math.exp(Math.max(-1,Math.min(1,-delta*.0015))),point(e.clientX,e.clientY));};
 host.onkeydown=e=>{if(e.target!==host)return;if(['+','=','-','Home','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))e.preventDefault();if(e.key==='+'||e.key==='=')zoom(1.5);if(e.key==='-')zoom(1/1.5);if(e.key==='Home')fit();const distance=30/current.zoom;if(e.key==='ArrowLeft')current.x-=distance;if(e.key==='ArrowRight')current.x+=distance;if(e.key==='ArrowUp')current.y-=distance;if(e.key==='ArrowDown')current.y+=distance;apply();};
 };
 const previous=renderEditor;
 renderEditor=function(){previous();const bar=document.querySelector('.wall-card>.card-top');if(!bar)return;bar.classList.add('wall-view-controls');bar.querySelector('.muted')?.remove();
 const button=(label,text,action)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',label);b.title=label;b.textContent=text;b.onclick=action;return b};
 const heading=bar.querySelector('h3');bar.prepend(button('Poprzedni widok','‹',()=>step(-1)));heading.after(button('Następny widok','›',()=>step(1)));
 const zoomBar=document.createElement('div');zoomBar.className='wall-zoom-controls';const percent=document.createElement('span');percent.id='wallZoomPercent';percent.setAttribute('aria-live','polite');zoomBar.append(button('Oddal widok','−',()=>zoom(1/1.5)),percent,button('Przybliż widok','+',()=>zoom(1.5)),button('Dopasuj cały widok','⤢',fit));bar.append(zoomBar);apply();
 };
 if(typeof projectReady!=='undefined'&&projectReady&&view==='wall')render();
})();
