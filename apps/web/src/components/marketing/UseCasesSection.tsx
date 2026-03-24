"use client";

import { Store, Building2, LayoutGrid } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

function CaseCard({
  icon,
  title,
  desc,
  features,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  features: string[];
}) {
  return (
    <div className="group bg-surface-low p-1 rounded-xl transition-all hover:bg-gradient-to-br hover:from-primary/10 hover:to-transparent border border-outline-variant/30 shadow-sm">
      <div className="bg-surface p-8 rounded-[10px] h-full relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
        <div className="text-primary mb-6">{icon}</div>
        <h3 className="text-xl font-bold text-on-surface mb-4">{title}</h3>
        <p className="text-sm text-on-surface-variant leading-relaxed mb-6">{desc}</p>
        <ul className="space-y-3 text-xs text-on-surface/80">
          {features.map((f: string, i: number) => (
            <li key={i} className="flex items-center gap-2 font-medium">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" /> {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function UseCasesSection() {
  const t = useTranslations();
  if (!t.useCases) return null;

  const icons = [<Store key={0} size={40} />, <Building2 key={1} size={40} />, <LayoutGrid key={2} size={40} />];

  return (
    <section id="use-cases" className="py-32 px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-headline font-bold text-on-surface mb-4">
            {t.useCases.title}
          </h2>
          <p className="text-on-surface-variant text-lg">{t.useCases.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.useCases.cards.map((c: { title: string; desc: string; features: string[] }, i: number) => {
            if (i === 2) {
              return (
                <div key={i} className="group relative bg-surface-low p-1 rounded-xl border border-outline-variant/20 overflow-hidden">
                  <div className="absolute inset-0 z-10 bg-surface/85 flex items-center justify-center p-8 text-center backdrop-blur-sm">
                    <div className="flex flex-col items-center">
                      <span className="bg-primary/10 text-primary border border-primary/30 px-4 py-1.5 rounded-full text-[12px] font-black uppercase tracking-widest mb-4">
                        {t.useCases.comingSoon}
                      </span>
                      <h3 className="text-xl font-bold text-on-surface mb-2">{c.title}</h3>
                      <p className="text-sm text-on-surface-variant leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                  <CaseCard icon={icons[i]} title={c.title} desc={c.desc} features={c.features} />
                </div>
              );
            }
            return (
              <CaseCard key={i} icon={icons[i]} title={c.title} desc={c.desc} features={c.features} />
            );
          })}
        </div>
      </div>
    </section>
  );
}
