import type { Metadata } from "next";
import "./globals.css";
import VisitCounter from './visit-counter';

export const metadata: Metadata = {
  title: "CorePath | Engineering careers",
  description: "Find civil, mechanical, electrical and computer science jobs in India and beyond.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className="antialiased">{children}<VisitCounter/></body>
    </html>
  );
}
