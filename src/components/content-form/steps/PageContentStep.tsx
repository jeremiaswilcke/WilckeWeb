"use client";

import { useState } from "react";
import { useContentForm } from "../ContentFormContext";
import type { SectionType, SectionDefinition } from "@/lib/content-form-types";
import {
  SECTION_TYPE_LABELS,
  CONTENT_STATUS_LABELS,
  IMAGE_POSITION_LABELS,
  IMAGE_TYPE_LABELS,
} from "@/lib/content-form-types";
import { createDefaultSection, SUGGESTED_SECTIONS } from "@/lib/content-form-defaults";

function SectionEditor({
  pageId,
  section,
  index,
  total,
}: {
  pageId: string;
  section: SectionDefinition;
  index: number;
  total: number;
}) {
  const { updateSection, removeSection, moveSection } = useContentForm();
  const [expanded, setExpanded] = useState(true);
  const [showMedia, setShowMedia] = useState(section.image.required);

  const update = (updates: Partial<SectionDefinition>) =>
    updateSection(pageId, section.id, updates);

  const statusColor = {
    final: "bg-green-100 text-green-700",
    draft: "bg-amber-100 text-amber-700",
    missing: "bg-red-100 text-red-700",
  }[section.contentStatus];

  return (
    <div className="border border-[var(--color-line)] rounded-xl bg-white overflow-hidden">
      {/* Section header */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[var(--color-bg-soft)] transition"
        onClick={() => setExpanded(!expanded)}
      >
        <svg
          className={`w-4 h-4 text-[var(--color-muted)] transition-transform ${expanded ? "rotate-90" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-xs font-bold text-[var(--color-muted)] w-5">{index + 1}</span>
        <span className="font-medium text-sm text-[var(--color-anthracite)] flex-1">
          {section.customTitle || SECTION_TYPE_LABELS[section.type]}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor}`}>
          {CONTENT_STATUS_LABELS[section.contentStatus]}
        </span>
        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            type="button" onClick={() => moveSection(pageId, section.id, "up")}
            disabled={index === 0}
            className="p-1 rounded hover:bg-[var(--color-bg)] disabled:opacity-20 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 text-[var(--color-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            type="button" onClick={() => moveSection(pageId, section.id, "down")}
            disabled={index === total - 1}
            className="p-1 rounded hover:bg-[var(--color-bg)] disabled:opacity-20 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 text-[var(--color-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button
            type="button" onClick={() => removeSection(pageId, section.id)}
            className="p-1 rounded hover:bg-[var(--color-coral-light)] text-[var(--color-muted)] hover:text-[var(--color-coral)] cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-[var(--color-line)]">
          {/* Type + Custom title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div>
              <label className="block text-xs font-medium text-[var(--color-anthracite)] mb-1">
                Sektionstyp
              </label>
              <select
                value={section.type}
                onChange={(e) => update({ type: e.target.value as SectionType })}
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-line-strong)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)]"
              >
                {Object.entries(SECTION_TYPE_LABELS).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--color-anthracite)] mb-1">
                Eigener Titel
                <span className="font-normal text-[var(--color-muted)] ml-1">(optional)</span>
              </label>
              <input
                type="text"
                value={section.customTitle}
                onChange={(e) => update({ customTitle: e.target.value })}
                placeholder="z. B. Unsere Werte"
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-line-strong)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)]"
              />
            </div>
          </div>

          {/* Content mode toggle */}
          <div>
            <div className="flex items-center gap-4 mb-2">
              <label className="block text-xs font-medium text-[var(--color-anthracite)]">
                Inhalt
              </label>
              <label className="flex items-center gap-1.5 text-xs text-[var(--color-muted)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={section.useBullets}
                  onChange={(e) => update({ useBullets: e.target.checked })}
                  className="rounded accent-[var(--color-teal)]"
                />
                Stichpunkte statt Fließtext
              </label>
            </div>

            {section.useBullets ? (
              <div className="space-y-2">
                {section.bulletPoints.map((point, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-[var(--color-muted)] text-sm mt-2">•</span>
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => {
                        const bp = [...section.bulletPoints];
                        bp[i] = e.target.value;
                        update({ bulletPoints: bp });
                      }}
                      placeholder="Stichpunkt eingeben …"
                      className="flex-1 px-3 py-2 rounded-lg border border-[var(--color-line-strong)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const bp = section.bulletPoints.filter((_, idx) => idx !== i);
                        update({ bulletPoints: bp });
                      }}
                      className="p-1.5 rounded hover:bg-[var(--color-coral-light)] text-[var(--color-muted)] hover:text-[var(--color-coral)] cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => update({ bulletPoints: [...section.bulletPoints, ""] })}
                  className="text-xs text-[var(--color-teal)] font-medium hover:text-[var(--color-teal-dark)] cursor-pointer"
                >
                  + Stichpunkt hinzufügen
                </button>
              </div>
            ) : (
              <textarea
                value={section.contentText}
                onChange={(e) => update({ contentText: e.target.value })}
                placeholder="Schreiben Sie hier den Inhalt für diese Sektion oder geben Sie Stichworte ein, die als Grundlage dienen …"
                rows={4}
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-line-strong)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)] resize-y"
              />
            )}
          </div>

          {/* Content status */}
          <div>
            <label className="block text-xs font-medium text-[var(--color-anthracite)] mb-1">
              Textstatus
            </label>
            <div className="flex gap-2">
              {(Object.entries(CONTENT_STATUS_LABELS) as [string, string][]).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => update({ contentStatus: val as SectionDefinition["contentStatus"] })}
                  className={`
                    px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer
                    ${section.contentStatus === val
                      ? val === "final" ? "bg-green-100 text-green-700" : val === "draft" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                      : "bg-[var(--color-bg)] text-[var(--color-muted)] hover:bg-[var(--color-bg-soft)]"
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div>
            <label className="block text-xs font-medium text-[var(--color-anthracite)] mb-1">
              Call-to-Action
              <span className="font-normal text-[var(--color-muted)] ml-1">(optional)</span>
            </label>
            <input
              type="text"
              value={section.cta}
              onChange={(e) => update({ cta: e.target.value })}
              placeholder="z. B. Jetzt anfragen"
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-line-strong)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)]"
            />
          </div>

          {/* Media toggle */}
          <div>
            <button
              type="button"
              onClick={() => {
                const newShow = !showMedia;
                setShowMedia(newShow);
                if (!newShow) {
                  update({ image: { ...section.image, required: false } });
                }
              }}
              className="flex items-center gap-2 text-xs font-medium text-[var(--color-teal)] hover:text-[var(--color-teal-dark)] cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={showMedia
                  ? "M19 9l-7 7-7-7"
                  : "M9 5l7 7-7 7"
                } />
              </svg>
              {showMedia ? "Bildeinstellungen ausblenden" : "Bild hinzufügen"}
            </button>

            {showMedia && (
              <div className="mt-3 p-4 rounded-lg bg-[var(--color-bg-soft)] space-y-3">
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={section.image.required}
                    onChange={(e) =>
                      update({ image: { ...section.image, required: e.target.checked } })
                    }
                    className="rounded accent-[var(--color-teal)]"
                  />
                  <span className="font-medium text-[var(--color-anthracite)]">Hier soll ein Bild sein</span>
                </label>

                {section.image.required && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-[var(--color-muted)] mb-1">Bildart</label>
                        <select
                          value={section.image.type}
                          onChange={(e) => update({ image: { ...section.image, type: e.target.value as SectionDefinition["image"]["type"] } })}
                          className="w-full px-3 py-2 rounded-lg border border-[var(--color-line-strong)] bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30"
                        >
                          {Object.entries(IMAGE_TYPE_LABELS).map(([val, label]) => (
                            <option key={val} value={val}>{label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-[var(--color-muted)] mb-1">Position</label>
                        <select
                          value={section.image.position}
                          onChange={(e) => update({ image: { ...section.image, position: e.target.value as SectionDefinition["image"]["position"] } })}
                          className="w-full px-3 py-2 rounded-lg border border-[var(--color-line-strong)] bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30"
                        >
                          {Object.entries(IMAGE_POSITION_LABELS).map(([val, label]) => (
                            <option key={val} value={val}>{label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-[var(--color-muted)] mb-1">Bildbeschreibung</label>
                      <input
                        type="text"
                        value={section.image.description}
                        onChange={(e) => update({ image: { ...section.image, description: e.target.value } })}
                        placeholder="z. B. Teamfoto im Büro, natürliches Licht"
                        className="w-full px-3 py-2 rounded-lg border border-[var(--color-line-strong)] bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30"
                      />
                    </div>

                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 text-xs cursor-pointer">
                        <input
                          type="checkbox"
                          checked={section.image.available}
                          onChange={(e) => update({ image: { ...section.image, available: e.target.checked } })}
                          className="rounded accent-[var(--color-teal)]"
                        />
                        <span className="text-[var(--color-anthracite)]">Bild ist vorhanden</span>
                      </label>
                      {!section.image.available && (
                        <label className="flex items-center gap-2 text-xs cursor-pointer">
                          <input
                            type="checkbox"
                            checked={section.image.needsDelivery}
                            onChange={(e) => update({ image: { ...section.image, needsDelivery: e.target.checked } })}
                            className="rounded accent-[var(--color-coral)]"
                          />
                          <span className="text-[var(--color-anthracite)]">Wird noch nachgeliefert</span>
                        </label>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-[var(--color-anthracite)] mb-1">
              Notizen
              <span className="font-normal text-[var(--color-muted)] ml-1">(optional)</span>
            </label>
            <input
              type="text"
              value={section.notes}
              onChange={(e) => update({ notes: e.target.value })}
              placeholder="Anmerkungen zu dieser Sektion …"
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-line-strong)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)]"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function PageContentStep() {
  const { data, updatePage, addSection } = useContentForm();
  const [activePageId, setActivePageId] = useState<string>(
    data.pages[0]?.id || ""
  );

  const activePage = data.pages.find((p) => p.id === activePageId);

  function addSuggestedSections(pageId: string) {
    const page = data.pages.find((p) => p.id === pageId);
    if (!page) return;
    const suggestions = SUGGESTED_SECTIONS[page.pageType] || ["hero", "intro", "cta"];
    for (const type of suggestions) {
      addSection(pageId, createDefaultSection(type as SectionType));
    }
  }

  if (data.pages.length === 0) {
    return (
      <div className="text-center py-16">
        <svg className="w-16 h-16 mx-auto mb-4 text-[var(--color-muted)] opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-lg font-semibold text-[var(--color-anthracite)] mb-2">
          Noch keine Seiten angelegt
        </h3>
        <p className="text-[var(--color-muted)]">
          Gehen Sie zurück zu &ldquo;Seitenstruktur&rdquo; und wählen Sie Ihre Seiten aus.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-anthracite)] mb-2">
          Seiteninhalte
        </h2>
        <p className="text-[var(--color-muted)]">
          Füllen Sie die Inhalte für jede Seite aus. Wählen Sie links eine Seite und bearbeiten Sie deren Sektionen.
        </p>
      </div>

      <div className="flex gap-6 min-h-[500px]">
        {/* Page tabs (sidebar) */}
        <div className="w-48 shrink-0 space-y-1">
          {data.pages.map((page) => {
            const isActive = page.id === activePageId;
            const sectionCount = page.sections.length;
            return (
              <button
                key={page.id}
                type="button"
                onClick={() => setActivePageId(page.id)}
                className={`
                  w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer
                  ${isActive
                    ? "bg-[var(--color-teal)] text-white font-medium shadow-sm"
                    : "text-[var(--color-anthracite)] hover:bg-[var(--color-bg-soft)]"
                  }
                `}
              >
                <div className="truncate">{page.title}</div>
                <div className={`text-xs mt-0.5 ${isActive ? "text-white/70" : "text-[var(--color-muted)]"}`}>
                  {sectionCount === 0
                    ? "Keine Sektionen"
                    : `${sectionCount} ${sectionCount === 1 ? "Sektion" : "Sektionen"}`
                  }
                </div>
              </button>
            );
          })}
        </div>

        {/* Active page content */}
        {activePage && (
          <div className="flex-1 space-y-6">
            {/* Page meta */}
            <div className="p-5 bg-white rounded-xl border border-[var(--color-line)] space-y-4">
              <h3 className="font-semibold text-[var(--color-anthracite)]">{activePage.title}</h3>
              <div>
                <label className="block text-xs font-medium text-[var(--color-anthracite)] mb-1">
                  Ziel dieser Seite
                </label>
                <input
                  type="text"
                  value={activePage.pagePurpose}
                  onChange={(e) => updatePage(activePage.id, { pagePurpose: e.target.value })}
                  placeholder="z. B. Besucher sollen Vertrauen fassen und Kontakt aufnehmen"
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-line-strong)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--color-anthracite)] mb-1">
                  Kurze Beschreibung
                </label>
                <textarea
                  value={activePage.description}
                  onChange={(e) => updatePage(activePage.id, { description: e.target.value })}
                  placeholder="Beschreiben Sie kurz, worum es auf dieser Seite gehen soll …"
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-line-strong)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)] resize-y"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--color-anthracite)] mb-1">
                  Notizen
                  <span className="font-normal text-[var(--color-muted)] ml-1">(optional)</span>
                </label>
                <input
                  type="text"
                  value={activePage.notes}
                  onChange={(e) => updatePage(activePage.id, { notes: e.target.value })}
                  placeholder="Besonderheiten, Hinweise …"
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-line-strong)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)]"
                />
              </div>
            </div>

            {/* Sections */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-sm text-[var(--color-anthracite)]">
                  Sektionen
                </h4>
                <div className="flex gap-2">
                  {activePage.sections.length === 0 && (
                    <button
                      type="button"
                      onClick={() => addSuggestedSections(activePage.id)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-[var(--color-teal-light)] text-[var(--color-teal-dark)] font-medium hover:bg-[var(--color-teal)] hover:text-white transition cursor-pointer"
                    >
                      Vorschläge laden
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => addSection(activePage.id, createDefaultSection())}
                    className="text-xs px-3 py-1.5 rounded-lg bg-[var(--color-teal)] text-white font-medium hover:bg-[var(--color-teal-dark)] transition cursor-pointer"
                  >
                    + Sektion
                  </button>
                </div>
              </div>

              {activePage.sections.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-[var(--color-line)] rounded-xl">
                  <p className="text-sm text-[var(--color-muted)]">
                    Noch keine Sektionen. Klicken Sie auf &ldquo;Vorschläge laden&rdquo; für
                    typische Sektionen oder fügen Sie manuell Sektionen hinzu.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {activePage.sections.map((section, index) => (
                    <SectionEditor
                      key={section.id}
                      pageId={activePage.id}
                      section={section}
                      index={index}
                      total={activePage.sections.length}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
