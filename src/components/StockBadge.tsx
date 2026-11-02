const tones = {
  ok: "text-green-800",
  low: "text-amber-800",
  out: "text-red-800",
};

export function StockBadge({ text, tone }: { text: string; tone: "ok" | "low" | "out" }) {
  return <p className={`text-sm font-medium ${tones[tone]}`}>{text}</p>;
}
