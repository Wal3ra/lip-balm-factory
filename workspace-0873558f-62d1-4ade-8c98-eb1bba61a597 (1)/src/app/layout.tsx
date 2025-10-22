import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LatherGreen Lip Factory - Custom Lip Balm Creator",
  description: "Create your custom lip balm with premium ingredients. Mix up to 2 flavors to craft your perfect blend at LatherGreen Lip Factory.",
  keywords: ["LatherGreen", "lip balm", "custom", "natural", "organic", "flavors", "beauty", "skincare"],
  authors: [{ name: "LatherGreen Team" }],
  icons: {
    icon: "https://static.wixstatic.com/media/d0044c_6e07f857eb834d8f86d5a0fb6c244f0e~mv2.png",
  },
  openGraph: {
    title: "LatherGreen Lip Factory",
    description: "Create your custom lip balm with premium ingredients and unique flavor combinations",
    url: "https://www.lathergreen.com",
    siteName: "LatherGreen",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LatherGreen Lip Factory",
    description: "Create your custom lip balm with premium ingredients",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
