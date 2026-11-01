const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {JSDOM}=require('jsdom');const vm=require('node:vm');
const tick=()=>new Promise(r=>setImmediate(r));
function setup(config={}){
 const html=fs.readFileSync('dist/index.html','utf8');const dom=new JSDOM(html,{url:'https://example.test/kim/',runScripts:'outside-only',pretendToBeVisual:true});const w=dom.window;
 w.TextEncoder=TextEncoder;w.HTMLDialogElement.prototype.showModal=function(){this.open=true};w.HTMLDialogElement.prototype.close=function(){this.open=false};w.confirm=()=>true;
 const scripts=[...html.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]);
 for(const src of scripts){if(['auth.js','config.js','supabase-client.js'].includes(src))continue;vm.runInContext(fs.readFileSync(path.join('dist',src),'utf8'),dom.getInternalVMContext(),{filename:src});}
 let listener;let session=null;let saved=0;
 const client={auth:{onAuthStateChange(fn){listener=fn},getSession:async()=>({data:{session}}),signInWithPassword:async()=>{session={user:{id:'user-a'}};return {data:{session}}},signOut:async()=>{session=null;listener('SIGNED_OUT');return {error:null}}},from(table){return {select(){return this},eq(){return this},single:async()=>({data:{id:'user-a',email:'test@example.test',role:'admin',status:'active'}}),order:async()=>({data:[]})}},rpc:async(name,args)=>name==='kim_save_project'?{data:++saved}:{data:[{id:'user-b',email:'b@example.test',role:'user',status:'pending',projects:0}]}};
 w.KIM_CONFIG=config;w.KimSupabase={createClient:()=>client};vm.runInContext(fs.readFileSync('dist/auth.js','utf8'),dom.getInternalVMContext(),{filename:'auth.js'});w.KimAuth=vm.runInContext('KimAuth',dom.getInternalVMContext());return {dom,w,saved:()=>saved};
}
test('unconfigured backend explicitly blocks editor without simulated login',()=>{const {dom,w}=setup();assert.match(w.document.getElementById('authGate').textContent,/czeka na podłączenie/);assert.ok(w.document.body.classList.contains('locked'));assert.equal(w.document.getElementById('content').textContent,'');dom.window.close();});
test('login opens complete editor, save goes to RPC, admin panel opens, logout clears projects',async()=>{
 const {dom,w,saved}=setup({supabaseUrl:'https://project.supabase.co',supabasePublishableKey:'test-public-key'});await tick();
 w.document.getElementById('authEmail').value='test@example.test';w.document.getElementById('authPassword').value='a-test-password-123';w.document.getElementById('authForm').dispatchEvent(new w.Event('submit',{cancelable:true}));await tick();await tick();
 assert.equal(w.document.body.classList.contains('locked'),false);assert.ok(w.document.getElementById('content').textContent.includes('Pomieszczenie 1'));assert.equal(w.document.getElementById('adminButton').hidden,false);
 await w.explicitSave();assert.equal(saved(),1);await w.KimAuth.admin();assert.match(w.document.getElementById('dialogContent').textContent,/b@example.test/);
 await w.KimAuth.logout();assert.ok(w.document.body.classList.contains('locked'));assert.equal(w.document.getElementById('content').textContent,'');assert.equal(w.document.getElementById('dialogContent').textContent,'');assert.ok(w.document.getElementById('authForm'));dom.window.close();
});
