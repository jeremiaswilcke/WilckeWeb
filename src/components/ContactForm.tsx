"use client";

import { useState } from "react";
import { useProject } from "@/lib/ProjectContext";
import { formatPrice } from "@/lib/pricing";
import FadeIn from "./FadeIn";
import { ArrowRightIcon } from "./Icons";

export default function ContactForm() {
  const { getSummaryText, getTotal, getMonthly } = useProject();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const summary = getSummaryText();
  const total = getTotal();
  const monthly = getMonthly();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Build mailto with project details
    const subject = encodeURIComponent(`Projektanfrage über WilckeWeb — ${formatPrice(total)}`);
    const body = encodeURIComponent(
      `Hallo,\n\nich interessiere mich für ein Website-Projekt.\n\n` +
      `--- Meine Angaben ---\n` +
      `Name: ${form.name}\n` +
      `E-Mail: ${form.email}\n` +
      (form.phone ? `Telefon: ${form.phone}\n` : "") +
      (form.message ? `\nNachricht:\n${form.message}\n` : "") +
      `\n--- Projektkonfiguration ---\n${summary}\n\n` +
      `---\nDiese Anfrage wurde über den WilckeWeb-Konfigurator erstellt.`
    );

    window.location.href = `mailto:kontakt@wilckeweb.de?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="kontakt" className="py-[140px] max-md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeIn>
          <div className="text-center max-w-[680px] mx-auto mb-16">
            <span className="inline-block text-xs font-bold tracking-[0.14em] uppercase text-coral mb-4">
              Projekt anfragen
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight">
              Ihre Website-Anfrage
            </h2>
            <p className="text-muted text-[1.05rem] leading-relaxed mt-4">
              Alle Details aus dem Konfigurator werden automatisch übernommen.
              Ergänzen Sie Ihre Kontaktdaten und schicken Sie die Anfrage ab — unverbindlich.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-[1fr_0.85fr] gap-10 items-start max-lg:grid-cols-1">
          {/* Form */}
          <FadeIn>
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <div>
                  <label className="block text-sm font-semibold mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ihr Name"
                    className="w-full px-4 py-3.5 rounded-2xl border border-line-strong bg-white text-text
                      focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">E-Mail *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="ihre@email.de"
                    className="w-full px-4 py-3.5 rounded-2xl border border-line-strong bg-white text-text
                      focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Telefon <span className="text-muted font-normal">(optional)</span></label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+43 ..."
                  className="w-full px-4 py-3.5 rounded-2xl border border-line-strong bg-white text-text
                    focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Nachricht <span className="text-muted font-normal">(optional)</span></label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Erzählen Sie kurz von Ihrem Projekt, falls Sie möchten ..."
                  className="w-full px-4 py-3.5 rounded-2xl border border-line-strong bg-white text-text resize-y
                    focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all duration-300"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 font-semibold text-[0.95rem] px-8 py-4 rounded-full
                  bg-teal text-white hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(86,160,168,0.3)]
                  transition-all duration-300 w-full sm:w-auto"
              >
                Projekt unverbindlich anfragen
                <ArrowRightIcon />
              </button>

              {submitted && (
                <p className="text-teal text-sm font-medium">
                  Ihr E-Mail-Programm sollte sich geöffnet haben. Falls nicht, schreiben Sie direkt an kontakt@wilckeweb.de.
                </p>
              )}
            </form>
          </FadeIn>

          {/* Project Summary */}
          <FadeIn delay={1}>
            <div className="lg:sticky lg:top-[100px]">
              <div className="rounded-3xl p-8 bg-gradient-to-br from-anthracite to-[#2a2a2a] text-white shadow-[0_24px_60px_rgba(63,63,63,0.1)]">
                <span className="inline-block text-xs font-bold tracking-[0.14em] uppercase text-coral/90 mb-3">
                  Ihre Projektkonfiguration
                </span>

                <div className="text-[clamp(1.8rem,3vw,2.4rem)] font-extrabold tracking-tight leading-none mb-1">
                  {formatPrice(total)}
                  <span className="text-[0.6em] font-semibold opacity-70 ml-1">EUR</span>
                </div>
                <div className="text-[0.82rem] text-white/50 mb-5">
                  Geschätzter Richtpreis (netto)
                </div>

                {monthly > 0 && (
                  <div className="bg-white/8 rounded-xl p-3.5 mb-5">
                    <div className="text-[0.78rem] text-white/50">Monatlich</div>
                    <div className="text-lg font-bold">{formatPrice(monthly)} / Monat</div>
                  </div>
                )}

                {/* Summary as readable text */}
                <div className="border-t border-white/10 pt-4">
                  <pre className="text-[0.82rem] text-white/60 leading-relaxed whitespace-pre-wrap font-sans">
                    {summary}
                  </pre>
                </div>

                <div className="text-[0.75rem] text-white/35 leading-relaxed mt-4 pt-3 border-t border-white/8">
                  Diese Zusammenfassung wird automatisch in Ihre Anfrage übernommen.
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
