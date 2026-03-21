/* ==========================================================================
   WilckeWeb — Inhaltsformular Typen
   Zentrales Datenmodell für das Website-Inhaltsformular
   ========================================================================== */

// ── Projekt & Unternehmen ──────────────────────────────────────────────────

export interface ProjectInfo {
  projectName: string;
  companyName: string;
  industry: string;
  offering: string;
  targetAudience: string;
  websiteGoal: string;
  desiredImpression: string[];
  tonality: string[];
  uniqueSellingPoints: string;
  mainCallToAction: string;
}

// ── Seitenstruktur ─────────────────────────────────────────────────────────

export interface PageDefinition {
  id: string;
  slug: string;
  title: string;
  pageType: PageType;
  pagePurpose: string;
  description: string;
  sortOrder: number;
  sections: SectionDefinition[];
  notes: string;
}

export type PageType =
  | "startseite"
  | "ueber-uns"
  | "leistungen"
  | "angebote"
  | "kontakt"
  | "blog"
  | "faq"
  | "landingpage"
  | "terminbuchung"
  | "events"
  | "portfolio"
  | "referenzen"
  | "custom";

export const PAGE_TYPE_LABELS: Record<PageType, string> = {
  startseite: "Startseite",
  "ueber-uns": "Über uns",
  leistungen: "Leistungen",
  angebote: "Angebote",
  kontakt: "Kontakt",
  blog: "Blog / Neuigkeiten",
  faq: "FAQ",
  landingpage: "Landingpage",
  terminbuchung: "Terminbuchung",
  events: "Events",
  portfolio: "Portfolio",
  referenzen: "Referenzen",
  custom: "Eigene Seite",
};

// ── Sektionen ──────────────────────────────────────────────────────────────

export interface SectionDefinition {
  id: string;
  type: SectionType;
  customTitle: string;
  contentText: string;
  bulletPoints: string[];
  useBullets: boolean;
  contentStatus: ContentStatus;
  image: SectionImage;
  cta: string;
  notes: string;
}

export type SectionType =
  | "hero"
  | "intro"
  | "services"
  | "benefits"
  | "about"
  | "team"
  | "testimonials"
  | "faq"
  | "contact"
  | "gallery"
  | "cta"
  | "pricing"
  | "process"
  | "references"
  | "form"
  | "custom";

export const SECTION_TYPE_LABELS: Record<SectionType, string> = {
  hero: "Hero / Header-Bereich",
  intro: "Einleitung",
  services: "Leistungen",
  benefits: "Vorteile",
  about: "Über uns",
  team: "Team",
  testimonials: "Kundenstimmen",
  faq: "FAQ",
  contact: "Kontaktblock",
  gallery: "Galerie",
  cta: "Call-to-Action",
  pricing: "Preise",
  process: "Ablauf / Prozess",
  references: "Referenzen",
  form: "Formular",
  custom: "Freie Sektion",
};

export type ContentStatus = "final" | "draft" | "missing";

export const CONTENT_STATUS_LABELS: Record<ContentStatus, string> = {
  final: "Text ist fertig",
  draft: "Entwurf / Stichworte",
  missing: "Text fehlt noch",
};

// ── Bilder / Medien ────────────────────────────────────────────────────────

export interface SectionImage {
  required: boolean;
  position: ImagePosition;
  type: ImageType;
  available: boolean;
  needsDelivery: boolean;
  description: string;
}

export type ImagePosition = "" | "background" | "left" | "right" | "top" | "inline" | "fullwidth";

export const IMAGE_POSITION_LABELS: Record<string, string> = {
  "": "Nicht festgelegt",
  background: "Hintergrundbild",
  left: "Links neben Text",
  right: "Rechts neben Text",
  top: "Über dem Text",
  inline: "Im Text eingebettet",
  fullwidth: "Volle Breite",
};

export type ImageType =
  | ""
  | "team_photo"
  | "product_photo"
  | "mood_image"
  | "background"
  | "logo"
  | "icon"
  | "gallery"
  | "before_after"
  | "placeholder";

export const IMAGE_TYPE_LABELS: Record<string, string> = {
  "": "Nicht festgelegt",
  team_photo: "Teamfoto",
  product_photo: "Produktfoto",
  mood_image: "Stimmungsbild",
  background: "Hintergrundbild",
  logo: "Logo",
  icon: "Icon / Grafik",
  gallery: "Galerie",
  before_after: "Vorher/Nachher",
  placeholder: "Platzhalter",
};

// ── Zusatzinfos ────────────────────────────────────────────────────────────

