import React from "react";
import PropTypes from "prop-types";
import BuyButton from "./BuyButton";
// Formatear valores de la criptomoneda
const formatCurrency = (value, minDecimals = 2, maxDecimals = 8) => {
  if (value === undefined || value === null) return "N/A";
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: maxDecimals,
  });
};

// Formatear números grandes
const formatLargeNumber = (value) => {
  if (!value) return "N/A";
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return formatCurrency(value, 0, 0);
};

// Limpiar símbolo
const cleanSymbol = (sym) => {
  if (!sym) return "---";
  const keepFullSymbol = ["USDT", "BTC", "ETH", "BNB", "XRP", "SOL", "DOGE"];
  if (keepFullSymbol.includes(sym)) return sym;
  return sym.replace(/(USDT|USD)$/gi, "").trim();
};

// Obtener ícono de cambio
const getChangeIcon = (changeValue) => {
  if (changeValue === undefined || changeValue === null) return null;
  return changeValue >= 0 ? (
    <svg
      className="w-4 h-4 inline-block mr-1.5 group-hover:bg-amber-50 rounded"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 15l7-7 7 7"
      />
    </svg>
  ) : (
    <svg
      className="w-4 h-4 inline-block mr-1.5 group-hover:bg-amber-50 rounded"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
};

const CryptoCard = ({
  symbol,
  name,
  price,
  change,
  marketCap,
  image,
  rank,
}) => {
  return (
    <div
      className="flex w-full py-2 px-3 bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-amber-50/50 transition-all duration-300 group"
      role="row"
      aria-label={`Información de ${name || symbol}, posición ${rank}`}
    >
      {/* Columna Ranking */}
      <div className="w-[50px] sm:w-[60px] text-left sticky left-0 bg-white z-10">
        <span className="text-base font-semibold text-amber-600">#{rank}</span>
      </div>

      {/* Columna Logo y Nombre */}

      <div className="w-[120px] sm:w-1/4 flex items-center space-x-2 sticky left-[50px] sm:left-[60px] bg-white z-10">
        <img
          src={
            image ||
            `https://cryptocurrencyliveprices.com/img/${symbol.toLowerCase()}.png`
          }
          alt={`${name || symbol} logo`}
          className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border border-amber-300 object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://cryptocurrencyliveprices.com/img/coin.png";
          }}
        />
        <div className="flex-1 overflow-hidden">
          <span className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2">
            {name || "---"}
          </span>
          <span className="text-xs sm:text-sm text-gray-500 block truncate">
            {cleanSymbol(symbol)}
          </span>
        </div>
      </div>

      {/* Columna Precio */}
      <div className="w-[80px] sm:w-1/5 text-left sm:text-right">
        <span className="text-sm sm:text-base font-semibold text-gray-900 w-full text-left pl-8 ml-32">
          {price !== undefined ? formatCurrency(price) : "---"}
        </span>
      </div>

      {/* Columna Cambio 24h */}
      <div className="w-1/5 min-w-[140px] text-right">
        {change !== undefined && change !== null ? (
          <span
            className={`text-base font-semibold flex items-center justify-end gap-1.5 ${
              change >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {getChangeIcon(change)} {Math.abs(change).toFixed(2)}%
          </span>
        ) : (
          <span className="text-base text-gray-500">---</span>
        )}
      </div>

      {/* Columna Market Cap */}
      <div className="w-1/5 min-w-[140px] text-right">
        <span className="text-base font-semibold text-gray-900">
          {formatLargeNumber(marketCap)}
        </span>
      </div>

      {/* Columna  Botón */}
      <div className="w-[120px] text-right">
        <BuyButton symbol={symbol} name={name} rank={rank} />
      </div>
    </div>
  );
};

CryptoCard.propTypes = {
  symbol: PropTypes.string.isRequired,
  name: PropTypes.string,
  price: PropTypes.number,
  change: PropTypes.number,
  marketCap: PropTypes.number,
  image: PropTypes.string,
  rank: PropTypes.number.isRequired,
};

CryptoCard.defaultProps = {
  name: "---",
  price: undefined,
  change: undefined,
  marketCap: undefined,
  image: undefined,
  rank: 1,
};

export default CryptoCard;
