import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tg20-smart-glasses.timpook11.chatgpt.site"),
  title: "TG-20 משקפיים חכמים | טימוטי אבידון — הנדסאי אלקטרוניקה ומחשבים",
  description: "פרויקט TG-20: משקפיים חכמים להצגת מדידות OWON B41T דרך BLE, Arduino Micro, OLED ומערך אופטי.",
  keywords: ["טימוטי אבידון", "TG-20", "הנדסאי אלקטרוניקה ומחשבים", "Arduino", "Embedded Systems", "BLE", "משקפיים חכמים"],
  openGraph: {
    title: "TG-20 משקפיים חכמים — פרויקט אלקטרוניקה ומחשבים",
    description: "מערכת לבישה להצגת מדידות מולטימטר ישירות בשדה הראייה.",
    type: "website",
    locale: "he_IL",
    images: [{ url: "/tg20-hero.webp", width: 1448, height: 1086, alt: "אב־טיפוס TG-20" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TG-20 משקפיים חכמים",
    description: "פרויקט גמר של הנדסאי אלקטרוניקה ומחשבים, טימוטי אבידון.",
    images: ["/tg20-hero.webp"],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="he" dir="rtl"><body>{children}</body></html>;
}
