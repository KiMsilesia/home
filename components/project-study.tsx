"use client";

import { useRef, useState } from "react";

export type ProjectStudyData = {
  example?: boolean;
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
  const [selected, setSelected] = useState<{ src: string; label: string }>(project.photos[project.heroIndex]);
  const hero = project.photos[project.heroIndex];
  function showPhoto(index: number) {
    setSelected(project.photos[index]);
    modal.current?.showModal();
  }
  return <section className="project-study" id={project.id} aria-labelledby={`${project.id}-title`}>
    <div className="study-intro">
      <div><small>SZCZEGÓŁY OPRACOWANIA · {project.number}</small><h2 id={`${project.id}-title`}>{project.title}.<br /><em>Od koncepcji do detalu.</em></h2></div>
      <div><p>{project.description}</p><div className="study-tags"><span>Aranżacja wnętrza</span><span>Zabudowa meblowa</span><span>{project.example ? "Przykładowa aranżacja" : "Widoki techniczne"}</span></div></div>
    </div>
    <button className="study-hero" onClick={() => showPhoto(project.heroIndex)} aria-label={`Powiększ: ${hero.label}`}><img src={hero.src} alt={hero.label} loading="lazy" /><span>Powiększ wizualizację ↗</span></button>
    <p className="study-caption">{project.title} · {project.example ? "grafika przykładowa — do zastąpienia właściwym projektem" : "wizualizacja projektowanego wnętrza"}</p>
    <div className="study-details">{project.details.map((detail, i) => <article key={detail.title}><small>0{i + 1} · {detail.label}</small><h3>{detail.title}</h3><p>{detail.text}</p></article>)}</div>
    {project.photos.length > 1 && <><small>ARANŻACJA WNĘTRZA</small><h3 className="study-heading">{project.title} z różnych perspektyw.</h3>
    <div className="study-gallery">{project.photos.map((photo, i) => i === project.heroIndex ? null : <button className="study-photo" key={photo.src} onClick={() => showPhoto(i)}><img src={photo.src} alt={photo.label} loading="lazy" /><span><b>0{i + 1}</b>{photo.label}<i>↗</i></span></button>)}</div>
    </>}
    {project.drawings.length > 0 ? <div className="study-technical"><div className="study-techhead"><div><small>DOKUMENTACJA PROJEKTOWA</small><h3 className="study-heading">Widoki ścian.</h3></div><p>Cztery opracowania pokazujące rozmieszczenie wyposażenia, podziały powierzchni i wymiary. Wybierz miniaturę, aby otworzyć powiększony widok z wymiarami.</p></div><div className="study-drawings">{project.drawings.map(drawing => <button className="study-drawing" key={drawing.label} onClick={() => { setSelected({ src: drawing.src, label: `Widok ${drawing.label} · wymiary` }); modal.current?.showModal(); }}><img src={drawing.src} alt={`Widok techniczny ${drawing.label}`} loading="lazy" /><span><b>Widok {drawing.label}</b><i>Powiększ JPG ↗</i></span></button>)}</div></div> : <aside className="study-documentation-note"><small>DOKUMENTACJA PROJEKTOWA</small><h3 className="study-heading">Miejsce na właściwe opracowanie.</h3><p>W tej sekcji dodamy docelowe wizualizacje oraz widoki ścian z wymiarami. Prezentowane grafiki służą jako przykład aranżacji.</p></aside>}
    <dialog ref={modal} className="study-modal" onClick={event => { if (event.target === event.currentTarget) modal.current?.close(); }}><div className="study-modalbar"><span>{selected.label}</span><button onClick={() => modal.current?.close()}>Zamknij ✕</button></div><img src={selected.src} alt={selected.label} /></dialog>
  </section>;
}
