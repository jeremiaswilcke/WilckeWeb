/* ==========================================================================
   WilckeWeb — Standardwerte für das Inhaltsformular
   ========================================================================== */

import type {
  ContentFormData,
  ProjectInfo,
  PageDefinition,
  SectionDefinition,
  ExtrasInfo,
  SectionImage,
  PageType,
} from "./content-form-types";

let counter = 0;
export function generateId(): string {
  return `${Date.now()}-${++counter}-${Math.random().toString(36).slice(2, 7)}`;
}

export function createDefaultImage(): SectionImage {
  return {
    required: false,
    position: "",
    type: "",
    available: false,
    needsDelivery: false,
    description: "",
  };
}

export function createDefaultSection(type: SectionDefinition["type"] = "custom"): SectionDefinition {
  return {
    id: generateId(),
    type,
    customTitle: "",
    contentText: "",
    bulletPoints: [],
    useBullets: false,
    contentStatus: "missing",
    image: createDefaultImage(),
    cta: "",
    notes: "",
  };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function createDefaultPage(pageType: PageType, title: string, sortOrder: number): PageDefinition {
  return {
    id: generateId(),
    slug: slugify(title),
    title,
    pageType,
    pagePurpose: "",
    description: "",
    sortOrder,
    sections: [],
    notes: "",
  };
}

export function createDefaultProject(): ProjectInfo {
  return {
    projectName: "",
    companyName: "",
    industry: "",
    offering: "",
    targetAudience: "",
    websiteGoal: "",
    desiredImpression: [],
    tonality: [],
    uniqueSellingPoints: "",
    mainCallToAction: "",
  };
}

export function createDefaultExtras(): ExtrasInfo {
  return {
    legal: {
      impressumAvailable: false,
      datenschutzAvailable: false,
      agbAvailable: false,
    },
    contact: {
      email: "",
      phone: "",
      address: "",
      openingHours: "",
    },
    socialMedia: {
      facebook: "",
      instagram: "",
      linkedin: "",
      youtube: "",
      tiktok: "",
      xing: "",
      other: "",
    },
    features: {
      newsletter: false,
      shop: false,
      booking: false,
      blog: false,
      multilingual: false,
      forms: "",
      externalTools: "",
    },
  };
}

export function createDefaultFormData(): ContentFormData {
  return {
    version: "1.0",
    project: createDefaultProject(),
    pages: [],
    extras: createDefaultExtras(),
  };
}

// Vorgeschlagene Sektionen pro Seitentyp
export const SUGGESTED_SECTIONS: Partial<Record<PageType, SectionDefinition["type"][]>> = {
  startseite: ["hero", "intro", "services", "benefits", "testimonials", "cta"],
  "ueber-uns": ["hero", "about", "team", "process", "cta"],
  leistungen: ["hero", "services", "benefits", "pricing", "cta"],
  angebote: ["hero", "pricing", "benefits", "cta"],
  kontakt: ["hero", "contact", "form"],
  blog: ["hero", "intro"],
  faq: ["hero", "faq", "contact"],
  landingpage: ["hero", "benefits", "testimonials", "cta", "form"],
  terminbuchung: ["hero", "intro", "form", "faq"],
  events: ["hero", "intro", "gallery"],
  portfolio: ["hero", "gallery", "references", "cta"],
  referenzen: ["hero", "references", "testimonials", "cta"],
};
