import Link from "next/link";
import { formatLei } from "@/lib/money";
import { stockLabel } from "@/lib/catalog";
import { StockBadge } from "@/components/StockBadge";

type Props = {
  product: { slug: string; name: string; priceBani: number; stock: number; images: { url: string; alt: string }[] };
};

export function ProductCard({ product }: Props) {
  const image = product.images[0];
  const label = stockLabel(product.stock);
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-paper transition hover:shadow-md"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image?.url ?? "/products/placeholder.svg"}
        alt={image?.alt ?? product.name}
        className="aspect-square w-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="font-semibold leading-snug group-hover:text-roast">{product.name}</h3>
        <StockBadge text={label.text} tone={label.tone} />
        <p className="mt-auto pt-2 text-lg font-semibold">{formatLei(product.priceBani)}</p>
      </div>
    </Link>
  );
}
