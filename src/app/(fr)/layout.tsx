import type { Metadata } from "next";
import { RootShell } from "@/components/RootShell";
import { homeMetadata } from "@/seo";

export { viewport } from "@/seo";

export const metadata: Metadata = homeMetadata("fr");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="fr">{children}</RootShell>;
}
