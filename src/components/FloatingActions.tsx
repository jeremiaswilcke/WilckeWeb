"use client";

import { useState } from "react";

export default function FloatingActions() {
  const [chatOpen, setChatOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [sending, setSending] = useState(false);

  // Chat (Telegram direct)
  const [chatMessage, setChatMessage] = useState("");
  const [chatName, setChatName] = useState("");
  const [chatEmail, setChatEmail] = useState("");
  const [chatSent, setChatSent] = useState(false);
  const [chatSending, setChatSending] = useState(false);

  const waNumber = "436767923929";

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          summary: "",
          total: "",
          monthly: "",
        }),
      });
      if (res.ok) {
        setFormSent(true);
        setFormData({ name: "", email: "", message: "" });
      }
    } finally {
      setSending(false);
    }
  }

  async function handleChatSend() {
    if (!chatMessage.trim() || !chatEmail.trim()) return;
    setChatSending(true);
    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: chatMessage, name: chatName, email: chatEmail }),
      });
      if (res.ok) {
        setChatSent(true);
        setChatMessage("");
      }
    } finally {
      setChatSending(false);
    }
  }

  return (
    <>
      {/* Fixed right sidebar buttons */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-3 pr-4 max-md:pr-2">
        {/* Contact Form Toggle */}
        <button
          onClick={() => { setFormOpen(!formOpen); setChatOpen(false); }}
          className={`group w-12 h-12 max-md:w-10 max-md:h-10 rounded-full flex items-center justify-center
            shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-300
            ${formOpen
              ? "bg-anthracite text-white"
              : "bg-white text-anthracite hover:bg-anthracite hover:text-white hover:scale-110"
            }`}
          aria-label="Kontaktformular"
        >
          {formOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          )}
        </button>

        {/* Chat (Telegram) Toggle */}
        <button
          onClick={() => { setChatOpen(!chatOpen); setFormOpen(false); }}
          className={`group w-12 h-12 max-md:w-10 max-md:h-10 rounded-full flex items-center justify-center
            shadow-[0_4px_20px_rgba(86,160,168,0.3)] transition-all duration-300
            ${chatOpen
              ? "bg-teal-dark text-white"
              : "bg-teal text-white hover:scale-110 hover:shadow-[0_6px_28px_rgba(86,160,168,0.5)]"
            }`}
          aria-label="Kontakt über Telegram"
        >
          {chatOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          )}
        </button>

        {/* WhatsApp Link */}
        <a
          href={`https://wa.me/${waNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 max-md:w-10 max-md:h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center
            shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:scale-110 hover:shadow-[0_6px_28px_rgba(37,211,102,0.5)]
            transition-all duration-300"
          aria-label="WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>

      {/* Chat Flyout (Telegram-powered) */}
      {chatOpen && (
        <div className="fixed right-20 max-md:right-16 top-1/2 -translate-y-1/2 z-[99] animate-scaleIn">
          <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] border border-line w-[320px] overflow-hidden">
            <div className="bg-teal text-white px-5 py-4">
              <div className="font-bold text-[0.95rem]">Kontakt über Telegram</div>
              <div className="text-white/80 text-[0.8rem]">Antwort meistens innerhalb einer Stunde</div>
            </div>
            <div className="p-5">
              {chatSent ? (
                <div className="py-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-teal/10 text-teal flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-semibold text-text">Nachricht gesendet!</p>
                  <p className="text-muted text-[0.85rem] mt-1">Wir antworten so schnell wie m&ouml;glich.</p>
                  <button
                    onClick={() => setChatSent(false)}
                    className="mt-3 text-[0.82rem] text-teal font-semibold hover:underline"
                  >
                    Weitere Nachricht senden
                  </button>
                </div>
              ) : (
                <div className="grid gap-3">
                  <div className="bg-bg-soft rounded-xl p-3">
                    <p className="text-[0.82rem] text-text leading-relaxed">
                      Schreiben Sie uns direkt — Ihre Nachricht kommt sofort an.
                    </p>
                  </div>
                  <input
                    type="text"
                    value={chatName}
                    onChange={(e) => setChatName(e.target.value)}
                    placeholder="Ihr Name (optional)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-line-strong bg-white text-text text-[0.85rem]
                      focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all duration-300"
                  />
                  <input
                    type="email"
                    required
                    value={chatEmail}
                    onChange={(e) => setChatEmail(e.target.value)}
                    placeholder="Ihre E-Mail-Adresse"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-line-strong bg-white text-text text-[0.85rem]
                      focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all duration-300"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && chatMessage.trim()) handleChatSend();
                      }}
                      placeholder="Ihre Nachricht..."
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-line-strong bg-white text-text text-[0.85rem]
                        focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all duration-300"
                    />
                    <button
                      onClick={handleChatSend}
                      disabled={chatSending || !chatMessage.trim() || !chatEmail.trim()}
                      className="w-11 h-11 shrink-0 rounded-full bg-teal text-white flex items-center justify-center
                        hover:scale-105 hover:shadow-[0_4px_16px_rgba(86,160,168,0.4)]
                        transition-all duration-300 disabled:opacity-40"
                    >
                      {chatSending ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Flyout */}
      {formOpen && (
        <div className="fixed right-20 max-md:right-16 top-1/2 -translate-y-1/2 z-[99] animate-scaleIn">
          <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] border border-line w-[320px] overflow-hidden">
            <div className="bg-anthracite text-white px-5 py-4">
              <div className="font-bold text-[0.95rem]">Schnellanfrage</div>
              <div className="text-white/60 text-[0.8rem]">Wir melden uns in K&uuml;rze</div>
            </div>

            <div className="p-5">
              {formSent ? (
                <div className="py-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-teal/10 text-teal flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-semibold text-text">Gesendet!</p>
                  <p className="text-muted text-[0.85rem] mt-1">Wir melden uns bald bei Ihnen.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="grid gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Ihr Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-line-strong bg-white text-text text-[0.88rem]
                      focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all duration-300"
                  />
                  <input
                    type="email"
                    required
                    placeholder="E-Mail"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-line-strong bg-white text-text text-[0.88rem]
                      focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all duration-300"
                  />
                  <textarea
                    required
                    rows={3}
                    placeholder="Wie können wir helfen?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-line-strong bg-white text-text text-[0.88rem] resize-none
                      focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all duration-300"
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-2.5 rounded-full bg-teal text-white font-semibold text-[0.88rem]
                      hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(86,160,168,0.3)]
                      transition-all duration-300 disabled:opacity-50"
                  >
                    {sending ? "Wird gesendet..." : "Nachricht senden"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Backdrop for mobile */}
      {(chatOpen || formOpen) && (
        <div
          className="fixed inset-0 z-[98] bg-black/20 backdrop-blur-[2px] md:hidden"
          onClick={() => { setChatOpen(false); setFormOpen(false); }}
        />
      )}
    </>
  );
}
