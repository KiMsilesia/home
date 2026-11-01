/* Orthogonal editing: move connected coordinate chains, never distort an L corner. */
const ShapeEdit=(()=>{
const clone=p=>p.map(q=>({...q}));
function chain(p,i,key){const seen=new Set([i]),todo=[i];while(todo.length){const a=todo.pop();for(const b of [(a+p.length-1)%p.length,(a+1)%p.length])if(!seen.has(b)&&Math.abs(p[a][key]-p[b][key])<.001){seen.add(b);todo.push(b)}}return seen}
function move(p,i,target,lock,tolerance=0){const out=clone(p);for(const key of ['x','y']){let value=target[key];if(lock&&tolerance){const neighbors=[p[(i+p.length-1)%p.length],p[(i+1)%p.length]];const near=neighbors.filter(q=>Math.abs(q[key]-value)<=tolerance).sort((a,b)=>Math.abs(a[key]-value)-Math.abs(b[key]-value));if(near.length)value=near[0][key]}const ids=lock?chain(p,i,key):[i];for(const j of ids)out[j][key]=value}return out}
function resize(p,i,length,lock){if(!Number.isFinite(length)||length<20||length>100000)throw Error('Długość musi wynosić od 20 do 100 000 mm.');const j=(i+1)%p.length,a=p[i],b=p[j],dx=b.x-a.x,dy=b.y-a.y,L=Math.hypot(dx,dy);if(!L)throw Error('Odcinek ma zerową długość.');const out=move(p,j,{x:a.x+dx/L*length,y:a.y+dy/L*length},lock);if(Math.abs(Math.hypot(out[j].x-out[i].x,out[j].y-out[i].y)-length)>.01)throw Error('Nie można ustawić tej długości przy obecnych więzach. Wyłącz przyciąganie.');return out}
return {move,resize,chain};})();
if(typeof module!=='undefined')module.exports=ShapeEdit;
