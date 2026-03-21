"use client";

import { useState } from "react";
import { useContentForm } from "../ContentFormContext";
import type { PageType } from "@/lib/content-form-types";
import { PAGE_TYPE_LABELS } from "@/lib/content-form-types";
import { createDefaultPage, slugify } from "@/lib/content-form-defaults";

const STANDARD_PAGES: { type: PageType; description: string }[] = [
  { type: "startseite", description: "Die Hauptseite — erster Eindruck und Überblick" },
  { type: "ueber-uns", description: "Vorstellung des Unternehmens, Teams, der Geschichte" },
  { type: "leistungen", description: "Was Sie anbieten — Ihre Produkte oder Dienstleistungen" },
  { type: "angebote", description: "Aktuelle Angebote, Pakete oder Preise" },
  { type: "kontakt", description: "Kontaktformular, Adresse, Anfahrt" },
  { type: "blog", description: "Neuigkeiten, Artikel, Aktuelles" },
  { type: "faq", description: "Häufig gestellte Fragen und Antworten" },
  { type: "landingpage", description: "Spezielle Seite für Kampagnen oder Aktionen" },
  { type: "terminbuchung", description: "Online-Terminbuchung für Ihre Kunden" },
  { type: "events", description: "Veranstaltungen, Termine, Kalender" },
  { type: "portfolio", description: "Arbeitsbeispiele, Projekte, Bildergalerie" },
  { type: "referenzen", description: "Kundenstimmen, Bewertungen, Logos" },
];

export default function PagesStep() {
  const { data, addPage, removePage, updatePage, movePage } = useContentForm();
  const [customPageName, setCustomPageName] = useState("");

  const activePageTypes = data.pages.map((p) => p.pageType);

  function toggleStandardPage(type: PageType) {
    const existing = data.pages.find((p) => p.pageType === type);
    if (existing) {
      removePage(existing.id);
    } else {
      const label = PAGE_TYPE_LABELS[type];
      addPage(createDefaultPage(type, label, data.pages.length));
    }
  }

  function addCustomPage() {
    const name = customPageName.trim();
    if (!name) return;
    addPage(createDefaultPage("custom", name, data.pages.length));
    setCustomPageName("");
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-anthracite)] mb-2">
          Seitenstruktur
        </h2>
        <p className="text-[var(--color-muted)]">
          Welche Seiten soll Ihre Website haben? Wählen Sie Standardseiten aus oder fügen Sie eigene hinzu.
        </p>
      </div>

      {/* Standard-Seiten */}
      <div>
        <h3 className="text-lg font-semibold text-[var(--color-anthracite)] mb-4">
          Standardseiten
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {STANDARD_PAGES.map(({ type, description }) => {
            const isActive = activePageTypes.includes(type);
            return (
              <button
                key={type}
                type="button"
                onClick={() => toggleStandardPage(type)}
                className={`
                  text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
                  ${isActive
                    ? "border-[var(--color-teal)] bg-[var(--color-teal-light)]/40"
                    : "border-[var(--color-line)] bg-white hover:border-[var(--color-teal)]/30 hover:bg-[var(--color-bg-soft)]"
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`
                      w-5 h-5 rounded-md border-2 flex items-center justify-center mt-0.5 shrink-0 transition-all
                      ${isActive
                        ? "bg-[var(--color-teal)] border-[var(--color-teal)]"
                        : "border-[var(--color-line-strong)]"
                      }
                    `}
                  >
                    {isActive && (
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-[var(--color-anthracite)] text-sm">
                      {PAGE_TYPE_LABELS[type]}
                    </div>
                    <div className="text-xs text-[var(--color-muted)] mt-0.5">
                      {description}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Eigene Seite hinzufügen */}
      <div>
        <h3 className="text-lg font-semibold text-[var(--color-anthracite)] mb-3">
          Eigene Seite hinzufügen
        </h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={customPageName}
            onChange={(e) => setCustomPageName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCustomPage()}
            placeholder="z. B. Team, Partner, Downloads …"
            className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--color-line-strong)] bg-white text-[var(--color-text)] placeholder:text-[var(--color-muted)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)] transition"
          />
          <button
            type="button"
            onClick={addCustomPage}
            disabled={!customPageName.trim()}
            className="px-5 py-2.5 rounded-xl bg-[var(--color-teal)] text-white font-medium text-sm hover:bg-[var(--color-teal-dark)] disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          >
            Hinzufügen
          </button>
        </div>
      </div>

      {/* Gewählte Seiten — Übersicht mit Sortierung */}
      {data.pages.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-anthracite)] mb-3">
            Ihre Seiten
            <span className="text-sm font-normal text-[var(--color-muted)] ml-2">
              ({data.pages.length} {data.pages.length === 1 ? "Seite" : "Seiten"})
            </span>
          </h3>
          <p className="text-xs text-[var(--color-muted)] mb-3">
            Sie können Seiten umbenennen, umsortieren oder entfernen.
          </p>
          <div className="space-y-2">
            {data.pages
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map((page, index) => (
                <div
                  key={page.id}
                  className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[var(--color-line)] group"
                >
                  {/* Order number */}
                  <span className="text-xs font-bold text-[var(--color-muted)] w-6 text-center">
                    {index + 1}
                  </span>

                  {/* Title input */}
                  <input
                    type="text"
                    value={page.title}
                    onChange={(e) =>
                      updatePage(page.id, {
                        title: e.target.value,
                        slug: slugify(e.target.value),
                      })
                    }
                    className="flex-1 px-3 py-1.5 rounded-lg border border-transparent hover:border-[var(--color-line-strong)] focus:border-[var(--color-teal)] bg-transparent text-sm text-[var(--color-anthracite)] font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/20 transition"
                  />

                  {/* Slug preview */}
                  <span className="text-xs text-[var(--color-muted)] hidden sm:inline">
                    /{page.slug}
                  </span>

                  {/* Move buttons */}
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => movePage(page.id, "up")}
                      disabled={index === 0}
                      className="p-1.5 rounded-lg hover:bg-[var(--color-bg)] disabled:opacity-20 transition cursor-pointer"
                      title="Nach oben"
                    >
                      <svg className="w-4 h-4 text-[var(--color-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => movePage(page.id, "down")}
                      disabled={index === data.pages.length - 1}
                      className="p-1.5 rounded-lg hover:bg-[var(--color-bg)] disabled:opacity-20 transition cursor-pointer"
                      title="Nach unten"
                    >
                      <svg className="w-4 h-4 text-[var(--color-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => removePage(page.id)}
                    className="p-1.5 rounded-lg hover:bg-[var(--color-coral-light)] text-[var(--color-muted)] hover:text-[var(--color-coral)] transition cursor-pointer"
                    title="Entfernen"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {data.pages.length === 0 && (
        <div className="text-center py-12 text-[var(--color-muted)]">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="font-medium">Noch keine Seiten ausgewählt</p>
          <p className="text-sm mt-1">Wählen Sie oben Standardseiten aus oder fügen Sie eigene hinzu.</p>
        </div>
      )}
    </div>
  );
}
