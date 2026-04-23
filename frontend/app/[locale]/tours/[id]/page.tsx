import type { Metadata } from "next";
import { allTours } from "../../../data";
import { siteName } from "../../../site-config";
import TourDetailsPageClient from "./TourDetailsPageClient";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateStaticParams() {
  return allTours.map((tour) => ({
    id: String(tour.id),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const tour = allTours.find((item) => item.id === Number(id));

  if (!tour) {
    return {
      title: "Tur topilmadi",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${tour.name} tur paketi`,
    description: `${tour.name} bo'yicha ${tour.days}lik tur paket. Reyting: ${tour.rating}. Narx: ${tour.price}. ${siteName} bilan bron qiling.`,
    alternates: {
      canonical: `/tours/${tour.id}`,
    },
    openGraph: {
      title: `${tour.name} tur paketi | ${siteName}`,
      description: `${tour.category} yo'nalishidagi ${tour.days}lik sayohat paketi.`,
      images: [
        {
          url: tour.image,
          alt: tour.name,
        },
      ],
    },
  };
}

export default function TourDetailsPage() {
  return <TourDetailsPageClient />;
}
