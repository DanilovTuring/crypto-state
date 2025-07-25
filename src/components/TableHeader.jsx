import React from "react";

const TableHeader = () => {
  return (
    <div
      className="flex w-full py-2 px-3 bg-white border-b border-gray-200 text-gray-500 font-semibold text-sm sm:text-base"
      role="row"
      aria-label="Encabezado de tabla de criptomonedas"
    >
      {/* Columna Ranking (Fija)*/}
      <div className="w-[50px] sm:w-[60px] text-left sticky left-0 bg-white z-10">
        <span>Nº</span>
      </div>
      {/* Columna Moneda (Fija) */}
      <div className="w-[120px] sm:w-1/4 text-left sticky left-[50px] sm:left-[60px] bg-white z-10">
        <span>Moneda</span>
      </div>
      {/* Columnas desplazables */}
      <div className="flex flex-1">
        {/* Columna Precio */}
        <div className="w-[80px] sm:w-1/5 text-left sm:text-right">
          <span>Precio</span>
        </div>
        {/* Columna Cambio 24h */}
        <div className="w-[80px] sm:w-1/5 text-left sm:text-right">
          <span>Cambio 24h</span>
        </div>
        {/* Columna Capitalización */}
        <div className="w-[80px] sm:w-1/5 text-left sm:text-right">
          <span>Capitalización</span>
        </div>
        {/* Columna Acción */}
        <div className="w-[80px] sm:w-[120px] text-left sm:text-right">
          <span>Acción</span>
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
