import Link from "next/link";
import { getCategories, listProducts } from "@/lib/catalog";
import { ProductGrid } from "@/components/ProductGrid";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [categories, newest] = await Promise.all([getCategories(), listProducts({ page: 1 })]);

  return (
    <div className="flex flex-col gap-12">
      <section className="rounded-2xl bg-espresso px-6 py-12 text-cream sm:px-12 sm:py-16">
        <p className="text-sm font-semibold tracking-widest text-[#e3b48f] uppercase">Specialty coffee · brewing gear</p>
        <h1 className="mt-3 max-w-2xl font-serif text-4xl leading-tight font-bold sm:text-5xl">
          Fresh beans, and the gear to brew them at home
        </h1>
        <Link href="/products" className="mt-8 inline-block rounded-lg bg-cream px-5 py-3 font-semibold text-espresso">
          Browse the shop
        </Link>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-serif text-2xl font-bold">Shop by category</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/category/${c.slug}`}
              className="rounded-xl border border-line bg-cream p-4 font-semibold hover:border-roast"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-serif text-2xl font-bold">New in</h2>
        <ProductGrid items={newest.items.slice(0, 8)} />
      </section>
    </div>
  );
}
