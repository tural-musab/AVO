"use client";

import { useState, useEffect } from "react";
import defaultMessages from "@/messages/en.json";

type Locale = "en" | "tr" | "ru" | "az";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Translations = Record<string, any>;

const cache: Partial<Record<Locale, Translations>> = { en: defaultMessages };

export function useTranslations(): Translations {
  const [locale, setLocale] = useState<Locale>("en");
  const [messages, setMessages] = useState<Translations>(defaultMessages);

  useEffect(() => {
    const saved = localStorage.getItem("avo_lang") as Locale;
    if (saved && ["en", "tr", "ru", "az"].includes(saved)) {
      setLocale(saved);
    }

    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<Locale>;
      setLocale(customEvent.detail);
    };
    window.addEventListener("avo:locale-change", handler);
    return () => window.removeEventListener("avo:locale-change", handler);
  }, []);

  useEffect(() => {
    if (cache[locale]) {
      setMessages(cache[locale]!);
      return;
    }
    import(`@/messages/${locale}.json`).then((m) => {
      cache[locale] = m.default;
      setMessages(m.default);
    });
  }, [locale]);

  return messages;
}
