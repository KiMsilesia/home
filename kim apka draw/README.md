# KiMapka Draw — beta 0.3

Inwentaryzacja pomieszczeń na telefon, tablet i komputer. Źródła przeniesione z działającej bety 0.2 do osobnego katalogu `kim apka draw`.

**Stan:** kod i migracja są gotowe do konfiguracji. Produkcyjna baza Supabase nie została podłączona; `dist/config.js` ma puste ustawienia. Bez nich aplikacja pokazuje ekran konfiguracji i nie udaje działającego logowania. Dodanie folderu do repozytorium nie publikuje nowej strony ani nie uruchamia kont.

## Co zawiera 0.3

- Logowanie e-mail/hasło, rejestracja, potwierdzenie adresu oraz odzyskiwanie hasła przez Supabase Auth.
- Nowe konta oczekują na zatwierdzenie. Panel administratora: lista kont i liczba projektów, zatwierdzanie/odblokowanie oraz blokowanie użytkowników.
- Prywatne projekty: RLS i funkcje SQL pilnują właściciela oraz aktywności konta po stronie bazy. Administrator aplikacji nie otrzymuje odczytu cudzych pomiarów. Właściciel infrastruktury Supabase ma uprawnienia administracyjne do bazy — nie jest to szyfrowanie end-to-end.
- Zapis po 1,5 sekundy bez edycji i przycisk „Zapisz”. Kontrola wersji chroni przed cichym nadpisaniem zmian z telefonu/tabletu. Przycisk „Wczytaj chmurę” odświeża projekt; przy konflikcie najpierw pobierz JSON swoich zmian.
- Sesja w sessionStorage danej karty, bez trwałego cache projektów na współdzielonym urządzeniu. Wylogowanie czyści edytor i dostępne dane aplikacji. Ochrona konta nie polega na ukryciu linku.
- Dotychczasowa geometria, obrysy L/U, przyciąganie, wymiary z działaniami, sufity/podłogi, nazwy elementów, LAN/RTV/SAT/smart, podgląd 3D, JSON/PDF i eksport OBJ dla PRO100.

## Koszty i ograniczenia — zanim uruchomisz

Nie aktywowano płatnych usług. Supabase Free jest bezpłatny w limitach: 500 MB bazy, 50 000 aktywnych użytkowników miesięcznie, 5 GB transferu, 2 aktywne projekty infrastruktury. Projekt Free może być wstrzymany po tygodniu nieaktywności; nie obejmuje automatycznych kopii bazy. Warunki sprawdzono 1.11.2026: https://supabase.com/pricing

Ta beta zapisuje zdjęcia wewnątrz JSON w **bazie**, nie w osobnym Storage. Wprowadzono limit 5 MB/projekt oraz 20 MB i 100 projektów/konto, egzekwowany również przez SQL. To ogranicza zużycie, ale nie gwarantuje zmieszczenia całej aplikacji w darmowym limicie przy większej liczbie kont. Usuwanie/archiwum i historia wersji pomiarów nie są jeszcze wdrożone. Regularnie eksportuj JSON. Historia Git obejmuje kod, nie pomiary.

Domyślny serwer e-mail Supabase nadaje się do testów z adresami zespołu, a nie obsługi dowolnych klientów. Przed rejestracją klientów skonfiguruj własne SMTP i sprawdź cenę dostawcy, limity oraz ochronę przed spamem. Nie wyłączaj potwierdzania adresów w publicznej aplikacji. Dokumentacja: https://supabase.com/docs/guides/auth/auth-smtp

Hosting strony jest osobnym wyborem. Nie uruchamiaj komercyjnej aplikacji logowania na GitHub Pages — ograniczenia: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits . GitHub w tym rozwiązaniu przechowuje źródła. Darmowy plan wybranego hostingu musi dopuszczać to zastosowanie; płatny hosting/SMTP/plan Supabase wymaga wcześniejszej zgody właściciela.

Bezpłatna alternatywa bez kont: dotychczasowa beta 0.2 i ręczny eksport/import JSON. Beta 0.3 wymaga sieci do otwarcia i zapisu projektów. Przy utracie sieci otwarty projekt można dalej edytować i eksportować JSON, ale zamknięcie/odświeżenie karty przed zapisem utraci te niezapisane zmiany. Pełny offline nie jest zaimplementowany.

