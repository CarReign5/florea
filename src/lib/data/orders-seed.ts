import type { Order } from "@/lib/data/orders";

/**
 * Seed data for the local JSON order store (see orders-store.ts). Used to
 * populate data/orders.json on first run so the admin dashboard isn't empty
 * before any real orders exist.
 */
export const SEED_ORDERS: Order[] = [
  {
    id: "1",
    orderNumber: "#FL-1042",
    placedAt: "2026-08-27T16:12:00+08:00",
    customerName: "Maria Santos",
    customerPhone: "+63 917 123 4567",
    customerEmail: "maria@example.com",
    fulfillmentMethod: "Delivery",
    fulfillmentDetails: "123 Pioneer Avenue, General Santos City",
    fulfillmentDateTime: "Aug 30, 2026, 2:00–5:00 PM",
    paymentMethod: "GCash/Maya",
    status: "paid",
    giftMessage:
      "To someone who makes life more beautiful just by being in it.",
    items: [
      {
        name: "Fuzzy Garden Bouquet",
        quantity: 1,
        unitPrice: 1710,
        options: ["Grand (14 stems)", "Ceramic keepsake vase"],
      },
      {
        name: "Custom bouquet",
        quantity: 1,
        unitPrice: 930,
        options: [
          "6 stems of Crochet sunflower",
          "Colors: Ivory",
          "Wrapping: Champagne matte wrapper",
        ],
      },
    ],
    total: 2640,
  },
  {
    id: "2",
    orderNumber: "#FL-1041",
    placedAt: "2026-08-27T11:03:00+08:00",
    customerName: "Jules Ramos",
    customerPhone: "+63 998 456 7890",
    customerEmail: "jules.ramos@example.com",
    fulfillmentMethod: "Pickup",
    fulfillmentDetails: "Pickup at the studio",
    fulfillmentDateTime: "Aug 28, 2026, 10:00 AM",
    paymentMethod: "Pay on pickup/delivery",
    status: "preparing",
    giftMessage: "",
    items: [
      {
        name: "Little Everyday Bunch",
        quantity: 2,
        unitPrice: 420,
        options: ["Petite (5 stems)"],
      },
    ],
    total: 840,
  },
  {
    id: "3",
    orderNumber: "#FL-1040",
    placedAt: "2026-08-26T19:45:00+08:00",
    customerName: "Andrea Cruz",
    customerPhone: "+63 917 555 2211",
    customerEmail: "andrea.cruz@example.com",
    fulfillmentMethod: "Delivery",
    fulfillmentDetails: "45 Lagao Road, General Santos City",
    fulfillmentDateTime: "Aug 27, 2026, 9:00–12:00 PM",
    paymentMethod: "GCash/Maya",
    status: "out_for_delivery",
    giftMessage: "Happy anniversary! Made slowly, given meaningfully.",
    items: [
      {
        name: "Dusty Rose Keepsake",
        quantity: 1,
        unitPrice: 1310,
        options: ["Grand (14 stems)"],
      },
    ],
    total: 1310,
  },
  {
    id: "4",
    orderNumber: "#FL-1039",
    placedAt: "2026-08-25T09:22:00+08:00",
    customerName: "Ben Villareal",
    customerPhone: "+63 917 888 3344",
    customerEmail: "ben.v@example.com",
    fulfillmentMethod: "Pickup",
    fulfillmentDetails: "Pickup at the studio",
    fulfillmentDateTime: "Aug 25, 2026, 4:00 PM",
    paymentMethod: "Pay on pickup/delivery",
    status: "completed",
    giftMessage: "",
    items: [
      {
        name: "Sunlit Sunflower Mix",
        quantity: 1,
        unitPrice: 740,
        options: ["Petite (5 stems)"],
      },
    ],
    total: 740,
  },
  {
    id: "5",
    orderNumber: "#FL-1038",
    placedAt: "2026-08-24T14:50:00+08:00",
    customerName: "Kim Alvarez",
    customerPhone: "+63 917 222 9988",
    customerEmail: "kim.alvarez@example.com",
    fulfillmentMethod: "Delivery",
    fulfillmentDetails: "8 Santiago Blvd, General Santos City",
    fulfillmentDateTime: "Aug 26, 2026, 1:00–4:00 PM",
    paymentMethod: "GCash/Maya",
    status: "pending",
    giftMessage: "",
    items: [
      {
        name: "Ivory & Champagne",
        quantity: 1,
        unitPrice: 850,
        options: ["Classic (9 stems)"],
      },
      {
        name: "Crochet Daisy Bunch",
        quantity: 1,
        unitPrice: 620,
        options: ["Petite (5 stems)"],
      },
    ],
    total: 1470,
  },
];
