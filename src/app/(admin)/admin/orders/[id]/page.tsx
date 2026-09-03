import { notFound } from "next/navigation";
import Link from "next/link";
import { OrderStatusControl } from "@/components/admin/OrderStatusControl";
import { getOrderById } from "@/lib/data/orders-store";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminOrderDetailPage(
  props: PageProps<"/admin/orders/[id]">,
) {
  const { id } = await props.params;
  const order = await getOrderById(id);

  if (!order) notFound();

  return (
    <div>
      <Link
        href="/admin/orders"
        className="text-sm font-medium text-ink/60 hover:text-ink"
      >
        &larr; All orders
      </Link>

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="font-display text-3xl font-medium text-ink">
          {order.orderNumber}
        </h1>
        <p className="text-sm text-ink/60">
          Placed{" "}
          {new Date(order.placedAt).toLocaleString("en-PH", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_280px]">
        <div className="flex flex-col gap-8">
          <section className="rounded-[10px] border border-ink/10 bg-white p-5">
            <p className="text-xs font-medium tracking-[0.08em] text-taupe uppercase">
              Customer
            </p>
            <dl className="mt-3 space-y-1 text-sm">
              <div className="flex gap-2">
                <dt className="w-20 text-ink/50">Name</dt>
                <dd className="text-ink">{order.customerName}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-20 text-ink/50">Phone</dt>
                <dd className="text-ink">{order.customerPhone}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-20 text-ink/50">Email</dt>
                <dd className="text-ink">{order.customerEmail}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-[10px] border border-ink/10 bg-white p-5">
            <p className="text-xs font-medium tracking-[0.08em] text-taupe uppercase">
              {order.fulfillmentMethod}
            </p>
            <p className="mt-2 text-sm text-ink">{order.fulfillmentDetails}</p>
            <p className="mt-1 text-sm text-ink/60">
              Requested for: {order.fulfillmentDateTime}
            </p>
            <p className="mt-3 text-sm text-ink/60">
              Payment: <span className="text-ink">{order.paymentMethod}</span>
            </p>
          </section>

          {order.giftMessage && (
            <section className="rounded-[10px] border border-ink/10 bg-soft-beige/40 p-5">
              <p className="text-xs font-medium tracking-[0.08em] text-taupe uppercase">
                Gift note
              </p>
              <p className="mt-2 font-mono text-sm text-ink/80">
                &ldquo;{order.giftMessage}&rdquo;
              </p>
            </section>
          )}

          <section className="rounded-[10px] border border-ink/10 bg-white p-5">
            <p className="text-xs font-medium tracking-[0.08em] text-taupe uppercase">
              Items
            </p>
            <ul className="mt-3 flex flex-col gap-4">
              {order.items.map((item, i) => (
                <li key={i}>
                  <p className="font-medium text-ink">
                    {item.quantity} &times; {item.name} —{" "}
                    {formatPrice(item.unitPrice * item.quantity)}
                  </p>
                  {item.options.length > 0 && (
                    <p className="text-sm text-ink/60">
                      {item.options.join(", ")}
                    </p>
                  )}
                </li>
              ))}
            </ul>
            <p className="font-display mt-4 border-t border-ink/10 pt-4 text-xl text-ink">
              Total: {formatPrice(order.total)}
            </p>
          </section>
        </div>

        <aside className="h-fit rounded-[10px] border border-ink/10 bg-white p-5">
          <OrderStatusControl initialStatus={order.status} />
        </aside>
      </div>
    </div>
  );
}
