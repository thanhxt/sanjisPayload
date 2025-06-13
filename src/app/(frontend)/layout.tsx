import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Cormorant_Garamond } from 'next/font/google'
import CookieConsent from "@/components/cookieconsent";
import { LanguageProvider } from "@/components/contexts/language-context";
import { MenuContextProvider } from "@/components/contexts/menu-context";


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
        <LanguageProvider>
          <MenuContextProvider>
            <Navbar />
            {children}
            <Footer />
          </MenuContextProvider>
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  );
}
