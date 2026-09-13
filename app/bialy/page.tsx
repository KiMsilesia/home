import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardCheck, Cog, House, MessageSquare, PenTool, Ruler, Sofa } from "lucide-react";

const services = [
  { icon: Ruler, title: "Projektowanie", text: "Funkcjonalne i estetyczne wnętrza dopasowane do Ciebie." },
  { icon: Sofa, title: "Meble na wymiar", text: "Kuchnie, zabudowy i meble do całego domu." },
  { icon: Cog, title: "Wykonawstwo", text: "Kompleksowa realizacja z jednego źródła." },
  { icon: House, title: "Odbiory techniczne", text: "Sprawdzisz przed zakupem. Kupujesz bez ryzyka." },
];

const process = [
  { icon: MessageSquare, no: "01", title: <>Rozmowa<br />i potrzeby</> },
  { icon: PenTool, no: "02", title: <>Projekt<br />i wycena</> },
  { icon: ClipboardCheck, no: "03", title: <>Realizacja<br />i nadzór</> },
  { icon: CheckCircle2, no: "04", title: <>Efekt<br />i satysfakcja</> },
];

export default function WhiteVariant() {
  return <main className="white-site">
    <header className="white-header">
      <Link href="/bialy" className="white-logo"><img src="/assets/logo-kim-silesia.png" alt="KIM SILESIA" /></Link>
      <nav aria-label="Nawigacja wariantu białego">
        <a href="#start">Strona główna</a><a href="#o-nas">O nas</a><a href="#oferta">Oferta</a><a href="#realizacje">Realizacje</a><a href="#miasto">Mieszkaj w Mieście</a><a href="#kontakt">Kontakt</a>
      </nav>
      <a className="white-contact" href="tel:+48881028373">Skontaktuj się <ArrowRight size={18} /></a>
    </header>

    <section className="white-hero" id="start">
      <img src="/assets/realizacja-02.jpg" alt="Nowoczesna kuchnia wykonana przez KIM SILESIA" />
      <div className="white-hero-shade" />
      <div className="white-hero-copy">
        <p>Wnętrza, które mają sens</p>
        <h1>Projekt.<br />Wykonanie.<br /><em>Komfort.</em></h1>
        <div className="hero-services">Meble na wymiar <span /> Kompleksowe wykończenia <span /> Odbiory techniczne</div>
        <a className="white-outline" href="#realizacje">Zobacz nasze realizacje <ArrowRight size={18} /></a>
      </div>
      <div className="experience"><strong>15</strong><b>lat<br />doświadczenia</b><small>Profesjonalizm.<br />Ludzie. Realne efekty.</small></div>
    </section>

    <section className="white-services" id="oferta">
      {services.map(({icon:Icon,title,text}) => <article key={title}><Icon /><div><h2>{title}</h2><p>{text}</p></div></article>)}
    </section>

    <section className="white-city" id="miasto">
      <div className="white-city-copy"><small>Nasza aktualna realizacja na osiedlu</small><h2>Mieszkaj<br />w Mieście<br />Katowice</h2><i /><p>Nowoczesne wnętrza w doskonałej lokalizacji, możliwość wyboru rodzaju wykończenia i zakres dopasowany do budżetu.</p><Link className="white-outline" href="/mieszkaj-w-miescie">Dowiedz się więcej <ArrowRight size={18} /></Link></div>
      <figure><img src="/assets/mieszkaj-w-miescie.jpg" alt="Osiedle Mieszkaj w Mieście w Katowicach" /><figcaption>Twój nowy adres<br />w mieście</figcaption></figure>
    </section>

    <section className="white-process" id="o-nas">
      <div className="process-intro"><h2>Jak<br />pracujemy?</h2><p>Prosty proces.<br />Jasne zasady.<br />Spokojna realizacja.</p></div>
      {process.map(({icon:Icon,no,title},i) => <article key={no}><b>{no}</b><Icon /><strong>{title}</strong>{i<3&&<ArrowRight className="process-arrow" />}</article>)}
    </section>

    <section className="white-gallery" id="realizacje">
      <div className="gallery-label"><b>Wybrane realizacje</b><a href="#kontakt">Zobacz więcej <ArrowRight size={16} /></a></div>
      <div>{[1,2,3,1].map((n,i)=><figure key={i}><img src={`/assets/realizacja-0${n}.jpg`} alt={`Realizacja wnętrza KIM SILESIA ${i+1}`} /></figure>)}</div>
    </section>

    <section className="white-cta" id="kontakt"><h2>Porozmawiajmy<br />o Twoim projekcie.</h2><span /><p>Dobre wnętrza zaczynają się od rozmowy.<br />Skontaktuj się z nami i sprawdź, jak możemy Ci pomóc.</p><a className="white-outline" href="tel:+48881028373">Skontaktuj się <ArrowRight size={18} /></a></section>
    <footer className="white-footer"><img src="/assets/logo-kim-silesia.png" alt="KIM SILESIA" /><b>Profesjonalni w Twoich wnętrzach</b><span>Katowice</span><a href="tel:+48881028373">+48 881 028 373</a></footer>
  </main>;
}
