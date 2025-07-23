import React from "react";
import PropTypes from "prop-types";

//Limpiar simbolo para formato
const cleanSymbol = (sym) => {
  if (!sym) return "---";
  const keepFullSymbol = ["USDT", "BTC", "ETH", "BNB", "XRP", "SOL", "DOGE"];
  if (keepFullSymbol.includes(sym)) return sym;
  return sym.replace(/(USDT|USD)$/gi, "").trim();
};

const BuyButton = ({ symbol, name, rank }) => {
  const binanceSymbol = `${cleanSymbol(symbol).toUpperCase()}USDT`;
  const binanceUrl = `https://www.binance.com/en/trade/${binanceSymbol}`;

  return (
    <a
      href={binanceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="py-2 px-4 bg-gradient-to-r from-yellow-500
        to-amber-600 text-white text-sm font-semibold rounded-md
        hover:from-yellow-600 hover:to-amber-700 transition-all
        duration-300 transform hover:-translate-y-0.5 shadow-sm"
      aria-label={`Comprar ${name || symbol} en Binance, posición ${rank}`}
    >
      Comprar en Binance
    </a>
  );
};

BuyButton.propTypes = {
  symbol: PropTypes.string.isRequired,
  name: PropTypes.string,
  rank: PropTypes.number.isRequired,
};

BuyButton.defaultProps = {
  name: "---",
};

export default BuyButton;
