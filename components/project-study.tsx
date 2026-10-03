"use client";

import { useRef, useState } from "react";

export type ProjectStudyData = {
  id: string;
  number: string;
  title: string;
  description: string;
  photos: { src: string; label: string }[];
  heroIndex: number;
  details: { label: string; title: string; text: string }[];
  drawings: { label: string; src: string; pdf: string }[];
};

export function ProjectStudy({ project }: { project: ProjectStudyData }) {
  const modal = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(project.heroIndex);
  const hero = project.photos[project.heroIndex];
  function showPhoto(index: number) {
    setSelected(index);
    modal.current?.showModal();
  }
  return <section className="project-study" id={project.id} aria-labelledby={`${project.id}-title`}>
    <div className="study-intro">
      <div><small>SZCZEGÓŁY OPRACOWANIA · {project.number}</small><h2 id={`${project.id}-title`}>{project.title}.<br /><em>Od koncepcji do detalu.</em></h2></div>
      <div><p>{project.description}</p><div className="study-tags"><span>Aranżacja wnętrza</span><span>Zabudowa meblowa</span><span>Widoki techniczne</span></div></div>
    </div>
    <button className="study-hero" onClick={() => showPhoto(project.heroIndex)} aria-label={`Powiększ: ${hero.label}`}><img src={hero.src} alt={hero.label} loading="lazy" /><span>Powiększ wizualizację ↗</span></button>
    <p className="study-caption">{project.title} · wizualizacja projektowanego wnętrza</p>
    <div className="study-details">{project.details.map((detail, i) => <article key={detail.title}><small>0{i + 1} · {detail.label}</small><h3>{detail.title}</h3><p>{detail.text}</p></article>)}</div>
    <small>ARANŻACJA WNĘTRZA</small><h3 className="study-heading">{project.title} z różnych perspektyw.</h3>
    <div className="study-gallery">{project.photos.map((photo, i) => i === project.heroIndex ? null : <button className="study-photo" key={photo.src} onClick={() => showPhoto(i)}><img src={photo.src} alt={photo.label} loading="lazy" /><span><b>0{i + 1}</b>{photo.label}<i>↗</i></span></button>)}</div>
    <div className="study-technical"><div className="study-techhead"><div><small>DOKUMENTACJA PROJEKTOWA</small><h3 className="study-heading">Widoki ścian.</h3></div><p>Cztery opracowania pokazujące rozmieszczenie wyposażenia, podziały powierzchni i wymiary. Wybierz widok, aby otworzyć plik PDF.</p></div><div className="study-drawings">{project.drawings.map(drawing => <a className="study-drawing" key={drawing.label} href={drawing.pdf} target="_blank" rel="noreferrer"><img src={drawing.src} alt={`Widok techniczny ${drawing.label}`} loading="lazy" /><span><b>Widok {drawing.label}</b><i>Otwórz PDF ↗</i></span></a>)}</div></div>
    <dialog ref={modal} className="study-modal" onClick={event => { if (event.target === event.currentTarget) modal.current?.close(); }}><div className="study-modalbar"><span>{project.photos[selected].label}</span><button onClick={() => modal.current?.close()}>Zamknij ✕</button></div><img src={project.photos[selected].src} alt={project.photos[selected].label} /></dialog>
  </section>;
}
