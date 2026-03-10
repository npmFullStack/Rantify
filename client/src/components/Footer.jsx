import React from "react";
import { Heart, Github, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-bgColor border-t border-gray-800 py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-3xl font-bold text-primary inline-block mb-4">
              Rantify
            </Link>
            <p className="text-gray-400 max-w-md">
              A safe space to release your thoughts, share your stories, and connect with others who understand.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/read-letter" className="text-gray-400 hover:text-primary transition">
                  Read Letters
                </Link>
              </li>
              <li>
                <Link to="/write-letter" className="text-gray-400 hover:text-primary transition">
                  Write Letter
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Developer */}
          <div>
            <h3 className="text-white font-semibold mb-4">Developer</h3>
            <p className="text-gray-400 mb-2">NorDev</p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary transition"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary transition"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary transition"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} Rantify. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-1">
            Made with <Heart size={16} className="text-primary" /> by NorDev
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;