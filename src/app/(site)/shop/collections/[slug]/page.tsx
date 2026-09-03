import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { getBouquetsByCollection } from "@/lib/data/bouquets";
import { collections, getCollectionBySlug } from "@/lib/data/collections";

export async function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export default async function CollectionPage(
  props: PageProps<"/shop/collections/[slug]">,
) {
  const { slug } = await props.params;
  const collection = getCollectionBySlug(slug);

  if (!collection) notFound();

  const items = getBouquetsByCollection(collection.slug);

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
      <Link
        href="/shop"
        className="text-sm font-medium text-ink/60 underline underline-offset-4 hover:text-ink"
      >
        ← All collections
      </Link>

      <div className="mt-6 max-w-[620px]">
        <p className="text-xs font-medium tracking-[0.14em] text-taupe uppercase">
          Collection
        </p>
        <h1 className="font-display mt-4 text-4xl font-medium text-ink md:text-5xl">
          {collection.name}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink/70">
          {collection.description}
        </p>
      </div>

      <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((bouquet) => (
          <ProductCard key={bouquet.slug} bouquet={bouquet} />
        ))}
      </div>
    </div>
  );
}
