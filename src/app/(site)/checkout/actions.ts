"use server";

import { redirect } from "next/navigation";
import {
  createOrder,
  type CreateOrderInput,
} from "@/lib/data/orders-store";
import type { Order, OrderItem } from "@/lib/data/orders";
import {
  getLogoUrl,
  sendOrderConfirmationEmail,
  sendOrderNotificationEmail,
} from "@/lib/email";
import type { EmailOrderItem } from "@/lib/email-templates";
import { formatOrderDate, formatPrice } from "@/lib/format";

export type CheckoutActionState = {
  status: "idle" | "error";
  errors?: Record<string, string>;
  values?: Record<string, string>;
};

function toEmailItems(items: OrderItem[]): EmailOrderItem[] {
  return items.map((item) => ({
    quantity: item.quantity,
    name: item.name,
    lineTotal: formatPrice(item.unitPrice * item.quantity),
    options: item.options.join(", "),
  }));
}

function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? fullName;
}

async function notifyOrderCreated(order: Order): Promise<void> {
  const logoUrl = getLogoUrl();
  const emailItems = toEmailItems(order.items);
  const fulfillmentVerb =
    order.fulfillmentMethod === "Delivery" ? "delivery" : "pickup";

  const sends = [
    {
      label: "confirmation",
      promise: sendOrderConfirmationEmail(order.customerEmail, {
        customerFirstName: firstName(order.customerName),
        orderNumber: order.orderNumber,
        orderDate: formatOrderDate(order.placedAt),
        items: emailItems,
        subtotal: formatPrice(order.total),
        deliveryFee: "Free",
        orderTotal: formatPrice(order.total),
        fulfillmentMethod: order.fulfillmentMethod,
        fulfillmentDetails: order.fulfillmentDetails,
        fulfillmentVerb,
        logoUrl,
      }),
    },
    {
      label: "notification",
      promise: sendOrderNotificationEmail({
        orderNumber: order.orderNumber,
        orderDate: formatOrderDate(order.placedAt),
        paymentStatusLabel: "Pending — pay on pickup/delivery",
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        customerEmail: order.customerEmail,
        fulfillmentMethod: order.fulfillmentMethod,
        fulfillmentDetails: order.fulfillmentDetails,
        fulfillmentDateTime: order.fulfillmentDateTime,
        giftMessage: order.giftMessage,
        items: emailItems,
        orderTotal: formatPrice(order.total),
        logoUrl,
      }),
    },
  ] as const;

  const results = await Promise.allSettled(sends.map((s) => s.promise));

  results.forEach((result, i) => {
    const { label } = sends[i];
    if (result.status === "rejected") {
      console.error(`[checkout] Order ${label} email failed:`, result.reason);
    } else if (!result.value.sent) {
      console.warn(`[checkout] Order ${label} email skipped:`, result.value.reason);
    }
  });
}

export async function createOrderAction(
  _prevState: CheckoutActionState,
  formData: FormData,
): Promise<CheckoutActionState> {
  const values = {
    customerName: String(formData.get("customerName") ?? ""),
    customerPhone: String(formData.get("customerPhone") ?? ""),
    customerEmail: String(formData.get("customerEmail") ?? ""),
    fulfillmentMethod: String(formData.get("fulfillmentMethod") ?? ""),
    fulfillmentDetails: String(formData.get("fulfillmentDetails") ?? ""),
    fulfillmentDateTime: String(formData.get("fulfillmentDateTime") ?? ""),
    giftMessage: String(formData.get("giftMessage") ?? ""),
  };

  let items: OrderItem[];
  try {
    items = JSON.parse(String(formData.get("items") ?? "[]"));
  } catch {
    return {
      status: "error",
      errors: { items: "Your cart couldn't be read. Please try again." },
      values,
    };
  }

  const input: CreateOrderInput = { ...values, items };
  const result = await createOrder(input);

  if (!result.ok) {
    return { status: "error", errors: result.errors, values };
  }

  await notifyOrderCreated(result.order);

  redirect(`/checkout/confirmation/${result.order.id}`);
}
