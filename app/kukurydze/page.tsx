import type { Metadata } from "next";
import { ProjectStudy } from "../../components/project-study";
import "../project-study.css";
import Link from "next/link";
const assetBase = "/home";
import { ArrowRight, Maximize2 } from "lucide-react";
import { WhiteFooter, WhiteHeader, WhiteSubhero } from "../../components/white-shell";

export const metadata: Metadata = {
  title: "Kukurydze 2.0 · Mieszkaj w Mieście | KIM SILESIA",
  description: "Projekt wybranego mieszkania w inwestycji Kukurydze 2.0 na Osiedlu Tysiąclecia w Katowicach.",
};

const rooms = [
  { number: "01", name: "Przedpokój", area: "4,24 m²" },
  { number: "02", name: "Pokój 1", area: "12,34 m²" },
  { number: "03", name: "Pokój 2", area: "8,58 m²" },
  { number: "04", name: "Pokój 3", area: "8,03 m²" },
  { number: "05", name: "Pokój dzienny z aneksem kuchennym", area: "20,60 m²" },
  { number: "06", name: "Łazienka", area: "5,94 m²" },
  { number: "07", name: "Korytarz", area: "8,07 m²" },
];

const bathroomProject = {
  "id": "lazienka",
  "number": "01",
  "title": "Łazienka",
  "description": "Projekt łazienki dla realizowanej inwestycji w Kukurydzach 2.0. Wizualizacje pokazują aranżację wnętrza, a widoki techniczne rozwijają układ ścian, wyposażenia i zabudowy.",
  "photos": [
    {
      "src": "/home/assets/kukurydze/lazienka/perspektywa-1.jpg",
      "label": "Strefa umywalki i pralni"
    },
    {
      "src": "/home/assets/kukurydze/lazienka/perspektywa-2.jpg",
      "label": "Perspektywa wnętrza"
    },
    {
      "src": "/home/assets/kukurydze/lazienka/perspektywa-3.jpg",
      "label": "Strefa WC i półki"
    },
    {
      "src": "/home/assets/kukurydze/lazienka/perspektywa-4.jpg",
      "label": "Lustro i blat"
    },
    {
      "src": "/home/assets/kukurydze/lazienka/perspektywa-5.jpg",
      "label": "Układ łazienki"
    }
  ],
  "heroIndex": 4,
  "details": [
    {
      "label": "MATERIAŁY",
      "title": "Kontrast jasnego i ciemnego",
      "text": "Powierzchnie o wzorze marmuru budują spójną kompozycję, podkreśloną czarnymi detalami."
    },
    {
      "label": "FUNKCJA",
      "title": "Umywalka i strefa pralni",
      "text": "Wspólny blat łączy umywalkę, zabudowę meblową oraz pralkę i suszarkę ustawione obok siebie."
    },
    {
      "label": "ŚWIATŁO",
      "title": "Linie LED i podświetlenia",
      "text": "Oświetlenie przy lustrze, półkach i krawędziach wydobywa podziały wnętrza oraz jego głębię."
    }
  ],
  "drawings": [
    {
      "label": "N",
      "src": "/home/assets/kukurydze/lazienka/widok-N.jpg",
      "pdf": "/home/assets/kukurydze/lazienka/widok-N.pdf"
    },
    {
      "label": "S",
      "src": "/home/assets/kukurydze/lazienka/widok-S.jpg",
      "pdf": "/home/assets/kukurydze/lazienka/widok-S.pdf"
    },
    {
      "label": "E",
      "src": "/home/assets/kukurydze/lazienka/widok-E.jpg",
      "pdf": "/home/assets/kukurydze/lazienka/widok-E.pdf"
    },
    {
      "label": "W",
      "src": "/home/assets/kukurydze/lazienka/widok-W.jpg",
      "pdf": "/home/assets/kukurydze/lazienka/widok-W.pdf"
    }
  ]
};

