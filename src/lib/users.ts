// Account logic (A4), kept apart from the route so it can be unit tested.
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { registerSchema } from "@/lib/validation";

export const BCRYPT_COST = 12;

export type RegisterResult =
  | { ok: true; user: { id: number; email: string; name: string } }
  | { ok: false; status: 400 | 409; errors: Record<string, string> };

export async function registerUser(input: unknown): Promise<RegisterResult> {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) errors[String(issue.path[0] ?? "form")] ??= issue.message;
    return { ok: false, status: 400, errors };
  }

  const { name, email, password } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { ok: false, status: 409, errors: { email: "An account with this email already exists" } };

  const passwordHash = await bcrypt.hash(password, BCRYPT_COST);
  const user = await prisma.user.create({
    data: { name, email, passwordHash, role: "CUSTOMER" },
    select: { id: true, email: true, name: true },
  });
  return { ok: true, user };
}