export interface ExtrasInfo {
  legal: {
    impressumAvailable: boolean;
    datenschutzAvailable: boolean;
    agbAvailable: boolean;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    openingHours: string;
  };
  socialMedia: {
    facebook: string;
    instagram: string;
    linkedin: string;
    youtube: string;
    tiktok: string;
    xing: string;
    other: string;
  };
  features: {
    newsletter: boolean;
    shop: boolean;
    booking: boolean;
    blog: boolean;
    multilingual: boolean;
    forms: string;
    externalTools: string;
  };
}

// ── Gesamtformular ─────────────────────────────────────────────────────────

export interface ContentFormData {
  version: string;
  project: ProjectInfo;
  pages: PageDefinition[];
  extras: ExtrasInfo;
}

// ── Tonalität & Wirkung Optionen ───────────────────────────────────────────

export const TONALITY_OPTIONS = [
  "seriös",
  "modern",
  "emotional",
  "minimalistisch",
  "hochwertig",
  "jugendlich",
  "warm",
  "professionell",
  "nahbar",
  "innovativ",
  "traditionell",
  "luxuriös",
  "verspielt",
  "sachlich",
] as const;

export const IMPRESSION_OPTIONS = [
  "Vertrauen aufbauen",
  "Kompetenz zeigen",
  "Modernität ausstrahlen",
  "Nahbarkeit vermitteln",
  "Qualität betonen",
  "Innovation darstellen",
  "Begeisterung wecken",
  "Seriosität ausstrahlen",
  "Persönlichkeit zeigen",
  "Exklusivität vermitteln",
] as const;

export const WEBSITE_GOAL_OPTIONS = [
  "Neue Kunden gewinnen",
  "Produkte / Leistungen präsentieren",
  "Termine / Anfragen generieren",
  "Informieren & Vertrauen aufbauen",
  "Online-Shop / Verkauf",
  "Marke stärken",
  "Community aufbauen",
  "Mitarbeiter gewinnen",
  "Sonstiges",
] as const;

export const INDUSTRY_OPTIONS = [
  "Handwerk",
  "Gastronomie",
  "Gesundheit & Medizin",
  "Coaching & Beratung",
  "IT & Technologie",
  "Recht & Finanzen",
  "Bildung & Soziales",
  "Kunst & Kultur",
  "Sport & Fitness",
  "Immobilien",
  "E-Commerce",
  "Agentur & Marketing",
  "Kirche & Gemeinde",
  "Verein & Organisation",
  "Sonstiges",
] as const;

// ── JSON-Export-Struktur ───────────────────────────────────────────────────

export interface ContentFormExport {
  version: string;
  created_at: string;
  project: {
    name: string;
    company: string;
    industry: string;
    offering: string;
    unique_selling_points: string;
    main_cta: string;
  };
  goals: {
    website_goal: string;
    desired_impression: string[];
    target_audience: string;
  };
  tone: {
    style: string[];
  };
  site_structure: {
    total_pages: number;
    page_slugs: string[];
  };
  pages: Array<{
    slug: string;
    title: string;
    type: string;
    page_purpose: string;
    description: string;
    status: "complete" | "partial" | "empty";
    sections: Array<{
      type: string;
      title: string;
      content_text: string;
      bullet_points: string[];
      content_status: string;
      image: {
        required: boolean;
        position: string;
        type: string;
        available: boolean;
        needs_delivery: boolean;
        description: string;
      };
      cta: string;
      notes: string;
    }>;
    notes: string;
  }>;
  extras: {
    legal: {
      impressum_available: boolean;
      datenschutz_available: boolean;
      agb_available: boolean;
    };
    contact: {
      email: string;
      phone: string;
      address: string;
      opening_hours: string;
    };
    social_media: Record<string, string>;
    features: {
      newsletter: boolean;
      shop: boolean;
      booking: boolean;
      blog: boolean;
      multilingual: boolean;
      forms: string;
      external_tools: string;
    };
  };
  summary: {
    completion_percentage: number;
    complete_pages: string[];
    incomplete_pages: string[];
    missing_texts: Array<{ page: string; section: string }>;
    missing_images: Array<{ page: string; section: string; description: string }>;
    assets_needed: string[];
  };
}

// ── Kombination mit Angebotsformular ───────────────────────────────────────

export interface CombinedProjectData {
  project_id: string;
  pricing_data: {
    page_count: string;
    materials: Record<string, string>;
    features: string[];
    design_level: string;
    support_plan: string;
    total_price: number;
    monthly_price: number;
  };
  content_data: ContentFormExport;
}
