import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/lib/localStorage-polyfill";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Cormorant_Garamond } from 'next/font/google'
import CookieConsentComponent from "@/components/cookie-consent";
import { LanguageProvider } from "@/components/contexts/language-context";
import { MenuContextProvider } from "@/components/contexts/menu-context";
import ChristmasPopup from "@/components/christmas/christmasPopup";
import "@/lib/init-cleanup";
import Script from "next/script";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic']
})

export const metadata = {
  title: "Sanji's – Steak, Grill & Bar München",
  description: "Reservieren Sie online Ihren Tisch bei Sanji's Kitchen in München und genießen Sie kulinarische Highlights in stilvollem Ambiente.",
  icons: {
    icon: "/sanjislogo.svg",
  },
  openGraph: {
    title: "Sanji's – Steak, Grill & Bar München",
    description: "Reservieren Sie online Ihren Tisch bei Sanji's Kitchen in München und genießen Sie kulinarische Highlights in stilvollem Ambiente.",
    url: "https://sanjiskitchen.de/",
    siteName: "Sanji's",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanji's – Steak, Grill & Bar München",
    description:
      "Reservieren Sie online Ihren Tisch bei Sanji's in München und genießen Sie kulinarische Highlights in stilvollem Ambiente.",
    images: ["https://sanjiskitchen.de/LandingPageImage2.jpg"],
  },
  charset: "utf-8",
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${cormorant.className}`}
      >
        <Script 
          src="https://umami.sanjiskitchen.de/script.js" 
          data-website-id="d6fc4869-fc14-4e60-8d83-054916944289"
          strategy="afterInteractive"
        />
        <LanguageProvider>
          <MenuContextProvider>
            <Navbar />
            <ChristmasPopup />
            {children}
            <Footer />
          </MenuContextProvider>
          <CookieConsentComponent />
        </LanguageProvider>
      </body>
    </html>
  );
}
