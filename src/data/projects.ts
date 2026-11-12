import type { StaticImageData } from "next/image";
import type { T } from "@/i18n";

import gspeSite from "@/assets/work/gspe-site.jpg";
import gspeSite2 from "@/assets/work/gspe-site-2.jpg";
import gspeMobile from "@/assets/work/gspe-mobile.jpg";
import gspeApp from "@/assets/work/gspe-app.jpg";
import gspeApp2 from "@/assets/work/gspe-app-2.jpg";
import gspeApp3 from "@/assets/work/gspe-app-3.jpg";
import gspeApp4 from "@/assets/work/gspe-app-4.jpg";
import gspeApp5 from "@/assets/work/gspe-app-5.jpg";
import technickSite from "@/assets/work/technick-site.jpg";
import technickSite2 from "@/assets/work/technick-site-2.jpg";
import technickMobile from "@/assets/work/technick-mobile.jpg";
import technickApp from "@/assets/work/technick-app.jpg";
import shencoSite from "@/assets/work/shenco-site.jpg";
import shencoSite2 from "@/assets/work/shenco-site-2.jpg";
import shencoShop from "@/assets/work/shenco-shop.jpg";
import shencoOrder from "@/assets/work/shenco-order.jpg";
import shencoTransport from "@/assets/work/shenco-transport.jpg";
import shencoMobile from "@/assets/work/shenco-mobile.jpg";
import shencoApp from "@/assets/work/shenco-app.jpg";
import shencoApp2 from "@/assets/work/shenco-app-2.jpg";
import shencoApp3 from "@/assets/work/shenco-app-3.jpg";
import shencoAppLogin from "@/assets/work/shenco-app-login.jpg";
import bkbgSite from "@/assets/work/bkbg-site.jpg";
import bkbgSite2 from "@/assets/work/bkbg-site-2.jpg";
import bkbgRoom from "@/assets/work/bkbg-room-3d.jpg";
import bkbgDining from "@/assets/work/bkbg-dining.jpg";
import bkbgBooking from "@/assets/work/bkbg-booking.jpg";
import bkbgAdmin from "@/assets/work/bkbg-admin.jpg";
import bkbgAdmin2 from "@/assets/work/bkbg-admin-2.jpg";
import bkbgAdmin3 from "@/assets/work/bkbg-admin-3.jpg";
import bkbgMobile from "@/assets/work/bkbg-mobile.jpg";
import somayafApp from "@/assets/work/somayaf-app.jpg";
import somayafApp2 from "@/assets/work/somayaf-app-2.jpg";
import somayafApp3 from "@/assets/work/somayaf-app-3.jpg";
import somayafAppLogin from "@/assets/work/somayaf-app-login.jpg";
import victoireSite from "@/assets/work/terre-de-victoire-site.jpg";
import victoireSite2 from "@/assets/work/terre-de-victoire-site-2.jpg";
import victoireMobile from "@/assets/work/terre-de-victoire-mobile.jpg";
import sukulufeSite from "@/assets/work/sukulufe-site.jpg";
import sukulufeSite2 from "@/assets/work/sukulufe-site-2.jpg";
import sukulufeMobile from "@/assets/work/sukulufe-mobile.jpg";
import gospelSite from "@/assets/work/togo-gospel-hub-site.jpg";
import gospelSite2 from "@/assets/work/togo-gospel-hub-site-2.jpg";
import gospelMobile from "@/assets/work/togo-gospel-hub-mobile.jpg";

export type Shot = { src: StaticImageData; alt: T };

export type Project = {
  slug: string;
  name: string;
  client: T;
  year: string;
  /** Client work is listed first and in full; the rest as smaller cards. */
  featured: boolean;
  /** Still being built: labelled as such, and `built` lists what is planned. */
  wip?: boolean;
  /** What was delivered, shown as small labels on the card. */
  parts: T[];
  summary: T;
  need: T;
  built: { fr: string[]; en: string[] };
  stack: string[];
  links: { label: T; href?: string }[];
  cover: Shot;
  gallery: Shot[];
  mobile?: Shot;
};

