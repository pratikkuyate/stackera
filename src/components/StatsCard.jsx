export default function StatsCard({ label, value, highlight }) {
  // highlight: 'up' | 'down' | null
  const color =
    highlight === "up"
      ? "#22c55e"
      : highlight === "down"
        ? "#ef4444"
        : "var(--text)";

  return (
    <div className="stats-card">
      <span className="stats-label">{label}</span>
      <span className="stats-value" style={{ color }}>
        {value ?? "—"}
      </span>
    </div>
  );
}
