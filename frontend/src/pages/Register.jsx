import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      // Auto login after registration
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);

      navigate("/dashboard", { replace: true });
    } catch (err) {
      alert("User already exists");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 flex items-center justify-center font-sans">
      <div className="bg-gray-900/70 backdrop-blur-md border border-gray-800 p-10 rounded-2xl w-96 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-8 text-center tracking-wide">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full text-white bg-blue-600 hover:bg-blue-800 py-3 rounded-lg font-semibold transition">
            Register
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-400 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}