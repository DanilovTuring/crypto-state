import React, { useEffect, useState, useCallback } from "react";
import CryptoCard from "./CryptoCard";
import Pagination from "./Pagination";

function CryptoStatus() {
  const [cryptos, setCryptos] = useState([]);
  const [binancePrices, setBinancePrices] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // 1. Obtener datos estáticos de CoinGecko (metadata, market cap, etc.)
  const fetchCryptoData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${page}`
      );
      const data = await res.json();
      setCryptos(data);
    } catch (err) {
      console.error("Error fetching crypto data:", err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  // 2. Conexión WebSocket a Binance para precios en tiempo real
  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

    ws.onmessage = (e) => {
      const tickers = JSON.parse(e.data);
      const prices = {};

      tickers.forEach((ticker) => {
        if (ticker.s.endsWith("USDT")) {
          const symbol = ticker.s.replace("USDT", "").toUpperCase();
          prices[symbol] = {
            price: parseFloat(ticker.c),
            change: parseFloat(ticker.P),
          };
        }
      });

      setBinancePrices(prices);
    };

    return () => ws.close();
  }, []);

  // 3. Combinar datos de CoinGecko + Binance
  const mergedCryptos = cryptos.map((coin) => {
    const binanceData = binancePrices[coin.symbol.toUpperCase()] || {};
    return {
      ...coin,
      current_price: binanceData.price || coin.current_price,
      price_change_percentage_24h:
        binanceData.change !== undefined
          ? binanceData.change
          : coin.price_change_percentage_24h,
      isRealtime: !!binanceData.price,
    };
  });

  // 4. Cargar datos iniciales
  useEffect(() => {
    fetchCryptoData();
  }, [fetchCryptoData]);

  //definir paginas
  const itemsPerPage = 10;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const paginatedCryptos = mergedCryptos.slice(start, end);

  return (
    <section className="py-12 px-4 bg-gray-50 dark:bg-[--color-primary-dark]">
      <div className="max-w-7xl mx-auto text-left">
        <h2 className="text-3xl font-bold mb-8">
          Todas las Criptomonedas (Top {mergedCryptos.length})
          <span className="text-sm ml-2 text-green-500 animate-pulse">
            • Actualización en tiempo real
          </span>
        </h2>

        {loading ? (
          <div className="text-center py-8">Cargando datos...</div>
        ) : (
          <>
            <div className="space-y-4">
              {paginatedCryptos.map((coin) => (
                <CryptoCard
                  key={coin.id}
                  symbol={coin.symbol.toUpperCase()}
                  price={coin.current_price}
                  change={coin.price_change_percentage_24h}
                  marketCap={coin.market_cap}
                  image={coin.image}
                  name={coin.name}
                  isRealtime={coin.isRealtime}
                />
              ))}
            </div>

            {/* Paginación */}
            <Pagination
              currentPage={page}
              totalItems={mergedCryptos.length}
              itemsPerPage={itemsPerPage}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </>
        )}
      </div>
    </section>
  );
}

export default CryptoStatus;
