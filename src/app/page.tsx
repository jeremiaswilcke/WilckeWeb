import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import USP from "@/components/USP";
import Process from "@/components/Process";
import Calculator from "@/components/Calculator";
import ContactForm from "@/components/ContactForm";
import Technology from "@/components/Technology";
import Examples from "@/components/Examples";
import Trust from "@/components/Trust";
import AboutMe from "@/components/AboutMe";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { ProjectProvider } from "@/lib/ProjectContext";

export default function Home() {
  return (
    <ProjectProvider>
      <Header />
      <main>
        <Hero />
        <Services />
        <USP />
        <Process />
        <Calculator />
        <ContactForm />
        <Technology />
        <Examples />
        <Trust />
        <AboutMe />
        <FinalCTA />
      </main>
      <Footer />
    </ProjectProvider>
  );
}
