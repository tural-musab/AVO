import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export type Locale = "en" | "tr" | "ru" | "az";
export const locales: Locale[] = ["en", "tr", "ru", "az"];
export const defaultLocale: Locale = "en";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value as Locale) || defaultLocale;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;

  return {
    locale: validLocale,
    messages: (await import(`../messages/${validLocale}.json`)).default,
  };
});
