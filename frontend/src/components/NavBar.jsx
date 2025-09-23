import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      {/* Logo / App Name as link */}
      <Link
        to="/"
        className="text-2xl font-bold text-gray-800 tracking-wide hover:text-orange-500 transition-colors duration-200"
      >
        Events
      </Link>

      {/* Login Link */}
      <div>
        <Link
          to="/login"
          className="text-gray-700 font-medium px-4 py-1 rounded-lg hover:bg-orange-100 hover:text-orange-600 transition-all duration-200"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
