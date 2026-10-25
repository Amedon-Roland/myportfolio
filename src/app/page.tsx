import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
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
        <Work />
        <About />
        <Method />
        <Atelier />
        <Contact />
      </main>
    </>
  );
}
