import type { Metadata } from "next";
import { VariantDisclosure } from "../../components/variant-disclosure";
import { ProjectStudy, type ProjectStudyData } from "../../components/project-study";
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

const additionalProjects: ProjectStudyData[] = [
  {
    "id": "kuchnia",
    "number": "02",
    "title": "Kuchnia",
    "example": true,
    "description": "Przykładowa aranżacja: kuchnia. Sekcja pokazuje układ przyszłego opracowania dla Kukurydz 2.0; grafiki i opisy zostaną dopasowane do właściwego projektu.",
    "photos": [
      {
        "src": "/home/assets/projekt-kuchni-01.jpg",
        "label": "Zabudowa i strefa przygotowania"
      },
      {
        "src": "/home/assets/projekt-kuchni-02.jpg",
        "label": "Przykładowa zabudowa kuchenna"
      },
      {
        "src": "/home/assets/bialy-hero-kuchnia.jpg",
        "label": "Wyspa i blat roboczy"
      }
    ],
    "heroIndex": 0,
    "details": [
      {
        "label": "MATERIAŁY",
        "title": "Kaszmir i naturalne drewno",
        "text": "Przykładowe zestawienie jasnych frontów, drewna i trwałych powierzchni roboczych."
      },
      {
        "label": "FUNKCJA",
        "title": "Wygodna praca w kuchni",
        "text": "Strefy przechowywania, przygotowania i gotowania tworzą czytelny układ zabudowy."
      },
      {
        "label": "ŚWIATŁO",
        "title": "Oświetlenie blatu",
        "text": "Światło pod szafkami i nad wyspą podkreśla podziały oraz ułatwia codzienną pracę."
      }
    ],
    "drawings": []
  },
  {
    "id": "salon",
    "number": "03",
    "title": "Salon",
    "example": true,
    "description": "Przykładowa aranżacja: salon. Sekcja pokazuje układ przyszłego opracowania dla Kukurydz 2.0; grafiki i opisy zostaną dopasowane do właściwego projektu.",
    "photos": [
      {
        "src": "/home/assets/premium-wood-kitchen.jpg",
        "label": "Strefa dzienna z aneksem"
      },
      {
        "src": "/home/assets/realizacja-03.jpg",
        "label": "Przykładowa zabudowa strefy telewizyjnej"
      }
    ],
    "heroIndex": 0,
    "details": [
      {
        "label": "MATERIAŁY",
        "title": "Spójność strefy dziennej",
        "text": "Drewno, jasne powierzchnie i miękkie tkaniny łączą salon z pozostałymi pomieszczeniami."
      },
      {
        "label": "FUNKCJA",
        "title": "Wypoczynek i przechowywanie",
        "text": "Zabudowa meblowa porządkuje strefę telewizyjną i zapewnia miejsce na codzienne przedmioty."
      },
      {
        "label": "ŚWIATŁO",
        "title": "Nastrój i akcenty",
        "text": "Oświetlenie główne i delikatne podświetlenia tworzą różne scenariusze użytkowania."
      }
    ],
    "drawings": []
  },
  {
    "id": "hol",
    "number": "04",
    "title": "Hol",
    "example": true,
    "description": "Przykładowa aranżacja: hol. Sekcja pokazuje układ przyszłego opracowania dla Kukurydz 2.0; grafiki i opisy zostaną dopasowane do właściwego projektu.",
    "photos": [
      {
        "src": "/home/assets/kukurydze/przyklady/hol.jpg",
        "label": "Przykładowa aranżacja holu"
      }
    ],
    "heroIndex": 0,
    "details": [
      {
        "label": "MATERIAŁY",
        "title": "Jasne fronty i drewno",
        "text": "Przykładowe połączenie neutralnych frontów z drewnianymi detalami."
      },
      {
        "label": "FUNKCJA",
        "title": "Szafa, siedzisko i lustro",
        "text": "Zabudowa przy wejściu łączy przechowywanie odzieży z wygodnym miejscem do zmiany obuwia."
      },
      {
        "label": "ŚWIATŁO",
        "title": "Czytelna strefa wejścia",
        "text": "Światło przy lustrze i zabudowie podkreśla układ niewielkiej przestrzeni."
      }
    ],
    "drawings": []
  },
  {
    "id": "sypialnia",
    "number": "05",
    "title": "Sypialnia",
    "example": true,
    "description": "Przykładowa aranżacja: sypialnia. Sekcja pokazuje układ przyszłego opracowania dla Kukurydz 2.0; grafiki i opisy zostaną dopasowane do właściwego projektu.",
    "photos": [
      {
        "src": "/home/assets/kukurydze/przyklady/sypialnia.jpg",
        "label": "Przykładowa aranżacja sypialni"
      }
    ],
    "heroIndex": 0,
    "details": [
      {
        "label": "MATERIAŁY",
        "title": "Spokojne kolory i faktury",
        "text": "Jasne odcienie, drewno i miękkie tkaniny budują przytulną przestrzeń odpoczynku."
      },
      {
        "label": "FUNKCJA",
        "title": "Wypoczynek i garderoba",
        "text": "Łóżko, szafki nocne oraz zabudowa szafy tworzą przykładowy układ sypialni."
      },
      {
        "label": "ŚWIATŁO",
        "title": "Komfort wieczorem",
        "text": "Subtelne podświetlenia i światło przy łóżku uzupełniają oświetlenie dzienne."
      }
    ],
    "drawings": []
  }
];

