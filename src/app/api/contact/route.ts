import { NextRequest, NextResponse } from "next/server";
import { createProjekt } from "@/lib/projekte";
import { sendMail } from "@/lib/mail";
import { sendTelegramNotification } from "@/lib/telegram";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message, summary, total, monthly } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name und E-Mail sind Pflichtfelder." },
        { status: 400 }
      );
    }

    const created = await createProjekt({
      kunde_name: name,
      kunde_email: email,
      kunde_telefon: phone,
      nachricht: message,
      konfiguration: summary,
      preis: total,
      monatlich: monthly,
    });

    if ("error" in created) {
      console.error("Supabase insert error:", created.error);
      return NextResponse.json(
        { error: "Anfrage konnte nicht gespeichert werden." },
        { status: 500 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wilckeweb.org";
    const projektUrl = `${siteUrl}/projekt/${created.token}`;

    await sendMail({
      to: email,
      subject: "Ihre Projektanfrage bei WilckeWeb",
      text: [
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
        .join("\n"),
    });

    await sendMail({
      to: process.env.SMTP_USER!,
      subject: `Neue Projektanfrage: ${name}`,
      text: [
        `Neue Anfrage von ${name}`,
        `E-Mail: ${email}`,
        phone ? `Telefon: ${phone}` : "",
        message ? `\nNachricht:\n${message}` : "",
        "",
        "--- Konfiguration ---",
        summary || "(keine)",
        "",
        `Richtpreis: ${total || "–"}`,
        monthly ? `Monatlich: ${monthly}` : "",
        "",
        `Kundenansicht: ${projektUrl}`,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    const telegramLines = [
      "*Neue Projektanfrage*",
      "",
      `*Von:* ${name}`,
      `*E-Mail:* ${email}`,
      phone ? `*Telefon:* ${phone}` : "",
      total ? `*Richtpreis:* ${total}` : "",
      monthly ? `*Monatlich:* ${monthly}` : "",
      summary ? `\n*Konfiguration:*\n${summary}` : "",
      message ? `\n*Nachricht:*\n${message}` : "",
      "",
      `*Projekt-Seite:* ${projektUrl}`,
    ].filter(Boolean);
    await sendTelegramNotification(telegramLines.join("\n"));

    return NextResponse.json({ success: true, projektUrl });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Ein Fehler ist aufgetreten." },
      { status: 500 }
    );
  }
}
