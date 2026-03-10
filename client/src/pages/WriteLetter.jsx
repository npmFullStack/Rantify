import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import letterContent from "@/assets/images/letterContent.png";
import pen from "@/assets/images/pen.png";

const WriteLetter = () => {
  const [letter, setLetter] = useState("");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState(
    "Start writing your heartfelt letter below...",
  );
  const textareaRef = useRef(null);
  const [penPos, setPenPos] = useState({ x: 0, y: 0 });

  // Track pen position relative to cursor
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const updatePen = () => {
      const selectionStart = textarea.selectionStart;
      const textBeforeCursor = textarea.value.substr(0, selectionStart);
      const lines = textBeforeCursor.split("\n");
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10);
      const charWidth = 8; // approx char width

      const x = Math.min(
        charWidth * lines[lines.length - 1].length,
        textarea.clientWidth - 10,
      );
      const y = lines.length * lineHeight - lineHeight;

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
  }, [letter]);

  const handleSubmit = () => {
    if (!letter) return;
    console.log({ letter, author });
    alert("Letter submitted!");
    setLetter("");
    setAuthor("");
    setMessage("Your letter has been sent!");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-bgColor min-h-screen text-white flex flex-col items-center">
      <Header className="pb-8" />

      <main className="relative mt-12 flex flex-col items-center w-full">
        <div className="relative w-[600px] flex flex-col items-center">
          {/* Letter image */}
          <img
            src={letterContent}
            alt="letter content"
            className="w-full drop-shadow-2xl rounded-xl"
          />

          {/* Top message */}
          <div className="absolute top-6 w-full text-center text-gray-800 font-logo text-lg px-6">
            {message}
          </div>

          {/* Textarea overlay */}
          <textarea
            ref={textareaRef}
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write your letter..."
            className="absolute top-16 left-16 w-[520px] h-[300px] bg-transparent resize-none text-gray-800 text-lg leading-relaxed focus:outline-none font-logo p-2"
          />

          {/* Author input */}
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
            className="absolute bottom-14 right-16 w-44 bg-transparent border-b border-gray-700 text-gray-800 text-lg focus:outline-none text-right font-logo"
          />

          {/* "Sincerely Yours" */}
          <div className="absolute bottom-14 left-16 text-gray-800 text-lg font-logo">
            Sincerely yours,
          </div>

          {/* Pen following cursor */}
          <motion.img
            src={pen}
            alt="pen"
            className="absolute w-20 pointer-events-none transform rotate-[-45deg] scale-x-[-1]" // flipped and rotated
            style={{
              left: penPos.x + 16,
              top: penPos.y + 16,
            }}
          />

          {/* Send Letter button below letter */}
          <button
            onClick={handleSubmit}
            className="mt-6 bg-primary hover:bg-primary/90 px-6 py-3 rounded-full font-medium transition"
          >
            Send Letter
          </button>
        </div>
      </main>
    </div>
  );
};

export default WriteLetter;
