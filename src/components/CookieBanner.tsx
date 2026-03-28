"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type CookiePrefs = {
  essential: true;
  analytics: boolean;
};

const COOKIE_KEY = "wwd_cookie_consent";

function getStoredPrefs(): CookiePrefs | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COOKIE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function storePrefs(prefs: CookiePrefs) {
  localStorage.setItem(COOKIE_KEY, JSON.stringify(prefs));
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const stored = getStoredPrefs();
    if (!stored) setVisible(true);
  }, []);

  function accept(all: boolean) {
    const prefs: CookiePrefs = {
      essential: true,
      analytics: all ? true : analytics,
    };
    storePrefs(prefs);
    setVisible(false);
  }

  function rejectAll() {
    storePrefs({ essential: true, analytics: false });
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[150] p-4 max-md:p-3">
      <div
        className="max-w-[600px] mx-auto bg-white rounded-2xl shadow-[0_-4px_40px_rgba(0,0,0,0.12)] border border-line
          overflow-hidden animate-scaleIn"
      >
        <div className="p-6 max-md:p-4">
          {/* Header */}
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-teal/10 text-teal flex items-center justify-center shrink-0 text-lg">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-[1rem] tracking-tight">Cookie-Einstellungen</h3>
              <p className="text-muted text-[0.85rem] leading-relaxed mt-1">
                Wir verwenden Cookies, um Ihnen die bestm&ouml;gliche Erfahrung zu bieten.
                Sie k&ouml;nnen selbst entscheiden, welche Cookies Sie zulassen m&ouml;chten.{" "}
                <Link href="/datenschutz" className="text-teal hover:underline">
                  Mehr erfahren
                </Link>
              </p>
            </div>
          </div>

          {/* Detail Toggle */}
          {showDetails && (
            <div className="space-y-3 mb-5 pl-[52px] max-md:pl-0">
              {/* Essential */}
              <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-bg-soft border border-line">
                <div>
                  <div className="text-[0.85rem] font-semibold">Essenziell</div>
                  <div className="text-[0.78rem] text-muted">Technisch notwendig f&uuml;r den Betrieb der Website.</div>
                </div>
                <div className="w-11 h-6 rounded-full bg-teal relative shrink-0 cursor-not-allowed">
                  <div className="absolute right-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow-sm" />
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-bg-soft border border-line">
                <div>
                  <div className="text-[0.85rem] font-semibold">Analyse</div>
                  <div className="text-[0.78rem] text-muted">Hilft uns, die Website zu verbessern.</div>
                </div>
                <button
                  onClick={() => setAnalytics(!analytics)}
                  className={`w-11 h-6 rounded-full relative shrink-0 transition-colors duration-200
                    ${analytics ? "bg-teal" : "bg-line-strong"}`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-200
                      ${analytics ? "right-0.5" : "left-0.5"}`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 flex-wrap pl-[52px] max-md:pl-0">
            <button
              onClick={() => accept(true)}
              className="px-5 py-2.5 rounded-full bg-teal text-white text-[0.85rem] font-semibold
                hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(86,160,168,0.3)]
                transition-all duration-300"
            >
              Alle akzeptieren
            </button>

            {showDetails ? (
              <button
                onClick={() => accept(false)}
                className="px-5 py-2.5 rounded-full bg-anthracite text-white text-[0.85rem] font-semibold
                  hover:-translate-y-0.5 transition-all duration-300"
              >
                Auswahl speichern
              </button>
            ) : (
              <button
                onClick={() => setShowDetails(true)}
                className="px-5 py-2.5 rounded-full border border-line-strong text-[0.85rem] font-semibold text-text
                  hover:-translate-y-0.5 transition-all duration-300"
              >
                Anpassen
              </button>
            )}

            <button
              onClick={rejectAll}
              className="text-[0.82rem] text-muted hover:text-text transition-colors underline underline-offset-2"
            >
              Nur essenzielle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
