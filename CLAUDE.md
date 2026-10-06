# CLAUDE.md: portfolio2026

Portfolio Eryka Sobczaka w dwóch trybach: **Gry** (Unity / C# developer, domyślny) i **Grafika** (branding, identyfikacje).
Główny odbiorca to **rekruter, który ma 10–30 sekund**. Wygląd i czytelność są na pierwszym miejscu.

## Źródła prawdy

1. **`docs/design-system.md`**: kierunek wizualny, tokeny, komponenty, reguły (czytaj przed każdą pracą nad UI).
2. `styles/tokens.css`: jedyne miejsce z surowymi wartościami.
3. Skille w `.claude/skills/`: `ui-ux-design` (spec przed kodem) → `frontend-html-css` (implementacja) → `frontend-review` (przed commitem).

## Stos

| Obszar  | Wybór                                                                          |
| ------- | ------------------------------------------------------------------------------ |
| Hosting | GitHub Pages (`.github/workflows/static.yml`), repo publikowane 1:1, bez builda |
| Markup  | Semantyczny HTML5: `index.html`, `projects/*.html`                             |
| Style   | Natywny CSS: custom properties, `@layer`, nesting, BEM                         |
| Skrypty | Vanilla JS, jeden klasyczny skrypt `scripts/main.js` (`defer`, działa z file://) |
| Fonty   | Bricolage Grotesque (nagłówki) + DM Sans (tekst), Google Fonts                 |
| Podgląd | `.claude/podglad.cmd` (dwuklik) albo `.claude/launch.json` → `.claude/serve.ps1` (http://localhost:8080). Nie z `file://`: YouTube tam nie działa |

**Świadomie NIE używamy:** frameworków, bundlera, Tailwinda, jQuery, three.js ani bibliotek UI. Nowe zależności tylko po uzgodnieniu.

## Struktura

```
index.html                strona główna (oba tryby)
styles/
  tokens.css              kolejność warstw + WSZYSTKIE surowe wartości + tokeny trybów
  base.css                reset i style elementów
  layout.css              container, panel, section-head
  components.css          bloki BEM (button, bubble, sticker, project-card, gallery, viewer…)
  sections.css            site-header, hero, about, site-footer, wordmark + utilities
scripts/
  main.js                 IIFE: initModeSwitch, initVideos, initHeaderCorners, initNav, initViewer, initStickers (ładowany też na podstronach projektów)
projects/
  *.html                  case studies (ładowane też w <dialog> na stronie głównej)
  projects.css            style case studies (na bazie tych samych tokenów)
  gameimages/ gfximages/  oryginały grafik
  templates/              stare szablony, nieużywane
assets/
  thumbs/                 miniatury JPEG ≤1200 px do kafli
  case/                   zoptymalizowane JPEG ≤1600 px do case studies
cv/                       CV: NIE linkujemy go ze strony, jest wysyłane tylko bezpośrednim linkiem
```

## Frontend Design Rules

Strona **nie może wyglądać jak wygenerowana przez AI**. Nigdy:

- glassmorphism, `backdrop-filter` na kartach, neonowe glow, gradienty „dla ozdoby”
- ciemne tło + miętowy/fioletowy neon jako cały pomysł na styl
- pulsujące kropki, liczniki „73% klientów…” bez źródła, ikonki w kwadracikach nad każdym akapitem
- wszystko jako karta z cieniem i hover-lift
- pigułki na każdym przycisku, centrowanie wszystkiego
- Helvetica/Inter jako „brak decyzji”

Zawsze:

- kremowe tło strony, **duże zaokrąglone panele koloru** z ramką od krawędzi ekranu (kierunek: referencja „truus”)
- tryb Grafika: biało-żółty, panele jako białe kartki z delikatnym cieniem (jedyny dozwolony cień), hero bez imienia („Daj się rozpoznać.”)
- hero minimalne: h1 + jedno naturalne zdanie + CTA + wideo wyróżnionego projektu (Pushout, YouTube facade); bez listy faktów i bez dymka „dostępny do pracy”
- ciężka, zwarta typografia nagłówków i dymki-etykiety nad nimi
- osobowość przez **naklejki** (kilka, celowo), mikrocopy z żartem i wordmark w stopce
- treść rekrutacyjna w pierwszym ekranie: kim jestem, najlepszy projekt, kontakt; szczegóły (firmy, liczby) w kaflach i „O mnie”
- zrzuty z gier zamiast ozdobników; konkret zamiast przymiotników

**Treść do uzupełnienia** oznaczamy `<span class="todo">(z) …</span>` (albo `.todo-block`) i dopisujemy do `docs/do-uzupelnienia.md`.
Nie wymyślamy faktów (ról, liczb, rozwiązań technicznych), których nie podał właściciel portfolio.

**Element, który wygląda na klikalny, musi być klikalny.** Kafel projektu zawsze prowadzi do czegoś realnego (nigdy do „w budowie”).

## Zasady kodu

- Kod (klasy, zmienne, pliki, komentarze) po angielsku; treść UI po polsku, forma „Ty”, krótko.
- **Zero surowych wartości poza `styles/tokens.css`.** Komponenty używają tylko tokenów semantycznych (`--color-*`).
- Tryby: `<html data-mode="game|art">` zmienia **tylko tokeny** i widoczność `[data-show]`. Komponenty nie znają trybu.
- BEM, stany w `aria-*`/`data-state`, mobile-first `@media (width >= 48em)`, właściwości logiczne.
- Bez `!important` (wyjątek: reset), `#id` w selektorach, `onclick`, `style=""`.
  Jedyny wyjątek od `style=""`: pozycje naklejek w stopce (`--x`, `--y`, `--r`).
- JS: bez ES modules (blokowane przy otwieraniu z dysku); jedna funkcja = jedno `init*()`, hooki `data-*`, `localStorage` w `try/catch`. Treść działa bez JS.
- Obrazy: `alt`, `width`, `height`, lazy poniżej pierwszego ekranu, miniatury z `assets/thumbs/`.
- Dostępność WCAG 2.2 AA: kontrast w obu trybach, widoczny focus, cele ≥ 44 px, `prefers-reduced-motion`.

## Workflow

1. Spec (skill `ui-ux-design`) dla nowej sekcji albo większej zmiany.
2. Implementacja (skill `frontend-html-css`).
3. Podgląd 375 / 768 / 1440 px w obu trybach, Tab przez stronę, konsola.
4. Review (skill `frontend-review`) przed commitem.
