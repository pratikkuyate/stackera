import { useState, useEffect, useRef, useCallback } from "react";

const WS_URL = "wss://stream.bybit.com/v5/public/linear";
const SUBSCRIBE_MSG = JSON.stringify({
  op: "subscribe",
  args: ["tickers.BTCUSDT"],
});
const MAX_HISTORY = 60;
const RECONNECT_DELAY = 3000;

export function useBybitWebSocket() {
  const [ticker, setTicker] = useState(null);
  const [status, setStatus] = useState("disconnected"); // 'connected' | 'disconnected' | 'reconnecting'
  const [priceHistory, setPriceHistory] = useState([]);

  const wsRef = useRef(null);
  const reconnectTimer = useRef(null);
  const isMounted = useRef(true);

  const connect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.onclose = null; // prevent reconnect loop on manual close
      wsRef.current.close();
    }

    const ws = new WebSocket(WS_URL);
    // console.log("Connecting to Bybit WebSocket...", ws);
    wsRef.current = ws;

    ws.onopen = () => {
      if (!isMounted.current) return;
      setStatus("connected");
      ws.send(SUBSCRIBE_MSG);
    };

    ws.onmessage = (event) => {
      if (!isMounted.current) return;
      try {
        const msg = JSON.parse(event.data);
        if (msg.topic === "tickers.BTCUSDT" && msg.data) {
          const d = msg.data;
          // console.log("Received message:", d);
          setTicker((prev) => {
            // console.log("Previous ticker:", prev);
            const newTicker = {
              lastPrice: d.lastPrice ?? prev?.lastPrice,
              markPrice: d.markPrice ?? prev?.markPrice,
              high24h: d.highPrice24h ?? prev?.high24h,
              low24h: d.lowPrice24h ?? prev?.low24h,
              turnover24h: d.turnover24h ?? prev?.turnover24h,
              change24h: d.price24hPcnt ?? prev?.change24h,
              prevLastPrice: prev?.lastPrice ?? d.lastPrice,
            };
            return newTicker;
          });

          if (d.lastPrice) {
            const price = parseFloat(d.lastPrice);
            setPriceHistory((prev) => {
              const next = [...prev, { time: Date.now(), price }];
              return next.length > MAX_HISTORY
                ? next.slice(-MAX_HISTORY)
                : next;
            });
          }
        }
      } catch (err) {
        console.error("Error parsing message:", err);
      }
    };

    ws.onerror = () => {
      if (!isMounted.current) return;
      setStatus("disconnected");
    };

    ws.onclose = () => {
      if (!isMounted.current) return;
      setStatus("reconnecting");
      reconnectTimer.current = setTimeout(() => {
        if (isMounted.current) connect();
      }, RECONNECT_DELAY);
    };
  }, []);

  useEffect(() => {
    isMounted.current = true;
    connect();
    return () => {
      isMounted.current = false;
      clearTimeout(reconnectTimer.current);
      if (wsRef.current) {
        wsRef.current.onclose = null;
        wsRef.current.close();
      }
    };
  }, [connect]);

  return { ticker, status, priceHistory };
}
