// GET /api/products?page=1&q=kenya&category=filter-coffee — Public (A1, A2)
import { NextResponse } from "next/server";
import { listProducts } from "@/lib/catalog";
import { catalogQuerySchema } from "@/lib/validation";

export async function GET(req: Request) {
  const params = Object.fromEntries(new URL(req.url).searchParams);
  const query = catalogQuerySchema.parse(params);
  const result = await listProducts(query);
  return NextResponse.json({
    page: result.page,
    pageCount: result.pageCount,
    total: result.total,
    items: result.items.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      category: p.category.slug,
      priceBani: p.priceBani,
      stock: p.stock,
      image: p.images[0]?.url ?? null,
    })),
  });
}
