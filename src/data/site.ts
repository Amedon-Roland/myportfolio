export const site = {
  name: "Roland Amedon",
  role: "Développeur full-stack",
  city: "Lomé",
  country: "Togo",
  timeZone: "Africa/Lome",
  email: "rolandamedon@gmail.com",
  github: "https://github.com/Amedon-Roland",
  url: "https://rolandamedon.vercel.app",
  /** Portrait in /public, e.g. "/roland.jpg". Without one, a cloth woven from the name is shown. */
  portrait: null as string | null,
};

export const about = {
  lead: "Je m'appelle Roland Amedon. Je vis et je travaille à Lomé, où je signe mes projets sous le nom RolandTech.",
  body: [
    "Mes projets naissent de besoins très concrets autour de moi : une église qui veut diffuser ses cultes, des parents qui veulent payer l'école sans faire la queue, une famille qui veut garder la trace de ses anciens.",
    "Je m'occupe de tout le parcours, de la première conversation à la mise en ligne : le design, le site, l'application mobile, le back-office et la prise en main par votre équipe.",
  ],
  facts: [
    { label: "Basé à", value: "Lomé, Togo" },
    { label: "Studio", value: "RolandTech" },
    { label: "Projets en ligne", value: "Six, et d'autres en cours" },
    { label: "Sur GitHub", value: "Depuis 2023" },
  ],
};

export type Project = {
  slug: string;
  name: string;
  domain: string;
  year: string;
  summary: string;
  need: string;
  built: string[];
  stack: string[];
  role: string;
  url?: string;
  /** Kente colour used to tint the case sheet and the hover preview. */
  thread: string;
};

