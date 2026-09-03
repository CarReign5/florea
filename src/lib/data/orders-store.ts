import "server-only";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Order, OrderItem } from "@/lib/data/orders";
import { SEED_ORDERS } from "@/lib/data/orders-seed";

/**
 * Local JSON-file order store — a stand-in for Supabase until that account
 * exists. Process-local file storage works for `next dev` / a single
 * `next start` process, but does NOT work on serverless/multi-instance hosts
 * (e.g. Vercel, where the filesystem is read-only outside /tmp and instances
 * don't share state). Swap this module out for a real Supabase-backed DAL
 * once that account is set up — callers only depend on this file's exports,
 * not its storage mechanism.
 */

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "orders.json");

// Serializes every read-modify-write cycle so concurrent submits can't both
// read the same pre-append array and clobber each other.
let writeQueue: Promise<unknown> = Promise.resolve();
function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = writeQueue.then(task, task);
  writeQueue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function readOrdersFromDisk(): Promise<Order[]> {
  try {
    const raw = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Order[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      await writeOrdersToDisk(SEED_ORDERS);
      return SEED_ORDERS;
    }
    throw err;
  }
}

async function writeOrdersToDisk(orders: Order[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  const tmpFile = `${DATA_FILE}.${randomUUID()}.tmp`;
  await writeFile(tmpFile, JSON.stringify(orders, null, 2), "utf-8");
  await rename(tmpFile, DATA_FILE);
}

export async function listOrders(): Promise<Order[]> {
  const orders = await readOrdersFromDisk();
  return [...orders].sort(
    (a, b) => new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime(),
  );
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  const orders = await readOrdersFromDisk();
  return orders.find((order) => order.id === id);
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

function nextOrderNumber(orders: Order[]): string {
  const max = orders.reduce((highest, order) => {
    const match = /^#FL-(\d+)$/.exec(order.orderNumber);
    if (!match) return highest;
    return Math.max(highest, Number(match[1]));
  }, 999);
  return `#FL-${max + 1}`;
}

export type CreateOrderResult =
  | { ok: true; order: Order }
  | { ok: false; errors: Record<string, string> };

export function createOrder(
  input: CreateOrderInput,
): Promise<CreateOrderResult> {
  return enqueue(async () => {
    const validated = validateCreateOrderInput(input);
    if (!validated.ok) {
      return { ok: false, errors: validated.errors };
    }
    const { data } = validated;

    const orders = await readOrdersFromDisk();
    const total = data.items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0,
    );

    const order: Order = {
      id: randomUUID(),
      orderNumber: nextOrderNumber(orders),
      placedAt: new Date().toISOString(),
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail,
      fulfillmentMethod: data.fulfillmentMethod,
      fulfillmentDetails: data.fulfillmentDetails,
      fulfillmentDateTime: data.fulfillmentDateTime,
      paymentMethod: "Pay on pickup/delivery",
      status: "pending",
      giftMessage: data.giftMessage,
      items: data.items,
      total,
    };

    await writeOrdersToDisk([...orders, order]);
    return { ok: true, order };
  });
}
