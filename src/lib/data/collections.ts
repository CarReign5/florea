import type { Collection } from "@/lib/types";

export const collections: Collection[] = [
  {
    slug: "the-celestial-collection",
    name: "The Celestial Collection",
    description:
      "Our debut collection of handmade fuzzy-wire and crochet bouquets, each one wrapped by hand in GenSan.",
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((collection) => collection.slug === slug);
}
