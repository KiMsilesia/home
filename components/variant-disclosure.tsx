"use client";
import { useEffect, useId, useState, type ReactNode } from "react";

export function VariantDisclosure({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  useEffect(() => {
    const grid = document.querySelector<HTMLElement>(".apartment-variant-grid");
    if (!grid) return;
    let previousWidth = -1;
    const align = () => {
      const descriptions = Array.from(grid.querySelectorAll<HTMLElement>("article > div > p"));
      descriptions.forEach(p => { p.style.minHeight = ""; });
      if (!window.matchMedia("(max-width:650px)").matches) {
        const height = Math.max(...descriptions.map(p => p.getBoundingClientRect().height));
        descriptions.forEach(p => { p.style.minHeight = `${height}px`; });
      }
      const columns = Array.from(grid.querySelectorAll<HTMLElement>(".variant-specification-content"));
      const rows = columns.map(column => Array.from(column.querySelectorAll<HTMLElement>("dl > div")));
      rows.flat().forEach(row => { row.style.minHeight = ""; });
      if (window.matchMedia("(max-width:650px)").matches) return;
      for (let i = 0; i < (rows[0]?.length || 0); i++) {
        const height = Math.max(...rows.map(column => column[i]?.getBoundingClientRect().height || 0));
        rows.forEach(column => { if (column[i]) column[i].style.minHeight = `${height}px`; });
      }
    };
    const observer = new ResizeObserver(entries => {
      const width = entries[0].contentRect.width;
      if (width !== previousWidth) { previousWidth = width; align(); }
    });
    observer.observe(grid);
    align();
    document.fonts.ready.then(align);
    return () => observer.disconnect();
  }, []);
  return <div className="variant-specification" data-open={open}>
    <button type="button" className="variant-specification-toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
      <span aria-hidden="true">{open ? "−" : "+"}</span> Specyfikacja wariantu
    </button>
    <div id={id} className="variant-specification-panel" aria-hidden={!open} inert={!open}>
      <div className="variant-specification-content">{children}</div>
    </div>
  </div>;
}
