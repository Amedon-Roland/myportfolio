export type Lang = "fr" | "en";

export const langs: Lang[] = ["fr", "en"];

/** Bilingual text: every visible string on the site has both versions. */
export type T = { fr: string; en: string };

export const homePath = (lang: Lang) => (lang === "fr" ? "/" : "/en");

export const projectPath = (lang: Lang, slug: string) =>
  lang === "fr" ? `/projets/${slug}` : `/en/projects/${slug}`;

export const ui = {
  skip: { fr: "Aller au contenu", en: "Skip to content" },
  nav: {
    work: { fr: "Projets", en: "Work" },
    services: { fr: "Services", en: "Services" },
    about: { fr: "À propos", en: "About" },
    contact: { fr: "Contact", en: "Contact" },
    label: { fr: "Navigation principale", en: "Main navigation" },
    home: { fr: "Roland Amedon, accueil", en: "Roland Amedon, home" },
  },
  lang: {
    label: { fr: "Langue", en: "Language" },
    fr: { fr: "Français", en: "French" },
    en: { fr: "Anglais", en: "English" },
  },
  theme: {
    toLight: { fr: "Passer au thème clair", en: "Switch to light theme" },
    toDark: { fr: "Passer au thème sombre", en: "Switch to dark theme" },
  },
  hero: {
    status: { fr: "Disponible pour de nouveaux projets", en: "Available for new projects" },
    title: {
      fr: "Je développe des sites et des logiciels de gestion pour les entreprises.",
      en: "I build websites and management software for businesses.",
    },
    intro: {
      fr: "Je suis Roland Amedon, développeur full-stack à Lomé. Sites, boutiques en ligne, back-offices, applications mobiles : je les conçois, je les code et je les mets en ligne.",
      en: "I'm Roland Amedon, a full-stack developer in Lomé, Togo. Websites, online stores, back-offices and mobile apps: I design them, build them and ship them.",
    },
    ctaWork: { fr: "Voir mes projets", en: "See my work" },
    ctaContact: { fr: "Me contacter", en: "Get in touch" },
    portrait: { fr: "Portrait de Roland Amedon", en: "Portrait of Roland Amedon" },
  },
  work: {
    title: { fr: "Projets clients", en: "Client work" },
    intro: {
      fr: "Des sites publics et les logiciels qui font tourner l'entreprise derrière.",
      en: "Public websites, and the software that runs the business behind them.",
    },
    more: { fr: "Autres projets", en: "More projects" },
    tools: { fr: "Petits outils open source", en: "Small open-source tools" },
    open: { fr: "Voir le projet", en: "View project" },
    source: { fr: "Code source", en: "Source code" },
  },
  services: {
    title: { fr: "Ce que je fais", en: "What I do" },
  },
  stack: { title: { fr: "Outils", en: "Tools" } },
  about: { title: { fr: "À propos", en: "About" } },
  contact: {
    title: { fr: "Un projet ? Écrivez-moi.", en: "Have a project? Write to me." },
    intro: {
      fr: "Dites-moi en quelques lignes ce dont vous avez besoin, on en parle.",
      en: "Tell me in a few lines what you need and we'll talk it through.",
    },
    email: { fr: "Envoyer un e-mail", en: "Send an email" },
    copy: { fr: "Copier l'adresse", en: "Copy address" },
    copied: { fr: "Adresse copiée", en: "Address copied" },
  },
  project: {
    back: { fr: "Tous les projets", en: "All projects" },
    client: { fr: "Client", en: "Client" },
    year: { fr: "Année", en: "Year" },
    stack: { fr: "Technologies", en: "Stack" },
    links: { fr: "Liens", en: "Links" },
    need: { fr: "Le besoin", en: "The need" },
    built: { fr: "Ce que j'ai fait", en: "What I built" },
    gallery: { fr: "Captures", en: "Screenshots" },
    private: { fr: "Logiciel interne, non public", en: "Internal software, not public" },
    next: { fr: "Projet suivant", en: "Next project" },
  },
  footer: {
    made: { fr: "Conçu et codé à Lomé.", en: "Designed and built in Lomé." },
    top: { fr: "Haut de page", en: "Back to top" },
  },
  notFound: {
    title: { fr: "Page introuvable", en: "Page not found" },
    text: { fr: "Cette page n'existe pas ou a changé d'adresse.", en: "This page doesn't exist or has moved." },
    back: { fr: "Retour à l'accueil", en: "Back to home" },
  },
} as const;
