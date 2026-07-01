# Keuzedeel-Front-End-Scouting-Opdracht

Scouting Nederland website met Tailwind CSS en vanilla JavaScript.

## Tailwind CSS Setup

Dit project gebruikt **Tailwind CSS via CDN** voor snelle development. Hier is hoe je het instelt:

### 1. CDN-versie (Huidige setup - Snel & Eenvoudig)

In `index.html` is al de CDN-link opgenomen:

```html
<!-- Tailwind CSS (CDN) -->
<script src="https://cdn.tailwindcss.com/3.4.17"></script>
```

Dit werkt direct zonder installatie. Perfect voor:
- Rapid prototyping
- Learning Tailwind
- Kleine projecten

⚠️ **Let op**: In productie moet je naar de npm-versie (zie hieronder).

### 2. NPM-installatie (Voor Productie)

Als je Tailwind wilt optimaliseren voor productie:

#### Stap 1: Initialiseer npm (als nog niet gedaan)
```bash
npm init -y
```

#### Stap 2: Installeer Tailwind via npm
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### Stap 3: Configureer `tailwind.config.js`
```javascript
export default {
  content: [
    "./index.html",
    "./main.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

#### Stap 4: Voeg Tailwind-directives toe aan `css/style.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### Stap 5: Build CSS
```bash
npx tailwindcss -i ./css/style.css -o ./css/output.css --watch
```

#### Stap 6: Linken in `index.html`
```html
<!-- Vervang CDN-link door: -->
<link rel="stylesheet" href="css/output.css">
```

## Folder Structuur

```
project/
├── css/
│   └── style.css          # Custom styles (niet door Tailwind gedekt)
├── images/
│   └── logo.png           # Scouting logo
├── index.html             # Hoofdpagina
├── main.js                # JavaScript logica
├── style.css              # (deprecated - verplaatst naar css/)
├── README.md
└── .git/
```

## Gebruikte Technologieën

- **HTML5** - Semantische markup
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (Vanilla)** - DOM manipulatie & logica
- **Lucide Icons** - SVG icon library (via CDN)
- **Google Fonts** - Fredoka & Work Sans typefaces

## SEO (Search Engine Optimization)

SEO helpt ervoor zorgen dat je website **hoger in zoekresultaten** (Google, Bing, etc.) verschijnt. Dit project bevat al basale SEO-onderdelen in de `<head>`:

### Meta Tags Uitgelegd

#### 1. **Description** (`<meta name="description">`)
Dit is de korte samenvatting die onder je website-titel in zoekresultaten verschijnt.

```html
<meta name="description" content="Welkom bij Scouting Nederland. Ontdek speltakken, word lid en vul de online competentieroos in.">
```

**Waarom belangrijk:**
- **CTR verhogen** - Een goed description doet meer mensen klikken
- **Keyword relevantie** - Zoekzinnen uit je description worden vet gemaakt in resultaten
- **Maximaal 160 tekens** - Langere tekst wordt afgekapt

#### 2. **Keywords** (`<meta name="keywords">`)
Woorden/zinnen waar je pagina over gaat.

```html
<meta name="keywords" content="Scouting, jeugdvereniging, speltakken, bevers, welpen, scouts">
```

**Waarom belangrijk:**
- **Relevantie** - Helpt zoekmachines begrijpen waar je pagina over gaat
- **Targeting** - Gebruikers vinden je als ze naar deze woorden zoeken
- **Concurrentie** - Kies keywords die jouw niche beschrijven (niet te populair)

#### 3. **Open Graph** (Social Media)
Deze tags bepalen hoe je pagina eruitziet wanneer gedeeld op Facebook, LinkedIn, etc.

```html
<meta property="og:title" content="Scouting Nederland">
<meta property="og:description" content="Samen op avontuur!">
<meta property="og:image" content="images/og-image.jpg">
```

**Waarom belangrijk:**
- **Aandacht trekken** - Mooiere preview bij delen
- **Merkbouwing** - Consistent imago over alle platforms

### Tips voor betere SEO

✅ **1-3 primaire keywords per pagina** - Niet teveel, focus op het belangrijkste  
✅ **Keywords in titel, heading (h1), en eerste alinea** - Google leest deze sterker  
✅ **Descriptive URL paths** - `/competentieroos` is beter dan `/page1`  
✅ **Mobile-friendly** - Dit project is responsive (Tailwind)  
✅ **Snelle laadtijden** - CDN Tailwind helpt hier (klein, snel)  
✅ **Internal linking** - Links naar andere pagina's op je site  
✅ **Alt-text op afbeeldingen** - `alt="Scouting Nederland logo"` helpt blind-users én SEO

### SEO Testen

- [Google PageSpeed Insights](https://pagespeed.web.dev/) - Controleer laadsnelheid
- [Google Search Console](https://search.google.com/search-console) - Zoekopdrachten & indexering
- [Lighthouse (Chrome)](chrome://inspect/) - Performance & accessibility audit

## Development Server

Gebruik XAMPP of een soortgelijke local server:

1. Zet XAMPP aan
2. Open: `http://localhost/Keuzedeel-Front-End-Scouting-Opdracht%20-%20kopie/`

## Referenties

- [Tailwind CSS Documentatie](https://tailwindcss.com/docs)
- [Tailwind CLI Gids](https://tailwindcss.com/docs/installation)
- [Google SEO Beginner's Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Meta Tags & Open Graph](https://ogp.me/)
