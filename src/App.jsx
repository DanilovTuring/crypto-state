import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CryptoStatus from './components/CryptoStatus'
function App() {
  

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 
    text-gray-800 dark:text-gray-100">
        <Navbar />
        <main>
          <h1 className="text-4x1 font-bold">CryptoState</h1>
          <Home />
          <CryptoStatus />
         

        </main>
    </div>

  )
}

export default App
