"use client";

import { useState, useMemo } from "react";
import { useContentForm } from "../ContentFormContext";
import { exportToJSON, downloadJSON, copyToClipboard, calculateCompletion } from "@/lib/content-form-export";
import { generatePrompt } from "@/lib/prompt-generator";
import { SECTION_TYPE_LABELS, CONTENT_STATUS_LABELS } from "@/lib/content-form-types";

type ViewMode = "summary" | "json" | "prompt";
type SubmitStatus = "idle" | "submitting" | "success" | "error";

export default function ReviewStep() {
  const { data, resetForm } = useContentForm();
  const [viewMode, setViewMode] = useState<ViewMode>("summary");
  const [copied, setCopied] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const exportData = useMemo(() => exportToJSON(data), [data]);
  const prompt = useMemo(() => generatePrompt(exportData), [exportData]);
  const completion = calculateCompletion(data);

  async function handleCopy(text: string) {
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleSubmit() {
    if (submitStatus === "submitting") return;

    // Validierung
    if (!data.project.companyName && !data.project.projectName) {
      setSubmitStatus("error");
      setSubmitMessage("Bitte geben Sie mindestens einen Firmen- oder Projektnamen an.");
      return;
    }

    setSubmitStatus("submitting");
    setSubmitMessage("");

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exportData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Fehler beim Absenden.");
      }

      setSubmitStatus("success");
      setSubmittedId(result.id);
      setSubmitMessage(
        result.email_sent
          ? "Erfolgreich gespeichert und per E-Mail versendet!"
          : "Erfolgreich gespeichert! (E-Mail-Versand steht noch aus)"
      );
    } catch (err) {
      setSubmitStatus("error");
      setSubmitMessage(
        err instanceof Error ? err.message : "Ein unbekannter Fehler ist aufgetreten."
      );
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-anthracite)] mb-2">
          Übersicht & Export
        </h2>
        <p className="text-[var(--color-muted)]">
          Prüfen Sie Ihre Eingaben, sehen Sie was noch fehlt und exportieren Sie die Daten.
        </p>
      </div>

      {/* Completion bar */}
      <div className="p-5 bg-white rounded-xl border border-[var(--color-line)]">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-[var(--color-anthracite)]">Vollständigkeit</span>
          <span className={`text-2xl font-bold ${
            completion >= 80 ? "text-green-600" : completion >= 50 ? "text-amber-600" : "text-red-500"
          }`}>
            {completion}%
          </span>
        </div>
        <div className="h-3 bg-[var(--color-bg)] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              completion >= 80 ? "bg-green-500" : completion >= 50 ? "bg-amber-500" : "bg-red-400"
            }`}
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>

      {/* Missing items */}
      {(exportData.summary.missing_texts.length > 0 ||
        exportData.summary.missing_images.length > 0 ||
        exportData.summary.assets_needed.length > 0) && (
        <div className="p-5 bg-amber-50 rounded-xl border border-amber-200 space-y-4">
          <h3 className="font-semibold text-amber-800 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            Was noch fehlt
          </h3>

          {exportData.summary.missing_texts.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-amber-700 mb-1">Fehlende Texte:</h4>
              <ul className="text-sm text-amber-800 space-y-1">
                {exportData.summary.missing_texts.map((mt, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    {mt.page} — {mt.section}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {exportData.summary.missing_images.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-amber-700 mb-1">Fehlende Bilder:</h4>
              <ul className="text-sm text-amber-800 space-y-1">
                {exportData.summary.missing_images.map((mi, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    {mi.page} — {mi.section}: {mi.description}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {exportData.summary.assets_needed.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-amber-700 mb-1">Nachzuliefernde Assets:</h4>
              <ul className="text-sm text-amber-800 space-y-1">
                {exportData.summary.assets_needed.map((a, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* View toggle */}
      <div className="flex gap-1 bg-[var(--color-bg)] p-1 rounded-xl">
        {([
          ["summary", "Zusammenfassung"],
          ["json", "JSON-Daten"],
          ["prompt", "Website-Prompt"],
        ] as [ViewMode, string][]).map(([mode, label]) => (
          <button
            key={mode}
            type="button"
            onClick={() => setViewMode(mode)}
            className={`
              flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition cursor-pointer
              ${viewMode === mode
                ? "bg-white text-[var(--color-anthracite)] shadow-sm"
                : "text-[var(--color-muted)] hover:text-[var(--color-anthracite)]"
              }
            `}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content area */}
      {viewMode === "summary" && (
        <div className="space-y-6">
          {/* Project summary */}
          <div className="p-5 bg-white rounded-xl border border-[var(--color-line)] space-y-3">
            <h3 className="font-semibold text-[var(--color-anthracite)]">Projektübersicht</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
              {data.project.companyName && (
                <div><span className="text-[var(--color-muted)]">Firma:</span> <span className="font-medium">{data.project.companyName}</span></div>
              )}
              {data.project.industry && (
                <div><span className="text-[var(--color-muted)]">Branche:</span> <span className="font-medium">{data.project.industry}</span></div>
              )}
              {data.project.websiteGoal && (
                <div><span className="text-[var(--color-muted)]">Ziel:</span> <span className="font-medium">{data.project.websiteGoal}</span></div>
              )}
              {data.project.mainCallToAction && (
                <div><span className="text-[var(--color-muted)]">CTA:</span> <span className="font-medium">{data.project.mainCallToAction}</span></div>
              )}
            </div>
            {data.project.tonality.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {data.project.tonality.map((t) => (
                  <span key={t} className="px-2 py-0.5 bg-[var(--color-teal-light)] text-[var(--color-teal-dark)] text-xs rounded-full font-medium">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Pages summary */}
          <div className="p-5 bg-white rounded-xl border border-[var(--color-line)] space-y-3">
            <h3 className="font-semibold text-[var(--color-anthracite)]">
              Seiten ({data.pages.length})
            </h3>
            {data.pages.length === 0 ? (
              <p className="text-sm text-[var(--color-muted)]">Keine Seiten angelegt.</p>
            ) : (
              <div className="space-y-3">
                {data.pages.map((page) => {
                  const hasContent = page.sections.some(
                    (s) => s.contentText.trim() || s.bulletPoints.some((b) => b.trim())
                  );
                  return (
                    <div key={page.id} className="p-3 bg-[var(--color-bg-soft)] rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm text-[var(--color-anthracite)]">
                          {page.title}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          page.sections.length === 0 ? "bg-red-100 text-red-600" :
                          hasContent ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                        }`}>
                          {page.sections.length === 0 ? "leer" : hasContent ? "Inhalte vorhanden" : "Sektionen ohne Text"}
                        </span>
                      </div>
                      {page.sections.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {page.sections.map((s) => (
                            <span
                              key={s.id}
                              className={`text-xs px-2 py-0.5 rounded font-medium ${
                                s.contentStatus === "final" ? "bg-green-50 text-green-700" :
                                s.contentStatus === "draft" ? "bg-amber-50 text-amber-700" :
                                "bg-red-50 text-red-600"
                              }`}
                            >
                              {s.customTitle || SECTION_TYPE_LABELS[s.type]}
                              {" · "}
                              {CONTENT_STATUS_LABELS[s.contentStatus]}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Extras summary */}
          <div className="p-5 bg-white rounded-xl border border-[var(--color-line)] space-y-3">
            <h3 className="font-semibold text-[var(--color-anthracite)]">Zusatzinfos</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              {data.extras.contact.email && (
                <div>
                  <span className="text-[var(--color-muted)] text-xs block">E-Mail</span>
                  <span className="font-medium">{data.extras.contact.email}</span>
                </div>
              )}
              {data.extras.contact.phone && (
                <div>
                  <span className="text-[var(--color-muted)] text-xs block">Telefon</span>
                  <span className="font-medium">{data.extras.contact.phone}</span>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {data.extras.features.newsletter && <span className="text-xs px-2 py-1 bg-[var(--color-teal-light)] text-[var(--color-teal-dark)] rounded-full font-medium">Newsletter</span>}
              {data.extras.features.shop && <span className="text-xs px-2 py-1 bg-[var(--color-teal-light)] text-[var(--color-teal-dark)] rounded-full font-medium">Shop</span>}
              {data.extras.features.booking && <span className="text-xs px-2 py-1 bg-[var(--color-teal-light)] text-[var(--color-teal-dark)] rounded-full font-medium">Terminbuchung</span>}
              {data.extras.features.blog && <span className="text-xs px-2 py-1 bg-[var(--color-teal-light)] text-[var(--color-teal-dark)] rounded-full font-medium">Blog</span>}
              {data.extras.features.multilingual && <span className="text-xs px-2 py-1 bg-[var(--color-teal-light)] text-[var(--color-teal-dark)] rounded-full font-medium">Mehrsprachig</span>}
            </div>
          </div>
        </div>
      )}

      {viewMode === "json" && (
        <div className="relative">
          <pre className="p-5 bg-[var(--color-anthracite)] text-green-300 rounded-xl overflow-auto max-h-[600px] text-xs leading-relaxed font-mono">
            {JSON.stringify(exportData, null, 2)}
          </pre>
          <button
            type="button"
            onClick={() => handleCopy(JSON.stringify(exportData, null, 2))}
            className="absolute top-3 right-3 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg font-medium transition cursor-pointer"
          >
            {copied ? "Kopiert!" : "Kopieren"}
          </button>
        </div>
      )}

      {viewMode === "prompt" && (
        <div className="relative">
          <pre className="p-5 bg-[var(--color-anthracite)] text-gray-200 rounded-xl overflow-auto max-h-[600px] text-xs leading-relaxed font-mono whitespace-pre-wrap">
            {prompt}
          </pre>
          <button
            type="button"
            onClick={() => handleCopy(prompt)}
            className="absolute top-3 right-3 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg font-medium transition cursor-pointer"
          >
            {copied ? "Kopiert!" : "Kopieren"}
          </button>
        </div>
      )}

      {/* Submit to DB + Email */}
      <div className="p-5 bg-white rounded-xl border-2 border-[var(--color-teal)] space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[var(--color-teal-light)] flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-[var(--color-teal)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[var(--color-anthracite)]">
              Inhalte absenden
            </h3>
            <p className="text-sm text-[var(--color-muted)] mt-1">
              Ihre Eingaben werden gespeichert und per E-Mail an WilckeWeb gesendet. Sie können das Formular auch danach noch weiter bearbeiten und erneut absenden.
            </p>
          </div>
        </div>

        {submitStatus === "success" && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center gap-2 text-green-700 font-medium text-sm">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {submitMessage}
            </div>
            {submittedId && (
              <p className="text-xs text-green-600 mt-1">
                Referenz-ID: {submittedId}
              </p>
            )}
          </div>
        )}

        {submitStatus === "error" && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-sm text-red-700 font-medium">{submitMessage}</p>
          </div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitStatus === "submitting"}
          className={`
            w-full py-3.5 rounded-xl font-semibold text-white text-base transition flex items-center justify-center gap-2 cursor-pointer
            ${submitStatus === "submitting"
              ? "bg-[var(--color-teal)]/60 cursor-wait"
              : submitStatus === "success"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-[var(--color-coral)] hover:bg-[var(--color-coral-dark)] shadow-lg shadow-[var(--color-coral)]/20"
            }
          `}
        >
          {submitStatus === "submitting" ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Wird gesendet …
            </>
          ) : submitStatus === "success" ? (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              </svg>
              Erneut absenden
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Jetzt absenden
            </>
          )}
        </button>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => downloadJSON(exportData)}
          className="px-6 py-3 bg-[var(--color-teal)] text-white font-medium rounded-xl hover:bg-[var(--color-teal-dark)] transition cursor-pointer flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          JSON herunterladen
        </button>

        <button
          type="button"
          onClick={() => handleCopy(prompt)}
          className="px-6 py-3 bg-[var(--color-anthracite)] text-white font-medium rounded-xl hover:bg-[var(--color-anthracite-light)] transition cursor-pointer flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {copied ? "Prompt kopiert!" : "Prompt kopieren"}
        </button>

        <div className="ml-auto">
          {confirmReset ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-red-600 font-medium">Alle Eingaben löschen?</span>
              <button
                type="button"
                onClick={() => { resetForm(); setConfirmReset(false); }}
                className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition cursor-pointer"
              >
                Ja, alles löschen
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="px-4 py-2 bg-[var(--color-bg)] text-[var(--color-muted)] text-sm rounded-lg hover:bg-[var(--color-line)] transition cursor-pointer"
              >
                Abbrechen
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="px-4 py-2 text-sm text-[var(--color-muted)] hover:text-red-500 transition cursor-pointer"
            >
              Formular zurücksetzen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
