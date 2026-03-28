import { NextRequest, NextResponse } from "next/server";
import { wpFetch, generateToken } from "@/lib/wp";
import { sendMail } from "@/lib/mail";

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

    const token = generateToken();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wilckeweb.de";
    const projektUrl = `${siteUrl}/projekt/${token}`;

    // Create project in WordPress
    const wpRes = await wpFetch("/projekte", {
      method: "POST",
      body: JSON.stringify({
        title: `Anfrage von ${name}`,
        status: "publish",
        meta: {
          _wwd_kunde_name: name,
          _wwd_kunde_email: email,
          _wwd_kunde_telefon: phone || "",
          _wwd_token: token,
          _wwd_nachricht: message || "",
          _wwd_konfiguration: summary || "",
          _wwd_preis: total || "",
          _wwd_monatlich: monthly || "",
          _wwd_status: "anfrage",
          _wwd_status_notiz: "",
        },
      }),
    });

    if (!wpRes.ok) {
      const err = await wpRes.text();
      console.error("WP error:", err);
      return NextResponse.json(
        { error: "Projekt konnte nicht erstellt werden." },
        { status: 500 }
      );
    }

    // Send confirmation email to customer
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

    // Send notification email to WilckeWeb
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
        `Projekt verwalten: ${process.env.WP_URL}/wp-admin/edit.php?post_type=wwd_projekt`,
        `Kundenansicht: ${projektUrl}`,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ success: true, projektUrl });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Ein Fehler ist aufgetreten." },
      { status: 500 }
    );
  }
}
