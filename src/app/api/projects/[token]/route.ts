import { NextRequest, NextResponse } from "next/server";
import { findProjektByToken, defaultFortschritt } from "@/lib/projekte";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const projekt = await findProjektByToken(token);
  if (!projekt || projekt.status === "abgeschlossen") {
    return NextResponse.json(
      { error: "Projekt nicht gefunden." },
      { status: 404 }
    );
  }

  return NextResponse.json({
    kunde: projekt.kunde_name,
    status: projekt.status,
    statusNotiz: projekt.status_notiz || "",
    fortschritt: projekt.fortschritt || defaultFortschritt(projekt.status),
    preis: projekt.preis || "",
    monatlich: projekt.monatlich || "",
    konfiguration: projekt.konfiguration || "",
    erstellt: projekt.created_at,
  });
}
