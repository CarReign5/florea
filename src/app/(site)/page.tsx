import Image from "next/image";
import { Button } from "@/components/Button";
import { PlaceholderPhoto } from "@/components/PlaceholderPhoto";
import { ProductCard } from "@/components/ProductCard";
import { bouquets } from "@/lib/data/bouquets";

const bestsellerSlugs = [
  "pink-tulip-bouquet",
  "dusty-rose-keepsake",
  "crochet-daisy-bunch",
];
const bestsellers = bestsellerSlugs
  .map((slug) => bouquets.find((bouquet) => bouquet.slug === slug))
  .filter((bouquet): bouquet is (typeof bouquets)[number] => Boolean(bouquet));

const steps = [
  {
    number: "1",
    title: "Choose",
    description: "Pick a bouquet from the collection.",
  },
  {
    number: "2",
    title: "Personalize",
    description: "Add a handwritten-style message for the recipient.",
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
      <section className="flex items-center py-16 md:min-h-[calc(80dvh-5rem)] md:py-20">
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
              </div>
            </div>

            <div className="mx-auto flex w-full max-w-[360px] items-center justify-center overflow-hidden rounded-[10px] border border-ink/10 md:h-[min(52vh,440px)] md:w-auto">
              <Image
                src="/hero-image.png"
                alt="Handmade fuzzy-wire tulip bouquet in soft pink, wrapped in kraft newspaper and ivory paper with a white ribbon, on a sunlit tabletop"
                width={3258}
                height={3141}
                className="h-auto w-full md:h-full md:w-auto md:max-w-none"
                priority
              />
            </div>
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
            {bestsellers.map((bouquet) => (
              <ProductCard key={bouquet.slug} bouquet={bouquet} />
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
          </div>
        </div>
      </section>
    </>
  );
}
