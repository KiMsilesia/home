/* Shared wall positions are measured between interior faces, in mm. */
(function(root){
 const G=typeof module!=='undefined'?require('./geometry.js'):Geom;
 function snap(moving,rooms,gap,tolerance){
  let best=null;
  for(const a of rooms){if(a.id===moving.id)continue;
   for(let wa=0;wa<a.points.length;wa++)for(let wb=0;wb<moving.points.length;wb++){
    const e=G.edge(a,wa),f=G.edge(moving,wb),ux=e.dx/e.len,uy=e.dy/e.len;
    if(Math.abs(ux*f.dy/f.len-uy*f.dx/f.len)>.0001||ux*f.dx/f.len+uy*f.dy/f.len>-.9999)continue;
    let offset=(moving.x+f.b.x-a.x-e.a.x)*ux+(moving.y+f.b.y-a.y-e.a.y)*uy;
    for(const end of [0,e.len-f.len])if(Math.abs(offset-end)<tolerance){offset=end;break}
    if(Math.min(e.len,offset+f.len)-Math.max(0,offset)<20)continue;
    try{const pos=G.align(a,wa,moving,wb,gap,offset),distance=Math.hypot(pos.x-moving.x,pos.y-moving.y);
     if(Math.abs(pos.x)<=200000&&Math.abs(pos.y)<=200000&&distance<=tolerance&&(!best||distance<best.distance))best={...pos,distance,a:a.id,b:moving.id,wa,wb,t:gap,offset};
    }catch{}
   }
  }return best;
 }
 function ownHoles(r,i){const holes=r.elements.filter(e=>e.wall===i&&['door','window'].includes(e.type)).map(e=>({x:e.x,y:e.y,w:e.w,h:e.h}));const gap=G.gap(r,i);if(gap)holes.push({x:gap[0],y:0,w:gap[1]-gap[0],h:r.h});return holes}
 function wall(r,i,rooms,links,exported,fallback){
  const edge=G.edge(r,i),L=edge.len,ux=edge.dx/L,uy=edge.dy/L,holes=ownHoles(r,i),spans=[];
  for(const link of links){let other,oi;if(link.a===r.id&&link.wa===i){other=rooms.find(q=>q.id===link.b);oi=link.wb}else if(link.b===r.id&&link.wb===i){other=rooms.find(q=>q.id===link.a);oi=link.wa}else continue;
   if(!other)throw Error('Brakuje pomieszczenia w połączeniu.');
   const a=rooms.find(q=>q.id===link.a),b=rooms.find(q=>q.id===link.b),position=G.align(a,link.wa,b,link.wb,link.t,link.offset);
   if(Math.hypot(b.x-position.x,b.y-position.y)>.1)throw Error('Nieaktualne połączenie ścian. Połącz pokoje ponownie.');
   const peer=G.edge(other,oi),project=p=>(other.x+p.x-r.x-edge.a.x)*ux+(other.y+p.y-r.y-edge.a.y)*uy;
   const start=project(peer.b),lo=Math.max(0,start),hi=Math.min(L,start+peer.len);if(hi<=lo)continue;
   if(spans.some(s=>Math.min(s.hi,hi)-Math.max(s.lo,lo)>.01))throw Error('Nakładające się połączenia jednej ściany. Popraw plan lokalu.');
   spans.push({lo,hi,depth:exported.has(other.id)?link.t/2:link.t});
   for(const h of ownHoles(other,oi)){const left=Math.max(lo,start+peer.len-h.x-h.w),right=Math.min(hi,start+peer.len-h.x);if(right>left)holes.push({x:left,w:right-left,y:h.y,h:h.h})}
  }
  const depth=x=>spans.find(s=>x>=s.lo-1e-6&&x<=s.hi+1e-6)?.depth??r.edges[i]?.thickness??fallback;
  return {holes,cuts:spans.flatMap(s=>[s.lo,s.hi]),depth};
 }
 const api={snap,wall,ownHoles};if(typeof module!=='undefined')module.exports=api;else root.WallLayout=api;
})(typeof globalThis!=='undefined'?globalThis:this);
