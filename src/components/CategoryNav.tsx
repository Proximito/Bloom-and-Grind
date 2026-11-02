import Link from "next/link";
import { getCategories } from "@/lib/catalog";

export async function CategoryNav({ active }: { active?: string }) {
  const categories = await getCategories();
  const item = (href: string, label: string, isActive: boolean) => (
    <Link
      key={href}
      href={href}
      className={`rounded-full px-3 py-1.5 text-sm whitespace-nowrap ${
        isActive ? "bg-espresso text-cream" : "border border-line hover:border-roast"
      }`}
    >
      {label}
    </Link>
  );
  return (
    <nav aria-label="Categories" className="flex gap-2 overflow-x-auto pb-2">
      {item("/products", "All products", !active)}
      {categories.map((c) => item(`/category/${c.slug}`, c.name, active === c.slug))}
    </nav>
  );
}
