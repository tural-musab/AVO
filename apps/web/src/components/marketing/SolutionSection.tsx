"use client";

import { Smartphone, Zap, LayoutGrid, CheckCircle } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

export function SolutionSection() {
  const t = useTranslations();
  if (!t.solution) return null;

  const cardIcons = [<Smartphone key={0} />, <Zap key={1} />, <LayoutGrid key={2} />];

  return (
    <section id="solution" className="py-32 px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <h2 className="text-4xl font-headline font-bold text-on-surface mb-6 leading-tight">
              {t.solution.title}
            </h2>
            <p className="text-on-surface-variant mb-8 text-lg">
              {t.solution.desc}
            </p>
            <div className="p-6 bg-primary/8 border border-primary/20 rounded-xl mb-8">
              <p className="text-primary font-bold text-base italic">
                &quot;{t.solution.quote}&quot;
              </p>
            </div>
            <div className="space-y-4">
              {t.solution.features.map((f: string, i: number) => (
                <div key={i} className="flex items-center gap-4 text-primary">
                  <CheckCircle size={20} />
                  <span className="font-bold text-sm">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.solution.cards.map((c: { title: string; label: string; desc: string }, i: number) => (
              <div
                key={i}
                className={`space-y-6 ${i === 1 ? "md:mt-12" : ""} ${i === 2 ? "md:mt-24" : ""}`}
              >
                <div className="bg-surface aspect-[3/4] rounded-xl overflow-hidden border border-outline-variant/30 shadow-sm flex flex-col p-4 group relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                  <div className="mb-4 text-[10px] font-bold text-primary tracking-widest uppercase">
                    {c.label}
                  </div>
                  <div className="flex-grow bg-surface-low rounded border border-outline-variant/30 p-4 relative overflow-hidden flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-4 border-primary/10 border-t-primary animate-spin" />
                    <div className="text-[10px] font-bold text-primary tracking-tighter mt-4 uppercase">
                      {t.hero?.flow?.syncing || "DATA SYNCHRONIZING"}
                    </div>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-primary">{c.title}</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
