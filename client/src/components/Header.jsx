import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Info, Mail, PenLine, Menu, X } from "lucide-react";

const Header = ({ scrollToSection }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false); // Close mobile menu after clicking
  };

  const handleWriteClick = () => {
    navigate("/write-letter");
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-bgColor/95 backdrop-blur-sm shadow-sm py-4 px-6 border-b border-gray-800 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-primary">
          Rantify
        </Link>

        {/* Desktop Navigation */}
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

        {/* Desktop CTA */}
        <button
          onClick={() => navigate("/write-letter")}
          className="hidden md:flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full font-medium transition"
        >
          <PenLine size={18} />
          Write
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-300 hover:text-primary transition"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-bgColor/95 backdrop-blur-sm border-b border-gray-800 py-4 px-6 md:hidden">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => handleNavClick("home")}
                className="flex items-center gap-2 text-gray-300 hover:text-primary transition py-2"
              >
                <Home size={18} />
                Home
              </button>

              <button
                onClick={() => handleNavClick("about")}
                className="flex items-center gap-2 text-gray-300 hover:text-primary transition py-2"
              >
                <Info size={18} />
                About
              </button>

              <button
                onClick={() => handleNavClick("contact")}
                className="flex items-center gap-2 text-gray-300 hover:text-primary transition py-2"
              >
                <Mail size={18} />
                Contact
              </button>

              <button
                onClick={handleWriteClick}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full font-medium transition w-fit"
              >
                <PenLine size={18} />
                Write
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;