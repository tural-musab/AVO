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
    // Dispatch event so other components can react
    window.dispatchEvent(new CustomEvent("avo:locale-change", { detail: lang }));
    // Load labels
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
          ? "backdrop-blur-xl border-b py-3"
          : "bg-transparent py-5"
      }`}
      style={{
        backgroundColor: isScrolled ? "rgba(10,15,26,0.85)" : "transparent",
        borderColor: isScrolled ? "var(--border)" : "transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Logo className="w-12 h-12" />
          <div className="flex flex-col">
            <span
              className="font-black text-2xl tracking-tighter leading-none"
              style={{ color: "var(--text)", fontFamily: "var(--font-manrope)" }}
            >
              AVO
            </span>
            <span
              className="text-[10px] font-bold uppercase leading-none"
              style={{
                color: "var(--text-muted)",
                letterSpacing: "0.2em",
                fontFamily: "var(--font-manrope)",
              }}
            >
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
              className="font-semibold tracking-tight transition-colors hover:opacity-100"
              style={{
                color: "var(--text-muted)",
                fontFamily: "var(--font-manrope)",
              }}
            >
              {navLabels[key]}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="p-2 rounded-full flex items-center gap-2 transition-colors"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid var(--border)",
                color: "var(--text)",
              }}
            >
              <Globe size={18} />
              <span className="text-xs font-bold uppercase hidden sm:inline">{lang}</span>
            </button>
            {showLangMenu && (
              <div
                className="absolute top-full right-0 mt-2 rounded-xl shadow-xl overflow-hidden"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  minWidth: "130px",
                }}
              >
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setShowLangMenu(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm font-bold transition-colors"
                    style={{
                      color: lang === l.code ? "var(--primary)" : "var(--text)",
                      fontFamily: "var(--font-manrope)",
                    }}
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
            className="p-2 rounded-full transition-colors"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid var(--border)",
              color: "var(--text)",
            }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* CTA */}
          <a
            href="#pilot-form"
            className="px-6 py-2.5 rounded-full font-bold text-sm tracking-tight transition-all hover:opacity-90"
            style={{
              background: "var(--primary)",
              color: "#0a0f1a",
              fontFamily: "var(--font-manrope)",
            }}
          >
            {navLabels.bookPilot}
          </a>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
            style={{ color: "var(--text)" }}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="md:hidden absolute top-full left-0 w-full p-8 flex flex-col gap-6 shadow-xl"
          style={{
            background: "var(--background)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <a href="#how-it-works" onClick={() => setIsOpen(false)} style={{ color: "var(--text)", fontFamily: "var(--font-manrope)" }} className="text-lg font-semibold">{navLabels.howItWorks}</a>
          <a href="#use-cases" onClick={() => setIsOpen(false)} style={{ color: "var(--text)", fontFamily: "var(--font-manrope)" }} className="text-lg font-semibold">{navLabels.useCases}</a>
          <a href="#integrations" onClick={() => setIsOpen(false)} style={{ color: "var(--text)", fontFamily: "var(--font-manrope)" }} className="text-lg font-semibold">{navLabels.integrations}</a>
        </div>
      )}
    </nav>
  );
}
