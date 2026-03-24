"use client";

import { QrCode, Route, RefreshCw, CreditCard, CheckCircle } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

function FlowStep({
  icon,
  label,
  value,
  color = "primary",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="relative z-10">
      <div
        className={`bg-surface border-l-4 ${
          color === "orange" ? "border-orange-400" : "border-primary"
        } p-4 rounded-r-lg flex items-center gap-4 w-full shadow-sm transition-all hover:shadow-md`}
      >
        <div className={color === "orange" ? "text-orange-400" : "text-primary"}>
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
            {label}
          </span>
          <span className="text-sm font-bold text-on-surface">{value}</span>
        </div>
      </div>
      {label !== "Outcome" && (
        <div className="absolute left-6 top-full w-[2px] h-8 bg-primary/20" />
      )}
    </div>
  );
}

export function HeroSection() {
  const t = useTranslations();
  if (!t.hero) return null;

  const flowSteps = [
    { icon: <QrCode size={20} />, label: t.hero?.flow?.labels?.state || "State", value: t.hero?.flow?.state || "" },
    { icon: <Route size={20} />, label: t.hero?.flow?.labels?.routing || "Routing", value: t.hero?.flow?.routing || "" },
    { icon: <RefreshCw size={20} />, label: t.hero?.flow?.labels?.system || "System", value: t.hero?.flow?.system || "" },
    { icon: <CreditCard size={20} />, label: t.hero?.flow?.labels?.transaction || "Transaction", value: t.hero?.flow?.transaction || "", color: "orange" },
    { icon: <CheckCircle size={20} />, label: t.hero?.flow?.labels?.outcome || "Outcome", value: t.hero?.flow?.outcome || "" },
  ];

  return (
    <section className="relative pt-32 pb-32 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left: Copy */}
        <div className="lg:col-span-7">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[11px] font-bold tracking-[0.1em] uppercase mb-6 rounded-sm border border-primary/20">
            {t.hero.badge}
          </span>
          <h1 className="text-5xl lg:text-7xl font-headline font-extrabold tracking-tighter leading-[1.05] text-on-surface mb-8">
            {t.hero.title}{" "}
            <span className="gradient-text">{t.hero.titleAccent}</span>
          </h1>
          <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed mb-10">
            {t.hero.desc}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#pilot-form"
              className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold text-base transition-all hover:opacity-90 hover:shadow-xl hover:shadow-primary/25"
            >
              {t.hero.ctaPrimary}
            </a>
            <a
              href="#how-it-works"
              className="border border-outline-variant text-on-surface px-8 py-4 rounded-full font-bold text-base hover:bg-surface-low transition-colors inline-block"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Right: Flow Visualization */}
        <div className="lg:col-span-5 relative">
          <div className="relative p-8 bg-surface-low rounded-2xl border border-outline-variant/30 shadow-2xl flex flex-col gap-8">
            {flowSteps.map((step, i) => (
              <FlowStep key={i} {...step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
