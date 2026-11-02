// GET /api/products/[slug] — Public (A1)
import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/catalog";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!/^[a-z0-9-]{1,100}$/.test(slug)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const product = await getProductBySlug(slug);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}
