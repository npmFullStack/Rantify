import React, { useState } from "react";
import Header from "@/components/Header";
import LetterModal from "@/components/LetterModal";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import jar from "@/assets/images/jar.png";
import letter from "@/assets/images/letter.png";
import inkPen from "@/assets/images/inkandpen.png";

const ReadLetter = () => {
  const [jarOpen, setJarOpen] = useState(false);
  const [letterDropped, setLetterDropped] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const navigate = useNavigate();

  const handleJarClick = () => {
    if (jarOpen) return;
    setJarOpen(true);
    setTimeout(() => {
      setLetterDropped(true);
    }, 1600);
  };

  return (
    <div className="bg-bgColor min-h-screen text-white relative overflow-hidden">
      <Header />

      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] py-16 px-4 sm:px-6">
        {/* JAR */}
        {!letterDropped && (
          <>
            <motion.img
              src={jar}
              alt="jar"
              className="w-40 sm:w-52 md:w-64 cursor-pointer"
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
              Click the jar to drop a random letter
            </p>
          </>
        )}

        {/* LETTER */}
        {letterDropped && !showContent && (
          <>
            <motion.img
              src={letter}
              alt="letter"
              className="w-28 sm:w-36 md:w-40 cursor-pointer mt-10"
              initial={{ y: -250, opacity: 0 }}
              animate={{ y: [0, -6, 0], opacity: 1 }}
              transition={{
                y: { duration: 2, repeat: Infinity },
                opacity: { duration: 0.6 },
              }}
              whileHover={{ scale: 1.15, rotate: -6, y: -15 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowContent(true)}
            />
            <p
              className="mt-6 text-white text-base sm:text-lg text-center"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Click the letter to read it
            </p>
          </>
        )}
      </main>

      {/* LETTER MODAL */}
      <LetterModal isOpen={showContent} onClose={() => setShowContent(false)}>
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
            }}
          >
            Sometimes life feels overwhelming and we carry emotions we cannot
            easily share. If you are reading this, just remember you are not
            alone. Someone out there understands your story.
          </p>

          <p
            style={{
              fontFamily: "'Palatino Linotype', Georgia, serif",
              fontSize: "clamp(0.95rem, 2.5vw, 1.05rem)",
              lineHeight: "1.9",
              color: "#2c1a08",
              marginTop: "16px",
            }}
          >
            Keep going. The world is better with you in it.
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
            <span style={{ fontWeight: "600" }}>A fellow stranger</span>
          </div>
        </div>
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
