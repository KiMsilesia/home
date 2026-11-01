/* Cloud data only; no shared-device project cache. Supabase RLS remains authoritative. */
const ProjectStore = (() => {
  let client, owner, epoch=0;
  const revisions=new Map();
  function check(){if(!client||!owner)throw Error('Zaloguj się ponownie.');return epoch;}
  function unchanged(value){if(value!==epoch)throw Error('Sesja została zmieniona.');}
  function fail(error){
    if(!error)return;
    const m=String(error.message||error);
    if(m.includes('KIM_CONFLICT'))throw Error('Konflikt: projekt zmieniono na innym urządzeniu. Wyeksportuj swoje zmiany i ponownie otwórz wersję z chmury.');
    if(m.includes('KIM_QUOTA'))throw Error('Osiągnięto limit beta: 100 projektów lub 20 MB na konto. Eksportuj plik.');
    if(m.includes('KIM_ACCESS_DENIED'))throw Error('Brak dostępu. Sprawdź status konta.');
    throw Error('Chmura niedostępna. Zachowaj zmiany przez eksport JSON i spróbuj ponownie.');
  }
  return {
    scope:()=>epoch,
    connect(c,id){epoch++;client=c;owner=id;revisions.clear();},
    disconnect(){epoch++;client=null;owner=null;revisions.clear();},
    async list(){const e=check();const {data,error}=await client.from('kim_projects').select('id,document,revision,updated_at').eq('owner_id',owner).order('updated_at',{ascending:false});unchanged(e);fail(error);return data.map(r=>({...r.document,updatedAt:r.updated_at}));},
    async get(id){const e=check();const {data,error}=await client.from('kim_projects').select('document,revision').eq('owner_id',owner).eq('id',id).single();unchanged(e);fail(error);revisions.set(id,data.revision);return data.document;},
    async put(document){const e=check();if(new TextEncoder().encode(JSON.stringify(document)).length>5*1024*1024)throw Error('Projekt ze zdjęciami przekracza 5 MB. Eksportuj JSON, a do chmury zapisz mniejsze zdjęcia.');
      const {data,error}=await client.rpc('kim_save_project',{p_id:document.id,p_document:document,p_revision:revisions.get(document.id)||0});unchanged(e);fail(error);revisions.set(document.id,data);}
  };
})();
if(typeof module!=='undefined')module.exports=ProjectStore;
