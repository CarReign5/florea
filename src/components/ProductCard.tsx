import Image from "next/image";
import Link from "next/link";
import { PlaceholderPhoto } from "./PlaceholderPhoto";
import { formatPrice } from "@/lib/format";
import type { Bouquet } from "@/lib/types";

export function ProductCard({ bouquet }: { bouquet: Bouquet }) {
  return (
    <Link href={`/shop/${bouquet.slug}`} className="group flex flex-col gap-4">
      <div className="relative">
        {bouquet.image ? (
          <div className="aspect-[4/5] overflow-hidden rounded-[10px] border border-ink/10">
            <Image
              src={bouquet.image}
              alt={bouquet.imageAlt ?? bouquet.name}
              width={800}
              height={1000}
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </div>
        ) : (
          <PlaceholderPhoto aspect="portrait" label="Sample bouquet" />
        )}
        {bouquet.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-ivory/90 px-3 py-1 text-[11px] font-medium tracking-[0.06em] text-ink">
            {bouquet.badge}
          </span>
        )}
      </div>
      <div>
        <p className="font-display text-xl font-medium text-ink transition-colors duration-200 group-hover:text-taupe">
          {bouquet.name}
        </p>
        <p className="mt-1 text-sm text-ink/60">{bouquet.shortDescription}</p>
        <p className="mt-2 text-sm font-medium text-ink">
          From {formatPrice(bouquet.basePrice)}
        </p>
      </div>
    </Link>
  );
}
