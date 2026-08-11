import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { store } from "@/config/store";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://loja-de-iphone.vercel.app"),
  title: "Loja de iPhone | iPhones, Mac, iPad e Acessórios",
  description:
    "iPhones novos e seminovos com garantia, Mac, iPad e acessórios. Atendimento direto pelo WhatsApp.",
  openGraph: {
    title: "Loja de iPhone",
    description: store.tagline,
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
