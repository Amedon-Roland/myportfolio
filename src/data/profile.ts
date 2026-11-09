import type { T } from "@/i18n";

export const profile = {
  name: "Roland Amedon",
  role: { fr: "Développeur full-stack", en: "Full-stack developer" } as T,
  city: "Lomé, Togo",
  email: "rolandamedon@gmail.com",
  github: "https://github.com/Amedon-Roland",
  url: "https://rolandamedon.vercel.app",
};

export const services: { title: T; text: T }[] = [
  {
    title: { fr: "Sites web", en: "Websites" },
    text: {
      fr: "Sites vitrines et boutiques en ligne, rapides même sur une connexion mobile lente.",
      en: "Business sites and online stores that stay fast on a slow mobile connection.",
    },
  },
  {
    title: { fr: "Logiciels de gestion", en: "Management software" },
    text: {
      fr: "Back-offices sur mesure : stock, ventes, caisse, inscriptions, comptabilité, rapports.",
      en: "Custom back-offices: stock, sales, point of sale, enrolment, accounting, reports.",
    },
  },
  {
    title: { fr: "Data engineering", en: "Data engineering" },
    text: {
      fr: "Collecter, nettoyer et croiser vos données, puis les rendre lisibles dans des tableaux de bord.",
      en: "Collect, clean and combine your data, then make it readable in dashboards.",
    },
  },
  {
    title: { fr: "Applications mobiles", en: "Mobile apps" },
    text: {
      fr: "Une seule application pour Android et iOS, développée avec Flutter.",
      en: "One app for Android and iOS, built with Flutter.",
    },
  },
];

export const stack = [
  { group: { fr: "Web", en: "Web" } as T, items: "Next.js, React, TypeScript, Tailwind CSS" },
  { group: { fr: "Back-end", en: "Back-end" } as T, items: "Laravel, Filament, PHP, Node.js, Firebase" },
  { group: { fr: "Mobile", en: "Mobile" } as T, items: "Flutter, Dart" },
  { group: { fr: "Données", en: "Data" } as T, items: "Python, SQL, Pandas, NumPy, Scikit-learn, Power BI, Tableau" },
  { group: { fr: "IA", en: "AI" } as T, items: "Claude Code, Codex" },
  { group: { fr: "Déploiement", en: "Deployment" } as T, items: "Git, GitHub, Vercel" },
];

export const about: { text: T[]; facts: { label: T; value: T }[] } = {
  text: [
    {
      fr: "Je vis à Lomé et je travaille pour des entreprises, des écoles et des associations au Togo et au Sénégal.",
      en: "I live in Lomé and work with businesses, schools and non-profits in Togo and Senegal.",
    },
    {
      fr: "Je m'occupe d'un projet du début à la fin : je discute du besoin, je dessine les écrans, je code, je mets en ligne et je forme l'équipe qui va l'utiliser.",
      en: "I handle a project from start to finish: I talk through the need, design the screens, write the code, put it online and train the team who will use it.",
    },
  ],
  facts: [
    { label: { fr: "Basé à", en: "Based in" }, value: { fr: "Lomé, Togo", en: "Lomé, Togo" } },
    { label: { fr: "Studio", en: "Studio" }, value: { fr: "RolandTech", en: "RolandTech" } },
    { label: { fr: "Sur GitHub", en: "On GitHub" }, value: { fr: "Depuis 2023", en: "Since 2023" } },
  ],
};
