import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { site } from "@/data/site";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const description =
  "Roland Amedon, data engineer et développeur full-stack à Lomé. Pipelines de données, tableaux de bord, sites et applications mobiles pour les organisations d'Afrique de l'Ouest.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Roland Amedon, data engineer et développeur full-stack",
    template: "%s, Roland Amedon",
  },
  description,
  authors: [{ name: site.name, url: site.github }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: site.name,
    title: "Roland Amedon, data engineer et développeur full-stack",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Roland Amedon, data engineer et développeur full-stack",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#07080c",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={geist.variable} suppressHydrationWarning>
      <head>
        {/* Apply a saved theme before the first paint; dark is the default. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
      </head>
      <body className="grain min-h-dvh">
        <a
          href="#contenu"
          className="sr-only z-[70] rounded-full bg-accent px-4 py-2 text-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Aller au contenu
        </a>
        <SmoothScroll>{children}</SmoothScroll>
        <Cursor />
      </body>
    </html>
  );
}
