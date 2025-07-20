import React from 'react';
import PropTypes from 'prop-types';

const CryptoCard = ({ symbol, name, price, change, marketCap, image }) => {
  const formatCurrency = (value, minDecimals = 2, maxDecimals = 8) => {
    if (value === undefined || value === null) return 'N/A';
    return value.toLocaleString(undefined, { 
      minimumFractionDigits: minDecimals, 
      maximumFractionDigits: maxDecimals 
    });
  };

  const formatLargeNumber = (value) => {
    if (!value) return 'N/A';
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${formatCurrency(value, 0, 0)}`;
  };

  const cleanSymbol = (sym) => {
    if (!sym) return '---';
    const keepFullSymbol = ['USDT', 'BTC', 'ETH', 'BNB', 'XRP', 'SOL', 'DOGE'];
    if (keepFullSymbol.includes(sym)) {
      return sym;
    }
    return sym.replace(/(USDT|USD)$/gi, '').trim();
  };

  const getChangeIcon = (changeValue) => {
    if (changeValue === undefined || changeValue === null) return null;
    return changeValue >= 0 ? '▲' : '▼';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 text-left w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-3">
        <div className="relative">
          <img 
            src={image || `https://cryptocurrencyliveprices.com/img/${symbol.toLowerCase()}.png`}
            alt={`${symbol} logo`}
            className="w-8 h-8 rounded-full"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://cryptocurrencyliveprices.com/img/coin.png';
            }}
          />
          {change !== undefined && change !== null && (
            <span className={`absolute -bottom-1 -right-1 text-xs px-1 rounded-full ${
              change >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {getChangeIcon(change)}
            </span>
          )}
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-800 dark:text-white truncate">
            {name}
          </p>
          <h3 className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {cleanSymbol(symbol)}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="flex-grow space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 dark:text-gray-400">Precio:</span>
          <span className="font-medium">
            {price !== undefined ? `$${formatCurrency(price)}` : '---'}
          </span>
        </div>

        {change !== undefined && change !== null && (
          <div className="flex justify-between items-center">
            <span className="text-gray-500 dark:text-gray-400">Cambio (24h):</span>
            <span className={`font-medium ${
              change >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {Math.abs(change).toFixed(2)}%
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      {marketCap && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 dark:text-gray-400">Market Cap:</span>
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
  name: '---',
  price: undefined,
  change: undefined,
  marketCap: undefined,
  image: undefined,
};

export default CryptoCard;
