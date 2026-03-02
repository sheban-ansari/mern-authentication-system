import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name") || "User";
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true }); // auto redirect to login
  };

  return (
    <nav className="bg-gray-950 border-b border-gray-800 px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-purple-500 tracking-wide">
        AuthSystem
      </h1>

      <div className="relative flex items-center gap-4">
        <Link
          to="/dashboard"
          className="text-gray-300 hover:text-purple-400 transition"
        >
          Dashboard
        </Link>

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <img
            src={`https://ui-avatars.com/api/?name=${name}&background=7F3DFF&color=fff&size=32`}
            alt="avatar"
            className="w-8 h-8 rounded-full border-2 border-purple-500"
          />
          <span className="text-gray-200 font-medium">{name}</span>
        </div>

        {dropdownOpen && (
          <div className="absolute right-0 top-14 bg-gray-900 border border-gray-800 rounded-lg shadow-lg py-2 w-40 z-50">
            <Link
              to="/dashboard"
              className="block px-4 py-2 text-gray-200 hover:bg-gray-800 rounded-md"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-800 rounded-md"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}