import Link from "next/link";
import { ArrowRight, ClipboardCheck, Hammer, Ruler, Sofa } from "lucide-react";
import { SiteShell } from "@/components/site-shell";

const services = [
  { label: "Projektowanie", icon: Ruler },
  { label: "Meble na wymiar", icon: Sofa },
  { label: "Wykończenie", icon: Hammer },
  { label: "Odbiory", icon: ClipboardCheck },
];

const plans = [
  { name: "Standard", note: "Funkcjonalne rozwiązania w rozsądnym budżecie." },
  { name: "Plus", note: "Więcej możliwości, lepsze materiały i dopracowany detal." },
  { name: "Premium", note: "Pełna personalizacja i bezkompromisowe wykończenie." },
];

export default function Home() {
  return <SiteShell><main className="home-dark">
    <section className="neo-hero">
      <div className="neo-glow neo-glow-one" />
      <div className="neo-hero-copy">
        <p className="neo-kicker">Przestrzeń ma znaczenie</p>
        <h1>Wnętrza.<br /><em>Meble.</em><br />Wykończenie.</h1>
        <p>Jeden partner. Jeden standard odpowiedzialności. Od pierwszego pomiaru do gotowego wnętrza.</p>
        <a className="neo-button" href="#mieszkaj">Poznaj naszą ofertę <ArrowRight size={18} /></a>
      </div>
      <div className="neo-hero-photo image-cut">
        <img src="https://raw.githubusercontent.com/KiMsilesia/home/main/archive/initial-project-brief/references/realizacje/realizacja-02.jpg" alt="Realizacja kuchni KIM SILESIA" />
        <span className="photo-caption">Funkcja · estetyka · komfort</span>
      </div>
      <div className="service-ribbon">
        {services.map(({ label, icon: Icon }) => <a href="#kontakt" key={label}><Icon size={18} />{label}</a>)}
      </div>
      <div className="section-wave wave-hero" aria-hidden="true"><span /></div>
    </section>

    <section className="city-showcase" id="mieszkaj">
      <div className="neo-glow neo-glow-two" />
      <div className="city-copy">
        <p className="neo-kicker">Nowe perspektywy · Katowice</p>
        <h2>Mieszkaj<br /><em>w Mieście</em></h2>
        <p>Kompleksowe wnętrza w wyjątkowej lokalizacji. Wybierz wariant dopasowany do swoich oczekiwań i budżetu.</p>
        <Link className="neo-button" href="/mieszkaj-w-miescie">Poznaj warianty <ArrowRight size={18} /></Link>
      </div>
      <div className="city-photo image-cut">
        <img src="https://raw.githubusercontent.com/KiMsilesia/home/main/archive/initial-project-brief/references/mieszkaj-w-miescie/estate-reference-photo.jpg" alt="Osiedle Mieszkaj w Mieście w Katowicach" />
      </div>
      <div className="plan-row">
        {plans.map(plan => <article key={plan.name}><h3>{plan.name}</h3><span /><p>{plan.note}</p><Link href="/mieszkaj-w-miescie" aria-label={`Poznaj wariant ${plan.name}`}><ArrowRight size={17} /></Link></article>)}
      </div>
      <div className="section-wave wave-city" aria-hidden="true"><span /></div>
    </section>

    <section className="compact-realizations" id="realizacje">
      <div className="compact-title"><p className="neo-kicker">Nasza duma</p><h2>Wybrane<br /><em>realizacje</em></h2></div>
      <div className="compact-gallery">
        {[1,2,3].map(n => <figure key={n}><img src={`https://raw.githubusercontent.com/KiMsilesia/home/main/archive/initial-project-brief/references/realizacje/realizacja-0${n}.jpg`} alt={`Realizacja KIM SILESIA — ${n}`} /></figure>)}
      </div>
    </section>
  </main></SiteShell>;
}
