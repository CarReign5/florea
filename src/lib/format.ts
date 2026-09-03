export function formatPrice(amount: number): string {
  return `₱${amount.toLocaleString("en-PH")}`;
}

export function formatOrderDate(iso: string): string {
  return new Date(iso).toLocaleString("en-PH", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
