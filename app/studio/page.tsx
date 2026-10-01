import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Box, ExternalLink, Layers3, Cuboid } from "lucide-react";
import { WhiteFooter, WhiteHeader } from "../bialy/white-shell";

export const metadata: Metadata = {
  title: "Studio — narzędzia projektowe",
  description: "Narzędzia KIM SILESIA do przygotowania materiałów, mebli i wizualizacji wnętrz.",
  robots: { index: false, follow: false, nocache: true },
};

const tools = [
  {
    icon: Layers3,
    no: "01",
    status: "Dostępne",
    title: "KiM GTP — Generator Tekstur Powierzchni",
    text: "Przygotuj bezszwową próbkę drewna, podłogi lub drobnej mozaiki i pobierz plik do programu projektowego.",
    href: "#generator",
    active: true,
  },
  {
    icon: Box,
    no: "02",
    status: "Wersja robocza",
    title: "KiM Konfi — Konfigurator Mebli",
    text: "Istniejący konfigurator do pracy nad meblami i przestrzenią, dostępny w oknie poniżej.",
    href: "#konfi",
    active: true,
  },
  {
    icon: Cuboid,
    no: "03",
    status: "Wersja robocza",
    title: "KiM 3D Studio — Środowisko i Render",
    text: "Swobodna scena, obiekty, materiały, światła i eksport ujęć z wcześniejszej wersji Studia.",
    href: "#studio-3d",
    active: true,
  },
];

export default function StudioPage() {
  return <main className="white-site studio-page">
    <WhiteHeader />

    <section className="studio-heading">
      <div>
        <small>KIM SILESIA · NARZĘDZIA PROJEKTOWE</small>
        <h1>Jedno <em>Studio.</em><br />Cały proces.</h1>
      </div>
      <p>KiM GTP oraz robocze wersje KiM Konfi i KiM 3D Studio otwierają się w oknach poniżej. Każde narzędzie możesz też otworzyć na pełnym ekranie.</p>
    </section>

    <section className="studio-tools" aria-label="Moduły Studia">
      {tools.map(({icon:Icon,no,status,title,text,href,active}) => <article className={active ? "is-active" : "is-planned"} key={title}>
        <div className="studio-tool-top"><span>{no}</span><Icon aria-hidden="true"/><small>{status}</small></div>
        <h2>{title}</h2>
        <p>{text}</p>
        {href ? <a href={href}>Przejdź do narzędzia <ArrowRight aria-hidden="true"/></a> : <span className="studio-tool-wait">Moduł zostanie dodany później</span>}
      </article>)}
    </section>

    <section className="studio-generator" id="generator">
      <header>
        <div><small>MODUŁ 01 · AKTYWNY</small><h2>KiM GTP — Generator Tekstur Powierzchni</h2></div>
        <Link href="/studio-generator/index.html" target="_blank" rel="noopener">Otwórz na pełnym ekranie <ExternalLink aria-hidden="true"/></Link>
      </header>
      <div className="studio-frame-shell">
        <iframe src="/studio-generator/index.html" title="KiM GTP — generator tekstur powierzchni" loading="eager" />
      </div>
      <p className="studio-frame-note">Własne próbki materiałów pozostają w przeglądarce i nie są wysyłane na serwer.</p>
    </section>

    <section className="studio-generator" id="konfi">
      <header>
        <div><small>MODUŁ 02 · WERSJA ROBOCZA</small><h2>KiM Konfi — Konfigurator Mebli</h2></div>
        <Link href="/studio-konfi/index.html" target="_blank" rel="noopener noreferrer">Otwórz na pełnym ekranie <ExternalLink aria-hidden="true"/></Link>
      </header>
      <div className="studio-frame-shell">
        <iframe src="/studio-konfi/index.html" title="KiM Konfi" loading="lazy" />
      </div>
    </section>

    <section className="studio-generator" id="studio-3d">
      <header>
        <div><small>MODUŁ 03 · WERSJA ROBOCZA</small><h2>KiM 3D Studio — Środowisko i Render</h2></div>
        <Link href="/studio-3d/index.html" target="_blank" rel="noopener noreferrer">Otwórz na pełnym ekranie <ExternalLink aria-hidden="true"/></Link>
      </header>
      <div className="studio-frame-shell">
        <iframe src="/studio-3d/index.html" title="KiM 3D Studio" loading="lazy" />
      </div>
    </section>

    <WhiteFooter />
  </main>;
}