## Uruchomienie przez administratora

1. Utwórz projekt **Supabase Free** na swoim koncie. Nie włączaj planu płatnego.
2. W SQL Editor uruchom `supabase/migrations/001_beta03.sql` jeden raz. Migracja tworzy osobne tabele `kim_profiles` i `kim_projects` oraz funkcje `kim_*`.
3. W Authentication włącz potwierdzanie e-mail, ustaw minimum 12 znaków hasła i skonfiguruj SMTP przed zaproszeniem osób spoza zespołu. Dodaj dokładny HTTPS URL aplikacji w Site URL i Redirect URLs. Nie używaj szerokich wildcardów w produkcji.
4. Uzupełnij `dist/config.js`: Project URL oraz **publishable key / legacy anon key**. Są to publiczne dane połączenia. Nigdy nie wpisuj `service_role`, `sb_secret_`, hasła bazy ani hasła SMTP do przeglądarki lub GitHuba.
5. Pierwsze konto administratora utwórz i potwierdź przez Auth. Sprawdź jego UUID w panelu, następnie w zaufanym SQL Editor wykonaj (zastąp UUID):

```sql
update public.kim_profiles
set role = 'admin', status = 'active'
where id = 'TU-UUID-ZWERYFIKOWANEGO-KONTA'::uuid;
```

Nie ma domyślnego hasła ani reguły „pierwszy użytkownik zostaje administratorem”. Panel nie pozwala nadać sobie roli ani blokować kont administratorów. Awaryjne zarządzanie administratorami wykonuje właściciel Supabase w SQL Editor.

6. Opublikuj katalog `dist` na uzgodnionym hostingu HTTPS. Nie publikuj całego repozytorium jako katalogu aplikacji. Ustaw na hostingu `Cache-Control: no-store` dla `index.html` i `config.js`, `X-Content-Type-Options: nosniff` i `Referrer-Policy: same-origin`.
7. Zaloguj się administratorem. Z osobnego konta zarejestruj użytkownika, potwierdź e-mail, zatwierdź go w panelu. Przetestuj logowanie, zapis, wylogowanie, odzyskiwanie hasła, dostęp z telefonu/tabletu oraz blokadę przed dopuszczeniem klientów. Odzyskiwanie hasła PKCE wymaga otwarcia linku w przeglądarce, w której zamówiono reset.

## Przeniesienie własnych pomiarów z bety 0.2

W **dotychczasowej przeglądarce i pod dotychczasowym adresem** otwórz każdy projekt i pobierz Eksport JSON. Po aktywacji konta 0.3 użyj Import JSON. Import tworzy nowy projekt; nie nadpisuje istniejącego. Plików pomiarowych i zdjęć nie dodawaj do publicznego repozytorium. Aplikacja celowo nie odczytuje automatycznie lokalnych projektów innego użytkownika ani nie wysyła ich do chmury.

## Budowanie i testy

Node.js 22+; polecenia uruchamiaj z katalogu `kim apka draw`:

```sh
npm ci
npm run build
npm test
python3 -m http.server 4173 --directory dist
```

`dist/supabase-client.js` to lokalny bundle przypiętego SDK; nie jest pobierany z CDN przy logowaniu. `scripts/build.cjs` odtwarza go z lockfile. Testy SQL uruchamiają prawdziwy silnik PostgreSQL w PGlite z testowymi rolami Auth. Obejmują izolację właścicieli, odmowę uprawnień, blokowanie kont, konflikt rewizji i limity. Testy DOM sprawdzają ścieżkę logowania oraz czyszczenie interfejsu po wylogowaniu; nie zastępują testów w rzeczywistej przeglądarce i na żywym Supabase.

Nie wykonano testu produkcyjnego logowania/SMTP bez podłączonej usługi. Eksport PRO100 pozostaje wymianą OBJ/MTL/CSV, a nie natywnymi parametrycznymi obiektami programu. Odczyt dalmierza jest eksperymentalny i wymaga potwierdzenia wyniku.
