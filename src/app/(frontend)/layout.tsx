import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/lib/localStorage-polyfill";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Cormorant_Garamond } from 'next/font/google'
import CookieConsentComponent from "@/components/cookie-consent";
import { LanguageProvider } from "@/components/contexts/language-context";
import { MenuContextProvider } from "@/components/contexts/menu-context";
import "@/lib/init-cleanup";
import Script from "next/script";
import { getCmsNavLinks } from "@/lib/nav-links";
import { getAnnouncement } from "@/lib/announcement";
import AnnouncementBubble from "@/components/announcement-bubble";
import { SITE_INFO, openingHoursJsonLd } from "@/lib/site-info";



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
  metadataBase: new URL("https://sanjiskitchen.de"),
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




export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cmsLinks = await getCmsNavLinks();
  const announcement = await getAnnouncement();

  const restaurantJsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: SITE_INFO.name,
    image: `${SITE_INFO.url}/LandingPageImage2.jpg`,
    url: SITE_INFO.url,
    telephone: SITE_INFO.telephone,
    servesCuisine: ["Steakhouse", "Grill", "Asian Fusion"],
    priceRange: "€€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_INFO.address.street,
      postalCode: SITE_INFO.address.postalCode,
      addressLocality: SITE_INFO.address.city,
      addressCountry: SITE_INFO.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.1299,
      longitude: 11.5943,
    },
    openingHoursSpecification: openingHoursJsonLd(),
    sameAs: ["https://www.instagram.com/sanjis.kitchen/"],
  };

  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${cormorant.className}`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
        <Script
          src="https://umami.sanjiskitchen.de/script.js"
          data-website-id="d6fc4869-fc14-4e60-8d83-054916944289"
          strategy="afterInteractive"
        />
        <LanguageProvider>
          <MenuContextProvider>
            <Navbar cmsLinks={cmsLinks} />
            {children}
            <AnnouncementBubble announcement={announcement} />
            <Footer cmsLinks={cmsLinks} />
          </MenuContextProvider>
          <CookieConsentComponent />
        </LanguageProvider>
      </body>
    </html>
  );
}
