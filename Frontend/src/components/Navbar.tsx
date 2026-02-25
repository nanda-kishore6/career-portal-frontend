import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useState } from "react";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
    
    {/* Logo */}
    <button
      onClick={() => navigate("/opportunities")}
      className="text-lg font-extrabold text-indigo-600"
    >
      CareerPortal
    </button>

    {/* Desktop Links */}
    <div className="hidden sm:flex items-center gap-6 text-sm font-medium">
      <Link to="/opportunities">Opportunities</Link>

      {user?.role === "STUDENT" && (
        <>
          <Link to="/applications">My Applications</Link>
          <Link to="/bookmarks">My Bookmarks</Link>
        </>
      )}

      {user?.role === "ADMIN" && (
        <Link to="/admin/create-opportunity">Create Opportunity</Link>
      )}

      <button onClick={logout} className="text-red-500">
        Logout
      </button>
    </div>

    {/* Hamburger Icon (Mobile Only) */}
    <button
      className="sm:hidden text-2xl"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      ☰
    </button>
  </div>

  {/* Mobile Menu */}
  {menuOpen && (
    <div className="sm:hidden px-6 pb-4 flex flex-col gap-4 text-sm font-medium">
      <Link to="/opportunities" onClick={() => setMenuOpen(false)}>
        Opportunities
      </Link>

      {user?.role === "STUDENT" && (
        <>
          <Link to="/applications" onClick={() => setMenuOpen(false)}>
            My Applications
          </Link>
          <Link to="/bookmarks" onClick={() => setMenuOpen(false)}>
            My Bookmarks
          </Link>
        </>
      )}

      {user?.role === "ADMIN" && (
        <Link
          to="/admin/create-opportunity"
          onClick={() => setMenuOpen(false)}
        >
          Create Opportunity
        </Link>
      )}

      <button
        onClick={() => {
          logout();
          setMenuOpen(false);
        }}
        className="text-red-500 text-left"
      >
        Logout
      </button>
    </div>
  )}
</nav>
  );
}

export default Navbar;
