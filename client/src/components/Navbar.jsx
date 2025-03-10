import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext"; // Import ThemeContext

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext); // Use ThemeContext
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on component mount
  useEffect(() => {
    const user = localStorage.getItem("user"); // Assume 'user' is stored in localStorage after login
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <nav
      className={`${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      } shadow-lg fixed w-full z-10 top-0`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold">
            ChatHub
          </Link>

          <div className="hidden lg:flex space-x-6">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/features">Features</NavItem>
            <NavItem to="/chooseus">Choose Us</NavItem>
            <NavItem to="/about">About</NavItem>
            <NavItem to="/contact">Contact Us</NavItem>
            <NavItem to="/cta">CTA</NavItem>
            {!isLoggedIn && <NavItem to="/signup">Register</NavItem>}

            {/* Added Dark Mode Button */}
            <button
              onClick={toggleDarkMode}
              className={`relative flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white transition-all duration-500 ${
                darkMode
                  ? "bg-[#fc9f88] hover:bg-[#EA6A49]"
                  : "bg-[#4ABEBD] hover:bg-[#F07B5E]"
              } shadow-md transform hover:scale-105`}
            >
              {darkMode ? (
                <Sun className="w-6 h-6 animate-spin-slow text-yellow-900" />
              ) : (
                <Moon className="w-6 h-6 animate-bounce text-gray-800" />
              )}
            </button>
          </div>

          <button
            className="lg:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div
          className={`${
            darkMode ? "bg-gray-800 text-white" : "bg-[#4ABEBD] text-black"
          } lg:hidden text-center`}
        >
          <NavItem to="/" onClick={() => setIsOpen(false)}>
            Home
          </NavItem>
          <NavItem to="/features" onClick={() => setIsOpen(false)}>
            Features
          </NavItem>
          <NavItem to="/chooseus" onClick={() => setIsOpen(false)}>
            Choose Us
          </NavItem>
          <NavItem to="/about" onClick={() => setIsOpen(false)}>
            About
          </NavItem>
          <NavItem to="/contact" onClick={() => setIsOpen(false)}>
            Contact Us
          </NavItem>
          {!isLoggedIn && (
            <NavItem to="/signup" onClick={() => setIsOpen(false)}>
              Register
            </NavItem>
          )}
          <NavItem to="/cta" onClick={() => setIsOpen(false)}>
            CTA
          </NavItem>

          {/* Dark Mode Button for Mobile */}
          <button
            onClick={toggleDarkMode}
            className={`relative flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white transition-all duration-500 mt-4 ${
              darkMode
                ? "bg-[#fc9f88] hover:bg-[#EA6A49]"
                : "bg-[#4ABEBD] hover:bg-[#F07B5E]"
            } shadow-md transform hover:scale-105`}
          >
            {darkMode ? (
              <Sun className="w-6 h-6 animate-spin-slow text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 animate-bounce text-gray-800" />
            )}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      )}
    </nav>
  );
}

// Reusable NavItem Component
function NavItem({ to, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block px-4 py-2 text-lg hover:bg-[#4ABEBD] rounded-full transition"
    >
      {children}
    </Link>
  );
}
