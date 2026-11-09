import type { Metadata, Viewport } from "next";
import { homePath, projectPath, type Lang } from "@/i18n";
import { profile } from "@/data/profile";
import type { Project } from "@/data/projects";

const titles = {
  fr: "Roland Amedon, développeur full-stack à Lomé",
  en: "Roland Amedon, full-stack developer in Lomé",
};

const descriptions = {
  fr: "Je développe des sites web, des boutiques en ligne et des logiciels de gestion pour les entreprises, au Togo et ailleurs.",
  en: "I build websites, online stores and management software for businesses, in Togo and beyond.",
};

export const viewport: Viewport = {
  themeColor: "#0a0b0f",
  colorScheme: "dark light",
};

export function homeMetadata(lang: Lang): Metadata {
  return {
    metadataBase: new URL(profile.url),
    title: { default: titles[lang], template: `%s · Roland Amedon` },
    description: descriptions[lang],
    alternates: {
      canonical: homePath(lang),
      languages: { fr: "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      url: homePath(lang),
      siteName: profile.name,
      title: titles[lang],
      description: descriptions[lang],
    },
    twitter: { card: "summary_large_image", title: titles[lang], description: descriptions[lang] },
  };
}

export function projectMetadata(p: Project, lang: Lang): Metadata {
  return {
    metadataBase: new URL(profile.url),
    title: p.name,
    description: p.summary[lang],
    alternates: {
      canonical: projectPath(lang, p.slug),
      languages: { fr: projectPath("fr", p.slug), en: projectPath("en", p.slug) },
    },
    openGraph: { title: `${p.name} · Roland Amedon`, description: p.summary[lang], url: projectPath(lang, p.slug) },
  };
}
