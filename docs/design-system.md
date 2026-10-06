# Design system: portfolio2026

## 1. Kierunek

Referencja: stopka studia „truus” — kremowy arkusz, duży zaokrąglony panel electric blue, ciężki grotesk,
dymki-etykiety nad treścią, naklejki i ogromny wordmark ucięty dolną krawędzią.

Przełożenie na portfolio:

- **Arkusz i panele.** Strona jest kremowa (`--color-page`). Sekcje-bohaterowie (projekty, kontakt) to panele
  koloru trybu z odstępem `--frame` od krawędzi i promieniem `--radius-panel`.
- **Typografia robi hierarchię.** Bricolage Grotesque 800 (nagłówki, wordmark) + DM Sans (tekst, UI).
- **Osobowość z umiarem.** Naklejki: 1–2 na widok treści (hero, róg zdjęcia), więcej tylko w stopce.
- **Rekruter najpierw, ale minimalnie.** Pierwszy ekran: h1 + jedno naturalne zdanie, CTA i zdjęcie wyróżnionego projektu
  (wideo Pushout z YouTube, naklejka „1665 graczy!”). Bez listy faktów i bez dymka „dostępny do pracy”. Pushout jest też pierwszym kaflem.
- **Stopka** kończy się napisem „do zobaczenia!” (wordmark), naklejki tylko lekko zachodzą na jego górną krawędź.
- **Favicon:** czerwona gwiazdka jak w logo (`assets/favicon.svg` + PNG 32 px i `apple-touch-icon.png`).
- **Hero w trybie Grafika** nie pokazuje imienia i nazwiska: h1 to „Daj się rozpoznać.”.

## 2. Tryby

`<html data-mode>` ustawia skrypt inline w `<head>` (hash `#gry`/`#grafika` > `localStorage` > `game`).

