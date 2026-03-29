export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  content: string;
}

export const posts: BlogPost[] = [
  {
    slug: "was-kostet-eine-website-oesterreich-2026",
    title: "Was kostet eine Website in Österreich 2026?",
    description:
      "Transparenter Überblick über Website-Kosten in Österreich: Onepager, Mehrseiter, Shops. Was beeinflusst den Preis und worauf Sie achten sollten.",
    date: "2026-03-29",
    readingTime: "6 Min.",
    tags: ["Kosten", "Webdesign", "Österreich"],
    content: `
## Die ehrliche Antwort: Es kommt darauf an

Die Frage "Was kostet eine Website?" ist wie die Frage "Was kostet ein Auto?" — die Spanne reicht von ein paar hundert Euro bis zu sechsstelligen Beträgen. Aber im Gegensatz zur Automobilbranche herrscht bei Webdesign-Preisen oft wenig Transparenz.

Hier ein realistischer Überblick für 2026 in Österreich.

## Typische Preisspannen

### Onepager (eine Seite)
**500 – 2.000 € netto**

Eine einzelne, scrollbare Seite mit allen wichtigen Informationen. Ideal für Freelancer, kleine Unternehmen oder als digitale Visitenkarte. Bei WilckeWeb beginnt ein Onepager ab 790 € netto.

### Unternehmenswebsite (3–10 Seiten)
**1.500 – 5.000 € netto**

Mehrere Seiten mit eigenem CMS, damit Sie Inhalte selbst ändern können. Typische Seiten: Startseite, Leistungen, Über uns, Kontakt, Blog.

### Online-Shop
**3.000 – 15.000 € netto**

Abhängig von der Anzahl der Produkte, Zahlungsanbindungen und Spezialfunktionen.

### Individuelle Webanwendung
**5.000 – 50.000+ € netto**

Kundenportale, Buchungssysteme, SaaS-Plattformen — hier wird maßgeschneidert entwickelt.

## Was beeinflusst den Preis?

**Design:** Ein Template-basiertes Design ist günstiger als ein komplett individuelles Design. Aber Vorsicht: Billige Templates sehen oft generisch aus und bieten wenig Flexibilität.

**Technik:** Eine einfache WordPress-Seite kostet weniger als eine moderne Lösung mit Next.js und Headless CMS. Dafür ist Letztere deutlich schneller, sicherer und besser für SEO.

**Inhalte:** Liefern Sie Texte und Bilder selbst, sparen Sie Geld. Brauchen Sie professionelle Texte oder Fotografie, kommen Kosten dazu.

**Funktionen:** Kontaktformular, Newsletter-Anbindung, Mehrsprachigkeit, Buchungssystem — jede Zusatzfunktion kostet Entwicklungszeit.

## Laufende Kosten nach dem Launch

Viele vergessen die laufenden Kosten:

- **Hosting:** 5 – 30 €/Monat (bei Vercel oft kostenlos)
- **Domain:** 10 – 20 €/Jahr
- **Wartung & Updates:** 0 – 100 €/Monat
- **SSL-Zertifikat:** bei modernen Hostern kostenlos

Bei WilckeWeb gibt es optionale Betreuungspakete ab 29 €/Monat, die Updates, Backups und technische Pflege umfassen.

## Worauf Sie achten sollten

1. **Transparente Preise:** Seriöse Anbieter nennen zumindest eine Preisspanne. Wer keine Preise zeigt, hat oft etwas zu verbergen.
2. **Keine versteckten Kosten:** Fragen Sie nach: Sind Domain, Hosting und SSL im Preis enthalten?
3. **Eigentum am Code:** Sie sollten immer Eigentümer Ihrer Website sein — nicht der Entwickler.
4. **CMS-Zugang:** Sie sollten Inhalte selbst ändern können, ohne jedes Mal den Entwickler bezahlen zu müssen.
5. **Moderne Technik:** Achten Sie auf Ladezeiten unter 2 Sekunden und mobile Optimierung.

## Fazit

Eine professionelle Website in Österreich kostet 2026 zwischen 790 € und 5.000 € für die meisten Unternehmen. Entscheidend ist nicht der niedrigste Preis, sondern das beste Verhältnis aus Qualität, Geschwindigkeit und persönlicher Betreuung.
    `,
  },
  {
    slug: "headless-wordpress-erklaert",
    title: "Headless WordPress erklärt — in 5 Minuten",
    description:
      "Was ist Headless WordPress, wie funktioniert es und warum ist es die Zukunft? Ein verständlicher Überblick ohne Fachjargon.",
    date: "2026-03-28",
    readingTime: "5 Min.",
    tags: ["Headless WordPress", "Next.js", "Technik"],
    content: `
## WordPress kennt jeder. Aber was ist "Headless"?

WordPress betreibt über 40 % aller Websites weltweit. Es ist bewährt, flexibel und einfach zu bedienen. Aber die klassische WordPress-Architektur hat ein Problem: Sie ist langsam.

Headless WordPress löst dieses Problem, indem es WordPress in zwei Teile trennt.

## Klassisch vs. Headless

### Klassisches WordPress
WordPress generiert die komplette Website: Design, Inhalte und Technik kommen aus einem System. Das ist einfach, aber langsam — jeder Seitenaufruf erfordert eine Datenbankabfrage.

### Headless WordPress
WordPress wird nur noch als **Backend** (Content-Management) genutzt. Das **Frontend** (was der Besucher sieht) wird separat mit moderner Technologie wie Next.js gebaut. WordPress liefert die Inhalte über eine API.

## Warum ist das besser?

### Geschwindigkeit
Eine Headless-Website lädt typischerweise in unter einer Sekunde. Klassisches WordPress braucht oft 3–5 Sekunden. Google bestraft langsame Seiten im Ranking.

### Sicherheit
Das WordPress-Backend ist nicht öffentlich erreichbar — Angriffsfläche für Hacker wird massiv reduziert. Keine Plugin-Schwachstellen im Frontend.

### Flexibilität
Das Frontend ist nicht an WordPress-Themes gebunden. Jedes Design ist möglich, ohne Template-Einschränkungen.

### SEO-Performance
Next.js generiert statische HTML-Seiten, die Google sofort indexieren kann. Kein JavaScript-Rendering nötig, perfekte Core Web Vitals.

## Für wen eignet sich Headless WordPress?

**Ideal für:**
- Unternehmen, die schnelle, sichere Websites brauchen
- Projekte, bei denen SEO-Performance entscheidend ist
- Teams, die WordPress als CMS kennen und lieben
- Websites, die auch von KI-Assistenten gefunden werden sollen (AEO)

**Weniger geeignet für:**
- Sehr kleine Projekte mit minimalem Budget
- Websites, die stark auf WordPress-Plugins angewiesen sind (z.B. WooCommerce)

## Wie funktioniert das bei WilckeWeb?

Bei WilckeWeb setzen wir auf die Kombination **Next.js + Headless WordPress**:

1. Sie pflegen Inhalte in WordPress — gewohnt, einfach, vertraut
2. Next.js holt die Inhalte über die WordPress REST API
3. Die Website wird als blitzschnelle statische Seite ausgeliefert
4. Hosting über Vercel — weltweit schnell, automatische SSL-Zertifikate

Das Ergebnis: Die Einfachheit von WordPress mit der Geschwindigkeit moderner Web-Technologie.

## Fazit

Headless WordPress ist kein Trend, sondern die logische Weiterentwicklung. Sie behalten das CMS, das Sie kennen, und bekommen eine Website, die technisch auf dem neuesten Stand ist. Schneller, sicherer und besser für Google.
    `,
  },
  {
    slug: "nextjs-vs-wordpress",
    title: "Next.js vs. WordPress: Was ist besser für Ihre Website?",
    description:
      "Ein ehrlicher Vergleich zwischen Next.js und klassischem WordPress. Wann sich welche Technologie lohnt — und warum die Kombination am besten ist.",
    date: "2026-03-27",
    readingTime: "7 Min.",
    tags: ["Next.js", "WordPress", "Vergleich"],
    content: `
## Zwei Welten — ein Ziel

WordPress und Next.js verfolgen das gleiche Ziel: Websites bauen. Aber sie gehen völlig unterschiedliche Wege. Hier ein ehrlicher Vergleich.

## WordPress: Der Klassiker

**Vorteile:**
- Riesiges Ökosystem: 60.000+ Plugins
- Einfache Bedienung: Inhalte ändern ohne Programmierkenntnisse
- Bewährt: Seit 2003, über 40 % Marktanteil
- Günstig: Viele Themes und Plugins kostenlos

**Nachteile:**
- Langsam: Durchschnittliche Ladezeit 3–5 Sekunden
- Sicherheitslücken: Plugins sind das häufigste Einfallstor
- Plugin-Abhängigkeit: Jedes Plugin ist ein potenzielles Risiko
- Eingeschränktes Design: Themes limitieren die Gestaltung

## Next.js: Die moderne Alternative

**Vorteile:**
- Blitzschnell: Ladezeiten unter einer Sekunde
- Maximale Flexibilität: Jedes Design ist möglich
- Exzellente SEO: Statische HTML-Seiten, perfekte Core Web Vitals
- Sicher: Keine Plugin-Schwachstellen

**Nachteile:**
- Braucht einen Entwickler: Kein visueller Editor out-of-the-box
- Kleineres Ökosystem: Kein Plugin-Marktplatz
- Content-Management: Braucht ein separates CMS

## Die beste Lösung: Beides kombinieren

Warum sich entscheiden, wenn man beides haben kann? **Headless WordPress** kombiniert die Stärken beider Systeme:

| Eigenschaft | Klassisch WP | Next.js allein | Next.js + Headless WP |
|---|---|---|---|
| Ladezeit | 3–5 Sek. | < 1 Sek. | < 1 Sek. |
| Inhalte selbst pflegen | Ja | Nein | Ja |
| Designfreiheit | Eingeschränkt | Maximal | Maximal |
| SEO-Performance | Mittel | Exzellent | Exzellent |
| Sicherheit | Mittel | Hoch | Hoch |
| Kosten | Niedrig | Mittel | Mittel |

## Wann reicht klassisches WordPress?

Wenn Sie ein kleines Budget haben, wenige Seiten brauchen und Geschwindigkeit keine Priorität ist. Für einen einfachen Blog oder eine digitale Visitenkarte kann klassisches WordPress ausreichen.

## Wann lohnt sich Next.js?

Sobald Ihnen wichtig ist, dass Ihre Website:
- Schnell lädt (unter 2 Sekunden)
- Bei Google gut rankt
- Professionell und individuell aussieht
- Von KI-Assistenten zitiert werden kann (AEO)
- Langfristig sicher und wartbar bleibt

## Fazit

Für die meisten Unternehmen in Österreich ist die Kombination aus Next.js und Headless WordPress 2026 die beste Wahl. Sie bekommen das Beste aus beiden Welten: ein vertrautes CMS und eine moderne, schnelle Website.
    `,
  },
  {
    slug: "seo-vs-aeo-warum-google-nicht-mehr-reicht",
    title: "SEO vs. AEO: Warum Google allein nicht mehr reicht",
    description:
      "Answer Engine Optimization (AEO) ist die nächste Stufe nach SEO. Wie Sie Ihre Website für ChatGPT, Claude und Gemini optimieren.",
    date: "2026-03-26",
    readingTime: "6 Min.",
    tags: ["SEO", "AEO", "KI"],
    content: `
## Die Suche verändert sich

2025 haben erstmals mehr Menschen eine Frage an ChatGPT gestellt als an Google. Das bedeutet nicht, dass Google stirbt — aber es bedeutet, dass eine Website, die nur für Google optimiert ist, einen wachsenden Teil der Nutzer verpasst.

## Was ist SEO?

**Search Engine Optimization** — die Kunst, bei Google auf Seite 1 zu landen. Das kennen die meisten. Keywords, Backlinks, Ladezeiten, Meta-Tags. Seit über 20 Jahren das Standardrezept.

SEO bleibt wichtig. Aber es reicht nicht mehr.

## Was ist AEO?

**Answer Engine Optimization** — die Optimierung für KI-Assistenten wie ChatGPT, Claude, Gemini und Perplexity. Diese Systeme durchsuchen nicht das Web wie Google, sondern extrahieren Wissen aus strukturierten Daten, klaren Entitäten und gut geschriebenen Inhalten.

Der Unterschied: Google zeigt Ihnen eine Liste von Links. KI-Assistenten geben Ihnen eine **direkte Antwort** — und zitieren dabei die Quelle.

## Wie funktioniert AEO in der Praxis?

### 1. Strukturierte Daten (Schema.org)
KI-Modelle verstehen JSON-LD-Markup besser als Fließtext. Wer sein Unternehmen, seine Leistungen und seine FAQs als strukturierte Daten auszeichnet, wird zur zitierbaren Quelle.

### 2. Klare Entitäten
"Wer ist WilckeWeb?" — Wenn diese Frage mit einem klaren, maschinenlesbaren Datensatz beantwortet wird (Name, Standort, Leistungen, Gründer), kann ein KI-Modell das zitieren.

### 3. FAQ-Inhalte
Fragen und Antworten in klarer Struktur sind Gold wert für AEO. KI-Assistenten suchen gezielt nach Q&A-Formaten.

### 4. Autorität und Expertise
KI-Modelle bewerten, ob eine Quelle vertrauenswürdig ist. Klare "Über mich"-Seiten, verifizierte Geschäftsdaten und konsistente Online-Präsenz helfen.

## SEO vs. AEO im Vergleich

| Aspekt | SEO | AEO |
|---|---|---|
| Ziel | Google-Rankings | KI-Zitierung |
| Methode | Keywords, Backlinks | Strukturierte Daten, Entitäten |
| Ergebnis | Link in Suchergebnissen | Direkte Antwort mit Quellenangabe |
| Zeitrahmen | Wochen bis Monate | Sofort (bei nächstem Modell-Update) |
| Messbarkeit | Search Console, Analytics | Noch begrenzt |

## Was WilckeWeb anders macht

Bei WilckeWeb optimieren wir jede Website für beides — SEO und AEO:

- **Schema.org-Markup:** ProfessionalService, FAQPage, HowTo, Person, BreadcrumbList
- **Strukturierte FAQ:** Jede häufig gestellte Frage als maschinenlesbares Q&A
- **Klare Entitäten:** Ihr Unternehmen wird als eindeutig identifizierbare Einheit markiert
- **Semantische HTML-Struktur:** Überschriften-Hierarchie, ARIA-Labels, Alt-Texte

Das Ergebnis: Ihre Website wird nicht nur von Google gefunden, sondern auch von ChatGPT, Claude und Gemini als Quelle empfohlen.

## Fazit

SEO und AEO sind keine Gegensätze — sie ergänzen sich. Wer 2026 nur auf Google optimiert, verschenkt Reichweite. Die Zukunft gehört Websites, die sowohl von Suchmaschinen als auch von KI-Assistenten verstanden und empfohlen werden.
    `,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
