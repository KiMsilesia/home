"use client";

import { useEffect, useState } from "react";
import { Clock3, Instagram, Facebook, Youtube } from "lucide-react";
import "./qr-social.css";

const assetBase = "/home";
const defaultDestination = "/home/kukurydze/";

export default function QRLandingPage() {
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    let remaining = 10;
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
        <p className="qr-intro">Wybierz stronę, którą chcesz odwiedzić.</p>
        <nav className="qr-links qr-choice-links" aria-label="Wybierz stronę">
          <a href="/home/kukurydze/"><img className="qr-link-thumbnail" src={assetBase + "/assets/mieszkaj-w-miescie.jpg"} alt="" /><strong>Kukurydze 2.0</strong><small>Aktualna realizacja</small></a>
          <a href="/home/"><img className="qr-link-thumbnail" src={assetBase + "/assets/bialy-hero-kuchnia.jpg"} alt="" /><strong>Strona główna</strong><small>KIM SILESIA</small></a>
          <a href="/home/kontakt/"><img className="qr-link-thumbnail" src={assetBase + "/assets/realizacja-01.jpg"} alt="" /><strong>Kontakt</strong><small>Napisz do nas</small></a>
        </nav>
        <section className="qr-social" aria-labelledby="qr-social-title">
          <h2 id="qr-social-title">Zostańmy w kontakcie</h2>
          <p>Obserwuj KIM SILESIA w mediach społecznościowych.</p>
          <div className="qr-social-grid">
            <div className="qr-social-tile"><img className="qr-social-photo" src={assetBase + "/assets/mieszkaj-w-miescie.jpg"} alt="" /><Instagram size={23} aria-hidden="true" /><strong>Instagram</strong><span>Wkrótce</span></div>
            <div className="qr-social-tile"><img className="qr-social-photo" src={assetBase + "/assets/bialy-hero-kuchnia.jpg"} alt="" /><Facebook size={23} aria-hidden="true" /><strong>Facebook</strong><span>Wkrótce</span></div>
            <div className="qr-social-tile"><img className="qr-social-photo" src={assetBase + "/assets/realizacja-01.jpg"} alt="" /><Youtube size={24} aria-hidden="true" /><strong>YouTube</strong><span>Wkrótce</span></div>
          </div>
        </section>
        <div className="qr-auto-redirect" role="status" aria-live="polite"><Clock3 size={17} /><span>Za <strong>{secondsLeft}</strong> {secondsLeft === 1 ? "sekundę" : "sekundy"} otworzymy<b>Kukurydze 2.0</b></span></div>
        <footer className="qr-landing-footer"><span>KIM SILESIA</span><span>Katowice · Śląsk</span></footer>
      </section>
    </main>
  );
}
