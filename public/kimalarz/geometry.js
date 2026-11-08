// Projective mapping shared by the renderer and numerical verification.
(function(root){
function homography(from,to){
 const a=[];
 for(let i=0;i<4;i++){const{x,y}=from[i],u=to[i].x,v=to[i].y;a.push([x,y,1,0,0,0,-u*x,-u*y,u],[0,0,0,x,y,1,-v*x,-v*y,v]);}
 for(let col=0;col<8;col++){let pivot=col;for(let r=col+1;r<8;r++)if(Math.abs(a[r][col])>Math.abs(a[pivot][col]))pivot=r;
 if(Math.abs(a[pivot][col])<1e-10)return null;[a[col],a[pivot]]=[a[pivot],a[col]];const d=a[col][col];for(let j=col;j<9;j++)a[col][j]/=d;
 for(let r=0;r<8;r++)if(r!==col){const k=a[r][col];for(let j=col;j<9;j++)a[r][j]-=k*a[col][j];}}
 return [...a.map(row=>row[8]),1];
}
function project(m,p){const z=m[6]*p.x+m[7]*p.y+1;return{x:(m[0]*p.x+m[1]*p.y+m[2])/z,y:(m[3]*p.x+m[4]*p.y+m[5])/z};}
function convex(q){if(q.length!==4)return false;let sign=0;for(let i=0;i<4;i++){const a=q[i],b=q[(i+1)%4],d=q[(i+2)%4],cross=(b.x-a.x)*(d.y-b.y)-(b.y-a.y)*(d.x-b.x);if(Math.abs(cross)<20)return false;if(sign&&Math.sign(cross)!==sign)return false;sign=Math.sign(cross);}return true;}
function bounds(p){const xs=p.map(p=>p.x),ys=p.map(p=>p.y);return{x:Math.min(...xs),y:Math.min(...ys),w:Math.max(...xs)-Math.min(...xs),h:Math.max(...ys)-Math.min(...ys)}}
function flatQuad(p){const b=bounds(p);return[{x:b.x,y:b.y},{x:b.x+b.w,y:b.y},{x:b.x+b.w,y:b.y+b.h},{x:b.x,y:b.y+b.h}];}
function fitScale(w,h,availableW,availableH,zoom=1){return Math.min(Math.max(1,availableW)/w,Math.max(1,availableH)/h)*zoom;}
const api={homography,project,convex,bounds,flatQuad,fitScale};if(typeof module!=='undefined')module.exports=api;else root.Geometry=api;
})(typeof window==='undefined'?{}:window);
