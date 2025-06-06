import Introduction from "@/components/introduction"
import LandingPage from "@/components/landing-page"
import Reservations from "@/components/reservations"
import Maps from "@/components/maps"
import Gallery from "@/components/gallery"
import { metadata } from "./layout"

export default function Home() {
  metadata.title = "Sanji's – Steak, Grill & Bar München";
  metadata.description = "Reservieren Sie online Ihren Tisch bei Sanji's Kitchen in München und genießen Sie kulinarische Highlights in stilvollem Ambiente.";
  metadata.openGraph.url = "https://sanjiskitchen.de/";
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
