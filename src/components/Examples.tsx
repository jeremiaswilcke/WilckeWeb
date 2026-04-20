"use client";

import Image from "next/image";
import FadeIn from "./FadeIn";
import { ArrowRightIcon } from "./Icons";

interface Reference {
  title: string;
  url: string;
  image: string;
  isLocalImage: boolean;
  category: string;
  description: string;
  tags: readonly string[];
}

const references: readonly Reference[] = [
  {
    title: "Philosophischer Salon",
    url: "https://www.phil-salon.at",
    image: "/phil-salon-hero.png",
    isLocalImage: true,
    category: "Kultur & Wissenschaft",
    description:
      "Monatliche Vortragsreihe in Wien — Veranstaltungskalender, Nachberichte, akademisches Design.",
    tags: ["Next.js", "Headless WP", "SMTP"],
  },
  {
    title: "Ora Mundi",
    url: "https://oramundi.online",
    image: "/oramundi.png",
    isLocalImage: true,
    category: "Gebet & Community",
    description:
      'Plattform für gemeinschaftliches Gebet mit dem Versprechen „Du betest nie allein" — mehrsprachig.',
    tags: ["Next.js", "Mehrsprachig", "Community"],
  },
  {
    title: "OrdoFinder",
    url: "https://ordofinder.app",
    image: "/ordofinder.png",
    isLocalImage: true,
    category: "Liturgie",
    description:
      "Bewertungs- und Suchplattform für Messen und Gemeinden — mit Kartenansicht und Reviewer-System.",
    tags: ["Next.js", "Karte", "Bewertungen"],
  },
  {
    title: "Maria Brunn Digital",
    url: "https://mariabrunn-digital.at",
    image: "/mariabrunn-digital.png",
    isLocalImage: true,
    category: "Pfarrplattform",
    description:
      "Multimediale Plattform der Wiener Pfarre Mariabrunn — Predigten, Live-Gottesdienste, digitale Bibel.",
    tags: ["Next.js", "Live-Stream", "Community"],
  },
];

export default function Examples() {
  return (
    <section id="beispiele" className="py-[100px] max-md:py-16">
      <div className="max-w-[1440px] mx-auto px-6">
        <FadeIn>
          <div className="text-center max-w-[720px] mx-auto mb-12 max-md:mb-8">
            <span className="inline-block text-xs font-bold tracking-[0.14em] uppercase text-coral mb-3">
              Referenzen
            </span>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-tight tracking-tight">
              Projekte, an denen ich gebaut habe
            </h2>
            <p className="text-muted text-[1.02rem] leading-relaxed mt-4">
              Ein Auszug aus laufenden und abgeschlossenen Arbeiten.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6 max-w-[1100px] mx-auto">
          {references.map((ref) => (
            <FadeIn key={ref.url}>
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full rounded-2xl border border-line bg-white overflow-hidden
                  hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(63,63,63,0.1)]
                  transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-bg-soft">
                  {ref.isLocalImage ? (
                    <Image
                      src={ref.image}
                      alt={ref.title}
                      fill
                      className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={ref.image}
                      alt={ref.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  )}
                </div>

                <div className="p-6 max-md:p-5">
                  <span className="inline-block text-[0.7rem] font-bold tracking-[0.1em] uppercase text-coral mb-2">
                    {ref.category}
                  </span>
                  <h3 className="text-[1.18rem] font-bold tracking-tight mb-2">
                    {ref.title}
                  </h3>
                  <p className="text-muted text-[0.88rem] leading-relaxed mb-4">
                    {ref.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 mb-5">
                    {ref.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[0.68rem] font-semibold text-muted bg-line/50 px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-teal group-hover:gap-2.5 transition-all duration-300">
                    Website besuchen
                    <ArrowRightIcon size={13} />
                  </span>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
