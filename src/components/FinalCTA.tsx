"use client";

import { useState } from "react";
import FadeIn from "./FadeIn";
import { ArrowRightIcon, CheckCircleIcon } from "./Icons";

type FormType = "buchung" | "kontakt";

export default function FinalCTA() {
  const [type, setType] = useState<FormType>("buchung");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [honey, setHoney] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, type, message, _honey: honey }),
      });
      if (res.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <section id="kontakt" className="py-[140px] max-md:py-20 text-center">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeIn>
            <div
              className="max-w-[680px] mx-auto py-16 px-12 max-md:py-12 max-md:px-7
                rounded-3xl bg-gradient-to-br from-anthracite to-[#2a2a2a] text-white
                shadow-[0_24px_60px_rgba(63,63,63,0.1)]"
            >
              <div className="w-14 h-14 rounded-full bg-teal/20 text-teal flex items-center justify-center mx-auto mb-6">
                <CheckCircleIcon />
              </div>
              <h2 className="text-2xl font-bold mb-3">Nachricht gesendet!</h2>
              <p className="text-white/60 text-[1.05rem] leading-relaxed max-w-[44ch] mx-auto">
                Vielen Dank für Ihre Anfrage. Ich melde mich in der Regel innerhalb von 24 Stunden bei Ihnen.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    );
  }

  return (
    <section id="kontakt" className="py-[140px] max-md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeIn>
          <div
            className="max-w-[720px] mx-auto py-[56px] px-12 max-md:py-10 max-md:px-6
              rounded-3xl bg-gradient-to-br from-anthracite to-[#2a2a2a] text-white
              shadow-[0_24px_60px_rgba(63,63,63,0.1)] relative overflow-hidden"
          >
            {/* Decorative glow */}
            <div className="absolute -top-[40%] -right-[20%] w-[60%] h-full bg-[radial-gradient(ellipse,rgba(249,125,115,0.12),transparent_70%)] pointer-events-none" />

            <div className="relative">
              <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-bold leading-tight tracking-tight mb-2 text-center">
                Lassen Sie uns Ihre Website planen.
              </h2>
              <p className="text-white/50 text-[0.95rem] leading-relaxed text-center mb-8 max-w-[48ch] mx-auto">
                Erzählen Sie mir von Ihrem Projekt — ich melde mich in der Regel innerhalb von 24 Stunden.
              </p>

              {/* Type toggle */}
              <div className="flex gap-2 mb-8 bg-white/5 rounded-full p-1 max-w-[360px] mx-auto">
                <button
                  onClick={() => setType("buchung")}
                  className={`flex-1 text-[0.85rem] font-semibold py-2.5 rounded-full transition-all duration-300 ${
                    type === "buchung"
                      ? "bg-coral text-white shadow-[0_4px_12px_rgba(249,125,115,0.3)]"
                      : "text-white/50 hover:text-white/70"
                  }`}
                >
                  Projekt anfragen
                </button>
                <button
                  onClick={() => setType("kontakt")}
                  className={`flex-1 text-[0.85rem] font-semibold py-2.5 rounded-full transition-all duration-300 ${
                    type === "kontakt"
                      ? "bg-teal text-white shadow-[0_4px_12px_rgba(86,160,168,0.3)]"
                      : "text-white/50 hover:text-white/70"
                  }`}
                >
                  Allgemeine Frage
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot */}
                <input
                  type="text"
                  name="_honey"
                  value={honey}
                  onChange={(e) => setHoney(e.target.value)}
                  className="absolute -left-[9999px]"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                  <div>
                    <label className="block text-[0.78rem] font-semibold text-white/40 uppercase tracking-wider mb-1.5">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ihr Name"
                      className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-[0.92rem] text-white
                        placeholder:text-white/25 focus:outline-none focus:border-white/25 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[0.78rem] font-semibold text-white/40 uppercase tracking-wider mb-1.5">
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ihre@email.at"
                      className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-[0.92rem] text-white
                        placeholder:text-white/25 focus:outline-none focus:border-white/25 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[0.78rem] font-semibold text-white/40 uppercase tracking-wider mb-1.5">
                    Telefon <span className="normal-case tracking-normal font-normal">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+43 ..."
                    className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-[0.92rem] text-white
                      placeholder:text-white/25 focus:outline-none focus:border-white/25 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[0.78rem] font-semibold text-white/40 uppercase tracking-wider mb-1.5">
                    {type === "buchung" ? "Erzählen Sie mir von Ihrem Projekt *" : "Ihre Nachricht *"}
                  </label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder={
                      type === "buchung"
                        ? "Was für eine Website brauchen Sie? Gibt es schon eine bestehende? Wann soll sie fertig sein?"
                        : "Wie kann ich Ihnen helfen?"
                    }
                    className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-[0.92rem] text-white
                      placeholder:text-white/25 focus:outline-none focus:border-white/25 transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-coral text-[0.85rem] text-center">
                    Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie direkt an{" "}
                    <a href="mailto:jeremias@wilckeweb.org" className="underline">jeremias@wilckeweb.org</a>.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex items-center justify-center gap-2 w-full font-semibold text-[0.95rem] px-8 py-3.5 rounded-full
                    bg-coral text-white hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,125,115,0.3)]
                    transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {status === "sending" ? "Wird gesendet..." : (
                    <>
                      {type === "buchung" ? "Projekt anfragen" : "Nachricht senden"}
                      <ArrowRightIcon />
                    </>
                  )}
                </button>

                <p className="text-[0.75rem] text-white/30 text-center leading-relaxed">
                  Ihre Daten werden nur zur Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben.
                </p>
              </form>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
