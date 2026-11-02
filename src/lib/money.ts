// Prices are stored as whole bani (1 leu = 100 bani).
export function formatLei(bani: number): string {
  const lei = bani / 100;
  const text = Number.isInteger(lei) ? String(lei) : lei.toFixed(2).replace(".", ",");
  return `${text} lei`;
}
