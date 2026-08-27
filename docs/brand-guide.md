# Floréa Website Visual Design Guide

> Claude-ready brand and UI specification for the Floréa Flowers & Gifts ordering website.

## 1. Project Context

Floréa is a premium handmade flower and gifting brand based in General Santos City, Philippines. Its current products are handcrafted **fuzzy-wire and crochet flowers**. Do not present Floréa as a fresh-flower shop. Artificial and real flowers are possible future expansions, but they are not the current product focus.

The website's main purpose is to make browsing, personalizing, and ordering a meaningful gift feel simple, warm, and special.

## 2. Brand Essence

**Core feeling:** thoughtful, romantic, handmade, refined, warm, quietly premium.

**Visual idea:** a soft editorial flower studio combined with a modern luxury gifting experience.

**Brand promise:** Floréa transforms simple materials and thoughtful gestures into lasting keepsakes for life's meaningful moments.

### Personality

- Warm, never overly sentimental
- Elegant, never intimidating
- Handmade, never rustic or messy
- Premium, never flashy
- Romantic, never childish
- Modern, never sterile

## 3. Visual North Star

Every page should feel like opening a carefully wrapped gift: calm, tactile, spacious, personal, and deliberate.

Use:

- Warm ivory backgrounds
- Large, realistic product photography
- Editorial serif headlines
- Clean, highly readable interface text
- Generous whitespace
- Fine borders and restrained shadows
- Paper, ribbon, botanical, and typewritten-letter details
- Soft daylight and authentic handmade texture

## 4. Color System

| Token | Hex | Primary use |
| --- | --- | --- |
| `--color-ivory` | `#FAF7F2` | Main page background |
| `--color-champagne` | `#D8C4A8` | Secondary surfaces, packaging references, dividers |
| `--color-soft-beige` | `#E9DED0` | Cards, alternate sections, subtle fills |
| `--color-taupe` | `#9B846E` | Secondary text, borders, quiet icons |
| `--color-ink` | `#292522` | Primary text, primary buttons, footer |
| `--color-dusty-rose` | `#CFA7A0` | Restrained romantic accent, badges, hover details |
| `--color-sage` | `#AAB2A0` | Restrained botanical accent and supporting states |
| `--color-white` | `#FFFFFF` | Product surfaces and contrast areas |

### Color rules

- Warm Ivory and White should occupy most of the interface.
- Ink is the default text and primary-action color.
- Champagne and Soft Beige create layering without harsh contrast.
- Dusty Rose and Sage are accents only; never use both heavily in one section.
- Maintain WCAG AA contrast for body text, controls, and interactive states.
- Do not use neon colors, saturated sale graphics, rainbow gradients, or generic bright ecommerce blue.

## 5. Typography

### Font families

- **Display and headings:** Cormorant Garamond
- **Body, labels, prices, forms, navigation, and buttons:** Roboto
- **Optional typewritten-letter accent:** a restrained monospace font only inside gift-note previews; never use it for normal UI.

### Suggested scale

| Role | Desktop | Mobile | Style |
| --- | ---: | ---: | --- |
| Hero heading | 64–80 px | 42–52 px | Cormorant Garamond, 500, line-height 0.95–1.05 |
| Page heading | 48–64 px | 36–44 px | Cormorant Garamond, 500 |
| Section heading | 36–48 px | 30–36 px | Cormorant Garamond, 500 |
| Card title | 24–30 px | 22–26 px | Cormorant Garamond, 500–600 |
| Body large | 18–20 px | 17–18 px | Roboto, 400, line-height 1.6 |
| Body | 16 px | 16 px | Roboto, 400, line-height 1.55–1.7 |
| Label/button | 13–15 px | 13–15 px | Roboto, 500, slight letter spacing |

Use sentence case for headings and buttons. Uppercase may be used sparingly for small eyebrow labels with generous letter spacing. Never set paragraphs in Cormorant Garamond.

## 6. Layout and Spacing

