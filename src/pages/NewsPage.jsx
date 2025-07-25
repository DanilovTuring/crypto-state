import React, { useEffect, useState, useMemo } from "react";

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCryptoNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://min-api.cryptocompare.com/data/v2/news/?lang=EN"
        );
        if (!response.ok) throw new Error("Error en la respuesta");

        const data = await response.json();

        const posts = data.Data.map((item) => ({
          title: item.title || "Sin título",
          url: item.url || "#",
          author: item.source || "Unknown",
          description: item.body || "No description available",
          publishedAt: item.published_on
            ? new Date(item.published_on * 1000).toLocaleDateString()
            : "Unknown date",
          thumbnail: item.imageurl || "https://via.placeholder.com/150",
        }));

        setNews(posts);
        setSuccess("Noticias cargadas correctamente");
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        console.error("Error al obtener noticias:", err);
        setError(
          "No se pudieron cargar las noticias. Por favor, intenta de nuevo más tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoNews();
  }, []);

  const filteredAndSortedNews = useMemo(() => {
    return [...news]
      .filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [news, searchQuery]);

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
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-600 to-purple-800 dark:from-purple-700 dark:to-purple-900 text-gray-200 dark:text-gray-100 transition-colors duration-300 relative`}
    >
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          div {
            animation: gradientShift 15s ease infinite;
            background-size: 200% 200%;
          }
          .crypto-overlay::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7));
            z-index: 0;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.3s ease-out;
          }
          .skeleton {
            background: linear-gradient(90deg, rgba(255, 255, 255, 0.2) 25%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.2) 75%);
            background-size: 200% 100%;
            animation: skeleton-loading 1.5s infinite;
          }
          @keyframes skeleton-loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          .news-card:hover .news-image {
            transform: scale(1.05);
            transition: transform 0.3s ease-in-out;
          }
          .news-image {
            transition: transform 0.3s ease-in-out;
          }
        `}
      </style>
      <div className="crypto-overlay::before" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between mb-8 gap-4 items-center">
          <h1
            id="newspage"
            className="text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-tight text-center animate-fade-in-up"
          >
            CryptoNews
          </h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="🔍 Buscar noticias..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-full bg-white/20 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-500"
            />
            <button
              className="p-2 rounded-full bg-white/20 dark:bg-gray-900/20 text-gray-200 hover:bg-amber-400/30 dark:hover:bg-amber-500/30 transition-colors"
              onClick={toggleDarkMode}
              aria-label={
                darkMode ? "Desactivar modo oscuro" : "Activar modo oscuro"
              }
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
        </div>
        {success && (
          <div className="fixed top-4 right-4 bg-green-500 text-white p-3 rounded-lg shadow-lg animate-fade-in z-20">
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
          <div className="fixed top-4 right-4 bg-red-500 text-white p-3 rounded-lg shadow-lg animate-fade-in z-20">
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
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array(6)
              .fill()
              .map((_, index) => (
                <li
                  key={index}
                  className="p-6 bg-white/90 dark:bg-gray-900/90 rounded-lg shadow-sm backdrop-blur-md animate-fade-in-up"
                >
                  <div className="h-40 w-full mb-4 skeleton rounded"></div>
                  <div className="h-6 w-3/4 mb-4 skeleton rounded"></div>
                  <div className="h-4 w-1/2 mb-2 skeleton rounded"></div>
                  <div className="h-4 w-1/4 mb-4 skeleton rounded"></div>
                  <div className="h-8 w-32 skeleton rounded"></div>
                </li>
              ))
          ) : filteredAndSortedNews.length === 0 ? (
            <li className="col-span-full text-center text-gray-200 dark:text-gray-100 text-lg animate-fade-in-up">
              No se encontraron noticias que coincidan con tu búsqueda.
            </li>
          ) : (
            filteredAndSortedNews.map((item, index) => (
              <li
                key={index}
                className="p-6 bg-white/90 dark:bg-gray-900/90 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 backdrop-blur-md news-card animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="overflow-hidden rounded-md mb-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-40 object-cover news-image"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/150")
                    }
                  />
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-amber-400 hover:text-amber-300 dark:hover:text-amber-500 transition-colors duration-200"
                >
                  {item.title}
                </a>
                <p className="text-sm text-gray-200 dark:text-gray-100 mt-2 line-clamp-3">
                  {item.description}
                </p>
                <p className="text-sm text-gray-300 dark:text-gray-200 mt-2">
                  <span className="font-medium">Fuente:</span> {item.author} |{" "}
                  <span className="font-medium">Publicado:</span>{" "}
                  {item.publishedAt}
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-amber-500 text-gray-900 rounded-full font-semibold text-sm hover:bg-amber-400 dark:hover:bg-amber-600 transition-colors duration-200 flex items-center"
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
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default NewsPage;
