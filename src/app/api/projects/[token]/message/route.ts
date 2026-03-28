import { NextRequest, NextResponse } from "next/server";
import { findProjectByToken } from "@/lib/wp";
import { sendMail } from "@/lib/mail";

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

  const post = await findProjectByToken(token);
  if (!post) {
    return NextResponse.json(
      { error: "Projekt nicht gefunden." },
      { status: 404 }
    );
  }

  const meta = post.project_meta || post.meta || {};
  const kundeName = meta._wwd_kunde_name || name || "Kunde";
  const kundeEmail = meta._wwd_kunde_email || "";

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
      `Projekt verwalten: ${process.env.WP_URL}/wp-admin/edit.php?post_type=wwd_projekt`,
    ].join("\n"),
  });

  return NextResponse.json({ success: true });
}
