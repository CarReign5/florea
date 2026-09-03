import { BouquetBuilder } from "@/components/BouquetBuilder";

export default function BuilderPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
      <div className="max-w-[620px]">
        <p className="text-xs font-medium tracking-[0.14em] text-taupe uppercase">
          Build your own
        </p>
        <h1 className="font-display mt-4 text-4xl font-medium text-ink md:text-5xl">
          Design a bouquet that&rsquo;s exactly yours.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink/70">
          Choose your flowers, colors, wrapping, and add-ons — the price
          updates as you go.
        </p>
      </div>

      <p className="mt-6 rounded-[6px] border border-dusty-rose/40 bg-dusty-rose/10 px-4 py-3 text-sm text-ink/70">
        Sample pricing for layout purposes — will be replaced with real
        pricing before launch.
      </p>

      <div className="mt-10">
        <BouquetBuilder />
      </div>
    </div>
  );
}
