/* ==========================================================================
   WilckeWeb — E-Mail-Versand
   ========================================================================== */

import nodemailer from "nodemailer";
import type { ContentFormExport } from "./content-form-types";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

function buildEmailHTML(data: ContentFormExport): string {
  const missingTexts = data.summary.missing_texts
    .map((mt) => `<li>${mt.page} — ${mt.section}</li>`)
    .join("");
  const missingImages = data.summary.missing_images
    .map((mi) => `<li>${mi.page} — ${mi.section}: ${mi.description}</li>`)
    .join("");

  const pages = data.pages
    .map(
      (p) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600">${p.title}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee">${p.sections.length} Sektionen</td>
        <td style="padding:8px 12px;border-bottom:1px solid #eee">
          <span style="display:inline-block;padding:2px 8px;border-radius:12px;font-size:12px;
            background:${p.status === "complete" ? "#dcfce7;color:#166534" : p.status === "partial" ? "#fef3c7;color:#92400e" : "#fee2e2;color:#991b1b"}">
            ${p.status === "complete" ? "vollständig" : p.status === "partial" ? "teilweise" : "leer"}
          </span>
        </td>
      </tr>`
    )
    .join("");

  const features = [
    data.extras.features.newsletter && "Newsletter",
    data.extras.features.shop && "Online-Shop",
    data.extras.features.booking && "Terminbuchung",
    data.extras.features.blog && "Blog",
    data.extras.features.multilingual && "Mehrsprachig",
  ]
    .filter(Boolean)
    .join(", ");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:'Inter','Segoe UI',sans-serif;background:#f6f3ef;color:#2a2a2a">
  <div style="max-width:640px;margin:0 auto;padding:32px 16px">

    <!-- Header -->
    <div style="background:#3F3F3F;border-radius:16px 16px 0 0;padding:32px;text-align:center">
      <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700">Neue Inhaltsformular-Einreichung</h1>
      <p style="margin:8px 0 0;color:rgba(255,255,255,.7);font-size:14px">WilckeWeb — Website-Inhaltsplaner</p>
    </div>

    <!-- Body -->
    <div style="background:#fff;padding:32px;border-radius:0 0 16px 16px">

      <!-- Projekt-Info -->
      <h2 style="font-size:16px;color:#3F3F3F;margin:0 0 16px;padding-bottom:8px;border-bottom:2px solid #56A0A8">
        Projektübersicht
      </h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px">
        <tr><td style="padding:4px 0;color:#6b6b6b;width:140px">Firma</td><td style="padding:4px 0;font-weight:600">${data.project.company || "—"}</td></tr>
        <tr><td style="padding:4px 0;color:#6b6b6b">Projektname</td><td style="padding:4px 0">${data.project.name || "—"}</td></tr>
        <tr><td style="padding:4px 0;color:#6b6b6b">Branche</td><td style="padding:4px 0">${data.project.industry || "—"}</td></tr>
        <tr><td style="padding:4px 0;color:#6b6b6b">Zielgruppe</td><td style="padding:4px 0">${data.goals.target_audience || "—"}</td></tr>
        <tr><td style="padding:4px 0;color:#6b6b6b">Website-Ziel</td><td style="padding:4px 0">${data.goals.website_goal || "—"}</td></tr>
        <tr><td style="padding:4px 0;color:#6b6b6b">Tonalität</td><td style="padding:4px 0">${data.tone.style.join(", ") || "—"}</td></tr>
        <tr><td style="padding:4px 0;color:#6b6b6b">Haupt-CTA</td><td style="padding:4px 0">${data.project.main_cta || "—"}</td></tr>
        <tr><td style="padding:4px 0;color:#6b6b6b">E-Mail</td><td style="padding:4px 0">${data.extras.contact.email || "—"}</td></tr>
        <tr><td style="padding:4px 0;color:#6b6b6b">Telefon</td><td style="padding:4px 0">${data.extras.contact.phone || "—"}</td></tr>
        ${features ? `<tr><td style="padding:4px 0;color:#6b6b6b">Features</td><td style="padding:4px 0">${features}</td></tr>` : ""}
      </table>

      <!-- Vollständigkeit -->
      <div style="background:#f6f3ef;border-radius:12px;padding:16px;margin-bottom:24px;text-align:center">
        <div style="font-size:32px;font-weight:800;color:${data.summary.completion_percentage >= 80 ? "#166534" : data.summary.completion_percentage >= 50 ? "#92400e" : "#991b1b"}">
          ${data.summary.completion_percentage}%
        </div>
        <div style="font-size:13px;color:#6b6b6b">Vollständigkeit</div>
      </div>

      <!-- Seiten -->
      <h2 style="font-size:16px;color:#3F3F3F;margin:0 0 12px;padding-bottom:8px;border-bottom:2px solid #56A0A8">
        Seiten (${data.site_structure.total_pages})
      </h2>
      <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:24px">
        ${pages || '<tr><td style="padding:8px;color:#6b6b6b">Keine Seiten angelegt</td></tr>'}
      </table>

      <!-- Fehlende Inhalte -->
      ${
        data.summary.missing_texts.length > 0 || data.summary.missing_images.length > 0
          ? `
        <h2 style="font-size:16px;color:#3F3F3F;margin:0 0 12px;padding-bottom:8px;border-bottom:2px solid #F97D73">
          Offene Punkte
        </h2>
        ${missingTexts ? `<p style="font-size:13px;color:#6b6b6b;margin:0 0 4px">Fehlende Texte:</p><ul style="font-size:13px;margin:0 0 12px;padding-left:20px">${missingTexts}</ul>` : ""}
        ${missingImages ? `<p style="font-size:13px;color:#6b6b6b;margin:0 0 4px">Fehlende Bilder:</p><ul style="font-size:13px;margin:0 0 12px;padding-left:20px">${missingImages}</ul>` : ""}
      `
          : ""
      }

      <p style="font-size:12px;color:#6b6b6b;margin:24px 0 0;text-align:center">
        Die vollständigen Daten sind als JSON im Anhang und in der Datenbank gespeichert.
      </p>
    </div>

    <p style="font-size:11px;color:#999;text-align:center;margin-top:16px">
      Automatisch generiert vom WilckeWeb Inhaltsplaner
    </p>
  </div>
</body>
</html>`;
}

export async function sendSubmissionEmail(data: ContentFormExport): Promise<void> {
  const mailFrom = process.env.MAIL_FROM || "WilckeWeb <noreply@wilckeweb.org>";
  const mailTo = process.env.MAIL_TO || "jeremias@wilckeweb.org";

  const jsonAttachment = JSON.stringify(data, null, 2);
  const slug = data.project.company
    ? data.project.company.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    : "website-inhalte";

  await transporter.sendMail({
    from: mailFrom,
    to: mailTo,
    subject: `Neues Inhaltsformular: ${data.project.company || data.project.name || "Unbekannt"}`,
    html: buildEmailHTML(data),
    attachments: [
      {
        filename: `${slug}-inhalte.json`,
        content: jsonAttachment,
        contentType: "application/json",
      },
    ],
  });
}
