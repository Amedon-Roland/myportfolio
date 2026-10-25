# Roland Amedon, portfolio

Portfolio de Roland Amedon, développeur full-stack à Lomé.

Le fil conducteur est le kente ewe de Kpetoe, tissé en bandes étroites cousues bord à bord.
Dans le hero, le nom est découpé en bandes qui se tissent au chargement puis s'écartent sous le
curseur. La section « Atelier » tisse un motif unique à partir d'un prénom.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, rendu statique) et React 19
- [Tailwind CSS 4](https://tailwindcss.com)
- [GSAP](https://gsap.com), `@gsap/react` et ScrollTrigger pour les animations
- [Lenis](https://lenis.darkroom.engineering) pour le défilement fluide
- Polices Google : Bricolage Grotesque (titres) et Newsreader (texte)

## Développer

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de production
npm run lint
```

## Modifier le contenu

Tout le texte vit dans `src/data/site.ts` : coordonnées, projets, outils et méthode.
Les captures des projets sont dans `public/work/` (`<slug>-d.jpg`, `<slug>-d2.jpg`, `<slug>-m.jpg`).
