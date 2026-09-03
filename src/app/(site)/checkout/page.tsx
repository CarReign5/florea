"use client";

import { useActionState, useState, type ReactNode } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import { createOrderAction, type CheckoutActionState } from "./actions";

const inputClass =
  "w-full rounded-[6px] border border-ink/15 bg-ivory p-3 text-sm text-ink placeholder:text-ink/40 focus:border-ink/40 focus:outline-none";

const initialCheckoutActionState: CheckoutActionState = { status: "idle" };

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium tracking-[0.1em] text-taupe uppercase">
        {label}
      </span>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-1 text-sm text-red-700">{error}</p>}
    </label>
  );
}

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [fulfillmentMethod, setFulfillmentMethod] = useState<
    "Delivery" | "Pickup"
  >("Delivery");
  const [state, formAction, isPending] = useActionState(
    createOrderAction,
    initialCheckoutActionState,
  );

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
        Complete your order
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-ink/70">
        Fill in your details below — we&rsquo;ll confirm by email and get your
        bouquet ready.
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

      <form action={formAction} className="mt-8 flex flex-col gap-6">
        <input type="hidden" name="items" value={JSON.stringify(items)} />

        {state.errors?.form && (
          <p className="rounded-[6px] border border-red-700/20 bg-red-50 px-4 py-3 text-sm text-red-700">
            {state.errors.form}
          </p>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Full name" error={state.errors?.customerName}>
            <input
              type="text"
              name="customerName"
              defaultValue={state.values?.customerName}
              required
              className={inputClass}
            />
          </Field>
          <Field label="Phone number" error={state.errors?.customerPhone}>
            <input
              type="tel"
              name="customerPhone"
              defaultValue={state.values?.customerPhone}
              required
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="Email" error={state.errors?.customerEmail}>
          <input
            type="email"
            name="customerEmail"
            defaultValue={state.values?.customerEmail}
            required
            className={inputClass}
          />
        </Field>

        <fieldset>
          <legend className="text-xs font-medium tracking-[0.1em] text-taupe uppercase">
            Fulfillment
          </legend>
          <div className="mt-3 flex flex-wrap gap-3">
            {(["Delivery", "Pickup"] as const).map((method) => (
              <label
                key={method}
                className={`flex h-12 cursor-pointer items-center rounded-[6px] border px-4 text-sm font-medium transition-colors duration-200 ${
                  fulfillmentMethod === method
                    ? "border-ink bg-ink text-ivory"
                    : "border-ink/20 text-ink hover:border-ink/40"
                }`}
              >
                <input
                  type="radio"
                  name="fulfillmentMethod"
                  value={method}
                  checked={fulfillmentMethod === method}
                  onChange={() => setFulfillmentMethod(method)}
                  className="sr-only"
                />
                {method}
              </label>
            ))}
          </div>
          {state.errors?.fulfillmentMethod && (
            <p className="mt-2 text-sm text-red-700">
              {state.errors.fulfillmentMethod}
            </p>
          )}
        </fieldset>

        <Field
          label={
            fulfillmentMethod === "Delivery" ? "Delivery address" : "Pickup note"
          }
          error={state.errors?.fulfillmentDetails}
        >
          <textarea
            name="fulfillmentDetails"
            defaultValue={state.values?.fulfillmentDetails}
            placeholder={
              fulfillmentMethod === "Delivery"
                ? "Street, barangay, city"
                : "Pickup at the studio"
            }
            rows={2}
            required
            className={inputClass}
          />
        </Field>

        <Field
          label="Preferred date/time"
          error={state.errors?.fulfillmentDateTime}
        >
          <input
            type="text"
            name="fulfillmentDateTime"
            defaultValue={state.values?.fulfillmentDateTime}
            placeholder="e.g. Aug 30, 2–5 PM"
            required
            className={inputClass}
          />
        </Field>

        <Field label="Gift message (optional)">
          <textarea
            name="giftMessage"
            defaultValue={state.values?.giftMessage}
            rows={3}
            maxLength={280}
            className={inputClass}
          />
        </Field>

        <div className="rounded-[6px] border border-ink/10 bg-ivory px-4 py-3 text-sm text-ink/70">
          Payment:{" "}
          <span className="font-medium text-ink">Pay on pickup/delivery</span>
        </div>

        {state.errors?.items && (
          <p className="text-sm text-red-700">{state.errors.items}</p>
        )}

        <div className="flex flex-wrap gap-4">
          <Link
            href="/cart"
            className="inline-flex h-12 items-center rounded-[6px] border border-ink/25 px-6 text-sm font-medium text-ink"
          >
            Back to cart
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex h-12 items-center rounded-[6px] bg-ink px-6 text-sm font-medium text-ivory transition-colors duration-200 hover:bg-ink/90 disabled:opacity-60"
          >
            {isPending ? "Placing order…" : "Place order"}
          </button>
        </div>
      </form>
    </div>
  );
}
