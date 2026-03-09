import FadeIn from "./FadeIn";
import {
  BrowserIcon,
  GlobeIcon,
  EditIcon,
  BookIcon,
  CompassIcon,
  ShieldIcon,
} from "./Icons";

// Puzzle icon for plugins
function PluginIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4" /><path d="M12 18v4" /><path d="M4.93 4.93l2.83 2.83" /><path d="M16.24 16.24l2.83 2.83" /><path d="M2 12h4" /><path d="M18 12h4" /><path d="M4.93 19.07l2.83-2.83" /><path d="M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

// Code/Terminal icon for Headless WP
function CodeIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

const services = [
  {
    icon: <CodeIcon />,
    title: "Next.js + Headless WordPress",
    text: "Unser Schwerpunkt: Blitzschnelle Websites mit Next.js im Frontend und WordPress als vertrautem CMS im Hintergrund. Das Beste aus beiden Welten.",
    warm: false,
    highlight: true,
  },
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
    icon: <PluginIcon />,
    title: "Individuelle WP-Plugins",
    text: "Standard-Plugins reichen nicht? Wir entwickeln maßgeschneiderte WordPress-Plugins, die genau das tun, was Ihr Projekt braucht.",
    warm: true,
  },
  {
    icon: <EditIcon />,
    title: "Individuelle Funktionen",
    text: "Blog, Terminbuchung, Newsletter, Mehrsprachigkeit oder Shop — die Website bekommt genau die Funktionen, die Sie brauchen.",
    warm: true,
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
    warm: false,
  },
  {
    icon: <ShieldIcon />,
    title: "Wartung & Sicherheit",
    text: "Nach dem Launch optional: regelmäßige Updates, Backups und technische Pflege, damit Ihre Website sicher und aktuell bleibt.",
    warm: false,
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
          <div className="text-center max-w-[720px] mx-auto mb-16">
            <span className="inline-block text-xs font-bold tracking-[0.14em] uppercase text-coral mb-4">
              Leistungen
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight">
              Was WilckeWeb für Sie tut
            </h2>
            <p className="text-muted text-[1.05rem] leading-relaxed mt-4">
              Von der ersten Idee bis zur fertigen Website — alles aus einer
              Hand. Unser Fokus liegt auf modernen Webtechnologien, aber wir arbeiten
              auch gern mit klassischem WordPress oder anderen Systemen.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <div
                className={`p-7 rounded-3xl border bg-bg-soft
                  hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(63,63,63,0.08)] hover:border-line-strong
                  transition-all duration-300 h-full
                  ${s.highlight ? "border-teal/30 bg-teal/[0.03]" : "border-line"}`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg mb-5
                    ${s.warm ? "bg-coral/10 text-coral" : "bg-teal/8 text-teal"}`}
                >
                  {s.icon}
                </div>
                <h3 className="text-[1.1rem] font-bold leading-tight tracking-tight mb-2.5">
                  {s.title}
                </h3>
                <p className="text-muted text-[0.88rem] leading-relaxed">
                  {s.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Tech note */}
        <FadeIn>
          <div className="mt-12 text-center">
            <p className="text-sm text-muted/70">
              <span className="font-semibold text-text-soft">WWD</span> — WilckeWebDevelopment: Neben Design und Beratung entwickeln wir auch individuelle
              Plugins, Schnittstellen und technische Lösungen für WordPress und darüber hinaus.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
