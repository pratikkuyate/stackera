export default function ThemeToggle({ theme, onToggle, onClick }) {
  const isDark = theme === "dark";
  return (
    <div className="theme-toggle-wrapper">
      <button
        onClick={onToggle}
        className="theme-toggle"
        aria-label="Toggle theme"
      >
        <span className="theme-icon" key={theme}>
          {isDark ? "☀️" : "🌙"}
        </span>
        {isDark ? " Light Mode" : " Dark Mode"}
      </button>
      <button
        onClick={onClick}
        className="theme-toggle"
        aria-label="Force disconnect WebSocket"
      >
        <span className="disconnect-icon">🔌</span>
        {" Force Disconnect"}
      </button>
    </div>
  );
}