const site: T = { fr: "Site web", en: "Website" };
const backOffice: T = { fr: "Logiciel de gestion", en: "Management software" };
const app: T = { fr: "Application", en: "App" };

export const projects: Project[] = [
  {
    slug: "gspe-b2d",
    name: "GSPE B2D",
    client: {
      fr: "Groupe Scolaire Privé Excellence Baye Dame Dièye, Saint-Louis (Sénégal)",
      en: "Groupe Scolaire Privé Excellence Baye Dame Dièye, Saint-Louis (Senegal)",
    },
    year: "2026",
    featured: true,
    parts: [site, backOffice],
    summary: {
      fr: "Le site de l'école et sa plateforme de gestion : inscriptions, paiements et comptabilité sur trois campus.",
      en: "The school's website and its management platform: enrolment, payments and accounting across three campuses.",
    },
    need: {
      fr: "Trois campus, plusieurs centaines d'élèves, et des inscriptions et paiements suivis sur papier et dans des fichiers Excel.",
      en: "Three campuses, several hundred students, and enrolments and payments tracked on paper and in Excel files.",
    },
    built: {
      fr: [
        "Le site public, avec préinscription en ligne.",
        "Un back-office multi-campus : inscription au guichet, élèves, classes, paiements Wave et PayTech.",
        "Une comptabilité au format SYSCOHADA et des tableaux de bord par campus.",
        "La reprise des anciens fichiers Excel, la double authentification et plus de 4 400 tests automatisés.",
      ],
      en: [
        "The public website, with online pre-registration.",
        "A multi-campus back-office: front-desk enrolment, students, classes, Wave and PayTech payments.",
        "SYSCOHADA accounting and per-campus dashboards.",
        "Import of the old Excel files, two-factor login and more than 4,400 automated tests.",
      ],
    },
    stack: ["Next.js", "Laravel 12", "Filament", "PHP"],
    links: [
      { label: { fr: "gspeb2d.com", en: "gspeb2d.com" }, href: "https://gspeb2d.com" },
      { label: { fr: "gestion.gspeb2d.com", en: "gestion.gspeb2d.com" }, href: "https://gestion.gspeb2d.com" },
    ],
    cover: { src: gspeApp, alt: { fr: "Tableau de bord de la gestion GSPE", en: "GSPE management dashboard" } },
    gallery: [
      { src: gspeSite, alt: { fr: "Page d'accueil de gspeb2d.com", en: "gspeb2d.com home page" } },
      { src: gspeApp3, alt: { fr: "Suivi des inscriptions en Kanban", en: "Enrolment tracking board" } },
      { src: gspeApp4, alt: { fr: "Tableau de bord d'un campus", en: "Campus dashboard" } },
      { src: gspeApp5, alt: { fr: "Inscription d'un élève au guichet", en: "Front-desk student enrolment" } },
      { src: gspeApp2, alt: { fr: "Paiements d'un campus", en: "Campus payments" } },
      { src: gspeSite2, alt: { fr: "Chiffres clés sur le site de l'école", en: "Key figures on the school website" } },
    ],
    mobile: { src: gspeMobile, alt: { fr: "gspeb2d.com sur téléphone", en: "gspeb2d.com on a phone" } },
  },
  {
    slug: "technick-store",
    name: "Technick Store",
    client: { fr: "Magasin d'électronique, Totsi (Lomé)", en: "Electronics store, Totsi (Lomé)" },
    year: "2026",
    featured: true,
    parts: [site, backOffice],
    summary: {
      fr: "La boutique en ligne d'un magasin tech de Lomé et le logiciel qui gère tout le magasin.",
      en: "The online store of a Lomé tech shop, and the software that runs the whole shop.",
    },
    need: {
      fr: "Le magasin voulait un catalogue en ligne et un seul outil pour la caisse, le stock, les commandes et la comptabilité.",
      en: "The shop wanted an online catalogue and a single tool for the till, stock, orders and accounting.",
    },
    built: {
      fr: [
        "Le catalogue en ligne, avec commande par WhatsApp et paiement.",
        "Une caisse, la gestion des commandes, des devis et du service après-vente.",
        "Le stock, les achats, la comptabilité et les statistiques de vente.",
        "Les comptes employés avec rôles, l'historique des actions et les sauvegardes.",
      ],
      en: [
        "The online catalogue, with WhatsApp ordering and payment.",
        "A point of sale, plus orders, quotes and after-sales service.",
        "Stock, purchasing, accounting and sales statistics.",
        "Staff accounts with roles, an activity log and backups.",
      ],
    },
    stack: ["Next.js", "TypeScript", "Firebase", "Cloudinary"],
    links: [
      { label: { fr: "technickstore.com", en: "technickstore.com" }, href: "https://technickstore.com" },
      { label: { fr: "gestion.technickstore.com", en: "gestion.technickstore.com" }, href: "https://gestion.technickstore.com" },
    ],
    cover: { src: technickSite, alt: { fr: "Page d'accueil de technickstore.com", en: "technickstore.com home page" } },
    gallery: [
      { src: technickSite2, alt: { fr: "Catégories et produits de la boutique", en: "Store categories and products" } },
      { src: technickApp, alt: { fr: "Connexion à l'espace de gestion", en: "Management area sign-in" } },
    ],
    mobile: { src: technickMobile, alt: { fr: "technickstore.com sur téléphone", en: "technickstore.com on a phone" } },
  },
  {
    slug: "shenco",
    name: "Shenco Empire",
    client: { fr: "Shenco Empire SARL, Togo", en: "Shenco Empire SARL, Togo" },
    year: "2026",
    featured: true,
    parts: [site, backOffice],
    summary: {
      fr: "La boutique en ligne d'un éleveur de moutons et de volailles, la location de camions, et le logiciel de gestion de l'élevage.",
      en: "An online shop for a sheep and poultry farm, truck hire, and the software that runs the farm.",
    },
    need: {
      fr: "Shenco voulait vendre ses bêtes et louer ses camions en ligne. L'élevage, lui, était suivi dans un seul fichier Excel : animaux, poids, santé, croisements et dépenses.",
      en: "Shenco wanted to sell its animals and hire out its trucks online. The farm itself was tracked in a single Excel file: animals, weights, health, breeding and expenses.",
    },
    built: {
      fr: [
        "La boutique : catalogue filtrable, fiche par animal avec photos, poids, âge et prix.",
        "La commande en 4 étapes, envoyée directement ou par WhatsApp, avec un e-mail à l'équipe et au client.",
        "La location de camions avec chauffeur et la demande de prix, une application installable qui marche hors ligne.",
        "Le tableau de bord du site : commandes, produits, camions, messages et statistiques.",
        "La gestion de l'élevage : généalogie, pesées, santé, reproduction, stock d'aliments, finances et exports.",
      ],
      en: [
        "The shop: a filterable catalogue, one page per animal with photos, weight, age and price.",
        "Ordering in 4 steps, sent directly or over WhatsApp, with an email to the team and the customer.",
        "Truck hire with a driver and quote requests, in an installable app that works offline.",
        "The site's dashboard: orders, products, trucks, messages and statistics.",
        "Farm management: lineage, weights, health, breeding, feed stock, finances and exports.",
      ],
    },
    stack: ["Next.js", "Firebase", "Resend", "Laravel 12", "Filament"],
    links: [
      { label: { fr: "shencoempiresarl.com", en: "shencoempiresarl.com" }, href: "https://shencoempiresarl.com" },
      { label: { fr: "Gestion de l'élevage (interne)", en: "Farm management (internal)" } },
    ],
    cover: { src: shencoSite, alt: { fr: "Page d'accueil de shencoempiresarl.com", en: "shencoempiresarl.com home page" } },
    gallery: [
      { src: shencoShop, alt: { fr: "La boutique et ses filtres", en: "The shop and its filters" } },
      { src: shencoSite2, alt: { fr: "Les trois métiers de Shenco", en: "Shenco's three lines of business" } },
      { src: shencoOrder, alt: { fr: "La commande en 4 étapes", en: "The 4-step order" } },
      { src: shencoTransport, alt: { fr: "Location de camions avec chauffeur", en: "Truck hire with a driver" } },
      { src: shencoApp, alt: { fr: "Gestion de l'élevage : vue générale", en: "Farm management: overview" } },
      { src: shencoApp2, alt: { fr: "Gestion de l'élevage : fiches sanitaires", en: "Farm management: health records" } },
      { src: shencoApp3, alt: { fr: "Gestion de l'élevage : finances", en: "Farm management: finances" } },
      { src: shencoAppLogin, alt: { fr: "Écran de connexion de la gestion", en: "Management sign-in screen" } },
    ],
    mobile: { src: shencoMobile, alt: { fr: "shencoempiresarl.com sur téléphone", en: "shencoempiresarl.com on a phone" } },
  },
  {
    slug: "somayaf",
    name: "Somayaf",
    client: { fr: "Station-service Somayaf", en: "Somayaf filling station" },
    year: "2025",
    featured: true,
    parts: [backOffice],
    summary: {
      fr: "Le logiciel de gestion d'une station-service : ventes par pompe, cuves, jaugeages et rapports.",
      en: "Management software for a filling station: sales per pump, tanks, dipping and reports.",
    },
    need: {
      fr: "La station devait suivre chaque jour les ventes de chaque pompe, le niveau des cuves et le travail des pompistes.",
      en: "The station needed to track daily sales for each pump, tank levels and attendants' shifts.",
    },
    built: {
      fr: [
        "La saisie des ventes par pompe, par pompiste et par carburant.",
        "Le suivi des cuves, des jaugeages, des écarts et des approvisionnements.",
        "Des alertes quand une cuve passe sous le niveau critique.",
        "Des rapports de ventes et de station exportables en PDF.",
      ],
      en: [
        "Sales entry per pump, attendant and fuel type.",
        "Tank, dipping, variance and delivery tracking.",
        "Alerts when a tank drops below the critical level.",
        "Sales and station reports, exportable to PDF.",
      ],
    },
    stack: ["Laravel", "Filament", "Livewire", "PHP"],
    links: [{ label: { fr: "Logiciel interne, non public", en: "Internal software, not public" } }],
    cover: { src: somayafApp, alt: { fr: "Tableau de bord de Somayaf Gestion", en: "Somayaf management dashboard" } },
    gallery: [
      { src: somayafApp2, alt: { fr: "Rapport général de la station", en: "Station report" } },
      { src: somayafApp3, alt: { fr: "Liste des cuves et de leur niveau", en: "Tanks and their levels" } },
      { src: somayafAppLogin, alt: { fr: "Écran de connexion", en: "Sign-in screen" } },
    ],
  },
  {
    slug: "bkbg-hotels",
    name: "BKBG Hotels",
    client: { fr: "BKBG Hotels, Baguida (Lomé)", en: "BKBG Hotels, Baguida (Lomé)" },
    year: "2026",
    featured: false,
    parts: [site, backOffice],
    summary: {
      fr: "Le site d'un hôtel en bord de mer, avec une visite 3D de chaque chambre et un espace pour l'équipe.",
      en: "A website for a seaside hotel, with a 3D tour of every room and a back-office for the staff.",
    },
    need: {
      fr: "L'hôtel voulait un site neuf qui montre vraiment ses chambres, ses restaurants et ses salles, et qui envoie les demandes de réservation directement à la réception.",
      en: "The hotel wanted a new site that really shows its rooms, restaurants and function rooms, and sends booking requests straight to the front desk.",
    },
    built: {
      fr: [
        "Une maquette 3D de chaque chambre, générée depuis sa fiche : vue de jour ou de soir, trois points de vue, plein écran.",
        "La réservation en 4 étapes (dates, chambre, coordonnées, options), confirmée par WhatsApp, appel ou e-mail.",
        "Les pages gastronomie, événements avec demande de devis, l'hôtel et le contact.",
        "L'espace équipe : réservations avec statuts et export CSV, chambres, tarifs et photos, messages et réglages.",
      ],
      en: [
        "A 3D model of every room, built from its listing: day or evening light, three viewpoints, full screen.",
        "Booking in 4 steps (dates, room, details, extras), confirmed over WhatsApp, a call or email.",
        "Dining, events with a quote request, the hotel and contact pages.",
        "The staff area: bookings with statuses and CSV export, rooms, rates and photos, messages and settings.",
      ],
    },
    stack: ["Next.js", "React Three Fiber", "Firebase", "Tailwind CSS"],
    links: [
      {
        label: { fr: "bkbghotels.vercel.app (en validation)", en: "bkbghotels.vercel.app (under review)" },
        href: "https://bkbghotels.vercel.app",
      },
    ],
    cover: { src: bkbgSite, alt: { fr: "Page d'accueil de BKBG Hotels", en: "BKBG Hotels home page" } },
    gallery: [
      { src: bkbgRoom, alt: { fr: "Visite 3D de la Royal Room", en: "3D tour of the Royal Room" } },
      { src: bkbgSite2, alt: { fr: "L'hôtel présenté en quelques chiffres", en: "The hotel in a few figures" } },
      { src: bkbgBooking, alt: { fr: "Réservation, étape 1 : les dates", en: "Booking, step 1: dates" } },
      { src: bkbgDining, alt: { fr: "Les restaurants de l'hôtel", en: "The hotel's restaurants" } },
      { src: bkbgAdmin, alt: { fr: "Espace équipe : tableau de bord", en: "Staff area: dashboard" } },
      { src: bkbgAdmin2, alt: { fr: "Espace équipe : réservations", en: "Staff area: bookings" } },
      { src: bkbgAdmin3, alt: { fr: "Espace équipe : chambres et plans", en: "Staff area: rooms and floor plans" } },
    ],
    mobile: { src: bkbgMobile, alt: { fr: "BKBG Hotels sur téléphone", en: "BKBG Hotels on a phone" } },
  },
  {
    slug: "terre-de-victoire",
    name: "Terre de Victoire",
    client: { fr: "Victory Outreach, Lomé", en: "Victory Outreach, Lomé" },
    year: "2026",
    featured: false,
    wip: true,
    parts: [site],
    summary: {
      fr: "Le site d'une église de Lomé, en cours de développement.",
      en: "A website for a church in Lomé, in progress.",
    },
    need: {
      fr: "Permettre aux visiteurs de trouver vite l'heure des cultes, le direct et le chemin jusqu'à l'église, depuis un téléphone.",
      en: "Let visitors quickly find service times, the live stream and the way to the church, from a phone.",
    },
    built: {
      fr: [
        "Les horaires des cultes et le prochain rendez-vous.",
        "Le direct YouTube et les rediffusions.",
        "Une Bible en ligne.",
        "Un espace d'administration pour que l'équipe publie seule.",
      ],
      en: [
        "Service times and the next gathering.",
        "The YouTube live stream and replays.",
        "An online Bible.",
        "An admin area so the team can publish on its own.",
      ],
    },
    stack: ["Next.js", "React", "Tailwind CSS"],
    links: [{ label: { fr: "Aperçu en cours", en: "Work-in-progress preview" }, href: "https://victoryoutreachintl.vercel.app" }],
    cover: { src: victoireSite, alt: { fr: "Page d'accueil de Terre de Victoire", en: "Terre de Victoire home page" } },
    gallery: [{ src: victoireSite2, alt: { fr: "Programme de la semaine", en: "Weekly schedule" } }],
    mobile: { src: victoireMobile, alt: { fr: "Le site sur téléphone", en: "The site on a phone" } },
  },
  {
    slug: "sukulufe",
    name: "Sukulufe",
    client: { fr: "Projet personnel", en: "Personal project" },
    year: "2026",
    featured: false,
    wip: true,
    parts: [site, app],
    summary: {
      fr: "Une application pour payer l'école de ses enfants depuis son téléphone, en cours de développement.",
      en: "An app to pay your children's school fees from your phone, in progress.",
    },
    need: {
      fr: "Au Togo, payer l'école veut souvent dire faire la queue, transporter du liquide et garder des reçus papier.",
      en: "In Togo, paying school fees often means queuing, carrying cash and keeping paper receipts.",
    },
    built: {
      fr: [
        "Un parcours simple : créer un compte, ajouter son enfant, voir ce qui reste à payer.",
        "Le paiement par Mobile Money.",
        "Un reçu numérique pour chaque paiement.",
        "Une application mobile et un site de présentation.",
      ],
      en: [
        "A simple flow: create an account, add your child, see what is left to pay.",
        "Mobile Money payment.",
        "A digital receipt for every payment.",
        "A mobile app and a presentation website.",
      ],
    },
    stack: ["Next.js", "Flutter", "Dart"],
    links: [{ label: { fr: "Site de présentation", en: "Presentation website" }, href: "https://sukulufe.vercel.app" }],
    cover: { src: sukulufeSite, alt: { fr: "Page d'accueil de Sukulufe", en: "Sukulufe home page" } },
    gallery: [{ src: sukulufeSite2, alt: { fr: "Section du site de Sukulufe", en: "Sukulufe website section" } }],
    mobile: { src: sukulufeMobile, alt: { fr: "Sukulufe sur téléphone", en: "Sukulufe on a phone" } },
  },
  {
    slug: "togo-gospel-hub",
    name: "Togo Gospel Hub",
    client: { fr: "Projet personnel", en: "Personal project" },
    year: "2026",
    featured: false,
    wip: true,
    parts: [site],
    summary: {
      fr: "Un annuaire des professionnels du gospel togolais, en cours de développement.",
      en: "A directory of Togo's gospel professionals, in progress.",
    },
    need: {
      fr: "Les artistes, techniciens et studios du gospel se trouvent surtout par le bouche-à-oreille.",
      en: "Gospel artists, technicians and studios mostly find each other by word of mouth.",
    },
    built: {
      fr: [
        "Un annuaire par catégorie : artistes, producteurs, vidéastes, photographes.",
        "Un profil par professionnel, avec ses contacts.",
        "Un agenda des événements.",
        "Une recherche sur tout le site.",
      ],
      en: [
        "A directory by category: artists, producers, videographers, photographers.",
        "A profile for each professional, with contact details.",
        "An events calendar.",
        "Site-wide search.",
      ],
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    links: [{ label: { fr: "Aperçu en cours", en: "Work-in-progress preview" }, href: "https://togogospelbizz.vercel.app" }],
    cover: { src: gospelSite, alt: { fr: "Page d'accueil de Togo Gospel Hub", en: "Togo Gospel Hub home page" } },
    gallery: [{ src: gospelSite2, alt: { fr: "Profils de l'annuaire", en: "Directory profiles" } }],
    mobile: { src: gospelMobile, alt: { fr: "Togo Gospel Hub sur téléphone", en: "Togo Gospel Hub on a phone" } },
  },
];

export const tools: { name: string; note: T; href: string }[] = [
  {
    name: "Church OBS Control",
    note: { fr: "Piloter OBS depuis un navigateur pendant un culte en direct.", en: "Control OBS from a browser during a live service." },
    href: "https://github.com/Amedon-Roland/church-obs-control",
  },
  {
    name: "AppImage to Desktop",
    note: { fr: "Ajouter une AppImage au menu des applications Linux.", en: "Add an AppImage to the Linux app menu." },
    href: "https://github.com/Amedon-Roland/appimage-to-desktop-linux",
  },
  {
    name: "Organize Downloads",
    note: { fr: "Ranger le dossier Téléchargements par type de fichier.", en: "Sort the Downloads folder by file type." },
    href: "https://github.com/Amedon-Roland/organize_dowload_folder",
  },
];

export const findProject = (slug: string) => projects.find((p) => p.slug === slug);
