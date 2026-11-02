// /category/[slug] — one page per category (A1)
import { notFound } from "next/navigation";
import { getCategoryBySlug, listProducts } from "@/lib/catalog";
import { catalogQuerySchema } from "@/lib/validation";
import { CategoryNav } from "@/components/CategoryNav";
import { ProductGrid } from "@/components/ProductGrid";
import { Pagination } from "@/components/Pagination";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { slug } = await params;
  const query = catalogQuerySchema.parse({ ...(await searchParams), category: slug });
  if (!query.category) notFound();
  const category = await getCategoryBySlug(query.category);
  if (!category) notFound();

  const { items, total, page, pageCount } = await listProducts({ page: query.page, category: category.slug });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-3xl font-bold sm:text-4xl">{category.name}</h1>
        <p className="text-muted">{total} products</p>
      </div>
      <CategoryNav active={category.slug} />
      <ProductGrid items={items} />
      <Pagination page={page} pageCount={pageCount} basePath={`/category/${category.slug}`} />
    </div>
  );
}
