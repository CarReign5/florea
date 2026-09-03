"use client";

import { useState } from "react";
import type { OrderStatus } from "@/lib/data/orders";
import { statusLabels } from "@/lib/data/orders";

const statusOrder: OrderStatus[] = [
  "pending",
  "paid",
  "preparing",
  "out_for_delivery",
  "completed",
];

export function OrderStatusControl({
  initialStatus,
}: {
  initialStatus: OrderStatus;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [saved, setSaved] = useState(false);

  function handleChange(next: OrderStatus) {
    setStatus(next);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <label
        htmlFor="order-status"
        className="text-xs font-medium tracking-[0.08em] text-taupe uppercase"
      >
        Status
      </label>
      <select
        id="order-status"
        value={status}
        onChange={(e) => handleChange(e.target.value as OrderStatus)}
        className="mt-2 h-11 w-full rounded-[6px] border border-ink/20 bg-white px-3 text-sm font-medium text-ink"
      >
        {statusOrder.map((s) => (
          <option key={s} value={s}>
            {statusLabels[s]}
          </option>
        ))}
      </select>
      {saved && (
        <p className="mt-2 text-xs text-ink/50">
          Updated locally — not saved anywhere yet (no backend connected).
        </p>
      )}
    </div>
  );
}
