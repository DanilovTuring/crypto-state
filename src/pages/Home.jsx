import React from 'react';

function Home() {
    return (
        <section className="px-4 py-12 md:py-20 bg-white dark:bg-[--color--primary-dark] text-gray-900 dark:text-white">
            <div className="max-w-4x2 mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6"> Bienvenido a CryptoState</h1>
                <p>
                    Plataforma de rastreo de criptomonedas
                </p>
                <a href="#">
                    Comenzar
                </a>
            </div>
        </section>
    );
}

export default Home;