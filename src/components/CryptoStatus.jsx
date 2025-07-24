import React, { useEffect, useState, useCallback } from "react";
import CryptoCard from "./CryptoCard";
import Pagination from "./Pagination";

function CryptoStatus() {
  const [cryptos, setCryptos] = useState([]);
  const [binancePrices, setBinancePrices] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //  250 criptomonedas principales de CoinGecko
  const fetchCryptoData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1"
      );
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setCryptos(data);
    } catch (err) {
      console.error("Error fetching crypto data:", err);
      setError(
        "No se pudieron cargar los datos de las criptomonedas. Por favor, intenta de nuevo."
      );
      setCryptos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Conexión WebSocket a Binance para precios en tiempo real
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

  // Datos de CoinGecko + Binance
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

  // Cargar datos iniciales
  useEffect(() => {
    fetchCryptoData();
  }, [fetchCryptoData]);

  // Definir paginación
  const itemsPerPage = 10;
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const paginatedCryptos = mergedCryptos.slice(start, end);

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-left">
        <h2 className="text-4xl font-bold font-sans mb-8 text-gray-900 text-center">
          Ranking de las {mergedCryptos.length} Criptomonedas Líderes en el
          Mercado Global
          <span className="block text-base ml-3 text-green-600 animate-pulse text-center">
            • Actualización en tiempo real
          </span>
        </h2>

        {loading ? (
          <div className="text-center py-8 text-lg font-semibold text-gray-900">
            Cargando datos...
          </div>
        ) : error ? (
          <div className="text-center py-8 text-lg font-semibold text-red-600">
            {error}
          </div>
        ) : (
          <>
            <div className="space-y-2">
              {paginatedCryptos.length > 0 ? (
                paginatedCryptos.map((coin, index) => (
                  <CryptoCard
                    key={coin.id}
                    rank={start + index + 1}
                    symbol={coin.symbol.toUpperCase()}
                    price={coin.current_price}
                    change={coin.price_change_percentage_24h}
                    marketCap={coin.market_cap}
                    image={coin.image}
                    name={coin.name}
                    isRealtime={coin.isRealtime}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-lg font-semibold text-gray-900">
                  No hay datos disponibles.
                </div>
              )}
            </div>

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
