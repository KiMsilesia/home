# KiMalarz

Browser-only photo compositing editor, Polish UI. Static assets live in `dist/`.

## Features
- Polygon surface masks with holes; wall and floor materials.
- Four independently draggable texture corners mapped with a projective homography. The mask remains fixed. Convexity checks reject crossing corners.
- Whole-photo fit using both viewport dimensions; view zoom 25–300% does not change export resolution. Input images are limited to 2000 px on their longer edge as in v1.
- Procedural wood, herringbone, tile, checkerboard and terrazzo materials; existing wall patterns retained.
- Furniture cutouts and SVG layout sketches; floor/pendant/wall lamp sketches and separately draggable light sources. Screen-blended glows expose power, radius and color. These are illustrative photo effects, not physical lighting simulations.
- Brightness 40–220%, shadow lift, saturation, original comparison, undo/redo, PNG export.
- JSON project v2 stores masks, perspective, lights and global adjustments. v1 projects remain accepted. Projects are explicitly saved as downloaded files, not automatically synced.

## Checks
`node --check dist/app.js`
`node tests/geometry.cjs`

Manual browser verification: corner drag and asymmetric stripes, perspective floor, lamp and light creation, brightness adjustment, v2 save/load, 800×1600 portrait upload fitting entirely within viewport, zoom and reset.

## Individual stripe editing (project v3)
Select a surface with the Stripes pattern, then “Edytuj pojedyncze pasy”. Conversion retains the current regular pattern. Each strip has its own width as a percentage of the pre-perspective pattern span and its own color. Increasing one width shifts later bands without rescaling them. Add, duplicate, delete, reorder, normalize total to 100%, return to regular mode, and undo are supported. Clicking the photographed surface selects a band through inverse projective/rotation mapping. Custom bands and their span are exported in project v3; v1/v2 projects remain readable. Other pattern types retain their existing controls.

`node tests/stripes.cjs` verifies conversion at multiple angles, independent band widths, selection boundaries and input validation. Browser checks cover numeric width entry, palette color change, duplication/deletion/undo and export.

## KiMalarz — 2026-11-08
Granatowy interfejs, nazwa KiMalarz w aplikacji i eksportach. Nowy wzór `herringboneXL`: duże deski o proporcji 5:1, delikatne usłojenie, sterowanie wielkością, obrotem, kolorami i perspektywą. Domyślny rozmiar 110. Eksport opisu AI dołącza szczegóły pasów tylko przy aktywnym wzorze Pasy.

Aplikacja jest statyczna, bez zależności do instalowania. Uruchom `python3 -m http.server 8080 --directory dist` i otwórz localhost:8080. Na GitHubie pliki produkcyjne są w `public/kimalarz/`, dokumentacja i testy w `kimalarz/`. Istniejący workflow GitHub Pages publikuje katalog public wraz z witryną Next.js.
