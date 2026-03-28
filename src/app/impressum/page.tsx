import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Impressum — WilckeWeb",
};

export default function Impressum() {
  return (
    <>
      <Header />
      <main className="pt-[140px] max-md:pt-[100px] pb-20">
        <div className="max-w-[800px] mx-auto px-6">
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight mb-10">
            Impressum
          </h1>

          <div className="space-y-8 text-text-soft text-[0.95rem] leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-text mb-3">Angaben gem. &sect; 5 E-Commerce-Gesetz (ECG)</h2>
              <p>
                <strong>Jeremias Wilcke</strong><br />
                Einzelunternehmer<br />
                Grenzgasse 4<br />
                3001 Mauerbach<br />
                &Ouml;sterreich
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text mb-3">Kontakt</h2>
              <p>
                Telefon: <a href="tel:+436767923929" className="text-teal hover:underline">+43 676 7923929</a><br />
                E-Mail: <a href="mailto:jeremias@wilckeweb.org" className="text-teal hover:underline">jeremias@wilckeweb.org</a><br />
                Website: <a href="https://wilckeweb.org" className="text-teal hover:underline">wilckeweb.org</a>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text mb-3">Unternehmensgegenstand</h2>
              <p>Webdesign, Webentwicklung und IT-Dienstleistungen.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text mb-3">Umsatzsteuer</h2>
              <p>
                Kleinunternehmer gem. &sect; 6 Abs. 1 Z 27 UStG.
                Es wird keine Umsatzsteuer ausgewiesen.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text mb-3">Anwendbare Rechtsvorschriften</h2>
              <p>
                Gewerbeordnung (GewO), abrufbar unter{" "}
                <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">ris.bka.gv.at</a>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text mb-3">Online-Streitbeilegung</h2>
              <p>
                Verbraucher haben die M&ouml;glichkeit, Beschwerden an die
                Online-Streitbeilegungsplattform der EU zu richten:{" "}
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">
                  ec.europa.eu/consumers/odr
                </a>.
              </p>
              <p className="mt-2">
                Wir sind nicht verpflichtet und nicht bereit, an einem
                Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
                teilzunehmen. Sie k&ouml;nnen sich aber jederzeit direkt an uns wenden.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text mb-3">Haftungsausschluss</h2>
              <h3 className="font-semibold text-text mt-4 mb-1">Haftung f&uuml;r Inhalte</h3>
              <p>
                Die Inhalte dieser Website wurden mit gr&ouml;&szlig;ter Sorgfalt erstellt.
                F&uuml;r die Richtigkeit, Vollst&auml;ndigkeit und Aktualit&auml;t der Inhalte
                kann jedoch keine Gew&auml;hr &uuml;bernommen werden. Als Diensteanbieter
                bin ich gem. &sect; 18 Abs. 1 ECG f&uuml;r eigene Informationen, die ich
                zur Nutzung bereithalte, nach den allgemeinen Gesetzen verantwortlich.
              </p>

              <h3 className="font-semibold text-text mt-4 mb-1">Haftung f&uuml;r Links</h3>
              <p>
                Diese Website enth&auml;lt Links zu externen Websites Dritter, auf deren
                Inhalte ich keinen Einfluss habe. Deshalb kann ich f&uuml;r diese fremden
                Inhalte auch keine Gew&auml;hr &uuml;bernehmen. F&uuml;r die Inhalte der
                verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
                verantwortlich.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-text mb-3">Urheberrecht</h2>
              <p>
                Die durch den Seitenbetreiber erstellten Inhalte und Werke auf dieser
                Website unterliegen dem &ouml;sterreichischen Urheberrecht. Beitr&auml;ge
                Dritter sind als solche gekennzeichnet. Die Vervielf&auml;ltigung,
                Bearbeitung, Verbreitung und jede Art der Verwertung au&szlig;erhalb der
                Grenzen des Urheberrechtes bed&uuml;rfen der schriftlichen Zustimmung des
                jeweiligen Autors bzw. Erstellers.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
