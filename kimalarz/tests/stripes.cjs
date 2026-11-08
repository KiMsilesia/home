const assert=require('node:assert/strict'),S=require('../dist/stripes.js');
for(const angle of [0,30,90,-45]){
 const w=693,h=440,size=85,converted=S.fromRegular(w,h,size,angle,'#b4bd9c','#ffffff');
 assert.ok(Math.abs(converted.bands.reduce((s,b)=>s+b.width,0)-100)<1e-8);
 for(let f=.001;f<1;f+=.013){const x=-converted.span/2+f*converted.span,n=Math.floor((x+Math.max(w,h)*2)/size),expected=n%2===0?'#b4bd9c':'#ffffff';assert.equal(converted.bands[S.at(converted.bands,f*100)].color,expected)}
 assert.ok(S.valid(converted.bands,converted.span));
}
const bands=[{width:10,color:'#ffffff'},{width:20,color:'#000000'},{width:70,color:'#ffffff'}];bands[1].width=30;assert.equal(bands[0].width,10);assert.equal(bands[2].width,70);assert.equal(S.at(bands,35),1);assert.equal(S.at(bands,45),2);
assert.equal(S.at(bands,-1),-1);assert.equal(S.at(bands,200),-1);assert.ok(Math.abs(S.normalize(bands).reduce((s,b)=>s+b.width,0)-100)<1e-8);
assert.equal(S.valid([{width:0,color:'#ffffff'}],100),false);assert.equal(S.valid([{width:NaN,color:'#ffffff'}],100),false);
console.log('PASS: legacy stripe conversion for 4 angles, individual widths, hit selection, normalization and validation.');
