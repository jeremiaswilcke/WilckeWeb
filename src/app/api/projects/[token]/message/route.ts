import { NextRequest, NextResponse } from "next/server";
import { findProjektByToken } from "@/lib/projekte";
import { sendMail } from "@/lib/mail";
import { sendTelegramNotification } from "@/lib/telegram";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const { name, message } = await req.json();

  if (!message?.trim()) {
    return NextResponse.json(
      { error: "Bitte geben Sie eine Nachricht ein." },
      { status: 400 }
    );
  }

  const projekt = await findProjektByToken(token);
  if (!projekt || projekt.status === "abgeschlossen") {
    return NextResponse.json(
      { error: "Projekt nicht gefunden." },
      { status: 404 }
    );
  }

  const kundeName = projekt.kunde_name || name || "Kunde";
  const kundeEmail = projekt.kunde_email || "";

  await sendMail({
    to: process.env.SMTP_USER!,
    subject: `Rückfrage von ${kundeName} — Projekt #${token}`,
    text: [
      `Rückfrage von ${kundeName} (${kundeEmail})`,
      `Projekt-Token: ${token}`,
      "",
      "Nachricht:",
      message,
      "",
      `Im Supabase Studio: https://supabase.com/dashboard/project/komelvvzecebppisuiar/editor`,
    ].join("\n"),
  });

  await sendTelegramNotification(
    [
      `*Rückfrage zu Projekt* \`${token}\``,
      "",
      `*Von:* ${kundeName}${kundeEmail ? ` (${kundeEmail})` : ""}`,
      "",
      message,
    ].join("\n")
  );

  return NextResponse.json({ success: true });
}
