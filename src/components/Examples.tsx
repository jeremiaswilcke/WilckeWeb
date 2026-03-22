import FadeIn from "./FadeIn";
import { PlayIcon, MicIcon, UsersLargeIcon, SlidersIcon, ArrowRightIcon } from "./Icons";

interface Example {
  icon: React.ReactNode;
  gradient: string;
  tag: string;
  title: string;
  text: string;
  href?: string;
}

const examples: Example[] = [
  {
    icon: <PlayIcon />,
    gradient: "from-[#145073] to-[#69AFD2]",
    tag: "Gemeinde & Digitale Medien",
    title: "Mariabrunn Digital",
    text: "Livestreams, tägliche Kurzauslegungen, Gottesdienstordnung und ein Bibelprojekt — eine Pfarre, die den digitalen Raum als Verkündungsort nutzt.",
    href: "https://mariabrunn-digital.at",
  },
  {
    icon: <SlidersIcon />,
    gradient: "from-[#b18152] to-[#d4a574]",
    tag: "Philosophie & Salon",
    title: "Phil-Salon",
    text: "Veranstaltungen, Vorträge und philosophische Gesprächsabende — eine einladende Plattform für Menschen, die gemeinsam nachdenken wollen.",
    href: "https://phil-salon.at",
  },
  {
    icon: <UsersLargeIcon />,
    gradient: "from-coral to-[#fb9e97]",
    tag: "Verein & Organisation",
    title: "Ihr Verein oder Ihre Organisation",
    text: "Mitgliederbereiche, Termine, Neuigkeiten und Kontaktmöglichkeiten — eine lebendige Website, die Ihre Gemeinschaft stärkt und nach aussen sichtbar macht.",
  },
  {
    icon: <MicIcon />,
    gradient: "from-anthracite to-anthracite-light",
    tag: "Dienstleister & Freiberufler",
    title: "Ihre professionelle Onlinepräsenz",
    text: "Leistungsübersicht, Terminbuchung, persönliche Vorstellung und Referenzen — klar, vertrauenswürdig und auf Ihre Zielgruppe zugeschnitten.",
  },
];

export default function Examples() {
  return (
    <section id="beispiele" className="py-[140px] max-md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeIn>
          <div className="text-center max-w-[680px] mx-auto mb-16">
            <span className="inline-block text-xs font-bold tracking-[0.14em] uppercase text-coral mb-4">
              Referenzen & Möglichkeiten
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight">
              Websites für verschiedene Welten
            </h2>
            <p className="text-muted text-[1.05rem] leading-relaxed mt-4">
              Jedes Projekt ist anders. Hier sehen Sie realisierte Projekte und
              welche Arten von Websites mit WilckeWeb entstehen können.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
          {examples.map((ex, i) => (
            <FadeIn key={ex.title} delay={((i % 2) + 1) as 1 | 2}>
              {ex.href ? (
                <a
                  href={ex.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-3xl border border-line overflow-hidden bg-white
                    hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(63,63,63,0.1)]
                    transition-all duration-300"
                >
                  <ExampleContent ex={ex} hasLink />
                </a>
              ) : (
                <div
                  className="rounded-3xl border border-line overflow-hidden bg-white
                    hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(63,63,63,0.1)]
                    transition-all duration-300"
                >
                  <ExampleContent ex={ex} />
                </div>
              )}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExampleContent({ ex, hasLink }: { ex: Example; hasLink?: boolean }) {
  return (
    <>
      <div
        className={`h-[200px] flex items-center justify-center text-white bg-gradient-to-br ${ex.gradient}`}
      >
        {ex.icon}
      </div>
      <div className="p-7">
        <span className="inline-block text-[0.75rem] font-bold tracking-[0.08em] uppercase text-coral mb-2">
          {ex.tag}
        </span>
        <h3 className="text-[clamp(1.25rem,2vw,1.5rem)] font-bold tracking-tight mb-2">
          {ex.title}
        </h3>
        <p className="text-muted text-[0.9rem] leading-relaxed mb-4">
          {ex.text}
        </p>
        {hasLink ? (
          <span className="inline-flex items-center gap-1.5 text-[0.88rem] font-semibold text-teal hover:gap-2.5 transition-all duration-300">
            Website ansehen
            <ArrowRightIcon size={14} />
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-[0.88rem] font-semibold text-coral/60">
            Ihr Projekt?
          </span>
        )}
      </div>
    </>
  );
}
