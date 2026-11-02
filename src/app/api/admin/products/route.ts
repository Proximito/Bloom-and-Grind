// GET /api/admin/products — Admin only (A9, A10).
// The middleware already blocks non-admins; the handler checks again so the route
// stays safe even if the middleware matcher changes.
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const products = await prisma.product.findMany({
    orderBy: { id: "asc" },
    select: { id: true, name: true, slug: true, priceBani: true, stock: true, category: { select: { name: true } } },
  });
  return NextResponse.json(products);
}
