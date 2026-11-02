import Link from "next/link";

type Props = { page: number; pageCount: number; basePath: string; params?: Record<string, string | undefined> };

export function Pagination({ page, pageCount, basePath, params = {} }: Props) {
  if (pageCount <= 1) return null;
  const href = (p: number) => {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) if (v) sp.set(k, v);
    if (p > 1) sp.set("page", String(p));
    const qs = sp.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <nav aria-label="Pages" className="mt-8 flex items-center justify-center gap-2">
      {page > 1 && (
        <Link href={href(page - 1)} className="rounded-lg border border-line px-3 py-1.5 hover:border-roast">
          ‹ Prev
        </Link>
      )}
      {pages.map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-current={p === page ? "page" : undefined}
          className={`rounded-lg px-3 py-1.5 ${p === page ? "bg-espresso text-cream" : "border border-line hover:border-roast"}`}
        >
          {p}
        </Link>
      ))}
      {page < pageCount && (
        <Link href={href(page + 1)} className="rounded-lg border border-line px-3 py-1.5 hover:border-roast">
          Next ›
        </Link>
      )}
    </nav>
  );
}
