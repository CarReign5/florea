import Link from "next/link";
import { bouquets } from "@/lib/data/bouquets";
import { formatPrice } from "@/lib/format";

export default function AdminCatalogPage() {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="font-display text-3xl font-medium text-ink">
          Catalog
        </h1>
        <p className="text-sm text-ink/50">
          {bouquets.length} bouquets &middot; editing here doesn&rsquo;t save
          yet
        </p>
      </div>

      <div className="mt-8 overflow-x-auto rounded-[10px] border border-ink/10 bg-white">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-xs tracking-[0.06em] text-taupe uppercase">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Badge</th>
              <th className="px-4 py-3 font-medium">Sizes</th>
              <th className="px-4 py-3 text-right font-medium">
                Base price
              </th>
              <th className="px-4 py-3 text-right font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {bouquets.map((bouquet) => (
              <tr
                key={bouquet.slug}
                className="border-b border-ink/5 last:border-0 hover:bg-soft-beige/30"
              >
                <td className="px-4 py-3 font-medium text-ink">
                  {bouquet.name}
                </td>
                <td className="px-4 py-3 text-ink/60">
                  {bouquet.badge ?? "—"}
                </td>
                <td className="px-4 py-3 text-ink/60">
                  {bouquet.sizes.length}
                </td>
                <td className="px-4 py-3 text-right text-ink">
                  {formatPrice(bouquet.basePrice)}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/catalog/${bouquet.slug}`}
                    className="font-medium text-ink underline-offset-4 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
