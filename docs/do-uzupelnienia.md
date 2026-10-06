# Do uzupełnienia (z)

Miejsca oznaczone **(z)** są na stronie wyróżnione żółtym tłem z przerywaną ramką (`.todo`, `.todo-block`),
żeby nie dało się ich przeoczyć. **Przed publikacją każde trzeba uzupełnić albo usunąć.**

Szybkie sprawdzenie, czy coś zostało:

```bash
grep -rn "(z)" index.html projects/*.html
```

## Priorytet 1: największy wpływ na rekrutera

| Gdzie | Co wpisać | Dlaczego |
| --- | --- | --- |
| `projects/pushout.html`, `hourglass.html`, `traverse.html` | **Wideo z rozgrywki, 30–60 s** (YouTube albo MP4) | W gamedevie wideo sprzedaje projekt lepiej niż zrzuty. Lead obejrzy 30 s, nie przeczyta akapitu. |
| `projects/pushout.html`, sekcja „Wyzwanie” | **Jak rozwiązałeś synchronizację fizyki** (autorytet, predykcja, interpolacja) | Multiplayer i networking to rzadka i ceniona umiejętność. To Twój najmocniejszy temat techniczny. |
| `projects/hourglass.html`, sekcja „Wyzwanie” | **Jak działają pomieszczenia nieeuklidesowe** | Efekt „wow”, o który zapytają na rozmowie. Warto mieć gotową odpowiedź. |
| `index.html`, Narzędzia | **Poziom angielskiego** | Pytanie numer 1 w studiach pracujących z zagranicą. |
| `index.html` i `pushout.html` | **Zespół w Pushout** (solo?) | „Zrobiłem sam multiplayer z 848 graczami” to bardzo mocny hook, jeśli to prawda. |

## Priorytet 2

| Gdzie | Co wpisać |
| --- | --- |
| `index.html`, Doświadczenie, Komputronik | Jeden mierzalny efekt pracy (czas ładowania, liczba wdrożeń, liczba totemów…) |
| `index.html`, „W czym jestem mocny” | Wzorce i praktyki, których naprawdę używasz (ScriptableObjects, eventy, DI, testy…) |
| `index.html`, Narzędzia | Pipeline'y i systemy Unity, które znasz (URP / HDRP / Input System / Addressables…) |
| `projects/hourglass.html` | Odbiór na Steam (recenzje, wishlisty), jeśli liczby są dobre. Jeśli nie, usuń kafelek. |
| `projects/dge.html` | Twoja rola i podział pracy w duecie, opis rozwiązania ragdolla, krótki GIF |
| `projects/traverse.html` | Jedno konkretne wyzwanie (problem → rozwiązanie → efekt), zasięg gry |
| `index.html`, kafel C.U.B.E | Wielkość zespołu |

## Priorytet 3 (opcjonalne)

- `projects/assets.html`: subskrypcje naklejek w Steam Workshop albo informacja, że trafiły do gry.
- `projects/dge.html`: ocena pracy inżynierskiej.
- `projects/hourglass.html`: wpływ portali na wydajność albo reakcje graczy.

## Wskazówka: GitHub

Rekruterzy techniczni często chcą zobaczyć kod. Jeśli możesz, wrzuć na GitHuba wycinek z Pushout
(np. synchronizację fizyki) albo system portali z Hourglass i podlinkuj go w sekcji „Wyzwanie”.
