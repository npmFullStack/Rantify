import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Info, Mail, PenLine } from "lucide-react";

const Header = ({ scrollToSection }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-bgColor shadow-sm py-4 px-6 border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-primary">
          Rantify
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-gray-300">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 hover:text-primary transition"
          >
            <Home size={18} />
            Home
          </button>

          <button
            onClick={() => scrollToSection("about")}
            className="flex items-center gap-2 hover:text-primary transition"
          >
            <Info size={18} />
            About
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="flex items-center gap-2 hover:text-primary transition"
          >
            <Mail size={18} />
            Contact
          </button>
        </nav>

        {/* CTA */}
        <button
          onClick={() => navigate("/write-letter")}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full font-medium transition"
        >
          <PenLine size={18} />
          Write
        </button>
      </div>
    </header>
  );
};

export default Header;
