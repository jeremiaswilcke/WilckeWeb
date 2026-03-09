"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { PRICING, formatPrice } from "./pricing";

export interface ProjectState {
  pages: string;
  materials: Record<string, string>;
  features: string[];
  design: string;
  support: string;
  system: string;
}

const defaultState: ProjectState = {
  pages: "onepager",
  materials: { logo: "yes", ci: "yes", texte: "yes", bilder: "yes" },
  features: ["kontakt"],
  design: "pro",
  support: "none",
  system: "headless-wp",
};

interface ProjectContextValue {
  state: ProjectState;
  setState: React.Dispatch<React.SetStateAction<ProjectState>>;
  getSummaryText: () => string;
  getTotal: () => number;
  getMonthly: () => number;
}

const ProjectContext = createContext<ProjectContextValue | null>(null);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProjectState>(defaultState);

  function getSummaryText(): string {
    const lines: string[] = [];

    // System
    const sys = PRICING.systems.find((s) => s.value === state.system);
    if (sys) lines.push(`System: ${sys.label}`);

    // Pages
    const pg = PRICING.pages[state.pages];
    if (pg) lines.push(`Umfang: ${pg.label} (${formatPrice(pg.price)})`);

    // Materials
    Object.entries(state.materials).forEach(([key, val]) => {
      const mat = PRICING.materials[key];
      const opt = mat?.options.find((o) => o.value === val);
      if (opt) {
        lines.push(`${mat.label}: ${opt.label}${opt.price > 0 ? ` (+${formatPrice(opt.price)})` : ""}`);
      }
    });

    // Features
    const activeFeatures = state.features
      .map((id) => PRICING.features.find((f) => f.id === id))
      .filter(Boolean);
    if (activeFeatures.length > 0) {
      lines.push(`Funktionen: ${activeFeatures.map((f) => f!.label).join(", ")}`);
    }

    // Design
    const des = PRICING.design.find((d) => d.value === state.design);
    if (des) lines.push(`Design: ${des.label}${des.price > 0 ? ` (+${formatPrice(des.price)})` : ""}`);

    // Support
    const sup = PRICING.support.find((s) => s.value === state.support);
    if (sup && sup.price > 0) lines.push(`Betreuung: ${sup.label} (${formatPrice(sup.price)}/Monat)`);

    lines.push("");
    lines.push(`Geschätzter Richtpreis: ${formatPrice(getTotal())}`);
    if (getMonthly() > 0) {
      lines.push(`Monatliche Betreuung: ${formatPrice(getMonthly())}/Monat`);
    }

    return lines.join("\n");
  }

  function getTotal(): number {
    let sum = 0;
    const pg = PRICING.pages[state.pages];
    if (pg) sum += pg.price;

    Object.entries(state.materials).forEach(([key, val]) => {
      const opt = PRICING.materials[key]?.options.find((o) => o.value === val);
      if (opt) sum += opt.price;
    });

    state.features.forEach((id) => {
      const feat = PRICING.features.find((f) => f.id === id);
      if (feat) sum += feat.price;
    });

    const des = PRICING.design.find((d) => d.value === state.design);
    if (des) sum += des.price;

    const sys = PRICING.systems.find((s) => s.value === state.system);
    if (sys) sum += sys.price;

    return sum;
  }

  function getMonthly(): number {
    const sup = PRICING.support.find((s) => s.value === state.support);
    return sup?.price ?? 0;
  }

  return (
    <ProjectContext.Provider value={{ state, setState, getSummaryText, getTotal, getMonthly }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProject must be used within ProjectProvider");
  return ctx;
}
