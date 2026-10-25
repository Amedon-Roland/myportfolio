import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
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
        <Method />
        <Atelier />
        <Contact />
      </main>
    </>
  );
}
