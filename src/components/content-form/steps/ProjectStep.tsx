"use client";

import { useContentForm } from "../ContentFormContext";
import {
  TONALITY_OPTIONS,
  IMPRESSION_OPTIONS,
  WEBSITE_GOAL_OPTIONS,
  INDUSTRY_OPTIONS,
} from "@/lib/content-form-types";

function ChipSelect({
  options,
  selected,
  onChange,
}: {
  options: readonly string[];
  selected: string[];
  onChange: (val: string[]) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isSelected = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() =>
              onChange(
                isSelected
                  ? selected.filter((s) => s !== opt)
                  : [...selected, opt]
              )
            }
            className={`
              px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150 cursor-pointer
              ${isSelected
                ? "bg-[var(--color-teal)] text-white shadow-sm"
                : "bg-[var(--color-bg)] text-[var(--color-muted)] hover:bg-[var(--color-teal-light)] hover:text-[var(--color-teal-dark)]"
              }
            `}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export default function ProjectStep() {
  const { data, updateProject } = useContentForm();
  const p = data.project;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-anthracite)] mb-2">
          Ihr Projekt
        </h2>
        <p className="text-[var(--color-muted)]">
          Erzählen Sie uns von Ihrem Unternehmen und was Sie mit Ihrer Website erreichen möchten.
        </p>
      </div>

      {/* Firmenname & Projektname */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[var(--color-anthracite)] mb-1.5">
            Firmenname *
          </label>
          <input
            type="text"
            value={p.companyName}
            onChange={(e) => updateProject({ companyName: e.target.value })}
            placeholder="z. B. Müller Schreinerei"
            className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line-strong)] bg-white text-[var(--color-text)] placeholder:text-[var(--color-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)] transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-anthracite)] mb-1.5">
            Projektname
            <span className="font-normal text-[var(--color-muted)] ml-1">(optional)</span>
          </label>
          <input
            type="text"
            value={p.projectName}
            onChange={(e) => updateProject({ projectName: e.target.value })}
            placeholder="z. B. Website Relaunch 2026"
            className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line-strong)] bg-white text-[var(--color-text)] placeholder:text-[var(--color-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)] transition"
          />
        </div>
      </div>

      {/* Branche */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-anthracite)] mb-1.5">
          Branche
        </label>
        <select
          value={p.industry}
          onChange={(e) => updateProject({ industry: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line-strong)] bg-white text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)] transition"
        >
          <option value="">Bitte wählen …</option>
          {INDUSTRY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Angebot */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-anthracite)] mb-1.5">
          Was bieten Sie an?
        </label>
        <p className="text-xs text-[var(--color-muted)] mb-2">
          Beschreiben Sie kurz Ihre Produkte oder Dienstleistungen.
        </p>
        <textarea
          value={p.offering}
          onChange={(e) => updateProject({ offering: e.target.value })}
          placeholder="z. B. Maßgefertigte Holzmöbel, Küchenplanung und Innenausbau für Privat- und Gewerbekunden …"
          rows={3}
          className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line-strong)] bg-white text-[var(--color-text)] placeholder:text-[var(--color-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)] transition resize-y"
        />
      </div>

      {/* Zielgruppe */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-anthracite)] mb-1.5">
          Zielgruppe
        </label>
        <p className="text-xs text-[var(--color-muted)] mb-2">
          Wen möchten Sie mit der Website erreichen?
        </p>
        <textarea
          value={p.targetAudience}
          onChange={(e) => updateProject({ targetAudience: e.target.value })}
          placeholder="z. B. Privatkunden zwischen 30 und 55, die Wert auf individuelle Qualitätsarbeit legen …"
          rows={2}
          className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line-strong)] bg-white text-[var(--color-text)] placeholder:text-[var(--color-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)] transition resize-y"
        />
      </div>

      {/* Hauptziel */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-anthracite)] mb-1.5">
          Hauptziel der Website
        </label>
        <div className="flex flex-wrap gap-2">
          {WEBSITE_GOAL_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => updateProject({ websiteGoal: opt })}
              className={`
                px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150 cursor-pointer
                ${p.websiteGoal === opt
                  ? "bg-[var(--color-teal)] text-white shadow-sm"
                  : "bg-[var(--color-bg)] text-[var(--color-muted)] hover:bg-[var(--color-teal-light)] hover:text-[var(--color-teal-dark)]"
                }
              `}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Gewünschte Wirkung */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-anthracite)] mb-1.5">
          Gewünschte Wirkung
        </label>
        <p className="text-xs text-[var(--color-muted)] mb-2">
          Was sollen Besucher beim Ansehen Ihrer Website empfinden? Wählen Sie beliebig viele.
        </p>
        <ChipSelect
          options={IMPRESSION_OPTIONS}
          selected={p.desiredImpression}
          onChange={(val) => updateProject({ desiredImpression: val })}
        />
      </div>

      {/* Tonalität */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-anthracite)] mb-1.5">
          Tonalität & Stil
        </label>
        <p className="text-xs text-[var(--color-muted)] mb-2">
          Wie soll Ihre Website wirken? Wählen Sie die passenden Begriffe.
        </p>
        <ChipSelect
          options={TONALITY_OPTIONS}
          selected={p.tonality}
          onChange={(val) => updateProject({ tonality: val })}
        />
      </div>

      {/* USPs */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-anthracite)] mb-1.5">
          Alleinstellungsmerkmale
        </label>
        <p className="text-xs text-[var(--color-muted)] mb-2">
          Was macht Sie besonders? Was unterscheidet Sie von der Konkurrenz?
        </p>
        <textarea
          value={p.uniqueSellingPoints}
          onChange={(e) => updateProject({ uniqueSellingPoints: e.target.value })}
          placeholder="z. B. 30 Jahre Erfahrung, ausschließlich heimische Hölzer, persönliche Beratung vor Ort …"
          rows={3}
          className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line-strong)] bg-white text-[var(--color-text)] placeholder:text-[var(--color-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)] transition resize-y"
        />
      </div>

      {/* CTA */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-anthracite)] mb-1.5">
          Gewünschter Call-to-Action
        </label>
        <p className="text-xs text-[var(--color-muted)] mb-2">
          Was sollen Besucher als Nächstes tun?
        </p>
        <input
          type="text"
          value={p.mainCallToAction}
          onChange={(e) => updateProject({ mainCallToAction: e.target.value })}
          placeholder="z. B. Jetzt Beratungstermin vereinbaren"
          className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-line-strong)] bg-white text-[var(--color-text)] placeholder:text-[var(--color-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)] transition"
        />
      </div>
    </div>
  );
}
