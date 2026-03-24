"use client";

import { useState } from "react";
import { CheckCircle, Mail } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

export function PilotCTA() {
  const t = useTranslations();
  const [submitted, setSubmitted] = useState(false);

  if (!t.cta) return null;

  return (
    <section id="pilot-form" className="py-32 px-8 relative overflow-hidden bg-surface-low">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="text-primary mb-6">
          <Mail size={32} />
        </div>
        <h2 className="text-5xl font-headline font-extrabold text-on-surface mb-6 tracking-tight">
          {t.cta.title}
        </h2>
        <p className="text-xl text-on-surface-variant mb-12">{t.cta.desc}</p>

        <div className="bg-surface p-1 border border-outline-variant/30 rounded-2xl max-w-lg mx-auto shadow-2xl">
          {!submitted ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="flex flex-col md:flex-row gap-2"
            >
              <input
                className="flex-grow bg-background border-none rounded-full text-on-surface px-6 py-4 focus:ring-2 focus:ring-primary text-sm font-medium outline-none"
                placeholder={t.cta.placeholder}
                required
                type="email"
              />
              <button className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold text-sm whitespace-nowrap hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                {t.cta.button}
              </button>
            </form>
          ) : (
            <div className="py-8 px-6 text-primary font-bold text-lg flex flex-col items-center gap-4">
              <CheckCircle size={48} />
              <span>{t.cta.success}</span>
            </div>
          )}
          <p className="text-[11px] text-on-surface-variant font-medium mt-4 pb-3">
            {t.cta.footer}
          </p>
        </div>
      </div>
    </section>
  );
}
