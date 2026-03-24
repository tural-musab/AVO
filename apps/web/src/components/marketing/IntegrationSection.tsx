"use client";

import { Monitor, CreditCard, Bell, LayoutGrid } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

function TechIcon({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="bg-surface-low p-4 rounded text-center border border-outline-variant/30 shadow-sm flex flex-col items-center gap-2">
      <div className="text-on-surface-variant">{icon}</div>
      <div className="text-[9px] font-bold text-on-surface-variant uppercase tracking-tighter">{label}</div>
    </div>
  );
}

export function IntegrationSection() {
  const t = useTranslations();
  if (!t.integrations) return null;

  return (
    <section id="integrations" className="py-24 px-8 bg-surface-low">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-headline font-bold text-on-surface mb-6">
            {t.integrations.title}
          </h2>
          <p className="text-on-surface-variant mb-10 text-lg leading-relaxed">
            {t.integrations.desc}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h5 className="font-bold text-primary mb-2">{t.integrations.posTitle}</h5>
              <p className="text-sm text-on-surface-variant leading-relaxed">{t.integrations.posDesc}</p>
            </div>
            <div>
              <h5 className="font-bold text-primary mb-2">{t.integrations.fallbackTitle}</h5>
              <p className="text-sm text-on-surface-variant leading-relaxed">{t.integrations.fallbackDesc}</p>
            </div>
          </div>
          <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-xl shadow-sm relative overflow-hidden group">
            <h5 className="font-black text-xl mb-2 uppercase tracking-tight text-on-surface">
              {t.integrations.bannerTitle}
            </h5>
            <p className="text-sm font-medium leading-relaxed text-on-surface-variant">
              {t.integrations.bannerDesc}
            </p>
          </div>
        </div>

        <div className="relative bg-surface p-10 rounded-2xl border border-outline-variant/30 shadow-xl">
          <div className="flex flex-col items-center gap-6">
            <div className="bg-surface-low px-4 py-2 rounded border border-outline-variant/30 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              {t.integrations.touchpoints}
            </div>
            <div className="w-full py-12 px-6 bg-primary/10 border-2 border-primary rounded-xl text-center shadow-lg shadow-primary/10">
              <div className="text-primary font-black text-3xl tracking-[0.25em] uppercase">
                {t.integrations.orchestration}
              </div>
              <div className="text-[10px] text-primary/90 font-bold mt-3 uppercase tracking-[0.2em]">
                {t.integrations.orchestrationSub}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
              <TechIcon icon={<Monitor size={20} />} label={t.integrations.tech.pos} />
              <TechIcon icon={<CreditCard size={20} />} label={t.integrations.tech.payment} />
              <TechIcon icon={<Bell size={20} />} label={t.integrations.tech.staffApp} />
              <TechIcon icon={<LayoutGrid size={20} />} label={t.integrations.tech.staffView} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
