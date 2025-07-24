import React from "react";

const TableHeader = () => {
  return (
    <div
      className="flex items-center w-full py-3 px-6 bg-white
    border-b border-gray-200 text-gray-500 font-semibold
    text-base sm:text-lg"
      role="row"
      aria-label="Encabezado de tabla de criptomonedas"
    >
      {/* Columna Ranking */}
      <div className="w-[60px] text-left">
        <span>Nº</span>
      </div>

      {/* Columna Moneda */}
      <div className="w-1/5 min-w-[200px] sm:min-w-[220px]">
        <span>Moneda</span>
      </div>

      {/* Columna Precio */}
      <div className="w-1/5 min-w-[140px] text-right pl-44">
        <span>Precio</span>
      </div>

      {/* Columna Cambio 24h */}
      <div className="w-1/5 min-w-[250px] text-right pl-32">
        <span>Cambio 24h</span>
      </div>

      {/* Columna Capitalización */}
      <div className="w-1/5 min-w-[140px] text-right ml-14">
        <span>Capitalización</span>
      </div>

      {/* Columna Acción */}
      <div className="w-[120px] text-right mr-16">
        <span>Acción</span>
      </div>
    </div>
  );
};

export default TableHeader;
