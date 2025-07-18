import React from "react";

function Navbar() {
    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo*/}
                    <div className="flex items-center">
                        <span className="text-xl font-semibold text-gray-900 dark:text-white" >
                            CryptoState
                        </span>
                    </div>
                    {/*Menú*/}
                </div>
            </div>
        </nav>
    );

}

export default Navbar