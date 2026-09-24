# Drobin SMP — strona

Statyczna strona Drobin SMP. Wszystkie pliki do opublikowania znajdują się w folderze [`public/`](public/): strony HTML, CSS, JavaScript, obrazy i zwiastun. Nie wymaga instalowania zależności ani kompilacji.

## Cloudflare Pages z GitHub

1. Połącz repozytorium `filipjjd/DROBINSMP-STRONA` z Cloudflare Pages.
2. Wybierz gałąź produkcyjną `main` i konfigurację bez frameworka.
3. Pozostaw **Build command** puste.
4. Ustaw **Build output directory** na `public`.
5. Pozostaw **Root directory** puste (korzeń repozytorium) i uruchom wdrożenie.

Każdy kolejny push do `main` będzie mógł automatycznie aktualizować stronę.

## Ręczne przesłanie

Jeżeli używasz Cloudflare Pages Direct Upload, prześlij sam folder `public/`. Plik `public/index.html` jest stroną główną.

## Układ

```text
public/
├── index.html
├── dolacz.html
├── ekipa.html
├── regulamin.html
├── sklep.html
├── main.js
├── style.css
├── images/
└── videos/
```
