import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Calculator from "@/components/Calculator";
import Examples from "@/components/Examples";
import Trust from "@/components/Trust";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Process />
        <Calculator />
        <Examples />
        <Trust />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
