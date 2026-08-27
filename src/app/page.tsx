import { Button } from "@/components/Button";
import { PlaceholderPhoto } from "@/components/PlaceholderPhoto";

const steps = [
  {
    number: "1",
    title: "Choose",
    description: "Pick a bouquet from the collection, or start from scratch.",
  },
  {
    number: "2",
    title: "Personalize",
    description: "Choose your flowers, colors, wrapping, and add a message.",
  },
  {
    number: "3",
    title: "Deliver",
    description: "Tell us where it's going, and we'll take it from there.",
  },
];

const occasions = [
  "Birthdays",
  "Anniversaries",
  "Graduations",
  "Just because",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="flex items-center py-16 md:min-h-[calc(100dvh-5rem)] md:py-20">
        <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <div className="mx-auto max-w-[560px] text-center md:mx-0 md:text-left">
              <p className="text-xs font-medium tracking-[0.14em] text-taupe uppercase">
                Handmade in General Santos City
              </p>
              <h1 className="font-display mt-4 text-[42px] leading-[1.02] font-medium text-ink sm:text-[56px] md:text-[68px]">
                Thoughtful flowers, made by hand.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-ink/75">
                Fuzzy-wire and crochet bouquets, chosen and personalized right
                here — no back-and-forth messages, just a gift that stays.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
                <Button href="/shop">Shop the collection</Button>
                <Button href="/builder" variant="secondary">
                  Build your own
                </Button>
              </div>
            </div>

            <PlaceholderPhoto
              aspect="portrait"
              label="Hero bouquet photo — pending"
            />
          </div>
        </div>
      </section>

      {/* Featured collection */}
      <section className="bg-soft-beige/50 py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-medium tracking-[0.14em] text-taupe uppercase">
                Bestsellers
              </p>
              <h2 className="font-display mt-3 text-3xl font-medium text-ink md:text-4xl">
                A few favorites
              </h2>
            </div>
            <Button href="/shop" variant="secondary">
              View all
            </Button>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex flex-col gap-4">
                <PlaceholderPhoto aspect="portrait" label="Sample bouquet" />
                <div>
                  <p className="font-display text-xl font-medium text-ink">
                    Bouquet name — placeholder
                  </p>
                  <p className="mt-1 text-sm text-ink/60">
                    Handmade &middot; price to be confirmed
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand story */}
      <section id="story" className="py-20 md:py-28">
        <div className="mx-auto max-w-[720px] px-6 text-center md:px-10">
          <p className="text-xs font-medium tracking-[0.14em] text-taupe uppercase">
            Made by hand, given with meaning
          </p>
          <h2 className="font-display mt-4 text-3xl font-medium text-ink md:text-4xl">
            Every stem is shaped by hand, one at a time.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/75">
            Floréa&rsquo;s bouquets are crafted from fuzzy wire and crochet
            thread — not fresh flowers — so a gift given today can still be
            held years from now. Made in General Santos City, wrapped with
            care, and built to last well beyond the moment it&rsquo;s given.
          </p>
        </div>
      </section>

      {/* Ordering steps */}
      <section className="bg-soft-beige/50 py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="text-center">
            <p className="text-xs font-medium tracking-[0.14em] text-taupe uppercase">
              How it works
            </p>
            <h2 className="font-display mt-3 text-3xl font-medium text-ink md:text-4xl">
              Three simple steps
            </h2>
          </div>

          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-sm font-medium text-ink">
                  {step.number}
                </div>
                <p className="font-display mt-4 text-xl font-medium text-ink">
                  {step.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="text-center">
            <p className="text-xs font-medium tracking-[0.14em] text-taupe uppercase">
              Shop by occasion
            </p>
            <h2 className="font-display mt-3 text-3xl font-medium text-ink md:text-4xl">
              A gift for every moment
            </h2>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {occasions.map((occasion) => (
              <Button key={occasion} href="/shop" variant="secondary">
                {occasion}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Personalization feature */}
      <section className="bg-soft-beige/50 py-20 md:py-28">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 md:grid-cols-2 md:gap-16 md:px-10">
          <PlaceholderPhoto
            aspect="wide"
            label="Gift note detail photo — pending"
            className="md:order-2"
          />
          <div className="md:order-1">
            <p className="text-xs font-medium tracking-[0.14em] text-taupe uppercase">
              Personalize
            </p>
            <h2 className="font-display mt-4 text-3xl font-medium text-ink md:text-4xl">
              Add a message they can keep.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/75">
              Every order can include a handwritten-style note, so your
              bouquet arrives with something to read as well as something
              to hold.
            </p>
            <div className="mt-6 rounded-[6px] border border-ink/15 bg-ivory p-6">
              <p className="font-mono text-sm leading-relaxed text-ink/70">
                &ldquo;To someone who makes life more beautiful just by
                being in it.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[640px] px-6 text-center md:px-10">
          <h2 className="font-display text-3xl font-medium text-ink md:text-4xl">
            Choose a gift that stays.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/shop">Shop the collection</Button>
            <Button href="/builder" variant="secondary">
              Build your own
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
