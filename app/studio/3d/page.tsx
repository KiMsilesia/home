import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { WhiteFooter, WhiteHeader } from "../../bialy/white-shell";

export const metadata: Metadata = { title: "KiM 3D Studio — Środowisko i Render | KIM SILESIA", description: "Swobodna scena, formatki, materiały i światła.", robots: { index: false, follow: false } };

export default function Studio3DPage() {
  return <main className="white-site studio-page">
    <WhiteHeader />
    <nav className="studio-tool-back"><Link href="/studio">← Wszystkie narzędzia</Link></nav>
    <section className="studio-generator studio-tool-window">
      <header>
        <div><small>WERSJA ROBOCZA</small><h2>KiM 3D Studio — Środowisko i Render</h2></div>
        <a href="/studio-3d/index.html" target="_blank" rel="noopener noreferrer">Otwórz na pełnym ekranie <ExternalLink aria-hidden="true" /></a>
      </header>
      <div className="studio-frame-shell"><iframe src="/studio-3d/index.html" title="KiM 3D Studio" loading="eager" /></div>
    </section>
    <WhiteFooter />
  </main>;
}
