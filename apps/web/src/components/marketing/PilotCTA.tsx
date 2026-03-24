"use client";

import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

export function PilotCTA() {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!t.cta) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: Integrate with API when backend is ready
    setSubmitted(true);
  };

  return (
    <section
      id="pilot-form"
      className="py-24 px-6"
      style={{ background: "var(--surface-variant)" }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-8"
          style={{ background: "var(--primary-muted)", color: "var(--primary)" }}
        >
          <Mail size={28} />
        </div>
        <h2
          className="text-3xl lg:text-5xl font-extrabold tracking-tighter mb-6"
          style={{ color: "var(--text)", fontFamily: "var(--font-manrope)" }}
        >
          {t.cta.title}
        </h2>
        <p className="text-lg leading-relaxed mb-10" style={{ color: "var(--text-muted)" }}>
          {t.cta.desc}
        </p>

        {submitted ? (
          <div
            className="py-6 px-8 rounded-2xl text-lg font-semibold"
            style={{
              background: "var(--primary-muted)",
              color: "var(--primary)",
              border: "1px solid rgba(0,194,168,0.3)",
            }}
          >
            {t.cta.success}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.cta.placeholder}
              required
              className="flex-1 px-5 py-4 rounded-full text-base outline-none transition-all"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text)",
              }}
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-full font-bold text-base transition-all hover:opacity-90 flex items-center justify-center gap-2"
              style={{
                background: "var(--primary)",
                color: "#0a0f1a",
                fontFamily: "var(--font-manrope)",
              }}
            >
              {t.cta.button}
              <ArrowRight size={18} />
            </button>
          </form>
        )}

        <p className="mt-6 text-sm" style={{ color: "var(--text-dim)" }}>
          {t.cta.footer}
        </p>
      </div>
    </section>
  );
}
