"use client";

import { Store, Building2, LayoutGrid, CheckCircle } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

const CARD_ICONS = [Store, Building2, LayoutGrid];

export function UseCasesSection() {
  const t = useTranslations();
  if (!t.useCases?.cards) return null;

  return (
    <section
      id="use-cases"
      className="py-24 px-6"
      style={{ background: "var(--surface-variant)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-3xl lg:text-5xl font-extrabold tracking-tighter mb-4"
            style={{ color: "var(--text)", fontFamily: "var(--font-manrope)" }}
          >
            {t.useCases.title}
          </h2>
          <p className="text-lg" style={{ color: "var(--text-muted)" }}>
            {t.useCases.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.useCases.cards.map(
            (
              card: { title: string; desc: string; features: string[] },
              i: number
            ) => {
              const Icon = CARD_ICONS[i] || Store;
              const isComingSoon = i === 2;
              return (
                <div
                  key={i}
                  className="glass-card p-8 flex flex-col gap-5 relative"
                >
                  {isComingSoon && (
                    <span
                      className="absolute top-4 right-4 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest"
                      style={{
                        background: "var(--accent-muted)",
                        color: "var(--accent)",
                      }}
                    >
                      {t.useCases.comingSoon}
                    </span>
                  )}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: "var(--primary-muted)", color: "var(--primary)" }}
                  >
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: "var(--text)", fontFamily: "var(--font-manrope)" }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {card.desc}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {card.features.map((f: string) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <CheckCircle
                          size={14}
                          style={{ color: "var(--primary)", flexShrink: 0 }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
