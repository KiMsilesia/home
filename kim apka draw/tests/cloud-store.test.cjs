const {test}=require('node:test'),assert=require('node:assert/strict');
const store=require('../dist/project-store.js');
test('cloud store uses loaded revisions, does not accept list revisions, rejects stale sessions',async()=>{
 let rpcArgs,revision=3,delay;
 const client={from(){return {select(){return this},eq(){return this},order:async()=>({data:[{document:{id:'p'},revision:99}]}),single:async()=>({data:{document:{id:'p'},revision}})}},rpc:async(name,args)=>{rpcArgs=args;if(delay)await delay;return {data:args.p_revision+1}}};
 store.connect(client,'a');await store.get('p');await store.list();await store.put({id:'p'});assert.equal(rpcArgs.p_revision,3);await store.put({id:'p'});assert.equal(rpcArgs.p_revision,4);
 store.connect(client,'b');await store.put({id:'p'});assert.equal(rpcArgs.p_revision,0);
 let resolve;delay=new Promise(r=>resolve=r);const write=store.put({id:'p'});store.disconnect();resolve();await assert.rejects(write,/Sesja/);await assert.rejects(store.list(),/Zaloguj/);
});
