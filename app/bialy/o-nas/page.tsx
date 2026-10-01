import Link from "next/link";
import { ArrowRight, Factory, Hammer, ShieldCheck } from "lucide-react";
import { WhiteFooter, WhiteHeader } from "../white-shell";

const projects=[
 {image:"/assets/realizacja-01.jpg",title:"Łazienka",text:"Nowoczesne rozwiązania i eleganckie detale."},
 {image:"/assets/projekt-kuchni-01.png",title:"Kuchnia na wymiar",text:"Funkcjonalność spotyka styl."},
 {image:"/assets/realizacja-03.jpg",title:"Strefa dzienna",text:"Spójna przestrzeń do codziennego życia."},
];

export default function AboutPage(){return <main className="white-site about-reference"><WhiteHeader/>
  <section className="about-hero-new">
    <article><small>O nas <i/> KIM SILESIA</small><h1>Od odbioru<br/>do gotowego wnętrza.</h1><p>Sprawdzamy mieszkania przed zakupem od dewelopera, projektujemy wnętrza, kuchnie i meble oraz produkujemy zabudowy na wymiar. Prowadzimy także remonty i kompleksowe prace wykończeniowe.</p><div className="about-stat"><strong>15</strong><b>lat<br/>doświadczenia</b><span>Jeden zespół.<br/>Pełna odpowiedzialność za cały proces.</span></div><div className="about-actions"><a href="#projekty">Zobacz projekty <ArrowRight/></a><Link href="/bialy/kontakt">Porozmawiajmy</Link></div></article>
    <figure><img src="/assets/projekt-kuchni-02.png" alt="Projekt kuchni KIM SILESIA"/><figcaption>Dobrze<br/>mieszkać</figcaption></figure>
  </section>

  <section className="about-projects" id="projekty"><header><div><small>Od koncepcji po wykonanie</small><h2>Projekty i realizacje</h2></div><p>Projektujemy z myślą o późniejszym wykonaniu. Łącząc wiedzę projektową, produkcję mebli i doświadczenie remontowe, tworzymy rozwiązania funkcjonalne, wykonalne i dopasowane do budżetu.</p><a href="/bialy#realizacje">Zobacz więcej projektów <ArrowRight/></a></header><div className="about-project-grid">{projects.map(project=><article key={project.title}><img src={project.image} alt={project.title}/><div><h3>{project.title}</h3><p>{project.text}</p><ArrowRight/></div></article>)}</div></section>

  <section className="about-benefits"><article><ShieldCheck/><div><h3>Bezpieczny zakup</h3><p>Techniczne sprawdzenie mieszkania od dewelopera.</p></div></article><article><Factory/><div><h3>Projekt i produkcja</h3><p>Wnętrza, kuchnie i własne meble na wymiar.</p></div></article><article><Hammer/><div><h3>Pełne wykończenie</h3><p>Remont, koordynacja i realizacja pod jednym nadzorem.</p></div></article><div className="benefit-signature">Jeden partner<br/>cały proces</div></section>
  <WhiteFooter/>
 </main>}
