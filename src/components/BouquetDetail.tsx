"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import type { Bouquet } from "@/lib/types";

export function BouquetDetail({ bouquet }: { bouquet: Bouquet }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [sizeId, setSizeId] = useState(bouquet.sizes[0]?.id);
  const [letterMessage, setLetterMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const size = bouquet.sizes.find((s) => s.id === sizeId) ?? bouquet.sizes[0];

  const unitPrice = useMemo(() => {
    return bouquet.basePrice + (size?.priceDelta ?? 0);
  }, [bouquet.basePrice, size]);

  function handleAddToCart() {
    const trimmedMessage = letterMessage.trim();
    addItem({
      name: bouquet.name,
      unitPrice,
      quantity,
      details: [
        size ? size.label : null,
        trimmedMessage ? `Handwritten letter: "${trimmedMessage}"` : null,
      ].filter((v): v is string => Boolean(v)),
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2500);
  }

  return (
    <div>
      <p className="text-sm font-medium text-ink/60">
        {bouquet.shortDescription}
      </p>
      <p className="mt-4 text-lg leading-relaxed text-ink/75">
        {bouquet.description}
      </p>

      {bouquet.sizes.length > 1 && (
        <fieldset className="mt-8">
          <legend className="text-xs font-medium tracking-[0.1em] text-taupe uppercase">
            Size
          </legend>
          <div className="mt-3 flex flex-wrap gap-3">
            {bouquet.sizes.map((option) => (
              <label
                key={option.id}
                className={`flex h-12 cursor-pointer items-center rounded-[6px] border px-4 text-sm font-medium transition-colors duration-200 ${
                  sizeId === option.id
                    ? "border-ink bg-ink text-ivory"
                    : "border-ink/20 text-ink hover:border-ink/40"
                }`}
              >
                <input
                  type="radio"
                  name="size"
                  value={option.id}
                  checked={sizeId === option.id}
                  onChange={() => setSizeId(option.id)}
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
      )}

      <fieldset className="mt-8">
        <legend className="text-xs font-medium tracking-[0.1em] text-taupe uppercase">
          Handwritten letter{" "}
          <span className="text-ink/40 normal-case">(free add-on)</span>
        </legend>
        <p className="mt-2 text-sm text-ink/60">
          Tell us what you&rsquo;d like written, and we&rsquo;ll handwrite it
          onto a note included with your bouquet.
        </p>
        <textarea
          value={letterMessage}
          onChange={(e) => setLetterMessage(e.target.value)}
          placeholder="e.g. Happy birthday! Wishing you a wonderful year ahead."
          rows={4}
          maxLength={280}
          className="mt-3 w-full resize-none rounded-[6px] border border-ink/15 bg-ivory p-4 text-sm text-ink placeholder:text-ink/40 focus:border-ink/40 focus:outline-none"
        />
        <p className="mt-1 text-right text-xs text-ink/40">
          {letterMessage.length}/280
        </p>
      </fieldset>

      <div className="mt-8 flex items-center gap-4">
        <span className="text-xs font-medium tracking-[0.1em] text-taupe uppercase">
          Quantity
        </span>
        <div className="flex h-12 items-center rounded-[6px] border border-ink/20">
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

      <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-ink/10 pt-8">
        <p className="font-display text-2xl font-medium text-ink">
          {formatPrice(unitPrice * quantity)}
        </p>
        <button
          type="button"
          onClick={handleAddToCart}
          className="inline-flex h-12 items-center rounded-[6px] bg-ink px-6 text-sm font-medium text-ivory transition-colors duration-200 hover:bg-ink/90"
        >
          Add to cart
        </button>
        {justAdded && (
          <button
            type="button"
            onClick={() => router.push("/cart")}
            className="text-sm font-medium text-ink underline underline-offset-4"
          >
            Added — view cart
          </button>
        )}
      </div>
    </div>
  );
}
