// Seed script: run with `npx prisma db seed` (docker compose runs it on start).
// Safe to run again: everything is upserted by slug or email.
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { categories, products, deliveryMethods } from "./catalog-data";

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

async function main() {
  for (const c of categories) {
    await prisma.category.upsert({ where: { slug: c.slug }, update: { name: c.name }, create: c });
  }
  const catId = Object.fromEntries((await prisma.category.findMany()).map((c) => [c.slug, c.id]));

  // Spread createdAt over the last weeks so "newest first" has a real order.
  const now = Date.now();
  for (const [i, p] of products.entries()) {
    const data = {
      name: p.name,
      description: p.description,
      priceBani: Math.round(p.price * 100),
      stock: p.stock,
      origin: p.origin ?? null,
      process: p.process ?? null,
      roastLevel: p.roast ?? null,
      brewMethods: p.brew,
      categoryId: catId[p.category],
    };
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: data,
      create: { ...data, slug: p.slug, createdAt: new Date(now - i * 36 * 3600 * 1000) },
    });
    await prisma.productImage.deleteMany({ where: { productId: product.id } });
    await prisma.productImage.create({
      data: { productId: product.id, url: `/products/${p.slug}.svg`, alt: p.name, position: 0 },
    });
  }

  if ((await prisma.deliveryMethod.count()) === 0) {
    await prisma.deliveryMethod.createMany({ data: deliveryMethods });
  }

  // Test accounts (documented in the README). Passwords are hashed with bcrypt, cost 12.
  const accounts = [
    { email: "admin@bloomgrind.test", name: "Store admin", role: "ADMIN" as const, password: "Admin123!" },
    { email: "customer@bloomgrind.test", name: "Ana Pop", role: "CUSTOMER" as const, password: "Customer123!" },
  ];
  for (const a of accounts) {
    const passwordHash = await bcrypt.hash(a.password, 12);
    await prisma.user.upsert({
      where: { email: a.email },
      update: { role: a.role },
      create: { email: a.email, name: a.name, role: a.role, passwordHash },
    });
  }

  console.log(`Seeded ${products.length} products in ${categories.length} categories.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
