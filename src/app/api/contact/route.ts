/* ==========================================================================
   WilckeWeb — API: Kontakt- & Buchungsformular
   POST /api/contact  → E-Mail an jeremias@wilckeweb.org
   ========================================================================== */

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  type: "kontakt" | "buchung";
  message: string;
  _honey?: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

function buildContactHTML(data: ContactForm): string {
  const typeLabel = data.type === "buchung" ? "Projektanfrage / Buchung" : "Kontaktanfrage";
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:'Inter','Segoe UI',sans-serif;background:#f6f3ef;color:#2a2a2a">
  <div style="max-width:640px;margin:0 auto;padding:32px 16px">
    <div style="background:#3F3F3F;border-radius:16px 16px 0 0;padding:32px;text-align:center">
      <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700">${typeLabel}</h1>
      <p style="margin:8px 0 0;color:rgba(255,255,255,.7);font-size:14px">WilckeWeb</p>
    </div>
    <div style="background:#fff;padding:32px;border-radius:0 0 16px 16px">
      <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px">
        <tr><td style="padding:6px 0;color:#6b6b6b;width:100px">Name</td><td style="padding:6px 0;font-weight:600">${data.name}</td></tr>
        <tr><td style="padding:6px 0;color:#6b6b6b">E-Mail</td><td style="padding:6px 0"><a href="mailto:${data.email}" style="color:#56A0A8">${data.email}</a></td></tr>
        ${data.phone ? `<tr><td style="padding:6px 0;color:#6b6b6b">Telefon</td><td style="padding:6px 0">${data.phone}</td></tr>` : ""}
        <tr><td style="padding:6px 0;color:#6b6b6b">Typ</td><td style="padding:6px 0">${typeLabel}</td></tr>
      </table>
      <h2 style="font-size:16px;color:#3F3F3F;margin:0 0 12px;padding-bottom:8px;border-bottom:2px solid #56A0A8">Nachricht</h2>
      <p style="font-size:14px;line-height:1.7;white-space:pre-wrap">${data.message}</p>
    </div>
    <p style="font-size:11px;color:#999;text-align:center;margin-top:16px">
      Automatisch gesendet vom WilckeWeb Kontaktformular
    </p>
  </div>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactForm = await request.json();

    // Honeypot check
    if (body._honey) {
      return NextResponse.json({ success: true });
    }

    // Validation
    if (!body.name?.trim()) {
      return NextResponse.json({ error: "Name ist erforderlich." }, { status: 400 });
    }
    if (!body.email?.trim() || !body.email.includes("@")) {
      return NextResponse.json({ error: "Gueltige E-Mail-Adresse ist erforderlich." }, { status: 400 });
    }
    if (!body.message?.trim()) {
      return NextResponse.json({ error: "Nachricht ist erforderlich." }, { status: 400 });
    }

    const mailFrom = process.env.MAIL_FROM || "WilckeWeb <noreply@wilckeweb.org>";
    const mailTo = process.env.MAIL_TO || "jeremias@wilckeweb.org";
    const typeLabel = body.type === "buchung" ? "Projektanfrage" : "Kontakt";

    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      replyTo: body.email,
      subject: `${typeLabel}: ${body.name}`,
      html: buildContactHTML(body),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Kontaktformular-Fehler:", err);
    return NextResponse.json({ error: "Fehler beim Senden." }, { status: 500 });
  }
}
