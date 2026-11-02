import { ProductCard } from "@/components/ProductCard";

type Item = Parameters<typeof ProductCard>[0]["product"] & { id: number };

export function ProductGrid({ items }: { items: Item[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4">
      {items.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
