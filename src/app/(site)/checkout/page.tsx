"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-[640px] flex-col items-center px-6 py-28 text-center md:py-36">
        <p className="text-xs font-medium tracking-[0.14em] text-taupe uppercase">
          Checkout
        </p>
        <h1 className="font-display mt-4 text-4xl font-medium text-ink md:text-5xl">
          Your cart is empty.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink/70">
          Add a bouquet before continuing to checkout.
        </p>
        <div className="mt-8">
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
    <div className="mx-auto max-w-[720px] px-6 py-16 md:px-10 md:py-20">
      <p className="text-xs font-medium tracking-[0.14em] text-taupe uppercase">
        Checkout
      </p>
      <h1 className="font-display mt-4 text-4xl font-medium text-ink md:text-5xl">
        Online checkout is on its way.
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-ink/70">
        Online payment and delivery details aren&rsquo;t set up on the site
        just yet. For now, here&rsquo;s a summary of your order — send it to
        us on Facebook and we&rsquo;ll take it from there.
      </p>

      <div className="mt-8 rounded-[10px] border border-ink/10 bg-soft-beige/40 p-6">
        <p className="text-xs font-medium tracking-[0.1em] text-taupe uppercase">
          Order summary
        </p>
        <ul className="mt-4 space-y-4">
          {items.map((item) => (
            <li key={item.id} className="text-sm">
              <p className="font-medium text-ink">
                {item.quantity} &times; {item.name} —{" "}
                {formatPrice(item.unitPrice * item.quantity)}
              </p>
              {item.details.length > 0 && (
                <p className="text-ink/60">{item.details.join(", ")}</p>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-6 border-t border-ink/10 pt-4 font-display text-2xl font-medium text-ink">
          Subtotal: {formatPrice(subtotal)}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/cart"
          className="inline-flex h-12 items-center rounded-[6px] border border-ink/25 px-6 text-sm font-medium text-ink"
        >
          Back to cart
        </Link>
      </div>
    </div>
  );
}
