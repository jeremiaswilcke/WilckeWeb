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
      className="py-[140px] max-md:py-20"
    >
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="grid grid-cols-[1fr_1.2fr] gap-16 items-center max-md:grid-cols-1 max-md:gap-10">
          {/* Image with scroll cross-fade */}
          <div className="relative w-full aspect-square max-w-[400px] mx-auto max-md:max-w-[320px]">
            {/* Sketch layer (bottom — revealed as photo fades) */}
            <Image
              src="/about-sketch-bg.png"
              alt="Jeremias Wilcke — Sketch"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 320px, 400px"
            />

            {/* Photo layer (top — fades out on scroll) */}
            <div
              className="absolute inset-0"
              style={{ opacity: 1 - progress }}
            >
              <Image
                src="/about-photo.png"
                alt="Jeremias Wilcke"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 320px, 400px"
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

          {/* Text content */}
          <div>
            <FadeIn>
              <span className="inline-block text-xs font-bold tracking-[0.14em] uppercase text-coral mb-4">
                Über mich
              </span>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight mb-6">
                Der Mensch hinter<br />
                WilckeWeb
              </h2>
            </FadeIn>
            <FadeIn delay={1}>
              <p className="text-muted text-[1.05rem] leading-[1.8] mb-5">
                Ich bin Jeremias — Webentwickler, Designer und Gründer von
                WilckeWeb. Ich baue Websites, die schnell laden, gut aussehen
                und einfach zu bedienen sind.
              </p>
              <p className="text-muted text-[1.05rem] leading-[1.8] mb-5">
                Mein Ansatz: Technik soll im Hintergrund funktionieren, damit
                Sie sich auf Ihr Geschäft konzentrieren können. Kein
                Fachjargon, keine unnötige Komplexität — sondern klare
                Lösungen, die wirklich helfen.
              </p>
              <p className="text-muted text-[1.05rem] leading-[1.8]">
                Jedes Projekt betreue ich persönlich — von der ersten Idee bis
                zum Go-Live und darüber hinaus.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
