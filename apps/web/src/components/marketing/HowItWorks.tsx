"use client";

import { useTranslations } from "@/hooks/useTranslations";

export function HowItWorks() {
  const t = useTranslations();
  if (!t.howItWorks) return null;

  return (
    <section id="how-it-works" className="py-24 px-8 bg-surface-low">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-headline font-bold text-on-surface mb-4">
            {t.howItWorks.title}
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-lg leading-relaxed">
            {t.howItWorks.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {t.howItWorks.steps.map((s: { title: string; desc: string }, i: number) => (
            <div key={i} className="flex-1 z-10">
              <div className="glass-card p-8 rounded-xl border border-outline-variant/30 relative h-full hover:bg-surface transition-colors group overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold mb-6 shadow-lg shadow-primary/20 text-lg">
                  {i + 1}
                </div>
                <h4 className="font-bold text-on-surface mb-4 text-xl">{s.title}</h4>
                <p className="text-base text-on-surface-variant leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
