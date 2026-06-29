import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Journey from "@/components/Journey";
import GameComponents from "@/components/GameComponents";
import HowToPlay from "@/components/HowToPlay";
import Gallery from "@/components/Gallery";
import Preorder from "@/components/Preorder";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Journey />
        <GameComponents />
        <HowToPlay />
        <About />
        <Gallery />
        <Preorder />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
