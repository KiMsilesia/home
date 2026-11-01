/* Standalone, triangulated Wavefront OBJ, millimetres, Y-up. */
(function(root){
const G=typeof module!=='undefined'?require('./geometry.js'):Geom;
const Layout=typeof module!=='undefined'?require('./wall-layout.js'):WallLayout;
const cross=(a,b,c)=>(b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x);
function triangles(p){const ids=p.map((_,i)=>i),out=[];let guard=p.length*p.length;while(ids.length>3&&guard--){let cut=false;for(let j=0;j<ids.length;j++){const a=ids[(j+ids.length-1)%ids.length],b=ids[j],c=ids[(j+1)%ids.length];if(cross(p[a],p[b],p[c])<=1e-8)continue;if(ids.some(k=>k!==a&&k!==b&&k!==c&&cross(p[a],p[b],p[k])>=-1e-8&&cross(p[b],p[c],p[k])>=-1e-8&&cross(p[c],p[a],p[k])>=-1e-8))continue;out.push([a,b,c]);ids.splice(j,1);cut=true;break}if(!cut){const col=ids.findIndex((b,j)=>Math.abs(cross(p[ids[(j+ids.length-1)%ids.length]],p[b],p[ids[(j+1)%ids.length]]))<1e-8);if(col<0)throw Error('Nie można triangulować obrysu.');ids.splice(col,1)}}if(ids.length===3)out.push(ids);return out}
function build(rooms,{thickness=100,ceiling=false,points=true,references=true,links=[],layoutRooms=rooms}={}){
if(!Number.isFinite(thickness)||thickness<1||thickness>1000)throw Error('Nieprawidłowa grubość.');
const lines=['mtllib KiMapka.mtl','# KiMapka / PRO100 reference model','# Units: millimetres. Y up. X right, Z = -plan Y.','# Walls extruded outside measured interior; point markers 80 mm.','s off'];let count=0,serial=0;
const name=s=>String(s).normalize('NFKD').replace(/[^a-zA-Z0-9_-]/g,'_').slice(0,80);
function object(s){const id=(++serial)+'_'+name(s);lines.push('o '+id,'g '+id,'usemtl '+id)}
function face(p){if(p.length<3)return;const ids=p.map(q=>{if(!q.every(Number.isFinite))throw Error('Nieprawidłowa geometria.');lines.push('v '+[q[0],q[2],-q[1]].map(n=>Math.round(n*10000)/10000).join(' '));return ++count});for(let j=1;j<ids.length-1;j++)lines.push(`f ${ids[0]} ${ids[j]} ${ids[j+1]}`)}
function prism(base,vector){const top=base.map(p=>p.map((x,i)=>x+vector[i]));face([...base].reverse());face(top);for(let i=0;i<base.length;i++){const j=(i+1)%base.length;face([base[i],base[j],top[j],top[i]])}}
for(const r of rooms){const err=G.polygonError(r.points);if(err)throw Error(err);const ts=triangles(r.points),at=(i,z)=>[r.x+r.points[i].x,r.y+r.points[i].y,z];
const walls=r.points.map((_,i)=>Layout.wall(r,i,layoutRooms,links,new Set(rooms.map(q=>q.id)),thickness));
object(r.name+'_podloga');for(const t of ts)prism(t.map(i=>at(i,-20)),[0,0,20]);if(ceiling){object(r.name+'_sufit');for(const t of ts)prism(t.map(i=>at(i,r.h)),[0,0,20])}
for(let i=0;i<r.points.length;i++){
 const e=G.edge(r,i),L=e.len,{holes,cuts,depth}=walls[i],clamp=(x,max)=>Math.max(0,Math.min(max,x));
 const xs=[...new Set([0,L,...cuts,...holes.flatMap(h=>[clamp(h.x,L),clamp(h.x+h.w,L)])])].sort((a,b)=>a-b),zs=[...new Set([0,r.h,...holes.flatMap(h=>[clamp(h.y,r.h),clamp(h.y+h.h,r.h)])])].sort((a,b)=>a-b);
 object(r.name+'_sciana_'+String.fromCharCode(65+i));
 for(let a=1;a<xs.length;a++)for(let b=1;b<zs.length;b++){
  const x=(xs[a-1]+xs[a])/2,z=(zs[b-1]+zs[b])/2,t=depth(x);
  if(t<=0||holes.some(h=>x>h.x&&x<h.x+h.w&&z>h.y&&z<h.y+h.h))continue;
  prism([G.wallPoint(r,i,xs[a-1],zs[b-1]),G.wallPoint(r,i,xs[a],zs[b-1]),G.wallPoint(r,i,xs[a],zs[b]),G.wallPoint(r,i,xs[a-1],zs[b])],[e.dy/L*t,-e.dx/L*t,0]);
 }
}
// Separate corner connectors: intersection of the two exterior offset lines.
// Height intervals preserve doors and open ends instead of filling openings.
for(let i=0;i<r.points.length;i++){
 const j=(i+r.points.length-1)%r.points.length,prev=G.edge(r,j),next=G.edge(r,i),u=[prev.dx/prev.len,prev.dy/prev.len],v=[next.dx/next.len,next.dy/next.len],turn=u[0]*v[1]-u[1]*v[0];
 if(turn<1e-7)continue;
 const d1=walls[j].depth(prev.len-1e-4),d2=walls[i].depth(1e-4);if(d1<=0||d2<=0)continue;
 const center=[r.x+next.a.x,r.y+next.a.y],a=[center[0]+u[1]*d1,center[1]-u[0]*d1],b=[center[0]+v[1]*d2,center[1]-v[0]*d2],k=((b[0]-a[0])*v[1]-(b[1]-a[1])*v[0])/turn,m=[a[0]+k*u[0],a[1]+k*u[1]];
 const polygon=Math.hypot(m[0]-center[0],m[1]-center[1])<=4*Math.max(d1,d2)?[center,a,m,b]:[center,a,b];
 const endHoles=[...walls[j].holes.filter(h=>h.x+h.w>=prev.len-1e-4),...walls[i].holes.filter(h=>h.x<=1e-4)];
 const zs=[...new Set([0,r.h,...endHoles.flatMap(h=>[Math.max(0,Math.min(r.h,h.y)),Math.max(0,Math.min(r.h,h.y+h.h))])])].sort((a,b)=>a-b);
 let started=false;for(let z=1;z<zs.length;z++){const mid=(zs[z]+zs[z-1])/2;if(endHoles.some(h=>mid>h.y&&mid<h.y+h.h))continue;if(!started){object(r.name+'_lacznik_'+String.fromCharCode(65+i));started=true}prism(polygon.map(p=>[...p,zs[z-1]]),[0,0,zs[z]-zs[z-1]])}
}
for(const e of r.elements){if(['door','window'].includes(e.type))continue;const area=['obstacle','vent'].includes(e.type);if(!area&&!points)continue;object(r.name+'_'+e.type+'_'+(e.name||e.type));const plane=e.wall<0;const pos=(x,y,z)=>plane?[r.x+x,r.y+y,z]:G.wallPoint(r,e.wall,x,y);if(area){if(plane){const z=e.wall===-2?r.h-e.z:0;prism([[e.x,e.y],[e.x+e.w,e.y],[e.x+e.w,e.y+e.h],[e.x,e.y+e.h]].map(q=>pos(...q,z)),[0,0,Math.max(e.z,1)])}else{const edge=G.edge(r,e.wall);prism([[e.x,e.y],[e.x+e.w,e.y],[e.x+e.w,e.y+e.h],[e.x,e.y+e.h]].map(q=>pos(...q)),[-edge.dy/edge.len*100,edge.dx/edge.len*100,0])}}else{const z=e.wall===-2?r.h-e.z:e.z,c=pos(e.x,e.y,z);// Cross arms identify the measured centre; each point is a separate material.
for(let axis=0;axis<3;axis++){const lo=c.map(v=>v-2),hi=c.map(v=>v+2);lo[axis]=c[axis]-40;hi[axis]=c[axis]+40;prism([[lo[0],lo[1],lo[2]],[hi[0],lo[1],lo[2]],[hi[0],hi[1],lo[2]],[lo[0],hi[1],lo[2]]],[0,0,hi[2]-lo[2]])}
if(references){object(r.name+'_REF_'+(e.name||e.type));const a=c,b=[c[0]+5,c[1],c[2]],d=[c[0],c[1]-5,c[2]],f=[c[0],c[1],c[2]+5];face([a,d,b]);face([a,b,f]);face([a,f,d]);face([b,d,f])}}}
}return lines.join('\n')+'\n'}
const api={build,triangles};if(typeof module!=='undefined')module.exports=api;else root.Pro100OBJ=api;
})(typeof globalThis!=='undefined'?globalThis:this);
