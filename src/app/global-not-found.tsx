import type { Metadata } from "next";
import { RootShell } from "@/components/RootShell";
import { Frame } from "@/components/Frame";
import { NotFoundPage } from "@/components/NotFoundPage";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: "Page introuvable · Roland Amedon",
  robots: { index: false },
};

/** Any URL that matches no route, in either language, lands here. */
export default function GlobalNotFound() {
  return (
    <RootShell lang="fr">
      <Frame lang="fr" altHref="/en">
        <NotFoundPage lang="fr" />
      </Frame>
    </RootShell>
  );
}
