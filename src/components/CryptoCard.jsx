import React from "react";
import PropTypes from "prop-types";
import BuyButton from "./BuyButton";

const formatCurrency = (value, minDecimals = 2, maxDecimals = 8) => {
  if (value === undefined || value === null) return "N/A";
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: maxDecimals,
  });
};

const formatLargeNumber = (value) => {
  if (!value) return "N/A";
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return formatCurrency(value, 0, 0);
};

const cleanSymbol = (sym) => {
  if (!sym) return "---";
  const keepFullSymbol = ["USDT", "BTC", "ETH", "BNB", "XRP", "SOL", "DOGE"];
  if (keepFullSymbol.includes(sym)) return sym;
  return sym.replace(/(USDT|USD)$/gi, "").trim();
};

const getChangeIcon = (changeValue) => {
  if (changeValue === undefined || changeValue === null) return null;
  return changeValue >= 0 ? (
    <svg
      className="w-4 h-4 inline-block mr-1"
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
      className="w-4 h-4 inline-block mr-1"
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
  isRealtime,
}) => {
  return (
    <div
      className="flex flex-col sm:flex-row items-start sm:items-center w-full py-3 px-3 sm:px-4 bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-amber-50/50 transition-all duration-300 group"
      role="row"
      aria-label={`Información de ${name || symbol}, posición ${rank}`}
    >
      {/* Columna Ranking */}
      <div className="w-full sm:w-[50px] text-left mb-2 sm:mb-0">
        <span className="text-sm sm:text-base font-semibold text-amber-600">
          #{rank}
        </span>
      </div>

      {/* Columna Logo y Nombre */}
      <div className="flex items-center w-full sm:w-1/4 sm:min-w-[120px] space-x-3 mb-2 sm:mb-0">
        <img
          src={
            image ||
            `https://cryptocurrencyliveprices.com/img/${symbol.toLowerCase()}.png`
          }
          alt={`${name || symbol} logo`}
          className="w-6 sm:w-8 h-6 sm:h-8 rounded-full border border-amber-300 object-cover transition-transform duration-300 group-hover:scale-105"
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
      <div className="w-full sm:w-1/5 sm:min-w-[80px] mb-2 sm:mb-0">
        <span className="text-sm sm:text-base font-semibold text-gray-900 w-full text-left">
          {price !== undefined ? formatCurrency(price) : "---"}
        </span>
      </div>

      {/* Columna Cambio 24h */}
      <div className="w-full sm:w-1/5 sm:min-w-[80px] text-left sm:text-right mb-2 sm:mb-0">
        {change !== undefined && change !== null ? (
          <span
            className={`text-sm sm:text-base font-semibold flex items-center justify-start sm:justify-end gap-1 ${
              change >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {getChangeIcon(change)} {Math.abs(change).toFixed(2)}%
          </span>
        ) : (
          <span className="text-sm sm:text-base text-gray-500">---</span>
        )}
      </div>

      {/* Columna Market Cap */}
      <div className="w-full sm:w-1/5 sm:min-w-[80px] text-left sm:text-right mb-2 sm:mb-0">
        <span className="text-sm sm:text-base font-semibold text-gray-900">
          {formatLargeNumber(marketCap)}
        </span>
      </div>

      {/* Columna Botón */}
      <div className="w-full sm:w-[80px] text-left sm:text-right">
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
  isRealtime: PropTypes.bool,
};

CryptoCard.defaultProps = {
  name: "---",
  price: undefined,
  change: undefined,
  marketCap: undefined,
  image: undefined,
  rank: 1,
  isRealtime: false,
};

export default CryptoCard;
