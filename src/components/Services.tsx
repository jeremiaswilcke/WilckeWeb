import FadeIn from "./FadeIn";
import {
  BrowserIcon,
  GlobeIcon,
  EditIcon,
  BookIcon,
  CompassIcon,
  ShieldIcon,
} from "./Icons";

const services = [
  {
    icon: <BrowserIcon />,
    title: "Moderne Websites",
    text: "Ob Onepager oder mehrseitige Website — klar strukturiert, visuell hochwertig und für alle Geräte optimiert.",
    warm: false,
  },
  {
    icon: <GlobeIcon />,
    title: "Relaunch & Redesign",
    text: "Ihre bestehende Website braucht ein Update? Inhalte, Struktur und Design werden neu gedacht — mit Blick auf das, was heute zählt.",
    warm: false,
  },
  {
    icon: <EditIcon />,
    title: "Individuelle Funktionen",
    text: "Blog, Terminbuchung, Newsletter, Mehrsprachigkeit oder Shop — die Website bekommt genau die Funktionen, die Sie brauchen.",
    warm: false,
  },
  {
    icon: <BookIcon />,
    title: "Texte & Inhalte",
    text: "Sie haben noch keine Texte? Kein Problem. Auf Wunsch werden verständliche, ansprechende Inhalte für Ihre Website erstellt.",
    warm: true,
  },
  {
    icon: <CompassIcon />,
    title: "Begleitung & Beratung",
    text: "Von der Planung bis zur Fertigstellung sind Sie nicht allein. Sie erhalten ehrliche Beratung und klare Empfehlungen.",
    warm: true,
  },
  {
    icon: <ShieldIcon />,
    title: "Wartung & Sicherheit",
    text: "Nach dem Launch optional: regelmäßige Updates, Backups und technische Pflege, damit Ihre Website sicher und aktuell bleibt.",
    warm: true,
  },
];

export default function Services() {
  return (
    <section
      id="leistungen"
      className="py-[140px] max-md:py-20 bg-white border-t border-b border-line"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeIn>
          <div className="text-center max-w-[680px] mx-auto mb-16">
            <span className="inline-block text-xs font-bold tracking-[0.14em] uppercase text-coral mb-4">
              Leistungen
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight">
              Was WilckeWeb für Sie tut
            </h2>
            <p className="text-muted text-[1.05rem] leading-relaxed mt-4">
              Von der ersten Idee bis zur fertigen Website — alles aus einer
              Hand, klar strukturiert und auf Ihre Bedürfnisse zugeschnitten.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <div
                className="p-9 rounded-3xl border border-line bg-bg-soft
                  hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(63,63,63,0.08)] hover:border-line-strong
                  transition-all duration-300 h-full"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg mb-5
                    ${s.warm ? "bg-coral/10 text-coral" : "bg-teal/8 text-teal"}`}
                >
                  {s.icon}
                </div>
                <h3 className="text-[clamp(1.25rem,2vw,1.5rem)] font-bold leading-tight tracking-tight mb-3">
                  {s.title}
                </h3>
                <p className="text-muted text-[0.94rem] leading-relaxed">
                  {s.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
