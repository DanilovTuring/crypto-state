import React from "react";

const Footer = ({ darkMode = false }) => {
  return (
    <footer
      className={`py-12 px-4 w-full overflow-x-hidden relative ${
        darkMode ? "bg-gray-100/50 text-gray-100" : "bg-white text-gray-900"
      } transition-colors duration-300 shadow-sm`}
    >
      <style>
        {`
          @keyframes borderGlow {
            0% { border-color: #F59E0B; box-shadow: 0 0 5px #F59E0B; }
            50% { border-color: #FBBF24; box-shadow: 0 0 10px #FBBF24; }
            100% { border-color: #F59E0B; box-shadow: 0 0 5px #F59E0B; }
          }
          .logo-container {
            animation: borderGlow 3s ease-in-out infinite;
          }
          .github-link:hover {
            transform: scale(1.1) rotate(5deg);
          }
        `}
      </style>
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-8">
          <div className="logo-container inline-block rounded-full p-1 border-2">
            <img
              src="/Logo1.png"
              alt="CryptoState Logo"
              className="-10 h-10 rounded-full shadow-md border border-amber-400"
            />
          </div>
        </div>
        <p className="text-lg font-medium font-[Inter] mb-6">
          CryptoState © 2025 — Todos los derechos reservados. Datos de
          criptomonedas en tiempo real, análisis de mercado y noticias clave
          para ayudarte a tomar decisiones informadas. Actualizaciones
          constantes, interfaz intuitiva y compromiso con la precisión.
        </p>
        <div className="flex justify-center mb-8">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link text-amber-400 hover:text-amber-300 transition-all duration-200"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.698-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.071 1.532 1.03 1.532 1.03.892 1.529 2.341 1.087 2.91.831.092-.647.35-1.087.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.394.1 2.646.64.698 1.028 1.591 1.028 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.577.688.479C19.137 20.164 22 16.42 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>
        </div>
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm italic font-[Inter] text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            <strong>Disclaimer</strong>: The content on our website and related
            platforms is for general information only, sourced externally. We
            make no guarantees about its accuracy or timeliness. It is not
            financial, legal, or other advice. Use it at your own risk, and
            conduct your own research before acting. Trading is high-risk;
            consult a financial advisor. Our content is not an offer or
            invitation to act.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
