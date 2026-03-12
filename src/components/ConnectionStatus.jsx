export default function ConnectionStatus({ status }) {
  const map = {
    connected: { label: "Connected", color: "#22c55e" },
    disconnected: { label: "Disconnected", color: "#ef4444" },
    reconnecting: { label: "Reconnecting…", color: "#f59e0b" },
  };
  const { label, color } = map[status] ?? map.disconnected;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: color,
          display: "inline-block",
        }}
      />
      <span style={{ fontSize: 13, color }}>{label}</span>
    </div>
  );
}
