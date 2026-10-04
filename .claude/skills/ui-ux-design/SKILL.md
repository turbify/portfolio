---
name: ui-ux-design
description: Projektowanie UI/UX sekcji, widoków i komponentów portfolio Eryka Sobczaka (game dev + grafika) PRZED napisaniem kodu. Użyj, gdy użytkownik prosi o zaprojektowanie, przemyślenie lub zmianę wyglądu, układu, hierarchii albo treści sekcji, strony projektu lub komponentu, a także gdy analizujemy referencje wizualne.
---

# UI/UX Design: portfolio2026

Celem jest krótka, konkretna **specyfikacja** zaakceptowana przed implementacją. Nie piszesz tu kodu produkcyjnego.

## 1. Kontekst (zawsze najpierw)

1. Przeczytaj `docs/design-system.md`: kierunek (§1), tokeny, komponenty, tryby `game`/`art`.
2. Sprawdź, czy komponent już istnieje (inwentarz w design systemie §9). Najpierw reuse.
3. Sprawdź „Frontend Design Rules” w `CLAUDE.md`.

## 2. Dla kogo projektujemy

Główny odbiorca to **rekruter lub lead zespołu, który ma 10–30 sekund**. Pytania kontrolne:

- Czy w pierwszym ekranie widać **kim jestem, co robię, gdzie pracowałem i jak się skontaktować**?
- Czy najmocniejszy dowód (wydana gra na Steam, firma) jest widoczny bez scrolla?
- Czy da się dojść do **kontaktu** jednym kliknięciem z każdego miejsca? (CV celowo nie jest linkowane ze strony.)
- Czy projekt w 3 sekundy mówi: **co to jest → moja rola → technologia → gdzie zobaczyć**?
- Tryb `art` (grafika) ma inny odbiorca (klient/agencja) i własny ton, ale ten sam system.

## 3. Heurystyki portfolio

- Treść przed dekoracją: zrzut ekranu z gry jest lepszy niż ikona czy ozdobnik.
- Konkret zamiast przymiotników: „całą architekturę od pierwszej linii kodu” > „pasjonat gier”.
- Żadnych niepotwierdzonych statystyk ani „wow” liczb bez źródła.
- Każdy kafel projektu prowadzi do czegoś realnego (podstrona, Steam, itch.io, GitHub, podgląd grafiki). Nigdy do „w budowie”.
- Osobowość dają naklejki, dymki i żart w mikrocopy, nie efekty (szkło, glow, gradienty).

## 4. Format specyfikacji (wynik skilla)

```markdown
## <Sekcja / komponent>

**Odbiorca i cel:** …
**Jedna główna akcja:** …
**Treść (priorytet):** 1. … 2. … 3. …
**Układ:** mobile (375) … | tablet (768) … | desktop (1440) …
**Komponenty:** istniejące … | nowe … (blok BEM, warianty)
**Tokeny:** tylko nazwy tokenów
**Tryby:** co się zmienia w `game` vs `art`
**Interakcje i JS:** … (albo „brak, czysty CSS”)
**Dostępność:** nagłówki, klawiatura, aria, kontrast
**Otwarte pytania:** …
```

Gdy potrzebny jest podgląd, zrób szkic HTML w scratchpadzie, zanim wejdziesz w kod projektu.
Po akceptacji przejdź do skilla `frontend-html-css`.
