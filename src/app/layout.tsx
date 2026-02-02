import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../public/styles/globals.css";
import "@/styles/card-animations.css";
import ToastProvider from "@/components/ui/toast/toast-provider";
import { ThemeProvider } from "@/lib/theme-provider";
import { TrackerProvider } from "@/components/AnalyticsProvider";
import { AnalyticsLogger } from "@/components/AnalyticsLogger";
import { RouteProgressBar } from "@/components/ui/RouteProgressBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateJsonLd(structuredData.organization),
          }}
        />

        {/* Structured Data - Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateJsonLd(structuredData.website),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <RouteProgressBar />
        <TrackerProvider enabled={true} debug={true}>
          <ThemeProvider
            defaultTheme="dark"
            enableSystem={true}
            storageKey="safetrust-theme"
          >
            <ToastProvider position="top-right" maxToasts={3}>
              {children}
            </ToastProvider>
          </ThemeProvider>
          <PageView />
          <AnalyticsLogger />
          <PerformanceInitializer />
        </TrackerProvider>
      </body>
    </html>
  );
}
