const esbuild=require('esbuild'),fs=require('node:fs'),path=require('node:path');
const result=esbuild.buildSync({stdin:{contents:"import {createClient} from '@supabase/supabase-js'; window.KimSupabase={createClient};",resolveDir:process.cwd()},bundle:true,minify:true,format:'iife',platform:'browser',outfile:'dist/supabase-client.js',legalComments:'eof',metafile:true});
const packages=new Set();
for(const input of Object.keys(result.metafile.inputs)){const m=input.match(/^node_modules\/((?:@[^/]+\/)?[^/]+)/);if(m)packages.add(m[1]);}
let licenses='Third-party licenses for supabase-client.js\n';
for(const pkg of [...packages].sort()){const dir=path.join('node_modules',pkg),meta=JSON.parse(fs.readFileSync(path.join(dir,'package.json'),'utf8'));licenses+='\n\n'+pkg+' '+meta.version+' ('+meta.license+')\n';for(const file of fs.readdirSync(dir).filter(n=>/^licen[cs]e(?:\.|$)/i.test(n)))licenses+=fs.readFileSync(path.join(dir,file),'utf8')+'\n';}
fs.writeFileSync('dist/THIRD_PARTY_LICENSES.txt',licenses);
