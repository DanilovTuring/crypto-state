import React from "react";
import PropTypes from "prop-types";

//Formatear valores unitarios
const formatCurrency = (value, minDecimals = 2, maxDecimals = 8) => {
  if (value === undefined || value === null) return "N/A";
  return value.toLocaleString(undefined, {
    minimumFractionDigits: minDecimals,
    aximumFractionDigits: maxDecimals,
  });
};

//Formatear números grandes
const formatLargeNumber = (value) => {
  if (!value) return "N/A";
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return formatCurrency(value, 0, 0);
};

//Limpiar símbolo de la criptomoneda
const cleanSymbol = (sym) => {
  if (!sym) return "---";
  const keepFullSymbol = ["USDT", "BTC", "ETH", "BNB", "XRP", "SOL", "DOGE"];
  if (keepFullSymbol.includes(sym)) return sym;
  return sym.replace(/(USDT|USD)$/gi, "").trim();
};

//Obtener ícono de cambio
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
      className="flex items-center w-full py-4 px-6 bg-white rounded-lg
    shadow-sm hover:shadow-sm hover:bg-amber-50/50 transition-all 
    duration-300 group border-b border-gray-100"
      role="row"
      aria-label={`Información de ${name || symbol}, posición ${rank}`}
    >
      {/* Conlumna Ranking */}
      <div className="w-[60px] text-left">
        <span className="text-base font-semibold text-amber-600">#{rank}</span>
      </div>

      {/* Columna Logo y Nombre */}
      <div className="flex items-center w-1/5 min-w-[220px] space-x-4">
        <img
          src={
            image ||
            `https://cryptocurrencyliveprices.com/img/${symbol.toLowerCase()}.png`
          }
          alt={`${name || symbol} logo`}
          className="w-10 rounded-full border border-amber-300 object-cover
          transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://cryptocurrencyliveprices.com/img/coin.png";
          }}
        />

        <div className="flex-1">
          <span className="text-lg font-semibold text-gray-900 truncate">
            {name || "---"}
          </span>
          <span className="text-sm text-gray-500 block">
            {cleanSymbol(symbol)}
          </span>
        </div>
      </div>

      {/* Columna Precio*/}
      <div className="w-1/5 min-w-[140px] text-right">
        <span className="text-base font-semibold text-gray-900">
          {price !== undefined ? formatCurrency(price) : "---"}
        </span>
      </div>

      <div>
        <p className="text-lg font-semibold text-gray-800 dark:text-white truncate">
          {name}
        </p>
        <h3 className="text-sm text-gray-500 dark:text-gray-400 truncate">
          {cleanSymbol(symbol)}
        </h3>
      </div>

      {/* Body */}
      <div className="flex-grow space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 dark:text-gray-400">Precio:</span>
          <span className="font-medium">
            {price !== undefined ? `$${formatCurrency(price)}` : "---"}
          </span>
        </div>

        {change !== undefined && change !== null && (
          <div className="flex justify-between items-center">
            <span className="text-gray-500 dark:text-gray-400">
              Cambio (24h):
            </span>
            <span
              className={`font-medium ${
                change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {Math.abs(change).toFixed(2)}%
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      {marketCap && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              Market Cap:
            </span>
            <span>{formatLargeNumber(marketCap)}</span>
          </div>
        </div>
      )}
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
};

CryptoCard.defaultProps = {
  name: "---",
  price: undefined,
  change: undefined,
  marketCap: undefined,
  image: undefined,
};

export default CryptoCard;
