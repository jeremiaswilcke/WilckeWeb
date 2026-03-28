"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import FadeIn from "./FadeIn";

export default function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = windowHeight * 0.7;
      const end = windowHeight * 0.15;

      if (rect.top >= start) {
        setProgress(0);
      } else if (rect.top <= end) {
        setProgress(1);
      } else {
        setProgress(1 - (rect.top - end) / (start - end));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ueber-mich"
      className="py-[140px] max-md:py-20 bg-white border-t border-b border-line"
      aria-label="Über Jeremias Wilcke — Gründer von WilckeWeb"
      itemScope
      itemType="https://schema.org/Person"
    >
      <meta itemProp="name" content="Jeremias Wilcke" />
      <meta itemProp="jobTitle" content="Webentwickler & Designer" />
      <meta itemProp="url" content="https://wilckeweb.org" />
      <meta itemProp="image" content="https://wilckeweb.org/about-photo.png" />

      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-[1fr_1fr] gap-20 items-center max-lg:grid-cols-1 max-lg:gap-12">
          {/* Image with scroll cross-fade */}
          <div className="relative w-full max-w-[560px] mx-auto max-lg:max-w-[420px]">
            <div className="relative aspect-square">
              {/* Sketch layer (bottom — revealed as photo fades) */}
              <Image
                src="/about-sketch-bg.png"
                alt="Jeremias Wilcke — Bleistiftzeichnung am Arbeitsplatz"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 420px, 560px"
              />

              {/* Photo layer (top — fades out on scroll) */}
              <div
                className="absolute inset-0"
                style={{ opacity: 1 - progress }}
              >
                <Image
                  src="/about-photo.png"
                  alt="Jeremias Wilcke — Webentwickler und Gründer von WilckeWeb, am Schreibtisch mit Code-Editor"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 420px, 560px"
                  priority
                />
              </div>

              {/* Subtle glow */}
              <div
                className="absolute -inset-4 rounded-3xl -z-10"
                style={{
                  background: progress < 0.5
                    ? "radial-gradient(circle, rgba(86,160,168,0.12) 0%, transparent 70%)"
                    : "radial-gradient(circle, rgba(249,125,115,0.08) 0%, transparent 70%)",
                  opacity: 0.8,
                }}
              />
            </div>
          </div>

          {/* Text content */}
          <div className="max-w-[640px]">
            <FadeIn>
              <span className="inline-block text-xs font-bold tracking-[0.14em] uppercase text-coral mb-4">
                Über mich
              </span>
              <h2
                className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight mb-6"
                itemProp="description"
              >
                Jeremias Wilcke —<br />
                Webentwickler aus Österreich
              </h2>
            </FadeIn>
            <FadeIn delay={1}>
              <p className="text-muted text-[1.05rem] leading-[1.8] mb-5">
                Hinter WilckeWeb stehe ich — Jeremias Wilcke, Webentwickler
                und Designer aus Mauerbach bei Wien. Ich entwickle moderne
                Websites mit <strong className="text-text font-semibold">Next.js und Headless WordPress</strong>,
                die schnell laden, gut aussehen und einfach zu pflegen sind.
              </p>
              <p className="text-muted text-[1.05rem] leading-[1.8] mb-5">
                Mein Ansatz: Technik soll im Hintergrund funktionieren, damit
                Sie sich auf Ihr Geschäft konzentrieren können. Kein
                Fachjargon, keine unnötige Komplexität — sondern klare
                Lösungen, die wirklich helfen. Jedes Projekt betreue ich
                persönlich, von der ersten Idee bis zum Go-Live.
              </p>
              <p className="text-muted text-[1.05rem] leading-[1.8] mb-8">
                Sie bekommen nicht irgendeine Agentur, sondern einen direkten
                Ansprechpartner, der Ihr Projekt kennt und sich darum kümmert.
              </p>
              <a
                href="/#kontakt"
                className="inline-flex items-center gap-2 font-semibold text-[0.95rem] px-8 py-3.5 rounded-full
                  bg-teal text-white hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(86,160,168,0.3)]
                  transition-all duration-300"
              >
                Projekt besprechen
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
