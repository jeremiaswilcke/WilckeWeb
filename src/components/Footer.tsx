import Image from "next/image";

export default function Footer() {
  return (
    <footer className="pt-16 pb-10 border-t border-line">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex justify-between items-start gap-12 flex-wrap max-md:flex-col max-md:gap-8">
          <div>
            <Image
              src="/wilckeweb_logo.png"
              alt="WilckeWeb"
              width={140}
              height={35}
              className="h-8 w-auto mb-3"
            />
            <p className="text-muted text-[0.88rem] max-w-[280px] leading-relaxed">
              Moderne Websites — klar geplant, fair kalkuliert, individuell
              umgesetzt.
            </p>
          </div>

          <div className="flex gap-12 max-md:flex-col max-md:gap-8">
            <div>
              <h4 className="text-[0.82rem] font-bold uppercase tracking-[0.1em] text-muted mb-4">
                Navigation
              </h4>
              <nav className="flex flex-col gap-1">
                <a href="#leistungen" className="text-[0.9rem] text-text-soft hover:text-coral transition-colors py-1">Leistungen</a>
                <a href="#ablauf" className="text-[0.9rem] text-text-soft hover:text-coral transition-colors py-1">Ablauf</a>
                <a href="#rechner" className="text-[0.9rem] text-text-soft hover:text-coral transition-colors py-1">Preisrechner</a>
                <a href="#beispiele" className="text-[0.9rem] text-text-soft hover:text-coral transition-colors py-1">Beispiele</a>
                <a href="#kontakt" className="text-[0.9rem] text-text-soft hover:text-coral transition-colors py-1">Kontakt</a>
              </nav>
            </div>
            <div>
              <h4 className="text-[0.82rem] font-bold uppercase tracking-[0.1em] text-muted mb-4">
                Kontakt
              </h4>
              <a href="mailto:jeremias@wilckeweb.org" className="text-[0.9rem] text-text-soft hover:text-coral transition-colors">
                jeremias@wilckeweb.org
              </a>
            </div>
            <div>
              <h4 className="text-[0.82rem] font-bold uppercase tracking-[0.1em] text-muted mb-4">
                Rechtliches
              </h4>
              <nav className="flex flex-col gap-1">
                <a href="#" className="text-[0.9rem] text-text-soft hover:text-coral transition-colors py-1">Impressum</a>
                <a href="#" className="text-[0.9rem] text-text-soft hover:text-coral transition-colors py-1">Datenschutz</a>
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-line flex justify-between items-center gap-6 flex-wrap max-md:flex-col max-md:text-center text-[0.82rem] text-muted">
          <span>&copy; 2026 WilckeWeb. Alle Rechte vorbehalten.</span>
        </div>
      </div>
    </footer>
  );
}
