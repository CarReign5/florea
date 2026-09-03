import type { OrderStatus } from "@/lib/data/orders";
import { statusLabels } from "@/lib/data/orders";

const styles: Record<OrderStatus, string> = {
  pending: "bg-soft-beige text-ink",
  paid: "bg-sage text-white",
  preparing: "bg-champagne text-ink",
  out_for_delivery: "bg-dusty-rose text-ink",
  completed: "bg-ink text-ivory",
};

export function StatusPill({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-flex h-6 items-center rounded-full px-3 text-xs font-medium whitespace-nowrap ${styles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}
