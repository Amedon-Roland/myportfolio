import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Newsreader } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/data/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
  axes: ["opsz", "wdth"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const description =
  "Roland Amedon, développeur full-stack à Lomé. Sites, applications mobiles et back-offices pour les églises, les écoles, la santé et les familles d'Afrique de l'Ouest.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Roland Amedon, développeur full-stack à Lomé",
    template: "%s, Roland Amedon",
  },
  description,
  authors: [{ name: site.name, url: site.github }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: site.name,
    title: "Roland Amedon, développeur full-stack à Lomé",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Roland Amedon, développeur full-stack à Lomé",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#10162b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${bricolage.variable} ${newsreader.variable} antialiased`}>
      <body className="grain min-h-dvh">
        <a
          href="#contenu"
          className="font-display sr-only z-[70] rounded bg-gold px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Aller au contenu
        </a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
