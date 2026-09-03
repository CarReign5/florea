"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import {
  baseBuilderPrice,
  builderAddOns,
  colors,
  flowerTypes,
  stemPrice,
  wrappingOptions,
} from "@/lib/data/builder-options";

export function BouquetBuilder() {
  const router = useRouter();
  const { addItem } = useCart();

  const [flowerId, setFlowerId] = useState(flowerTypes[0].id);
  const [colorIds, setColorIds] = useState<string[]>([colors[0].id]);
  const [wrappingId, setWrappingId] = useState(wrappingOptions[0].id);
  const [addOnIds, setAddOnIds] = useState<string[]>([]);
  const [stems, setStems] = useState(5);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const flower = flowerTypes.find((f) => f.id === flowerId)!;
  const wrapping = wrappingOptions.find((w) => w.id === wrappingId)!;
  const selectedAddOns = builderAddOns.filter((a) => addOnIds.includes(a.id));
  const selectedColors = colors.filter((c) => colorIds.includes(c.id));

  const unitPrice = useMemo(() => {
    const stemsCost = stems * (stemPrice + flower.priceDelta);
    const addOnsCost = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
    return baseBuilderPrice + stemsCost + wrapping.priceDelta + addOnsCost;
  }, [flower, wrapping, selectedAddOns, stems]);

  function toggleColor(id: string) {
    setColorIds((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((c) => c !== id)
          : prev
        : [...prev, id],
    );
  }

  function toggleAddOn(id: string) {
    setAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  }

  function handleAddToCart() {
    addItem({
      name: "Custom bouquet",
      unitPrice,
      quantity,
      details: [
        `${stems} stems of ${flower.label}`,
        `Colors: ${selectedColors.map((c) => c.label).join(", ")}`,
        `Wrapping: ${wrapping.label}`,
        ...selectedAddOns.map((a) => a.label),
      ],
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2500);
  }

  return (
    <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] md:gap-16">
      <div className="flex flex-col gap-10">
        {/* Flower type */}
        <fieldset>
          <legend className="text-xs font-medium tracking-[0.1em] text-taupe uppercase">
            1. Flower type
          </legend>
          <div className="mt-3 flex flex-wrap gap-3">
            {flowerTypes.map((option) => (
              <label
                key={option.id}
                className={`flex h-12 cursor-pointer items-center rounded-[6px] border px-4 text-sm font-medium transition-colors duration-200 ${
                  flowerId === option.id
                    ? "border-ink bg-ink text-ivory"
                    : "border-ink/20 text-ink hover:border-ink/40"
                }`}
              >
                <input
                  type="radio"
                  name="flower"
                  value={option.id}
                  checked={flowerId === option.id}
                  onChange={() => setFlowerId(option.id)}
                  className="sr-only"
                />
                {option.label}
                {option.priceDelta > 0 && (
                  <span className="ml-2 opacity-70">
                    +{formatPrice(option.priceDelta)}/stem
                  </span>
                )}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Colors */}
        <fieldset>
          <legend className="text-xs font-medium tracking-[0.1em] text-taupe uppercase">
            2. Colors
          </legend>
          <p className="mt-1 text-xs text-ink/50">Choose one or more.</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {colors.map((color) => {
              const selected = colorIds.includes(color.id);
              return (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => toggleColor(color.id)}
                  aria-pressed={selected}
                  className={`flex h-12 items-center gap-2 rounded-[6px] border px-3 text-sm font-medium transition-colors duration-200 ${
                    selected
                      ? "border-ink text-ink"
                      : "border-ink/20 text-ink/70 hover:border-ink/40"
                  }`}
                >
                  <span
                    className="h-5 w-5 rounded-full border border-ink/15"
                    style={{ backgroundColor: color.swatch }}
                    aria-hidden="true"
                  />
                  {color.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Wrapping */}
        <fieldset>
          <legend className="text-xs font-medium tracking-[0.1em] text-taupe uppercase">
            3. Wrapping
          </legend>
          <div className="mt-3 flex flex-wrap gap-3">
            {wrappingOptions.map((option) => (
              <label
                key={option.id}
                className={`flex h-12 cursor-pointer items-center rounded-[6px] border px-4 text-sm font-medium transition-colors duration-200 ${
                  wrappingId === option.id
                    ? "border-ink bg-ink text-ivory"
                    : "border-ink/20 text-ink hover:border-ink/40"
                }`}
              >
                <input
                  type="radio"
                  name="wrapping"
                  value={option.id}
                  checked={wrappingId === option.id}
                  onChange={() => setWrappingId(option.id)}
                  className="sr-only"
                />
                {option.label}
                {option.priceDelta > 0 && (
                  <span className="ml-2 opacity-70">
                    +{formatPrice(option.priceDelta)}
                  </span>
                )}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Add-ons */}
        <fieldset>
          <legend className="text-xs font-medium tracking-[0.1em] text-taupe uppercase">
            4. Add-ons
          </legend>
          <div className="mt-3 flex flex-col gap-3">
            {builderAddOns.map((addOn) => (
              <label
                key={addOn.id}
                className="flex h-12 cursor-pointer items-center justify-between rounded-[6px] border border-ink/15 px-4 text-sm"
              >
                <span className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={addOnIds.includes(addOn.id)}
                    onChange={() => toggleAddOn(addOn.id)}
                    className="h-4 w-4 accent-ink"
                  />
                  {addOn.label}
                </span>
                <span className="text-ink/60">
                  {addOn.price > 0
                    ? `+${formatPrice(addOn.price)}`
                    : "FREE"}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Stems + quantity */}
        <fieldset>
          <legend className="text-xs font-medium tracking-[0.1em] text-taupe uppercase">
            5. Quantity
          </legend>
          <div className="mt-3 flex flex-wrap gap-8">
            <div>
              <p className="text-sm text-ink/60">Stems per bouquet</p>
              <div className="mt-2 flex h-12 items-center rounded-[6px] border border-ink/20">
                <button
                  type="button"
                  aria-label="Decrease stems"
                  onClick={() => setStems((s) => Math.max(3, s - 1))}
                  className="flex h-full w-10 items-center justify-center text-lg"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-medium">
                  {stems}
                </span>
                <button
                  type="button"
                  aria-label="Increase stems"
                  onClick={() => setStems((s) => Math.min(30, s + 1))}
                  className="flex h-full w-10 items-center justify-center text-lg"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm text-ink/60">Number of bouquets</p>
              <div className="mt-2 flex h-12 items-center rounded-[6px] border border-ink/20">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-full w-10 items-center justify-center text-lg"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-medium">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-full w-10 items-center justify-center text-lg"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </fieldset>
      </div>

      {/* Summary */}
      <div className="h-fit rounded-[10px] border border-ink/10 bg-soft-beige/40 p-6 md:sticky md:top-28">
        <p className="text-xs font-medium tracking-[0.1em] text-taupe uppercase">
          Your bouquet
        </p>
        <ul className="mt-4 space-y-2 text-sm text-ink/75">
          <li>
            {stems} stems of {flower.label}
          </li>
          <li>Colors: {selectedColors.map((c) => c.label).join(", ")}</li>
          <li>Wrapping: {wrapping.label}</li>
          {selectedAddOns.map((a) => (
            <li key={a.id}>{a.label}</li>
          ))}
        </ul>

        <div className="mt-6 border-t border-ink/10 pt-6">
          <p className="font-display text-3xl font-medium text-ink">
            {formatPrice(unitPrice * quantity)}
          </p>
          <p className="mt-1 text-xs text-ink/50">
            {formatPrice(unitPrice)} each &middot; sample pricing
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-[6px] bg-ink text-sm font-medium text-ivory transition-colors duration-200 hover:bg-ink/90"
        >
          Add to cart
        </button>
        {justAdded && (
          <button
            type="button"
            onClick={() => router.push("/cart")}
            className="mt-3 w-full text-center text-sm font-medium text-ink underline underline-offset-4"
          >
            Added — view cart
          </button>
        )}
      </div>
    </div>
  );
}
