import React from 'react';

const CryptoCard = ({ symbol, price, change, marketCap }) => {
  return (
   <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 text-left w-full">
      {/* Contenedor único para todos los elementos alineados a la izquierda */}
      <div className="flex flex-col items-start space-y-2">
        {/* Nombre/Símbolo */}
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {symbol.replace('USDT', '')}
        </h3>
        
        {/* Precio */}
        <p className="text-gray-600 dark:text-gray-300">
          Precio: ${parseFloat(price).toLocaleString(undefined, { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 8 
          })}
        </p>
        
        {/* Cambio porcentual (si existe) */}
        {change !== undefined && (
          <p className={`text-sm font-medium ${
            change >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {change >= 0 ? '↑' : '↓'} 
            {Math.abs(change).toFixed(2)}% (24h)
          </p>
        )}
        
        {/* Market Cap (si existe) */}
        {marketCap && (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Capitalización: ${marketCap.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            })}
          </p>
        )}
      </div>
    </div>
  );
};

export default CryptoCard;