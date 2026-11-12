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
    more: { fr: "En cours", en: "In progress" },
    tools: { fr: "Petits outils open source", en: "Small open-source tools" },
    open: { fr: "Voir le projet", en: "View project" },
    source: { fr: "Code source", en: "Source code" },
  },
  reel: {
    title: { fr: "Quelques écrans, en mouvement", en: "A few screens, in motion" },
    label: {
      fr: "Vidéo : défilement des écrans de GSPE B2D, Technick Store, Shenco Empire, BKBG Hotels et Somayaf.",
      en: "Video: screens from GSPE B2D, Technick Store, Shenco Empire, BKBG Hotels and Somayaf.",
    },
    pause: { fr: "Mettre la vidéo en pause", en: "Pause the video" },
    play: { fr: "Lire la vidéo", en: "Play the video" },
    note: { fr: "Montage réalisé en code avec HyperFrames", en: "Edited in code with HyperFrames" },
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
    planned: { fr: "Ce qui est prévu", en: "What's planned" },
    wip: { fr: "En cours", en: "In progress" },
    wipNote: {
      fr: "Projet en cours de développement : les captures montrent une version de travail.",
      en: "Work in progress: the screenshots show a working version.",
    },
    gallery: { fr: "Captures", en: "Screenshots" },
    private: { fr: "Logiciel interne, non public", en: "Internal software, not public" },
    next: { fr: "Projet suivant", en: "Next project" },
  },
  roli: {
    name: { fr: "Roli", en: "Roli" },
    hide: { fr: "Cacher Roli", en: "Hide Roli" },
    show: { fr: "Faire revenir Roli", en: "Bring Roli back" },
    talk: { fr: "Parler à Roli", en: "Talk to Roli" },
    top: { fr: "Remonter en haut de la page", en: "Back to the top of the page" },
    lines: {
      intro: {
        fr: ["Salut, moi c'est Roli. Je fais la visite ?", "Je suis l'assistant de Roland. Enfin, son robot."],
        en: ["Hi, I'm Roli. Shall I show you around?", "I'm Roland's assistant. Well, his robot."],
      },
      reel: {
        fr: ["Ça, c'est le montage. Fait en code, oui oui.", "Cinq projets en dix-huit secondes."],
        en: ["That's the reel. Made in code, really.", "Five projects in eighteen seconds."],
      },
      projets: {
        fr: ["Les vrais projets, pour de vrais clients.", "Clique sur une carte, tout est détaillé."],
        en: ["Real projects for real clients.", "Click a card, it's all explained."],
      },
      services: {
        fr: ["Sites, logiciels, données, mobile. Il fait tout ça.", "Moi je fais surtout les blagues."],
        en: ["Sites, software, data, mobile. He does it all.", "I mostly handle the jokes."],
      },
      "a-propos": {
        fr: ["Lomé, le café, le code. Dans cet ordre.", "Du besoin à la mise en ligne, c'est lui."],
        en: ["Lomé, coffee, code. In that order.", "From the brief to launch, that's him."],
      },
      contact: {
        fr: ["Un projet ? Écris-lui, il répond vite.", "Promis, je ne lis pas tes mails."],
        en: ["Got a project? Write to him, he answers fast.", "I promise I don't read your emails."],
      },
      pet: {
        fr: ["Hé, ça chatouille !", "Encore, encore !", "Je ronronne pas, je suis un robot. Enfin..."],
        en: ["Hey, that tickles!", "Again, again!", "I don't purr, I'm a robot. Well..."],
      },
      dizzy: {
        fr: ["Doucement... tout tourne.", "Stop, je vais buguer !"],
        en: ["Easy... everything's spinning.", "Stop, I'm going to glitch!"],
      },
      sleep: {
        fr: ["Zzz... je fais une petite mise en veille.", "Zzz... je rêve de code propre."],
        en: ["Zzz... just a quick sleep mode.", "Zzz... dreaming of clean code."],
      },
      wake: {
        fr: ["Oh ! Tu es revenu. Je ne dormais pas, hein.", "Mise en veille terminée !"],
        en: ["Oh! You're back. I wasn't sleeping, promise.", "Sleep mode over!"],
      },
      light: {
        fr: ["Aïe, mes yeux ! Bon, c'est joli aussi.", "Mode jour activé."],
        en: ["Ouch, my eyes! Well, it's nice too.", "Day mode on."],
      },
      dark: {
        fr: ["Ah, je préfère le noir. Ça repose.", "Mode nuit, mon préféré."],
        en: ["Ah, I prefer the dark. Much calmer.", "Night mode, my favourite."],
      },
      copied: {
        fr: ["Adresse copiée. Il n'attend que toi !", "Bien joué. Maintenant, colle-la."],
        en: ["Address copied. He's waiting for you!", "Nice. Now paste it."],
      },
      fast: {
        fr: ["Wouhou, ça va vite !", "Pas si vite, je suis petit !"],
        en: ["Wheee, that's fast!", "Not so fast, I'm small!"],
      },
      top: {
        fr: ["Et hop, retour en haut !", "Ascenseur express !"],
        en: ["And up we go!", "Express elevator!"],
      },
      lost: {
        fr: ["Moi aussi, je suis perdu. On rentre ?", "Cette page a dû partir en vacances."],
        en: ["I'm lost too. Shall we head home?", "This page must be on holiday."],
      },
      project: {
        fr: ["Fais défiler, il y a les captures plus bas.", "Celui-là, il en est fier."],
        en: ["Scroll down, the screenshots are below.", "He's proud of this one."],
      },
    },
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
