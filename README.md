# Roland Amedon, portfolio

Portfolio de Roland Amedon, développeur full-stack à Lomé.

Style « dark premium » : fond nuit, panneaux en verre dépoli, lueurs bleu-violet et un thème clair
en option. Le hero présente un portrait détouré, les projets sont en grille bento avec une fiche
détaillée, et la section « Atelier » tisse un motif kente à partir d'un prénom.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, rendu statique) et React 19
- [Tailwind CSS 4](https://tailwindcss.com)
- [GSAP](https://gsap.com), `@gsap/react`, SplitText et ScrollTrigger pour les animations
- [Lenis](https://lenis.darkroom.engineering) pour le défilement fluide
- [Lucide](https://lucide.dev) pour les icônes, police Geist

## Développer

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de production
npm run lint
```

## Modifier le contenu

Tout le texte vit dans `src/data/site.ts` : coordonnées, projets, outils et méthode.
Le portrait est dans `public/roland.webp` (et `public/roland-cut.webp`, détouré, pour le hero).
Les captures des projets sont dans `public/work/` (`<slug>-d.jpg`, `<slug>-d2.jpg`, `<slug>-m.jpg`).
