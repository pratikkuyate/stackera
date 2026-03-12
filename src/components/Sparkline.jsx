import { LineChart, Line, Tooltip, ResponsiveContainer, YAxis } from "recharts";

export default function Sparkline({ data, theme }) {
  if (!data || data.length < 2) {
    return <div className="sparkline-empty">Collecting price data…</div>;
  }

  const chartData = data.map((d) => ({ price: parseFloat(d.price) }));
  const stroke = theme === "dark" ? "#38bdf8" : "#0369a1";

  return (
    <div className="sparkline-wrapper">
      <span className="sparkline-title">Last 60s Price</span>
      <ResponsiveContainer width="100%" height={80}>
        <LineChart data={chartData}>
          <YAxis domain={["auto", "auto"]} hide />
          <Tooltip
            contentStyle={{
              background: "var(--card-bg)",
              border: "1px solid var(--border)",
              color: "var(--text)",
              fontSize: 12,
            }}
            formatter={(v) => [`$${v.toLocaleString()}`, "Price"]}
            labelFormatter={() => ""}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={stroke}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
