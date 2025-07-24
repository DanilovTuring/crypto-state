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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleAccept = () => {
    window.open(binanceUrl, "_blank", "noopener,noreferrer");
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        className="py-2 px-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-sm font-semibold rounded-md hover:from-yellow-600 hover:to-amber-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm"
        aria-label={`Abrir modal para comprar ${
          name || symbol
        } en Binance, posición ${rank}`}
      >
        Comprar
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gradient-to-b
        from-gray-800/20 to-amber-100/20 flex items-center
        justify-center z-50"
        >
          <div
            className="bg-white rounded-lg p-8 w-full
          sm:max-w-md mx-4 max-h-[80vh] overflow-y-auto shadow-lg
          border border-amber-300 transform animate-in zoom-in-90
          duration-300"
          >
            <div className="flex justify-center mb-4">
              <svg
                className="w-12 h-12 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl sm:text-2x1 font-bold text-gray-900">
                Redirigiendo a Binance
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Cerrar modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="text-base text-gray-700 mb-6">
              Hola! Al continuar serás redirigido a la pagina oficial de Binance
              para comprar {name || symbol}, te informamos que no generamos
              ganancias ni comisiones!
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleClose}
                className="py-2 px-4 bg-gray-100 text-gray-700
              text-sm font-semibold rounded-md hover:bg-gray-200 
              transition-all duration-200 transform
              hover:-translate-y-0.5"
              >
                Cancelar
              </button>
              <button
                onClick={handleAccept}
                className="py-2 px-4 bg-gradient-to-r
               from-yellow-500 to-amber-600 text-white text-sm
                font-semibold rounded-md hover:from-yellow-600
               hover:to-amber-700 transition-all duration-200
              transform hover:-translate-y-0.5"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
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
