import React from "react";

function Navbar() {
    return (
        <nav className="bg-[--color-primary-light] dark:bg-[--color-primary-dark] shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo*/}
                    <div className="flex items-center">
                       <span className="text-xl font-semibold text-[--color-primary-dark] dark:text-white">
                            CryptoState
                        </span>
                    </div>
                    {/*Menú*/}
                    <div className="hidden md:flex items-center space-x-6">
                        <a href="#" className="nav-link">
                            Inicio
                        </a>
                        <a href="#" className="nav-link">
                            Mercados
                        </a>
                        <a href="#" className="nav-link">
                            Portafolio
                        </a>
                        <a href="#" className="nav-link">
                            Contacto
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );

}

export default Navbar