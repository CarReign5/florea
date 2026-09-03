"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export function CartIndicator() {
  const { count } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={`View cart, ${count} item${count === 1 ? "" : "s"}`}
      className="relative flex h-11 w-11 items-center justify-center rounded-[6px] border border-ink/15 text-ink"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 6h13l-1.4 8.2a1.5 1.5 0 0 1-1.48 1.3H6.88a1.5 1.5 0 0 1-1.48-1.3L4 6Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path
          d="M7 6V5a3 3 0 0 1 6 0v1"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[11px] font-medium text-ivory">
          {count}
        </span>
      )}
    </Link>
  );
}
