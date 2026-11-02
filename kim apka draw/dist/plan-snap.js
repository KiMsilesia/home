(()=>{
 let enabled=true,gap=150;
 const previous=renderPlan;
 renderPlan=function(){previous();const bar=document.createElement('div');bar.className='plan-snap';
 bar.innerHTML=`<label><input id="snapEnabled" type="checkbox" ${enabled?'checked':''}>Przyciągaj ściany</label><label>Odstęp <input id="snapGap" aria-label="Odstęp między ścianami w mm" type="number" min="0" max="2000" value="${gap}"> mm</label><details><summary>Grubości ścian</summary><div><label>Ściana <select id="wallThicknessEdge" aria-label="Ściana do zmiany grubości">${room().points.map((_,i)=>`<option value="${i}">${String.fromCharCode(65+i)}</option>`).join('')}</select></label><label>mm <input id="wallThickness" aria-label="Zmierzona grubość ściany w mm" type="number" min="1" max="1000" value="${room().edges[0]?.thickness||100}"></label><button id="setWallThickness">Zapisz</button><button id="setAllThickness">Wszystkie w pokoju</button></div></details><span id="snapReadout" role="status"></span>`;
 document.querySelector('#content .card.plan').before(bar);
 const read=()=>{const n=Number($('#snapGap').value);if($('#snapGap').value===''||!Number.isFinite(n)||n<0||n>2000){toast('Odstęp: 0–2000 mm.');$('#snapGap').value=gap;return false}gap=n;return true};
 $('#snapEnabled').onchange=e=>enabled=e.target.checked;$('#snapGap').onchange=read;
 $('#wallThicknessEdge').onchange=e=>$('#wallThickness').value=room().edges[+e.target.value]?.thickness||100;
 function set(all){const n=Number($('#wallThickness').value);if(!Number.isFinite(n)||n<1||n>1000)return toast('Grubość: 1–1000 mm.');room().edges.forEach((e,i)=>{if(all||i===+$('#wallThicknessEdge').value)e.thickness=n});save();toast('Zapisano grubość. W połączeniach eksport użyje odstępu między pokojami.');}
 $('#setWallThickness').onclick=()=>set(false);$('#setAllThickness').onclick=()=>set(true);
 const svg=$('#planSvg'),pt=e=>new DOMPoint(e.clientX,e.clientY).matrixTransform(svg.getScreenCTM().inverse());let drag=null;
 svg.cancelRoomDrag=()=>{if(drag){drag.r.x=drag.x;drag.r.y=drag.y;drag.g.setAttribute('transform',`translate(${drag.x},${drag.y})`);drag=null;svg.querySelector('#snapGuide')?.remove();$('#snapReadout').textContent='';update3D();}};
 svg.onpointerdown=e=>{if(e.button!==0||!read())return;const g=e.target.closest('[data-id]');if(!g)return;e.preventDefault();const r=data.rooms.find(r=>r.id===g.dataset.id);drag={r,g,p:pt(e),x:r.x,y:r.y,candidate:null,moved:false};svg.setPointerCapture(e.pointerId)};
 svg.onpointermove=e=>{if(!drag)return;const p=pt(e);if(Math.hypot(p.x-drag.p.x,p.y-drag.p.y)<1&&!drag.moved)return;drag.moved=true;drag.r.x=Math.max(-200000,Math.min(200000,Math.round(drag.x+p.x-drag.p.x)));drag.r.y=Math.max(-200000,Math.min(200000,Math.round(drag.y+p.y-drag.p.y)));
 const tolerance=Math.min(400,14/Math.hypot(svg.getScreenCTM().a,svg.getScreenCTM().b));
 const s=enabled&&!e.altKey?WallLayout.snap(drag.r,data.rooms,gap,tolerance):null;drag.candidate=s;if(s){drag.r.x=s.x;drag.r.y=s.y}
 drag.g.setAttribute('transform',`translate(${drag.r.x},${drag.r.y})`);svg.querySelector('#snapGuide')?.remove();
 if(s){const a=data.rooms.find(r=>r.id===s.a),edge=Geom.edge(a,s.wa),guide=document.createElementNS('http://www.w3.org/2000/svg','line');guide.id='snapGuide';for(const [key,value]of Object.entries({x1:a.x+edge.a.x,y1:a.y+edge.a.y,x2:a.x+edge.b.x,y2:a.y+edge.b.y,stroke:'#03a9a4','stroke-width':5,'vector-effect':'non-scaling-stroke','pointer-events':'none'}))guide.setAttribute(key,value);svg.append(guide);$('#snapReadout').textContent=`${a.name} · ${String.fromCharCode(65+s.wa)} ↔ ${String.fromCharCode(65+s.wb)} · ${gap} mm`}
 else $('#snapReadout').textContent='';update3D();};
 const end=e=>{if(!drag)return;const d=drag;drag=null;if(e.type==='pointercancel'||e.type==='lostpointercapture'){d.r.x=d.x;d.r.y=d.y}else if(d.moved){data.links=data.links.filter(l=>l.a!==d.r.id&&l.b!==d.r.id);if(d.candidate){const {a,b,wa,wb,t,offset}=d.candidate;data.links.push({id:uid(),a,b,wa,wb,t,offset})}save()}roomId=d.r.id;render()};
 svg.onpointerup=end;svg.onpointercancel=end;svg.onlostpointercapture=end;
 };
 if(typeof projectReady!=='undefined'&&projectReady&&view==='plan')render();
})();
