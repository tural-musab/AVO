"use client";

import { Zap, Layers, CheckCircle } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

const CARD_ICONS = [Zap, Layers, CheckCircle];

export function SolutionSection() {
  const t = useTranslations();
  if (!t.solution?.cards) return null;

  return (
    <section
      className="py-24 px-6"
      style={{ background: "var(--surface-variant)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Copy */}
          <div>
            <h2
              className="text-3xl lg:text-5xl font-extrabold tracking-tighter mb-6"
              style={{ color: "var(--text)", fontFamily: "var(--font-manrope)" }}
            >
              {t.solution.title}
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
              {t.solution.desc}
            </p>
            <blockquote
              className="pl-4 py-2 text-lg font-bold italic"
              style={{
                borderLeft: "3px solid var(--primary)",
                color: "var(--primary)",
                fontFamily: "var(--font-manrope)",
              }}
            >
              {t.solution.quote}
            </blockquote>
            <div className="flex flex-wrap gap-3 mt-8">
              {t.solution.features?.map((f: string) => (
                <span
                  key={f}
                  className="px-4 py-2 rounded-full text-sm font-bold"
                  style={{
                    background: "var(--primary-muted)",
                    color: "var(--primary)",
                  }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Cards */}
          <div className="flex flex-col gap-4">
            {t.solution.cards.map(
              (card: { title: string; label: string; desc: string }, i: number) => {
                const Icon = CARD_ICONS[i] || Zap;
                return (
                  <div
                    key={i}
                    className="glass-card p-6 flex gap-4"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "var(--primary-muted)", color: "var(--primary)" }}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <div
                        className="text-[10px] font-bold uppercase tracking-widest mb-1"
                        style={{ color: "var(--text-dim)" }}
                      >
                        {card.label}
                      </div>
                      <h3
                        className="font-bold mb-2"
                        style={{ color: "var(--text)", fontFamily: "var(--font-manrope)" }}
                      >
                        {card.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {card.desc}
                      </p>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
