# Roland Amedon, portfolio

Site personnel de Roland Amedon, développeur full-stack à Lomé. En français par défaut (`/`), en anglais sous `/en`.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, pages statiques) et React 19
- [Tailwind CSS 4](https://tailwindcss.com), police Geist, icônes [Lucide](https://lucide.dev)
- [GSAP](https://gsap.com) et [Lenis](https://lenis.dev) pour les animations, chargés seulement sur une bonne connexion
- [HyperFrames](https://github.com/heygen-com/hyperframes) pour la vidéo de présentation (HTML rendu en MP4)

## Choix de performance et d'accessibilité

- Presque tout est rendu côté serveur : le seul JavaScript côté client sert au thème et au bouton « Copier l'adresse ».
- Captures servies en AVIF ou WebP à la bonne taille, avec un skeleton puis un aperçu flou pendant le chargement, et aucun décalage de mise en page.
- Sur une connexion lente ou en mode économie de données, la classe `lite` coupe les animations, l'écran d'ouverture et la vidéo (seule son image fixe est chargée).
- L'écran d'ouverture est en CSS pur, joué à chaque chargement complet de la page, et se termine seul en 2 s.
- ROLI, la mascotte (`Roli.tsx`, `RoliGuide.tsx`) : un petit robot en SVG qui commente chaque section. On peut l'attraper, le lancer (il rebondit puis court reprendre sa place) et jouer à l'attraper en 15 s. Il reste immobile en mode `lite`.
- Transitions entre pages avec `<ViewTransition>` de React : l'en-tête et Roli restent en place, la capture d'un projet s'agrandit de la carte à la page.
- Bouton de retour en haut avec anneau de progression de lecture.
- Textures (grain, points, grille) en images statiques, et calques décoratifs en parallax (`data-drift`, `data-drift-x`).
- Le changement de thème s'ouvre en cercle depuis le bouton (View Transitions) ; ailleurs il est instantané.
- Lien d'évitement, repères de page, `lang` correct sur chaque page, liens `hreflang`, contrastes AA dans les deux thèmes, mouvements réduits respectés.

## Développer

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Modifier le contenu

- Textes de l'interface : `src/i18n.ts`
- Profil, services, outils : `src/data/profile.ts`
- Projets (textes FR/EN, liens, captures) : `src/data/projects.ts`
- Captures : `src/assets/work/`
- Vidéo : `motion/showreel/` (voir `build.py` pour la régénérer), fichier publié dans `public/motion/`
