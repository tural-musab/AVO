"use client";

import { Mail } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useTranslations } from "@/hooks/useTranslations";

export function Footer() {
  const t = useTranslations();
  if (!t.footer) return null;

  return (
    <footer className="bg-surface-low py-24 px-8 w-full border-t border-outline-variant/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <Logo className="w-14 h-14" />
            <div className="flex flex-col">
              <span className="text-3xl font-black text-on-surface font-headline tracking-tighter leading-none">
                AVO
              </span>
              <span className="text-[11px] text-primary font-bold uppercase tracking-[0.2em] leading-none mt-1">
                {t.nav?.tagline || "Adaptive Venue Orchestration"}
              </span>
            </div>
          </div>
          <p className="text-primary/80 text-sm font-bold mb-6 tracking-tight uppercase">
            {t.footer.tagline}
          </p>
          <p className="font-body text-base tracking-wide text-on-surface/70 max-w-sm mb-10 leading-relaxed">
            {t.footer.desc}
          </p>
          <div className="text-on-surface/40 text-sm">{t.footer.rights}</div>
        </div>

        <div className="flex flex-col md:items-end justify-between">
          <div className="grid grid-cols-2 gap-16 mb-16">
            <div className="space-y-6">
              <h5 className="text-on-surface text-sm font-bold uppercase tracking-widest border-b border-outline-variant/10 pb-2">
                {t.footer.platform}
              </h5>
              <ul className="space-y-3">
                <li>
                  <a href="#how-it-works" className="text-on-surface/60 text-sm hover:text-primary transition-colors">
                    {t.nav?.howItWorks || "How it works"}
                  </a>
                </li>
                <li>
                  <a href="#use-cases" className="text-on-surface/60 text-sm hover:text-primary transition-colors">
                    {t.nav?.useCases || "Use cases"}
                  </a>
                </li>
                <li>
                  <a href="#integrations" className="text-on-surface/60 text-sm hover:text-primary transition-colors">
                    {t.nav?.integrations || "Integrations"}
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h5 className="text-on-surface text-sm font-bold uppercase tracking-widest border-b border-outline-variant/10 pb-2">
                {t.footer.company}
              </h5>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-on-surface/60 text-sm hover:text-primary transition-colors">
                    {t.footer.privacy}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-on-surface/60 text-sm hover:text-primary transition-colors">
                    {t.footer.terms}
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@avo-tech.io" className="text-on-surface/60 text-sm hover:text-primary transition-colors">
                    {t.footer.contact}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <a
            href="mailto:hello@avo-tech.io"
            className="text-on-surface font-bold text-sm bg-surface-high/20 px-6 py-3 rounded-full border border-outline-variant/10 flex items-center gap-3 hover:bg-surface-high/30 transition-colors"
          >
            <Mail size={18} />
            hello@avo-tech.io
          </a>
        </div>
      </div>
    </footer>
  );
}
