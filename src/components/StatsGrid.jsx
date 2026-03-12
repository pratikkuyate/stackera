import StatsCard from "./StatsCard";

function fmt(val, decimals = 2) {
  if (val == null) return "—";
  return parseFloat(val).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function fmtTurnover(val) {
  if (val == null) return "—";
  const n = parseFloat(val);
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  return `$${n.toFixed(2)}`;
}

function fmtChange(val) {
  if (val == null) return "—";
  const pct = (parseFloat(val) * 100).toFixed(2);
  return `${pct > 0 ? "+" : ""}${pct}%`;
}

export default function StatsGrid({ ticker }) {
  const priceHighlight =
    ticker?.lastPrice > ticker?.prevLastPrice
      ? "up"
      : ticker?.lastPrice < ticker?.prevLastPrice
        ? "down"
        : null;

  const changeVal = ticker?.change24h
    ? parseFloat(ticker.change24h) * 100
    : null;
  const changeHighlight = changeVal > 0 ? "up" : changeVal < 0 ? "down" : null;

  const stats = [
    {
      label: "BTC Price (USDT)",
      value: `$${fmt(ticker?.lastPrice)}`,
      highlight: priceHighlight,
    },
    {
      label: "Mark Price",
      value: `$${fmt(ticker?.markPrice)}`,
      highlight: null,
    },
    { label: "24h High", value: `$${fmt(ticker?.high24h)}`, highlight: null },
    { label: "24h Low", value: `$${fmt(ticker?.low24h)}`, highlight: null },
    {
      label: "24h Turnover",
      value: fmtTurnover(ticker?.turnover24h),
      highlight: null,
    },
    {
      label: "24h Change",
      value: fmtChange(ticker?.change24h),
      highlight: changeHighlight,
    },
  ];

  return (
    <div className="stats-grid">
      {stats.map((s) => (
        <StatsCard key={s.label} {...s} />
      ))}
    </div>
  );
}
