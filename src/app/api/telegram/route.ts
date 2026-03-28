import { NextRequest, NextResponse } from "next/server";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

export async function POST(req: NextRequest) {
  try {
    const { message, name } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Bitte geben Sie eine Nachricht ein." },
        { status: 400 }
      );
    }

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error("Telegram not configured");
      return NextResponse.json(
        { error: "Nachrichtendienst nicht konfiguriert." },
        { status: 500 }
      );
    }

    const text = [
      `💬 *Neue Nachricht von der Website*`,
      "",
      name ? `*Von:* ${name}` : "*Von:* Besucher",
      "",
      message,
    ].join("\n");

    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("Telegram API error:", err);
      return NextResponse.json(
        { error: "Nachricht konnte nicht gesendet werden." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Telegram route error:", error);
    return NextResponse.json(
      { error: "Ein Fehler ist aufgetreten." },
      { status: 500 }
    );
  }
}
