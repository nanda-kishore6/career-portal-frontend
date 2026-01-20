import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <button
          onClick={() => navigate("/opportunities")}
          className="text-lg font-extrabold text-indigo-600 tracking-tight"

        >
          CareerPortal
        </button>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/opportunities" className="hover:text-indigo-600 transition-colors"
>
            Opportunities
          </Link>

          {user?.role === "STUDENT" && (
            <>
              <Link
                to="/applications"
                className="hover:text-indigo-600"
              >
                My Applications
              </Link>
              <Link
                to="/bookmarks"
                className="hover:text-indigo-600"
              >
                My Bookmarks
              </Link>
            </>
          )}

          {user?.role === "ADMIN" && (
            <Link
              to="/admin/create-opportunity"
              className="hover:text-indigo-600"
            >
              Create Opportunity
            </Link>
          )}

          <button
            onClick={logout}
            className="text-red-500 hover:text-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
