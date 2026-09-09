import type { Bouquet } from "@/lib/types";

/**
 * Sample catalog data for layout/development purposes.
 * Names and descriptions (Solstice, Aurora, Alpenglow, Nova, and their
 * meanings) are confirmed; prices are still placeholders — confirm
 * before launch.
 */
export const bouquets: Bouquet[] = [
  {
    slug: "aurora",
    collectionSlug: "the-celestial-collection",
    name: "Aurora",
    shortDescription: "The dawn light of hope and new beginnings.",
    description:
      "Blush pink fuzzy-wire tulips paired with small white filler flowers, wrapped in kraft newspaper and ivory paper with a sheer white ribbon. Named for the dawn light of hope and new beginnings, Aurora is a gentle bouquet for fresh starts and quiet joys.",
    basePrice: 399,
    badge: "Bestseller",
    image: "/bouquet1.png",
    imageAlt:
      "Handmade fuzzy-wire pink tulip bouquet with white filler flowers, wrapped in kraft newspaper and ivory paper with a sheer white ribbon, styled on a sunlit tabletop with a mirror",
    sizes: [
      { id: "petite", label: "Petite (5 stems)", priceDelta: 0 },
      { id: "classic", label: "Classic (9 stems)", priceDelta: 120 },
      { id: "grand", label: "Grand (14 stems)", priceDelta: 320 },
    ],
    addOns: [
      { id: "gift-note", label: "Handwritten-style gift note", price: 0 },
      { id: "ribbon-upgrade", label: "Silk ribbon upgrade", price: 20 },
    ],
  },
  {
    slug: "alpenglow",
    collectionSlug: "the-celestial-collection",
    name: "Alpenglow",
    shortDescription: "The rosy light that kisses mountain peaks at dawn & dusk.",
    description:
      "Velvet red fuzzy-wire roses gathered with white daisy accents, wrapped in kraft newspaper and ivory paper with a sheer ribbon. Alpenglow takes its name from the rosy light that kisses mountain peaks at dawn and dusk — a warm, romantic bouquet for the ones you love.",
    basePrice: 400,
    badge: "Limited",
    image: "/bouquet2.png",
    imageAlt:
      "Handmade fuzzy-wire bouquet with deep red velvet roses and white daisy accents, wrapped in kraft newspaper with a sheer ribbon, styled on a sunlit tabletop with a mirror",
    sizes: [
      { id: "classic", label: "Classic (9 stems)", priceDelta: 0 },
      { id: "grand", label: "Grand (14 stems)", priceDelta: 180 },
    ],
    addOns: [
      { id: "gift-note", label: "Handwritten-style gift note", price: 0 },
      { id: "ribbon-upgrade", label: "Silk ribbon upgrade", price: 20 },
    ],
  },
  {
    slug: "solstice",
    collectionSlug: "the-celestial-collection",
    name: "Solstice",
    shortDescription: "The season when the sun shines at its brightest.",
    description:
      "Deep red fuzzy-wire lily blooms paired with delicate white daisy accents, wrapped in kraft newspaper and ivory paper with a sheer ribbon. Solstice marks the season when the sun shines at its brightest — a bold, radiant bouquet for a moment worth celebrating.",
    basePrice: 299,
    badge: "New",
    image: "/bouquet3.png",
    imageAlt:
      "Handmade fuzzy-wire bouquet with deep red velvet lily blooms and white daisy accents, wrapped in kraft newspaper with a sheer ribbon, styled on a sunlit tabletop with a mirror",
    sizes: [
      { id: "petite", label: "Petite (5 stems)", priceDelta: 0 },
      { id: "classic", label: "Classic (9 stems)", priceDelta: 120 },
    ],
    addOns: [
      { id: "gift-note", label: "Handwritten-style gift note", price: 0 },
      { id: "ribbon-upgrade", label: "Silk ribbon upgrade", price: 20 },
    ],
  },
  {
    slug: "soleil",
    collectionSlug: "the-celestial-collection",
    name: "Soleil",
    shortDescription: "A little piece of sunshine, made to brighten someone’s day.",
    description:
      "A cheerful arrangement of golden yellow, soft ivory, and touches of lavender, handcrafted to celebrate the people who bring a little more light into your life. 🌻 Perfect for: birthdays, congratulations, appreciation, encouragement, or a simple 'I thought you could use some sunshine today.'",
    basePrice: 250,
    image: "/bouquet4.png",
    imageAlt:
      "Handmade fuzzy-wire bouquet with a yellow sunflower and red rose center, purple lavender stems, and cream lily accents, wrapped in kraft newspaper with a sheer ribbon, styled on a sunlit tabletop with a mirror",
    sizes: [
      { id: "petite", label: "Petite (5 stems)", priceDelta: 0 },
      { id: "classic", label: "Classic (9 stems)", priceDelta: 120 },
    ],
    addOns: [
      { id: "gift-note", label: "Handwritten-style gift note", price: 0 },
      { id: "ribbon-upgrade", label: "Silk ribbon upgrade", price: 20 },
    ],
  },
  {
    slug: "nova",
    collectionSlug: "the-celestial-collection",
    name: "Nova",
    shortDescription: "A brilliant starburst before gently fading.",
    description:
      "A single fuzzy-wire pink gerbera daisy paired with purple lavender stems and a tulip bud, wrapped in kraft newspaper with a sheer ribbon. Nova — a brilliant starburst before gently fading — is a compact, everyday bouquet for small gestures that still shine bright.",
    basePrice: 99,
    image: "/bouquet5.png",
    imageAlt:
      "Handmade fuzzy-wire bouquet with a single pink gerbera daisy, purple lavender stems, and a pink tulip bud, wrapped in kraft newspaper with a sheer ribbon, styled on a sunlit tabletop with a mirror",
    sizes: [{ id: "petite", label: "Petite (5 stems)", priceDelta: 0 }],
    addOns: [
      { id: "gift-note", label: "Handwritten-style gift note", price: 0 },
      { id: "ribbon-upgrade", label: "Silk ribbon upgrade", price: 20 },
    ],
  },
];

export function getBouquetBySlug(slug: string): Bouquet | undefined {
  return bouquets.find((bouquet) => bouquet.slug === slug);
}

export function getBouquetsByCollection(collectionSlug: string): Bouquet[] {
  return bouquets.filter((bouquet) => bouquet.collectionSlug === collectionSlug);
}
