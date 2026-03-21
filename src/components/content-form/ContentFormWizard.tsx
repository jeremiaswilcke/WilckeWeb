"use client";

import { useContentForm } from "./ContentFormContext";
import StepIndicator from "./StepIndicator";
import ProjectStep from "./steps/ProjectStep";
import PagesStep from "./steps/PagesStep";
import PageContentStep from "./steps/PageContentStep";
import ExtrasStep from "./steps/ExtrasStep";
import ReviewStep from "./steps/ReviewStep";
import { calculateCompletion } from "@/lib/content-form-export";

const STEPS = [
  { component: ProjectStep, label: "Projekt" },
  { component: PagesStep, label: "Seitenstruktur" },
  { component: PageContentStep, label: "Seiteninhalte" },
  { component: ExtrasStep, label: "Zusatzinfos" },
  { component: ReviewStep, label: "Übersicht & Export" },
];

export default function ContentFormWizard() {
  const { data, currentStep, setCurrentStep } = useContentForm();
  const StepComponent = STEPS[currentStep].component;
  const completion = calculateCompletion(data);

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-[var(--color-line)] sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <a href="/" className="shrink-0">
                <img
                  src="/wilckeweb_logo.png"
                  alt="WilckeWeb"
                  className="h-8"
                />
              </a>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-[var(--color-anthracite)]">
                  Website-Inhaltsplaner
                </h1>
                <p className="text-xs text-[var(--color-muted)]">
                  Alle Inhalte für Ihre Website — strukturiert und übersichtlich
                </p>
              </div>
            </div>
            <a
              href="/"
              className="text-sm text-[var(--color-muted)] hover:text-[var(--color-anthracite)] transition"
            >
              Zurück zur Startseite
            </a>
          </div>
          <StepIndicator
            currentStep={currentStep}
            onStepClick={setCurrentStep}
            completionPercentage={completion}
          />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StepComponent />

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-[var(--color-line)]">
          <button
            type="button"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-6 py-3 rounded-xl text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-anthracite)] hover:bg-[var(--color-bg-soft)] disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Zurück
          </button>

          <span className="text-xs text-[var(--color-muted)]">
            Schritt {currentStep + 1} von {STEPS.length}
          </span>

          {currentStep < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(Math.min(STEPS.length - 1, currentStep + 1))}
              className="px-6 py-3 rounded-xl text-sm font-medium bg-[var(--color-teal)] text-white hover:bg-[var(--color-teal-dark)] transition cursor-pointer flex items-center gap-2"
            >
              Weiter
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <div />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-line)] mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <span className="text-xs text-[var(--color-muted)]">
            WilckeWeb — Website-Inhaltsplaner
          </span>
          <span className="text-xs text-[var(--color-muted)]">
            Ihre Eingaben werden lokal in Ihrem Browser gespeichert.
          </span>
        </div>
      </footer>
    </div>
  );
}
