import type { Metadata } from "next";
import { Archivo_Black, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const display = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: "Everest Conquest — The Mount Everest Strategy Board Game",
  description:
    "A competitive strategy board game about climbing the highest mountain in the world. Battle avalanches, navigate icy crevasses, and race to the 8,848 m summit. Ages 14+, 2–6 players.",
  keywords: [
    "Everest Conquest",
    "board game",
    "strategy game",
    "Mount Everest",
    "family game",
    "climbing game",
  ],
  openGraph: {
    title: "Everest Conquest — The Mount Everest Strategy Board Game",
    description:
      "Race to the top. Victory awaits. A competitive strategy board game about conquering Mount Everest.",
    type: "website",
    images: ["/images/promo-race.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-white">
        {children}
      </body>
    </html>
  );
}
