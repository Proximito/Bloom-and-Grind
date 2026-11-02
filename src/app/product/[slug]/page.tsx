// /product/[slug] — name, description, price, images and availability (A1)
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, stockLabel } from "@/lib/catalog";
import { formatLei } from "@/lib/money";
import { StockBadge } from "@/components/StockBadge";

export const dynamic = "force-dynamic";

const brewNames: Record<string, string> = {
  "pour-over": "Pour-over",
  immersion: "Immersion",
  "cold-brew": "Cold brew",
  espresso: "Espresso",
  moka: "Moka pot",
};

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!/^[a-z0-9-]{1,100}$/.test(slug)) notFound();
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const label = stockLabel(product.stock);
  const facts = [
    product.origin && ["Origin", product.origin],
    product.process && ["Process", product.process],
    product.roastLevel && ["Roast", product.roastLevel.charAt(0) + product.roastLevel.slice(1).toLowerCase()],
  ].filter(Boolean) as [string, string][];

  return (
    <div className="flex flex-col gap-6">
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/products" className="hover:text-roast">
          Shop
        </Link>{" "}
        ›{" "}
        <Link href={`/category/${product.category.slug}`} className="hover:text-roast">
          {product.category.name}
        </Link>{" "}
        › {product.name}
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          {product.images.map((img, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={img.id}
              src={img.url}
              alt={img.alt}
              className={`w-full rounded-xl border border-line object-cover ${i === 0 ? "aspect-square" : "aspect-video"}`}
            />
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="font-serif text-3xl font-bold sm:text-4xl">{product.name}</h1>
          <p className="text-2xl font-semibold">
            {formatLei(product.priceBani)}
            {product.category.slug.endsWith("coffee") && <span className="ml-2 text-base font-normal text-muted">/ 250 g</span>}
          </p>
          <StockBadge text={product.stock > 3 ? `In stock (${product.stock})` : label.text} tone={label.tone} />

          {product.brewMethods.length > 0 && (
            <ul className="flex flex-wrap gap-2" aria-label="Works with">
              {product.brewMethods.map((m) => (
                <li key={m} className="rounded-full border border-line px-3 py-1 text-sm">
                  {brewNames[m] ?? m}
                </li>
              ))}
            </ul>
          )}

          <p className="leading-relaxed text-bean">{product.description}</p>

          {facts.length > 0 && (
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 rounded-xl bg-cream p-4 text-sm">
              {facts.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-muted">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          )}

          <button
            type="button"
            disabled
            className="mt-2 w-full rounded-lg bg-espresso px-4 py-3 font-semibold text-cream opacity-60 sm:w-auto"
            title="The cart arrives in week 8 (A3)"
          >
            {product.stock > 0 ? "Add to cart (coming in week 8)" : "Out of stock"}
          </button>
        </div>
      </div>
    </div>
  );
}
