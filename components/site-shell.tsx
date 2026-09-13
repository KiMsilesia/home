"use client";

import Link from "next/link";
import { Menu, X, Phone, Mail, ArrowUpRight } from "lucide-react";
import { useState } from "react";

const nav = [
  ["Usługi", "/#uslugi"], ["Proces", "/#proces"],
  ["Mieszkaj w Mieście", "/mieszkaj-w-miescie"],
  ["Realizacje", "/#realizacje"], ["Kontakt", "/#kontakt"],
];

export function Logo() {
  return <Link href="/" className="brand" aria-label="KIM SILESIA — strona główna"><img src="/assets/logo-kim-silesia.png" alt="KIM SILESIA" /></Link>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <div className="nav-wrap">
      <nav className="desktop-nav" aria-label="Główna nawigacja">{nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
      <a className="nav-cta" href="tel:+48881028373"><Phone size={16} /> 881 028 373</a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Zamknij menu" : "Otwórz menu"}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav className="mobile-nav" aria-label="Nawigacja mobilna">{nav.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={16} /></Link>)}<a href="tel:+48881028373"><Phone size={16} /> Zadzwoń: 881 028 373</a></nav>}
  </header>;
}

export function Footer() {
  return <footer className="footer" id="kontakt">
    <div className="footer-wave" aria-hidden="true"><span /></div>
    <div className="footer-lead"><div><p className="eyebrow light">Zacznijmy od rozmowy</p><h2>Porozmawiajmy<br />o Twoim wnętrzu.</h2><p>Opowiedz nam o mieszkaniu, terminie i budżecie. Ustalimy najlepszy zakres współpracy.</p></div><div className="footer-actions"><a className="neo-button" href="tel:+48881028373"><Phone size={18} /> Zadzwoń</a><a className="footer-mail" href="mailto:kim.katowice@gmail.com"><Mail size={18} /> kim.katowice@gmail.com</a></div></div>
    <div className="footer-bottom"><div><strong>KIM SILESIA</strong><span>Wnętrza · meble · realizacja</span></div><div><strong>Marek Szymkowiak</strong><span>Główny Projektant</span></div><div><a href="tel:+48881028373">+48 881 028 373</a><a href="mailto:kim.katowice@gmail.com">kim.katowice@gmail.com</a></div><p>© {new Date().getFullYear()} KIM SILESIA</p></div>
  </footer>;
}

export function SiteShell({ children }: { children: React.ReactNode }) { return <><Header />{children}<Footer /></>; }
