"use client";

import { Smartphone, Bell, Monitor, CreditCard } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

export function IntegrationSection() {
  const t = useTranslations();
  if (!t.integrations) return null;

  return (
    <section id="integrations" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <h2
              className="text-3xl lg:text-5xl font-extrabold tracking-tighter mb-6"
              style={{ color: "var(--text)", fontFamily: "var(--font-manrope)" }}
            >
              {t.integrations.title}
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
              {t.integrations.desc}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card p-4">
                <h4
                  className="font-bold mb-1"
                  style={{ color: "var(--primary)", fontFamily: "var(--font-manrope)" }}
                >
                  {t.integrations.posTitle}
                </h4>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {t.integrations.posDesc}
                </p>
              </div>
              <div className="glass-card p-4">
                <h4
                  className="font-bold mb-1"
                  style={{ color: "var(--primary)", fontFamily: "var(--font-manrope)" }}
                >
                  {t.integrations.fallbackTitle}
                </h4>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {t.integrations.fallbackDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Architecture Diagram */}
          <div
            className="glass-card p-8 flex flex-col gap-6"
          >
            {/* Guest Touchpoints */}
            <div className="text-center">
              <div
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "var(--text-dim)" }}
              >
                {t.integrations.touchpoints}
              </div>
              <div className="flex justify-center gap-4">
                {[Smartphone, Bell, Monitor].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "var(--surface-muted)", color: "var(--text-muted)" }}
                  >
                    <Icon size={18} />
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div
                className="w-0.5 h-8"
                style={{ background: "var(--border)" }}
              />
            </div>

            {/* AVO Core */}
            <div
              className="rounded-xl p-4 text-center"
              style={{
                background: "var(--primary-muted)",
                border: "1px solid rgba(0,194,168,0.3)",
              }}
            >
              <div
                className="font-black text-sm tracking-widest uppercase mb-1"
                style={{ color: "var(--primary)", fontFamily: "var(--font-manrope)" }}
              >
                {t.integrations.orchestration}
              </div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                {t.integrations.orchestrationSub}
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div
                className="w-0.5 h-8"
                style={{ background: "var(--border)" }}
              />
            </div>

            {/* Backend Systems */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: t.integrations.tech?.pos, icon: Monitor },
                { label: t.integrations.tech?.payment, icon: CreditCard },
                { label: t.integrations.tech?.staffApp, icon: Bell },
                { label: t.integrations.tech?.staffView, icon: Smartphone },
              ].map(({ label, icon: Icon }, i) => (
                <div
                  key={i}
                  className="rounded-lg p-3 flex items-center gap-2"
                  style={{
                    background: "var(--surface-muted)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <Icon size={14} style={{ color: "var(--text-dim)" }} />
                  <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Banner */}
        <div
          className="rounded-2xl p-8 text-center"
          style={{
            background: "var(--primary-muted)",
            border: "1px solid rgba(0,194,168,0.2)",
          }}
        >
          <h3
            className="text-2xl font-extrabold mb-3"
            style={{ color: "var(--primary)", fontFamily: "var(--font-manrope)" }}
          >
            {t.integrations.bannerTitle}
          </h3>
          <p className="max-w-2xl mx-auto" style={{ color: "var(--text-muted)" }}>
            {t.integrations.bannerDesc}
          </p>
        </div>
      </div>
    </section>
  );
}
