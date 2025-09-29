import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../public/styles/globals.css";
import ToastProvider from "@/components/ui/toast/toast-provider";
import { ThemeProvider } from "../lib/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SafeTrust",
  description: "SafeTrust is a decentralized and secure platform P2P",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider position="top-right" maxToasts={3}>
          <ThemeProvider
            defaultTheme="dark"
            enableSystem={true}
            storageKey="safetrust-theme"
          >
            {children}
          </ThemeProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
