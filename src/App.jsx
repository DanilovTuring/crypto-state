import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CryptoStatus from "./components/CryptoStatus";
import NewsPage from "./pages/NewsPage";
import Footer from "./pages/Footer";

function App() {
  return (
    <div className="">
      <Navbar />
      <main>
        <h1 className="text-4x1 font-bold"></h1>
        <Home />
        <CryptoStatus />
        <NewsPage />
        <Footer />
      </main>
    </div>
  );
}

export default App;
