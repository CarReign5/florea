/**
 * Renders the order emails as HTML strings for sending via Resend.
 *
 * Kept in sync with the reviewed designs in src/emails/*.html — those
 * files are the visual reference; this is the implementation actually
 * used to send. Table-based layout + inline styles throughout, since
 * email clients don't support external CSS or most modern layout CSS.
 */

export type EmailOrderItem = {
  quantity: number;
  name: string;
  lineTotal: string;
  options: string;
};

export type OrderConfirmationEmailData = {
  customerFirstName: string;
  orderNumber: string;
  orderDate: string;
  items: EmailOrderItem[];
  subtotal: string;
  deliveryFee: string;
  orderTotal: string;
  fulfillmentMethod: string;
  fulfillmentDetails: string;
  fulfillmentVerb: string;
  logoUrl: string;
};

export type OrderNotificationEmailData = {
  orderNumber: string;
  orderDate: string;
  paymentStatusLabel: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  fulfillmentMethod: string;
  fulfillmentDetails: string;
  fulfillmentDateTime: string;
  giftMessage: string;
  items: EmailOrderItem[];
  orderTotal: string;
  logoUrl: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderItemsRows(items: EmailOrderItem[]): string {
  return items
    .map(
      (item) => `
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                  <tr>
                    <td style="font-size:15px; color:#292522; font-weight:bold;">${escapeHtml(String(item.quantity))} &times; ${escapeHtml(item.name)}</td>
                    <td style="font-size:15px; color:#292522; text-align:right; font-weight:bold;">${escapeHtml(item.lineTotal)}</td>
                  </tr>
                  <tr>
                    <td colspan="2" style="font-size:13px; color:rgba(41,37,34,0.6); padding-top:2px;">${escapeHtml(item.options)}</td>
                  </tr>
                </table>`,
    )
    .join("");
}

export function renderOrderConfirmationEmail(data: OrderConfirmationEmailData): {
  subject: string;
  html: string;
} {
  const subject = `Your Floréa order is confirmed — ${data.orderNumber}`;

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0; padding:0; background-color:#FAF7F2; font-family:Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF7F2;">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#FFFFFF; border:1px solid rgba(41,37,34,0.1); border-radius:10px; overflow:hidden;">

            <tr>
              <td align="center" style="padding:32px 32px 16px; background-color:#FAF7F2;">
                <img src="${escapeHtml(data.logoUrl)}" width="220" alt="Floréa" style="display:block; width:220px; height:auto; margin:0 auto; border:0; font-family:Georgia,'Times New Roman',serif; font-size:16px; color:#9B846E;" />
              </td>
            </tr>

            <tr>
              <td style="padding:36px 32px 8px;">
                <p style="margin:0 0 4px; font-family:Georgia,'Times New Roman',serif; font-size:26px; color:#292522;">Thank you, ${escapeHtml(data.customerFirstName)}.</p>
                <p style="margin:0; font-size:15px; line-height:1.6; color:rgba(41,37,34,0.75);">
                  Your order is confirmed — we're already looking forward to making it by hand.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 32px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(41,37,34,0.1); border-bottom:1px solid rgba(41,37,34,0.1);">
                  <tr>
                    <td style="padding:16px 0; font-size:13px; color:rgba(41,37,34,0.5);">Order number</td>
                    <td style="padding:16px 0; font-size:13px; color:#292522; text-align:right; font-weight:bold;">${escapeHtml(data.orderNumber)}</td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 16px; font-size:13px; color:rgba(41,37,34,0.5);">Order date</td>
                    <td style="padding:0 0 16px; font-size:13px; color:#292522; text-align:right;">${escapeHtml(data.orderDate)}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:24px 32px 0;">
                <p style="margin:0 0 12px; font-size:11px; letter-spacing:1.5px; color:#9B846E; text-transform:uppercase;">Your order</p>
                ${renderItemsRows(data.items)}
              </td>
            </tr>

            <tr>
              <td style="padding:8px 32px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(41,37,34,0.1); padding-top:12px;">
                  <tr>
                    <td style="padding-top:16px; font-size:15px; color:rgba(41,37,34,0.7);">Subtotal</td>
                    <td style="padding-top:16px; font-size:15px; color:#292522; text-align:right;">${escapeHtml(data.subtotal)}</td>
                  </tr>
                  <tr>
                    <td style="font-size:15px; color:rgba(41,37,34,0.7); padding-top:4px;">Delivery</td>
                    <td style="font-size:15px; color:#292522; text-align:right; padding-top:4px;">${escapeHtml(data.deliveryFee)}</td>
                  </tr>
                  <tr>
                    <td style="font-family:Georgia,'Times New Roman',serif; font-size:20px; color:#292522; padding-top:12px;">Total</td>
                    <td style="font-family:Georgia,'Times New Roman',serif; font-size:20px; color:#292522; text-align:right; padding-top:12px;">${escapeHtml(data.orderTotal)}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:0 32px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#E9DED0; border-radius:6px;">
                  <tr>
                    <td style="padding:18px 20px;">
                      <p style="margin:0 0 6px; font-size:11px; letter-spacing:1.5px; color:#9B846E; text-transform:uppercase;">${escapeHtml(data.fulfillmentMethod)}</p>
                      <p style="margin:0; font-size:14px; line-height:1.6; color:#292522;">${escapeHtml(data.fulfillmentDetails)}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:0 32px 32px;">
                <p style="margin:0 0 8px; font-size:11px; letter-spacing:1.5px; color:#9B846E; text-transform:uppercase;">What happens next</p>
                <p style="margin:0; font-size:14px; line-height:1.7; color:rgba(41,37,34,0.75);">
                  Your bouquet is being prepared with care. We'll send another note when it's ready for ${escapeHtml(data.fulfillmentVerb)}. If anything about your order needs to change, just reply to this email.
                </p>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:24px 32px; background-color:#292522;">
                <p style="margin:0 0 4px; font-family:Georgia,'Times New Roman',serif; font-size:15px; color:#D8C4A8;">Made by hand, given with meaning.</p>
                <p style="margin:0; font-size:12px; color:rgba(250,247,242,0.5);">Floréa &middot; General Santos City, Philippines</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, html };
}

