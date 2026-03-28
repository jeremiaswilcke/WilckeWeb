"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { href: "/#leistungen", label: "Leistungen" },
  { href: "/#ablauf", label: "So funktioniert's" },
  { href: "/#rechner", label: "Preisrechner" },
  { href: "/#technologie", label: "Technologie" },
  { href: "/#beispiele", label: "Referenz" },
  { href: "/#ueber-mich", label: "Über mich" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/85 backdrop-blur-xl shadow-[0_1px_0_var(--color-line)]"
          : ""
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between gap-8">
        <a href="/" className="flex-shrink-0">
          <Image
            src="/wilckeweb_logo.png"
            alt="WilckeWeb"
            width={200}
            height={50}
            className="h-12 w-auto drop-shadow-[0_2px_8px_rgba(86,160,168,0.15)] hover:drop-shadow-[0_4px_16px_rgba(86,160,168,0.25)] transition-all duration-300"
            priority
          />
        </a>

        {/* Desktop Nav */}
        <nav
          className={`
            flex items-center gap-9
            max-md:fixed max-md:top-0 max-md:right-0 max-md:bottom-0 max-md:w-[280px]
            max-md:bg-bg max-md:flex-col max-md:items-start max-md:pt-20 max-md:px-8 max-md:gap-6
            max-md:shadow-[-8px_0_32px_rgba(0,0,0,0.1)] max-md:z-[99]
            max-md:transition-transform max-md:duration-300
            ${menuOpen ? "max-md:translate-x-0" : "max-md:translate-x-full"}
          `}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="text-[0.92rem] font-medium text-text-soft hover:text-text transition-colors relative
                after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-teal
                hover:after:w-full after:transition-all after:duration-300
                max-md:text-base"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#kontakt"
            onClick={handleNavClick}
            className="text-[0.88rem] font-semibold px-6 py-2.5 rounded-full bg-teal text-white
              hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(86,160,168,0.3)]
              transition-all duration-300 max-md:mt-4"
          >
            Projekt planen
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="hidden max-md:flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-[101]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü"
        >
          <span
            className={`block w-[22px] h-[2px] bg-text transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[5px]" : ""
            }`}
          />
          <span
            className={`block w-[22px] h-[2px] bg-text transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-[22px] h-[2px] bg-text transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[5px]" : ""
            }`}
          />
        </button>
      </div>
    </header>
  );
}
