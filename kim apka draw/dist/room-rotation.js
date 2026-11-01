(function(root){
 const G=typeof module!=='undefined'?require('./geometry.js'):Geom;
 function rotate(room,direction){
  if(direction!==1&&direction!==-1)throw Error('Obrót wymaga kierunku −1 lub 1.');
  const next=JSON.parse(JSON.stringify(room)),b=G.bounds(room.points),cx=b.x+b.w/2,cy=b.y+b.d/2;
  const point=p=>({x:Math.round((cx-direction*(p.y-cy))*1e6)/1e6,y:Math.round((cy+direction*(p.x-cx))*1e6)/1e6});
  next.points=room.points.map(point);const error=G.polygonError(next.points);if(error)throw Error(error);
  const bounds=G.bounds(next.points);next.w=bounds.w;next.d=bounds.d;
  next.elements=room.elements.map(e=>{if(e.wall>=0)return {...e};
   if(['door','window','vent','obstacle','zone'].includes(e.type)){const corners=[{x:e.x,y:e.y},{x:e.x+e.w,y:e.y},{x:e.x+e.w,y:e.y+e.h},{x:e.x,y:e.y+e.h}].map(point),rect=G.bounds(corners);return {...e,x:rect.x,y:rect.y,w:rect.w,h:rect.d};}
   return {...e,...point(e)};
  });
  if(next.elements.some(e=>Math.abs(e.x)>100000||Math.abs(e.y)>100000))throw Error('Obrót przekracza zakres współrzędnych.');
  return next;
 }
 const api={rotate};if(typeof module!=='undefined')module.exports=api;else root.RoomRotation=api;
})(typeof globalThis!=='undefined'?globalThis:this);
