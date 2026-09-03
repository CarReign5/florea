export type OrderStatus =
  | "pending"
  | "paid"
  | "preparing"
  | "out_for_delivery"
  | "completed";

export type OrderItem = {
  name: string;
  quantity: number;
  unitPrice: number;
  options: string[];
};

export type Order = {
  id: string;
  orderNumber: string;
  placedAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  fulfillmentMethod: "Delivery" | "Pickup";
  fulfillmentDetails: string;
  fulfillmentDateTime: string;
  paymentMethod: "GCash/Maya" | "Pay on pickup/delivery";
  status: OrderStatus;
  giftMessage: string;
  items: OrderItem[];
  total: number;
};

export const statusLabels: Record<OrderStatus, string> = {
  pending: "Pending",
  paid: "Paid",
  preparing: "Preparing",
  out_for_delivery: "Out for delivery",
  completed: "Completed",
};
