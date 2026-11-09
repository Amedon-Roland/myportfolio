import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { projectPath } from "@/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const home = {
    url: `${profile.url}/`,
    alternates: { languages: { fr: `${profile.url}/`, en: `${profile.url}/en` } },
    priority: 1,
  };
  const pages = projects.map((p) => ({
    url: `${profile.url}${projectPath("fr", p.slug)}`,
    alternates: {
      languages: {
        fr: `${profile.url}${projectPath("fr", p.slug)}`,
        en: `${profile.url}${projectPath("en", p.slug)}`,
      },
    },
    priority: p.featured ? 0.8 : 0.6,
  }));
  return [home, ...pages];
}
