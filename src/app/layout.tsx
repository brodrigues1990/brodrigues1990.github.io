import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LenisClient } from "@/components/ui/LenisClient";
import { Navigation } from "@/components/ui/Navigation";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio 3D - Desenvolvedor Criativo",
  description: "Um portfólio moderno e interativo com tecnologias 3D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <LenisClient>
            <Navigation />
            {children}
          </LenisClient>
        </ThemeProvider>
      </body>
    </html>
  );
}
