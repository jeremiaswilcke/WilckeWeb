import Image from "next/image";
import FadeIn from "./FadeIn";
import { ArrowRightIcon } from "./Icons";

const screenshots = [
  { src: "/phil-salon-hero.png", alt: "Philosophischer Salon — Startseite mit Hero-Slider" },
  { src: "/phil-salon-veranstaltungen.png", alt: "Philosophischer Salon — Veranstaltungsübersicht" },
  { src: "/phil-salon-nachberichte.png", alt: "Philosophischer Salon — Nachberichte vergangener Salons" },
];

export default function Examples() {
  return (
    <section id="beispiele" className="py-[140px] max-md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeIn>
          <div className="text-center max-w-[680px] mx-auto mb-16">
            <span className="inline-block text-xs font-bold tracking-[0.14em] uppercase text-coral mb-4">
              Referenzprojekt
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight">
              Philosophischer Salon
            </h2>
            <p className="text-muted text-[1.05rem] leading-relaxed mt-4">
              Eine akademische Plattform für freien Diskurs und tiefgreifende Debatten —
              realisiert mit Next.js und Headless WordPress.
            </p>
          </div>
        </FadeIn>

        {/* Main Showcase */}
        <FadeIn>
          <a
            href="https://www.phil-salon.at"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-3xl border border-line overflow-hidden bg-white
              hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(63,63,63,0.1)]
              transition-all duration-300 mb-8"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src="/phil-salon-hero.png"
                alt="Philosophischer Salon — Startseite"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="p-8 max-md:p-5">
              <div className="flex items-start justify-between gap-4 max-md:flex-col">
                <div>
                  <span className="inline-block text-[0.75rem] font-bold tracking-[0.08em] uppercase text-coral mb-2">
                    Kultur & Wissenschaft
                  </span>
                  <h3 className="text-[clamp(1.25rem,2vw,1.6rem)] font-bold tracking-tight mb-2">
                    Philosophischer Salon — Debatte um Prinzipien
                  </h3>
                  <p className="text-muted text-[0.92rem] leading-relaxed max-w-[600px]">
                    Monatliche Vortragsreihe in Wien zu philosophischen, politischen und historischen Themen.
                    Veranstaltungskalender, Nachberichte, elegantes Design mit akademischem Charakter.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[0.88rem] font-semibold text-teal whitespace-nowrap shrink-0 mt-1">
                  Website besuchen
                  <ArrowRightIcon size={14} />
                </span>
              </div>
            </div>
          </a>
        </FadeIn>

        {/* Detail Screenshots */}
        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
          {screenshots.slice(1).map((shot, i) => (
            <FadeIn key={shot.src} delay={((i + 1) as 1 | 2)}>
              <div className="rounded-2xl border border-line overflow-hidden bg-white">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="px-5 py-4">
                  <p className="text-muted text-[0.82rem]">{shot.alt}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Tech Stack Badge */}
        <FadeIn>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
            {["Next.js", "Headless WordPress", "WilckeWebDeployer", "SMTP-Integration", "Responsive Design"].map((tag) => (
              <span
                key={tag}
                className="text-[0.78rem] font-semibold text-anthracite bg-line/60 px-4 py-2 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
