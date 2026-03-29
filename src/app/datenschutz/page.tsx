import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung von WilckeWeb — Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.",
  alternates: {
    canonical: "https://wilckeweb.org/datenschutz",
  },
  openGraph: {
    title: "Datenschutzerklärung — WilckeWeb",
    description: "Informationen zum Datenschutz bei WilckeWeb gemäß DSGVO.",
    url: "https://wilckeweb.org/datenschutz",
  },
};

export default function Datenschutz() {
  return (
    <>
      <Header />
      <main className="pt-[140px] max-md:pt-[100px] pb-20">
        <div className="max-w-[800px] mx-auto px-6">
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight mb-10">
            Datenschutzerkl&auml;rung
          </h1>

          <div className="space-y-8 text-text-soft text-[0.95rem] leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-text mb-3">1. Verantwortlicher</h2>
              <p>
                <strong>Jeremias Wilcke</strong><br />
                Grenzgasse 4, 3001 Mauerbach, &Ouml;sterreich<br />
                E-Mail: <a href="mailto:jeremias@wilckeweb.org" className="text-teal hover:underline">jeremias@wilckeweb.org</a><br />
                Telefon: +43 676 7923929
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text mb-3">2. &Uuml;berblick der Verarbeitungen</h2>
              <p>
                Die nachfolgende &Uuml;bersicht fasst die Arten der verarbeiteten Daten
                und die Zwecke ihrer Verarbeitung zusammen.
              </p>
              <h3 className="font-semibold text-text mt-4 mb-1">Arten der verarbeiteten Daten</h3>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Kontaktdaten (Name, E-Mail-Adresse, Telefonnummer)</li>
                <li>Inhaltsdaten (Eingaben im Kontaktformular, Projektkonfiguration)</li>
                <li>Nutzungsdaten (besuchte Seiten, Zugriffszeit)</li>
                <li>Meta-/Kommunikationsdaten (IP-Adresse, Ger&auml;teinformationen)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text mb-3">3. Rechtsgrundlagen</h2>
              <p>
                Die Verarbeitung personenbezogener Daten erfolgt auf Basis der
                DSGVO und des &ouml;sterreichischen Datenschutzgesetzes (DSG):
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li><strong>Einwilligung (Art. 6 Abs. 1 lit. a DSGVO):</strong> z.B. f&uuml;r nicht-essenzielle Cookies.</li>
                <li><strong>Vertragserf&uuml;llung (Art. 6 Abs. 1 lit. b DSGVO):</strong> z.B. bei einer Projektanfrage.</li>
                <li><strong>Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO):</strong> z.B. f&uuml;r die Sicherheit und Optimierung der Website.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text mb-3">4. Kontaktformular und Projektanfragen</h2>
              <p>Wenn Sie das Kontaktformular nutzen, werden folgende Daten verarbeitet:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Name, E-Mail-Adresse, optional Telefonnummer</li>
                <li>Ihre Nachricht und die Projektkonfiguration aus dem Preisrechner</li>
              </ul>
              <p className="mt-3">
                <strong>Zweck:</strong> Bearbeitung Ihrer Anfrage und Kommunikation zu Ihrem Projekt.<br />
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Ma&szlig;nahmen).<br />
                <strong>Speicherdauer:</strong> Nach Abschluss der Anfrage und Ablauf gesetzlicher Aufbewahrungsfristen (7 Jahre gem. BAO).<br />
                <strong>E-Mail-Versand:</strong> &Uuml;ber SMTP (IONOS SE, Elgendorfer Str. 57, 56410 Montabaur).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text mb-3">5. Kundenportal</h2>
              <p>
                Nach einer Projektanfrage erhalten Sie einen personalisierten Link zu
                Ihrem Projektportal. Der Zugriff erfolgt &uuml;ber einen einzigartigen Token — es wird kein Benutzerkonto ben&ouml;tigt.
              </p>
              <p className="mt-2">
                <strong>Zweck:</strong> Transparente Projektkommunikation.<br />
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO.<br />
                <strong>Gespeicherte Daten:</strong> Name, Projektstatus, Konfiguration (WordPress auf IONOS SE).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text mb-3">6. Hosting und Content Delivery</h2>
              <p>
                Diese Website wird &uuml;ber <strong>Vercel Inc.</strong> (440 N Barranca Ave #4133,
                Covina, CA 91723, USA) gehostet. Beim Aufruf werden automatisch
                Zugriffsdaten an Vercel &uuml;bermittelt.
              </p>
              <p className="mt-2">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO.<br />
                <strong>Drittlandtransfer:</strong> EU-U.S. Data Privacy Framework.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text mb-3">7. WordPress Backend</h2>
              <p>
                Als CMS wird <strong>WordPress</strong> auf Servern der IONOS SE
                (Deutschland, EU) betrieben.
              </p>
              <p className="mt-2">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b und f DSGVO.<br />
                <strong>Serverstandort:</strong> Deutschland (EU).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text mb-3">8. Google Analytics 4</h2>
              <p>
                Diese Website verwendet <strong>Google Analytics 4</strong> (Google Ireland Limited,
                Gordon House, Barrow Street, Dublin 4, Irland) zur Analyse des Nutzerverhaltens.
                IP-Adressen werden anonymisiert (<code>anonymize_ip: true</code>).
              </p>
              <p className="mt-2">
                Google Analytics setzt Cookies, um wiederkehrende Besucher zu erkennen
                und das Nutzungsverhalten auszuwerten. Die Einbindung erfolgt nur mit
                Ihrer Einwilligung &uuml;ber den Cookie-Banner.
              </p>
              <p className="mt-2">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).<br />
                <strong>Drittlandtransfer:</strong> EU-U.S. Data Privacy Framework.<br />
                <strong>Datenschutz Google:</strong>{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
                  policies.google.com/privacy
                </a><br />
                <strong>Opt-Out:</strong>{" "}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
                  Google Analytics Opt-Out Browser Add-on
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text mb-3">9. Google Fonts</h2>
              <p>
                Diese Website nutzt <strong>Google Fonts</strong>. Beim Aufruf werden
                Schriftarten von Google-Servern geladen. Dabei wird Ihre IP-Adresse
                an Google &uuml;bermittelt.
              </p>
              <p className="mt-2">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO.<br />
                <strong>Drittlandtransfer:</strong> EU-U.S. Data Privacy Framework.<br />
                <strong>Datenschutz Google:</strong>{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
                  policies.google.com/privacy
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text mb-3">10. WhatsApp-Kontakt</h2>
              <p>
                Diese Website enth&auml;lt einen Link zur Kontaktaufnahme &uuml;ber
                WhatsApp (Meta Platforms Ireland Ltd.). Eine Daten&uuml;bermittlung
                findet erst statt, wenn Sie den Link aktiv anklicken.
              </p>
              <p className="mt-2">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung durch aktive Nutzung).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text mb-3">11. Live-Chat (Tawk.to)</h2>
              <p>
                Diese Website nutzt den Live-Chat-Dienst <strong>Tawk.to</strong>
                (Tawk.to Inc., 187 East Warm Springs Rd, Las Vegas, NV 89119, USA).
                Der Chat erm&ouml;glicht die direkte Kommunikation mit uns in Echtzeit.
              </p>
              <p className="mt-2">
                Beim Starten des Chats werden folgende Daten verarbeitet:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>IP-Adresse und Standort (anonymisiert)</li>
                <li>Browser- und Ger&auml;teinformationen</li>
                <li>Chatnachrichten und ggf. eingegebene Kontaktdaten</li>
              </ul>
              <p className="mt-2">
                Tawk.to setzt eigene Cookies, um die Chat-Sitzung aufrechtzuerhalten.
              </p>
              <p className="mt-2">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung durch aktive Nutzung des Chats)
                und Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Ma&szlig;nahmen).<br />
                <strong>Drittlandtransfer:</strong> USA. Tawk.to unterliegt dem EU-U.S. Data Privacy Framework.<br />
                <strong>Datenschutz Tawk.to:</strong>{" "}
                <a href="https://www.tawk.to/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
                  tawk.to/privacy-policy
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text mb-3">12. Cookies</h2>
              <p>Diese Website verwendet Cookies.</p>
              <h3 className="font-semibold text-text mt-4 mb-1">Essenzielle Cookies</h3>
              <p>
                Technisch notwendig f&uuml;r den Betrieb der Website. Speichern z.B. Ihre Cookie-Einstellungen.
              </p>
              <h3 className="font-semibold text-text mt-4 mb-1">Analyse-Cookies (optional)</h3>
              <p>
                Sofern Sie zustimmen, setzen wir Cookies zur Analyse des Nutzerverhaltens ein.
                Sie k&ouml;nnen Ihre Einwilligung jederzeit &uuml;ber den Cookie-Banner widerrufen.
              </p>
              <p className="mt-2">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) f&uuml;r optionale Cookies;
                Art. 6 Abs. 1 lit. f DSGVO f&uuml;r essenzielle Cookies.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text mb-3">13. Ihre Rechte</h2>
              <p>Sie haben gem&auml;&szlig; DSGVO folgende Rechte:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li><strong>Auskunft</strong> (Art. 15 DSGVO)</li>
                <li><strong>Berichtigung</strong> (Art. 16 DSGVO)</li>
                <li><strong>L&ouml;schung</strong> (Art. 17 DSGVO)</li>
                <li><strong>Einschr&auml;nkung</strong> (Art. 18 DSGVO)</li>
                <li><strong>Daten&uuml;bertragbarkeit</strong> (Art. 20 DSGVO)</li>
                <li><strong>Widerspruch</strong> (Art. 21 DSGVO)</li>
                <li><strong>Widerruf der Einwilligung</strong> (Art. 7 Abs. 3 DSGVO)</li>
              </ul>
              <p className="mt-3">
                Kontakt:{" "}
                <a href="mailto:jeremias@wilckeweb.org" className="text-teal hover:underline">jeremias@wilckeweb.org</a>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text mb-3">14. Beschwerderecht</h2>
              <p>
                <strong>&Ouml;sterreichische Datenschutzbeh&ouml;rde</strong><br />
                Barichgasse 40-42, 1030 Wien<br />
                Telefon: +43 1 52 152-0<br />
                E-Mail: dsb@dsb.gv.at<br />
                Website: <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">dsb.gv.at</a>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text mb-3">15. Aktualit&auml;t</h2>
              <p>
                Diese Datenschutzerkl&auml;rung hat den Stand M&auml;rz 2026.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
