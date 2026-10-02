const assetBase = "/home";
import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/windsong/400.css";

export const metadata: Metadata = {
  title: { default: "KIM SILESIA — Projektowanie i realizacja wnętrz", template: "%s | KIM SILESIA" },
  description: "Projektowanie wnętrz, meble na wymiar, kompleksowe wykonawstwo i odbiory techniczne w Katowicach i na Śląsku.",
  icons: { icon: "/home/favicon.svg", shortcut: "/home/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pl"><body>{children}</body></html>; }
