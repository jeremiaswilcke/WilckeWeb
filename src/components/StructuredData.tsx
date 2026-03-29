export default function StructuredData() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://wilckeweb.org/#business",
    name: "WilckeWeb",
    alternateName: "Wilcke Web — Webdesign & Entwicklung",
    description:
      "WilckeWeb erstellt moderne, blitzschnelle Websites mit Next.js und Headless WordPress. Persönliche Beratung, transparente Preise, individuelle Umsetzung in Österreich.",
    url: "https://wilckeweb.org",
    telephone: "+436767923929",
    email: "info@wilckeweb.org",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Grenzgasse 4",
      addressLocality: "Mauerbach",
      postalCode: "3001",
      addressCountry: "AT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.25,
      longitude: 16.17,
    },
    areaServed: [
      { "@type": "Country", name: "Österreich" },
      { "@type": "Country", name: "Deutschland" },
      { "@type": "Country", name: "Schweiz" },
    ],
    founder: {
      "@type": "Person",
      "@id": "https://wilckeweb.org/#person",
      name: "Jeremias Wilcke",
      jobTitle: "Webentwickler & Designer",
      url: "https://wilckeweb.org",
      image: "https://wilckeweb.org/about-photo.png",
      worksFor: { "@id": "https://wilckeweb.org/#business" },
      knowsAbout: [
        "Next.js",
        "Headless WordPress",
        "Webdesign",
        "SEO",
        "Answer Engine Optimization",
        "React",
        "TypeScript",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mauerbach",
        postalCode: "3001",
        addressCountry: "AT",
      },
    },
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Überweisung",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [
      "https://github.com/jeremiaswilcke",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Webdesign Leistungen",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Next.js + Headless WordPress Website",
            description:
              "Blitzschnelle Website mit Next.js im Frontend und WordPress als CMS. Ab 790 € netto.",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "790",
            priceCurrency: "EUR",
            minPrice: "790",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Individuelle WordPress-Plugins",
            description:
              "Maßgeschneiderte WordPress-Plugins für spezielle Anforderungen.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website Relaunch & Redesign",
            description:
              "Bestehende Website modernisieren — Design, Struktur und Technik neu gedacht.",
          },
        },
      ],
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WilckeWeb",
    url: "https://wilckeweb.org",
    description:
      "Webdesign & Entwicklung aus Österreich. Moderne Websites mit Next.js und Headless WordPress.",
    publisher: { "@id": "https://wilckeweb.org/#business" },
    inLanguage: "de-AT",
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Was kostet eine Website bei WilckeWeb?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Eine Website bei WilckeWeb beginnt ab 790 € netto für einen Onepager. Der genaue Preis hängt von Umfang, Funktionen und Design ab. Nutzen Sie unseren Online-Preisrechner für eine sofortige Kalkulation.",
        },
      },
      {
        "@type": "Question",
        name: "Welche Technologie verwendet WilckeWeb?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "WilckeWeb setzt auf Next.js im Frontend und Headless WordPress als CMS. Das bedeutet blitzschnelle Ladezeiten, maximale SEO-Performance und ein vertrautes Content-Management-System für Sie.",
        },
      },
      {
        "@type": "Question",
        name: "Was ist Headless WordPress?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bei Headless WordPress wird WordPress nur als Content-Management-System (Backend) genutzt. Das Frontend wird separat mit moderner Technologie wie Next.js gebaut. Das Ergebnis: deutlich schnellere Ladezeiten, bessere Sicherheit und mehr Flexibilität im Design.",
        },
      },
      {
        "@type": "Question",
        name: "Wie lange dauert die Erstellung einer Website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ein Onepager ist in der Regel innerhalb von 1-2 Wochen fertig. Größere Projekte mit mehreren Seiten und individuellen Funktionen dauern typischerweise 3-6 Wochen. Den Fortschritt können Sie jederzeit in Ihrem persönlichen Projektportal verfolgen.",
        },
      },
      {
        "@type": "Question",
        name: "Kann meine Website auch von KI-Assistenten wie ChatGPT gefunden werden?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja! WilckeWeb optimiert Websites nicht nur für Google (SEO), sondern auch für KI-Assistenten wie ChatGPT, Claude und Gemini. Durch strukturierte Daten, klare Entitäten und semantische Auszeichnung wird Ihr Unternehmen zur Quelle, die KI-Modelle zitieren und empfehlen. Das nennt sich Answer Engine Optimization (AEO).",
        },
      },
      {
        "@type": "Question",
        name: "Wer steckt hinter WilckeWeb?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hinter WilckeWeb steht Jeremias Wilcke, Webentwickler und Designer aus Mauerbach bei Wien. Er betreut jedes Projekt persönlich — von der Konzeption über das Design bis zur technischen Umsetzung mit Next.js und Headless WordPress. Kein Callcenter, kein anonymes Team, sondern ein direkter Ansprechpartner.",
        },
      },
      {
        "@type": "Question",
        name: "Bietet WilckeWeb auch laufende Betreuung an?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja, optional. Es gibt drei Betreuungspakete: Basic (29 €/Monat), Plus (59 €/Monat) und Full (99 €/Monat). Diese umfassen regelmäßige Updates, Backups, technische Pflege und auf Wunsch auch inhaltliche Änderungen.",
        },
      },
    ],
  };

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Wie entsteht eine Website mit WilckeWeb?",
    description:
      "In vier einfachen Schritten von der Idee zur fertigen Website — persönlich betreut, transparent kalkuliert.",
    totalTime: "P3W",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "EUR",
      value: "790",
    },
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Bedarf klären",
        text: "Nutzen Sie den Preisrechner oder schreiben Sie direkt. Gemeinsam finden wir heraus, was Sie brauchen.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Angebot erhalten",
        text: "Sie bekommen ein klares, verständliches Angebot — transparent, fair und ohne versteckte Kosten.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Website gestalten",
        text: "Design, Inhalte und Funktionen werden umgesetzt. Sie sind eingebunden und sehen den Fortschritt im Projektportal.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Online gehen",
        text: "Ihre Website geht live. Auf Wunsch mit laufender Betreuung, damit alles aktuell und sicher bleibt.",
      },
    ],
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startseite",
        item: "https://wilckeweb.org",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Leistungen",
        item: "https://wilckeweb.org/#leistungen",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Preisrechner",
        item: "https://wilckeweb.org/#rechner",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Über mich",
        item: "https://wilckeweb.org/#ueber-mich",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Kontakt",
        item: "https://wilckeweb.org/#kontakt",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
