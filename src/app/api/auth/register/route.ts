// POST /api/auth/register — Public (A4). New accounts are always customers.
import { NextResponse } from "next/server";
import { registerUser } from "@/lib/users";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ errors: { form: "Invalid request" } }, { status: 400 });
  }
  const result = await registerUser(body);
  if (!result.ok) return NextResponse.json({ errors: result.errors }, { status: result.status });
  return NextResponse.json({ user: result.user }, { status: 201 });
}