- Use a centered content width of approximately `1200–1280px`.
- Use a narrow reading width of `620–720px` for editorial copy.
- Use an 8px spacing system: `8, 16, 24, 32, 48, 64, 96, 128`.
- Desktop section padding: `96–128px` vertically.
- Mobile section padding: `56–72px` vertically.
- Keep text-image layouts visually balanced, with room for imagery to breathe.
- Prefer asymmetric editorial compositions where useful, but keep the ordering flow direct and predictable.
- Avoid dense grids. Default to 3 product cards per row on desktop, 2 on tablet, and 1 on small mobile screens.

## 7. Shape, Borders, and Elevation

- Default corner radius: `6px`.
- Maximum routine component radius: `10px`.
- Pills are reserved for small statuses, filters, or tags—not cards and buttons.
- Borders: fine, warm neutral lines such as `rgba(41, 37, 34, 0.16)`.
- Shadows should be soft and almost imperceptible, such as `0 12px 36px rgba(41,37,34,0.08)`.
- Use texture, spacing, and borders before adding shadow.

## 8. Photography and Imagery

### Product photography

- Show real-looking handcrafted fuzzy-wire or crochet flowers with visible fiber texture.
- Use warm natural window light, soft directional shadows, and true-to-life colors.
- Preferred surfaces: warm beige table, linen, ivory paper, subtle studio wall, or elegant wooden surface.
- Use Floréa's current packaging: champagne matte wrapper, white wrapper, optional brown newspaper accent, white filler, and white ribbon.
- Keep arrangements neat, tactile, and believable. Preserve small handmade variations without making products look unfinished.
- Use uncluttered compositions and editorial crops: full bouquet, detail, gift-ready wrapping, and contextual tabletop scene.

### Image treatment

- Product-list images: consistent `4:5` portrait ratio.
- Hero imagery: `4:5`, `3:2`, or wide editorial crop depending on layout.
- Do not place text over visually busy bouquet areas.
- Avoid heavy filters, strong vignettes, fake bokeh, plastic-looking petals, impossible reflections, duplicated flowers, or visibly AI-generated artifacts.
- Never use stock photos of fresh flowers to represent current Floréa products.

## 9. Core UI Components

### Header

- Minimal wordmark, restrained navigation, search if needed, and cart/order access.
- Use Warm Ivory or a transparent background over a calm hero.
- Keep mobile navigation simple and accessible.
- Sticky behavior is acceptable if the header becomes compact and does not dominate the screen.

### Buttons

**Primary:** Ink background, Warm Ivory text, subtle darkening on hover.

**Secondary:** Transparent or Ivory background, 1px Ink/Taupe border, Ink text.

- Height: `48–52px`.
- Radius: `6px`.
- Use concise labels such as "Order now," "View bouquet," or "Personalize gift."
- Do not use gradients, glossy effects, oversized pills, or bouncy novelty animation.

### Product cards

- Let photography lead.
- Show product name, short descriptor, price, and one clear action.
- Keep surfaces flat or lightly bordered.
- Avoid sale stickers unless a real promotion exists.
- Use small, tasteful badges such as "Handmade," "Limited," or "New."

### Forms

- Labels remain visible above fields; do not rely only on placeholders.
- Inputs use a warm white/ivory background, fine taupe border, clear Ink focus ring, and 48px minimum height.
- Keep gifting questions conversational and specific.
- Show validation beside the relevant field in plain language.

### Order progress

Use three clear stages:

1. **Choose** — select a bouquet.
2. **Personalize** — select options and add a message.
3. **Deliver** — enter delivery and contact details, review, and submit.

On mobile, show a compact step label and progress bar rather than squeezing a full horizontal stepper.

## 10. Recommended Page Structure

### Home

1. Hero with a strong handcrafted-bouquet image, emotional headline, short supporting text, and one main CTA.
2. Featured collection or bestsellers.
3. "Made by hand, given with meaning" brand story.
4. Simple three-step ordering explanation.
5. Occasion-based discovery.
6. Typewritten-letter or personalization feature.
7. Customer proof using real photos or genuine messages.
8. Final gifting CTA.

