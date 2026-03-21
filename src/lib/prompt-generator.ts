/* ==========================================================================
   WilckeWeb — Prompt-Generator
   Erzeugt aus der JSON-Struktur einen Website-Generierungs-Prompt
   ========================================================================== */

import type { ContentFormExport } from "./content-form-types";

export function generatePrompt(data: ContentFormExport): string {
  const lines: string[] = [];

  // ── Header ───────────────────────────────────────────────────────────────
  lines.push("# Website-Generierung");
  lines.push("");
  lines.push(`Erstelle eine vollständige, moderne Website für **${data.project.company || data.project.name}**.`);
  lines.push("");

  // ── Unternehmen ──────────────────────────────────────────────────────────
  lines.push("## Unternehmen");
  lines.push("");
  if (data.project.company) lines.push(`- **Firma:** ${data.project.company}`);
  if (data.project.industry) lines.push(`- **Branche:** ${data.project.industry}`);
  if (data.project.offering) lines.push(`- **Angebot:** ${data.project.offering}`);
  if (data.project.unique_selling_points)
    lines.push(`- **Alleinstellungsmerkmale:** ${data.project.unique_selling_points}`);
  lines.push("");

  // ── Zielgruppe & Ziele ───────────────────────────────────────────────────
  lines.push("## Zielgruppe & Ziele");
  lines.push("");
  if (data.goals.target_audience)
    lines.push(`- **Zielgruppe:** ${data.goals.target_audience}`);
  if (data.goals.website_goal)
    lines.push(`- **Hauptziel:** ${data.goals.website_goal}`);
  if (data.goals.desired_impression.length > 0)
    lines.push(`- **Gewünschte Wirkung:** ${data.goals.desired_impression.join(", ")}`);
  if (data.project.main_cta)
    lines.push(`- **Haupt-Call-to-Action:** ${data.project.main_cta}`);
  lines.push("");

  // ── Tonalität & Stil ────────────────────────────────────────────────────
  lines.push("## Tonalität & Stil");
  lines.push("");
  if (data.tone.style.length > 0)
    lines.push(`Die Website soll **${data.tone.style.join(", ")}** wirken.`);
  lines.push("");

  // ── Seitenstruktur ──────────────────────────────────────────────────────
  lines.push("## Seitenstruktur");
  lines.push("");
  lines.push(`Die Website umfasst **${data.site_structure.total_pages} Seiten**:`);
  lines.push("");
  for (const page of data.pages) {
    lines.push(`### ${page.title} (\`/${page.slug}\`)`);
    lines.push("");
    if (page.page_purpose) lines.push(`**Ziel der Seite:** ${page.page_purpose}`);
    if (page.description) lines.push(`**Beschreibung:** ${page.description}`);
    lines.push("");

    if (page.sections.length > 0) {
      lines.push("**Sektionen:**");
      lines.push("");
      for (const section of page.sections) {
        lines.push(`#### ${section.title}`);
        if (section.content_text) {
          lines.push("");
          lines.push(`Inhalt: ${section.content_text}`);
        }
        if (section.bullet_points.length > 0) {
          lines.push("");
          for (const point of section.bullet_points) {
            lines.push(`- ${point}`);
          }
        }
        if (section.image.required) {
          lines.push("");
          lines.push(
            `Bild: ${section.image.type || "nicht spezifiziert"}${
              section.image.position ? `, Position: ${section.image.position}` : ""
            }${section.image.description ? ` — ${section.image.description}` : ""}`
          );
          lines.push(
            `Bildstatus: ${section.image.available ? "vorhanden" : section.image.needs_delivery ? "wird nachgeliefert" : "fehlt noch"}`
          );
        }
        if (section.cta) {
          lines.push(`CTA: "${section.cta}"`);
        }
        lines.push("");
      }
    }

    if (page.notes) {
      lines.push(`> Hinweis: ${page.notes}`);
      lines.push("");
    }
  }

  // ── Technische Features ─────────────────────────────────────────────────
  const features: string[] = [];
  if (data.extras.features.newsletter) features.push("Newsletter-Anmeldung");
  if (data.extras.features.shop) features.push("Online-Shop");
  if (data.extras.features.booking) features.push("Terminbuchung");
  if (data.extras.features.blog) features.push("Blog");
  if (data.extras.features.multilingual) features.push("Mehrsprachigkeit");
  if (data.extras.features.forms) features.push(`Formulare: ${data.extras.features.forms}`);
  if (data.extras.features.external_tools)
    features.push(`Externe Tools: ${data.extras.features.external_tools}`);

  if (features.length > 0) {
    lines.push("## Technische Features");
    lines.push("");
    for (const f of features) {
      lines.push(`- ${f}`);
    }
    lines.push("");
  }

  // ── Kontakt & Social Media ──────────────────────────────────────────────
  const hasContact =
    data.extras.contact.email ||
    data.extras.contact.phone ||
    data.extras.contact.address;
  if (hasContact) {
    lines.push("## Kontaktdaten");
    lines.push("");
    if (data.extras.contact.email) lines.push(`- E-Mail: ${data.extras.contact.email}`);
    if (data.extras.contact.phone) lines.push(`- Telefon: ${data.extras.contact.phone}`);
    if (data.extras.contact.address) lines.push(`- Adresse: ${data.extras.contact.address}`);
    if (data.extras.contact.opening_hours)
      lines.push(`- Öffnungszeiten: ${data.extras.contact.opening_hours}`);
    lines.push("");
  }

  const socialEntries = Object.entries(data.extras.social_media).filter(
    ([, v]) => v.trim()
  );
  if (socialEntries.length > 0) {
    lines.push("## Social Media");
    lines.push("");
    for (const [key, value] of socialEntries) {
      lines.push(`- ${key}: ${value}`);
    }
    lines.push("");
  }

  // ── Rechtliches ─────────────────────────────────────────────────────────
  lines.push("## Rechtliches");
  lines.push("");
  lines.push(
    `- Impressum: ${data.extras.legal.impressum_available ? "vorhanden" : "muss erstellt werden"}`
  );
  lines.push(
    `- Datenschutz: ${data.extras.legal.datenschutz_available ? "vorhanden" : "muss erstellt werden"}`
  );
  lines.push(
    `- AGB: ${data.extras.legal.agb_available ? "vorhanden" : "nicht vorhanden / nicht benötigt"}`
  );
  lines.push("");

  // ── Offene Punkte ───────────────────────────────────────────────────────
  if (
    data.summary.missing_texts.length > 0 ||
    data.summary.missing_images.length > 0 ||
    data.summary.assets_needed.length > 0
  ) {
    lines.push("## Offene Punkte");
    lines.push("");

    if (data.summary.missing_texts.length > 0) {
      lines.push("**Fehlende Texte:**");
      for (const mt of data.summary.missing_texts) {
        lines.push(`- ${mt.page} → ${mt.section}`);
      }
      lines.push("");
    }

    if (data.summary.missing_images.length > 0) {
      lines.push("**Fehlende Bilder:**");
      for (const mi of data.summary.missing_images) {
        lines.push(`- ${mi.page} → ${mi.section}: ${mi.description}`);
      }
      lines.push("");
    }

    if (data.summary.assets_needed.length > 0) {
      lines.push("**Vom Kunden nachzuliefern:**");
      for (const a of data.summary.assets_needed) {
        lines.push(`- ${a}`);
      }
      lines.push("");
    }
  }

  // ── Hinweise für die Umsetzung ──────────────────────────────────────────
  lines.push("## Umsetzungshinweise");
  lines.push("");
  lines.push("- Die Website muss vollständig responsive sein (Mobile, Tablet, Desktop).");
  lines.push("- Alle Texte in deutscher Sprache.");
  lines.push("- DSGVO-konform mit Cookie-Banner.");
  lines.push("- Barrierefreie Grundstruktur (semantisches HTML, Alt-Texte, Kontraste).");
  lines.push("- Optimierte Ladezeiten und SEO-Grundlagen.");
  lines.push(`- Fertigstellungsgrad der Inhalte: ${data.summary.completion_percentage}%`);
  lines.push("");

  return lines.join("\n");
}
