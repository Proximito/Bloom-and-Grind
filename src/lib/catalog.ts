// Catalog queries (A1, A2). Used by both the pages and the /api/products routes.
import { prisma } from "@/lib/db";
import { PAGE_SIZE, type CatalogQuery } from "@/lib/validation";
import type { Prisma } from "@prisma/client";

export async function listProducts({ page, q, category }: CatalogQuery) {
  const where: Prisma.ProductWhereInput = {};
  if (q) where.name = { contains: q, mode: "insensitive" }; // A2: case-insensitive name search
  if (category) where.category = { slug: category };

  const [total, items] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: { images: { orderBy: { position: "asc" }, take: 1 }, category: true },
    }),
  ]);

  return { items, total, page, pageCount: Math.max(1, Math.ceil(total / PAGE_SIZE)) };
}

export function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { images: { orderBy: { position: "asc" } }, category: true },
  });
}

export function getCategories() {
  return prisma.category.findMany({ orderBy: { id: "asc" } });
}

export function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({ where: { slug } });
}

export function stockLabel(stock: number): { text: string; tone: "ok" | "low" | "out" } {
  if (stock <= 0) return { text: "Out of stock", tone: "out" };
  if (stock <= 3) return { text: `Only ${stock} left`, tone: "low" };
  return { text: "In stock", tone: "ok" };
}
