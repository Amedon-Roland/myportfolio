import type { Metadata } from "next";
import { RootShell } from "@/components/RootShell";
import { homeMetadata } from "@/seo";

export { viewport } from "@/seo";

export const metadata: Metadata = homeMetadata("en");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
