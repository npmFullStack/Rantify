import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import LetterModal from "@/components/LetterModal";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { letterAPI } from "@/services/api";

import jar from "@/assets/images/jar.png";
import letter from "@/assets/images/letter.png";
import inkPen from "@/assets/images/inkandpen.png";

const ReadLetter = () => {
  const [jarOpen, setJarOpen] = useState(false);
  const [letterDropped, setLetterDropped] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [currentLetter, setCurrentLetter] = useState(null);
  const [error, setError] = useState(null);
  const [recentLetterIds, setRecentLetterIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Load recent letter IDs from localStorage on component mount
  useEffect(() => {
    const stored = localStorage.getItem("recentLetterIds");
    if (stored) {
      try {
        const { ids, timestamp } = JSON.parse(stored);
        // Check if the stored data is less than 5 minutes old
        if (Date.now() - timestamp < 5 * 60 * 1000) {
          setRecentLetterIds(ids);
        } else {
          // Clear if older than 5 minutes
          localStorage.removeItem("recentLetterIds");
        }
      } catch (error) {
        console.error("Error parsing recent letters:", error);
      }
    }
  }, []);

  // Save recent letter IDs to localStorage whenever they change
  useEffect(() => {
    if (recentLetterIds.length > 0) {
      localStorage.setItem(
        "recentLetterIds",
        JSON.stringify({
          ids: recentLetterIds,
          timestamp: Date.now(),
        }),
      );
    }
  }, [recentLetterIds]);

  const fetchRandomLetter = async () => {
    setError(null);
    setIsLoading(true);

    try {
      // Try to get a letter that's not in recentLetterIds
      let response;
      let attempts = 0;
      const maxAttempts = 10; // Prevent infinite loop

      while (attempts < maxAttempts) {
        response = await letterAPI.getRandomLetter();

        if (response.data.success && response.data.data) {
          const letterId = response.data.data._id;

          // If this letter hasn't been read recently, use it
          if (!recentLetterIds.includes(letterId)) {
            setCurrentLetter(response.data.data);

            // Add to recent letters, keep only last 20
            setRecentLetterIds((prev) => {
              const updated = [letterId, ...prev].slice(0, 20);
              return updated;
            });

            setIsLoading(false);
            return;
          }
        }
        attempts++;
      }

      // If we couldn't find a new letter after max attempts, just use any letter
      response = await letterAPI.getRandomLetter();
      if (response.data.success && response.data.data) {
        setCurrentLetter(response.data.data);

        // Still update recent letters
        setRecentLetterIds((prev) => {
          const updated = [response.data.data._id, ...prev].slice(0, 20);
          return updated;
        });
      } else {
        setError("No letters found. Be the first to write one!");
        setLetterDropped(false);
        setJarOpen(false);
      }
    } catch (err) {
      console.error("Error fetching letter:", err);
      setError("Failed to fetch a letter. Please try again.");
      setLetterDropped(false);
      setJarOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJarClick = () => {
    if (jarOpen || isLoading) return;
    setJarOpen(true);
    setError(null);
    fetchRandomLetter();
    setTimeout(() => {
      setLetterDropped(true);
    }, 1600);
  };

  const handleReadAnother = () => {
    setShowContent(false);
    setLetterDropped(false);
    setJarOpen(false);
    setCurrentLetter(null);
    // Small delay before allowing another jar click
    setTimeout(() => {
      setJarOpen(false);
    }, 100);
  };

  // Add manual clear for testing (optional)
  const clearRecentLetters = () => {
    localStorage.removeItem("recentLetterIds");
    setRecentLetterIds([]);
  };

  return (
    <div className="bg-bgColor min-h-screen text-white relative overflow-hidden">
      <Header />

      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] py-16 px-4 sm:px-6">
        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-8"
          >
            <p
              className="text-red-400 text-lg"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {error}
            </p>
            <motion.button
              onClick={handleJarClick}
              className="mt-4 px-6 py-2 bg-primary/20 rounded-lg text-primary"
              whileHover={{ scale: 1.05 }}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Try Again"}
            </motion.button>
          </motion.div>
        )}

        {/* JAR - Hidden when letter is dropped */}
        {!letterDropped && !error && (
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={jar}
              alt="jar"
              className={`w-40 sm:w-52 md:w-64 cursor-pointer ${isLoading ? "opacity-50" : ""}`}
              onClick={handleJarClick}
              animate={
                jarOpen
                  ? { rotate: 180, x: [0, -10, 10, -10, 10, 0] }
                  : { y: [0, -8, 0] }
              }
              transition={
                jarOpen
                  ? {
                      rotate: { duration: 0.6 },
                      x: { delay: 0.6, duration: 0.6 },
                    }
                  : { duration: 2, repeat: Infinity }
              }
            />
            <p
              className="mt-6 text-white text-base sm:text-lg text-center px-4 max-w-xs sm:max-w-none"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {isLoading
                ? "Finding a letter..."
                : "Click the jar to drop a random letter"}
            </p>
          </motion.div>
        )}

        {/* LETTER - Shown after jar is opened */}
        {letterDropped && !showContent && currentLetter && (
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Only the letter */}
            <motion.div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setShowContent(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.img
                src={letter}
                alt="letter"
                className="w-28 sm:w-36 md:w-40"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <p
                className="mt-2 text-white text-base sm:text-lg text-center"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Click the letter to read it
              </p>
            </motion.div>
          </motion.div>
        )}
      </main>

      {/* LETTER MODAL */}
      <LetterModal isOpen={showContent} onClose={() => setShowContent(false)}>
        {currentLetter && (
          <div>
            {/* Greeting */}
            <h2
              style={{
                textAlign: "center",
                fontFamily: "'Palatino Linotype', Georgia, serif",
                fontSize: "clamp(1.2rem, 4vw, 1.6rem)",
                color: "#2c1a08",
                fontStyle: "italic",
                fontWeight: "600",
                marginBottom: "20px",
                paddingBottom: "14px",
                borderBottom: "1px solid rgba(100,60,10,0.25)",
              }}
            >
              Dear Stranger,
            </h2>

            {/* Letter body */}
            <p
              style={{
                fontFamily: "'Palatino Linotype', Georgia, serif",
                fontSize: "clamp(0.95rem, 2.5vw, 1.05rem)",
                lineHeight: "1.9",
                color: "#2c1a08",
                whiteSpace: "pre-wrap",
              }}
            >
              {currentLetter.content}
            </p>

            {/* Sign-off */}
            <div
              style={{
                marginTop: "32px",
                paddingTop: "14px",
                borderTop: "1px solid rgba(100,60,10,0.25)",
                textAlign: "right",
                fontFamily: "'Palatino Linotype', Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(0.9rem, 2vw, 1rem)",
                color: "#2c1a08",
              }}
            >
              With love, <br />
              <span style={{ fontWeight: "600" }}>
                {currentLetter.author || "A fellow stranger"}
              </span>
            </div>

            {/* Read Another Button inside modal */}
            <div className="flex justify-center mt-8">
              <motion.button
                onClick={() => {
                  setShowContent(false);
                  handleReadAnother();
                }}
                className="px-6 py-2 bg-primary/20 rounded-lg text-primary border border-primary/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ fontFamily: "Georgia, serif" }}
              >
                Read Another Letter
              </motion.button>
            </div>
          </div>
        )}
      </LetterModal>

      {/* WRITE LETTER CTA */}
      <motion.div
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-col items-center cursor-pointer"
        onClick={() => navigate("/write-letter")}
        whileHover={{ y: -10, scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.img
          src={inkPen}
          alt="ink and pen"
          className="w-16 sm:w-20 md:w-28 drop-shadow-lg"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ rotate: [-6, 6, -6] }}
        />
        <motion.p
          className="text-white text-sm sm:text-base md:text-xl mt-1 sm:mt-2"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Write a letter
        </motion.p>
        <motion.div
          className="absolute w-24 sm:w-32 h-24 sm:h-32 bg-primary/20 blur-2xl rounded-full"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      </motion.div>
    </div>
  );
};

export default ReadLetter;
