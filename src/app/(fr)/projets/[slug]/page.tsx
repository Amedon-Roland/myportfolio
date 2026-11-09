import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Frame } from "@/components/Frame";
import { ProjectPage } from "@/components/ProjectPage";
import { findProject, projects } from "@/data/projects";
import { projectPath } from "@/i18n";
import { projectMetadata } from "@/seo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projets/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  return project ? projectMetadata(project, "fr") : {};
}

export default async function Page({ params }: PageProps<"/projets/[slug]">) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();
  return (
    <Frame lang="fr" altHref={projectPath("en", slug)}>
      <ProjectPage project={project} lang="fr" />
    </Frame>
  );
}
