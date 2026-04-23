import type { MetadataRoute } from "next";
import { allTours } from "./data";
import { siteUrl } from "./site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/tours`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...allTours.map((tour) => ({
      url: `${siteUrl}/tours/${tour.id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
