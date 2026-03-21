/* ==========================================================================
   WilckeWeb — API: Einzelne Einreichung
   GET    /api/submissions/[id]  → Details abrufen
   PATCH  /api/submissions/[id]  → Status aktualisieren
   ========================================================================== */

import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function authorize(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  const expectedKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return Boolean(authHeader && expectedKey && authHeader === `Bearer ${expectedKey}`);
}

// GET — Einzelne Einreichung mit vollständigen form_data
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!authorize(request)) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });
  }

  const { id } = await params;
  const client = createServerClient();
  const { data, error } = await client
    .from("submissions")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Nicht gefunden." }, { status: 404 });
  }

  return NextResponse.json({ submission: data });
}

// PATCH — Status oder Notizen aktualisieren
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!authorize(request)) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  // Nur erlaubte Felder aktualisieren
  const allowedFields: Record<string, unknown> = {};
  if (body.status) allowedFields.status = body.status;
  if (body.notes !== undefined) allowedFields.notes = body.notes;

  if (Object.keys(allowedFields).length === 0) {
    return NextResponse.json({ error: "Keine gültigen Felder." }, { status: 400 });
  }

  const client = createServerClient();
  const { data, error } = await client
    .from("submissions")
    .update(allowedFields)
    .eq("id", id)
    .select("id, status, notes, updated_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ submission: data });
}
