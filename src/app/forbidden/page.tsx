import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="py-16 text-center">
      <p className="text-sm font-semibold tracking-widest text-roast uppercase">Error 403</p>
      <h1 className="mt-2 font-serif text-3xl font-bold">You don’t have access to this page</h1>
      <p className="mt-2 text-muted">The administration area is only for store administrators.</p>
      <Link href="/" className="mt-6 inline-block rounded-lg bg-espresso px-4 py-2 text-cream">
        Back to the shop
      </Link>
    </div>
  );
}
