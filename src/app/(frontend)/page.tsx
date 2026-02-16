import Introduction from "@/components/introduction"
import LandingPage from "@/components/landing-page"
import Reservations from "@/components/reservations"
import Maps from "@/components/maps"
import Gallery from "@/components/gallery/gallery"


export const metadata = {
  title: "Sanji's – Steak, Grill & Bar München",
  description: "Reservieren Sie online Ihren Tisch bei Sanji's Kitchen in München und genießen Sie kulinarische Highlights in stilvollem Ambiente.",
  openGraph: {
    url: "https://sanjiskitchen.de/",
  },
};

export default function Home() {
  return (
    <main>
      <LandingPage />
      <Introduction />
      <Reservations />
      <Maps />
      <Gallery />
    </main>
  )
}
