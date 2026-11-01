const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),{JSDOM}=require('jsdom');
const script=fs.readFileSync('dist/navigation.js','utf8');
test('mobile menu opens, retains actions, closes on selection and restores focus with Escape',()=>{
 const d=new JSDOM('<body><aside><div id="rooms"><button id="room">Kuchnia</button></div><div class="aside-bottom"></div></aside><main><header><div>Pomiar</div><div class="header-actions"><button id="save">Zapisz</button><button id="admin" hidden>Admin</button></div></header></main></body>',{runScripts:'outside-only',url:'https://example.test'}),w=d.window;
 w.matchMedia=()=>({matches:true,addEventListener(){}});let saves=0;w.document.getElementById('save').onclick=()=>saves++;w.eval(script);
 const q=s=>w.document.querySelector(s);assert.equal(q('#panelToggle').getAttribute('aria-expanded'),'false');q('#panelToggle').click();assert.equal(q('main').inert,true);assert.equal(q('.panel-backdrop').hidden,false);q('.panel-files').open=true;q('#save').click();assert.equal(saves,1);assert.equal(q('main').inert,false);assert.equal(q('#panelToggle').getAttribute('aria-expanded'),'false');assert.equal(q('#admin').hidden,true);
 q('#panelToggle').click();q('#room').click();assert.equal(q('#panelToggle').getAttribute('aria-expanded'),'false');q('#panelToggle').click();w.document.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape'}));assert.equal(w.document.activeElement,q('#panelToggle'));assert.equal(q('main').inert,false);d.window.close();
});
