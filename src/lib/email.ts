import "server-only";
import { Resend } from "resend";
import {
  renderOrderConfirmationEmail,
  renderOrderNotificationEmail,
  type OrderConfirmationEmailData,
  type OrderNotificationEmailData,
} from "@/lib/email-templates";

type SendResult =
  | { sent: true }
  | { sent: false; reason: string };

function getClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function getFromAddress(): string | null {
  return process.env.RESEND_FROM_EMAIL ?? null;
}

/** ${NEXT_PUBLIC_SITE_URL}/logo.png — falls back to a relative path,
 * which only resolves once NEXT_PUBLIC_SITE_URL is set to the real
 * deployed domain (email clients can't load relative URLs). */
export function getLogoUrl(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return siteUrl ? `${siteUrl.replace(/\/$/, "")}/logo.png` : "/logo.png";
}

export async function sendOrderConfirmationEmail(
  to: string,
  data: OrderConfirmationEmailData,
): Promise<SendResult> {
  const client = getClient();
  const from = getFromAddress();

  if (!client || !from) {
    console.warn(
      "[email] Skipping order confirmation send — RESEND_API_KEY or RESEND_FROM_EMAIL not configured.",
    );
    return { sent: false, reason: "not_configured" };
  }

  const { subject, html } = renderOrderConfirmationEmail(data);
  const { error } = await client.emails.send({ from, to, subject, html });

  if (error) {
    console.error("[email] Failed to send order confirmation:", error);
    return { sent: false, reason: error.message };
  }

  return { sent: true };
}

export async function sendOrderNotificationEmail(
  data: OrderNotificationEmailData,
): Promise<SendResult> {
  const client = getClient();
  const from = getFromAddress();
  const ownerEmail = process.env.OWNER_NOTIFICATION_EMAIL;

  if (!client || !from || !ownerEmail) {
    console.warn(
      "[email] Skipping order notification send — RESEND_API_KEY, RESEND_FROM_EMAIL, or OWNER_NOTIFICATION_EMAIL not configured.",
    );
    return { sent: false, reason: "not_configured" };
  }

  const { subject, html } = renderOrderNotificationEmail(data);
  const { error } = await client.emails.send({
    from,
    to: ownerEmail,
    subject,
    html,
  });

  if (error) {
    console.error("[email] Failed to send order notification:", error);
    return { sent: false, reason: error.message };
  }

  return { sent: true };
}