export const projects: Project[] = [
  {
    slug: "terre-de-victoire",
    name: "Terre de Victoire",
    domain: "Église, Lomé",
    year: "2026",
    summary:
      "Le site de Victory Outreach Lomé : cultes en direct, Bible en ligne et une équipe qui publie seule.",
    need: "L'église voulait qu'un visiteur trouve en quelques secondes l'heure du prochain culte, le direct du dimanche et le chemin jusqu'à la salle, depuis un téléphone et avec une connexion fragile.",
    built: [
      "Compte à rebours vers le prochain culte et ajout à l'agenda du téléphone via un fichier .ics",
      "Direct YouTube détecté automatiquement, rediffusions avec recherche et filtres",
      "Bible Louis Segond 1910 complète : recherche par référence ou par mots, verset du jour, surlignage, mode nuit et sépia",
      "Carte interactive, distance depuis votre position et itinéraire Google Maps, Waze ou Plans",
      "Espace d'administration pour les articles, les réglages du site et les demandes de prière",
    ],
    stack: ["Next.js 16", "React 19", "Tailwind CSS 4", "Redis"],
    role: "Conception, design et développement",
    url: "https://victoryoutreachintl.vercel.app",
    thread: "#E2A43A",
  },
  {
    slug: "sukulufe",
    name: "Sukulufe",
    domain: "Paiement scolaire",
    year: "2026",
    summary:
      "Payer l'école depuis son téléphone, par Mobile Money, carte ou espèces, avec un reçu immédiat.",
    need: "Chaque rentrée, les parents togolais perdent une demi-journée en files d'attente, transportent du liquide et gardent des reçus papier qui s'effacent. Les écoles, elles, passent des heures à rapprocher les paiements.",
    built: [
      "Parcours en quatre étapes : compte, code de l'enfant, solde dû, paiement",
      "Paiement par Mixx by Yas, Flooz, Visa, Mastercard ou espèces agréées",
      "Reçu numérique envoyé immédiatement, historique par enfant",
      "Application mobile Flutter et site de lancement avec liste d'attente",
    ],
    stack: ["Next.js", "Flutter", "Dart", "Mobile Money"],
    role: "Produit, design et développement web et mobile",
    url: "https://sukulufe.vercel.app",
    thread: "#4FA27A",
  },
  {
    slug: "famline",
    name: "Famline",
    domain: "Généalogie",
    year: "2025",
    summary:
      "Construire l'arbre de sa famille africaine, avec ses dates approximatives et ses familles élargies.",
    need: "Trois générations suffisent pour perdre la mémoire d'une famille. Les outils de généalogie existants supposent des dates exactes et des familles nucléaires, ce qui ne correspond pas aux réalités africaines.",
    built: [
      "Arbre généalogique interactif : ancêtres, parents, enfants et unions",
      "Profils détaillés avec photos, dates approximatives et informations clés",
      "Paramètres de visibilité pour protéger les données sensibles",
      "Version web et application mobile Flutter synchronisées",
    ],
    stack: ["Next.js", "TypeScript", "Flutter", "Dart"],
    role: "Conception et développement",
    url: "https://famline-sepia.vercel.app",
    thread: "#C4572F",
  },
  {
    slug: "lfac-avc",
    name: "LFAC-AVC",
    domain: "Santé publique",
    year: "2025",
    summary:
      "La Ligue Franco-Africaine contre les AVC : sensibiliser, former et rassembler ses membres.",
    need: "L'association avait besoin d'un lieu unique pour publier ses campagnes de prévention, présenter ses pays membres et accueillir les professionnels de santé qui la rejoignent.",
    built: [
      "Actualités : campagnes de sensibilisation, formations, télémédecine",
      "Présentation des valeurs, des pays membres et des services",
      "Espace membre et formulaire d'adhésion",
      "Thème clair et sombre",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    role: "Design et développement",
    url: "https://lfac-avc.vercel.app",
    thread: "#6F86D6",
  },
  {
    slug: "gspe-b2d",
    name: "GSPE B2D",
    domain: "École, Saint-Louis",
    year: "2026",
    summary:
      "Le groupe scolaire panafricain de Saint-Louis du Sénégal, son site et son outil de gestion.",
    need: "Une école quadrilingue répartie sur trois sites, avec plus de 700 élèves, qui devait présenter son projet aux familles et gérer inscriptions et scolarité au même endroit.",
    built: [
      "Site institutionnel : vision, campus, modules, admissions et actualités",
      "Inscription et connexion des familles",
      "Application de gestion scolaire pour l'administration",
    ],
    stack: ["Next.js", "TypeScript", "PHP", "Laravel"],
    role: "Développement web et back-office",
    url: "https://gspebdd-com.vercel.app",
    thread: "#2F7D55",
  },
  {
    slug: "togo-gospel-hub",
    name: "Togo Gospel Hub",
    domain: "Annuaire culturel",
    year: "2026",
    summary:
      "Le hub qui relie les artistes, techniciens, studios et églises du gospel togolais.",
    need: "Les professionnels du gospel au Togo se trouvent par le bouche-à-oreille. Il manquait un annuaire où chaque artiste, vidéaste ou photographe a un profil sérieux et joignable.",
    built: [
      "Annuaire par catégories : artistes, producteurs, vidéastes, photographes",
      "Profils certifiés avec niveau, ville et contact direct",
      "Agenda des événements et actualités",
      "Recherche globale au clavier",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    role: "Conception et développement",
    url: "https://togogospelbizz.vercel.app",
    thread: "#D9C27A",
  },
];

export type Side = {
  name: string;
  note: string;
  stack: string;
  url?: string;
};

export const sideWork: Side[] = [
  {
    name: "Church OBS Control",
    note: "Piloter OBS Studio depuis un navigateur pendant le direct du culte",
    stack: "Next.js, WebSocket",
    url: "https://github.com/Amedon-Roland/church-obs-control",
  },
  {
    name: "Somayaf",
    note: "Application de gestion pour une station-service",
    stack: "Laravel, PHP",
  },
  {
    name: "TogoSanté",
    note: "Trouver rapidement le centre de santé le plus proche au Togo",
    stack: "C++",
  },
  {
    name: "Scroll Lab",
    note: "Expériences d'animation au défilement",
    stack: "GSAP, Lenis",
    url: "https://github.com/Amedon-Roland/scrolllanim",
  },
  {
    name: "AppImage to Desktop",
    note: "Intégrer une AppImage au menu des applications Linux en une commande",
    stack: "Shell",
    url: "https://github.com/Amedon-Roland/appimage-to-desktop-linux",
  },
  {
    name: "Organize Downloads",
    note: "Ranger automatiquement le dossier Téléchargements par type de fichier",
    stack: "Shell",
    url: "https://github.com/Amedon-Roland/organize_dowload_folder",
  },
];

export const method = [
  {
    title: "Écouter",
    text: "Je commence sur le terrain : le pasteur, la directrice d'école, le parent qui paie la scolarité. Ce qu'ils vivent décide de ce qu'on construit.",
  },
  {
    title: "Dessiner",
    text: "Une maquette cliquable avant la première ligne de code. On ajuste les parcours tant que c'est encore bon marché de changer d'avis.",
  },
  {
    title: "Construire",
    text: "Du code typé, rapide sur un téléphone d'entrée de gamme et une connexion 3G. Le web en Next.js, le mobile en Flutter, le back-office en Laravel.",
  },
  {
    title: "Transmettre",
    text: "Chaque projet part avec son espace d'administration et une prise en main. Votre équipe publie seule, sans m'appeler pour changer une date.",
  },
];

export const craft = [
  { group: "Web", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP"] },
  { group: "Mobile", items: ["Flutter", "Dart"] },
  { group: "Serveur et données", items: ["Laravel", "PHP", "Node.js", "MongoDB", "Redis"] },
  { group: "Analyse", items: ["Python", "Jupyter"] },
];
