import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Order, OrderItem } from "@/lib/data/orders";

let client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error(
      "Orders are unavailable — SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not configured.",
    );
  }

  client = createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
  return client;
}

type OrderRow = {
  id: string;
  order_number: string;
  placed_at: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  fulfillment_method: Order["fulfillmentMethod"];
  fulfillment_details: string;
  fulfillment_date_time: string;
  payment_method: Order["paymentMethod"];
  status: Order["status"];
  gift_message: string;
  items: OrderItem[];
  total: number;
};

function mapRowToOrder(row: OrderRow): Order {
  return {
    id: row.id,
    orderNumber: row.order_number,
    placedAt: row.placed_at,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    customerEmail: row.customer_email,
    fulfillmentMethod: row.fulfillment_method,
    fulfillmentDetails: row.fulfillment_details,
    fulfillmentDateTime: row.fulfillment_date_time,
    paymentMethod: row.payment_method,
    status: row.status,
    giftMessage: row.gift_message,
    items: row.items,
    total: row.total,
  };
}

export async function listOrders(): Promise<Order[]> {
  const { data, error } = await getClient()
    .from("orders")
    .select("*")
    .order("placed_at", { ascending: false });

  if (error) {
    console.error("[orders-store] Failed to list orders:", error);
    throw new Error("Failed to load orders.");
  }

  return (data as OrderRow[]).map(mapRowToOrder);
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  const { data, error } = await getClient()
    .from("orders")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[orders-store] Failed to load order:", error);
    throw new Error("Failed to load order.");
  }

  return data ? mapRowToOrder(data as OrderRow) : undefined;
}

export type CreateOrderInput = {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  fulfillmentMethod: string;
  fulfillmentDetails: string;
  fulfillmentDateTime: string;
  giftMessage: string;
  items: OrderItem[];
};

type ValidationResult =
  | { ok: true; data: CreateOrderInput & { fulfillmentMethod: "Delivery" | "Pickup" } }
  | { ok: false; errors: Record<string, string> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateCreateOrderInput(input: CreateOrderInput): ValidationResult {
  const errors: Record<string, string> = {};

  const customerName = input.customerName.trim();
  if (!customerName) errors.customerName = "Please enter your name.";

  const customerPhone = input.customerPhone.trim();
  if (!customerPhone) errors.customerPhone = "Please enter a phone number.";

  const customerEmail = input.customerEmail.trim();
  if (!customerEmail || !EMAIL_RE.test(customerEmail)) {
    errors.customerEmail = "Please enter a valid email address.";
  }

  const fulfillmentMethod = input.fulfillmentMethod.trim();
  if (fulfillmentMethod !== "Delivery" && fulfillmentMethod !== "Pickup") {
    errors.fulfillmentMethod = "Please choose delivery or pickup.";
  }

  const fulfillmentDetails = input.fulfillmentDetails.trim();
  if (!fulfillmentDetails) {
    errors.fulfillmentDetails = "Please provide an address or pickup note.";
  }

  const fulfillmentDateTime = input.fulfillmentDateTime.trim();
  if (!fulfillmentDateTime) {
    errors.fulfillmentDateTime = "Please provide a date/time.";
  }

  if (
    !Array.isArray(input.items) ||
    input.items.length === 0 ||
    input.items.some(
      (item) =>
        !item.name?.trim() ||
        !(item.unitPrice > 0) ||
        !(item.quantity >= 1),
    )
  ) {
    errors.items = "Your cart is empty or contains invalid items.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      customerName,
      customerPhone,
      customerEmail,
      fulfillmentMethod: fulfillmentMethod as "Delivery" | "Pickup",
      fulfillmentDetails,
      fulfillmentDateTime,
      giftMessage: input.giftMessage.trim(),
      items: input.items,
    },
  };
}

export type CreateOrderResult =
  | { ok: true; order: Order }
  | { ok: false; errors: Record<string, string> };

export async function createOrder(
  input: CreateOrderInput,
): Promise<CreateOrderResult> {
  const validated = validateCreateOrderInput(input);
  if (!validated.ok) {
    return { ok: false, errors: validated.errors };
  }
  const { data: order } = validated;

  const total = order.items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );

  const { data, error } = await getClient()
    .from("orders")
    .insert({
      customer_name: order.customerName,
      customer_phone: order.customerPhone,
      customer_email: order.customerEmail,
      fulfillment_method: order.fulfillmentMethod,
      fulfillment_details: order.fulfillmentDetails,
      fulfillment_date_time: order.fulfillmentDateTime,
      payment_method: "Pay on pickup/delivery",
      status: "pending",
      gift_message: order.giftMessage,
      items: order.items,
      total,
    })
    .select()
    .single();

  if (error) {
    console.error("[orders-store] Failed to create order:", error);
    return {
      ok: false,
      errors: { form: "Something went wrong saving your order. Please try again." },
    };
  }

  return { ok: true, order: mapRowToOrder(data as OrderRow) };
}
