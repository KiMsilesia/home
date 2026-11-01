/* Shared responsive navigation: no changes to project storage. */
(()=>{
 const panel=document.querySelector('body > aside'),main=document.querySelector('body > main');
 if(!panel||!main)return;
 const mobile=window.matchMedia?matchMedia('(max-width:850px)'):{matches:false,addEventListener(){}};
 panel.id='workspacePanel';panel.setAttribute('aria-label','Menu KiMapki');
 const toggle=document.createElement('button');toggle.id='panelToggle';toggle.className='panel-toggle';toggle.type='button';toggle.setAttribute('aria-controls',panel.id);
 document.querySelector('main > header').prepend(toggle);
 const top=document.createElement('div');top.className='panel-heading';
 top.innerHTML='<strong>Menu KiMapki</strong><button type="button" id="panelClose" aria-label="Zwiń lewy panel">‹ Zwiń</button>';panel.prepend(top);
 const backdrop=document.createElement('button');backdrop.className='panel-backdrop';backdrop.type='button';backdrop.tabIndex=-1;backdrop.setAttribute('aria-label','Zamknij menu');backdrop.hidden=true;document.body.append(backdrop);
 const actions=document.querySelector('.header-actions');
 if(actions){const files=document.createElement('details');files.className='panel-files';const summary=document.createElement('summary');summary.textContent='Zapis, eksport i narzędzia';files.append(summary,actions);panel.insertBefore(files,panel.querySelector('.aside-bottom'));}
 let desktopOpen=true;try{desktopOpen=localStorage.getItem('kim-panel-expanded')!=='false'}catch{}
 let open=mobile.matches?false:desktopOpen;
 function apply(){document.body.classList.toggle('panel-expanded',open);document.body.classList.toggle('panel-collapsed',!open);document.body.classList.toggle('panel-overlay',open&&mobile.matches);toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'‹ Zwiń panel':'☰ Menu';toggle.setAttribute('aria-label',open?'Zwiń lewy panel':'Rozwiń menu, pomieszczenia i zapis');panel.inert=!open;main.inert=open&&mobile.matches;backdrop.hidden=!(open&&mobile.matches);}
 function set(value,focus=false){open=value;if(!mobile.matches){desktopOpen=open;try{localStorage.setItem('kim-panel-expanded',String(open))}catch{}}apply();if(focus)(open?document.getElementById('panelClose'):toggle).focus();}
 toggle.onclick=()=>set(!open,true);document.getElementById('panelClose').onclick=()=>set(false,true);backdrop.onclick=()=>set(false,true);
 panel.addEventListener('click',e=>{const button=e.target.closest('button');if(mobile.matches&&button&&button.id!=='panelClose')set(false);},true);
 document.addEventListener('keydown',e=>{if(!open)return;if(e.key==='Escape'){e.preventDefault();set(false,true);}if(e.key==='Tab'&&mobile.matches){const nodes=[...panel.querySelectorAll('button:not([hidden]):not(:disabled),summary,input,select,a[href]')].filter(n=>!n.closest('details:not([open])')||n.tagName==='SUMMARY');const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
 mobile.addEventListener('change',()=>{open=mobile.matches?false:desktopOpen;apply()});
 new MutationObserver(()=>{if(typeof document!=='undefined'&&document?.body?.classList.contains('locked')&&open)set(false)}).observe(document.body,{attributes:true,attributeFilter:['class']});
 apply();
})();
