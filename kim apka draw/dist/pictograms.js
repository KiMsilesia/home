// Original vector pictograms; identical artwork in editor, drawings and PDF.
function pictogram(type,attrs=''){
const frame='<rect x="3" y="3" width="26" height="26" rx="5" fill="#f7f8f7" stroke="#344f65" stroke-width="1.8"/>';
const label=t=>`<text x="16" y="27" text-anchor="middle" font-family="Arial,sans-serif" font-size="6" font-weight="bold" fill="#344f65">${t}</text>`;
const art={
lan:frame+'<path d="M8 10h16v10h-5v3h-6v-3H8Z" fill="#334e62"/><path d="M11 10v5m3-5v5m4-5v5m3-5v5" stroke="#d7af61" stroke-width="1.4"/>'+label('LAN'),
rtv:frame+'<circle cx="11" cy="15" r="5" fill="#d9e2e6" stroke="#657985"/><circle cx="21" cy="15" r="5" fill="#d9e2e6" stroke="#657985"/><circle cx="11" cy="15" r="1.6" fill="#344f65"/><circle cx="21" cy="15" r="1.6" fill="#f7f8f7" stroke="#344f65"/>'+label('RTV'),
sat:frame+'<path d="M12 8h8l4 7-4 7h-8l-4-7Z" fill="#bacbd4" stroke="#657985"/><circle cx="16" cy="15" r="5" fill="#f7f8f7" stroke="#657985"/><circle cx="16" cy="15" r="1.5" fill="#344f65"/>'+label('SAT'),
smart:frame+'<circle cx="16" cy="19" r="7" fill="#e2e7e8" stroke="#657985"/><circle cx="13" cy="20" r="1.6" fill="#233b4c"/><circle cx="19" cy="20" r="1.6" fill="#233b4c"/><path d="M10 8q6-5 12 0m-9 2q3-3 6 0" fill="none" stroke="#278f91" stroke-width="1.8" stroke-linecap="round"/><circle cx="16" cy="11" r="1" fill="#278f91"/>',

socket:'<rect x="3" y="3" width="26" height="26" rx="5" fill="#f7f8f7" stroke="#344f65" stroke-width="1.8"/><circle cx="16" cy="16" r="9" fill="#e2e7e8" stroke="#657985" stroke-width="1.3"/><circle cx="12" cy="17" r="2.2" fill="#233b4c"/><circle cx="20" cy="17" r="2.2" fill="#233b4c"/><path d="M16 8v4" stroke="#7c8c95" stroke-width="2.5" stroke-linecap="round"/>',
water:'<path d="M5 26v-9h10V9h6v8h7v9h-6v-4H11v4Z" fill="#a6d3df" stroke="#28657e" stroke-width="1.7" stroke-linejoin="round"/><path d="M18 9V5M12 5h12" stroke="#315c72" stroke-width="2.5" stroke-linecap="round"/><circle cx="18" cy="5" r="2" fill="#277ea4"/><path d="M25 27c-4 4-4 7 0 7 4 0 4-3 0-7Z" fill="#3e9bc2" transform="translate(0,-3) scale(1,.95)"/>',
wire:'<path d="M6 29V21c0-8 8-5 8-13" fill="none" stroke="#394957" stroke-width="6" stroke-linecap="round"/><path d="M12 10L8 4M15 10l3-7M17 13l8-5" fill="none" stroke="#fff" stroke-width="3.7" stroke-linecap="round"/><path d="M12 10L8 4" stroke="#965837" stroke-width="2.5"/><path d="M15 10l3-7" stroke="#338db9" stroke-width="2.5"/><path d="M17 13l8-5" stroke="#4b9e56" stroke-width="3"/><path d="M18 12l6-4" stroke="#e4ce4c" stroke-width="1"/><path d="M8 4 6 1M18 3l1-2M25 8l3-2" stroke="#c38b52" stroke-width="2" stroke-linecap="round"/>'
};
if(!art[type])return `<span class="plain-pictogram">${types[type]?.[1]||'＋'}</span>`;
return `<svg class="pictogram" viewBox="0 0 32 32" aria-hidden="true" ${attrs}>${art[type]}</svg>`;
}
function drawPointIcon(e,pos,poly){
const size=180,scale=size/32;
const map=(x,y)=>pos(e.x+(x-16)*scale,e.y+(e.wall<0?y-16:16-y)*scale);
const polygon=(p,fill,stroke='#365e76')=>poly(p.map(([x,y])=>map(x,y)),fill,stroke);
const circle=(x,y,r,fill)=>polygon(Array.from({length:20},(_,i)=>[x+r*Math.cos(i*Math.PI/10),y+r*Math.sin(i*Math.PI/10)]),fill);
if(e.type==='socket'){polygon([[3,3],[29,3],[29,29],[3,29]],'#f7f8f7');circle(16,16,9,'#d4dfe4');circle(12,17,2,'#243d50');circle(20,17,2,'#243d50');polygon([[15,7],[17,7],[17,11],[15,11]],'#6b8798');}
else if(['lan','rtv','sat','smart'].includes(e.type)){
polygon([[3,3],[29,3],[29,29],[3,29]],'#f7f8f7');
if(e.type==='lan'){polygon([[8,10],[24,10],[24,20],[19,20],[19,23],[13,23],[13,20],[8,20]],'#344f65');for(const x of [11,14,18,21])polygon([[x,10],[x+1,10],[x+1,15],[x,15]],'#d7af61');}
if(e.type==='rtv'){for(const x of [10,22]){circle(x,16,5,'#c6d5df');circle(x,16,1.5,'#344f65');}}
if(e.type==='sat'){polygon([[12,7],[20,7],[25,16],[20,25],[12,25],[7,16]],'#a7bbc7');circle(16,16,6,'#f7f8f7');circle(16,16,2,'#344f65');}
if(e.type==='smart'){circle(16,20,7,'#d4dfe4');circle(13,20,1.7,'#243d50');circle(19,20,1.7,'#243d50');for(const [y,w] of [[6,9],[9,5]])polygon([[16-w,y+2],[16,y-1],[16+w,y+2],[16+w,y+4],[16,y+1],[16-w,y+4]],'#278f91');circle(16,13,1,'#278f91');}
}
else if(e.type==='water'){polygon([[5,26],[5,17],[15,17],[15,9],[21,9],[21,17],[28,17],[28,26],[22,26],[22,22],[11,22],[11,26]],'#70bccf');polygon([[12,3],[24,3],[24,6],[19,6],[19,10],[17,10],[17,6],[12,6]],'#2a6a87');}
else if(e.type==='wire'){polygon([[5,29],[5,20],[11,14],[12,8],[17,8],[16,17],[10,23],[10,29]],'#3e4e5c');polygon([[12,10],[7,3],[9,2],[15,9]],'#9c603d');polygon([[15,10],[17,2],[20,2],[18,11]],'#398fb4');polygon([[17,12],[26,5],[28,7],[19,15]],'#6d9e4c');}
else circle(16,16,10,e.type==='drain'?'#637786':e.type==='lamp'?'#efbe57':'#e7b760');
}
