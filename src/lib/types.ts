export type SizeOption = {
  id: string;
  label: string;
  priceDelta: number;
};

export type AddOn = {
  id: string;
  label: string;
  price: number;
};

export type Bouquet = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  basePrice: number;
  badge?: "Handmade" | "Limited" | "New" | "Bestseller";
  collectionSlug: string;
  sizes: SizeOption[];
  addOns: AddOn[];
  image?: string;
  imageAlt?: string;
};

export type Collection = {
  slug: string;
  name: string;
  description: string;
};

export type FlowerOption = {
  id: string;
  label: string;
  priceDelta: number;
};

export type ColorOption = {
  id: string;
  label: string;
  swatch: string;
};

export type WrappingOption = {
  id: string;
  label: string;
  priceDelta: number;
};

export type CartItem = {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
  details: string[];
};
