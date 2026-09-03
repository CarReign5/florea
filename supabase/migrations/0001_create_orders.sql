-- Orders table for Floréa checkout. Run this once in the Supabase SQL
-- Editor (Project → SQL Editor → New query → paste → Run).

create sequence if not exists orders_order_number_seq start with 1043;

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique
    default ('#FL-' || nextval('orders_order_number_seq')::text),
  placed_at timestamptz not null default now(),
  customer_name text not null,
  customer_phone text not null,
  customer_email text not null,
  fulfillment_method text not null
    check (fulfillment_method in ('Delivery', 'Pickup')),
  fulfillment_details text not null,
  fulfillment_date_time text not null,
  payment_method text not null
    check (payment_method in ('GCash/Maya', 'Pay on pickup/delivery')),
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'preparing', 'out_for_delivery', 'completed')),
  gift_message text not null default '',
  items jsonb not null,
  total numeric not null
);

-- No policies are added, so only the service_role key (used server-side
-- only, in orders-store.ts) can read/write. Anon/public access is fully
-- blocked, which is correct since orders contain customer PII and there's
-- no admin auth yet to gate a public policy behind.
alter table orders enable row level security;

-- Seed data, so the admin dashboard isn't empty. Explicit order_number
-- values here don't consume the sequence, so new orders still start at
-- #FL-1043.
insert into orders (
  id, order_number, placed_at, customer_name, customer_phone, customer_email,
  fulfillment_method, fulfillment_details, fulfillment_date_time,
  payment_method, status, gift_message, items, total
) values
  (
    gen_random_uuid(), '#FL-1042', '2026-08-27T16:12:00+08:00',
    'Maria Santos', '+63 917 123 4567', 'maria@example.com',
    'Delivery', '123 Pioneer Avenue, General Santos City', 'Aug 30, 2026, 2:00–5:00 PM',
    'GCash/Maya', 'paid',
    'To someone who makes life more beautiful just by being in it.',
    '[
      {"name":"Fuzzy Garden Bouquet","quantity":1,"unitPrice":1710,"options":["Grand (14 stems)","Ceramic keepsake vase"]},
      {"name":"Custom bouquet","quantity":1,"unitPrice":930,"options":["6 stems of Crochet sunflower","Colors: Ivory","Wrapping: Champagne matte wrapper"]}
    ]'::jsonb,
    2640
  ),
  (
    gen_random_uuid(), '#FL-1041', '2026-08-27T11:03:00+08:00',
    'Jules Ramos', '+63 998 456 7890', 'jules.ramos@example.com',
    'Pickup', 'Pickup at the studio', 'Aug 28, 2026, 10:00 AM',
    'Pay on pickup/delivery', 'preparing', '',
    '[{"name":"Little Everyday Bunch","quantity":2,"unitPrice":420,"options":["Petite (5 stems)"]}]'::jsonb,
    840
  ),
  (
    gen_random_uuid(), '#FL-1040', '2026-08-26T19:45:00+08:00',
    'Andrea Cruz', '+63 917 555 2211', 'andrea.cruz@example.com',
    'Delivery', '45 Lagao Road, General Santos City', 'Aug 27, 2026, 9:00–12:00 PM',
    'GCash/Maya', 'out_for_delivery',
    'Happy anniversary! Made slowly, given meaningfully.',
    '[{"name":"Dusty Rose Keepsake","quantity":1,"unitPrice":1310,"options":["Grand (14 stems)"]}]'::jsonb,
    1310
  ),
  (
    gen_random_uuid(), '#FL-1039', '2026-08-25T09:22:00+08:00',
    'Ben Villareal', '+63 917 888 3344', 'ben.v@example.com',
    'Pickup', 'Pickup at the studio', 'Aug 25, 2026, 4:00 PM',
    'Pay on pickup/delivery', 'completed', '',
    '[{"name":"Sunlit Sunflower Mix","quantity":1,"unitPrice":740,"options":["Petite (5 stems)"]}]'::jsonb,
    740
  ),
  (
    gen_random_uuid(), '#FL-1038', '2026-08-24T14:50:00+08:00',
    'Kim Alvarez', '+63 917 222 9988', 'kim.alvarez@example.com',
    'Delivery', '8 Santiago Blvd, General Santos City', 'Aug 26, 2026, 1:00–4:00 PM',
    'GCash/Maya', 'pending', '',
    '[
      {"name":"Ivory & Champagne","quantity":1,"unitPrice":850,"options":["Classic (9 stems)"]},
      {"name":"Crochet Daisy Bunch","quantity":1,"unitPrice":620,"options":["Petite (5 stems)"]}
    ]'::jsonb,
    1470
  )
on conflict (order_number) do nothing;
