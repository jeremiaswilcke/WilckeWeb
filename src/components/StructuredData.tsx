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
      name: "Jeremias Wilcke",
      jobTitle: "Webentwickler & Designer",
      url: "https://wilckeweb.org",
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
    sameAs: [],
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
        name: "Bietet WilckeWeb auch laufende Betreuung an?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja, optional. Es gibt drei Betreuungspakete: Basic (29 €/Monat), Plus (59 €/Monat) und Full (99 €/Monat). Diese umfassen regelmäßige Updates, Backups, technische Pflege und auf Wunsch auch inhaltliche Änderungen.",
        },
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
    </>
  );
}
