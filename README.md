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

## Development Server

Gebruik XAMPP of een soortgelijke local server:

1. Zet XAMPP aan
2. Open: `http://localhost/Keuzedeel-Front-End-Scouting-Opdracht%20-%20kopie/`

## Referenties

- [Tailwind CSS Documentatie](https://tailwindcss.com/docs)
- [Tailwind CLI Gids](https://tailwindcss.com/docs/installation)
