import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Home, Info, Mail, PenLine, Menu, X } from "lucide-react";

const Header = ({ scrollToSection }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    // If we're on the home page, scroll to the section
    if (location.pathname === "/") {
      if (sectionId === "home") {
        // Scroll to top for home
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (scrollToSection) {
        scrollToSection(sectionId);
      }
    } else {
      // If we're on another page, navigate to home with the section hash
      navigate("/", { state: { scrollTo: sectionId } });
    }
    setIsMenuOpen(false);
  };

  const handleWriteClick = () => {
    navigate("/write-letter");
    setIsMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      // If already on home, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // If on other page, navigate to home
      navigate("/");
    }
    setIsMenuOpen(false);
  };

  // Check if a section is active
  const isSectionActive = (sectionId) => {
    if (location.pathname !== "/") return false;

    if (sectionId === "home") {
      // Home is active if we're at the top of the page (scrollY < 100)
      return window.scrollY < 100;
    } else {
      // For other sections, check if we're in that section
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
    }
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-bgColor/95 backdrop-blur-sm shadow-sm py-4 px-6 border-b border-gray-800 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a
          href="/"
          onClick={handleLogoClick}
          className="text-3xl font-bold text-primary cursor-pointer hover:text-primary/90 transition"
        >
          Rantify
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => handleNavClick("home")}
            className={`flex items-center gap-2 transition ${
              location.pathname === "/" &&
              !location.state?.scrollTo &&
              window.scrollY < 100
                ? "text-primary"
                : "text-gray-300 hover:text-primary"
            }`}
          >
            <Home size={18} />
            Home
          </button>

          <button
            onClick={() => handleNavClick("about")}
            className={`flex items-center gap-2 transition ${
              location.pathname === "/" &&
              (location.state?.scrollTo === "about" ||
                document.getElementById("about")?.getBoundingClientRect().top <=
                  100)
                ? "text-primary"
                : "text-gray-300 hover:text-primary"
            }`}
          >
            <Info size={18} />
            About
          </button>

          <button
            onClick={() => handleNavClick("contact")}
            className={`flex items-center gap-2 transition ${
              location.pathname === "/" &&
              (location.state?.scrollTo === "contact" ||
                document.getElementById("contact")?.getBoundingClientRect()
                  .top <= 100)
                ? "text-primary"
                : "text-gray-300 hover:text-primary"
            }`}
          >
            <Mail size={18} />
            Contact
          </button>
        </nav>

        {/* Desktop CTA */}
        <button
          onClick={handleWriteClick}
          className={`hidden md:flex items-center gap-2 px-6 py-2 rounded-full font-medium transition ${
            location.pathname === "/write-letter"
              ? "bg-primary text-white"
              : "bg-primary hover:bg-primary/90 text-white"
          }`}
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
                className={`flex items-center gap-2 transition py-2 ${
                  location.pathname === "/" &&
                  !location.state?.scrollTo &&
                  window.scrollY < 100
                    ? "text-primary"
                    : "text-gray-300 hover:text-primary"
                }`}
              >
                <Home size={18} />
                Home
              </button>

              <button
                onClick={() => handleNavClick("about")}
                className={`flex items-center gap-2 transition py-2 ${
                  location.pathname === "/" &&
                  (location.state?.scrollTo === "about" ||
                    document.getElementById("about")?.getBoundingClientRect()
                      .top <= 100)
                    ? "text-primary"
                    : "text-gray-300 hover:text-primary"
                }`}
              >
                <Info size={18} />
                About
              </button>

              <button
                onClick={() => handleNavClick("contact")}
                className={`flex items-center gap-2 transition py-2 ${
                  location.pathname === "/" &&
                  (location.state?.scrollTo === "contact" ||
                    document.getElementById("contact")?.getBoundingClientRect()
                      .top <= 100)
                    ? "text-primary"
                    : "text-gray-300 hover:text-primary"
                }`}
              >
                <Mail size={18} />
                Contact
              </button>

              <button
                onClick={handleWriteClick}
                className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition w-fit ${
                  location.pathname === "/write-letter"
                    ? "bg-primary text-white"
                    : "bg-primary hover:bg-primary/90 text-white"
                }`}
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
