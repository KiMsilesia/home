"use client";

import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowRight, Clock3, House, Mail, MoveUpRight, Instagram, Facebook, Youtube } from "lucide-react";
import "./qr-social.css";

const assetBase = "/home";
const defaultDestination = "/home/kukurydze/";

export default function QRLandingPage() {
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    let remaining = 5;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      remaining -= 1;
      setSecondsLeft(remaining);
      if (remaining <= 0) {
        window.location.assign(defaultDestination);
        return;
      }
      timer = setTimeout(tick, 1000);
    };
    timer = setTimeout(tick, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="qr-page qr-landing">
      <section className="qr-panel qr-landing-panel" aria-labelledby="qr-title">
        <a className="qr-brand" href="/home/" aria-label="KIM SILESIA — strona główna">
          <img src={assetBase + "/assets/logo-kim-silesia-bialy.png"} alt="KIM SILESIA" />
        </a>
        <p className="qr-eyebrow"><span /> WNĘTRZA · PROJEKTY · REALIZACJE</p>
        <h1 id="qr-title">Wybierz swój<br /><em>kierunek.</em></h1>
        <p className="qr-intro">Poznaj nasze projekty, zobacz aktualną realizację lub skontaktuj się z nami.</p>
        <nav className="qr-links qr-choice-links" aria-label="Wybierz stronę">
          <a href="/home/kukurydze/"><span className="qr-choice-icon"><ArrowDownRight size={20} /></span><span className="qr-choice-copy"><strong>Kukurydze 2.0</strong><small>Aktualna realizacja · Katowice</small></span><MoveUpRight size={18} /></a>
          <a href="/home/"><span className="qr-choice-icon"><House size={20} /></span><span className="qr-choice-copy"><strong>Strona główna</strong><small>Poznaj KIM SILESIA i naszą ofertę</small></span><MoveUpRight size={18} /></a>
          <a href="/home/kontakt/"><span className="qr-choice-icon"><Mail size={20} /></span><span className="qr-choice-copy"><strong>Kontakt</strong><small>Porozmawiajmy o Twoim projekcie</small></span><MoveUpRight size={18} /></a>
        </nav>
        <section className="qr-social" aria-labelledby="qr-social-title">
          <h2 id="qr-social-title">Zostańmy w kontakcie</h2>
          <p>Obserwuj KIM SILESIA w mediach społecznościowych.</p>
          <div className="qr-social-grid">
            <div className="qr-social-tile"><Instagram size={23} aria-hidden="true" /><strong>Instagram</strong><span>Wkrótce</span></div>
            <div className="qr-social-tile"><Facebook size={23} aria-hidden="true" /><strong>Facebook</strong><span>Wkrótce</span></div>
            <div className="qr-social-tile"><Youtube size={24} aria-hidden="true" /><strong>YouTube</strong><span>Wkrótce</span></div>
          </div>
        </section>
        <div className="qr-auto-redirect" role="status" aria-live="polite"><Clock3 size={17} /><span>Za <strong>{secondsLeft}</strong> {secondsLeft === 1 ? "sekundę" : "sekundy"} otworzymy<b>Kukurydze 2.0</b></span></div>
        <footer className="qr-landing-footer"><span>KIM SILESIA</span><span>Katowice · Śląsk</span></footer>
      </section>
    </main>
  );
}
