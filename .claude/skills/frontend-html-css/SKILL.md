---
name: frontend-html-css
description: Implementacja portfolio2026 w semantycznym HTML, natywnym CSS (tokeny, @layer, BEM) i vanilla JS (klasyczny skrypt), bez builda. Użyj przy każdej edycji index.html, styles/, scripts/ i podstron w projects/.
---

# Frontend HTML/CSS/JS: portfolio2026

Zasady nadrzędne są w `CLAUDE.md`, wartości w `docs/design-system.md`. Ten skill opisuje **jak** implementować.

## Stos i ograniczenia

- Strona statyczna na **GitHub Pages**, bez bundlera i bez npm. To, co jest w repo, trafia na produkcję 1:1.
- CSS: `styles/tokens.css` → `base.css` → `layout.css` → `components.css` → `sections.css` (osobne `<link>`, żadnych `@import`, żeby nie było kaskady żądań).
- JS: `scripts/main.js` jako zwykły `<script defer>` (IIFE). **Bez ES modules**: przy otwieraniu `index.html` z dysku (`file://`) przeglądarka je blokuje i nic nie działa. Przełącznik trybu ma mały skrypt inline w `<head>`, żeby nie było mignięcia złego trybu.
- Fonty: Google Fonts (Bricolage Grotesque + DM Sans), tylko używane grubości.
- Podgląd lokalny: `.claude/launch.json` (serwer w PowerShell, port 8080). Strona musi działać też po otwarciu z dysku (`file://`); podgląd w panelu przeglądarki pokazuje `file://` tylko jako statyczną migawkę, więc testuj na serwerze.

## Checklista przed kodem

- [ ] Jest specyfikacja (skill `ui-ux-design`) albo zmiana jest trywialna
- [ ] Znam tokeny; brakujący token dodaję najpierw do `tokens.css` i design systemu
- [ ] Sprawdziłem, czy komponent już istnieje

## CSS

```css
.project-card {
  display: grid;
  gap: var(--space-s);
  color: var(--color-on-panel);

  @media (hover: hover) {
    &:hover .project-card__media img {
      scale: 1.03;
    }
  }
}

.project-card__title {
  font: var(--weight-heavy) var(--text-l) / 1.1 var(--font-display);
}

.project-card--featured {
  grid-column: 1 / -1;
}
```

- BEM: `.block`, `.block__element`, `.block--modifier`. Maks. jedna klasa + stan/pseudoklasa.
- **Zero surowych wartości poza `tokens.css`** (kolory, odstępy, rozmiary fontów, promienie, czasy).
- Tryby: `html[data-mode='game' | 'art']` przełącza **tylko tokeny** i widoczność `[data-show]`. Komponenty nie znają trybu.
- Stany przez atrybuty: `[aria-pressed]`, `[aria-expanded]`, `[data-state]`.
- Mobile-first, `@media (width >= 48em)`, właściwości logiczne.
- Animacje tylko `transform`/`opacity`/`translate`/`rotate`/`scale`, zawsze z `prefers-reduced-motion`.
- Bez `!important`, bez `style=""` w HTML, bez selektorów `#id`.

## HTML

- Landmarki `header`, `nav`, `main`, `footer`; jeden `h1` (treść zależna od trybu siedzi w `<span data-show>` wewnątrz jednego `h1`).
- Kafel projektu to `<article>` z jednym `<a>` rozciągniętym na cały kafel. Link działa bez JS (podstrona albo zewnętrzny URL); JS tylko przechwytuje go do `<dialog>`.
- Obrazy: `alt`, `width`, `height`, `loading="lazy"` poniżej pierwszego ekranu. Kafle używają miniatur z `assets/thumbs/` (JPEG ≤ 1200 px); oryginał tylko w podglądzie.
- Linki zewnętrzne: `target="_blank" rel="noopener"` i informacja dla czytnika („otwiera się w nowej karcie”) w `visually-hidden`.
- Ozdoby (naklejki) mają `aria-hidden="true"`.

## JavaScript

```js
// Inside the IIFE in scripts/main.js
/** Opis funkcji. Markup: [data-foo] > [data-foo-item] */
function initFoo() {
  var root = document.querySelector('[data-foo]');
  if (!root) return;
  // …
}

initFoo(); // on the list at the bottom of the IIFE
```

- Jedna funkcja = jedno `init*()`, kończy działanie przy braku roota, wywołana na dole IIFE w `main.js`.
- Obietnice z API przeglądarki (np. `startViewTransition`) zawsze z `.catch`, żeby nie było błędów w konsoli.
- Hooki DOM przez `data-*`, nigdy przez klasy CSS. Bez globali i inline handlerów (`onclick`).
- `localStorage` zawsze w `try/catch`.

## Nowa miniatura

W PowerShell (System.Drawing) zmniejsz do 1200 px szerokości, JPEG q80, zapisz w `assets/thumbs/<nazwa>.jpg`. Wpisz prawdziwe `width`/`height` do `<img>`.

## Po implementacji

1. Podgląd (`preview_start dev`) na **375, 768 i 1440 px** w obu trybach; 320 px bez poziomego scrolla.
2. Tab przez stronę: widoczny focus, dialog zamyka się Esc i oddaje focus.
3. Konsola bez błędów.
4. Przed commitem skill `frontend-review`.
