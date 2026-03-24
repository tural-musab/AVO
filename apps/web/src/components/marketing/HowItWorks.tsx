"use client";

import { QrCode, ArrowRight, Monitor, CreditCard } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

const STEP_ICONS = [QrCode, ArrowRight, Monitor, CreditCard];

export function HowItWorks() {
  const t = useTranslations();
  if (!t.howItWorks?.steps) return null;

  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-3xl lg:text-5xl font-extrabold tracking-tighter mb-4"
            style={{ color: "var(--text)", fontFamily: "var(--font-manrope)" }}
          >
            {t.howItWorks.title}
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            {t.howItWorks.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.howItWorks.steps.map(
            (step: { title: string; desc: string }, i: number) => {
              const Icon = STEP_ICONS[i] || QrCode;
              return (
                <div key={i} className="relative">
                  <div className="glass-card p-6 h-full flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black"
                        style={{
                          background: "var(--primary)",
                          color: "#0a0f1a",
                          fontFamily: "var(--font-manrope)",
                        }}
                      >
                        {i + 1}
                      </div>
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: "var(--primary-muted)", color: "var(--primary)" }}
                      >
                        <Icon size={16} />
                      </div>
                    </div>
                    <h3
                      className="font-bold"
                      style={{ color: "var(--text)", fontFamily: "var(--font-manrope)" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {step.desc}
                    </p>
                  </div>
                  {/* Connector line for desktop */}
                  {i < 3 && (
                    <div
                      className="hidden lg:block absolute top-8 -right-3 w-6 h-0.5 z-10"
                      style={{ background: "var(--border)" }}
                    />
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
