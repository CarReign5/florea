import type { Bouquet } from "@/lib/types";

/**
 * Sample catalog data for layout/development purposes.
 * Names, descriptions, and prices are placeholders — replace with
 * Floréa's real bouquets and confirmed pricing before launch.
 */
export const bouquets: Bouquet[] = [
  {
    slug: "pink-tulip-bouquet",
    collectionSlug: "the-celestial-collection",
    name: "Pink Tulip Bouquet",
    shortDescription: "Fuzzy-wire tulips with soft white filler blooms.",
    description:
      "Blush pink fuzzy-wire tulips paired with small white filler flowers, wrapped in kraft newspaper and ivory paper with a sheer white ribbon. Real product photo — name and price still placeholders, please confirm.",
    basePrice: 780,
    badge: "Bestseller",
    image: "/bouquet1.png",
    imageAlt:
      "Handmade fuzzy-wire pink tulip bouquet with white filler flowers, wrapped in kraft newspaper and ivory paper with a sheer white ribbon, styled on a sunlit tabletop with a mirror",
    sizes: [
      { id: "petite", label: "Petite (5 stems)", priceDelta: 0 },
      { id: "classic", label: "Classic (9 stems)", priceDelta: 320 },
      { id: "grand", label: "Grand (14 stems)", priceDelta: 680 },
    ],
    addOns: [
      { id: "gift-note", label: "Handwritten-style gift note", price: 0 },
      { id: "vase", label: "Ceramic keepsake vase", price: 250 },
      { id: "ribbon-upgrade", label: "Silk ribbon upgrade", price: 90 },
    ],
  },
  {
    slug: "dusty-rose-keepsake",
    collectionSlug: "the-celestial-collection",
    name: "Dusty Rose Keepsake",
    shortDescription: "Fuzzy-wire roses in dusty rose and sage tones.",
    description:
      "A romantic pairing of dusty rose and sage fuzzy-wire roses, finished with brown newspaper accent wrap. Placeholder name/description — photo is real, please confirm copy.",
    basePrice: 890,
    badge: "Limited",
    image: "/bouquet2.png",
    imageAlt:
      "Handmade fuzzy-wire bouquet with deep red velvet roses and white daisy accents, wrapped in kraft newspaper with a sheer ribbon, styled on a sunlit tabletop with a mirror",
    sizes: [
      { id: "classic", label: "Classic (9 stems)", priceDelta: 0 },
      { id: "grand", label: "Grand (14 stems)", priceDelta: 420 },
    ],
    addOns: [
      { id: "gift-note", label: "Handwritten-style gift note", price: 0 },
      { id: "vase", label: "Ceramic keepsake vase", price: 250 },
    ],
  },
  {
    slug: "crochet-daisy-bunch",
    collectionSlug: "the-celestial-collection",
    name: "Crochet Daisy Bunch",
    shortDescription: "Soft crochet daisies in a cheerful, simple bunch.",
    description:
      "Crochet-thread daisies in warm white and soft yellow, kept simple and bright. Placeholder name/description — photo is real, please confirm copy.",
    basePrice: 620,
    badge: "New",
    image: "/bouquet3.png",
    imageAlt:
      "Handmade fuzzy-wire bouquet with deep red velvet lily blooms and white daisy accents, wrapped in kraft newspaper with a sheer ribbon, styled on a sunlit tabletop with a mirror",
    sizes: [
      { id: "petite", label: "Petite (5 stems)", priceDelta: 0 },
      { id: "classic", label: "Classic (9 stems)", priceDelta: 260 },
    ],
    addOns: [
      { id: "gift-note", label: "Handwritten-style gift note", price: 0 },
      { id: "ribbon-upgrade", label: "Silk ribbon upgrade", price: 90 },
    ],
  },
  {
    slug: "sunlit-sunflower-mix",
    collectionSlug: "the-celestial-collection",
    name: "Sunlit Sunflower Mix",
    shortDescription: "Fuzzy-wire sunflowers paired with soft greenery.",
    description:
      "A bright, cheerful bundle of fuzzy-wire sunflowers with a velvet red rose center, paired with purple lavender stems and cream lily accents. Real product photo — name and price still placeholders, please confirm.",
    basePrice: 740,
    image: "/bouquet4.png",
    imageAlt:
      "Handmade fuzzy-wire bouquet with a yellow sunflower and red rose center, purple lavender stems, and cream lily accents, wrapped in kraft newspaper with a sheer ribbon, styled on a sunlit tabletop with a mirror",
    sizes: [
      { id: "petite", label: "Petite (5 stems)", priceDelta: 0 },
      { id: "classic", label: "Classic (9 stems)", priceDelta: 300 },
    ],
    addOns: [
      { id: "gift-note", label: "Handwritten-style gift note", price: 0 },
      { id: "ribbon-upgrade", label: "Silk ribbon upgrade", price: 90 },
    ],
  },
  {
    slug: "little-everyday-bunch",
    collectionSlug: "the-celestial-collection",
    name: "Little Everyday Bunch",
    shortDescription: "A small, affordable bunch for no-occasion gifting.",
    description:
      "A compact single pink gerbera daisy paired with purple lavender and a pink tulip bud, sized for desks, small spaces, and everyday gestures. Real product photo — name and price still placeholders, please confirm.",
    basePrice: 420,
    image: "/bouquet5.png",
    imageAlt:
      "Handmade fuzzy-wire bouquet with a single pink gerbera daisy, purple lavender stems, and a pink tulip bud, wrapped in kraft newspaper with a sheer ribbon, styled on a sunlit tabletop with a mirror",
    sizes: [{ id: "petite", label: "Petite (5 stems)", priceDelta: 0 }],
    addOns: [{ id: "gift-note", label: "Handwritten-style gift note", price: 0 }],
  },
];

export function getBouquetBySlug(slug: string): Bouquet | undefined {
  return bouquets.find((bouquet) => bouquet.slug === slug);
}

export function getBouquetsByCollection(collectionSlug: string): Bouquet[] {
  return bouquets.filter((bouquet) => bouquet.collectionSlug === collectionSlug);
}
