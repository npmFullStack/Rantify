import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const LetterModal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-primary transition z-10"
        >
          <X size={24} />
        </button>

        {/* Letter Paper */}
        <div className="bg-[#f4e4bc] p-8 rounded-lg shadow-2xl border border-[#d4b48c] relative">
          {/* Paper texture overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='%23000000' fill-opacity='0.05'/%3E%3C/svg%3E")`
            }}
          />

          {/* Horizontal lines (like old letter paper) */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-full h-px bg-[#b89a7a] opacity-20"
                style={{ position: 'absolute', top: `${(i + 1) * 40}px`, left: 0 }}
              />
            ))}
          </div>

          {/* Folded corner effect */}
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-[#d4b48c] border-r-transparent" />

          {/* Content */}
          <div className="relative z-10 font-serif text-[#3e2e1f]">
            {children}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LetterModal;