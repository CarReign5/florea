import Link from "next/link";
import { StatusPill } from "@/components/admin/StatusPill";
import { orders } from "@/lib/data/orders";
import { formatPrice } from "@/lib/format";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function AdminOrdersPage() {
  const pendingCount = orders.filter(
    (o) => o.status === "pending" || o.status === "paid",
  ).length;
  const revenue = orders
    .filter((o) => o.status !== "pending")
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div>
      <h1 className="font-display text-3xl font-medium text-ink">Orders</h1>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-[10px] border border-ink/10 bg-white p-4">
          <p className="text-xs font-medium tracking-[0.08em] text-taupe uppercase">
            Total orders
          </p>
          <p className="font-display mt-1 text-2xl text-ink">
            {orders.length}
          </p>
        </div>
        <div className="rounded-[10px] border border-ink/10 bg-white p-4">
          <p className="text-xs font-medium tracking-[0.08em] text-taupe uppercase">
            Needs action
          </p>
          <p className="font-display mt-1 text-2xl text-ink">
            {pendingCount}
          </p>
        </div>
        <div className="col-span-2 rounded-[10px] border border-ink/10 bg-white p-4 sm:col-span-1">
          <p className="text-xs font-medium tracking-[0.08em] text-taupe uppercase">
            Revenue (confirmed)
          </p>
          <p className="font-display mt-1 text-2xl text-ink">
            {formatPrice(revenue)}
          </p>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto rounded-[10px] border border-ink/10 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-xs tracking-[0.06em] text-taupe uppercase">
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Placed</th>
              <th className="px-4 py-3 font-medium">Fulfillment</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-ink/5 last:border-0 hover:bg-soft-beige/30"
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="font-medium text-ink underline-offset-4 hover:underline"
                  >
                    {order.orderNumber}
                  </Link>
                </td>
                <td className="px-4 py-3 text-ink/80">
                  {order.customerName}
                </td>
                <td className="px-4 py-3 text-ink/60">
                  {formatDate(order.placedAt)}
                </td>
                <td className="px-4 py-3 text-ink/60">
                  {order.fulfillmentMethod}
                </td>
                <td className="px-4 py-3">
                  <StatusPill status={order.status} />
                </td>
                <td className="px-4 py-3 text-right font-medium text-ink">
                  {formatPrice(order.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
