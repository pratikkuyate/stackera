export default function TradingViewChart({ theme }) {
  const src =
    `https://www.tradingview.com/widgetembed/` +
    `?symbol=BYBIT%3ABTCUSDT` +
    `&interval=1` +
    `&theme=${theme}` +
    `&style=1` +
    `&locale=en` +
    `&timezone=Etc%2FUTC` +
    `&hide_top_toolbar=0` +
    `&hidesidetoolbar=0` +
    `&withdateranges=1` +
    `&save_image=0` +
    `&calendar=0`;

  return (
    <div className="tradingview-wrapper">
      <iframe
        key={theme}
        src={src}
        title="BTC/USDT TradingView Chart"
        style={{ width: "100%", height: "100%", border: "none" }}
        allowFullScreen
      />
    </div>
  );
}
