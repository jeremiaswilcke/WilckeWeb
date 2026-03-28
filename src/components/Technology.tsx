import FadeIn from "./FadeIn";

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: "AI-Auffindbarkeit",
    tag: "AEO",
    text: "Ihre Website wird nicht nur von Google gefunden, sondern auch von KI-Assistenten wie ChatGPT, Claude und Gemini zitiert. Wir strukturieren Inhalte so, dass KI-Modelle Ihr Unternehmen als Quelle erkennen und empfehlen.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L10.5 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Blitzschnelle Performance",
    tag: "Next.js",
    text: "Server-Side Rendering und statische Generierung sorgen für Ladezeiten unter einer Sekunde. Das verbessert nicht nur das Nutzererlebnis, sondern auch Ihr Ranking bei Google und in KI-Antworten.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    title: "Headless WordPress",
    tag: "CMS",
    text: "Sie bearbeiten Inhalte bequem in WordPress — die Website wird separat als moderne Web-App ausgeliefert. Schneller, sicherer und flexibler als klassisches WordPress.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1h13.28M4.92 19.92l5.1-5.1m0 0l5.1 5.1m-5.1-5.1V1.54" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 15.3m14.8 0l.853 10.068a2.25 2.25 0 01-2.204 2.382H5.552a2.25 2.25 0 01-2.205-2.382L4.2 15.3" />
      </svg>
    ),
    title: "WilckeWebDeployer",
    tag: "Eigentechnologie",
    text: "Unser hauseigenes WordPress-Plugin generiert automatisch Datenstrukturen und REST-APIs aus einer einzigen Konfigurationsdatei. Das spart Entwicklungszeit und garantiert eine saubere Architektur.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    title: "SEO-Optimiert",
    tag: "Suchmaschinen",
    text: "Semantisches HTML, strukturierte Daten (Schema.org), blitzschnelle Ladezeiten und saubere URLs — Ihre Website wird von Suchmaschinen bevorzugt indexiert.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    title: "Kundenportal",
    tag: "Transparenz",
    text: "Jeder Kunde erhält einen persönlichen Link zu seinem Projektportal. Dort sehen Sie in Echtzeit den Fortschritt Ihres Projekts und können direkt Rückfragen stellen.",
  },
];

export default function Technology() {
  return (
    <section id="technologie" className="py-[140px] max-md:py-20 bg-gradient-to-b from-bg to-bg-soft">
      <div className="max-w-[1440px] mx-auto px-6">
        <FadeIn>
          <div className="text-center max-w-[720px] mx-auto mb-16">
            <span className="inline-block text-xs font-bold tracking-[0.14em] uppercase text-coral mb-4">
              Unsere Technologie
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight">
              Gebaut für Menschen, Suchmaschinen und KI
            </h2>
            <p className="text-muted text-[1.05rem] leading-relaxed mt-4">
              Ihre Website soll nicht nur gut aussehen — sie muss gefunden werden.
              Von Google, von ChatGPT, von Claude. Unsere Architektur macht das möglich.
            </p>
          </div>
        </FadeIn>

        {/* AEO Highlight */}
        <FadeIn>
          <div className="rounded-3xl bg-gradient-to-br from-anthracite to-[#2a2a2a] text-white p-10 max-md:p-6 mb-10">
            <div className="grid grid-cols-[1fr_1fr] max-md:grid-cols-1 gap-10 items-center">
              <div>
                <span className="inline-block text-xs font-bold tracking-[0.14em] uppercase text-coral/90 mb-3">
                  Zukunft der Auffindbarkeit
                </span>
                <h3 className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-tight leading-snug mb-4">
                  Werden Sie von KI empfohlen — nicht nur von Google gelistet
                </h3>
                <p className="text-white/70 leading-relaxed text-[0.95rem]">
                  Immer mehr Menschen fragen KI-Assistenten statt Suchmaschinen.
                  Wir optimieren Ihre Inhalte für <strong className="text-white">Answer Engine Optimization (AEO)</strong>:
                  strukturierte Daten, klare Entitäten, semantische Auszeichnung und maschinenlesbare Fakten.
                  So wird Ihr Unternehmen zur Quelle, die KI-Modelle zitieren.
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-white/8 rounded-2xl p-5">
                  <div className="text-[0.78rem] font-bold tracking-[0.08em] uppercase text-teal mb-2">Klassisches SEO</div>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Semantisches HTML, Meta-Tags, Schema.org, schnelle Ladezeiten,
                    saubere URL-Struktur, Mobile-First.
                  </p>
                </div>
                <div className="bg-white/8 rounded-2xl p-5 ring-1 ring-coral/30">
                  <div className="text-[0.78rem] font-bold tracking-[0.08em] uppercase text-coral mb-2">AEO — Answer Engine Optimization</div>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Strukturierte FAQ-Daten, klare Faktenblöcke, Entity-Markup,
                    konsistente Markeninformationen — damit KI Sie empfiehlt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Feature Grid */}
        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
          {features.map((feat, i) => (
            <FadeIn key={feat.title} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <div className="rounded-2xl border border-line bg-white p-7 h-full
                hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(63,63,63,0.06)]
                transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-teal/10 text-teal flex items-center justify-center mb-4">
                  {feat.icon}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-[1.05rem] tracking-tight">{feat.title}</h3>
                  <span className="text-[0.65rem] font-bold tracking-[0.06em] uppercase text-teal bg-teal/10 px-2 py-0.5 rounded-full">
                    {feat.tag}
                  </span>
                </div>
                <p className="text-muted text-[0.88rem] leading-relaxed">{feat.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
