import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { API_URL } from "~/config";

const AddNews = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(API_URL + "/news/add", {
        title,
        desc,
      });
      setSuccess(response.data.msg);
      setTimeout(() => {
        navigate("/news");
      }, 1000);
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

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add News</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-600 mt-4">{success}</p>}
    </div>
  );
};

export default AddNews;
