import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

//Rd rpd dsp d sbr dnl

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [sortBy, setSortBy] = useState("score");

  useEffect(() => {
    const fetchRedditNews = async () => {
      try {
        const response = await fetch(
          "https://www.reddit.com/r/CryptoCurrency/.json"
        );
        if (!response.ok) throw new Error("Error en la respuesta");

        const data = await response.json();
        const posts = data.data.children.map((post) => ({
          title: post.data.title,
          url: "https://reddit.com" + post.data.permalink,
          author: post.data.author,
          score: post.data.score,
        }));

        setNews(posts);
        setSuccess("Noticias cargadas correctamente");
        setTimeout(() => setSuccess(null), 3000); // Oculta el mensaje después de 3 segundos
      } catch (err) {
        console.error("Error al obtener noticias de Reddit:", err);
        setError("No se pudieron cargar las noticias.");
      }
    };

    fetchRedditNews();
  }, []);

  const sortedNews = [...news].sort((a, b) =>
    sortBy === "score" ? b.score - a.score : a.title.localeCompare(b.title)
  );

  const chartData = {
    labels: sortedNews.map((_, index) => `Noticia ${index + 1}`),
    datasets: [
      {
        label: "Votos",
        data: sortedNews.map((item) => item.score),
        backgroundColor: "#FFD700",
        borderColor: "#6B46C1",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "#4B0082", font: { family: "Inter" } } },
      title: {
        display: true,
        text: "Votos por Noticia",
        color: "#4B0082",
        font: { size: 18, family: "Playfair Display" },
      },
    },
    scales: {
      x: { ticks: { color: "#4B0082" }, grid: { color: "#6B46C1" } },
      y: {
        ticks: { color: "#4B0082" },
        grid: { color: "#6B46C1" },
        beginAtZero: true,
      },
    },
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    setSuccess("Enlace copiado al portapapeles");
    setTimeout(() => setSuccess(null), 3000);
  };

  return (
    <div
      id="newspage"
      className="min-h-screen bg-white py-12 px-4 sm:px-6 md:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {success && (
          <p className="text-center text-yellow-400 bg-purple-900/90 p-4 rounded-lg shadow-md mb-8 animate-slide-in">
            {success}
          </p>
        )}
        {error && (
          <p className="text-center text-red-600 bg-red-100/90 p-4 rounded-lg shadow-md mb-8 animate-slide-in">
            {error}
          </p>
        )}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center text-purple-900 mb-10 drop-shadow-xl font-[Playfair Display] animate-fade-in">
          <span className="text-yellow-400">Crypto</span> News
        </h1>
        <div className="flex justify-center mb-10 space-x-4">
          <button
            className={`px-4 py-2 rounded-full font-semibold text-white transition-colors duration-300 ${
              sortBy === "score"
                ? "bg-yellow-400 text-purple-900"
                : "bg-purple-700 hover:bg-purple-600"
            }`}
            onClick={() => setSortBy("score")}
          >
            Ordenar por Votos
          </button>
          <button
            className={`px-4 py-2 rounded-full font-semibold text-white transition-colors duration-300 ${
              sortBy === "title"
                ? "bg-yellow-400 text-purple-900"
                : "bg-purple-700 hover:bg-purple-600"
            }`}
            onClick={() => setSortBy("title")}
          >
            Ordenar por Título
          </button>
        </div>
        <div className="mb-12 bg-purple-50/90 backdrop-blur-lg rounded-xl p-6 shadow-xl animate-slide-in">
          <h2 className="text-2xl font-bold text-purple-900 mb-4 font-[Playfair Display]">
            Estadísticas de Votos
          </h2>
          <div className="h-64">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
        <ul className="space-y-6">
          {sortedNews.map((item, index) => (
            <li
              key={index}
              className="p-6 bg-purple-50/90 backdrop-blur-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-300/50 animate-slide-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-semibold text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
              >
                {item.title}
              </a>
              <p className="text-sm text-purple-900 mt-2 font-[Inter]">
                <span className="font-medium text-yellow-400">Autor:</span>{" "}
                {item.author} |{" "}
                <span className="font-medium text-yellow-400">Votos:</span>{" "}
                {item.score}
              </p>
              <button
                className="mt-4 px-4 py-2 bg-yellow-400 text-purple-900 rounded-full font-semibold hover:bg-yellow-300 transition-colors duration-200"
                onClick={() => copyToClipboard(item.url)}
              >
                Copiar Enlace
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewsPage;
