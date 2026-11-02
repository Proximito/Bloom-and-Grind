import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { LogoutButton } from "@/components/LogoutButton";

export async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="border-b border-line bg-cream">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:flex-nowrap sm:gap-6">
        <Link href="/" className="font-serif text-xl font-bold whitespace-nowrap">
          Bloom &amp; Grind
        </Link>
        <form action="/products" method="get" role="search" className="order-last w-full sm:order-none sm:flex-1">
          <label htmlFor="site-search" className="sr-only">
            Search products
          </label>
          <input
            id="site-search"
            name="q"
            type="search"
            placeholder="Search coffee and gear…"
            className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-base outline-none focus:border-roast"
          />
        </form>
        <nav className="ml-auto flex items-center gap-4 text-sm whitespace-nowrap sm:ml-0">
          <Link href="/products" className="hover:text-roast">
            Shop
          </Link>
          {session ? (
            <>
              {session.user.role === "ADMIN" && (
                <Link href="/admin" className="hover:text-roast">
                  Admin
                </Link>
              )}
              <Link href="/account" className="hover:text-roast">
                {session.user.name?.split(" ")[0] ?? "Account"}
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-roast">
                Log in
              </Link>
              <Link href="/register" className="rounded-lg bg-espresso px-3 py-1.5 text-cream hover:bg-bean">
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
