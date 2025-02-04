import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import BackToTopButton from "./components/BackToTopButton";
// import RequestStats from "./components/RequestStats"; // imports the Component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "photoStockage",
  description: "A site where you can share your photos",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col`}>
        <Header />
        {children}
        <Footer />
        <CookieConsent />
        <BackToTopButton />
        {/* For tracking requests */}
        {/* <RequestStats /> */}
      </body>
    </html>
  );
}
