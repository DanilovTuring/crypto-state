import React, { useEffect, useState, useMemo } from "react";
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
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRedditNews = async () => {
      setLoading(true);
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
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        console.error("Error al obtener noticias de Reddit:", err);
        setError("No se pudieron cargar las noticias.");
      } finally {
        setLoading(false);
      }
    };

    fetchRedditNews();
  }, []);

  const sortedNews = useMemo(() => {
    return [...news].sort((a, b) =>
      sortBy === "score" ? b.score - a.score : a.title.localeCompare(b.title)
    );
  }, [news, sortBy]);

  const chartData = {
    labels: sortedNews.map((_, index) => `Noticia ${index + 1}`),
    datasets: [
      {
        label: "Votos",
        data: sortedNews.map((item) => item.score),
        backgroundColor: darkMode
          ? "rgba(29, 161, 242, 0.6)"
          : "rgba(29, 161, 242, 0.8)",
        borderColor: darkMode ? "#1DA1F2" : "#1A91DA",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: darkMode ? "#E2E8F0" : "#1A202C",
          font: { family: "Inter", size: 12 },
        },
      },
      title: {
        display: true,
        text: "Votos por Noticia",
        color: darkMode ? "#E2E8F0" : "#1A202C",
        font: { family: "Inter", size: 16, weight: "600" },
      },
      tooltip: {
        backgroundColor: darkMode ? "#2D3748" : "#FFFFFF",
        titleColor: darkMode ? "#E2E8F0" : "#1A202C",
        bodyColor: darkMode ? "#E2E8F0" : "#1A202C",
      },
    },
    scales: {
      x: {
        ticks: { color: darkMode ? "#E2E8F0" : "#1A202C" },
        grid: { color: darkMode ? "#4A5568" : "#E2E8F0" },
      },
      y: {
        ticks: { color: darkMode ? "#E2E8F0" : "#1A202C" },
        grid: { color: darkMode ? "#4A5568" : "#E2E8F0" },
        beginAtZero: true,
      },
    },
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    setSuccess("Enlace copiado al portapapeles");
    setTimeout(() => setSuccess(null), 3000);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      } py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300`}
    >
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.3s ease-out;
          }
          .skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: skeleton-loading 1.5s infinite;
          }
          @keyframes skeleton-loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}
      </style>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1
            id="newspage"
            className="text-3xl sm:text-4xl font-bold text-center font-[Inter]"
          >
            Crypto News Reddit
          </h1>
          <button
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            onClick={toggleDarkMode}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {darkMode ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              )}
            </svg>
          </button>
        </div>
        {success && (
          <div className="fixed top-4 right-4 bg-green-500 text-white p-3 rounded-lg shadow-lg animate-fade-in z-10">
            <svg
              className="w-5 h-5 inline mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            {success}
          </div>
        )}
        {error && (
          <div className="fixed top-4 right-4 bg-red-500 text-white p-3 rounded-lg shadow-lg animate-fade-in z-10">
            <svg
              className="w-5 h-5 inline mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            {error}
          </div>
        )}
        <div className="flex justify-center mb-8 space-x-4">
          <button
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors duration-200 ${
              sortBy === "score"
                ? "bg-blue-500 text-white"
                : darkMode
                ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            }`}
            onClick={() => setSortBy("score")}
          >
            Ordenar por Votos
          </button>
          <button
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors duration-200 ${
              sortBy === "title"
                ? "bg-blue-500 text-white"
                : darkMode
                ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            }`}
            onClick={() => setSortBy("title")}
          >
            Ordenar por Título
          </button>
        </div>
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 font-[Inter]">
            Estadísticas de Votos
          </h2>
          <div className="h-80">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array(6)
                .fill()
                .map((_, index) => (
                  <li
                    key={index}
                    className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
                  >
                    <div className="h-6 w-3/4 mb-4 skeleton rounded"></div>
                    <div className="h-4 w-1/2 mb-2 skeleton rounded"></div>
                    <div className="h-4 w-1/4 mb-4 skeleton rounded"></div>
                    <div className="h-8 w-32 skeleton rounded"></div>
                  </li>
                ))
            : sortedNews.map((item, index) => (
                <li
                  key={index}
                  className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-blue-500 hover:text-blue-400 transition-colors duration-200"
                  >
                    {item.title}
                  </a>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-[Inter]">
                    <span className="font-medium">Autor:</span> {item.author} |{" "}
                    <span className="font-medium">Votos:</span> {item.score}
                  </p>
                  <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full font-semibold text-sm hover:bg-blue-600 transition-colors duration-200 flex items-center"
                    onClick={() => copyToClipboard(item.url)}
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
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
