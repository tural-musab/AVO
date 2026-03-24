"use client";

import { useState, useEffect } from "react";
import { Globe, Sun, Moon, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

type Locale = "en" | "tr" | "ru" | "az";

const LANGUAGES: { code: Locale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
  { code: "ru", label: "Русский" },
  { code: "az", label: "Azərbaycan" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [lang, setLang] = useState<Locale>("en");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [navLabels, setNavLabels] = useState({
    howItWorks: "How it works",
    useCases: "Use cases",
    integrations: "Integrations",
    bookPilot: "Book a pilot",
    tagline: "Adaptive Venue Orchestration",
  });

  useEffect(() => {
    const saved = localStorage.getItem("avo_lang") as Locale;
    if (saved && ["en", "tr", "ru", "az"].includes(saved)) setLang(saved);
    const savedTheme = localStorage.getItem("avo_theme") as "dark" | "light";
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("avo_lang", lang);
    window.dispatchEvent(new CustomEvent("avo:locale-change", { detail: lang }));
    import(`@/messages/${lang}.json`).then((m) => {
      setNavLabels(m.default.nav);
    });
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("avo_theme", theme);
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-outline-variant/30 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center w-full">
        <div className="flex items-center gap-4">
          <Logo className="w-12 h-12" />
          <div className="flex flex-col">
            <span className="text-on-surface font-headline font-black text-2xl tracking-tighter leading-none">
              AVO
            </span>
            <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-[0.2em] leading-none">
              {navLabels.tagline}
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {(["howItWorks", "useCases", "integrations"] as const).map((key) => (
            <a
              key={key}
              href={`#${key === "howItWorks" ? "how-it-works" : key === "useCases" ? "use-cases" : "integrations"}`}
              className="font-headline font-semibold tracking-tight text-on-surface-variant hover:text-primary transition-colors"
            >
              {navLabels[key]}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="p-2 rounded-full bg-surface-high/50 text-on-surface hover:bg-surface-high transition-colors border border-outline-variant/30 flex items-center gap-2"
            >
              <Globe size={18} />
              <span className="text-xs font-bold uppercase hidden sm:inline">{lang}</span>
            </button>
            {showLangMenu && (
              <div className="absolute top-full right-0 mt-2 bg-surface border border-outline-variant/30 rounded-xl shadow-xl overflow-hidden min-w-[120px]">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-bold transition-colors hover:bg-primary/10 ${
                      lang === l.code ? "text-primary" : "text-on-surface"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-surface-high/50 text-on-surface hover:bg-surface-high transition-colors border border-outline-variant/30"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* CTA */}
          <a
            href="#pilot-form"
            className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-bold text-sm tracking-tight transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/20 inline-block"
          >
            {navLabels.bookPilot}
          </a>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-on-surface"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-background border-b border-outline-variant/30 p-8 flex flex-col gap-6 md:hidden z-40 shadow-xl">
          <a href="#how-it-works" onClick={() => setIsOpen(false)} className="text-lg font-semibold text-on-surface">{navLabels.howItWorks}</a>
          <a href="#use-cases" onClick={() => setIsOpen(false)} className="text-lg font-semibold text-on-surface">{navLabels.useCases}</a>
          <a href="#integrations" onClick={() => setIsOpen(false)} className="text-lg font-semibold text-on-surface">{navLabels.integrations}</a>
        </div>
      )}
    </nav>
  );
}
