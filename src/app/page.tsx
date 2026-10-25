import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Data } from "@/components/Data";
import { Work } from "@/components/Work";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Method } from "@/components/Method";
import { Atelier } from "@/components/Atelier";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="contenu">
        <Hero />
        <Marquee />
        <Data />
        <Work />
        <Services />
        <About />
        <Method />
        <Atelier />
        <Contact />
      </main>
    </>
  );
}
