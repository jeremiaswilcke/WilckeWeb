import FadeIn from "./FadeIn";
import { ArrowRightIcon } from "./Icons";

export default function FinalCTA() {
  return (
    <section className="py-[140px] max-md:py-20 text-center">
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeIn>
          <div
            className="max-w-[680px] mx-auto py-[72px] px-12 max-md:py-12 max-md:px-7
              rounded-3xl bg-gradient-to-br from-anthracite to-[#2a2a2a] text-white
              shadow-[0_24px_60px_rgba(63,63,63,0.1)] relative overflow-hidden"
          >
            <div className="absolute -top-[40%] -right-[20%] w-[60%] h-full bg-[radial-gradient(ellipse,rgba(249,125,115,0.12),transparent_70%)] pointer-events-none" />

            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight mb-4 relative">
              Lassen Sie uns Ihre Website planen.
            </h2>
            <p className="text-white/60 text-[1.05rem] leading-relaxed max-w-[48ch] mx-auto mb-8 relative">
              Konfigurieren Sie Ihr Projekt im Preisrechner und senden Sie Ihre Anfrage
              direkt mit allen Details ab — unverbindlich und in wenigen Minuten.
            </p>
            <div className="flex gap-4 justify-center flex-wrap relative">
              <a
                href="#rechner"
                className="inline-flex items-center gap-2 font-semibold text-[0.95rem] px-8 py-3.5 rounded-full
                  bg-coral text-white hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,125,115,0.3)]
                  transition-all duration-300"
              >
                Projekt konfigurieren
                <ArrowRightIcon />
              </a>
              <a
                href="#kontakt"
                className="inline-flex items-center gap-2 font-semibold text-[0.95rem] px-8 py-3.5 rounded-full
                  bg-white/10 text-white border border-white/20
                  hover:-translate-y-0.5 hover:bg-white/15
                  transition-all duration-300"
              >
                Direkt anfragen
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
