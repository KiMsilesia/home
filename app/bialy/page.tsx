import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardCheck, MessageSquare, PenTool } from "lucide-react";

const services = [
  { image: "/assets/3d-silesia-granat.png", alt: "3D SILESIA", title: "Projektowanie", text: "Funkcjonalne i estetyczne wnętrza dopasowane do Ciebie." },
  { image: "/assets/ms-meble-granat.png", alt: "MS Meble Szymkowiak", title: "Meble na wymiar", text: "Kuchnie, zabudowy i meble do całego domu." },
  { image: "/assets/kimpro-granat.png", alt: "KIMPRO", title: "Kompleksowe wykończenie", text: "Kompleksowa realizacja z jednego źródła." },
  { image: "/assets/tube-inspektor-granat.png", alt: "TUBE INSPEKTOR", title: "Odbiory techniczne", text: "Sprawdzisz przed zakupem. Kupujesz bez ryzyka." },
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
      <Link href="/bialy" className="white-logo"><img src="/assets/logo-kim-silesia-bialy.png" alt="KIM SILESIA" /></Link>
      <nav aria-label="Nawigacja wariantu białego">
        <a href="#start">Strona główna</a><Link href="/bialy/o-nas">O nas</Link><Link href="/bialy/oferta">Oferta</Link><a href="#realizacje">Realizacje</a><a href="#miasto">Kukurydze 2.0</a><Link href="/bialy/sklep-3d">Sklep 3D</Link><Link href="/bialy/kontakt">Kontakt</Link>
      </nav>
      <Link className="white-contact" href="/bialy/kontakt">Skontaktuj się <ArrowRight size={18} /></Link>
    </header>

    <section className="white-hero" id="start">
      <img src="/assets/bialy-hero-kuchnia.png" alt="Nowoczesna kuchnia w stylistyce KIM SILESIA" />
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
      {services.map(({image,alt,title,text}) => <article key={title}><img className="service-pictogram" src={image} alt={alt}/><div><h2>{title}</h2><p>{text}</p></div></article>)}
    </section>

    <section className="white-city" id="miasto">
      <div className="white-city-copy"><small>Nasza aktualna realizacja</small><h2>Kukurydze<br /><em>2.0</em></h2><div className="city-location">Osiedle Tysiąclecia · Katowice</div><i /><p>Projektujemy i realizujemy wnętrza w nowej odsłonie jednej z najbardziej charakterystycznych inwestycji Katowic.</p><Link className="white-outline" href="/bialy/mieszkaj-w-miescie">Poznaj inwestycję <ArrowRight size={18} /></Link></div>
      <figure><img src="/assets/mieszkaj-w-miescie.jpg" alt="Osiedle Mieszkaj w Mieście w Katowicach" /><figcaption>Twój<br />nowy adres<br />w mieście</figcaption></figure>
    </section>

    <section className="white-process" id="o-nas">
      <div className="process-intro"><h2>Jak<br />pracujemy?</h2><p>Prosty proces.<br />Jasne zasady.<br />Spokojna realizacja.</p></div>
      {process.map(({icon:Icon,no,title},i) => <article key={no}><b>{no}</b><Icon /><strong>{title}</strong>{i<3&&<ArrowRight className="process-arrow" />}</article>)}
    </section>

    <section className="white-gallery" id="realizacje">
      <div className="gallery-label"><b>Wybrane projekty i realizacje</b><a href="#kontakt">Zobacz więcej <ArrowRight size={16} /></a></div>
      <div>
        <figure><img src="/assets/realizacja-01.jpg" alt="Realizacja wnętrza KIM SILESIA 1" /></figure>
        <figure><img src="/assets/projekt-kuchni-02.png" alt="Projekt drewnianej kuchni KIM SILESIA" /></figure>
        <figure><img src="/assets/realizacja-03.jpg" alt="Realizacja wnętrza KIM SILESIA 3" /></figure>
        <figure><img src="/assets/projekt-kuchni-01.png" alt="Projekt wnętrza kuchni KIM SILESIA" /></figure>
      </div>
    </section>

    <section className="white-cta" id="kontakt"><h2>Porozmawiajmy<br />o Twoim projekcie.</h2><span /><p>Dobre wnętrza zaczynają się od rozmowy.<br />Skontaktuj się z nami i sprawdź, jak możemy Ci pomóc.</p><a className="white-outline" href="tel:+48881028373">Skontaktuj się <ArrowRight size={18} /></a></section>
    <footer className="white-footer"><img src="/assets/logo-kim-silesia-bialy.png" alt="KIM SILESIA" /><b>Profesjonalni w Twoich wnętrzach</b><span>Katowice</span><a href="tel:+48881028373">+48 881 028 373</a><Link href="/bialy/sklep-3d">Sklep 3D</Link><Link className="studio-footer-link" href="/studio">Studio</Link></footer>
  </main>;
}
