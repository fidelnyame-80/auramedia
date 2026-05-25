import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aura Media",
  description:
    "Aura Media builds modern websites, brand systems, and digital experiences.",
  icons: {
    icon: "/images/AuraLogo.webp",
    shortcut: "/images/AuraLogo.webp",
    apple: "/images/AuraLogo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400&display=swap" rel="stylesheet"></link>
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
