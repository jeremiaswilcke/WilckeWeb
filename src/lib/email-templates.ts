function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export interface ConfirmationEmailInput {
  name: string;
  projektUrl: string;
  summary?: string;
  total?: string;
  monthly?: string;
  siteUrl: string;
}

export function buildConfirmationEmail(input: ConfirmationEmailInput): {
  text: string;
  html: string;
} {
  const { name, projektUrl, summary, total, monthly, siteUrl } = input;

  const text = [
    `Hallo ${name},`,
    "",
    "vielen Dank für Ihre Anfrage! Wir haben alle Details erhalten und melden uns in Kürze bei Ihnen.",
    "",
    "Den aktuellen Status Ihres Projekts können Sie jederzeit hier verfolgen:",
    projektUrl,
    "",
    "--- Ihre Konfiguration ---",
    summary || "(keine Konfiguration übermittelt)",
    "",
    `Geschätzter Richtpreis: ${total || "–"}`,
    monthly ? `Monatliche Betreuung: ${monthly}` : "",
    "",
    "Herzliche Grüße,",
    "Ihr WilckeWeb-Team",
  ]
    .filter(Boolean)
    .join("\n");

  const logoUrl = `${siteUrl}/wilckeweb_logo.png`;
  const safeName = escapeHtml(name);
  const safeSummary = summary ? escapeHtml(summary) : "";
  const safeTotal = total ? escapeHtml(total) : "";
  const safeMonthly = monthly ? escapeHtml(monthly) : "";

  const monthlyRow = safeMonthly
    ? `<tr>
        <td style="font-size:14px;color:#5a5a5a;padding:6px 0;">Monatliche Betreuung</td>
        <td align="right" style="font-size:14px;color:#3F3F3F;font-weight:600;padding:6px 0;">${safeMonthly}</td>
      </tr>`
    : "";

  const summaryBlock = safeSummary
    ? `<tr><td style="padding:0 40px;">
        <div style="border-top:1px solid #eeeeee;padding-top:24px;">
          <p style="margin:0 0 12px 0;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#999999;">Ihre Konfiguration</p>
          <p style="margin:0;font-size:14px;line-height:1.7;color:#3F3F3F;white-space:pre-wrap;">${safeSummary}</p>
        </div>
      </td></tr>`
    : "";

  const priceBlock = safeTotal || safeMonthly
    ? `<tr><td style="padding:16px 40px 8px 40px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${safeTotal ? `<tr>
            <td style="font-size:14px;color:#5a5a5a;padding:6px 0;">Geschätzter Richtpreis</td>
            <td align="right" style="font-size:14px;color:#3F3F3F;font-weight:600;padding:6px 0;">${safeTotal}</td>
          </tr>` : ""}
          ${monthlyRow}
        </table>
      </td></tr>`
    : "";

  const html = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Ihre Projektanfrage bei WilckeWeb</title>
</head>
<body style="margin:0;padding:0;background:#faf8f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#3F3F3F;-webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f5;padding:32px 16px;">
  <tr><td align="center">
    <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 2px 24px rgba(63,63,63,0.06);">
      <tr><td align="center" style="padding:40px 40px 16px 40px;">
        <a href="${escapeHtml(siteUrl)}" style="text-decoration:none;">
          <img src="${escapeHtml(logoUrl)}" alt="WilckeWeb" width="160" style="width:160px;max-width:100%;height:auto;display:block;border:0;">
        </a>
      </td></tr>
      <tr><td style="padding:0 40px;">
        <div style="height:3px;width:44px;background:#F97D73;border-radius:2px;"></div>
      </td></tr>
      <tr><td style="padding:24px 40px 4px 40px;">
        <h1 style="margin:0;font-size:24px;font-weight:700;line-height:1.3;color:#3F3F3F;">Hallo ${safeName},</h1>
      </td></tr>
      <tr><td style="padding:8px 40px 24px 40px;">
        <p style="margin:0;font-size:16px;line-height:1.7;color:#5a5a5a;">vielen Dank für Ihre Anfrage! Wir haben alle Details erhalten und melden uns in Kürze bei Ihnen.</p>
      </td></tr>
      <tr><td align="center" style="padding:4px 40px 32px 40px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
          <tr><td align="center" bgcolor="#F97D73" style="border-radius:999px;">
            <a href="${escapeHtml(projektUrl)}" style="display:inline-block;background:#F97D73;color:#ffffff;text-decoration:none;font-weight:600;font-size:16px;padding:14px 32px;border-radius:999px;mso-padding-alt:0;">
              Projektstatus ansehen
            </a>
          </td></tr>
        </table>
        <p style="margin:14px 0 0 0;font-size:12px;color:#999999;">oder kopieren: <span style="color:#56A0A8;">${escapeHtml(projektUrl)}</span></p>
      </td></tr>
      ${summaryBlock}
      ${priceBlock}
      <tr><td style="background:#faf8f5;padding:20px 40px;text-align:center;margin-top:24px;">
        <p style="margin:0;font-size:12px;color:#999999;line-height:1.7;">
          Sie können den Status Ihres Projekts jederzeit über den Button oben verfolgen.<br>
          Bei Fragen einfach auf diese E-Mail antworten.
        </p>
      </td></tr>
    </table>
    <p style="margin:20px 0 0 0;font-size:11px;color:#999999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <a href="${escapeHtml(siteUrl)}" style="color:#999999;text-decoration:none;">WilckeWeb &middot; wilckeweb.org</a>
    </p>
  </td></tr>
</table>
</body>
</html>`;

  return { text, html };
}
