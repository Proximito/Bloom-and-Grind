// GET /api/categories — Public (A1)
import { NextResponse } from "next/server";
import { getCategories } from "@/lib/catalog";

export async function GET() {
  return NextResponse.json(await getCategories());
}
