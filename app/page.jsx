import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechLogoStrip from "@/components/TechLogoStrip";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050914]">
      <Navbar />
      <Hero />
      <TechLogoStrip />
      <Services />
      <Portfolio />
      <About />
      <Footer />
    </main>
  );
}
