// /admin — role ADMIN only. The middleware blocks everyone else on the server (A10).
// Full product, category and order management is built in weeks 8–9 (A9).
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatLei } from "@/lib/money";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  const products = await prisma.product.findMany({
    orderBy: { id: "asc" },
    include: { category: true },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-semibold tracking-widest text-roast uppercase">Administration</p>
        <h1 className="font-serif text-3xl font-bold">Products</h1>
        <p className="text-muted">Signed in as {session?.user.email}. Editing, categories and orders come next.</p>
      </div>
      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-right">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-line">
                <td className="px-4 py-2 text-muted">{p.id}</td>
                <td className="px-4 py-2 font-medium">{p.name}</td>
                <td className="px-4 py-2">{p.category.name}</td>
                <td className="px-4 py-2 text-right">{formatLei(p.priceBani)}</td>
                <td className="px-4 py-2 text-right">{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
