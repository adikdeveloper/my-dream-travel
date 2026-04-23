import type { Metadata } from "next";
import ToursPageClient from "./ToursPageClient";

export const metadata: Metadata = {
  title: "Barcha Tur Paketlar",
  description:
    "Dubai, Parij, Bali, Tokio va boshqa mashhur yo'nalishlar bo'yicha tur paketlarni ko'ring.",
  alternates: {
    canonical: "/tours",
  },
};

export default function ToursPage() {
  return <ToursPageClient />;
}
