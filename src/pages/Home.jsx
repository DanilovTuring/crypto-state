import React from 'react';

function Home() {
    return (
        <section className="px-4 py-12 md:py-20 bg-blue dark:bg-[--color--primary-dark] text-gray-900 dark:text-white">
            <div className="max-w-4x1 mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6"> Bienvenido a CryptoState</h1>
                <p className="text-lg md:text-xl mb-8">
                    Plataforma de rastreo de criptomonedas
                </p>
                <a href="#" className="inline-block px-6 py-3 bg[--color--primary] text-white font-semibold rounded hover:bg-blue-500 transition-colors">
                    Comenzar
                </a>
            </div>
        </section>
    );
}

export default Home;