import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-white flex items-center justify-center">
      <div className="text-center p-6 rounded-xl shadow-xl bg-white max-w-lg">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome to Our Website
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          This is the home page. Explore our website to learn more about what we
          offer.
        </p>
        <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
          Get Started
        </button>
      </div>
    </div>
  );
}
