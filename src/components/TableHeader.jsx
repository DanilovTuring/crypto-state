import React from "react";

const TableHeader = () => {
  return (
    <div
      className="flex w-[900px] py-2 px-3 bg-white border-b border-gray-200 text-gray-500 font-semibold text-sm sm:w-full sm:overflow-x-auto"
      role="row"
      aria-label="Encabezado de tabla de criptomonedas"
    >
      {/* Columna Ranking (Fija) */}
      <div className="w-[60px] text-left sticky left-0 bg-white z-20">
        <span>Nº</span>
      </div>
      {/* Columna Moneda (Fija) */}
      <div className="w-[140px] text-left sticky left-[60px] bg-white z-20">
        <span>Moneda</span>
      </div>
      {/* Columnas desplazables */}
      <div className="flex sm:min-w-[600px]">
        {/* Columna Precio (Movida 8px a la izquierda en móvil) */}
        <div className="w-[140px] text-right sm:-ml-2">
          <span>Precio $US</span>
        </div>
        {/* Columna Cambio 24h */}
        <div className="w-[140px] text-right">
          <span>Cambio 24h</span>
        </div>
        {/* Columna Capitalización */}
        <div className="w-[140px] text-right">
          <span>Capitalización</span>
        </div>
        {/* Columna Acción */}
        <div className="w-[120px] text-right">
          <span>Acción</span>
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
