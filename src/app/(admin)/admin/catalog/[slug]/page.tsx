import { notFound } from "next/navigation";
import Link from "next/link";
import { CatalogEditForm } from "@/components/admin/CatalogEditForm";
import { getBouquetBySlug } from "@/lib/data/bouquets";

export default async function AdminCatalogEditPage(
  props: PageProps<"/admin/catalog/[slug]">,
) {
  const { slug } = await props.params;
  const bouquet = getBouquetBySlug(slug);

  if (!bouquet) notFound();

  return (
    <div>
      <Link
        href="/admin/catalog"
        className="text-sm font-medium text-ink/60 hover:text-ink"
      >
        &larr; All bouquets
      </Link>
      <h1 className="font-display mt-4 text-3xl font-medium text-ink">
        Edit {bouquet.name}
      </h1>

      <div className="mt-8">
        <CatalogEditForm bouquet={bouquet} />
      </div>
    </div>
  );
}
