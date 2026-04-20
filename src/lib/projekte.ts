import { getSupabaseAdmin } from "./supabase";

export type ProjektStatus =
  | "anfrage"
  | "planung"
  | "design"
  | "inhalte"
  | "launch"
  | "abgeschlossen";

export interface ProjektRow {
  id: string;
  token: string;
  kunde_name: string;
  kunde_email: string;
  kunde_telefon: string | null;
  nachricht: string | null;
  konfiguration: string | null;
  preis: string | null;
  monatlich: string | null;
  status: ProjektStatus;
  status_notiz: string | null;
  fortschritt: number;
  meilensteine: unknown;
  created_at: string;
  updated_at: string;
}

const DEFAULT_FORTSCHRITT: Record<ProjektStatus, number> = {
  anfrage: 10,
  planung: 30,
  design: 55,
  inhalte: 80,
  launch: 95,
  abgeschlossen: 100,
};

export function defaultFortschritt(status: ProjektStatus): number {
  return DEFAULT_FORTSCHRITT[status];
}

export function generateToken(): string {
  const chars = "abcdefghijkmnpqrstuvwxyz23456789";
  let token = "";
  for (let i = 0; i < 12; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}

export interface CreateProjektInput {
  kunde_name: string;
  kunde_email: string;
  kunde_telefon?: string;
  nachricht?: string;
  konfiguration?: string;
  preis?: string;
  monatlich?: string;
}

export async function createProjekt(
  input: CreateProjektInput
): Promise<{ token: string; id: string } | { error: string }> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const token = generateToken();
    const { data, error } = await getSupabaseAdmin()
      .from("projekte")
      .insert({
        token,
        kunde_name: input.kunde_name,
        kunde_email: input.kunde_email,
        kunde_telefon: input.kunde_telefon || null,
        nachricht: input.nachricht || null,
        konfiguration: input.konfiguration || null,
        preis: input.preis || null,
        monatlich: input.monatlich || null,
      })
      .select("id, token")
      .single();

    if (!error && data) return { id: data.id, token: data.token };
    if (error?.code !== "23505") {
      return { error: error?.message || "Unbekannter Fehler beim Anlegen." };
    }
  }
  return { error: "Konnte nach 5 Versuchen keinen freien Token erzeugen." };
}

export async function findProjektByToken(
  token: string
): Promise<ProjektRow | null> {
  const { data, error } = await getSupabaseAdmin()
    .from("projekte")
    .select("*")
    .eq("token", token)
    .maybeSingle();
  if (error || !data) return null;
  return data as ProjektRow;
}
