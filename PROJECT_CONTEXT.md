# KIM SILESIA — kontekst aktywnego projektu

Ten dokument jest głównym źródłem ustaleń dla budowy strony KIM SILESIA.
Materiały wejściowe zostały zachowane w `archive/initial-project-brief/`.

## Cel biznesowy

KIM SILESIA ma być przedstawiana jako profesjonalny partner prowadzący klienta przez cały proces realizacji wnętrza: kontrolę stanu, projekt, wykonawstwo, meble, nadzór i odbiór. Nie komunikować firmy jako „dużej”. Główne wartości to spójny proces, jeden standard odpowiedzialności, dopasowanie do budżetu i 15 lat doświadczenia.

## Marki

- Marka główna: KIM SILESIA.
- Marki pomocnicze: 3D SILESIA i Meble Szymkowiak.
- Marki pomocnicze nie mogą konkurować wizualnie z KIM SILESIA.
- Zatwierdzonego logo nie wolno przerysowywać ani generować. Używać materiału z archiwum, a docelowo pozyskać oryginalny SVG/PDF i wariant transparentny wysokiej jakości.

## Kontakt

- Marek Szymkowiak — Główny Projektant
- tel. +48 881 028 373
- e-mail: kim.katowice@gmail.com

## Kierunek wizualny

Nowoczesny, spokojny, architektoniczny premium. Dominują granat KIM SILESIA, biel, jasne neutralne szarości i grafit/antracyt. Ciepłe lub złote akcenty tylko oszczędnie. Duże zdjęcia, dużo przestrzeni, krótka treść, czysta typografia i maksymalnie 1–2 główne CTA w sekcji.

Unikać krzykliwych gradientów, przypadkowych ikon, nadmiaru kart, złota i marketingowej przesady.

Do ustalenia przed finalnym designem:
- dokładne kolory HEX/RGB,
- kroje i skala typografii,
- warianty i pole ochronne logo,
- system przycisków, formularzy i ikon,
- breakpointy oraz zasady responsywności.

## Ton treści

Profesjonalny, rzeczowy, spokojny i konkretny. Preferowane zwroty: „kompleksowa realizacja”, „dopasowanie do budżetu”, „jeden spójny proces”, „jeden standard odpowiedzialności”, „dopracowane detale”.

Nie używać: „najtańszy”, „tani wariant”, „duża firma”, niepotwierdzonych superlatywów i obietnic bez pokrycia.

## Strona główna

Preferowany porządek:
1. Hero: „Projekt. Wykonanie. Meble. Odbiór.”, 15 lat doświadczenia i dwa CTA.
2. Aktualny projekt: Mieszkaj w Mieście Katowice.
3. Cztery filary: projektowanie, meble na wymiar, wykonawstwo, odbiory techniczne.
4. Proces: Kontrola → Projekt → Wykonawstwo → Meble → Nadzór → Odbiór.
5. Wybrane realizacje.
6. Prosty blok kontaktowy.

## Mieszkaj w Mieście Katowice

To kluczowa strona sprzedażowa. Kolejność narracji:
1. rozpoznanie osiedla,
2. obietnica kompleksowego wnętrza,
3. trzy standardy,
4. konkretne różnice materiałowe,
5. realizacje lub prawidłowo oznaczone wizualizacje,
6. kontakt i umówienie prezentacji.

Warianty:
- Standard: płyta meblowa, blat laminowany, funkcjonalny standard i kontrolowany budżet; indeks 100.
- Plus: fronty lakierowane lub akrylowe w połysku, kompakt 12 mm, lepsze detale i spójne wykończenie wyspy oraz stołu; indeks 125–140. Może być rekomendowany jako najlepszy balans.
- Premium: fornir/naturalne materiały, kamień, spiek lub konglomerat oraz wysoka personalizacja; indeks 165–200.

Indeksy są porównawcze, nie są cenami. Przy każdym zestawieniu dodać informację, że dokładny koszt zależy od materiałów i wyposażenia.

## Funkcje docelowe

- Galeria realizacji z jednoznacznym statusem: realizacja wykonana, wizualizacja projektowa lub zdjęcie referencyjne.
- Interaktywny wybór materiałów oparty na zdjęciu bazowym i maskach frontów, blatu, boku wyspy i stołu. Ma uzupełniać pełne rendery, nie zastępować ich.
- Mobilna strona `/qr` oraz kampanie `/qr/katowice`, `/qr/meble`, `/qr/remont`, `/qr/odbior`.
- CTA: Zobacz możliwości, Umów prezentację, Porozmawiajmy o projekcie, Zapytaj o wycenę, Zobacz realizacje.

## Wymagania techniczne

- GitHub jako repozytorium i Vercel jako preferowany hosting.
- Mobile-first, semantyczne SEO, dostępność i wysoka wydajność.
- Obrazy WebP/AVIF, prawidłowe rozmiary i lazy loading.
- Żadnych sekretów i kluczy API w repozytorium.
- Do przygotowania: mapa strony, metadata SEO, formularz i ścieżka obsługi leadów, analityka za zgodą, polityka prywatności, plan testów, konfiguracja CI/deployment oraz budżet wydajności.

## Zasady publikacji

- Nie publikować orientacyjnych indeksów jako finalnego cennika.
- Nie przedstawiać wizualizacji jako wykonanej realizacji.
- Przed publikacją potwierdzić prawa do wszystkich zdjęć i materiałów.
- Repozytorium jest publiczne; nie umieszczać w nim danych, które powinny pozostać prywatne.
- Nie zastępować zatwierdzonych materiałów przypadkowymi lub generowanymi odpowiednikami.

## Najbliższa kolejność prac

1. Zatwierdzić mapę strony i ścieżki CTA.
2. Wybrać technologię aplikacji i utworzyć działający szkielet.
3. Uzupełnić tokeny marki oraz oryginalne pliki logo.
4. Zbudować stronę główną i stronę Mieszkaj w Mieście.
5. Uzupełnić treści, statusy zdjęć, SEO i dokumenty prawne.
6. Przetestować mobile, dostępność i wydajność.
7. Skonfigurować wdrożenie na Vercel.
