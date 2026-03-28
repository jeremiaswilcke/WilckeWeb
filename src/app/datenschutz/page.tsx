import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutzerkl\u00e4rung — WilckeWeb",
};

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-bg">
      <header className="bg-surface border-b border-line py-5 px-6">
        <div className="max-w-[900px] mx-auto flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight text-anthracite">
            WilckeWeb
          </Link>
          <Link href="/impressum" className="text-sm text-muted hover:text-teal transition-colors">
            Impressum
          </Link>
        </div>
      </header>

      <main className="max-w-[900px] mx-auto px-6 py-16">
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight mb-10">
          Datenschutzerkl&auml;rung
        </h1>

        <div className="prose-custom space-y-8 text-text-soft text-[0.95rem] leading-relaxed">
          <section>
            <h2>1. Verantwortlicher</h2>
            <p>
              <strong>Jeremias Wilcke</strong><br />
              Grenzgasse 4, 3001 Mauerbach, &Ouml;sterreich<br />
              E-Mail: <a href="mailto:jeremias@wilckeweb.org" className="text-teal hover:underline">jeremias@wilckeweb.org</a><br />
              Telefon: +43 676 7923929
            </p>
          </section>

          <section>
            <h2>2. &Uuml;berblick der Verarbeitungen</h2>
            <p>
              Die nachfolgende &Uuml;bersicht fasst die Arten der verarbeiteten Daten
              und die Zwecke ihrer Verarbeitung zusammen und verweist auf die
              betroffenen Personen.
            </p>
            <h3>Arten der verarbeiteten Daten</h3>
            <ul>
              <li>Kontaktdaten (Name, E-Mail-Adresse, Telefonnummer)</li>
              <li>Inhaltsdaten (Eingaben im Kontaktformular, Projektkonfiguration)</li>
              <li>Nutzungsdaten (besuchte Seiten, Zugriffszeit)</li>
              <li>Meta-/Kommunikationsdaten (IP-Adresse, Ger&auml;teinformationen)</li>
            </ul>
          </section>

          <section>
            <h2>3. Rechtsgrundlagen</h2>
            <p>
              Die Verarbeitung personenbezogener Daten erfolgt auf Basis der
              Datenschutz-Grundverordnung (DSGVO) und des &ouml;sterreichischen
              Datenschutzgesetzes (DSG). Im Einzelnen gelten folgende Rechtsgrundlagen:
            </p>
            <ul>
              <li><strong>Einwilligung (Art. 6 Abs. 1 lit. a DSGVO):</strong> Wenn Sie uns Ihre Einwilligung zur Verarbeitung erteilen, z.B. f&uuml;r nicht-essenzielle Cookies.</li>
              <li><strong>Vertragserf&uuml;llung (Art. 6 Abs. 1 lit. b DSGVO):</strong> Wenn die Verarbeitung zur Erf&uuml;llung eines Vertrags oder vorvertraglicher Ma&szlig;nahmen erforderlich ist, z.B. bei einer Projektanfrage.</li>
              <li><strong>Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO):</strong> Wenn die Verarbeitung zur Wahrung unserer berechtigten Interessen erforderlich ist, z.B. f&uuml;r die Sicherheit und Optimierung unserer Website.</li>
            </ul>
          </section>

          <section>
            <h2>4. Kontaktformular und Projektanfragen</h2>
            <p>
              Wenn Sie das Kontaktformular nutzen oder eine Projektanfrage stellen,
              werden folgende Daten verarbeitet:
            </p>
            <ul>
              <li>Name, E-Mail-Adresse, optional Telefonnummer</li>
              <li>Ihre Nachricht und die Projektkonfiguration aus dem Preisrechner</li>
            </ul>
            <p>
              <strong>Zweck:</strong> Bearbeitung Ihrer Anfrage und Kommunikation zu Ihrem Projekt.<br />
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Ma&szlig;nahmen).<br />
              <strong>Speicherdauer:</strong> Ihre Daten werden nach Abschluss der Anfrage bzw. des Projekts und nach Ablauf gesetzlicher Aufbewahrungsfristen (7 Jahre gem. BAO) gel&ouml;scht.<br />
              <strong>E-Mail-Versand:</strong> Best&auml;tigungs- und Benachrichtigungsmails werden &uuml;ber SMTP (IONOS SE, Elgendorfer Str. 57, 56410 Montabaur) versendet.
            </p>
          </section>

          <section>
            <h2>5. Kundenportal</h2>
            <p>
              Nach einer Projektanfrage erhalten Sie einen personalisierten Link zu
              Ihrem Projektportal. Dort k&ouml;nnen Sie den Fortschritt Ihres Projekts
              einsehen und R&uuml;ckfragen stellen. Der Zugriff erfolgt &uuml;ber einen
              einzigartigen Token — es wird kein Benutzerkonto ben&ouml;tigt.
            </p>
            <p>
              <strong>Zweck:</strong> Transparente Projektkommunikation.<br />
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO.<br />
              <strong>Gespeicherte Daten:</strong> Name, Projektstatus, Konfiguration (in WordPress auf Servern der IONOS SE).
            </p>
          </section>

          <section>
            <h2>6. Hosting und Content Delivery</h2>
            <p>
              Diese Website wird &uuml;ber <strong>Vercel Inc.</strong> (440 N Barranca Ave #4133,
              Covina, CA 91723, USA) gehostet. Beim Aufruf der Website werden
              automatisch Zugriffsdaten (IP-Adresse, Zeitpunkt, aufgerufene Seite,
              Browser-Typ) an Vercel &uuml;bermittelt.
            </p>
            <p>
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer stabilen und sicheren Bereitstellung).<br />
              <strong>Drittlandtransfer:</strong> Vercel verarbeitet Daten in der EU und den USA. Die &Uuml;bermittlung in die USA erfolgt auf Basis des EU-U.S. Data Privacy Framework.
            </p>
          </section>

          <section>
            <h2>7. WordPress Backend</h2>
            <p>
              Als Content-Management-System wird <strong>WordPress</strong> auf Servern der
              IONOS SE (Elgendorfer Str. 57, 56410 Montabaur, Deutschland) betrieben.
              Dort werden Projektanfragen und Inhaltsdaten gespeichert.
            </p>
            <p>
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b und f DSGVO.<br />
              <strong>Serverstandort:</strong> Deutschland (EU).
            </p>
          </section>

          <section>
            <h2>8. Google Fonts</h2>
            <p>
              Diese Website nutzt <strong>Google Fonts</strong> zur einheitlichen
              Schriftdarstellung. Beim Aufruf der Website werden Schriftarten
              von Servern von Google LLC (1600 Amphitheatre Parkway, Mountain View,
              CA 94043, USA) geladen. Dabei wird Ihre IP-Adresse an Google &uuml;bermittelt.
            </p>
            <p>
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO.<br />
              <strong>Drittlandtransfer:</strong> EU-U.S. Data Privacy Framework.<br />
              <strong>Datenschutzerkl&auml;rung Google:</strong>{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
                policies.google.com/privacy
              </a>
            </p>
          </section>

          <section>
            <h2>9. WhatsApp-Kontakt</h2>
            <p>
              Diese Website enth&auml;lt einen Link zur Kontaktaufnahme &uuml;ber
              WhatsApp (Meta Platforms Ireland Ltd.). Beim Klick auf den
              WhatsApp-Button werden Sie zu WhatsApp weitergeleitet. Eine
              Daten&uuml;bermittlung findet erst statt, wenn Sie den Link aktiv anklicken.
            </p>
            <p>
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung durch aktive Nutzung).
            </p>
          </section>

          <section>
            <h2>10. Cookies</h2>
            <p>
              Diese Website verwendet Cookies. Cookies sind kleine Textdateien, die
              auf Ihrem Endger&auml;t gespeichert werden.
            </p>
            <h3>Essenzielle Cookies</h3>
            <p>
              Diese Cookies sind f&uuml;r den Betrieb der Website technisch notwendig
              und k&ouml;nnen nicht deaktiviert werden. Sie speichern z.B. Ihre
              Cookie-Einstellungen.
            </p>
            <h3>Analyse-Cookies (optional)</h3>
            <p>
              Sofern Sie zustimmen, setzen wir Cookies zur Analyse des
              Nutzerverhaltens ein. Diese helfen uns, die Website zu verbessern.
              Sie k&ouml;nnen Ihre Einwilligung jederzeit &uuml;ber den Cookie-Banner widerrufen.
            </p>
            <p>
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) f&uuml;r optionale Cookies;
              Art. 6 Abs. 1 lit. f DSGVO f&uuml;r essenzielle Cookies.
            </p>
          </section>

          <section>
            <h2>11. Ihre Rechte</h2>
            <p>Sie haben gem&auml;&szlig; DSGVO folgende Rechte:</p>
            <ul>
              <li><strong>Auskunft</strong> (Art. 15 DSGVO): Welche Daten &uuml;ber Sie gespeichert sind.</li>
              <li><strong>Berichtigung</strong> (Art. 16 DSGVO): Unrichtige Daten korrigieren lassen.</li>
              <li><strong>L&ouml;schung</strong> (Art. 17 DSGVO): Daten l&ouml;schen lassen, sofern keine Aufbewahrungspflicht besteht.</li>
              <li><strong>Einschr&auml;nkung</strong> (Art. 18 DSGVO): Verarbeitung einschr&auml;nken lassen.</li>
              <li><strong>Daten&uuml;bertragbarkeit</strong> (Art. 20 DSGVO): Ihre Daten in einem g&auml;ngigen Format erhalten.</li>
              <li><strong>Widerspruch</strong> (Art. 21 DSGVO): Der Verarbeitung widersprechen.</li>
              <li><strong>Widerruf der Einwilligung</strong> (Art. 7 Abs. 3 DSGVO): Erteilte Einwilligungen jederzeit widerrufen.</li>
            </ul>
            <p>
              Zur Aus&uuml;bung Ihrer Rechte wenden Sie sich an:{" "}
              <a href="mailto:jeremias@wilckeweb.org" className="text-teal hover:underline">jeremias@wilckeweb.org</a>
            </p>
          </section>

          <section>
            <h2>12. Beschwerderecht</h2>
            <p>
              Sie haben das Recht, sich bei der zust&auml;ndigen Aufsichtsbeh&ouml;rde zu beschweren:
            </p>
            <p>
              <strong>&Ouml;sterreichische Datenschutzbeh&ouml;rde</strong><br />
              Barichgasse 40-42, 1030 Wien<br />
              Telefon: +43 1 52 152-0<br />
              E-Mail: dsb@dsb.gv.at<br />
              Website: <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">dsb.gv.at</a>
            </p>
          </section>

          <section>
            <h2>13. Aktualit&auml;t</h2>
            <p>
              Diese Datenschutzerkl&auml;rung ist aktuell g&uuml;ltig und hat den Stand M&auml;rz 2026.
              Wir behalten uns vor, die Datenschutzerkl&auml;rung zu &auml;ndern, um sie an
              ge&auml;nderte Rechtslagen oder Dienst&auml;nderungen anzupassen.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
