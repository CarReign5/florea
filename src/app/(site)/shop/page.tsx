import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getBouquetsByCollection } from "@/lib/data/bouquets";
import { collections } from "@/lib/data/collections";

const PREVIEW_COUNT = 4;

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
      <div className="max-w-[620px]">
        <p className="text-xs font-medium tracking-[0.14em] text-taupe uppercase">
          Shop collection
        </p>
        <h1 className="font-display mt-4 text-4xl font-medium text-ink md:text-5xl">
          Every bouquet, made by hand.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink/70">
          Browse our collections below.
        </p>
      </div>

      <div className="mt-16 flex flex-col gap-20">
        {collections.map((collection) => {
          const items = getBouquetsByCollection(collection.slug);
          if (items.length === 0) return null;
          const preview = items.slice(0, PREVIEW_COUNT);

          return (
            <section key={collection.slug}>
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink/10 pb-6">
                <div className="max-w-[560px]">
                  <h2 className="font-display text-2xl font-medium text-ink md:text-3xl">
                    {collection.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">
                    {collection.description}
                  </p>
                </div>
                {items.length > PREVIEW_COUNT && (
                  <Link
                    href={`/shop/collections/${collection.slug}`}
                    className="shrink-0 text-sm font-medium text-ink underline underline-offset-4"
                  >
                    View all
                  </Link>
                )}
              </div>

              <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                {preview.map((bouquet) => (
                  <ProductCard key={bouquet.slug} bouquet={bouquet} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
