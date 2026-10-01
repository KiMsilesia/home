import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { WhiteFooter, WhiteHeader } from "../../bialy/white-shell";

export const metadata: Metadata = { title: "KiM Konfi — Konfigurator Mebli | KIM SILESIA", description: "Parametryczne projektowanie mebli i przestrzeni.", robots: { index: false, follow: false } };

export default function KonfiPage() {
  return <main className="white-site studio-page">
    <WhiteHeader />
    <nav className="studio-tool-back"><Link href="/studio">← Wszystkie narzędzia</Link></nav>
    <section className="studio-generator studio-tool-window">
      <header>
        <div><small>WERSJA ROBOCZA</small><h2>KiM Konfi — Konfigurator Mebli</h2></div>
        <a href="/studio-konfi/index.html" target="_blank" rel="noopener noreferrer">Otwórz na pełnym ekranie <ExternalLink aria-hidden="true" /></a>
      </header>
      <div className="studio-frame-shell"><iframe src="/studio-konfi/index.html" title="KiM Konfi" loading="eager" /></div>
    </section>
    <WhiteFooter />
  </main>;
}