const variantSpecifications = [
  {
    "title": "Prace wykończeniowe",
    "rows": [
      [
        "Instalacje elektryczne",
        "Bez przeróbek instalacji elektrycznych",
        "Pojedyncze adaptacje instalacji elektrycznych",
        "Dowolność aranżacji"
      ],
      [
        "Instalacje wodno-kanalizacyjne",
        "Bez przeróbek instalacji wodno-kanalizacyjnych",
        "Pojedyncze adaptacje instalacji wodno-kanalizacyjnych",
        "Dowolność aranżacji"
      ],
      [
        "Ściany i sufity",
        "Gładzie na ścianach i sufitach — wybiórczo, większe ubytki",
        "Pełne szpachlowanie Q1",
        "Dwukrotne szpachlowanie Q2"
      ],
      [
        "Wykończenie ścian i sufitów",
        "Malowanie ścian i sufitów na biało",
        "Malowanie ścian i sufitów — biały i kolor",
        "Malowanie, tynki, beton architektoniczny i inne"
      ],
      [
        "Podłogi",
        "Tradycyjne panele podłogowe",
        "Nowoczesne panele podłogowe",
        "Panele lub deski podłogowe"
      ],
      [
        "Płytki i posadzki",
        "Płytki ścienne i gresy do 100 zł/m²",
        "Płytki ścienne i gresy do 150 zł/m²",
        "Gresy, posadzki żywiczne i inne"
      ]
    ]
  },
  {
    "title": "Meble na wymiar",
    "rows": [
      [
        "Fronty",
        "Standardowe z płyty melaminowanej",
        "Akrylowe lub lakierowane",
        "Lakierowane, ryflowane, fornirowane, drewniane, ramki aluminiowe"
      ],
      [
        "Korpusy",
        "Białe",
        "Białe lub szare",
        "Dowolne, dopasowane do koloru frontów"
      ],
      [
        "Blaty",
        "Standardowe laminowane HPL, 38 mm",
        "Standardowe HPL, kompaktowe HPL",
        "Standardowe HPL, kompaktowe HPL, spiek, granit i inne"
      ],
      [
        "Szuflady",
        "Strong Max",
        "Strong Max, Blum",
        "Blum"
      ],
      [
        "Cargo",
        "O ile budżet pozwoli",
        "Tak",
        "Tak"
      ],
      [
        "Systemy narożne",
        "Półka",
        "Nerka, Magic Corner",
        "Nerka, Magic Corner"
      ],
      [
        "Oświetlenie LED",
        "Tak",
        "Tak",
        "Tak"
      ],
      [
        "Zawiasy",
        "Blum + Blumotion",
        "Blum + Blumotion",
        "Blum + Blumotion"
      ],
      [
        "Kosze do sortowania",
        "O ile budżet pozwoli",
        "Franke",
        "Franke"
      ]
    ]
  }
];

