const assert=require('node:assert/strict');
const {homography,project,convex,flatQuad,fitScale}=require('../dist/geometry.js');
const unit=[{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:0,y:1}];
const quad=[{x:330,y:120},{x:820,y:210},{x:1140,y:740},{x:80,y:770}];
const forward=homography(unit,quad),inverse=homography(quad,unit);
for(let i=0;i<4;i++){const p=project(forward,unit[i]);assert.ok(Math.hypot(p.x-quad[i].x,p.y-quad[i].y)<1e-7)}
for(const p of [{x:.1,y:.2},{x:.7,y:.6},{x:.5,y:.5}]){const r=project(inverse,project(forward,p));assert.ok(Math.hypot(r.x-p.x,r.y-p.y)<1e-8)}
assert.equal(convex(quad),true);assert.equal(convex([unit[0],unit[2],unit[1],unit[3]]),false);
assert.equal(homography([{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0}],unit),null);
assert.equal(fitScale(1000,2000,900,600),.3);assert.equal(fitScale(2000,1000,900,600),.45);assert.equal(fitScale(1000,2000,900,600,2),.6);
assert.deepEqual(flatQuad([{x:20,y:40},{x:100,y:50},{x:40,y:200}]),[{x:20,y:40},{x:100,y:40},{x:100,y:200},{x:20,y:200}]);
console.log('PASS: projective corners, inverse mapping, crossing/degenerate rejection, portrait/landscape fit and zoom.');
