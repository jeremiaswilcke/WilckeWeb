"use client";

import { useContentForm } from "../ContentFormContext";

export default function ExtrasStep() {
  const { data, updateExtras } = useContentForm();
  const { legal, contact, socialMedia, features } = data.extras;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-anthracite)] mb-2">
          Zusatzinformationen
        </h2>
        <p className="text-[var(--color-muted)]">
          Angaben zu Kontakt, Recht, Social Media und gewünschten Funktionen.
        </p>
      </div>

      {/* Kontaktdaten */}
      <fieldset className="p-5 bg-white rounded-xl border border-[var(--color-line)] space-y-4">
        <legend className="text-lg font-semibold text-[var(--color-anthracite)] px-1">
          Kontaktdaten
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[var(--color-anthracite)] mb-1">E-Mail</label>
            <input
              type="email"
              value={contact.email}
              onChange={(e) => updateExtras({ contact: { ...contact, email: e.target.value } })}
              placeholder="info@firma.de"
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-line-strong)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--color-anthracite)] mb-1">Telefon</label>
            <input
              type="tel"
              value={contact.phone}
              onChange={(e) => updateExtras({ contact: { ...contact, phone: e.target.value } })}
              placeholder="+49 123 456 789"
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-line-strong)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)]"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-[var(--color-anthracite)] mb-1">Adresse</label>
          <textarea
            value={contact.address}
            onChange={(e) => updateExtras({ contact: { ...contact, address: e.target.value } })}
            placeholder="Musterstraße 12, 80331 München"
            rows={2}
            className="w-full px-3 py-2 rounded-lg border border-[var(--color-line-strong)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)] resize-y"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[var(--color-anthracite)] mb-1">
            Öffnungszeiten
            <span className="font-normal text-[var(--color-muted)] ml-1">(optional)</span>
          </label>
          <textarea
            value={contact.openingHours}
            onChange={(e) => updateExtras({ contact: { ...contact, openingHours: e.target.value } })}
            placeholder="Mo–Fr: 9:00–17:00 Uhr&#10;Sa: nach Vereinbarung"
            rows={2}
            className="w-full px-3 py-2 rounded-lg border border-[var(--color-line-strong)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)] resize-y"
          />
        </div>
      </fieldset>

      {/* Rechtliches */}
      <fieldset className="p-5 bg-white rounded-xl border border-[var(--color-line)] space-y-4">
        <legend className="text-lg font-semibold text-[var(--color-anthracite)] px-1">
          Rechtliches
        </legend>
        <p className="text-xs text-[var(--color-muted)]">
          Haben Sie die folgenden rechtlichen Texte bereits vorbereitet?
        </p>
        <div className="space-y-3">
          {([
            ["impressumAvailable", "Impressum"] as const,
            ["datenschutzAvailable", "Datenschutzerklärung"] as const,
            ["agbAvailable", "AGB"] as const,
          ]).map(([key, label]) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer">
              <div
                className={`
                  w-10 h-6 rounded-full transition-all duration-200 relative cursor-pointer
                  ${legal[key] ? "bg-[var(--color-teal)]" : "bg-[var(--color-line-strong)]"}
                `}
                onClick={() => updateExtras({ legal: { ...legal, [key]: !legal[key] } })}
              >
                <div
                  className={`
                    absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200
                    ${legal[key] ? "left-[18px]" : "left-0.5"}
                  `}
                />
              </div>
              <span className="text-sm text-[var(--color-anthracite)]">{label}</span>
              <span className={`text-xs ${legal[key] ? "text-green-600" : "text-[var(--color-muted)]"}`}>
                {legal[key] ? "vorhanden" : "fehlt noch"}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Social Media */}
      <fieldset className="p-5 bg-white rounded-xl border border-[var(--color-line)] space-y-4">
        <legend className="text-lg font-semibold text-[var(--color-anthracite)] px-1">
          Social Media
        </legend>
        <p className="text-xs text-[var(--color-muted)]">
          Tragen Sie die Links zu Ihren Social-Media-Profilen ein.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {([
            ["facebook", "Facebook"],
            ["instagram", "Instagram"],
            ["linkedin", "LinkedIn"],
            ["youtube", "YouTube"],
            ["tiktok", "TikTok"],
            ["xing", "Xing"],
          ] as const).map(([key, label]) => (
            <div key={key}>
              <label className="block text-xs font-medium text-[var(--color-anthracite)] mb-1">{label}</label>
              <input
                type="url"
                value={socialMedia[key]}
                onChange={(e) => updateExtras({ socialMedia: { ...socialMedia, [key]: e.target.value } })}
                placeholder={`${label}-URL`}
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-line-strong)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)]"
              />
            </div>
          ))}
        </div>
        <div>
          <label className="block text-xs font-medium text-[var(--color-anthracite)] mb-1">
            Sonstige
            <span className="font-normal text-[var(--color-muted)] ml-1">(optional)</span>
          </label>
          <input
            type="text"
            value={socialMedia.other}
            onChange={(e) => updateExtras({ socialMedia: { ...socialMedia, other: e.target.value } })}
            placeholder="Weitere Links …"
            className="w-full px-3 py-2 rounded-lg border border-[var(--color-line-strong)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)]"
          />
        </div>
      </fieldset>

      {/* Funktionen */}
      <fieldset className="p-5 bg-white rounded-xl border border-[var(--color-line)] space-y-4">
        <legend className="text-lg font-semibold text-[var(--color-anthracite)] px-1">
          Gewünschte Funktionen
        </legend>
        <p className="text-xs text-[var(--color-muted)]">
          Welche zusätzlichen Funktionen soll die Website haben?
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {([
            ["newsletter", "Newsletter"],
            ["shop", "Online-Shop"],
            ["booking", "Terminbuchung"],
            ["blog", "Blog"],
            ["multilingual", "Mehrsprachigkeit"],
          ] as const).map(([key, label]) => {
            const isActive = features[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => updateExtras({ features: { ...features, [key]: !isActive } })}
                className={`
                  p-3 rounded-xl border-2 text-sm font-medium text-left transition-all cursor-pointer
                  ${isActive
                    ? "border-[var(--color-teal)] bg-[var(--color-teal-light)]/40 text-[var(--color-teal-dark)]"
                    : "border-[var(--color-line)] bg-white text-[var(--color-muted)] hover:border-[var(--color-teal)]/30"
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${isActive ? "bg-[var(--color-teal)] border-[var(--color-teal)]" : "border-[var(--color-line-strong)]"}`}>
                    {isActive && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  {label}
                </div>
              </button>
            );
          })}
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--color-anthracite)] mb-1">
            Gewünschte Formulare
            <span className="font-normal text-[var(--color-muted)] ml-1">(optional)</span>
          </label>
          <input
            type="text"
            value={features.forms}
            onChange={(e) => updateExtras({ features: { ...features, forms: e.target.value } })}
            placeholder="z. B. Kontaktformular, Angebotsanfrage, Bewerbungsformular"
            className="w-full px-3 py-2 rounded-lg border border-[var(--color-line-strong)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--color-anthracite)] mb-1">
            Externe Tools / Einbindungen
            <span className="font-normal text-[var(--color-muted)] ml-1">(optional)</span>
          </label>
          <input
            type="text"
            value={features.externalTools}
            onChange={(e) => updateExtras({ features: { ...features, externalTools: e.target.value } })}
            placeholder="z. B. Google Maps, Calendly, Mailchimp, YouTube-Videos"
            className="w-full px-3 py-2 rounded-lg border border-[var(--color-line-strong)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/30 focus:border-[var(--color-teal)]"
          />
        </div>
      </fieldset>
    </div>
  );
}
