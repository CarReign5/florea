import Image from "next/image";
import { notFound } from "next/navigation";
import { BouquetDetail } from "@/components/BouquetDetail";
import { PlaceholderPhoto } from "@/components/PlaceholderPhoto";
import { bouquets, getBouquetBySlug } from "@/lib/data/bouquets";
import { formatPrice } from "@/lib/format";

export async function generateStaticParams() {
  return bouquets.map((bouquet) => ({ slug: bouquet.slug }));
}

export default async function BouquetPage(props: PageProps<"/shop/[slug]">) {
  const { slug } = await props.params;
  const bouquet = getBouquetBySlug(slug);

  if (!bouquet) notFound();

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        {bouquet.image ? (
          <div className="aspect-[4/5] overflow-hidden rounded-[10px] border border-ink/10">
            <Image
              src={bouquet.image}
              alt={bouquet.imageAlt ?? bouquet.name}
              width={1000}
              height={1250}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        ) : (
          <PlaceholderPhoto aspect="portrait" label="Product photo — pending" />
        )}

        <div>
          <p className="text-xs font-medium tracking-[0.14em] text-taupe uppercase">
            {bouquet.badge ?? "Handmade"}
          </p>
          <h1 className="font-display mt-3 text-4xl font-medium text-ink md:text-5xl">
            {bouquet.name}
          </h1>
          <p className="font-display mt-3 text-2xl text-ink/80">
            From {formatPrice(bouquet.basePrice)}
          </p>

          <div className="mt-6">
            <BouquetDetail bouquet={bouquet} />
          </div>
        </div>
      </div>
    </div>
  );
}
