"use client";

import { useTranslations } from "@/hooks/useTranslations";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="pt-20 pb-10 px-6 border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Logo className="w-10 h-10" />
              <span
                className="font-black text-xl tracking-tighter"
                style={{ color: "var(--text)", fontFamily: "var(--font-manrope)" }}
              >
                AVO
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {t.footer.desc}
            </p>
            <p
              className="text-sm font-bold mt-3"
              style={{ color: "var(--primary)", fontFamily: "var(--font-manrope)" }}
            >
              {t.footer.tagline}
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4
              className="font-bold uppercase text-xs tracking-widest mb-4"
              style={{ color: "var(--text-dim)", fontFamily: "var(--font-manrope)" }}
            >
              {t.footer.platform}
            </h4>
            <ul className="space-y-2">
              {["How it works", "Use cases", "Integrations"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm transition-colors hover:opacity-100"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              className="font-bold uppercase text-xs tracking-widest mb-4"
              style={{ color: "var(--text-dim)", fontFamily: "var(--font-manrope)" }}
            >
              {t.footer.company}
            </h4>
            <ul className="space-y-2">
              {[t.footer.privacy, t.footer.terms, t.footer.contact].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm transition-colors hover:opacity-100"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="pt-8 border-t text-center text-xs"
          style={{ borderColor: "var(--border)", color: "var(--text-dim)" }}
        >
          {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
