import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import LetterModal from "@/components/LetterModal";
import { motion } from "framer-motion";
import pen from "@/assets/images/pen.png";

const WriteLetter = () => {
  const [letter, setLetter] = useState("");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("Start writing your heartfelt letter below...");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [penPos, setPenPos] = useState({ x: 0, y: 0 });
  
  const textareaRef = useRef(null);

  // Auto-focus textarea when modal opens
  useEffect(() => {
    if (isModalOpen && textareaRef.current) {
      setTimeout(() => {
        textareaRef.current.focus();
      }, 100);
    }
  }, [isModalOpen]);

  // Track pen position relative to cursor
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea || !isModalOpen) return;

    const updatePen = () => {
      const selectionStart = textarea.selectionStart;
      const textBeforeCursor = textarea.value.substr(0, selectionStart);
      const lines = textBeforeCursor.split("\n");
      const lineHeight = 28; // line height in pixels
      const charWidth = 8; // approx char width in pixels

      // Calculate position
      const x = charWidth * lines[lines.length - 1].length;
      const y = (lines.length - 1) * lineHeight;

      setPenPos({ x, y });
    };

    updatePen();

    textarea.addEventListener("keyup", updatePen);
    textarea.addEventListener("click", updatePen);
    textarea.addEventListener("input", updatePen);

    return () => {
      textarea.removeEventListener("keyup", updatePen);
      textarea.removeEventListener("click", updatePen);
      textarea.removeEventListener("input", updatePen);
    };
  }, [letter, isModalOpen]);

  const handleSubmit = () => {
    if (!letter.trim()) {
      setMessage("Please write something before sending...");
      return;
    }
    
    console.log({ letter, author });
    setMessage("Your letter has been sent! ✨");
    
    // Reset form
    setTimeout(() => {
      setLetter("");
      setAuthor("");
      setMessage("Start writing your heartfelt letter below...");
      setIsModalOpen(false);
    }, 2000);
  };

  return (
    <div className="bg-bgColor min-h-screen text-white">
      <Header />

      <main className="container mx-auto px-6 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Write a{' '}
            <span className="text-primary">Letter</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Pour your heart out. Your words matter.
          </p>

          <motion.button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-medium text-lg transition transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Open Letter Paper
          </motion.button>

          {/* Preview of recent message */}
          {message && message !== "Start writing your heartfelt letter below..." && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-primary"
            >
              {message}
            </motion.p>
          )}
        </motion.div>
      </main>

      {/* Letter Modal */}
      <LetterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="relative min-h-[500px]">
          {/* Pen following cursor - only visible on desktop */}
          <motion.img
            src={pen}
            alt="pen"
            className="hidden md:block absolute w-8 pointer-events-none transform -rotate-12"
            style={{
              left: `${penPos.x}px`,
              top: `${penPos.y - 10}px`,
              transition: 'left 0.05s ease, top 0.05s ease',
              zIndex: 20
            }}
          />

          {/* Letter Content */}
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-[#3e2e1f] border-b border-[#d4b48c] pb-2">
              Dear Reader...
            </h2>

            {/* Textarea for letter - Fixed z-index and pointer events */}
            <textarea
              ref={textareaRef}
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
              placeholder="Write your letter here..."
              className="w-full h-64 bg-transparent border-none resize-none text-[#3e2e1f] text-lg leading-relaxed focus:outline-none font-serif placeholder-[#b89a7a] relative z-10"
              style={{
                background: 'transparent',
                WebkitAppearance: 'none',
                WebkitTextFillColor: '#3e2e1f',
                opacity: 1,
                position: 'relative',
                zIndex: 10
              }}
            />

            {/* Author section */}
            <div className="mt-8 flex items-center justify-end gap-4 border-t border-[#d4b48c] pt-4">
              <span className="text-[#3e2e1f] font-serif italic">
                Sincerely yours,
              </span>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Your name (optional)"
                className="bg-transparent border-b border-[#d4b48c] text-[#3e2e1f] text-lg focus:outline-none w-40 font-serif placeholder-[#b89a7a] relative z-10"
                style={{
                  background: 'transparent',
                  WebkitAppearance: 'none',
                  WebkitTextFillColor: '#3e2e1f'
                }}
              />
            </div>

            {/* Send button */}
            <div className="mt-6 text-center">
              <button
                onClick={handleSubmit}
                className="bg-[#8b6b4d] hover:bg-[#6b4f3a] text-white px-8 py-2 rounded-full transition font-serif"
              >
                Send Letter
              </button>
            </div>
          </div>
        </div>
      </LetterModal>
    </div>
  );
};

export default WriteLetter;