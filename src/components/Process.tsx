import FadeIn from "./FadeIn";

const steps = [
  {
    num: "1",
    title: "Bedarf klären",
    text: "Nutzen Sie den Preisrechner oder schreiben Sie mir direkt. Gemeinsam finden wir heraus, was Sie brauchen.",
  },
  {
    num: "2",
    title: "Angebot erhalten",
    text: "Sie bekommen ein klares, verständliches Angebot — transparent, fair und ohne versteckte Kosten.",
  },
  {
    num: "3",
    title: "Website gestalten",
    text: "Design, Inhalte und Funktionen werden umgesetzt. Sie sind eingebunden und sehen den Fortschritt.",
  },
  {
    num: "4",
    title: "Online gehen",
    text: "Ihre Website geht live. Auf Wunsch mit laufender Betreuung, damit alles aktuell und sicher bleibt.",
  },
];

export default function Process() {
  return (
    <section id="ablauf" className="py-[140px] max-md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeIn>
          <div className="text-center max-w-[680px] mx-auto mb-16">
            <span className="inline-block text-xs font-bold tracking-[0.14em] uppercase text-coral mb-4">
              So funktioniert&apos;s
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight">
              In vier Schritten zur Website
            </h2>
            <p className="text-muted text-[1.05rem] leading-relaxed mt-4">
              Kein komplizierter Prozess. Kein Techniksprech. Einfach ein klarer
              Weg von der Idee zu Ihrer neuen Website.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-4 gap-8 max-md:grid-cols-2 max-[480px]:grid-cols-1">
          {steps.map((step, i) => (
            <FadeIn key={step.num} delay={(i + 1) as 1 | 2 | 3 | 4}>
              <div className="text-center relative">
                {/* Connector line (desktop only) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(50%+36px)] w-[calc(100%-72px)] h-px bg-line-strong" />
                )}
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-extrabold bg-teal text-white">
                  {step.num}
                </div>
                <h3 className="text-[1.1rem] font-bold mb-2.5">{step.title}</h3>
                <p className="text-muted text-[0.9rem] leading-relaxed max-w-[220px] mx-auto">
                  {step.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
