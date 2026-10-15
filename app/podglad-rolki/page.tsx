"use client";

import { useState } from "react";

const variants = [
  { title: "Aktualna wersja", url: "/home/assets/rolki/3d-silesia-podglad.mp4" },
  { title: "Poprzednia wersja — bufor", url: "/home/assets/rolki/3d-silesia-poprzednia.mp4" },
];

function Preview({title,url}:{title:string;url:string}) {
  const [missing,setMissing]=useState(false);
  return <section style={{marginBottom:28}}>
    <h2 style={{fontSize:18,fontWeight:600,margin:"0 0 12px",textAlign:"left"}}>{title}</h2>
    <div style={{borderRadius:16,overflow:"hidden",border:"1px solid #426092",background:"#030916",boxShadow:"0 16px 50px #0007",aspectRatio:"9 / 16",position:"relative"}}>
      {!missing ? <video controls playsInline preload="metadata" poster="/home/assets/3d-silesia-granat.png" onError={()=>setMissing(true)} style={{width:"100%",height:"100%",objectFit:"contain"}}><source src={url} type="video/mp4" /></video> :
        <div style={{height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:18,padding:26,textAlign:"center"}}>
          <img src="/home/assets/3d-silesia-granat.png" alt="3D SILESIA" style={{width:"90%",height:"auto"}} />
          <p style={{fontSize:15,lineHeight:1.6,color:"#d7e2f3"}}>Brak filmu w tym miejscu. Pojawi się po przesłaniu wersji MP4 do repozytorium.</p>
        </div>}
    </div>
  </section>;
}

export default function PodgladRolekPage() {
  return <main style={{minHeight:"100vh",background:"radial-gradient(ellipse at top,#123a83 0%,#081632 48%,#050b19 100%)",color:"#fff",display:"grid",placeItems:"center",padding:"28px 16px",fontFamily:"Arial,sans-serif"}}>
    <div style={{width:"100%",maxWidth:430}}>
      <p style={{fontSize:12,letterSpacing:3,color:"#9db6dd",marginBottom:10,textAlign:"center"}}>3D SILESIA</p>
      <h1 style={{fontSize:26,margin:"0 0 8px",textAlign:"center"}}>Podgląd rolek</h1>
      <p style={{fontSize:14,color:"#bac9e2",margin:"0 0 24px",textAlign:"center"}}>Porównaj bieżącą wersję z poprzednią</p>
      {variants.map(v=><Preview key={v.url} {...v}/>)}
      <p style={{fontSize:12,color:"#9db6dd",lineHeight:1.7}}>Zasada bufora: przed opublikowaniem nowej wersji zachowujemy aktualną jako „Poprzednią”. Jeśli poprzednia jest lepsza, można ją przywrócić. Bufor przechowuje tylko jedną wcześniejszą wersję. Strona nie jest połączona z menu witryny.</p>
    </div>
  </main>;
}
