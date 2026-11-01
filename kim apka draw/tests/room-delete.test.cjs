const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),{JSDOM}=require('jsdom');
test('remove room and links, undo without discarding other edits, guard last room and project switch',()=>{
 const d=new JSDOM('<aside><button class="add-room">Add</button></aside>',{runScripts:'outside-only'}),c=d.getInternalVMContext();
 vm.runInContext(`let data={rooms:[{id:'a',name:'A',x:0,y:0,points:[],elements:[{id:'socket'}]},{id:'b',name:'B',x:4,y:0,points:[],elements:[]}],links:[{id:'ab',a:'a',b:'b'}]},roomId='a',wall=0,view='wall',activeElement=null,activeField=null,shapeDraft=null,deletedElement=null,projectReady=true;function room(){return data.rooms.find(r=>r.id===roomId)}function copy(x){return JSON.parse(JSON.stringify(x))}function save(){}function render(){}function toast(){};`,c);
 vm.runInContext(fs.readFileSync('dist/room-delete.js','utf8'),c);
 assert.equal(vm.runInContext("RoomRemoval.erase('a')",c),true);assert.equal(vm.runInContext('data.links.length',c),0);assert.equal(vm.runInContext("RoomRemoval.erase('b')",c),false);
 vm.runInContext("data.rooms[0].name='Edited B'",c);assert.equal(vm.runInContext('RoomRemoval.restore()',c),true);assert.equal(vm.runInContext('data.rooms[0].elements.length',c),1);assert.equal(vm.runInContext('data.rooms[1].name',c),'Edited B');assert.equal(vm.runInContext('data.links.length',c),1);
 vm.runInContext("RoomRemoval.erase('a');data={rooms:[{id:'x',name:'X'}],links:[]};roomId='x'",c);assert.equal(vm.runInContext('RoomRemoval.restore()',c),false);d.window.close();
});
