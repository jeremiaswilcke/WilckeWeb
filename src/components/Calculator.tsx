"use client";

import { useState, useMemo } from "react";
import { PRICING, formatPrice } from "@/lib/pricing";
import FadeIn from "./FadeIn";
import { ArrowRightIcon } from "./Icons";

interface CalcState {
  pages: string;
  materials: Record<string, string>;
  features: string[];
  design: string;
  support: string;
}

export default function Calculator() {
  const [state, setState] = useState<CalcState>({
    pages: "onepager",
    materials: { logo: "yes", ci: "yes", texte: "yes", bilder: "yes" },
    features: ["kontakt"],
    design: "pro",
    support: "none",
  });

  const setPages = (v: string) => setState((s) => ({ ...s, pages: v }));
  const setMaterial = (key: string, v: string) =>
    setState((s) => ({
      ...s,
      materials: { ...s.materials, [key]: v },
    }));
  const toggleFeature = (id: string) =>
    setState((s) => ({
      ...s,
      features: s.features.includes(id)
        ? s.features.filter((f) => f !== id)
        : [...s.features, id],
    }));
  const setDesign = (v: string) => setState((s) => ({ ...s, design: v }));
  const setSupport = (v: string) => setState((s) => ({ ...s, support: v }));

  // Price calculation
  const { total, breakdown, monthly } = useMemo(() => {
    const items: { label: string; value: number }[] = [];
    let sum = 0;

    // Base
    const pg = PRICING.pages[state.pages];
    sum += pg.price;
    items.push({ label: pg.label, value: pg.price });

    // Materials
    Object.entries(state.materials).forEach(([key, val]) => {
      const mat = PRICING.materials[key];
      const opt = mat.options.find((o) => o.value === val);
      if (opt && opt.price > 0) {
        sum += opt.price;
        items.push({ label: mat.label, value: opt.price });
      }
    });

    // Features
    state.features.forEach((id) => {
      const feat = PRICING.features.find((f) => f.id === id);
      if (feat && feat.price > 0) {
        sum += feat.price;
        items.push({ label: feat.label, value: feat.price });
      }
    });

    // Design
    const des = PRICING.design.find((d) => d.value === state.design);
    if (des && des.price > 0) {
      sum += des.price;
      items.push({ label: "Premium-Design", value: des.price });
    }

    // Support
    const sup = PRICING.support.find((s) => s.value === state.support);

    return { total: sum, breakdown: items, monthly: sup?.price ?? 0 };
  }, [state]);

  return (
    <section
      id="rechner"
      className="py-[140px] max-md:py-20 bg-white border-t border-b border-line"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeIn>
          <div className="text-center max-w-[680px] mx-auto mb-16">
            <span className="inline-block text-xs font-bold tracking-[0.14em] uppercase text-coral mb-4">
              Website planen
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight">
              Richtpreis berechnen
            </h2>
            <p className="text-muted text-[1.05rem] leading-relaxed mt-4">
              Konfigurieren Sie Ihre Website und erhalten Sie sofort eine
              transparente Preiseinschätzung. Unverbindlich und in wenigen
              Klicks.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-[1.35fr_0.65fr] gap-10 items-start max-lg:grid-cols-1">
          {/* Form */}
          <div className="grid gap-10">
            {/* Pages */}
            <CalcGroup title="Umfang der Website" subtitle="Wie umfangreich soll Ihre Website werden?">
              <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                {Object.entries(PRICING.pages).map(([key, val]) => (
                  <RadioCard
                    key={key}
                    selected={state.pages === key}
                    onClick={() => setPages(key)}
                    label={val.label}
                    price={`ab ${formatPrice(val.price)}`}
                  />
                ))}
              </div>
            </CalcGroup>

            {/* Materials */}
            {Object.entries(PRICING.materials).map(([key, mat]) => (
              <CalcGroup key={key} title={mat.label}>
                <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
                  {mat.options.map((opt) => (
                    <RadioCard
                      key={opt.value}
                      selected={state.materials[key] === opt.value}
                      onClick={() => setMaterial(key, opt.value)}
                      label={opt.label}
                      price={opt.price > 0 ? `+ ${formatPrice(opt.price)}` : undefined}
                    />
                  ))}
                </div>
              </CalcGroup>
            ))}

            {/* Features */}
            <CalcGroup title="Zusatzfunktionen" subtitle="Welche Funktionen benötigt Ihre Website?">
              <div className="grid grid-cols-2 gap-2.5 max-md:grid-cols-1">
                {PRICING.features.map((feat) => {
                  const checked = state.features.includes(feat.id);
                  return (
                    <label
                      key={feat.id}
                      className={`flex items-center gap-3 py-3.5 px-4 rounded-xl border cursor-pointer transition-all duration-300 select-none
                        ${feat.included ? "opacity-70 pointer-events-none" : ""}
                        ${checked ? "border-teal bg-teal/[0.04]" : "border-line bg-bg-soft hover:border-line-strong"}`}
                      onClick={(e) => {
                        if (feat.included) return;
                        e.preventDefault();
                        toggleFeature(feat.id);
                      }}
                    >
                      <span
                        className={`w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all duration-300
                          ${checked ? "border-teal bg-teal" : "border-line-strong"}`}
                      >
                        {checked && (
                          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block font-semibold text-[0.9rem]">{feat.label}</span>
                        <span className="block text-[0.78rem] font-semibold text-teal">
                          {feat.included ? "inklusive" : `+ ${formatPrice(feat.price)}`}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </CalcGroup>

            {/* Design */}
            <CalcGroup title="Designniveau">
              <div className="grid gap-3">
                {PRICING.design.map((opt) => (
                  <RadioCard
                    key={opt.value}
                    selected={state.design === opt.value}
                    onClick={() => setDesign(opt.value)}
                    label={opt.label}
                    hint={opt.hint}
                    price={opt.price > 0 ? `+ ${formatPrice(opt.price)}` : undefined}
                  />
                ))}
              </div>
            </CalcGroup>

            {/* Support */}
            <CalcGroup title="Laufende Betreuung" subtitle="Wünschen Sie eine monatliche Betreuung nach dem Launch?">
              <div className="grid gap-3">
                {PRICING.support.map((opt) => (
                  <RadioCard
                    key={opt.value}
                    selected={state.support === opt.value}
                    onClick={() => setSupport(opt.value)}
                    label={opt.label}
                    hint={opt.hint}
                    price={opt.price > 0 ? `${formatPrice(opt.price)} / Monat` : undefined}
                  />
                ))}
              </div>
            </CalcGroup>
          </div>

          {/* Price sidebar */}
          <div className="lg:sticky lg:top-[100px] max-lg:order-first">
            <div className="rounded-3xl p-9 bg-gradient-to-br from-anthracite to-[#2a2a2a] text-white shadow-[0_24px_60px_rgba(63,63,63,0.1)]">
              <span className="inline-block text-xs font-bold tracking-[0.14em] uppercase text-coral/90 mb-1">
                Ihr Richtpreis
              </span>
              <div className="text-[clamp(2.4rem,4vw,3.2rem)] font-extrabold tracking-tight leading-none mt-3 mb-1">
                {formatPrice(total)}
                <span className="text-[0.6em] font-semibold opacity-70 ml-1">EUR</span>
              </div>
              <div className="text-[0.85rem] text-white/55 mb-6">
                Einmalige Projektkosten (netto)
              </div>

              {/* Breakdown */}
              <div className="mb-6">
                {breakdown.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center gap-3 py-2.5 text-[0.88rem] border-b border-white/8 last:border-b-0"
                  >
                    <span className="text-white/65">{item.label}</span>
                    <span className="font-semibold whitespace-nowrap">
                      {formatPrice(item.value)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Monthly */}
              {monthly > 0 && (
                <div className="bg-white/8 rounded-2xl p-4 mb-5">
                  <div className="text-[0.82rem] text-white/55 mb-1">
                    Monatliche Betreuung
                  </div>
                  <div className="text-xl font-bold">
                    {formatPrice(monthly)} / Monat
                  </div>
                </div>
              )}

              {/* Note */}
              <div className="text-[0.8rem] text-white/45 leading-relaxed py-3.5 border-t border-white/8">
                Dies ist ein unverbindlicher Richtpreis. Ein genaues Angebot
                erhalten Sie nach einem kurzen Erstgespräch.
              </div>

              <a
                href="#kontakt"
                className="flex items-center justify-center gap-2 w-full mt-4 font-semibold text-[0.95rem] px-8 py-3.5 rounded-full
                  bg-coral text-white hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,125,115,0.3)]
                  transition-all duration-300"
              >
                Projekt anfragen
                <ArrowRightIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Sub-components ---------- */

function CalcGroup({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-[clamp(1.25rem,2vw,1.5rem)] font-bold tracking-tight mb-2">
        {title}
      </h3>
      {subtitle && (
        <p className="text-muted text-[0.9rem] mb-5">{subtitle}</p>
      )}
      {!subtitle && <div className="mb-5" />}
      {children}
    </div>
  );
}

function RadioCard({
  selected,
  onClick,
  label,
  hint,
  price,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  hint?: string;
  price?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-start gap-3 py-4 px-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer w-full
        ${
          selected
            ? "border-teal bg-white shadow-[0_0_0_1px_var(--color-teal)]"
            : "border-line bg-bg-soft hover:border-line-strong hover:bg-white"
        }`}
    >
      {/* Radio dot */}
      <span
        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all duration-300
          ${selected ? "border-teal bg-teal" : "border-line-strong"}`}
      >
        {selected && <span className="w-2 h-2 rounded-full bg-white" />}
      </span>
      <span>
        <span className="block font-semibold text-[0.92rem] leading-snug">
          {label}
        </span>
        {hint && (
          <span className="block text-[0.82rem] text-muted mt-0.5 leading-snug">
            {hint}
          </span>
        )}
        {price && (
          <span className="block text-[0.78rem] font-semibold text-teal mt-1">
            {price}
          </span>
        )}
      </span>
    </button>
  );
}
