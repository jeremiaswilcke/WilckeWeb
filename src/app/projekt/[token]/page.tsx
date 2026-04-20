"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
// FloatingActions is already in the layout

const STEPS = [
  {
    key: "anfrage",
    label: "Anfrage eingegangen",
    icon: "📩",
    description: "Wir haben Ihre Anfrage erhalten und prüfen die Details.",
  },
  {
    key: "planung",
    label: "Planung & Konzept",
    icon: "📋",
    description: "Struktur, Inhalte und technische Grundlage werden geplant.",
  },
  {
    key: "design",
    label: "Design & Aufbau",
    icon: "🎨",
    description: "Ihre Website wird gestaltet und entwickelt.",
  },
  {
    key: "inhalte",
    label: "Inhalte & Feinschliff",
    icon: "✍️",
    description: "Texte, Bilder und letzte Anpassungen werden eingebaut.",
  },
  {
    key: "launch",
    label: "Launch & Übergabe",
    icon: "🚀",
    description: "Ihre Website geht live — inklusive Einweisung.",
  },
];

interface ProjectData {
  kunde: string;
  status: string;
  statusNotiz: string;
  fortschritt: number;
  preis: string;
  monatlich: string;
  konfiguration: string;
  erstellt: string;
}

export default function ProjektPage() {
  const { token } = useParams<{ token: string }>();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [msgForm, setMsgForm] = useState({ name: "", message: "" });
  const [msgSent, setMsgSent] = useState(false);
  const [msgSending, setMsgSending] = useState(false);

  useEffect(() => {
    fetch(`/api/projects/${token}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setProject)
      .catch(() => setError("Projekt nicht gefunden."))
      .finally(() => setLoading(false));
  }, [token]);

  const currentIndex = project
    ? STEPS.findIndex((s) => s.key === project.status)
    : -1;
  const isComplete = project?.status === "abgeschlossen";

  async function handleMessage(e: React.FormEvent) {
    e.preventDefault();
    setMsgSending(true);
    try {
      const res = await fetch(`/api/projects/${token}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msgForm),
      });
      if (res.ok) {
        setMsgSent(true);
        setMsgForm({ name: "", message: "" });
      }
    } finally {
      setMsgSending(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="w-8 h-8 border-3 border-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Projekt nicht gefunden</h1>
          <p className="text-muted">
            Bitte prüfen Sie den Link aus Ihrer Bestätigungsmail.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="bg-surface border-b border-line py-5 px-6">
        <div className="max-w-[900px] mx-auto flex items-center justify-between">
          <a href="/" className="text-lg font-bold tracking-tight text-anthracite">
            WilckeWeb
          </a>
          <span className="text-xs font-semibold tracking-[0.1em] uppercase text-teal">
            Projektportal
          </span>
        </div>
      </header>

      <main className="max-w-[900px] mx-auto px-6 py-12">
        {/* Welcome */}
        <div className="mb-12">
          <span className="inline-block text-xs font-bold tracking-[0.14em] uppercase text-coral mb-3">
            Ihr Projekt
          </span>
          <h1 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold tracking-tight leading-tight">
            Hallo {project.kunde}!
          </h1>
          <p className="text-muted text-[1.05rem] mt-2">
            Hier sehen Sie den aktuellen Stand Ihres Website-Projekts.
          </p>
        </div>

        {/* Status Timeline */}
        <div className="bg-surface rounded-3xl p-8 max-md:p-5 shadow-[0_2px_20px_rgba(0,0,0,0.04)] mb-8">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-sm font-bold tracking-[0.1em] uppercase text-muted">
              Fortschritt
            </h2>
            <span className="text-3xl max-md:text-2xl font-bold text-coral tabular-nums">
              {project.fortschritt}%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-line overflow-hidden mb-8">
            <div
              className="h-full bg-coral rounded-full transition-all duration-700"
              style={{ width: `${Math.max(0, Math.min(100, project.fortschritt))}%` }}
            />
          </div>

          <div className="space-y-0">
            {STEPS.map((step, i) => {
              const isDone = i < currentIndex || isComplete;
              const isCurrent = i === currentIndex && !isComplete;
              const isPending = i > currentIndex && !isComplete;

              return (
                <div key={step.key} className="flex gap-5 max-md:gap-4">
                  {/* Timeline line + dot */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 max-md:w-8 max-md:h-8 rounded-full flex items-center justify-center text-lg max-md:text-base shrink-0 transition-all duration-500
                        ${isDone ? "bg-teal text-white" : ""}
                        ${isCurrent ? "bg-coral text-white ring-4 ring-coral/20 scale-110" : ""}
                        ${isPending ? "bg-line text-muted" : ""}
                      `}
                    >
                      {isDone ? (
                        <svg className="w-5 h-5 max-md:w-4 max-md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-sm max-md:text-xs font-bold">{i + 1}</span>
                      )}
                    </div>
                    {i < STEPS.length - 1 && (
                      <div
                        className={`w-0.5 h-16 max-md:h-12 transition-colors duration-500
                          ${isDone ? "bg-teal" : "bg-line"}
                        `}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`pt-1.5 pb-8 max-md:pb-5 ${isPending ? "opacity-40" : ""}`}>
                    <h3
                      className={`font-semibold text-[1.05rem] max-md:text-[0.95rem] leading-tight
                        ${isCurrent ? "text-coral" : isDone ? "text-text" : "text-muted"}
                      `}
                    >
                      {step.label}
                      {isCurrent && (
                        <span className="ml-2 inline-flex items-center gap-1 text-xs font-bold text-coral bg-coral/10 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 bg-coral rounded-full animate-pulse" />
                          Aktuell
                        </span>
                      )}
                    </h3>
                    <p className="text-muted text-sm mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {isComplete && (
            <div className="mt-4 bg-teal/10 text-teal rounded-2xl p-5 text-center">
              <p className="font-semibold text-lg">Ihr Projekt ist abgeschlossen!</p>
              <p className="text-sm mt-1 opacity-80">
                Vielen Dank für Ihr Vertrauen.
              </p>
            </div>
          )}
        </div>

        {/* Status Note from Admin */}
        {project.statusNotiz && (
          <div className="bg-surface rounded-3xl p-8 max-md:p-5 shadow-[0_2px_20px_rgba(0,0,0,0.04)] mb-8">
            <h2 className="text-sm font-bold tracking-[0.1em] uppercase text-muted mb-3">
              Nachricht von WilckeWeb
            </h2>
            <p className="text-text leading-relaxed whitespace-pre-wrap">
              {project.statusNotiz}
            </p>
          </div>
        )}

        {/* Project Details */}
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 mb-8">
          {project.preis && (
            <div className="bg-surface rounded-2xl p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold tracking-[0.1em] uppercase text-muted mb-1">
                Richtpreis
              </div>
              <div className="text-xl font-bold text-text">{project.preis}</div>
            </div>
          )}
          {project.monatlich && (
            <div className="bg-surface rounded-2xl p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-bold tracking-[0.1em] uppercase text-muted mb-1">
                Monatliche Betreuung
              </div>
              <div className="text-xl font-bold text-text">
                {project.monatlich}
              </div>
            </div>
          )}
        </div>

        {project.konfiguration && (
          <details className="bg-surface rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] mb-8 group">
            <summary className="p-6 cursor-pointer text-sm font-bold tracking-[0.1em] uppercase text-muted select-none">
              Ihre Konfiguration anzeigen
            </summary>
            <div className="px-6 pb-6">
              <pre className="text-sm text-text-soft leading-relaxed whitespace-pre-wrap font-sans">
                {project.konfiguration}
              </pre>
            </div>
          </details>
        )}

        {/* Feedback Form */}
        <div className="bg-surface rounded-3xl p-8 max-md:p-5 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
          <h2 className="text-sm font-bold tracking-[0.1em] uppercase text-muted mb-5">
            Rückfrage stellen
          </h2>

          {msgSent ? (
            <div className="text-teal font-medium py-4">
              Ihre Nachricht wurde gesendet! Wir melden uns in Kürze.
            </div>
          ) : (
            <form onSubmit={handleMessage} className="grid gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Ihr Name</label>
                <input
                  type="text"
                  value={msgForm.name}
                  onChange={(e) =>
                    setMsgForm({ ...msgForm, name: e.target.value })
                  }
                  placeholder="Name (optional)"
                  className="w-full px-4 py-3 rounded-2xl border border-line-strong bg-white text-text
                    focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Nachricht *
                </label>
                <textarea
                  required
                  rows={4}
                  value={msgForm.message}
                  onChange={(e) =>
                    setMsgForm({ ...msgForm, message: e.target.value })
                  }
                  placeholder="Ihre Frage oder Anmerkung ..."
                  className="w-full px-4 py-3 rounded-2xl border border-line-strong bg-white text-text resize-y
                    focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all duration-300"
                />
              </div>
              <button
                type="submit"
                disabled={msgSending}
                className="inline-flex items-center justify-center gap-2 font-semibold text-[0.95rem] px-8 py-3.5 rounded-full
                  bg-anthracite text-white hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(63,63,63,0.2)]
                  transition-all duration-300 w-full sm:w-auto disabled:opacity-50"
              >
                {msgSending ? "Wird gesendet ..." : "Nachricht senden"}
              </button>
            </form>
          )}
        </div>
      </main>

    </div>
  );
}
