import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";

const navigation = [
  ["Strona główna", "/bialy"], ["O nas", "/bialy/o-nas"], ["Oferta", "/bialy/oferta"],
  ["Realizacje", "/bialy#realizacje"], ["Kukurydze 2.0", "/bialy#miasto"], ["Sklep 3D", "/bialy/sklep-3d"], ["Kontakt", "/bialy/kontakt"],
];

export function WhiteHeader(){return <header className="white-header white-inner-header"><Link href="/bialy" className="white-logo"><img src="/assets/logo-kim-silesia-bialy.png" alt="KIM SILESIA" /></Link><nav aria-label="Nawigacja wariantu białego">{navigation.map(([label,href])=><Link key={href} href={href}>{label}</Link>)}</nav><Link className="white-contact" href="/bialy/kontakt">Skontaktuj się <ArrowRight size={18}/></Link></header>}

export function WhiteFooter(){return <footer className="white-footer"><img src="/assets/logo-kim-silesia-bialy.png" alt="KIM SILESIA" /><b>Profesjonalni w Twoich wnętrzach</b><span>Katowice</span><a href="tel:+48881028373"><Phone size={14}/> +48 881 028 373</a><a href="mailto:kim.katowice@gmail.com"><Mail size={14}/> Napisz</a><Link href="/bialy/sklep-3d">Sklep 3D</Link><Link className="studio-footer-link" href="/studio">Studio</Link></footer>}

export function WhiteSubhero({eyebrow,title,text,image}:{eyebrow:string;title:React.ReactNode;text:string;image:string}){return <section className="white-subhero"><img src={image} alt=""/><div/><article><small>{eyebrow}</small><h1>{title}</h1><p>{text}</p></article></section>}