| Token              | `game`        | `art`         |
| ------------------ | ------------- | ------------- |
| `--color-panel`    | blue-500      | white (kartka papieru) |
| `--color-on-panel` | cream-50      | ink-900       |
| `--color-panel-chip` / `--color-on-panel-chip` | cream-50 / ink-900 | ink-900 / cream-50 |
| `--shadow-panel`   | none          | delikatny cień kartki na blacie |
| `--color-wordmark` | cream-50      | yellow-400    |
| `--color-accent`   | crimson-500 (#ff2140) | yellow-400    |
| `--color-on-accent`| ink-900       | ink-900       |

Tryb Grafika jest biało-żółty: panele to białe kartki z cieniem, akcent żółty (tylko jako tło pod czarnym tekstem).

Treść zależna od trybu: `data-show="game|art"` (ukrywanie w warstwie `utilities`).

## 3. Kolor

Prymitywy tylko w `tokens.css`. Zweryfikowane pary kontrastu:

| Tekst / tło              | Kontrast | Użycie                         |
| ------------------------ | -------- | ------------------------------ |
| ink-900 / cream-100      | ~16:1    | tekst strony                   |
| ink-600 / cream-100      | ~6.4:1   | tekst drugorzędny              |
| cream-50 / blue-500      | ~4.9:1   | tekst na panelu (gry)          |
| ink-900 / crimson-500    | ~4.8:1   | akcent (gry), naklejki; kremowy tekst na nim NIE (~3.7:1) |
| ink-900 / white          | ~18:1    | tekst na panelu (grafika)      |
| ink-900 / yellow-400     | ~12:1    | akcent (grafika)               |
| cream-50 / ink-900       | ~16:1    | przycisk primary, dymek        |

Na panelu **nie** używamy przygaszonego tekstu (opacity) — hierarchię daje rozmiar i grubość.
Paleta naklejek (`--color-sticker-*`) jest wyłącznie dekoracyjna.

## 4. Typografia

| Token          | Rozmiar                  | Użycie                          |
| -------------- | ------------------------ | ------------------------------- |
| `--text-wordmark` | clamp 3rem–12vw–15rem | „do zobaczenia!” w stopce (1 linia; tekst bez liter z ogonkiem w dół: y, g, j, p, ą, ę, bo dół jest przycięty) |
| `--text-3xl`   | clamp 3–7rem             | imię w hero                     |
| `--text-2xl`   | clamp 2.25–4rem          | `h2` sekcji, tytuł featured     |
| `--text-xl`    | clamp 1.5–2.125rem       | claim, tytuły kafli, stopka     |
| `--text-l`     | clamp 1.25–1.5rem        | lead, podtytuły                 |
| `--text-m`     | 1.0625rem                | tekst                           |
| `--text-s/xs`  | 0.9375 / 0.8125rem       | UI, meta, dymki                 |

Nagłówki: `--weight-heavy` (800), `--tracking-display` dla dużych rozmiarów.

## 5. Odstępy i kształt

Skala `--space-3xs … --space-2xl`, rytm sekcji `--space-section`, marginesy `--gutter`, ramka paneli `--frame`.
Promienie: `--radius-s` (dymki), `--radius-m` (przyciski), `--radius-l` (zdjęcia), `--radius-panel` (panele).
Pigułki (`--radius-pill`) tylko: przełącznik trybu, chipy technologii, okrągłe przyciski-ikony.
**Brak cieni** z jednym wyjątkiem: `--shadow-panel` w trybie Grafika (kartka papieru na blacie). Głębię dają kolor panelu i naklejki.

**Rogi panelu pod headerem.** `.site-header::before/::after` to maski w kolorze strony pod dolną krawędzią sticky headera:
panel przewijany pod nim zachowuje zaokrąglone górne rogi zamiast płaskiego cięcia.
W trybie Grafika łuk maski rysuje też ramkę i poświatę kartki (`--color-panel-edge`, `--color-panel-halo`,
nieprzezroczyste odpowiedniki `--shadow-panel`), żeby róg zgadzał się z bokami kartki.
Maski są widoczne tylko przy `.site-header[data-over-panel]`: atrybut ustawia `initHeaderCorners()` w `main.js`,
gdy panel przecina dolną krawędź headera. Nad zwykłym tłem strony nic się nie rysuje.
Cień kartki pada **tylko w dół** (ujemny spread znosi rozmycie na boki). Nie dodawaj cieni rozlewających się
na boki, bo przy headerze powstanie prosty pas cienia obok zaokrąglonego rogu.

## 6. Ruch

`--duration-fast/base/slow`, `--ease-out`, `--ease-spring` (sprężysty obrót naklejek i strzałek).
Tylko `transform`-owe właściwości (`rotate`, `scale`, `translate`) i `opacity`. Zmiana trybu: View Transitions API
(crossfade), wyłączona przy `prefers-reduced-motion`.

## 7. Komponenty

| Blok            | Opis                                                                                   |
| --------------- | -------------------------------------------------------------------------------------- |
| `button`        | `--primary` (ink), `--outline`, `--accent`, `--light` i `--on-panel` (na panelach), `--small` |
| `bubble`        | dymek-etykieta z ogonkiem; `--on-panel`, `--caption` (podpis zdjęcia) |
| `logo-burst`    | znak „esob” na gwiazdce (`--shape-burst`), kolor akcentu trybu                         |
| `mode-switch`   | segmentowy przełącznik Gry/Grafika, `aria-pressed`                                     |
| `site-nav`      | menu; mobile: rozwijany panel (`data-state`), od 56em w linii                           |
| `project-card`  | kafel projektu: jeden rozciągnięty link, strzałka, chipy; `--featured` poziomy od 64em  |
| `gallery`       | kolumnowa galeria prac graficznych, podgląd w `viewer`                                 |
| `tag-list`      | chipy technologii; `--plain` na kremowym tle                                           |
| `timeline`      | doświadczenie: kiedy / rola @ firma / opis                                             |
| `skills`        | lista narzędzi z poziomem                                                              |
| `quote`         | cytat z zakreślaczem w kolorze akcentu                                                 |
| `sticker`       | `--tag` (róg zdjęcia), `--burst`, `--bubble`, SVG (gizmo, serce, buźka, próbnik), `--float` (przeciągalne) |
| `social`        | kwadratowe linki-ikony 44 px                                                           |
| `scribble-link` | link z falistym podkreśleniem                                                          |
| `viewer`        | natywny `<dialog>`: podstrona projektu w iframe albo grafika w pełnym rozmiarze; tytuł nadąża za nawigacją w iframe |
| `video`         | link do YouTube z miniaturą z filmu (`assets/video/<id>.jpg`) i `video__play`. Przez http(s) `initVideos()` podmienia go na iframe youtube-nocookie: z `data-video-autoplay` od razu (wyciszony, w pętli), bez niego po kliknięciu. Z `file://` YouTube blokuje osadzanie (błąd 153), więc link otwiera film na YouTube. `video--tilted` w hero |
| `project-group` | grupa kafli z nagłówkiem h3: „Wydane i komercyjne”, potem „Własne projekty, jamy i open source” |
| `project-grid--compact` | mniejsze kafle (3 kolumny od 64em) dla jamów i projektów pobocznych          |
| `project-card__role` | linia „Rola: … · Zespół: …” na kaflu (obowiązkowa dla projektów komercyjnych)     |
| `feature-list`  | lista „tytuł + opis” (`__title`, `__desc`): mocne strony w „O mnie”, rola i mechaniki w case studies |
| `todo`, `todo-block` | treść do uzupełnienia oznaczona **(z)**; żółte tło + przerywana ramka. Lista: `docs/do-uzupelnienia.md` |

Case studies (`projects/projects.css`): `case-bar`, `case-hero` (panel), `case-stats`, `case-section`,
`case-media` (+ `__grid--2`, `__grid--feature`), `challenge` (problem → rozwiązanie → efekt), `case-next`.

**Układ case study (stały):** hero z liczbami (rola, zespół, czas, wynik) → główny zrzut → wideo → „Moja rola”
→ „Wyzwanie” (problem → rozwiązanie → efekt) → galeria → stack → „Czego się nauczyłem” → „Następny projekt”.
Kolejność „Następny projekt”: Pushout → Hourglass → Traverse → DGE → Assety → Pushout.

## 8. Obrazy

- Kafle: `assets/thumbs/*.jpg` (≤1200 px, q80). Case studies: `assets/case/*.jpg` (≤1600 px, q82).
- Oryginały zostają w `projects/gameimages` i `projects/gfximages` (podgląd pełnej grafiki).
- Hero: `fetchpriority="high"`, reszta `loading="lazy"`.

## 9. Otwarte kwestie

- `projects/gfximages/clicknclean2.png` i `clicknclean3.png` (~30 MB), `dietaposwojemu2`, `itsystem*`, `turbify2/3`,
  `zgadami2`, `edk.png`, `mackoFolie2` nie są nigdzie używane, a GitHub Pages publikuje całe repo.
- `projects/wip.html` i `projects/templates/` nie są już linkowane.
- Prace graficzne nie mają jeszcze case studies (dziś: podgląd pojedynczej grafiki).
- `cv/index.html` ma własny, starszy styl. Celowo nie jest linkowane ze strony (tylko bezpośredni link).
