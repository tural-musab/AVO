import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AVO — Adaptive Venue Orchestration",
  description:
    "Restoran ve venue'lerde sipariş, servis ve ödeme akışlarını tek bir orkestrasyon katmanında birleştiren platform.",
  keywords: ["restoran", "sipariş", "QR menü", "POS entegrasyon", "venue management"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${manrope.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
