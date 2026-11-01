const {test}=require('node:test');
const assert=require('node:assert/strict');
const {PGlite}=require('@electric-sql/pglite');
const fs=require('node:fs');
test('database authorization, ownership, account approval, conflicts and quota',async()=>{
 const db=new PGlite();
 const a='00000000-0000-0000-0000-000000000001',b='00000000-0000-0000-0000-000000000002',admin='00000000-0000-0000-0000-000000000003';
 await db.exec(`create role anon; create role authenticated; create schema auth; create table auth.users(id uuid primary key,email text); create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$; grant usage on schema auth,public to anon,authenticated; grant execute on function auth.uid() to anon,authenticated;`);
 await db.exec(fs.readFileSync('supabase/migrations/001_beta03.sql','utf8'));
 await db.query('insert into auth.users values ($1,$2),($3,$4),($5,$6)',[a,'a@test.invalid',b,'b@test.invalid',admin,'admin@test.invalid']);
 await db.query("update kim_profiles set role='admin',status='active' where id=$1",[admin]);
 async function as(id,fn){await db.exec('set role authenticated');await db.query("select set_config('request.jwt.claim.sub',$1,false)",[id]);try{return await fn();}finally{await db.exec('reset role');}}
 async function save(id='p1',revision=0,document={id,rooms:[]}){return (await db.query('select kim_save_project($1,$2::jsonb,$3) as rev',[id,JSON.stringify(document),revision])).rows[0].rev;}
 await as(a,async()=>{
  assert.equal((await db.query('select * from kim_profiles')).rows.length,1);
  await assert.rejects(save(),/KIM_ACCESS_DENIED/);
  await assert.rejects(db.exec("update kim_profiles set role='admin',status='active'"),/permission denied/);
  await assert.rejects(db.query('select * from kim_admin_users()'),/KIM_ACCESS_DENIED/);
  await assert.rejects(db.query("select kim_admin_status($1,'active')",[a]),/KIM_ACCESS_DENIED/);
 });
 await as(admin,async()=>{
  assert.equal((await db.query('select * from kim_admin_users()')).rows.length,3);
  await db.query("select kim_admin_status($1,'active'),kim_admin_status($2,'active')",[a,b]);
  await assert.rejects(db.query("select kim_admin_status($1,'suspended')",[admin]),/KIM_SELF_CHANGE/);
 });
 await as(a,async()=>{
  assert.equal(await save(),1);assert.equal(await save('p1',1,{id:'p1',rooms:[],name:'A'}),2);
  await assert.rejects(save('p1',1),/KIM_CONFLICT/);
  await assert.rejects(save('p2',0,{id:'not-p2',rooms:[]}),/KIM_INVALID_PROJECT/);
  await assert.rejects(db.query('delete from kim_projects'),/permission denied/);
 });
 await as(b,async()=>{
  assert.equal((await db.query('select * from kim_projects')).rows.length,0);
  assert.equal(await save(),1); // identical ids remain independent across owners
  assert.equal((await db.query('select * from kim_projects')).rows[0].owner_id,b);
  await assert.rejects(db.query("update kim_projects set owner_id=$1",[a]),/permission denied/);
 });
 await as(admin,async()=>{
  assert.equal((await db.query('select * from kim_projects')).rows.length,0);
  await db.query("select kim_admin_status($1,'suspended')",[a]);
 });
 await as(a,async()=>{assert.equal((await db.query('select * from kim_projects')).rows.length,0);await assert.rejects(save('p1',2),/KIM_ACCESS_DENIED/);});
 await db.exec('set role anon');await assert.rejects(db.query('select * from kim_projects'),/permission denied/);await assert.rejects(save(),/permission denied/);await db.exec('reset role');
 await as(b,async()=>{for(let i=2;i<=100;i++)await save('p'+i);await assert.rejects(save('p101'),/KIM_QUOTA/);await assert.rejects(save('p1',1,{id:'p1',rooms:[],huge:'x'.repeat(5242880)}),/KIM_INVALID_PROJECT/);});
 await db.close();
});
