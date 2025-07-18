import React, { useEffect, useState } from 'react';
import CryptoCard from './CryptoCard';

function CryptoStatus() {
  const [cryptoData, setCryptoData] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Mapeo de símbolos Binance a IDs de CoinGecko
  const symbolMap = {
    'BTCUSDT': 'bitcoin',
    'ETHUSDT': 'ethereum',
    'BNBUSDT': 'binancecoin',
    'SOLUSDT': 'solana',
    'XRPUSDT': 'ripple',
    'ADAUSDT': 'cardano'
  };

  const symbols = Object.keys(symbolMap);

  const fetchMarketData = async () => {
    try {
      // 1. Obtener precios y cambios de Binance
      const binanceData = await Promise.all([
        fetch('https://api.binance.com/api/v3/ticker/24hr')
          .then(res => res.json())
          .then(data => data.filter(item => symbols.includes(item.symbol))
        ),
        fetch('https://api.binance.com/api/v3/ticker/price')
          .then(res => res.json())
          .then(data => data.filter(item => symbols.includes(item.symbol))
        )
      ]);

      // 2. Obtener supply de CoinGecko
      const coinGeckoResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${Object.values(symbolMap).join(',')}`
      );
      const coinGeckoData = await coinGeckoResponse.json();

      // 3. Combinar datos
      const combinedData = {};
      
      binanceData[0].forEach(item => {
        const cgItem = coinGeckoData.find(cg => cg.symbol === item.symbol.toLowerCase().replace('usdt', ''));
        combinedData[item.symbol] = {
          price: item.lastPrice,
          change: parseFloat(item.priceChangePercent),
          marketCap: cgItem ? cgItem.market_cap : null
        };
      });

      setCryptoData(combinedData);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    const intervalId = setInterval(fetchMarketData, 15000); // 15 segundos
    
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
  <section className="py-12 px-4 bg-gray-50 dark:bg-[--color-primary-dark]">
    <div className="max-w-7xl mx-auto text-left">
      <h2 className="text-3xl font-bold mb-8">
        Monedas Principales (Tiempo Real)
      </h2>
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Última actualización: {lastUpdate.toLocaleTimeString()}
      </div>
      
      {/* Cambiado a solo 1 columna (una cripto por fila) */}
      <div className="grid grid-cols-1 gap-6 justify-items-start"> {/* Solo grid-cols-1 */}
        {Object.entries(cryptoData).map(([symbol, data]) => (
          <CryptoCard 
            key={symbol}
            symbol={symbol}
            price={data.price}
            change={data.change}
            marketCap={data.marketCap}
          />
        ))}
      </div>
    </div>
  </section>
);
}

export default CryptoStatus;