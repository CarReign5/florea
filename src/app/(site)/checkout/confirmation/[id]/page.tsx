import { notFound } from "next/navigation";
import Link from "next/link";
import { ClearCartOnMount } from "@/components/ClearCartOnMount";
import { getOrderById } from "@/lib/data/orders-store";
import { formatOrderDate, formatPrice } from "@/lib/format";

export default async function CheckoutConfirmationPage(
  props: PageProps<"/checkout/confirmation/[id]">,
) {
  const { id } = await props.params;
  const order = await getOrderById(id);

  if (!order) notFound();

  return (
    <div className="mx-auto max-w-[720px] px-6 py-16 md:px-10 md:py-20">
      <ClearCartOnMount />

      <p className="text-xs font-medium tracking-[0.14em] text-taupe uppercase">
        Order confirmed
      </p>
      <h1 className="font-display mt-4 text-4xl font-medium text-ink md:text-5xl">
        Thank you, {order.customerName.split(" ")[0]}.
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-ink/70">
        Your order {order.orderNumber} has been placed. We&rsquo;ve sent a
        confirmation to {order.customerEmail}, and we&rsquo;ll be in touch to
        get it ready.
      </p>

      <div className="mt-8 rounded-[10px] border border-ink/10 bg-soft-beige/40 p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-xs font-medium tracking-[0.1em] text-taupe uppercase">
            Order summary
          </p>
          <p className="text-sm text-ink/60">
            Placed {formatOrderDate(order.placedAt)}
          </p>
        </div>
        <ul className="mt-4 space-y-4">
          {order.items.map((item, i) => (
            <li key={i} className="text-sm">
              <p className="font-medium text-ink">
                {item.quantity} &times; {item.name} —{" "}
                {formatPrice(item.unitPrice * item.quantity)}
              </p>
              {item.options.length > 0 && (
                <p className="text-ink/60">{item.options.join(", ")}</p>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-6 border-t border-ink/10 pt-4 font-display text-2xl font-medium text-ink">
          Total: {formatPrice(order.total)}
        </p>

        <div className="mt-6 space-y-1 border-t border-ink/10 pt-4 text-sm text-ink/70">
          <p>
            {order.fulfillmentMethod}:{" "}
            <span className="text-ink">{order.fulfillmentDetails}</span>
          </p>
          <p>
            Requested for:{" "}
            <span className="text-ink">{order.fulfillmentDateTime}</span>
          </p>
          <p>
            Payment: <span className="text-ink">{order.paymentMethod}</span>
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/shop"
          className="inline-flex h-12 items-center rounded-[6px] bg-ink px-6 text-sm font-medium text-ivory"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
