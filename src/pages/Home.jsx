import React from "react";

function Home() {
  return (
    <section
      className="relative px-4 py-16 md:py-24 bg-gradient-to-br from-purple-600 to-purple-800
       dark:from-purple-700 dark:to-purple-900 text-gray-900 dark:text-white overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-10 bg-[url('https://cryptocurrencyliveprices.com/img/coin.png')] bg-repeat bg-[length:50px_50px]"
        aria-hidden="true"
      ></div>

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Hero Heading */}
        <h1
          className="text-4xl md:text-6xl font-extrabold tracking-tight
        mb-6 animate-fade-in-up"
        >
          Bienvenido a <span className="text-amber-400">CryptoState</span>
        </h1>

        {/* Subheading */}
        <p
          className="text-4xl md:text text-gray-200
        dark:text-gray-100 mb-8 max-w-3xl mx-auto
        animated-fade-in-up animation-delay-200"
        >
          Tu plataforma líder para rastrear criptomonedas en tiempo real con
          datos precisos y actualizados.
        </p>

        {/* Action Buttons */}
        <div
          className="flex flex-col sm:flex-row justify-center
        gap-4 animate-fade-in-up animation-delay-400"
        >
          <a
            href="#"
            className="inline-block px-8 py-3 bg-amber-600 text-white 
            font-semibold rounded-lg shadow-md hover:bg-amber-700 dark:bg-amber-500
            dark:hover:bg-amber-600 trnasition-colors duration-200"
            aria-label="Comenzar a usar CryptoState"
          >
            Comenzar
          </a>
          <a
            href="#"
            className="inline-block px-8 py-3 bg-transparent border-2 border-amber-400 text-amber-400 font-semibold rounded-lg hover:bg-amber-400 hover:text-white
             dark:hover:bg-amber-500 dark:hover:text-white transition-colors duration-200"
            aria-label="Aprender más sobre CryptoState"
          >
            Aprender Más
          </a>
        </div>
      </div>
    </section>
  );
}

export default Home;
