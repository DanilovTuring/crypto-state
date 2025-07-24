import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

//Limpiar simbolo para formato
const cleanSymbol = (sym) => {
  if (!sym) return "---";
  const keepFullSymbol = ["USDT", "BTC", "ETH", "BNB", "XRP", "SOL", "DOGE"];
  if (keepFullSymbol.includes(sym)) return sym;
  return sym.replace(/(USDT|USD)$/gi, "").trim();
};

const BuyButton = ({ symbol, name, rank }) => {
  const [binanceUrl, setBinanceUrl] = useState(
    "https://www.binance.com/en/buy-sell-crypto"
  );

  // Lista de excepciones
  const exceptions = {
    DAI: "https://www.binance.com/en/buy-sell-crypto",
  };

  useEffect(() => {
    const checkBinanceListing = async () => {
      const cleanedSymbol = cleanSymbol(symbol).toUpperCase();

      //URL para lista de excepciones
      if (exceptions[cleanedSymbol]) {
        console.log(
          `Excepción aplicada para ${cleanedSymbol}: ${exceptions[cleanedSymbol]}`
        );
        setBinanceUrl(exceptions[cleanedSymbol]);
        return;
      }

      const cacheKey = "binance_exchange_info";
      const cacheExpiry = 24 * 60 * 60 * 1000; // hrs en ms
      const cacheData = localStorage.getItem(cacheKey);

      let pairs = [];
      if (cacheData) {
        const { data, timestamp } = JSON.parse(cacheData);
        if (Date.now() - timestamp < cacheExpiry) {
          pairs = data;
          console.log(
            `Usando caché para pares de Binance, símbolos: ${pairs.length}`
          );
        }
      }

      if (!pairs.length) {
        try {
          const res = await fetch(
            "https://api.binance.com/api/v3/exchangeInfo"
          );
          if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
          const data = await res.json();
          pairs = data.symbols.map((s) => s.symbol);
          localStorage.setItem(
            cacheKey,
            JSON.stringify({ data: pairs, timestamp: Date.now() })
          );
          console.log(`Pares obtenidos de Binance: ${pairs.length} pares`);
        } catch (error) {
          console.error(
            `Error fetching Binance exchange info para ${cleanedSymbol}:`,
            error
          );
          setBinanceUrl("https://www.binance.com/en/buy-sell-crypto");
          return;
        }
      }

      const standardPair = `${cleanedSymbol}USDT`;
      const inversePair = `USDT_${cleanedSymbol}`;

      console.log(
        `Verificando pares para ${cleanedSymbol}: ${standardPair}, ${inversePair}`
      );

      let url;
      if (pairs.includes(standardPair)) {
        url = `https://www.binance.com/en/trade/${standardPair}`;
        console.log(`Par encontrado: ${standardPair} → ${url}`);
      } else if (pairs.includes(inversePair)) {
        url = `https://www.binance.com/en/trade/${inversePair}`;
        console.log(`Par inverso encontrado: ${inversePair} → ${url}`);
      } else {
        url = "https://www.binance.com/en/buy-sell-crypto";
        console.log(
          `Ningún par encontrado para ${cleanedSymbol}, usando URL genérica: ${url}`
        );
      }
      setBinanceUrl(url);
    };

    checkBinanceListing();
  }, [symbol]);

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
      Comprar
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
