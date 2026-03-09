import FadeIn from "./FadeIn";
import {
  LayoutIcon,
  DollarIcon,
  UsersIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "./Icons";

export default function Hero() {
  return (
    <section className="pt-[calc(80px+140px)] pb-[140px] max-md:pt-[calc(72px+64px)] max-md:pb-20 flex items-center min-h-[90vh] max-md:min-h-0">
      <div className="max-w-[1200px] mx-auto px-6 w-full">
        <div className="grid grid-cols-[1.2fr_0.8fr] gap-20 items-center max-lg:grid-cols-1 max-lg:gap-12">
          {/* Copy */}
          <div className="max-w-[640px]">
            <span className="inline-block text-xs font-bold tracking-[0.14em] uppercase text-coral mb-4">
              WilckeWeb &middot; Webdesign & Entwicklung
            </span>
            <FadeIn>
              <h1 className="text-[clamp(2.8rem,5.5vw,4.5rem)] font-bold leading-[1.08] tracking-tight mb-6">
                Websites, die{" "}
                <em className="not-italic text-coral">wirken.</em>
              </h1>
            </FadeIn>
            <FadeIn delay={1}>
              <p className="text-lg text-muted leading-relaxed max-w-[52ch] mb-5">
                Klar geplant, fair kalkuliert, individuell umgesetzt. WilckeWeb
                begleitet Sie von der ersten Idee bis zur fertigen Website —
                persönlich, transparent und ohne Techniksprech.
              </p>
              <p className="text-[0.92rem] text-muted/80 leading-relaxed max-w-[52ch] mb-10">
                Unser Schwerpunkt: <strong className="text-text font-semibold">Next.js mit Headless WordPress</strong> —
                blitzschnelle Ladezeiten, maximale Flexibilität und ein CMS, das Sie selbst bedienen können.
                Auf Wunsch auch mit individuellen WordPress-Plugins oder anderen Systemen.
              </p>
            </FadeIn>
            <FadeIn delay={2}>
              <div className="flex gap-4 flex-wrap max-[480px]:flex-col">
                <a
                  href="#rechner"
                  className="inline-flex items-center gap-2 font-semibold text-[0.95rem] px-8 py-3.5 rounded-full
                    bg-teal text-white hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(86,160,168,0.3)]
                    transition-all duration-300"
                >
                  Preis berechnen
                  <ArrowRightIcon />
                </a>
                <a
                  href="#leistungen"
                  className="inline-flex items-center justify-center font-semibold text-[0.95rem] px-8 py-3.5 rounded-full
                    bg-white text-text border border-line-strong
                    hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(63,63,63,0.08)] hover:border-transparent
                    transition-all duration-300"
                >
                  Mehr erfahren
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Visual Card */}
          <FadeIn delay={3} className="max-lg:max-w-[480px]">
            <div className="relative">
              <div className="bg-surface/94 border border-line rounded-3xl p-10 shadow-[0_24px_60px_rgba(63,63,63,0.1)] relative z-10">
                <div className="grid gap-5">
                  <Stat
                    icon={<LayoutIcon />}
                    iconClass="bg-teal/8 text-teal"
                    label="Technologie"
                    value="Next.js + Headless WordPress"
                  />
                  <Stat
                    icon={<DollarIcon />}
                    iconClass="bg-coral/10 text-coral"
                    label="Transparente Preise"
                    value="Ab 790 € netto"
                  />
                  <Stat
                    icon={<UsersIcon />}
                    iconClass="bg-teal/8 text-teal"
                    label="Zusammenarbeit"
                    value="Persönlich & unkompliziert"
                  />
                  <Stat
                    icon={<CheckCircleIcon />}
                    iconClass="bg-coral/10 text-coral"
                    label="Ergebnis"
                    value="Schnell, sicher, individuell"
                    last
                  />
                </div>
              </div>
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-coral/12 to-teal/8 blur-[40px] -z-10" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Stat({
  icon, iconClass, label, value, last,
}: {
  icon: React.ReactNode; iconClass: string; label: string; value: string; last?: boolean;
}) {
  return (
    <div className={`flex items-center gap-4 py-4 ${!last ? "border-b border-line" : ""}`}>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${iconClass}`}>
        {icon}
      </div>
      <div>
        <div className="text-[0.88rem] text-muted">{label}</div>
        <div className="font-bold text-[1.05rem]">{value}</div>
      </div>
    </div>
  );
}
