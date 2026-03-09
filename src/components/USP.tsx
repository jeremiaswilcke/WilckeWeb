import FadeIn from "./FadeIn";

const usps = [
  {
    title: "Headless-Architektur",
    text: "Next.js im Frontend, WordPress im Backend. Ihre Website lädt in Millisekunden, ist SEO-optimiert und trotzdem einfach zu pflegen.",
  },
  {
    title: "Individuelle Plugins",
    text: "Keine Kompromisse mit Standard-Plugins. Wir entwickeln exakt die Funktionen, die Ihr Projekt braucht — sauber, sicher, wartbar.",
  },
  {
    title: "Transparenter Preisrechner",
    text: "Kein Rätselraten. Konfigurieren Sie Ihre Website online und sehen Sie sofort, was sie kostet. Ehrlich und nachvollziehbar.",
  },
];

export default function USP() {
  return (
    <section className="py-[100px] max-md:py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeIn>
          <div className="text-center max-w-[680px] mx-auto mb-14">
            <span className="inline-block text-xs font-bold tracking-[0.14em] uppercase text-coral mb-4">
              Was uns unterscheidet
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight">
              Nicht einfach eine weitere Agentur
            </h2>
            <p className="text-muted text-[1.05rem] leading-relaxed mt-4">
              WilckeWeb verbindet persönliche Beratung mit moderner Technologie.
              Drei Dinge, die unsere Arbeit besonders machen:
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
          {usps.map((usp, i) => (
            <FadeIn key={usp.title} delay={(i + 1) as 1 | 2 | 3}>
              <div className="relative p-8 rounded-3xl border border-line bg-white overflow-hidden h-full">
                {/* Accent bar */}
                <div className="absolute top-0 left-8 right-8 h-[3px] rounded-b-full bg-gradient-to-r from-teal to-coral" />
                <h3 className="text-[1.15rem] font-bold tracking-tight mt-3 mb-3">
                  {usp.title}
                </h3>
                <p className="text-muted text-[0.9rem] leading-relaxed">
                  {usp.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
