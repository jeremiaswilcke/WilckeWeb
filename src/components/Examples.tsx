"use client";

import { useState } from "react";
import Image from "next/image";
import FadeIn from "./FadeIn";
import { ArrowRightIcon } from "./Icons";

const screenshots = [
  { src: "/phil-salon-hero.png", alt: "Startseite mit Hero-Slider" },
  { src: "/phil-salon-veranstaltungen.png", alt: "Veranstaltungsübersicht" },
  { src: "/phil-salon-nachberichte.png", alt: "Nachberichte vergangener Salons" },
];

export default function Examples() {
  const [open, setOpen] = useState(false);
  const [activeShot, setActiveShot] = useState(0);

  return (
    <>
      <section id="beispiele" className="py-[100px] max-md:py-16">
        <div className="max-w-[1440px] mx-auto px-6">
          <FadeIn>
            <div className="max-w-[720px] mx-auto">
              {/* Compact Showcase Card */}
              <button
                onClick={() => setOpen(true)}
                className="w-full text-left rounded-2xl border border-line bg-white overflow-hidden
                  hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(63,63,63,0.1)]
                  transition-all duration-300 group cursor-pointer"
              >
                <div className="flex max-md:flex-col">
                  {/* Thumbnail */}
                  <div className="relative w-[280px] max-md:w-full max-md:h-[180px] shrink-0 overflow-hidden">
                    <Image
                      src="/phil-salon-hero.png"
                      alt="Philosophischer Salon"
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-6 flex flex-col justify-center">
                    <span className="inline-block text-[0.7rem] font-bold tracking-[0.1em] uppercase text-coral mb-1.5 w-fit">
                      Referenzprojekt
                    </span>
                    <h3 className="text-[1.15rem] font-bold tracking-tight mb-1.5">
                      Philosophischer Salon
                    </h3>
                    <p className="text-muted text-[0.85rem] leading-relaxed mb-3">
                      Akademische Plattform — Next.js + Headless WordPress
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-teal group-hover:gap-2.5 transition-all duration-300">
                      Projekt ansehen
                      <ArrowRightIcon size={13} />
                    </span>
                  </div>
                </div>
              </button>

              {/* Tech Tags */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                {["Next.js", "Headless WP", "WWD", "SMTP", "Responsive"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.72rem] font-semibold text-muted bg-line/50 px-3 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Popup / Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 max-md:p-2"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" />

          {/* Modal */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl max-w-[900px] w-full max-h-[90vh] overflow-y-auto
              shadow-[0_32px_80px_rgba(0,0,0,0.3)] animate-scaleIn"
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10
                flex items-center justify-center transition-colors"
              aria-label="Schließen"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Screenshot Viewer */}
            <div className="relative aspect-[16/9] bg-anthracite overflow-hidden rounded-t-3xl">
              <Image
                src={screenshots[activeShot].src}
                alt={screenshots[activeShot].alt}
                fill
                className="object-cover object-top"
              />
            </div>

            {/* Thumbnail Nav */}
            <div className="flex gap-2 px-6 py-4 border-b border-line">
              {screenshots.map((shot, i) => (
                <button
                  key={shot.src}
                  onClick={() => setActiveShot(i)}
                  className={`relative h-14 w-24 rounded-lg overflow-hidden border-2 transition-all
                    ${i === activeShot ? "border-teal shadow-[0_0_0_1px_var(--color-teal)]" : "border-transparent opacity-60 hover:opacity-100"}`}
                >
                  <Image src={shot.src} alt={shot.alt} fill className="object-cover object-top" />
                </button>
              ))}
            </div>

            {/* Info */}
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 max-md:flex-col">
                <div>
                  <span className="inline-block text-[0.7rem] font-bold tracking-[0.1em] uppercase text-coral mb-1.5">
                    Kultur & Wissenschaft
                  </span>
                  <h3 className="text-xl font-bold tracking-tight mb-2">
                    Philosophischer Salon — Debatte um Prinzipien
                  </h3>
                  <p className="text-muted text-[0.9rem] leading-relaxed max-w-[560px]">
                    Monatliche Vortragsreihe in Wien zu philosophischen, politischen und historischen Themen.
                    Veranstaltungskalender, Nachberichte, elegantes Design mit akademischem Charakter.
                  </p>
                </div>
                <a
                  href="https://www.phil-salon.at"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[0.88rem] font-semibold text-teal
                    px-5 py-2.5 rounded-full border border-teal/30 hover:bg-teal hover:text-white
                    transition-all duration-300 whitespace-nowrap shrink-0"
                >
                  Website besuchen
                  <ArrowRightIcon size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
