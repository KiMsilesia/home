import Link from "next/link";
import { ArrowUpRight, MessageCircle, Phone, Mail } from "lucide-react";
import { Logo } from "@/components/site-shell";

export default function QrPage() { return <main className="qr-page"><div className="qr-panel"><Logo /><p className="eyebrow">Projekt · wykonanie · meble</p><h1>Jak możemy pomóc?</h1><div className="qr-links"><Link href="/mieszkaj-w-miescie">Mieszkaj w Mieście <ArrowUpRight /></Link><Link href="/#uslugi">Poznaj nasze usługi <ArrowUpRight /></Link><Link href="/#realizacje">Zobacz realizacje <ArrowUpRight /></Link><a href="https://wa.me/48881028373"><MessageCircle /> Napisz na WhatsApp <ArrowUpRight /></a><a href="tel:+48881028373"><Phone /> Zadzwoń <span>881 028 373</span></a><a href="mailto:kim.katowice@gmail.com"><Mail /> Napisz e-mail <ArrowUpRight /></a></div><small>KIM SILESIA · Katowice i Śląsk</small></div></main>; }
