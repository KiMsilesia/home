const {test}=require('node:test'),assert=require('node:assert/strict'),G=require('../dist/geometry.js'),R=require('../dist/room-rotation.js');
test('quarter turns preserve concave geometry, wall measurements, floor/ceiling installations and centre',()=>{
 for(const kind of ['rect','L','U','skos']){
 const points=G.template(kind,4200,3400),room={id:'r',name:'Room',x:500,y:800,w:4200,d:3400,h:2700,points,edges:points.map(()=>({kind:'wall',start:0,width:0})),elements:[{id:'w',type:'socket',wall:0,x:500,y:1100,w:80,h:80,z:0},{id:'f',type:'obstacle',wall:-1,x:1000,y:200,w:300,h:500,z:100},{id:'c',type:'water',wall:-2,x:1200,y:300,w:80,h:80,z:50}]};
 const turned=R.rotate(room,1);assert.equal(G.polygonError(turned.points),'');assert.equal(G.area(turned.points),G.area(room.points));assert.equal(turned.x,room.x);assert.equal(turned.y,room.y);assert.equal(turned.h,2700);assert.equal(turned.w,3400);assert.equal(turned.d,4200);assert.deepEqual(turned.elements[0],room.elements[0]);assert.equal(turned.elements[1].w,500);assert.equal(turned.elements[1].h,300);for(const e of turned.elements)assert.equal(G.elementFits(turned,e),true);
 const old=G.wallPoint(room,0,500,1100),now=G.wallPoint(turned,0,500,1100),cx=2600,cy=2500;assert.deepEqual(now,[cx-(old[1]-cy),cy+(old[0]-cx),1100]);
 let restored=turned;for(let i=0;i<3;i++)restored=R.rotate(restored,1);assert.deepEqual(restored,room);assert.deepEqual(R.rotate(turned,-1),room);
 }
});
