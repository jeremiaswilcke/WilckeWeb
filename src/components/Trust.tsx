import FadeIn from "./FadeIn";
import { HeartIcon, ShieldIcon, CheckIcon, CheckCircleIcon } from "./Icons";

const points = [
  {
    icon: <HeartIcon />,
    title: "Persönlich & direkt",
    text: "Kein Callcenter, kein Ticketsystem. Sie sprechen direkt mit der Person, die Ihre Website baut.",
  },
  {
    icon: <ShieldIcon />,
    title: "Transparent & fair",
    text: "Klare Preise, ehrliche Einschätzungen und keine bösen Überraschungen. Sie wissen immer, woran Sie sind.",
  },
  {
    icon: <CheckIcon />,
    title: "Verständlich & klar",
    text: "Keine Fachbegriffe, kein technisches Rauschen. Sie verstehen jeden Schritt und jede Entscheidung.",
  },
  {
    icon: <CheckCircleIcon />,
    title: "Qualität statt Quantität",
    text: "Lieber wenige Projekte mit vollem Einsatz als viele Websites nach Schema F. Jedes Projekt bekommt echte Aufmerksamkeit.",
  },
];

export default function Trust() {
  return (
    <section
      id="vertrauen"
      className="py-[140px] max-md:py-20 bg-white border-t border-b border-line"
    >
      <div className="max-w-[720px] mx-auto px-6 text-center">
        <FadeIn>
          <span className="inline-block text-xs font-bold tracking-[0.14em] uppercase text-coral mb-4">
            Warum WilckeWeb
          </span>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight">
            Webdesign auf Augenhöhe
          </h2>
          <p className="text-muted text-[1.05rem] leading-[1.8] mt-5 mb-12">
            Hinter WilckeWeb steht kein anonymes Team, sondern eine persönliche
            Zusammenarbeit. Sie bekommen ehrliche Beratung, klare Kommunikation
            und ein Ergebnis, das wirklich zu Ihnen passt.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 gap-5 text-left max-md:grid-cols-1">
          {points.map((p, i) => (
            <FadeIn key={p.title} delay={(i + 1) as 1 | 2 | 3 | 4}>
              <div className="flex gap-4 p-6 rounded-2xl bg-bg-soft border border-line">
                <div className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0 bg-coral/10 text-coral">
                  {p.icon}
                </div>
                <div>
                  <h4 className="font-bold mb-1">{p.title}</h4>
                  <p className="text-[0.88rem] text-muted leading-relaxed">
                    {p.text}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
