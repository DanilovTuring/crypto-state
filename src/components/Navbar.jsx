import React, { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-purple-700/70 dark:bg-purple-800/60 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="/Logo1.png"
              alt="CryptoState logo"
              className="w-10 h-10 rounded-full shadow-md border border-amber-400"
            />
            <span className="text-xl font-extrabold text-amber-400 tracking-tight animate-fade-in-up">
              CryptoState
            </span>
          </div>
          {/* Menú en escritorio */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#home"
              className="text-gray-200 dark:text-gray-100 hover:text-amber-400 dark:hover:text-amber-400 font-semibold text-sm transition-colors duration-200 animate-fade-in-up animation-delay-200"
            >
              Inicio
            </a>
            <a
              href="https://academy.binance.com/es"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 dark:text-gray-100 hover:text-amber-400 dark:hover:text-amber-400 font-semibold text-sm transition-colors duration-200 animate-fade-in-up animation-delay-300"
            >
              Aprender Más
            </a>
            <a
              href="https://www.binance.com/en/buy-sell-crypto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 dark:text-gray-100 hover:text-amber-400 dark:hover:text-amber-400 font-semibold text-sm transition-colors duration-200 animate-fade-in-up animation-delay-400"
            >
              Comprar Crypto
            </a>
          </div>
          {/* Botón hamburguesa para móvil */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-200 dark:text-gray-100 hover:text-amber-400 dark:hover:text-amber-400 focus:outline-none"
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        {/* Menú desplegable en móvil */}
        {isMenuOpen && (
          <div className="md:hidden bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-700 dark:to-purple-900 shadow-md">
            <div className="flex flex-col space-y-4 px-4 py-4">
              <a
                href="#"
                className="text-gray-200 dark:text-gray-100 hover:text-amber-400 dark:hover:text-amber-400 font-semibold text-sm transition-colors duration-200 animate-fade-in-up"
                onClick={toggleMenu}
              >
                Inicio
              </a>
              <a
                href="#"
                className="text-gray-200 dark:text-gray-100 hover:text-amber-400 dark:hover:text-amber-400 font-semibold text-sm transition-colors duration-200 animate-fade-in-up animation-delay-100"
                onClick={toggleMenu}
              >
                Mercados
              </a>
              <a
                href="#"
                className="text-gray-200 dark:text-gray-100 hover:text-amber-400 dark:hover:text-amber-400 font-semibold text-sm transition-colors duration-200 animate-fade-in-up animation-delay-200"
                onClick={toggleMenu}
              >
                Portafolio
              </a>
              <a
                href="#"
                className="text-gray-200 dark:text-gray-100 hover:text-amber-400 dark:hover:text-amber-400 font-semibold text-sm transition-colors duration-200 animate-fade-in-up animation-delay-300"
                onClick={toggleMenu}
              >
                Contacto
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
