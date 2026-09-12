import { ArrowRight, Check } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mieszkaj w Mieście Katowice", description: "Trzy warianty kompleksowego wykończenia wnętrza na osiedlu Mieszkaj w Mieście w Katowicach." };

const plans = [
  { name: "Standard", index: "100", label: "Wariant bazowy", image: "standard-render.jpg", features: ["fronty z płyty meblowej", "blat laminowany", "funkcjonalny standard", "kontrolowany budżet"] },
  { name: "Plus", index: "125–140", label: "Najlepszy balans", image: "plus-render-gloss.jpg", recommended: true, features: ["fronty lakierowane lub akrylowe", "blat kompaktowy 12 mm", "spójny detal wyspy i stołu", "okucia wyższej klasy"] },
  { name: "Premium", index: "165–200", label: "Pełna personalizacja", image: "premium-render.jpg", features: ["naturalny fornir", "kamień, spiek lub konglomerat", "materiały specjalne", "indywidualne rozwiązania"] },
];

export default function MieszkajPage() {
  return <SiteShell><main>
    <section className="subhero"><img src="https://raw.githubusercontent.com/KiMsilesia/home/main/archive/initial-project-brief/references/mieszkaj-w-miescie/mieszkaj-page-reference-01.png" alt="Wnętrze w projekcie Mieszkaj w Mieście" /><div className="hero-shade" /><div className="container subhero-content"><p className="eyebrow light">Aktualna realizacja · Katowice</p><h1>Twoje miejsce<br />w mieście.</h1><p>Nowoczesne wnętrze, jeden odpowiedzialny zespół i wybór standardu, który pasuje do Twoich planów.</p><a className="button button-light" href="#warianty">Porównaj warianty <ArrowRight size={18} /></a></div></section>

    <section className="section city-intro container"><p className="eyebrow">Mieszkaj w Mieście</p><div className="intro-grid"><h2>Od pustego mieszkania<br />do gotowego wnętrza.</h2><div><p className="lead">Projektujemy i realizujemy mieszkania na katowickim osiedlu, które znamy również od strony technicznej.</p><p>Możesz wybrać jeden z trzech czytelnych poziomów materiałowych. Układ, funkcja i jakość prowadzenia procesu pozostają wspólne.</p></div></div></section>

    <section className="plans section" id="warianty"><div className="container"><p className="eyebrow">Wybierz swój standard</p><div className="section-heading"><h2>Różne materiały.<br />Ten sam dobry proces.</h2><p>Indeks pokazuje relację budżetową między wariantami. Nie jest ceną ani ofertą handlową.</p></div><div className="plan-grid">{plans.map(plan => <article className={`plan-card ${plan.recommended ? "recommended" : ""}`} key={plan.name}>{plan.recommended && <span className="recommend-badge">Rekomendowany</span>}<img src={`https://raw.githubusercontent.com/KiMsilesia/home/main/archive/initial-project-brief/references/warianty-wykonczenia/${plan.image}`} alt={`Wariant ${plan.name}`} /><div className="plan-content"><p className="plan-label">{plan.label}</p><div className="plan-title"><h3>{plan.name}</h3><div><small>indeks</small><strong>{plan.index}</strong></div></div><ul>{plan.features.map(feature => <li key={feature}><Check size={16} />{feature}</li>)}</ul><a href="#kontakt">Zapytaj o wariant <ArrowRight size={16} /></a></div></article>)}</div><p className="budget-note">Indeks budżetu ma charakter porównawczy i nie stanowi wyceny. Dokładny koszt ustalamy po wyborze materiałów i wyposażenia.</p></div></section>

    <section className="value section container"><p className="eyebrow">Za co płacisz więcej?</p><div className="value-grid"><article><span>Plus</span><h3>Wyższa jakość powierzchni i detalu.</h3><p>Połysk, cienki kompakt 12 mm, spójność blatu z wyspą i stołem oraz staranniej dobrane okucia.</p></article><article><span>Premium</span><h3>Naturalne materiały i indywidualne rozwiązania.</h3><p>Fornir, kamień, spiek i zaawansowane detale dają największy zakres personalizacji wnętrza.</p></article></div></section>
  </main></SiteShell>;
}
