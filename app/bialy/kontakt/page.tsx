"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { WhiteFooter, WhiteHeader } from "../white-shell";

const variants = ["Standard", "Plus", "Premium"];

export default function ContactPage(){
 const [variant,setVariant]=useState("");
 useEffect(()=>{
  const selected=new URLSearchParams(window.location.search).get("wariant")?.toLowerCase();
  const match=variants.find(item=>item.toLowerCase()===selected);
  if(match)setVariant(match);
 },[]);
 function sendInquiry(event:FormEvent<HTMLFormElement>){
  event.preventDefault();
  const data=new FormData(event.currentTarget);
  const subject=`Zapytanie o wariant ${variant||"oferty"}`;
  const body=[
   `Imię i nazwisko: ${data.get("name")}`,
   `Telefon lub e-mail: ${data.get("contact")}`,
   `Wybrany wariant: ${variant||"Jeszcze nie wiem"}`,
   "",
   "Opis zapytania:",
   String(data.get("message")||""),
  ].join("\n");
  window.location.href=`mailto:kim.katowice@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
 }
 return <main className="white-site"><WhiteHeader/><section className="contact-layout"><div className="contact-navy"><small>Kontakt</small><h1>Zacznijmy<br/>od rozmowy.</h1><p>Opowiedz nam o mieszkaniu, planowanym terminie oraz zakresie prac. Wspólnie ustalimy najlepszy następny krok.</p><div className="contact-details"><a href="tel:+48881028373"><Phone/> <span><small>Telefon</small>+48 881 028 373</span></a><a href="mailto:kim.katowice@gmail.com"><Mail/> <span><small>E-mail</small>kim.katowice@gmail.com</span></a><div><MapPin/><span><small>Obszar działania</small>Katowice i województwo śląskie</span></div></div></div><div className="contact-image"><img src="/assets/realizacja-01.jpg" alt="Wnętrze KIM SILESIA"/><form className="contact-form" onSubmit={sendInquiry}><small>FORMULARZ ZAPYTANIA</small><h2>Opowiedz nam o swoim wnętrzu.</h2><div className="contact-form-row"><label>Imię i nazwisko<input name="name" type="text" autoComplete="name" required/></label><label>Telefon lub e-mail<input name="contact" type="text" required/></label></div><label>Interesujący wariant<select name="variant" value={variant} onChange={e=>setVariant(e.target.value)}><option value="">Jeszcze nie wiem</option>{variants.map(item=><option key={item} value={item}>{item}</option>)}</select></label><label>Zakres zapytania<textarea name="message" rows={5} placeholder="Napisz kilka słów o mieszkaniu, planowanym terminie i zakresie prac." required/></label><button type="submit">Wyślij zapytanie <ArrowRight size={18}/></button></form></div></section><WhiteFooter/></main>;
}
