// /products — paginated catalog and search results (A1, A2)
import Link from "next/link";
import { listProducts } from "@/lib/catalog";
import { catalogQuerySchema } from "@/lib/validation";
import { CategoryNav } from "@/components/CategoryNav";
import { ProductGrid } from "@/components/ProductGrid";
import { Pagination } from "@/components/Pagination";

export const dynamic = "force-dynamic";

export default async function ProductsPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const query = catalogQuerySchema.parse(await searchParams);
  const { items, total, page, pageCount } = await listProducts({ page: query.page, q: query.q });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-3xl font-bold sm:text-4xl">
          {query.q ? <>Results for “{query.q}”</> : "All products"}
        </h1>
        <p className="text-muted">
          {total} {total === 1 ? "product" : "products"}
          {pageCount > 1 && ` · page ${page} of ${pageCount}`}
        </p>
      </div>
      <CategoryNav />
      {items.length === 0 ? (
        <div className="rounded-xl border border-line bg-cream p-8 text-center">
          <p className="text-lg font-semibold">
            No products match “{query.q}”.
          </p>
          <p className="mt-2 text-muted">Check the spelling or try a shorter word, such as “kenya” or “grinder”.</p>
          <Link href="/products" className="mt-4 inline-block rounded-lg bg-espresso px-4 py-2 text-cream">
            Back to all products
          </Link>
        </div>
      ) : (
        <ProductGrid items={items} />
      )}
      <Pagination page={page} pageCount={pageCount} basePath="/products" params={{ q: query.q }} />
    </div>
  );
}
