/* Greedy measured label layout; doors, windows and other area objects are untouched. */
(function(root){
 const intersects=(a,b)=>a.x<b.x+b.w+3&&a.x+a.w+3>b.x&&a.y<b.y+b.h+3&&a.y+a.h+3>b.y;
 function place(points,blocked,bounds){const used=[...blocked],out=[];
 for(const p of points){let found=null;const candidates=[];const add=(x,y,vertical=false)=>candidates.push({x,y,w:vertical?p.h:p.w,h:vertical?p.w:p.h,vertical});
 add(p.x,p.y+22);add(p.x-p.h/2,p.y+23,true);add(p.x-p.h/2,p.y-p.w-23,true);add(p.x-p.w,p.y+22);
 for(let d=18;d<220;d+=18){for(const sign of [-1,1]){add(p.x+sign*d,p.y+23,true);add(p.x+sign*d,p.y-p.w-23,true);add(p.x-p.w/2,p.y+sign*d);}}
 for(const c of candidates){if(c.x<bounds.x||c.y<bounds.y||c.x+c.w>bounds.x+bounds.w||c.y+c.h>bounds.y+bounds.h||used.some(b=>intersects(c,b)))continue;found=c;used.push(c);break;}out.push(found);
 }return out;}
 if(typeof module!=='undefined'){module.exports={place,intersects};return;}
 function layout(){const svg=document.querySelector('#wallCanvas>svg');if(!svg||wall<0||typeof svg.getBBox!=='function')return;
 svg.querySelectorAll('.point-leader').forEach(n=>n.remove());const items=[],blocked=[];
 for(const t of svg.querySelectorAll(':scope>text')){if(getComputedStyle(t).display==='none')continue;const b=t.getBoundingClientRect(),m=svg.getScreenCTM().inverse(),a=new DOMPoint(b.left,b.top).matrixTransform(m),z=new DOMPoint(b.right,b.bottom).matrixTransform(m);blocked.push({x:a.x,y:a.y,w:z.x-a.x,h:z.y-a.y});}
 for(const g of svg.querySelectorAll('[data-element]')){const e=room().elements.find(e=>e.id===g.dataset.element);if(!e)continue;const m=g.transform.baseVal.consolidate()?.matrix,dx=m?.e||0,dy=m?.f||0;
 if(isOpening(e)){for(const t of g.querySelectorAll(':scope>text')){const b=t.getBBox();blocked.push({x:b.x+dx,y:b.y+dy,w:b.width,h:b.height});}continue;}
 const text=g.querySelector(':scope>text:last-child'),circle=g.querySelector(':scope>circle');if(!text||!circle)continue;
 const x=+circle.getAttribute('cx')+dx,y=+circle.getAttribute('cy')+dy;blocked.push({x:x-18,y:y-18,w:36,h:36});text.removeAttribute('transform');text.removeAttribute('visibility');text.setAttribute('x',0);text.setAttribute('y',0);const b=text.getBBox();items.push({g,text,x,y,dx,dy,b,w:b.width,h:b.height});
 }
 const info=drawingInfo(room(),wall),bounds={x:info.ox-45,y:15,w:info.W*info.s+90,h:info.H*info.s+90};
 const positions=place(items,blocked,bounds),overflow=[];
 items.forEach((p,i)=>{const c=positions[i];if(!c){p.text.setAttribute('visibility','hidden');overflow.push(p.text.textContent);return;}
 p.text.setAttribute('transform',c.vertical?`translate(${c.x-p.dx-p.b.y} ${c.y+c.h-p.dy+p.b.x}) rotate(-90)`:`translate(${c.x-p.dx-p.b.x} ${c.y-p.dy-p.b.y})`);
 const x=Math.max(c.x,Math.min(c.x+c.w,p.x)),y=Math.max(c.y,Math.min(c.y+c.h,p.y));
 const line=document.createElementNS('http://www.w3.org/2000/svg','line');line.classList.add('point-leader');for(const [k,v]of Object.entries({x1:p.x-p.dx,y1:p.y-p.dy,x2:x-p.dx,y2:y-p.dy,stroke:'#7b919f','stroke-width':.7,'pointer-events':'none'}))line.setAttribute(k,v);p.g.insertBefore(line,p.text);
 });
 let list=document.getElementById('pointLabelOverflow');if(!overflow.length){list?.remove();return;}if(!list){list=document.createElement('details');list.id='pointLabelOverflow';document.getElementById('wallCanvas').after(list);}const open=list.open;list.replaceChildren();const summary=document.createElement('summary');summary.textContent=`Opisy poza rysunkiem (${overflow.length})`;list.append(summary);for(const label of overflow){const row=document.createElement('div');row.textContent=label;list.append(row);}list.open=open;
 }
 const previous=bindWallDrag;bindWallDrag=function(){previous();layout();const host=document.getElementById('wallCanvas');if(!host)return;const move=host.onpointermove;host.onpointermove=function(e){move?.call(this,e);layout();};};
 if(typeof projectReady!=='undefined'&&projectReady&&view==='wall')render();
})(globalThis);
