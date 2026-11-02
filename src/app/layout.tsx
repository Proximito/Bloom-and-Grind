import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Bloom & Grind — specialty coffee and brewing gear",
  description: "Fresh specialty coffee and the gear to brew it at home.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-6 sm:py-10">{children}</main>
        <footer className="mt-16 border-t border-line py-8 text-center text-sm text-muted">
          Bloom &amp; Grind · E-Commerce project 2026–2027 · Test mode, no real payments
        </footer>
      </body>
    </html>
  );
}