function VariantSpecification({ variant }: { variant: number }) {
  return <VariantDisclosure>
    {variantSpecifications.map(group => <section key={group.title}><h4>{group.title}</h4><dl>{group.rows.map(row => <div key={row[0]}><dt>{row[0]}</dt><dd>{row[variant + 1]}</dd></div>)}</dl></section>)}
  </VariantDisclosure>;
}

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
          <p>Inwentaryzacja jest podstawą opracowania aranżacji, zabudowy i prac wykończeniowych. Poniżej prezentujemy projekt łazienki; a dalej przykładowe aranżacje kuchni, salonu, holu i sypialni, przygotowane do rozwinięcia w kolejne opracowania.</p>
          <details className="apartment-area-note">
            <summary>Notatka · powierzchnie pomieszczeń</summary>
            <dl>{rooms.map(room => <div key={room.number}><dt>{room.name}</dt><dd>{room.area}</dd></div>)}</dl>
            <p>Razem: 67,80 m². Loggia: 32,38 m² — poza powierzchnią mieszkania.</p>
          </details>
          <Link className="apartment-plan-button" href="/kontakt">Zapytaj o swoje mieszkanie <ArrowRight size={18} /></Link>
        </aside>
      </div>
    </section>

    <section className="apartment-variants">
      <header><small>TRZY KIERUNKI ARANŻACJI</small><h2>Wybór oparty<br />na konkretnych rozwiązaniach.</h2><p>Dla klienta przygotujemy trzy warianty wykończenia zgodne ze standardami opisanymi w ofercie. Każdy wariant zostanie przedstawiony na osobnej grafice, aby ułatwić porównanie estetyki, materiałów i poziomu wykończenia.</p></header>
      <div className="apartment-variant-grid">
        <article><figure><img src={assetBase + "/assets/standard.jpg"} alt="Przykładowa wizualizacja wariantu Standard" /><figcaption>Wizualizacja przykładowa</figcaption></figure><div><span>01</span><small>WARIANT</small><h3>Standard</h3><p>Rozwiązania funkcjonalne, trwałe i racjonalnie dopasowane do założonego budżetu.</p><VariantSpecification variant={0} /></div></article>
        <article><figure><img src={assetBase + "/assets/plus.jpg"} alt="Przykładowa wizualizacja wariantu Plus" /><figcaption>Wizualizacja przykładowa</figcaption></figure><div><span>02</span><small>WARIANT</small><h3>Plus</h3><p>Równowaga między efektownym wyglądem, komfortem i rozsądnym wykorzystaniem budżetu.</p><VariantSpecification variant={1} /></div></article>
        <article><figure><img src={assetBase + "/assets/premium-wood-kitchen.jpg"} alt="Przykładowa wizualizacja wariantu Premium" /><figcaption>Wizualizacja przykładowa</figcaption></figure><div><span>03</span><small>WARIANT</small><h3>Premium</h3><p>Indywidualne rozwiązania, szlachetne materiały i maksymalnie dopracowany detal.</p><VariantSpecification variant={2} /></div></article>
      </div>
      <div className="apartment-selected-project">
        <div><small>PO WYBORZE WARIANTU</small><h3>Rozwinięty projekt aranżacyjny i techniczny</h3></div>
        <ul><li><b>01</b><a href="#lazienka">Projekt łazienki</a></li>{additionalProjects.map(project => <li key={project.id}><b>{project.number}</b><a href={`#${project.id}`}>Projekt: {project.title.toLowerCase()}</a></li>)}</ul>
        <p>Wybrany kierunek rozwiniemy w kompletną dokumentację potrzebną do prawidłowego wykonania wnętrza — od układu i materiałów po najważniejsze detale techniczne.</p>
      </div>
    </section>

    <nav className="study-room-nav" aria-label="Opracowania pomieszczeń"><a href="#lazienka">01 · Łazienka</a>{additionalProjects.map(project => <a key={project.id} href={`#${project.id}`}>{project.number} · {project.title}</a>)}</nav>
    <ProjectStudy project={bathroomProject} />
    {additionalProjects.map(project => <ProjectStudy key={project.id} project={project} />)}

    <section className="white-page-cta"><div><small>OD RZUTU DO REALIZACJI</small><h2>Sprawdźmy możliwości<br />Twojego mieszkania.</h2></div><p>Przeanalizujemy układ, instalacje, ergonomię i materiały, zanim rozpoczną się kosztowne prace.</p><Link className="white-outline" href="/kontakt">Umów konsultację <ArrowRight size={18} /></Link></section>
    <WhiteFooter />
  </main>;
}
