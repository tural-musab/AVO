"use client";

import { Hourglass, Zap, CreditCard, Layers } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

const ICONS = [Hourglass, Zap, CreditCard, Layers];

export function ProblemSection() {
  const t = useTranslations();
  if (!t.problem) return null;

  return (
    <section id="problem" className="py-24 px-8 bg-surface-low">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl font-headline font-bold text-on-surface mb-4">
            {t.problem.title}
          </h2>
          <div className="h-1 w-20 bg-primary" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.problem.items.map((p: { title: string; desc: string }, i: number) => {
            const Icon = ICONS[i];
            return (
              <div
                key={i}
                className="p-8 glass-card rounded-lg group relative overflow-hidden transition-all duration-300 h-full hover:-translate-y-1"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                <div className="text-primary mb-6">
                  <Icon />
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-3">{p.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
