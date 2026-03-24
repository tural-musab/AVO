"use client";

import { UserX, AlertTriangle, CreditCard, Layers } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

const ICONS = [UserX, AlertTriangle, CreditCard, Layers];

export function ProblemSection() {
  const t = useTranslations();
  if (!t.problem?.items) return null;

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-3xl lg:text-5xl font-extrabold tracking-tighter mb-16 max-w-3xl"
          style={{ color: "var(--text)", fontFamily: "var(--font-manrope)" }}
        >
          {t.problem.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.problem.items.map(
            (item: { title: string; desc: string }, i: number) => {
              const Icon = ICONS[i] || Layers;
              return (
                <div
                  key={i}
                  className="glass-card p-6 flex flex-col gap-4"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "var(--accent-muted)", color: "var(--accent)" }}
                  >
                    <Icon size={20} />
                  </div>
                  <h3
                    className="font-bold text-lg"
                    style={{ color: "var(--text)", fontFamily: "var(--font-manrope)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {item.desc}
                  </p>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
