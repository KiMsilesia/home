# Beta 0.3 — 1.11.2026

Logowanie i reset hasła Supabase Auth, konta oczekujące, panel zatwierdzania i blokowania. Prywatny zapis z RLS, kontrolą wersji i limitami wielkości; eksport JSON pozostaje kopią użytkownika. Kod przeniesiony do `KiMsilesia/home/kim apka draw`. Backend wymaga aktywacji zgodnie z README. Nie uruchomiono płatnych usług ani produkcyjnej bazy.

## BETA 0,2 — działania w komórkach wymiarowych

- Pola wymiarów, położeń, odcinków obrysu i otwarć obsługują +, −, *, /, nawiasy, opcjonalne = oraz przecinek dziesiętny. Enter lub zmiana fokusu zatwierdza wynik w mm, do 0,001 mm.
- Bez eval: parser arytmetyczny odrzuca kod, błędny zapis i dzielenie przez zero. Dotychczasowe kontrole geometrii i zakresu pozostają.
- Testy parsera i przepływu zatwierdzania/odrzucania przeszły; bez końcowej weryfikacji przeglądarkowej (wcześniejsza blokada środowiska).

## BETA 0,2 — powiększenie obrysu

- Powiększ obrys: edytowalny widok na cały obszar okna, zoom 100–1200%, przyciski +/− i Dopasuj, kółko oraz pinch, przesuwanie tła.
- Opisy i uchwyty zachowują czytelny rozmiar podczas zoomu; opcja „Tylko wybrany wymiar” ukrywa pozostałe linie wymiarowe.
- Pole długości aktywnego odcinka w powiększeniu; ten sam szkic i podświetlenie, bez duplikowania danych.
- Testy kotwicy zoomu, limitów, resetu i rozmiaru opisów na telefonie przeszły; bez weryfikacji gestów w przeglądarce (wcześniejsza blokada środowiska).

## BETA 0,2 — rozdzielony eksport PRO100

- Pakiet ZIP: OBJ + MTL, unikatowy materiał dla każdej ściany, powierzchni, przeszkody i punktu. Import z opcją „Rozdziel bryły po materiale”.
- Punkty jako krzyżyki; osobne czerwone znaczniki REF 5 mm mają minimalny narożnik dokładnie w zmierzonym punkcie.
- Osobne OBJ/MTL każdego obiektu w lokalnym układzie oraz tabele CSV pozycji i punktów; instrukcja korekty przesunięcia importera.
- To siatki, nie natywne obiekty parametryczne. Import i przyciąganie w PRO100 niezweryfikowane; źródło formatu: FAQ ECRU.
- Testy materiałów, rozdzielonych indeksów, położeń REF dla ścian/podłogi/sufitu i ZIP (niezależny parser Python) przeszły.

## BETA 0,2 — precyzyjna edycja obrysu

- Przyciąganie poziom/pion włączone domyślnie; ruch narożnika i edycja długości zachowują istniejące osie przez przesuwanie powiązanych narożników. Można wyłączyć dla skosów.
- Każdy odcinek ma edytowalną długość w mm, linię wymiarową i literę. Fokus komórki lub kliknięcie odcinka podświetla odpowiadającą ścianę i wiersz.
- Rysunek i wszystkie powiązane wymiary odświeżają się podczas przeciągania; niepoprawny ruch jest wycofywany.
- Testy geometrii prostokąta/L/U, każdej długości, skosów i przyciągania przeszły. Podgląd przeglądarkowy niedostępny z powodu blokady środowiska zgłoszonej wcześniej.

## BETA 0,2 — orbita i PRO100

- Orbita 360 stopni przeciąganiem, dotyk, kółko/pinch zoom, przesuwanie Shift/dwa palce, klawiatura i reset.
- Eksport OBJ w mm (Y pionowo), pokój lub cały lokal; triangulacja obrysów wklęsłych, otwory drzwi/okien i otwarte granice, umowna grubość ścian na zewnątrz, opcjonalny sufit i znaczniki instalacji.
- OBJ jest modelem odniesienia bez metadanych pomiarowych i zdjęć. Weryfikacja struktury i geometrii testami; brak uruchomionego PRO100 do sprawdzenia importu końcowego.

## BETA 0,2 — dodatkowe gniazdka

- Osobne punkty LAN (RJ45), RTV (dwa złącza antenowe), SAT (złącze F) i smart (gniazdo z Wi-Fi).
- Własne piktogramy w edytorze, rysunkach, PDF i projekcji 3D; nazwy i rodzaje zachowane w zapisie i JSON.

# KiMapka — BETA 0,2

- Custom names for every element, preserved in drawings, JSON and printed reports.
- Multiple projects in IndexedDB, explicit save, save-as-copy, reopen, JSON import/export. Legacy 0.105 JSON and local data migrate without deleting the old storage entry.
- Independent floor and ceiling inventory with common top-view X/Y orientation. Z means height from floor or drop from ceiling.
- Arbitrary simple polygon boundaries (3–32 vertices), rectangle/L/U/trapezoid presets, coordinate editing and vertex dragging.
- Full walls, wholly open boundaries, or one full-height open interval per edge. Geometry changes validate existing elements instead of deleting them.
- SVG model follows polygons, openings and floor/ceiling items. Reference wall planes have no modeled wall thickness; boundary joins retain the specified spacing.
- Original vector water, socket and loose-wire pictograms in 2D, 3D and print. Loose wire is a separate element type.

## Verification

`node tests/geometry.test.cjs` and `node tests/projects.test.cjs` pass. Browser checks covered legacy startup, L-room creation, partial opening, custom-name editing, floor pillar, ceiling light, explicit project save/name change, new-project creation and real JSON download. The real downloaded project passed the same import normalization used by the UI. Browser automation for the native file chooser timed out, so complete UI upload round-trip is not claimed.

## Beta limits

Projects are local to the current browser, not cloud-synchronized. Export JSON for transfer or a separate backup. Floor and ceiling are horizontal reference planes; local offsets and obstructions can be recorded per element, but sloping roofs are not modeled. OCR remains experimental.
