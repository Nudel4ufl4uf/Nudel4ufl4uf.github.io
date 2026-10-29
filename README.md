# profile.philoklemenz.de

Persönliche Profilseite von Philo Klemenz – statisches HTML/CSS/JS, ohne Build-Schritt.

**Features:** DE/EN-Umschalter · Dark Mode (folgt dem System) · 4 Akzentfarben · Auswahl wird im Browser gespeichert · responsive · barrierearm

## Struktur

```
index.html              Startseite
html/pages/projects.html  Portfolio-Übersicht
html/pages/*_project.html Projekt-Einzelseiten
assets/css/style.css    Design, Farben (Theme- und Akzent-Variablen)
assets/js/main.js       Sprache, Dark Mode, Akzentfarbe, Bild-Vergrößerung, Scroll-Animationen
img/…                   Bilder, Logos und Projekt-Icons (SVG-Quellen liegen daneben)
CNAME                   Eigene Domain für GitHub Pages
.github/workflows/      Automatisches Deployment
```

## Deployen auf GitHub Pages

1. Im Repo: **Settings → Pages → Source: „GitHub Actions“**.
2. Jeder Push auf `main` deployt automatisch (`.github/workflows/deploy.yml`).
3. Eigene Domain: Beim DNS-Anbieter einen **CNAME-Eintrag** `profile` → `nudel4ufl4uf.github.io` setzen. Dann unter Settings → Pages die Domain prüfen und **„Enforce HTTPS“** aktivieren.

## Texte ändern

Die Seite ist zweisprachig, Englisch ist jeweils der Text im HTML:

- **Startseite:** Deutsche Texte stehen in `assets/js/main.js` (Objekt `DE`). Neue übersetzbare Stelle: im HTML `data-i18n="meinKey"` setzen und in `DE` den Eintrag `meinKey: '…'` ergänzen.
- **Portfolio und Projektseiten:** Die deutsche Übersetzung steht direkt am Element im Attribut `data-de="…"`, zum Beispiel `<p data-de="Deutscher Text">English text</p>`.

## Neues Projekt hinzufügen

1. Eine bestehende `html/pages/*_project.html` kopieren und Texte, Bilder, Links und Sprachbalken anpassen.
2. In `html/pages/projects.html` eine Karte ergänzen (Logo, Titel, Kurztext, Tech-Chips).
3. Bilder unter `img/<projekt>/` ablegen, das Projekt-Icon unter `img/projectIcons/`.
   Dateinamen auf Groß-/Kleinschreibung achten, GitHub Pages unterscheidet sie.

## Logos und Icons

Alle Kacheln haben denselben Eckenradius (250 von 1080 px, im CSS 23,15 %). Neue Icons also auf 1080 × 1080 px mit diesem Radius anlegen.
