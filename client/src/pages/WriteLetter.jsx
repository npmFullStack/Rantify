import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import LetterModal from "@/components/LetterModal";
import { motion } from "framer-motion";
import { letterAPI } from "@/services/api";

const WriteLetter = () => {
  const [letter, setLetter] = useState("");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const textareaRef = useRef(null);

  // Auto-focus textarea when modal opens
  useEffect(() => {
    if (isModalOpen && textareaRef.current) {
      setTimeout(() => {
        textareaRef.current.focus();
      }, 150);
    }
  }, [isModalOpen]);

  const handleSubmit = async () => {
    if (!letter.trim()) {
      setMessage("Please write something before sending...");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await letterAPI.createLetter({
        content: letter,
        author: author.trim() || "Anonymous",
      });

      if (response.data.success) {
        setMessage("Your letter has been sent! ✨");

        setTimeout(() => {
          setLetter("");
          setAuthor("");
          setMessage("");
          setIsModalOpen(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error sending letter:", error);
      setMessage(
        error.response?.data?.message ||
          "Failed to send letter. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-bgColor min-h-screen text-white">
      <Header />

      <main className="min-h-screen flex items-center justify-center px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-xl text-center flex flex-col items-center gap-6"
        >
          {/* Decorative flourish */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <span style={{ color: "#c9a96e", fontSize: "22px" }}>✦</span>
            <span
              style={{
                display: "block",
                width: "60px",
                height: "1px",
                background: "linear-gradient(to right, transparent, #c9a96e)",
              }}
            />
            <span
              style={{
                color: "#c9a96e",
                fontSize: "13px",
                letterSpacing: "0.25em",
                fontFamily: "Georgia, serif",
              }}
            >
              EST. WITH LOVE
            </span>
            <span
              style={{
                display: "block",
                width: "60px",
                height: "1px",
                background: "linear-gradient(to left, transparent, #c9a96e)",
              }}
            />
            <span style={{ color: "#c9a96e", fontSize: "22px" }}>✦</span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1
              className="font-bold leading-tight"
              style={{
                fontSize: "clamp(2.2rem, 7vw, 3.6rem)",
                fontFamily:
                  "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
                letterSpacing: "-0.01em",
              }}
            >
              Write a{" "}
              <span className="text-primary" style={{ fontStyle: "italic" }}>
                Letter
              </span>
            </h1>
            <p
              className="mt-3 text-gray-400"
              style={{
                fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)",
                fontFamily: "Georgia, 'Times New Roman', serif",
                letterSpacing: "0.02em",
                lineHeight: 1.7,
              }}
            >
              Pour your heart out.{" "}
              <span style={{ color: "#a89070" }}>Your words matter.</span>
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            onClick={() => setIsModalOpen(true)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="bg-primary hover:bg-primary/90 text-white font-medium transition-all"
            style={{
              padding: "14px 40px",
              borderRadius: "999px",
              fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
              fontFamily: "'Palatino Linotype', Georgia, serif",
              letterSpacing: "0.04em",
              boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
            }}
          >
            Open Letter Paper
          </motion.button>

          {/* Status message */}
          {message && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-${message.includes("✨") ? "primary" : "red-400"}`}
              style={{ fontFamily: "Georgia, serif", fontSize: "0.95rem" }}
            >
              {message}
            </motion.p>
          )}
        </motion.div>
      </main>

      {/* Letter Modal */}
      <LetterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="relative" style={{ minHeight: "420px" }}>
          {/* Header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "20px",
              paddingBottom: "14px",
              borderBottom: "1px solid rgba(100,60,10,0.25)",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(1.3rem, 4vw, 1.6rem)",
                fontFamily:
                  "'Palatino Linotype', 'Book Antiqua', Georgia, serif",
                color: "#2c1a08",
                fontStyle: "italic",
                fontWeight: "600",
                letterSpacing: "0.02em",
              }}
            >
              Dear Reader...
            </h2>
          </div>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            placeholder="Write your letter here..."
            disabled={isLoading}
            style={{
              width: "100%",
              minHeight: "220px",
              background: "transparent",
              border: "none",
              resize: "none",
              color: "#2c1a08",
              fontSize: "clamp(0.95rem, 2.5vw, 1.05rem)",
              lineHeight: "1.85",
              fontFamily: "'Palatino Linotype', 'Book Antiqua', Georgia, serif",
              outline: "none",
              WebkitTextFillColor: "#2c1a08",
              caretColor: "#6b3a12",
              position: "relative",
              zIndex: 10,
              boxSizing: "border-box",
            }}
            className="placeholder-[#b89a7a]"
          />

          {/* Author row */}
          <div
            style={{
              marginTop: "20px",
              paddingTop: "14px",
              borderTop: "1px solid rgba(100,60,10,0.25)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            <span
              style={{
                color: "#2c1a08",
                fontFamily: "'Palatino Linotype', Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(0.85rem, 2vw, 1rem)",
                whiteSpace: "nowrap",
              }}
            >
              Sincerely yours,
            </span>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name (optional)"
              disabled={isLoading}
              style={{
                background: "transparent",
                border: "none",
                borderBottom: "1px solid rgba(100,60,10,0.35)",
                color: "#2c1a08",
                fontSize: "clamp(0.85rem, 2vw, 1rem)",
                fontFamily: "'Palatino Linotype', Georgia, serif",
                outline: "none",
                width: "clamp(120px, 30%, 170px)",
                WebkitTextFillColor: "#2c1a08",
                paddingBottom: "2px",
                zIndex: 10,
                position: "relative",
              }}
            />
          </div>

          {/* Send button */}
          <div style={{ marginTop: "22px", textAlign: "center" }}>
            <motion.button
              onClick={handleSubmit}
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.04 }}
              whileTap={{ scale: isLoading ? 1 : 0.96 }}
              style={{
                background: isLoading
                  ? "linear-gradient(135deg, #8b6b4d, #6b4f3a)"
                  : "linear-gradient(135deg, #8b6b4d, #6b4f3a)",
                color: "#f5e6c8",
                border: "none",
                padding: "10px 36px",
                borderRadius: "999px",
                cursor: isLoading ? "not-allowed" : "pointer",
                fontFamily: "'Palatino Linotype', Georgia, serif",
                fontSize: "clamp(0.9rem, 2vw, 1rem)",
                letterSpacing: "0.05em",
                boxShadow: "0 4px 18px rgba(60,30,10,0.3)",
                position: "relative",
                zIndex: 10,
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? "Sending..." : "Send Letter"}
            </motion.button>
          </div>
        </div>
      </LetterModal>
    </div>
  );
};

export default WriteLetter;
