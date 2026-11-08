(function(root){
 const span=(w,h,angle)=>Math.abs(w*Math.cos(angle*Math.PI/180))+Math.abs(h*Math.sin(angle*Math.PI/180));
 function fromRegular(w,h,size,angle,color,color2){
  const extent=span(w,h,angle),d=Math.max(w,h)*2,left=-extent/2,right=extent/2,bands=[];
  let x=left;
  while(x<right-1e-8&&bands.length<200){const n=Math.floor((x+d+1e-7)/size),end=Math.min(right,-d+(n+1)*size);if(end<=x)break;bands.push({width:(end-x)/extent*100,color:n%2===0?color:color2});x=end;}
  return {bands,span:extent};
 }
 function at(bands,percent){if(percent<0)return -1;let end=0;for(let i=0;i<bands.length;i++){end+=bands[i].width;if(percent<end)return i}return -1;}
 function normalize(bands){const total=bands.reduce((s,b)=>s+b.width,0);return bands.map(b=>({...b,width:b.width/total*100}));}
 function valid(bands,extent){return Array.isArray(bands)&&bands.length>0&&bands.length<=200&&Number.isFinite(extent)&&extent>0&&extent<=4000&&bands.every(b=>b&&Number.isFinite(b.width)&&b.width>0&&b.width<=200&&/^#[0-9a-f]{6}$/i.test(b.color));}
 const api={span,fromRegular,at,normalize,valid};if(typeof module!=='undefined')module.exports=api;else root.Stripes=api;
})(typeof window==='undefined'?{}:window);
