"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-[640px] flex-col items-center px-6 py-28 text-center md:py-36">
        <p className="text-xs font-medium tracking-[0.14em] text-taupe uppercase">
          Your cart
        </p>
        <h1 className="font-display mt-4 text-4xl font-medium text-ink md:text-5xl">
          Your cart is empty.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink/70">
          Browse the collection to get started.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/shop"
            className="inline-flex h-12 items-center rounded-[6px] bg-ink px-6 text-sm font-medium text-ivory"
          >
            Shop the collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[900px] px-6 py-16 md:px-10 md:py-20">
      <p className="text-xs font-medium tracking-[0.14em] text-taupe uppercase">
        Your cart
      </p>
      <h1 className="font-display mt-4 text-4xl font-medium text-ink md:text-5xl">
        Review your order
      </h1>

      <ul className="mt-10 flex flex-col gap-6">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-4 rounded-[10px] border border-ink/10 p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-display text-xl font-medium text-ink">
                {item.name}
              </p>
              {item.details.length > 0 && (
                <ul className="mt-1 text-sm text-ink/60">
                  {item.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              )}
              <p className="mt-2 text-sm font-medium text-ink">
                {formatPrice(item.unitPrice)} each
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-11 items-center rounded-[6px] border border-ink/20">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() =>
                    updateQuantity(item.id, item.quantity - 1)
                  }
                  className="flex h-full w-9 items-center justify-center text-lg"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-medium">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() =>
                    updateQuantity(item.id, item.quantity + 1)
                  }
                  className="flex h-full w-9 items-center justify-center text-lg"
                >
                  +
                </button>
              </div>
              <p className="w-24 text-right text-sm font-medium text-ink">
                {formatPrice(item.unitPrice * item.quantity)}
              </p>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                aria-label={`Remove ${item.name} from cart`}
                className="text-sm text-ink/50 underline underline-offset-4 hover:text-ink"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col items-end gap-4 border-t border-ink/10 pt-8">
        <p className="font-display text-2xl font-medium text-ink">
          Subtotal: {formatPrice(subtotal)}
        </p>
        <Link
          href="/checkout"
          className="inline-flex h-12 items-center rounded-[6px] bg-ink px-6 text-sm font-medium text-ivory transition-colors duration-200 hover:bg-ink/90"
        >
          Continue to checkout
        </Link>
      </div>
    </div>
  );
}
