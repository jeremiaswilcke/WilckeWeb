-- ============================================================
-- WilckeWeb — Supabase Datenbankschema
-- Ausführen in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Tabelle für Inhaltsformular-Einreichungen
CREATE TABLE IF NOT EXISTS submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL DEFAULT '',
  project_name TEXT DEFAULT '',
  email TEXT DEFAULT '',
  industry TEXT DEFAULT '',
  page_count INTEGER DEFAULT 0,
  completion_percentage INTEGER DEFAULT 0,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'completed', 'archived')),
  form_data JSONB NOT NULL,
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index für häufige Abfragen
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions (status);
CREATE INDEX IF NOT EXISTS idx_submissions_created ON submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_company ON submissions (company_name);

-- Automatische Aktualisierung von updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER submissions_updated_at
  BEFORE UPDATE ON submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Row Level Security aktivieren
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Jeder kann einfügen (für das öffentliche Formular)
CREATE POLICY "Öffentliches Einfügen"
  ON submissions FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Nur authentifizierte Nutzer (Admin) können lesen
CREATE POLICY "Admin kann alles lesen"
  ON submissions FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Nur authentifizierte Nutzer können aktualisieren
CREATE POLICY "Admin kann aktualisieren"
  ON submissions FOR UPDATE
  TO authenticated
  USING (true);

-- ============================================================
-- Optional: View für Übersicht
-- ============================================================
CREATE OR REPLACE VIEW submissions_overview AS
SELECT
  id,
  company_name,
  project_name,
  email,
  industry,
  page_count,
  completion_percentage,
  status,
  created_at,
  updated_at,
  form_data->'summary'->>'completion_percentage' AS json_completion,
  jsonb_array_length(COALESCE(form_data->'pages', '[]'::jsonb)) AS json_page_count,
  form_data->'summary'->'missing_texts' AS missing_texts,
  form_data->'summary'->'assets_needed' AS assets_needed
FROM submissions
ORDER BY created_at DESC;