export function renderOrderNotificationEmail(data: OrderNotificationEmailData): {
  subject: string;
  html: string;
} {
  const subject = `New order received — ${data.orderNumber} (${data.orderTotal})`;

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0; padding:0; background-color:#FAF7F2; font-family:Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF7F2;">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#FFFFFF; border:1px solid rgba(41,37,34,0.1); border-radius:10px; overflow:hidden;">

            <tr>
              <td style="padding:24px 32px; background-color:#292522;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <table role="presentation" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="background-color:#FAF7F2; border-radius:6px; padding:8px 16px;">
                            <img src="${escapeHtml(data.logoUrl)}" width="140" alt="Floréa" style="display:block; width:140px; height:auto; border:0; font-family:Georgia,'Times New Roman',serif; font-size:13px; color:#9B846E;" />
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td style="text-align:right; vertical-align:middle; font-size:12px; color:rgba(250,247,242,0.6);">New order</td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:28px 32px 8px;">
                <p style="margin:0 0 4px; font-family:Georgia,'Times New Roman',serif; font-size:24px; color:#292522;">You&rsquo;ve got a new order.</p>
                <p style="margin:0; font-size:14px; color:rgba(41,37,34,0.6);">Order ${escapeHtml(data.orderNumber)} &middot; placed ${escapeHtml(data.orderDate)}</p>
              </td>
            </tr>

            <tr>
              <td style="padding:16px 32px 0;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="background-color:#AAB2A0; border-radius:20px; padding:6px 14px;">
                      <span style="font-size:12px; font-weight:bold; color:#FFFFFF;">${escapeHtml(data.paymentStatusLabel)}</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:24px 32px 0;">
                <p style="margin:0 0 12px; font-size:11px; letter-spacing:1.5px; color:#9B846E; text-transform:uppercase;">Customer</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px; color:#292522;">
                  <tr><td style="padding:2px 0; color:rgba(41,37,34,0.5); width:120px;">Name</td><td style="padding:2px 0;">${escapeHtml(data.customerName)}</td></tr>
                  <tr><td style="padding:2px 0; color:rgba(41,37,34,0.5);">Phone</td><td style="padding:2px 0;">${escapeHtml(data.customerPhone)}</td></tr>
                  <tr><td style="padding:2px 0; color:rgba(41,37,34,0.5);">Email</td><td style="padding:2px 0;">${escapeHtml(data.customerEmail)}</td></tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 32px 0;">
                <p style="margin:0 0 12px; font-size:11px; letter-spacing:1.5px; color:#9B846E; text-transform:uppercase;">${escapeHtml(data.fulfillmentMethod)}</p>
                <p style="margin:0; font-size:14px; line-height:1.6; color:#292522;">${escapeHtml(data.fulfillmentDetails)}</p>
                <p style="margin:8px 0 0; font-size:13px; color:rgba(41,37,34,0.6);">Requested for: ${escapeHtml(data.fulfillmentDateTime)}</p>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 32px 0;">
                <p style="margin:0 0 8px; font-size:11px; letter-spacing:1.5px; color:#9B846E; text-transform:uppercase;">Gift note</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#E9DED0; border-radius:6px;">
                  <tr>
                    <td style="padding:14px 16px; font-family:'Courier New',monospace; font-size:13px; color:#292522;">
                      ${data.giftMessage ? escapeHtml(data.giftMessage) : "<span style=\"color:rgba(41,37,34,0.4);\">No gift note added.</span>"}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:24px 32px 0;">
                <p style="margin:0 0 12px; font-size:11px; letter-spacing:1.5px; color:#9B846E; text-transform:uppercase;">Order items</p>
                ${renderItemsRows(data.items)}
              </td>
            </tr>

            <tr>
              <td style="padding:8px 32px 28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(41,37,34,0.1); padding-top:12px;">
                  <tr>
                    <td style="font-family:Georgia,'Times New Roman',serif; font-size:20px; color:#292522; padding-top:16px;">Total</td>
                    <td style="font-family:Georgia,'Times New Roman',serif; font-size:20px; color:#292522; text-align:right; padding-top:16px;">${escapeHtml(data.orderTotal)}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:20px 32px; background-color:#FAF7F2;">
                <p style="margin:0; font-size:12px; color:rgba(41,37,34,0.5);">Manage this order once the admin dashboard is live. For now, reply directly to reach the customer.</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, html };
}
