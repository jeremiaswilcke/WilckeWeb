/* ==========================================================================
   WilckeWeb — API: Formular-Einreichungen
   POST /api/submissions  → Speichern + E-Mail
   GET  /api/submissions  → Alle Einreichungen abrufen (nur mit Service Key)
   ========================================================================== */

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import { getSupabase, createServerClient } from "@/lib/supabase";
import { sendSubmissionEmail } from "@/lib/email";
import type { ContentFormExport } from "@/lib/content-form-types";

// POST — Neue Einreichung speichern + E-Mail senden
export async function POST(request: NextRequest) {
  try {
    const body: ContentFormExport = await request.json();

    // Validierung: mindestens Firmenname oder Projektname
    if (!body.project?.company && !body.project?.name) {
      return NextResponse.json(
        { error: "Firmenname oder Projektname ist erforderlich." },
        { status: 400 }
      );
    }

    // In Supabase speichern
    const { data: inserted, error: dbError } = await getSupabase()
      .from("submissions")
      .insert({
        company_name: body.project.company || body.project.name,
        project_name: body.project.name,
        email: body.extras?.contact?.email || "",
        industry: body.project.industry || "",
        page_count: body.site_structure?.total_pages || 0,
        completion_percentage: body.summary?.completion_percentage || 0,
        form_data: body,
      })
      .select("id, created_at")
      .single();

    if (dbError) {
      console.error("Supabase-Fehler:", dbError);
      return NextResponse.json(
        { error: "Fehler beim Speichern in der Datenbank.", details: dbError.message },
        { status: 500 }
      );
    }

    // E-Mail senden (nicht-blockierend — Fehler wird geloggt, aber Anfrage geht durch)
    let emailSent = false;
    try {
      await sendSubmissionEmail(body);
      emailSent = true;
    } catch (emailError) {
      console.error("E-Mail-Fehler:", emailError);
    }

    return NextResponse.json({
      success: true,
      id: inserted.id,
      created_at: inserted.created_at,
      email_sent: emailSent,
    });
  } catch (err) {
    console.error("API-Fehler:", err);
    return NextResponse.json(
      { error: "Interner Serverfehler." },
      { status: 500 }
    );
  }
}

// GET — Alle Einreichungen abrufen (Admin, via Service Role Key)
export async function GET(request: NextRequest) {
  try {
    // Einfache Auth-Prüfung über Header
    const authHeader = request.headers.get("authorization");
    const expectedKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!authHeader || !expectedKey || authHeader !== `Bearer ${expectedKey}`) {
      return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });
    }

    const serverClient = createServerClient();
    const { data, error } = await serverClient
      .from("submissions")
      .select("id, company_name, project_name, email, industry, page_count, completion_percentage, status, created_at, updated_at")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ submissions: data });
  } catch (err) {
    console.error("API-Fehler:", err);
    return NextResponse.json({ error: "Interner Serverfehler." }, { status: 500 });
  }
}
