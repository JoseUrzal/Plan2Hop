import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white shadow-lg px-8 py-4 flex justify-between items-center">
      {/* Logo / App Name as link */}
      <Link
        to="/"
        className="text-2xl font-bold text-indigo-200 hover:text-orange-400"
      >
        My Events
      </Link>

      {/* Login Link */}
      <div>
        <Link
          to="/login"
          className="text-indigo-200 font-medium px-4 py-1 rounded-lg hover:text-orange-400 transition-all duration-200"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
