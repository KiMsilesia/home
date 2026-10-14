"use client";

import { useEffect, useState } from "react";
import { Clock3, Instagram, Facebook, Youtube } from "lucide-react";
import "./qr-social.css";

const assetBase = "/home";
const defaultDestination = "/home/kukurydze/";

export default function QRLandingPage() {
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    if (secondsLeft <= 0) {
      window.location.assign(defaultDestination);
      return;
    }
    const timer = window.setTimeout(() => setSecondsLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [secondsLeft, isPaused]);

  return (
    <main className="qr-page qr-landing">
      <section className="qr-panel qr-landing-panel" aria-labelledby="qr-title">
        <a className="qr-brand" href="/home/" aria-label="KIM SILESIA — strona główna">
          <img src={assetBase + "/assets/logo-kim-silesia-bialy.png"} alt="KIM SILESIA" />
        </a>
        <p className="qr-eyebrow"><span /> WNĘTRZA · PROJEKTY · REALIZACJE</p>
        <h1 id="qr-title">Wybierz swój<br /><em>kierunek.</em></h1>
        <p className="qr-intro">Wybierz stronę, którą chcesz odwiedzić.</p>
        <section className="qr-timer-panel" aria-label="Automatyczne przekierowanie">
          <div className="qr-timer-summary">
            <Clock3 size={22} aria-hidden="true" />
            <div className="qr-timer-copy">
              <strong>{isPaused ? "Przekierowanie zatrzymane" : "Automatyczne przekierowanie"}</strong>
              <span>{isPaused ? "Możesz spokojnie wybrać kafelek." : "Po odliczaniu otworzymy Kukurydze 2.0."}</span>
            </div>
            <output className="qr-timer-count" aria-label={`Pozostało ${secondsLeft} sekund`}>{secondsLeft}<small>s</small></output>
          </div>
          <div className="qr-timer-actions">
            <button type="button" onClick={() => setIsPaused((value) => !value)}>{isPaused ? "Wznów" : "Zatrzymaj"}</button>
            <button type="button" onClick={() => setSecondsLeft((value) => value + 10)}>+10 sekund</button>
          </div>
        </section>
        <nav className="qr-links qr-choice-links" aria-label="Wybierz stronę">
          <a href="/home/kukurydze/"><img className="qr-link-thumbnail" src={assetBase + "/assets/mieszkaj-w-miescie.jpg"} alt="" /><strong>Kukurydze 2.0</strong><small>Aktualna realizacja</small></a>
          <a href="/home/"><img className="qr-link-thumbnail" src={assetBase + "/assets/bialy-hero-kuchnia.jpg"} alt="" /><strong>Strona główna</strong><small>KIM SILESIA</small></a>
          <a href="/home/kontakt/"><img className="qr-link-thumbnail" src={assetBase + "/assets/realizacja-01.jpg"} alt="" /><strong>Kontakt</strong><small>Napisz do nas</small></a>
        </nav>
        <section className="qr-social" aria-labelledby="qr-social-title">
          <h2 id="qr-social-title">Zostańmy w kontakcie</h2>
          <p>Obserwuj KIM SILESIA w mediach społecznościowych.</p>
          <div className="qr-social-grid">
            <a className="qr-social-tile" href="https://www.instagram.com/kim_silesia/reel/DEmMpPHM-N4/" target="_blank" rel="noopener noreferrer" aria-label="Instagram KIM SILESIA — zobacz rolkę"><Instagram size={23} aria-hidden="true" /><strong>Instagram</strong><span>Zobacz rolkę</span></a>
            <div className="qr-social-tile"><Facebook size={23} aria-hidden="true" /><strong>Facebook</strong><span>Wkrótce</span></div>
            <a className="qr-social-tile" href="https://youtu.be/Gbt933OBLFg" target="_blank" rel="noopener noreferrer" aria-label="YouTube KIM SILESIA — obejrzyj film"><Youtube size={24} aria-hidden="true" /><strong>YouTube</strong><span>Obejrzyj film</span></a>
          </div>
        </section>
        
        <footer className="qr-landing-footer"><span>KIM SILESIA</span><span>Katowice · Śląsk</span></footer>
      </section>
    </main>
  );
}
