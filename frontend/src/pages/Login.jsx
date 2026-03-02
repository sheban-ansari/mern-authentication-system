import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // show loading while API call
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Save token & name in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);

      // Navigate to dashboard after successful login
      navigate("/dashboard", { replace: true });
    } catch (err) {
      alert("Invalid Credentials");
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 flex items-center justify-center font-sans">
      <div className="bg-gray-900/70 backdrop-blur-md border border-gray-800 p-10 rounded-2xl w-96 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-8 text-center tracking-wide">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold transition ${loading ? "bg-gray-700 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-gray-400 text-sm mt-6 text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-purple-400 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}