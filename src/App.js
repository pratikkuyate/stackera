import { useState, useEffect } from "react";
import "./App.css";
import { useBybitWebSocket } from "./hooks/useBybitWebSocket";
import ConnectionStatus from "./components/ConnectionStatus";
import ThemeToggle from "./components/ThemeToggle";
import StatsGrid from "./components/StatsGrid";
import TradingViewChart from "./components/TradingViewChart";
import Sparkline from "./components/Sparkline";

function App() {
  const [theme, setTheme] = useState("dark");
  const { ticker, status, priceHistory } = useBybitWebSocket();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          <h1 className="app-title">BTC/USDT Live Dashboard</h1>
          <ConnectionStatus status={status} />
        </div>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </header>

      {/* Stats Cards */}
      <section className="section">
        <StatsGrid ticker={ticker} />
      </section>

      {/* Sparkline */}
      <section className="section">
        <Sparkline data={priceHistory} theme={theme} />
      </section>

      {/* TradingView Chart */}
      <section className="section chart-section">
        <TradingViewChart theme={theme} />
      </section>
    </div>
  );
}

export default App;
