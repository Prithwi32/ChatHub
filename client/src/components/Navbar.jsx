import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white text-black shadow-lg fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            ChatHub
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/features">Features</NavItem>
            <NavItem to="/chooseus">Choose Us</NavItem>
            <NavItem to="/about">About</NavItem>
            <NavItem to="/cta">CTA</NavItem>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#4ABEBD]">
          <NavItem to="/" onClick={() => setIsOpen(false)}>Home</NavItem>
          <NavItem to="/features" onClick={() => setIsOpen(false)}>Features</NavItem>
          <NavItem to="/chooseus" onClick={() => setIsOpen(false)}>Choose US</NavItem>
          <NavItem to="/about" onClick={() => setIsOpen(false)}>About</NavItem>
          <NavItem to="/cta" onClick={() => setIsOpen(false)}>CTA</NavItem>
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
