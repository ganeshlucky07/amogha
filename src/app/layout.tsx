import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./CartContext";
import { StructuredData } from "./components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amogha Pure Ghee Sweets & Bakers | Jodimetla, Hyderabad",
  description: "Amogha Pure Ghee Sweets & Bakers - Best pure ghee sweets, fresh bakery items, pizzas, burgers, snacks, Hyderabadi Osmania biscuits, pastries and cakes in Jodimetla, Pocharam, Hyderabad. Order now for delicious treats!",
  keywords: "Amogha pure ghee sweets, pure ghee sweets, ghee sweets Hyderabad, bakery Jodimetla, sweets Pocharam, Amogha sweets, pizza, burgers, Osmania biscuits, Hyderabad bakery, pastries, cakes, best sweets Hyderabad",
  authors: [{ name: "Amogha Pure Ghee Sweets & Bakers" }],
  creator: "Amogha Pure Ghee Sweets & Bakers",
  publisher: "Amogha Pure Ghee Sweets & Bakers",
  robots: "index, follow",
  openGraph: {
    title: "Amogha Pure Ghee Sweets & Bakers | Jodimetla, Hyderabad",
    description: "Best pure ghee sweets, fresh bakery items, pizzas, burgers, snacks, Hyderabadi Osmania biscuits, pastries and cakes. Order now!",
    type: "website",
    locale: "en_IN",
    siteName: "Amogha Pure Ghee Sweets & Bakers",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amogha Pure Ghee Sweets & Bakers",
    description: "Best pure ghee sweets, fresh bakery items, pizzas, burgers, snacks in Jodimetla, Hyderabad",
  },
  alternates: {
    canonical: "https://amogha-sweets.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="google-site-verification" content="google159733adf381e5a8" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StructuredData />
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
