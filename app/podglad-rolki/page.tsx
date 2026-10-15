"use client";

import { useState } from "react";

const videoUrl = "/home/assets/rolki/3d-silesia-podglad.mp4";

export default function PodgladRolekPage() {
  const [missing, setMissing] = useState(false);
  return (
    <main style={{minHeight:"100vh",background:"radial-gradient(ellipse at top,#123a83 0%,#081632 48%,#050b19 100%)",color:"#fff",display:"grid",placeItems:"center",padding:"28px 16px",fontFamily:"Arial,sans-serif"}}>
      <section style={{width:"100%",maxWidth:430,textAlign:"center"}}>
        <p style={{fontSize:12,letterSpacing:3,color:"#9db6dd",marginBottom:10}}>3D SILESIA</p>
        <h1 style={{fontSize:26,margin:"0 0 8px"}}>Podgląd rolki</h1>
        <p style={{fontSize:14,color:"#bac9e2",margin:"0 0 24px"}}>Wersja robocza do akceptacji</p>
        <div style={{borderRadius:16,overflow:"hidden",border:"1px solid #426092",background:"#030916",boxShadow:"0 22px 70px #0008",aspectRatio:"9 / 16",position:"relative"}}>
          {!missing ? <video key={videoUrl} controls playsInline preload="metadata" poster="/home/assets/3d-silesia-granat.png" onError={()=>setMissing(true)} style={{width:"100%",height:"100%",objectFit:"contain"}}><source src={videoUrl} type="video/mp4" /></video> :
            <div style={{height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:18,padding:26}}>
              <img src="/home/assets/3d-silesia-granat.png" alt="3D SILESIA" style={{width:"90%",height:"auto"}} />
              <p style={{fontSize:15,lineHeight:1.6,color:"#d7e2f3"}}>Panel jest gotowy. Oczekuje na przesłanie pierwszej wersji filmu do repozytorium.</p>
            </div>}
        </div>
        <p style={{fontSize:12,color:"#9db6dd",lineHeight:1.6,marginTop:18}}>Nowa wersja filmu zastąpi poprzednią pod tym samym adresem. Strona nie jest połączona z menu witryny.</p>
      </section>
    </main>
  );
}
