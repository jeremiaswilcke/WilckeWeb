import FadeIn from "./FadeIn";
import { ArrowRightIcon } from "./Icons";

export default function FinalCTA() {
  return (
    <section id="kontakt" className="py-[140px] max-md:py-20 text-center">
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeIn>
          <div
            className="max-w-[680px] mx-auto py-[72px] px-12 max-md:py-12 max-md:px-7
              rounded-3xl bg-gradient-to-br from-anthracite to-[#2a2a2a] text-white
              shadow-[0_24px_60px_rgba(63,63,63,0.1)] relative overflow-hidden"
          >
            {/* Decorative glow */}
            <div className="absolute -top-[40%] -right-[20%] w-[60%] h-full bg-[radial-gradient(ellipse,rgba(249,125,115,0.12),transparent_70%)] pointer-events-none" />

            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight mb-4 relative">
              Lassen Sie uns Ihre Website planen.
            </h2>
            <p className="text-white/60 text-[1.05rem] leading-relaxed max-w-[48ch] mx-auto mb-8 relative">
              Erzählen Sie mir von Ihrem Projekt — in einem kurzen,
              unverbindlichen Gespräch klären wir alles Weitere.
            </p>
            <a
              href="mailto:kontakt@wilckeweb.de"
              className="inline-flex items-center gap-2 font-semibold text-[0.95rem] px-8 py-3.5 rounded-full
                bg-coral text-white hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,125,115,0.3)]
                transition-all duration-300 relative"
            >
              Gespräch starten
              <ArrowRightIcon />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
