import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SwiftAI — AI chatbot, hjemmeside og værktøjer til din virksomhed",
  description:
    "Jeg bygger en AI chatbot, ny hjemmeside og smarte AI-værktøjer til din virksomhed — på 4 uger. Af Axel, 15-årig udvikler fra København.",
  openGraph: {
    title: "SwiftAI — AI chatbot, hjemmeside og værktøjer",
    description:
      "Jeg bygger en AI chatbot, ny hjemmeside og smarte AI-værktøjer til din virksomhed — på 4 uger.",
    locale: "da_DK",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
