import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "n8n Школа — Обучающий сайт по автоматизации с n8n",
  description:
    "Полное руководство по n8n: от установки и базовых понятий до создания сложных автоматизаций и интеграций. Уроки, примеры и лучшие практики на русском языке.",
  keywords: [
    "n8n",
    "автоматизация",
    "workflow",
    "no-code",
    "low-code",
    "интеграции",
    "обучение",
    "туториал",
  ],
  authors: [{ name: "n8n School" }],
  openGraph: {
    title: "n8n Школа — Обучающий сайт по автоматизации",
    description: "Учитесь автоматизировать задачи с n8n: уроки, примеры, лучшие практики.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