### Collection/shop

- Clear product grid with calm filters for occasion, color, price, and availability.
- Keep filtering optional and lightweight; the collection should remain visually inviting.

### Product detail

- Large image gallery with detail views.
- Product name, short emotional description, price, inclusions, dimensions, care/longevity note, and availability.
- Personalization choices should be visible before checkout.
- Show realistic delivery expectations for General Santos City.
- Use a clear persistent mobile CTA without covering important content.

### Ordering/checkout

- Keep the flow short and reassuring.
- Clearly distinguish customer details, recipient details, delivery details, gift message, and payment method.
- Include a complete review screen before submission.
- Explain what happens after an order is placed.

## 11. Voice and Microcopy

Floréa speaks with warmth and confidence. Copy should feel personal but concise.

Preferred examples:

- "Thoughtful flowers, made by hand."
- "Choose a gift that stays."
- "Add a message they can keep."
- "Made slowly, given meaningfully."
- "Your bouquet is being prepared with care."

Avoid:

- Aggressive urgency and fake scarcity
- Excessive exclamation marks
- Generic luxury clichés
- Childish or overly cute wording
- Technical checkout language when plain language works

## 12. Motion and Interaction

- Use subtle `150–250ms` transitions.
- Favor soft fades, small image scale changes, underline reveals, and restrained elevation shifts.
- Respect `prefers-reduced-motion`.
- Never use parallax that harms readability, dramatic page spins, confetti, excessive floating petals, or animation that delays ordering.

## 13. Accessibility and Mobile Requirements

- Design mobile-first; many Floréa customers will order on phones.
- Minimum tap target: `44 × 44px`.
- Body text must remain at least 16px on mobile.
- Maintain strong keyboard focus states and logical tab order.
- Provide useful alt text for products, mentioning flower type, colors, materials, and wrapping.
- Do not communicate status by color alone.
- Keep checkout resilient to slow connections and accidental refreshes when technically feasible.

## 14. Explicit Anti-Style

Do not create:

- A generic SaaS dashboard appearance
- Loud marketplace or discount-store styling
- Oversized rounded cards everywhere
- Neon colors or glossy gradients
- Cartoon flower illustrations as primary imagery
- Plastic-looking or fresh-flower imagery presented as Floréa's current work
- Busy scrapbook layouts
- Heavy gold effects or ornate luxury decoration
- Cluttered pages with too many competing calls to action
- Pure white-and-black minimalism that loses the brand's warmth

## 15. Claude Implementation Directive

When generating the Floréa website:

1. Treat this guide as the source of truth for styling and interaction decisions.
2. Build a warm editorial storefront, not a generic ecommerce template.
3. Prioritize realistic fuzzy-wire bouquet imagery and current Floréa materials.
4. Use Cormorant Garamond only for expressive headings and Roboto for all functional reading.
5. Make the order path obvious on every relevant page.
6. Keep components restrained, accessible, mobile-first, and easy to maintain.
7. Use the supplied visual mood board as a compositional and tonal reference; do not copy its sample product price or placeholder content as business data.
8. If a required business detail is missing—prices, delivery coverage, payment methods, inventory, or policies—use clearly labeled placeholder data and ask for confirmation instead of inventing facts.

## 16. Final Quality Checklist

Before presenting a design or implementation, confirm:

- [ ] The products look handcrafted from fuzzy wire or crochet, not fresh flowers.
- [ ] The interface feels warm, refined, spacious, and quietly premium.
- [ ] Cormorant Garamond and Roboto are used in their intended roles.
- [ ] The palette matches the documented hex values.
- [ ] Mobile ordering is simple and readable.
- [ ] Primary actions are obvious without becoming loud.
- [ ] Images are realistic, neat, and free of common AI artifacts.
- [ ] Forms are accessible and labels remain visible.
- [ ] No invented Floréa business facts appear as final content.
- [ ] The result does not resemble a generic SaaS or discount ecommerce template.
