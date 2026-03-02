import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const cards = [
  { title: "Profile", description: "Manage your account information." },
  { title: "Security", description: "Update password and security settings." },
  { title: "Settings", description: "Customize your preferences." },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");

  // Protected route: redirect to login if not authenticated
  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  if (!token) return null; // prevent flashing

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">
      <Navbar />

      <main className="p-10">
        <h2 className="text-4xl font-bold mb-8">
          Welcome back, <span className="text-purple-500">{name}</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-gray-900 border border-gray-800 p-6 rounded-xl transform hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-400 text-sm">{card.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}