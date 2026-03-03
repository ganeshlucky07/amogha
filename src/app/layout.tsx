import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amogha Sweets and Bakers | Jodimetla, Hyderabad",
  description: "Fresh bakery items, pizzas, burgers, snacks, Hyderabadi Osmania biscuits, pastries and cakes. Order now for delicious treats!",
  keywords: "bakery, sweets, pizza, burgers, Osmania biscuits, Hyderabad, Jodimetla, Pocharam, pastries, cakes",
  openGraph: {
    title: "Amogha Sweets and Bakers",
    description: "Fresh • Delicious • Hyderabadi Special - Order Now!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