export default function CityApartmentPage() {
  return <main className="white-site city-apartment-page">
    <WhiteHeader />
    <WhiteSubhero
      eyebrow="MIESZKAJ W MIEŚCIE · KUKURYDZE 2.0"
      title={<>Wybrane mieszkanie.<br /><em>Przemyślane wnętrze.</em></>}
      text="Od rzutu deweloperskiego do spójnej aranżacji dopasowanej do stylu życia, możliwości wnętrza i założonego budżetu."
      image={assetBase + "/assets/mieszkaj-w-miescie.jpg"}
    />

    <section className="apartment-plan-section">
      <header>
        <div><small>INWENTARYZACJA Z NATURY</small><h2>Dokumentacja pomiarowa<br />realizowanej inwestycji.</h2></div>
        <p>Szkic przedstawia rzeczywisty układ i wymiary pomieszczeń mieszkalnych, ustalone podczas inwentaryzacji z natury dla realizowanej inwestycji. Stanowi podstawę dalszych prac projektowych i wykonawczych.</p>
      </header>
      <div className="apartment-plan-layout">
        <figure className="apartment-plan-image">
          <div style={{ position: "relative", width: "100%", aspectRatio: "1510 / 1152", overflow: "hidden" }}>
            <img src={assetBase + "/assets/mwm-6-01-rzut2.jpg"} alt="Inwentaryzacja z natury pomieszczeń mieszkalnych dla realizowanej inwestycji Mieszkaj w Mieście" style={{ position: "absolute", width: "135.63%", maxWidth: "none", maxHeight: "none", height: "auto", left: "-19.87%", top: 0 }} />
          </div>
          <a href={assetBase + "/assets/mwm-6-01-rzut2.jpg"} target="_blank" rel="noreferrer">Otwórz pełny rzut <Maximize2 size={17} /></a>
        </figure>
        <aside>
          <small>REALIZOWANA INWESTYCJA</small>
          <h3>Budynek C</h3>
          <dl>
            <div><dt>Lokalizacja</dt><dd>Osiedle Tysiąclecia, Katowice</dd></div>
            <div><dt>Powierzchnia mieszkania</dt><dd>67,8 m²</dd></div>
            <div><dt>Liczba pokoi</dt><dd>4 pokoje</dd></div>
            <div><dt>Loggia</dt><dd>32,38 m²</dd></div>
            <div><dt>Zakres</dt><dd>Projekt · meble · wykończenie</dd></div>
            <div><dt>Status</dt><dd>Aktualna realizacja</dd></div>
          </dl>
          <p>Wykonana inwentaryzacja pomiarowa jest punktem odniesienia przy opracowaniu aranżacji, zabudowy meblowej i zakresu prac wykończeniowych.</p>
          <Link className="apartment-plan-button" href="/kontakt">Zapytaj o swoje mieszkanie <ArrowRight size={18} /></Link>
        </aside>
      </div>
    </section>

    <section className="apartment-detail-section" aria-labelledby="apartment-detail-title">
      <div className="apartment-detail-heading">
        <div><small>LOKAL C.02.01 · DANE Z RZUTU</small><h2 id="apartment-detail-title">Pomieszczenia<br />i powierzchnie.</h2></div>
        <p>Podział powierzchni według rzutu mieszkania. To punkt odniesienia do opracowania funkcji, zabudowy meblowej i rozmieszczenia wyposażenia.</p>
      </div>
      <div className="apartment-detail-grid">
        <div className="apartment-room-table" role="table" aria-label="Powierzchnie pomieszczeń mieszkania C.02.01">
          {rooms.map(room => <div className="apartment-room-row" role="row" key={room.number}><span role="cell">{room.number}</span><strong role="cell">{room.name}</strong><span role="cell">{room.area}</span></div>)}
          <div className="apartment-room-total" role="row"><span role="cell">RAZEM</span><strong role="cell">Powierzchnia mieszkania</strong><b role="cell">67,80 m²</b></div>
        </div>
        <aside className="apartment-detail-aside">
          <small>PRZESTRZEŃ ZEWNĘTRZNA</small>
          <strong>32,38 m²</strong>
          <span>Loggia · powierzchnia podana osobno, poza powierzchnią mieszkania.</span>
          <a href={assetBase + "/assets/mwm-6-01-rzut2.jpg"} target="_blank" rel="noreferrer">Sprawdź oryginalny rzut lokalu <ArrowRight size={18} /></a>
        </aside>
      </div>
      <div className="apartment-project-scope">
        <div><small>DALSZE OPRACOWANIE PROJEKTU</small><h3>Od układu do detalu wykonawczego</h3></div>
        <p>Po ustaleniu wariantu wykończenia pokażemy projektowane układy pomieszczeń, materiały i zabudowy, a następnie rysunki potrzebne do wykonania. Publikujemy inwentaryzację oraz opracowanie łazienki. Kolejne części obejmą kuchnię, sypialnię i hol.</p>
      </div>
    </section>

    <section className="apartment-variants">
      <header><small>TRZY KIERUNKI ARANŻACJI</small><h2>Wybór oparty<br />na konkretnych rozwiązaniach.</h2><p>Dla klienta przygotujemy trzy warianty wykończenia zgodne ze standardami opisanymi w ofercie. Każdy wariant zostanie przedstawiony na osobnej grafice, aby ułatwić porównanie estetyki, materiałów i poziomu wykończenia.</p></header>
      <div className="apartment-variant-grid">
        <article><figure><img src={assetBase + "/assets/standard.jpg"} alt="Przykładowa wizualizacja wariantu Standard" /><figcaption>Wizualizacja przykładowa</figcaption></figure><div><span>01</span><small>WARIANT</small><h3>Standard</h3><p>Rozwiązania funkcjonalne, trwałe i racjonalnie dopasowane do założonego budżetu.</p></div></article>
        <article><figure><img src={assetBase + "/assets/plus.jpg"} alt="Przykładowa wizualizacja wariantu Plus" /><figcaption>Wizualizacja przykładowa</figcaption></figure><div><span>02</span><small>WARIANT</small><h3>Plus</h3><p>Równowaga między efektownym wyglądem, komfortem i rozsądnym wykorzystaniem budżetu.</p></div></article>
        <article><figure><img src={assetBase + "/assets/premium-wood-kitchen.jpg"} alt="Przykładowa wizualizacja wariantu Premium" /><figcaption>Wizualizacja przykładowa</figcaption></figure><div><span>03</span><small>WARIANT</small><h3>Premium</h3><p>Indywidualne rozwiązania, szlachetne materiały i maksymalnie dopracowany detal.</p></div></article>
      </div>
      <div className="apartment-selected-project">
        <div><small>PO WYBORZE WARIANTU</small><h3>Rozwinięty projekt aranżacyjny i techniczny</h3></div>
        <ul><li><b>01</b><span>Projekt łazienki</span></li><li><b>02</b><span>Projekt kuchni</span></li><li><b>03</b><span>Projekt sypialni i holu</span></li></ul>
        <p>Wybrany kierunek rozwiniemy w kompletną dokumentację potrzebną do prawidłowego wykonania wnętrza — od układu i materiałów po najważniejsze detale techniczne.</p>
      </div>
    </section>

    <nav className="study-room-nav" aria-label="Opracowania pomieszczeń"><a href="#lazienka">01 · Łazienka</a><span>02 · Kuchnia <small>w przygotowaniu</small></span><span>03 · Sypialnia <small>w przygotowaniu</small></span><span>04 · Hol <small>w przygotowaniu</small></span></nav>
    <ProjectStudy project={bathroomProject} />

    <section className="white-page-cta"><div><small>OD RZUTU DO REALIZACJI</small><h2>Sprawdźmy możliwości<br />Twojego mieszkania.</h2></div><p>Przeanalizujemy układ, instalacje, ergonomię i materiały, zanim rozpoczną się kosztowne prace.</p><Link className="white-outline" href="/kontakt">Umów konsultację <ArrowRight size={18} /></Link></section>
    <WhiteFooter />
  </main>;
}
