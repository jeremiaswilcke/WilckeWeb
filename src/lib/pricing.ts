/* ==========================================================================
   WilckeWeb — Preiskonfiguration
   Alle Preise zentral konfigurierbar
   ========================================================================== */

export interface MaterialOption {
  value: string;
  label: string;
  price: number;
}

export interface MaterialCategory {
  label: string;
  options: MaterialOption[];
}

export interface Feature {
  id: string;
  label: string;
  price: number;
  included?: boolean;
}

export interface DesignOption {
  value: string;
  label: string;
  hint: string;
  price: number;
}

export interface SupportOption {
  value: string;
  label: string;
  hint?: string;
  price: number;
}

export const PRICING = {
  // Grundpreise nach Seitenanzahl
  pages: {
    onepager: { label: "Onepager", price: 790 },
    bis5: { label: "Bis 5 Seiten", price: 1490 },
    bis10: { label: "Bis 10 Seiten", price: 2290 },
    ab11: { label: "Ab 11 Seiten", price: 2990 },
  } as Record<string, { label: string; price: number }>,

  // Zuschläge: Material-Status
  materials: {
    logo: {
      label: "Logo",
      options: [
        { value: "yes", label: "Ja, vorhanden", price: 0 },
        { value: "partial", label: "Teilweise vorhanden", price: 70 },
        { value: "no", label: "Nein, wird benötigt", price: 150 },
      ],
    },
    ci: {
      label: "Corporate Identity / Farbwelt",
      options: [
        { value: "yes", label: "Ja, vorhanden", price: 0 },
        { value: "partial", label: "Teilweise vorhanden", price: 180 },
        { value: "no", label: "Nein, wird benötigt", price: 350 },
      ],
    },
    texte: {
      label: "Texte / Inhalte",
      options: [
        { value: "yes", label: "Ja, vorhanden", price: 0 },
        { value: "partial", label: "Teilweise vorhanden", price: 200 },
        { value: "no", label: "Nein, werden benötigt", price: 400 },
      ],
    },
    bilder: {
      label: "Bilder / Fotos",
      options: [
        { value: "yes", label: "Ja, vorhanden", price: 0 },
        { value: "partial", label: "Teilweise vorhanden", price: 100 },
        { value: "no", label: "Nein, werden benötigt", price: 200 },
      ],
    },
  } as Record<string, MaterialCategory>,

  // Zusatzfunktionen
  features: [
    { id: "kontakt", label: "Kontaktformular", price: 0, included: true },
    { id: "blog", label: "Blog / Neuigkeiten", price: 180 },
    { id: "events", label: "Veranstaltungen", price: 280 },
    { id: "shop", label: "Online-Shop", price: 790 },
    { id: "booking", label: "Terminbuchung", price: 390 },
    { id: "newsletter", label: "Newsletter", price: 120 },
    { id: "multilang", label: "Mehrsprachigkeit", price: 490 },
    { id: "donation", label: "Spendenfunktion", price: 190 },
    { id: "members", label: "Mitgliederbereich", price: 590 },
    { id: "seo", label: "SEO-Basisoptimierung", price: 190 },
    { id: "dsgvo", label: "DSGVO / Cookie-Setup", price: 140 },
    { id: "social", label: "Social Media Einbindung", price: 90 },
    { id: "migration", label: "Inhaltsübernahme alte Website", price: 250 },
  ] as Feature[],

  // Designniveau
  design: [
    {
      value: "basic",
      label: "Schlicht & funktional",
      hint: "Klares, aufgeräumtes Design",
      price: 0,
    },
    {
      value: "pro",
      label: "Professioneller Standard",
      hint: "Modernes, durchdachtes Design",
      price: 0,
    },
    {
      value: "premium",
      label: "Individuelles Premium-Design",
      hint: "Maßgeschneidert, mit besonderem Anspruch",
      price: 600,
    },
  ] as DesignOption[],

  // Monatliche Betreuung
  support: [
    { value: "none", label: "Keine Betreuung", price: 0 },
    {
      value: "basic",
      label: "Wartung & Updates",
      hint: "Sicherheitsupdates, Backups, Monitoring",
      price: 29,
    },
    {
      value: "plus",
      label: "Wartung + kleinere Änderungen",
      hint: "Zusätzlich kleine Anpassungen pro Monat",
      price: 59,
    },
    {
      value: "full",
      label: "Umfassende Betreuung",
      hint: "Vollständige Pflege, Änderungen, Support",
      price: 99,
    },
  ] as SupportOption[],
};

export function formatPrice(num: number): string {
  return (
    new Intl.NumberFormat("de-DE", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num) + " €"
  );
}
