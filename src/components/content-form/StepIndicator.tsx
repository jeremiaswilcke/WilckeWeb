"use client";

const STEPS = [
  { label: "Projekt", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  { label: "Seiten", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { label: "Inhalte", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
  { label: "Zusatzinfos", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
  { label: "Übersicht", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
];

interface StepIndicatorProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  completionPercentage: number;
}

export default function StepIndicator({
  currentStep,
  onStepClick,
  completionPercentage,
}: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[var(--color-muted)]">Fortschritt</span>
          <span className="text-sm font-medium text-[var(--color-anthracite)]">
            {completionPercentage}%
          </span>
        </div>
        <div className="h-1.5 bg-[var(--color-line)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--color-teal)] rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <nav className="flex gap-1">
        {STEPS.map((step, index) => {
          const isActive = index === currentStep;
          const isPast = index < currentStep;

          return (
            <button
              key={step.label}
              onClick={() => onStepClick(index)}
              className={`
                flex-1 flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl
                transition-all duration-200 cursor-pointer group
                ${isActive
                  ? "bg-[var(--color-teal)] text-white shadow-md"
                  : isPast
                    ? "bg-[var(--color-teal-light)] text-[var(--color-teal-dark)]"
                    : "bg-[var(--color-surface)] text-[var(--color-muted)] hover:bg-[var(--color-bg-soft)]"
                }
              `}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={isActive ? 2.5 : 2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={step.icon} />
              </svg>
              <span className={`text-xs font-medium ${isActive ? "" : ""}`}>
                {step.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
