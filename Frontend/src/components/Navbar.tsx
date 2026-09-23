import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    checkLogin();

    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");

    setIsLoggedIn(false);
    closeMenu();

    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* LOGO */}
      <Link
        to="/"
        className="navbar-logo"
        onClick={closeMenu}
      >
        Havenly
      </Link>


      {/* DESKTOP LINKS */}
      <div className="navbar-links">

        <Link to="/" onClick={closeMenu}>
          Home
        </Link>

        <Link to="/designers" onClick={closeMenu}>
          Find Designers
        </Link>

        {isLoggedIn && (
          <>
            <Link to="/dashboard" onClick={closeMenu}>
              Dashboard
            </Link>

            <Link to="/milestones" onClick={closeMenu}>
              My Project
            </Link>
          </>
        )}

        <Link to="/about" onClick={closeMenu}>
          About
        </Link>

        <Link to="/how-it-works" onClick={closeMenu}>
          How It Works
        </Link>

      </div>


      {/* DESKTOP ACTIONS */}
      <div className="navbar-actions">

        {isLoggedIn ? (
          <>
            <Link
              to="/dashboard"
              className="login-btn"
            >
              Dashboard
            </Link>

            <button
              type="button"
              className="signup-btn navbar-logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="login-btn"
            >
              Log in
            </Link>

            <Link
              to="/register"
              className="signup-btn"
            >
              Get Started
            </Link>
          </>
        )}

      </div>


      {/* MOBILE MENU BUTTON */}
      <button
        type="button"
        className="navbar-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>


      {/* MOBILE MENU */}
      <div
        className={`navbar-mobile-menu ${
          menuOpen ? "open" : ""
        }`}
      >

        <Link to="/" onClick={closeMenu}>
          Home
        </Link>

        <Link to="/designers" onClick={closeMenu}>
          Find Designers
        </Link>

        {isLoggedIn && (
          <>
            <Link to="/dashboard" onClick={closeMenu}>
              Dashboard
            </Link>

            <Link to="/milestones" onClick={closeMenu}>
              My Project
            </Link>
          </>
        )}

        <Link to="/about" onClick={closeMenu}>
          About
        </Link>

        <Link to="/how-it-works" onClick={closeMenu}>
          How It Works
        </Link>


        <div className="navbar-mobile-actions">

          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="login-btn"
                onClick={closeMenu}
              >
                Dashboard
              </Link>

              <button
                type="button"
                className="signup-btn navbar-logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="login-btn"
                onClick={closeMenu}
              >
                Log in
              </Link>

              <Link
                to="/register"
                className="signup-btn"
                onClick={closeMenu}
              >
                Get Started
              </Link>
            </>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;