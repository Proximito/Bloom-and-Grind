import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="font-serif text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-muted">This product or page does not exist.</p>
      <Link href="/products" className="mt-6 inline-block rounded-lg bg-espresso px-4 py-2 text-cream">
        Back to the shop
      </Link>
    </div>
  );
}
