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
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "n8n Школа",
  description:
    "Обучающий сайт по автоматизации с open-source платформой n8n. Уроки, примеры и лучшие практики на русском языке.",
  url: "https://n8n-school.example.com",
  inLanguage: "ru",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://n8n-school.example.com/?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "n8n Школа — Полное руководство по автоматизации",
  description:
    "Образовательный курс по созданию автоматизированных workflow с помощью n8n: от первой установки до продвинутых AI-интеграций.",
  provider: {
    "@type": "Organization",
    name: "n8n Школа",
  },
  inLanguage: "ru",
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseWorkload: "PT20H",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg--brand focus:px-4 focus:py-2 focus:text-sm focus:text-white focus:outline-none"
        >
          Перейти к основному содержимому
        </a>
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
