import { NextRequest, NextResponse } from "next/server";
import { findProjectByToken } from "@/lib/wp";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const post = await findProjectByToken(token);
  if (!post) {
    return NextResponse.json(
      { error: "Projekt nicht gefunden." },
      { status: 404 }
    );
  }

  const meta = post.project_meta || post.meta || {};

  return NextResponse.json({
    title: post.title?.rendered || "",
    kunde: meta._wwd_kunde_name || "",
    status: meta._wwd_status || "anfrage",
    statusNotiz: meta._wwd_status_notiz || "",
    preis: meta._wwd_preis || "",
    monatlich: meta._wwd_monatlich || "",
    konfiguration: meta._wwd_konfiguration || "",
    erstellt: post.date || "",
  });
}
