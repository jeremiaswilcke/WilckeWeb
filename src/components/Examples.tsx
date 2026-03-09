import FadeIn from "./FadeIn";
import { PlayIcon, MicIcon, UsersLargeIcon, SlidersIcon, ArrowRightIcon } from "./Icons";

const examples = [
  {
    icon: <PlayIcon />,
    gradient: "from-teal to-teal-dark",
    tag: "Gemeinde & Kirche",
    title: "Pfarre St. Maria",
    text: "Veranstaltungen, Gottesdienstzeiten, Neuigkeiten und Kontaktmöglichkeiten — übersichtlich und einladend für die ganze Gemeinde.",
  },
  {
    icon: <MicIcon />,
    gradient: "from-[#b18152] to-[#d4a574]",
    tag: "Podcast & Medien",
    title: "Bold Sisters Podcast",
    text: "Klare Markenidentität, Episodenübersicht, Einbindung von Streaming-Plattformen und ein Newsletter für die Community.",
  },
  {
    icon: <UsersLargeIcon />,
    gradient: "from-coral to-[#fb9e97]",
    tag: "Verein & Organisation",
    title: "Sportverein U20",
    text: "Mitgliederbereiche, Termine, Ergebnisse und Neuigkeiten — eine lebendige Website für ein aktives Vereinsleben.",
  },
  {
    icon: <SlidersIcon />,
    gradient: "from-anthracite to-anthracite-light",
    tag: "Dienstleister",
    title: "Coaching & Beratung",
    text: "Professionelle Onlinepräsenz mit Terminbuchung, Leistungsübersicht und persönlicher Vorstellung — klar und vertrauenswürdig.",
  },
];

export default function Examples() {
  return (
    <section id="beispiele" className="py-[140px] max-md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeIn>
          <div className="text-center max-w-[680px] mx-auto mb-16">
            <span className="inline-block text-xs font-bold tracking-[0.14em] uppercase text-coral mb-4">
              Beispielprojekte
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight">
              Websites für verschiedene Welten
            </h2>
            <p className="text-muted text-[1.05rem] leading-relaxed mt-4">
              Jedes Projekt ist anders. Hier sehen Sie, welche Arten von
              Websites mit WilckeWeb entstehen können.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
          {examples.map((ex, i) => (
            <FadeIn key={ex.title} delay={((i % 2) + 1) as 1 | 2}>
              <div
                className="rounded-3xl border border-line overflow-hidden bg-white
                  hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(63,63,63,0.1)]
                  transition-all duration-300"
              >
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
                  <span className="inline-flex items-center gap-1.5 text-[0.88rem] font-semibold text-teal hover:gap-2.5 transition-all duration-300 cursor-pointer">
                    Projekt ansehen
                    <ArrowRightIcon size={14} />
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
