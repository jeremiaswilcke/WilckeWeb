/* ==========================================================================
   WilckeWeb — JSON-Export & Analyse für das Inhaltsformular
   ========================================================================== */

import type {
  ContentFormData,
  ContentFormExport,
  PageDefinition,
  SectionDefinition,
} from "./content-form-types";
import { SECTION_TYPE_LABELS } from "./content-form-types";

function getPageStatus(page: PageDefinition): "complete" | "partial" | "empty" {
  if (page.sections.length === 0) return "empty";
  const hasContent = page.sections.some(
    (s) => s.contentText.trim() || s.bulletPoints.some((b) => b.trim())
  );
  if (!hasContent) return "empty";
  const allFinal = page.sections.every((s) => s.contentStatus === "final");
  return allFinal ? "complete" : "partial";
}

function getMissingTexts(pages: PageDefinition[]): Array<{ page: string; section: string }> {
  const missing: Array<{ page: string; section: string }> = [];
  for (const page of pages) {
    for (const section of page.sections) {
      if (section.contentStatus === "missing") {
        missing.push({
          page: page.title,
          section: section.customTitle || SECTION_TYPE_LABELS[section.type] || section.type,
        });
      }
    }
  }
  return missing;
}

function getMissingImages(
  pages: PageDefinition[]
): Array<{ page: string; section: string; description: string }> {
  const missing: Array<{ page: string; section: string; description: string }> = [];
  for (const page of pages) {
    for (const section of page.sections) {
      if (section.image.required && !section.image.available) {
        missing.push({
          page: page.title,
          section: section.customTitle || SECTION_TYPE_LABELS[section.type] || section.type,
          description: section.image.description || "Beschreibung fehlt",
        });
      }
    }
  }
  return missing;
}

function getAssetsNeeded(pages: PageDefinition[]): string[] {
  const assets: string[] = [];
  for (const page of pages) {
    for (const section of page.sections) {
      if (section.image.required && section.image.needsDelivery) {
        const label = section.customTitle || SECTION_TYPE_LABELS[section.type] || section.type;
        assets.push(`${page.title} → ${label}: ${section.image.description || "Bild wird benötigt"}`);
      }
    }
  }
  return assets;
}

export function calculateCompletion(data: ContentFormData): number {
  let total = 0;
  let filled = 0;

  // Project fields (10 fields)
  const p = data.project;
  const projectFields = [
    p.projectName, p.companyName, p.industry, p.offering,
    p.targetAudience, p.websiteGoal, p.uniqueSellingPoints, p.mainCallToAction,
  ];
  total += projectFields.length + 2; // +2 for arrays
  filled += projectFields.filter((f) => f.trim()).length;
  filled += p.desiredImpression.length > 0 ? 1 : 0;
  filled += p.tonality.length > 0 ? 1 : 0;

  // Pages
  total += 1;
  filled += data.pages.length > 0 ? 1 : 0;

  // Page content
  for (const page of data.pages) {
    total += 2; // purpose + at least one section
    filled += page.pagePurpose.trim() ? 1 : 0;
    filled += page.sections.length > 0 ? 1 : 0;

    for (const section of page.sections) {
      total += 1;
      filled += section.contentStatus === "final" ? 1 : section.contentStatus === "draft" ? 0.5 : 0;
    }
  }

  // Extras
  const c = data.extras.contact;
  const contactFields = [c.email, c.phone, c.address];
  total += contactFields.length;
  filled += contactFields.filter((f) => f.trim()).length;

  return total > 0 ? Math.round((filled / total) * 100) : 0;
}

export function exportToJSON(data: ContentFormData): ContentFormExport {
  const missingTexts = getMissingTexts(data.pages);
  const missingImages = getMissingImages(data.pages);
  const assetsNeeded = getAssetsNeeded(data.pages);
  const completionPct = calculateCompletion(data);

  const completePages = data.pages
    .filter((p) => getPageStatus(p) === "complete")
    .map((p) => p.title);
  const incompletePages = data.pages
    .filter((p) => getPageStatus(p) !== "complete")
    .map((p) => p.title);

  return {
    version: data.version,
    created_at: new Date().toISOString(),
    project: {
      name: data.project.projectName,
      company: data.project.companyName,
      industry: data.project.industry,
      offering: data.project.offering,
      unique_selling_points: data.project.uniqueSellingPoints,
      main_cta: data.project.mainCallToAction,
    },
    goals: {
      website_goal: data.project.websiteGoal,
      desired_impression: data.project.desiredImpression,
      target_audience: data.project.targetAudience,
    },
    tone: {
      style: data.project.tonality,
    },
    site_structure: {
      total_pages: data.pages.length,
      page_slugs: data.pages.map((p) => p.slug),
    },
    pages: data.pages.map((page) => ({
      slug: page.slug,
      title: page.title,
      type: page.pageType,
      page_purpose: page.pagePurpose,
      description: page.description,
      status: getPageStatus(page),
      sections: page.sections.map((s: SectionDefinition) => ({
        type: s.type,
        title: s.customTitle || SECTION_TYPE_LABELS[s.type] || s.type,
        content_text: s.contentText,
        bullet_points: s.bulletPoints.filter((b) => b.trim()),
        content_status: s.contentStatus,
        image: {
          required: s.image.required,
          position: s.image.position,
          type: s.image.type,
          available: s.image.available,
          needs_delivery: s.image.needsDelivery,
          description: s.image.description,
        },
        cta: s.cta,
        notes: s.notes,
      })),
      notes: page.notes,
    })),
    extras: {
      legal: {
        impressum_available: data.extras.legal.impressumAvailable,
        datenschutz_available: data.extras.legal.datenschutzAvailable,
        agb_available: data.extras.legal.agbAvailable,
      },
      contact: {
        email: data.extras.contact.email,
        phone: data.extras.contact.phone,
        address: data.extras.contact.address,
        opening_hours: data.extras.contact.openingHours,
      },
      social_media: { ...data.extras.socialMedia },
      features: {
        newsletter: data.extras.features.newsletter,
        shop: data.extras.features.shop,
        booking: data.extras.features.booking,
        blog: data.extras.features.blog,
        multilingual: data.extras.features.multilingual,
        forms: data.extras.features.forms,
        external_tools: data.extras.features.externalTools,
      },
    },
    summary: {
      completion_percentage: completionPct,
      complete_pages: completePages,
      incomplete_pages: incompletePages,
      missing_texts: missingTexts,
      missing_images: missingImages,
      assets_needed: assetsNeeded,
    },
  };
}

export function downloadJSON(data: ContentFormExport): void {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const slug = data.project.company
    ? data.project.company.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    : "website-inhalte";
  a.download = `${slug}-inhalte.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}
