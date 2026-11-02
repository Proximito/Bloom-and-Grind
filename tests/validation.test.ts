import { describe, expect, it } from "vitest";
import { catalogQuerySchema, registerSchema, PAGE_SIZE } from "@/lib/validation";

describe("catalog query (A1, A2, A10)", () => {
  it("shows at most 24 products per page", () => {
    expect(PAGE_SIZE).toBeLessThanOrEqual(24);
  });

  it("defaults to page 1 and turns bad page numbers into page 1", () => {
    expect(catalogQuerySchema.parse({}).page).toBe(1);
    expect(catalogQuerySchema.parse({ page: "abc" }).page).toBe(1);
    expect(catalogQuerySchema.parse({ page: "-3" }).page).toBe(1);
    expect(catalogQuerySchema.parse({ page: "2" }).page).toBe(2);
  });

  it("trims the search text and ignores unsafe category slugs", () => {
    expect(catalogQuerySchema.parse({ q: "  kenya " }).q).toBe("kenya");
    expect(catalogQuerySchema.parse({ category: "brewers" }).category).toBe("brewers");
    expect(catalogQuerySchema.parse({ category: "x'; DROP TABLE" }).category).toBeUndefined();
  });
});

describe("registration input (A4, A10)", () => {
  it("accepts a valid account and lowercases the email", () => {
    const r = registerSchema.safeParse({ name: "Ana Pop", email: "Ana@Example.COM", password: "Coffee2026!" });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.email).toBe("ana@example.com");
  });

  it("rejects an invalid email", () => {
    expect(registerSchema.safeParse({ name: "Ana Pop", email: "ana", password: "Coffee2026!" }).success).toBe(false);
  });

  it("rejects a password shorter than 8 characters", () => {
    expect(registerSchema.safeParse({ name: "Ana Pop", email: "ana@example.com", password: "short" }).success).toBe(false);
  });
});
