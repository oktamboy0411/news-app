import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import type { Route } from "./+types/news_item";
import { API_URL } from "~/config";

export async function loader({ params }: Route.LoaderArgs) {
  const newsId = params.newsId;
  return { newsId };
}

function NewsItem({ loaderData }: Route.ComponentProps) {
  const [news, setNews] = useState<{
    _id: string;
    title: string;
    desc: string;
    createdAt: string;
    updatedAt: string;
  } | null>(null);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const newsId = loaderData.newsId;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(API_URL + `/news/get/${newsId}`);
        setNews(res.data.data);
        setTitle(res.data.data.title);
        setDesc(res.data.data.desc);
      } catch (error: any) {
        setError(
          error?.response.data.message ||
            error.response.data.msg ||
            "Serverdan xatolik qaytdi."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [newsId]);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(API_URL + `/news/delete/${newsId}`);
      setMsg(res.data.msg);
      setTimeout(() => navigate("/news"), 1000);
    } catch (error: any) {
      setError(
        error?.response.data.message ||
          error.response.data.msg ||
          "Serverdan xatolik qaytdi."
      );
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(API_URL + `/news/update/${newsId}`, {
        title,
        desc,
      });

      setMsg(res.data.msg);
      setNews({
        ...news!,
        title,
        desc,
      });
    } catch (error: any) {
      setError(
        error?.response.data.message ||
          error.response.data.msg ||
          "Serverdan xatolik qaytdi."
      );
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!news) return <div className="p-4">No news data.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-blue-600">Edit News</h1>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full border p-2 rounded"
            rows={4}
          ></textarea>
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          💾 Update
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          🗑️ Delete
        </button>
      </div>

      {msg && <p className="text-green-600 mt-4">{msg}</p>}
    </div>
  );
}

export default NewsItem;
