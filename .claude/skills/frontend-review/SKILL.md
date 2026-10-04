---
name: frontend-review
description: Review jakości portfolio2026 pod kątem design systemu, czytelności dla rekrutera, semantyki HTML, architektury CSS, dostępności WCAG 2.2 AA, wydajności i spójności wizualnej. Użyj, gdy użytkownik prosi o review, audyt lub sprawdzenie strony, sekcji albo komponentu, oraz przed commitem większej zmiany UI.
---

# Frontend Review: portfolio2026

Review **weryfikuje fakty**, a nie wrażenia. Każde znalezisko ma `plik:linia` i konkretną poprawkę.

## 1. Zakres

Domyślnie zmiany z `git diff` + nowe pliki. Jeśli użytkownik wskaże sekcję lub podstronę, sprawdzasz tylko to.

## 2. Automaty (Grep)

- surowe kolory poza `styles/tokens.css`: `#[0-9a-fA-F]{3,8}\b`, `rgba?\(`, `hsl\(`
- surowe odstępy: `(margin|padding|gap|font-size|border-radius|inset)[^;]*\d+(px|rem)` poza tokenami
- `!important`, `#id` w selektorach, `style=` i `onclick=` w HTML
- `<img` bez `alt`/`width`/`height`

## 3. Checklista

### Rekruter (najważniejsze)

- [ ] Pierwszy ekran: imię, rola, aktualna firma, najmocniejszy projekt, CTA do projektów i kontaktu
- [ ] Kontakt osiągalny jednym kliknięciem (nawigacja + stopka); **brak linków do `cv/`** (CV tylko z bezpośredniego linku)
- [ ] Każdy projekt: co to jest, rola, technologia, rok, gdzie zobaczyć
- [ ] Brak martwych końców (strony „w budowie”, linki `#`)
- [ ] Brak literówek i niespójnej wielkości liter w tytułach

### Design system

- [ ] Tylko tokeny semantyczne, tryby zmieniają tokeny, nie komponenty
- [ ] Brak szkła, glow, gradientów, cieni na kafelkach (patrz `CLAUDE.md`)
- [ ] Pigułki tylko dla dymków-etykiet, chipów technologii i przełącznika trybu
- [ ] Naklejki: max 1–2 na widok treści, więcej tylko w stopce; nie zasłaniają tekstu
- [ ] Coś, co wygląda na klikalne, jest klikalne

### HTML / CSS / JS

- [ ] Landmarki, jeden `h1`, bez przeskoków nagłówków
- [ ] `<a>` do nawigacji, `<button>` do akcji, `<dialog>` do podglądu
- [ ] BEM, mobile-first, właściwości logiczne, brak poziomego scrolla na 320 px
- [ ] Animacje tylko transform/opacity, `prefers-reduced-motion` respektowane
- [ ] Moduły z `init*()`, hooki `data-*`, brak globali, brak błędów w konsoli

### Dostępność (WCAG 2.2 AA)

- [ ] Kontrast tekstu ≥ 4.5:1 (duży tekst i UI ≥ 3:1) w **obu trybach**
- [ ] Pełna ścieżka klawiaturą, widoczny `:focus-visible`, Esc zamyka dialog i menu
- [ ] Cele dotykowe ≥ 44×44 px
- [ ] Ikony bez tekstu mają `aria-label`, ozdoby `aria-hidden`

### Wydajność

- [ ] Kafle z `assets/thumbs/`, lazy poniżej pierwszego ekranu, `fetchpriority="high"` dla obrazu w hero
- [ ] Brak nieużywanych ciężkich zasobów w repo (GitHub Pages wysyła całe repo)
- [ ] Fonty: tylko używane grubości, `display=swap`

## 4. Weryfikacja wizualna

Serwer z `.claude/launch.json`, zrzuty na 375 / 768 / 1440 px w trybie `game` i `art`, przejście Tab, konsola.

## 5. Raport

```markdown
### 🔴 Krytyczne (a11y, błąd działania, martwy link, rekruter nie znajdzie kontaktu)
- `index.html:120` — … **Fix:** …
### 🟠 Ważne (niezgodność z design systemem / konwencjami)
### 🟡 Drobne (spójność, czytelność)
### ✅ Co jest dobrze (krótko)
```

Na końcu jedno zdanie werdyktu.
