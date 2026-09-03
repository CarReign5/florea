import type { ColorOption, FlowerOption, WrappingOption, AddOn } from "@/lib/types";

/**
 * Sample builder options for layout/development purposes.
 * Replace with Floréa's real flower types, colors, and confirmed
 * pricing before launch.
 */
export const flowerTypes: FlowerOption[] = [
  { id: "fuzzy-rose", label: "Fuzzy-wire rose", priceDelta: 0 },
  { id: "fuzzy-daisy", label: "Fuzzy-wire daisy", priceDelta: 0 },
  { id: "crochet-tulip", label: "Crochet tulip", priceDelta: 40 },
  { id: "crochet-sunflower", label: "Crochet sunflower", priceDelta: 60 },
];

export const colors: ColorOption[] = [
  { id: "ivory", label: "Ivory", swatch: "#FAF7F2" },
  { id: "champagne", label: "Champagne", swatch: "#D8C4A8" },
  { id: "dusty-rose", label: "Dusty rose", swatch: "#CFA7A0" },
  { id: "sage", label: "Sage", swatch: "#AAB2A0" },
  { id: "taupe", label: "Taupe", swatch: "#9B846E" },
];

export const wrappingOptions: WrappingOption[] = [
  { id: "champagne-matte", label: "Champagne matte wrapper", priceDelta: 0 },
  { id: "white", label: "White wrapper", priceDelta: 0 },
  { id: "kraft-accent", label: "Brown newspaper accent", priceDelta: 30 },
];

export const builderAddOns: AddOn[] = [
  { id: "gift-note", label: "Handwritten-style gift note", price: 0 },
  { id: "vase", label: "Ceramic keepsake vase", price: 250 },
  { id: "ribbon-upgrade", label: "Silk ribbon upgrade", price: 90 },
];

export const stemPrice = 65;
export const baseBuilderPrice = 180;
