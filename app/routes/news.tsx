import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { API_URL } from "~/config";

// News type
type NewsItem = {
  _id: string;
  title: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
};

const News = () => {
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const limit = 5;

  const navigate = useNavigate();

  const fetchNews = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(API_URL + "/news/get-all", {
        params: { search, limit, page },
      });

      const resData = response.data;
      if (resData.success) {
        setArticles(resData.data);
        setTotalPage(resData.pagination.totalPage);
      } else {
        setError("Xatolik: maʼlumotlar muvaffaqiyatli kelmadi.");
      }
    } catch (err) {
      setError("Yangiliklarni yuklashda xatolik yuz berdi.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [search, page]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">News</h1>
        <button
          onClick={() => navigate("/news/add")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Add News
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search news..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && articles.length === 0 && (
        <p>No news found for this search.</p>
      )}

      {!loading && !error && articles.length > 0 && (
        <ul className="space-y-4">
          {articles.map((article) => (
            <li
              key={article._id}
              onClick={() => navigate(`/news/${article._id}`)}
              className="border border-gray-200 rounded-lg p-4 shadow-sm cursor-pointer hover:bg-gray-50"
            >
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                {article.title}
              </h2>
              <p className="text-gray-700">{article.desc}</p>
              <p className="text-gray-400 text-sm mt-2">
                {new Date(article.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}

      {!loading && !error && totalPage > 1 && (
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            ⬅️ Previous
          </button>
          <span className="font-semibold">
            Page {page} of {totalPage}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPage))}
            disabled={page === totalPage}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next ➡️
          </button>
        </div>
      )}
    </div>
  );
};

export default News;
