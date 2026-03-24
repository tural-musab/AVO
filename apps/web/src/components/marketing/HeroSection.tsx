"use client";

import { QrCode, Route, RefreshCw, CreditCard, CheckCircle } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

function FlowStep({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: "var(--primary-muted)", color: "var(--primary)" }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div
          className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
          style={{ color: "var(--text-dim)" }}
        >
          {label}
        </div>
        <div
          className="text-sm font-semibold truncate"
          style={{ color: "var(--text)", fontFamily: "var(--font-manrope)" }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const t = useTranslations();
  if (!t.hero) return null;

  const flowSteps = [
    { icon: <QrCode size={18} />, label: "State", value: t.hero?.flow?.state || "" },
    { icon: <Route size={18} />, label: "Routing", value: t.hero?.flow?.routing || "" },
    { icon: <RefreshCw size={18} />, label: "System", value: t.hero?.flow?.system || "" },
    { icon: <CreditCard size={18} />, label: "Transaction", value: t.hero?.flow?.transaction || "" },
    { icon: <CheckCircle size={18} />, label: "Outcome", value: t.hero?.flow?.outcome || "" },
  ];

  return (
    <section className="relative pt-32 pb-32 px-6 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "var(--primary)" }}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left: Copy */}
        <div className="lg:col-span-7">
          <span
            className="inline-block px-3 py-1 text-[11px] font-bold tracking-[0.1em] uppercase mb-6 rounded-sm"
            style={{
              background: "var(--primary-muted)",
              color: "var(--primary)",
              border: "1px solid rgba(0,194,168,0.2)",
            }}
          >
            {t.hero.badge}
          </span>
          <h1
            className="text-5xl lg:text-7xl font-extrabold tracking-tighter leading-[1.05] mb-8"
            style={{
              color: "var(--text)",
              fontFamily: "var(--font-manrope)",
            }}
          >
            {t.hero.title}{" "}
            <span className="gradient-text">{t.hero.titleAccent}</span>
          </h1>
          <p
            className="text-xl leading-relaxed max-w-2xl mb-10"
            style={{ color: "var(--text-muted)" }}
          >
            {t.hero.desc}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#pilot-form"
              className="px-8 py-4 rounded-full font-bold text-base transition-all hover:opacity-90"
              style={{
                background: "var(--primary)",
                color: "#0a0f1a",
                fontFamily: "var(--font-manrope)",
              }}
            >
              {t.hero.ctaPrimary}
            </a>
            <a
              href="#how-it-works"
              className="px-8 py-4 rounded-full font-bold text-base transition-colors"
              style={{
                border: "1px solid var(--border)",
                color: "var(--text)",
                fontFamily: "var(--font-manrope)",
              }}
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Right: Flow Visualization */}
        <div className="lg:col-span-5">
          <div
            className="relative p-8 rounded-2xl shadow-2xl flex flex-col gap-6"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            {/* Syncing Badge */}
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
              style={{
                background: "var(--accent-muted)",
                color: "var(--accent)",
                border: "1px solid rgba(245,158,11,0.3)",
              }}
            >
              {t.hero?.flow?.syncing || "SYNCHRONIZING"}
            </div>

            {flowSteps.map((step, i) => (
              <FlowStep key={i} {...step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
