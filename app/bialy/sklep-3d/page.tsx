import type { Metadata } from "next";
import { Download, Box } from "lucide-react";
import { WhiteFooter, WhiteHeader } from "../white-shell";

export const metadata: Metadata = { title: "Sklep 3D — modele OBJ | KiM SILESIA", description: "Modele 3D do projektowania wnętrz. Obejrzyj model ze wszystkich stron i pobierz plik OBJ." };

export default function Shop3DPage() {
  return <main className="white-site shop3d-page">
    <WhiteHeader />
    <section className="shop3d-content">
      <header className="shop3d-heading"><div><small>MODELE DO TWOICH PROJEKTÓW</small><h1>Sklep 3D</h1></div><p>Obejrzyj model ze wszystkich stron, zanim pobierzesz go do swojego projektu.</p></header>
      <div className="shop3d-grid">{Array.from({ length: 5 }, (_, index) => <article className="shop3d-product" key={index}>
        <div className="shop3d-media"><div className="shop3d-preview"><iframe src="/model-viewer/index.html" title={`Interaktywny podgląd 3D zlewu — przykład ${index + 1}`} loading={index === 0 ? "eager" : "lazy"} allowFullScreen /><span className="shop3d-preview-label"><Box size={16} /> PODGLĄD 3D</span></div><div className="shop3d-gallery">{[{src:"zlew-czarny-wizualizacja.png",label:"Czarne wykończenie"},{src:"zlew-rzut-gora.svg",label:"Rzut z góry"},{src:"zlew-widok-boczny.svg",label:"Widok boczny"}].map(asset => <a key={asset.src} href={`/models/${asset.src}`} target="_blank" rel="noopener noreferrer"><img src={`/models/${asset.src}`} alt={asset.label} loading="lazy" /><span>{asset.label}</span></a>)}</div></div>
        <div className="shop3d-product-info"><small>Armatura AGD</small><h2>{index === 0 ? "Przykładowy zlew" : `Przykładowy zlew — kopia ${String(index + 1).padStart(2, "0")}`}</h2><p>Model z przesłanego pliku OBJ. Obróć go, przybliż i sprawdź geometrię przed pobraniem.</p><dl><div><dt>Format</dt><dd>.OBJ</dd></div><div><dt>Rozmiar pliku</dt><dd>1,22 MB</dd></div><div><dt>Elementy modelu</dt><dd>12</dd></div><div><dt>Wykończenie podglądu</dt><dd>Czarne, satynowe</dd></div></dl><div className="shop3d-download"><span>Model przykładowy do pobrania</span><a href="/models/zlew-przykladowy.obj" download="KiM_zlew_przykladowy.obj"><Download size={19} /> Pobierz plik OBJ</a></div><p className="shop3d-material-note">Wizualizacja przedstawia propozycję czarnego wykończenia. Rysunki pochodzą z geometrii OBJ i nie mają skali wykonawczej. Plik OBJ nie zawiera materiałów MTL.</p></div>
      </article>)}</div>
    </section>
    <WhiteFooter />
  </main>;
}
