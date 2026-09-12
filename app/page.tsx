import Link from "next/link";
import { ArrowDown, ArrowRight, Check, ChevronRight, Ruler, Sofa, Hammer, ClipboardCheck } from "lucide-react";
import { SiteShell } from "@/components/site-shell";

const services = [
  { n: "01", title: "Projektowanie", text: "Funkcjonalne wnętrza dopasowane do stylu życia, przestrzeni i realnego budżetu.", icon: Ruler },
  { n: "02", title: "Meble na wymiar", text: "Projekt, produkcja i montaż zabudowy, za której detal odpowiadamy od początku do końca.", icon: Sofa },
  { n: "03", title: "Wykonawstwo", text: "Spójna realizacja prac wykończeniowych, prowadzona według jednego projektu i harmonogramu.", icon: Hammer },
  { n: "04", title: "Odbiory techniczne", text: "Kontrola mieszkania przed odbiorem i czytelna lista elementów wymagających poprawy.", icon: ClipboardCheck },
];
const steps = ["Kontrola", "Projekt", "Wykonawstwo", "Meble", "Nadzór", "Odbiór"];

export default function Home() {
  return <SiteShell><main>
    <section className="hero">
      <img className="hero-image" src="https://raw.githubusercontent.com/KiMsilesia/home/main/archive/initial-project-brief/references/homepage/homepage-reference-01.png" alt="Nowoczesne wnętrze zaprojektowane przez KIM SILESIA" />
      <div className="hero-shade" />
      <div className="hero-content container"><p className="eyebrow light"><span /> 15 lat doświadczenia</p><h1>Projekt. Wykonanie.<br />Meble. Odbiór.</h1><p className="hero-copy">Jeden spójny proces. Jeden standard odpowiedzialności. Wnętrze dopasowane do Ciebie i Twojego budżetu.</p><div className="hero-actions"><a className="button button-light" href="#kontakt">Porozmawiajmy o projekcie <ArrowRight size={18} /></a><a className="button button-ghost" href="#realizacje">Zobacz realizacje</a></div></div>
      <a href="#uslugi" className="scroll-cue" aria-label="Przejdź dalej"><ArrowDown size={20} /></a>
    </section>

    <section className="intro section container"><p className="eyebrow">KIM SILESIA</p><div className="intro-grid"><h2>Wnętrza prowadzone<br />od pierwszego pomiaru<br />do gotowego efektu.</h2><div><p className="lead">Łączymy projektowanie, wykonawstwo i produkcję mebli w jeden uporządkowany proces.</p><p>Dzięki temu decyzje projektowe są od początku osadzone w możliwościach wykonawczych, kosztach i terminie. Ty masz jednego partnera, a każdy etap prowadzi do spójnego rezultatu.</p></div></div></section>

    <section className="services section" id="uslugi"><div className="container"><div className="section-heading"><div><p className="eyebrow">Zakres współpracy</p><h2>Cztery filary<br />dobrego wnętrza.</h2></div><p>Możesz powierzyć nam cały proces lub wybrany etap. Zawsze zaczynamy od rozpoznania realnych potrzeb i możliwości.</p></div><div className="service-grid">{services.map(({ n, title, text, icon: Icon }) => <article className="service-card" key={title}><div><span>{n}</span><Icon size={25} strokeWidth={1.5} /></div><h3>{title}</h3><p>{text}</p><a href="#kontakt" aria-label={`Zapytaj o ${title}`}>Zapytaj o zakres <ChevronRight size={16} /></a></article>)}</div></div></section>

    <section className="project-feature"><div className="project-photo"><img src="https://raw.githubusercontent.com/KiMsilesia/home/main/archive/initial-project-brief/references/mieszkaj-w-miescie/estate-reference-photo.jpg" alt="Osiedle Mieszkaj w Mieście w Katowicach" /></div><div className="project-copy"><p className="eyebrow light">Aktualny projekt · Katowice</p><h2>Mieszkaj<br />w Mieście.</h2><p>Kompleksowe wnętrza w doskonałej lokalizacji. Wybierz standard wykończenia dopasowany do Twoich oczekiwań i budżetu.</p><ul><li><Check size={17} /> trzy czytelne warianty</li><li><Check size={17} /> projekt, wykonanie i meble</li><li><Check size={17} /> możliwość prezentacji</li></ul><Link className="button button-light" href="/mieszkaj-w-miescie">Zobacz możliwości <ArrowRight size={18} /></Link></div></section>

    <section className="process section" id="proces"><div className="container"><p className="eyebrow">Jak pracujemy</p><div className="section-heading"><h2>Przewidywalny proces.<br />Dopracowany rezultat.</h2><p>Każdy etap ma swoje miejsce, cel i odpowiedzialność. Dzięki temu ograniczamy przypadkowe decyzje oraz kosztowne poprawki.</p></div><ol className="process-list">{steps.map((step, i) => <li key={step}><span>{String(i + 1).padStart(2, "0")}</span><strong>{step}</strong>{i < steps.length - 1 && <ArrowRight size={17} />}</li>)}</ol></div></section>

    <section className="portfolio section" id="realizacje"><div className="container"><div className="section-heading"><div><p className="eyebrow">Wybrane wnętrza</p><h2>Detal, który buduje<br />całość.</h2></div><p>Każde wnętrze zaczyna się od innego człowieka, miejsca i budżetu. Wspólny pozostaje standard pracy.</p></div><div className="portfolio-grid">{[1,2,3].map((n) => <figure key={n} className={`portfolio-item item-${n}`}><img src={`https://raw.githubusercontent.com/KiMsilesia/home/main/archive/initial-project-brief/references/realizacje/realizacja-0${n}.jpg`} alt={`Projekt wnętrza KIM SILESIA — ujęcie ${n}`} /><figcaption><span>Wnętrze mieszkalne</span><small>materiał projektowy</small></figcaption></figure>)}</div></div></section>
  </main></SiteShell>;
}
