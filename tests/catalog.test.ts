import { describe, expect, it } from "vitest";
import { stockLabel } from "@/lib/catalog";
import { formatLei } from "@/lib/money";

describe("availability label (A1)", () => {
  it("says out of stock at 0", () => {
    expect(stockLabel(0)).toEqual({ text: "Out of stock", tone: "out" });
  });
  it("warns when 3 or fewer are left", () => {
    expect(stockLabel(2)).toEqual({ text: "Only 2 left", tone: "low" });
  });
  it("says in stock above 3", () => {
    expect(stockLabel(14).tone).toBe("ok");
  });
});

describe("prices in bani", () => {
  it("formats whole and fractional lei", () => {
    expect(formatLei(6800)).toBe("68 lei");
    expect(formatLei(6850)).toBe("68,50 lei");
  });
});
