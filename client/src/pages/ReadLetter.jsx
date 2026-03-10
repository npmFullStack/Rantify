import React, { useState } from "react";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import jar from "@/assets/images/jar.png";
import letter from "@/assets/images/letter.png";
import letterContent from "@/assets/images/letterContent.png";
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

      <main className="flex flex-col items-center justify-center py-20 px-6">
        {/* JAR */}
        {!letterDropped && (
          <>
            <motion.img
              src={jar}
              alt="jar"
              className="w-64 cursor-pointer"
              onClick={handleJarClick}
              animate={
                jarOpen
                  ? {
                      rotate: 180,
                      x: [0, -10, 10, -10, 10, 0],
                    }
                  : {
                      y: [0, -8, 0],
                    }
              }
              transition={
                jarOpen
                  ? {
                      rotate: { duration: 0.6 },
                      x: { delay: 0.6, duration: 0.6 },
                    }
                  : {
                      duration: 2,
                      repeat: Infinity,
                    }
              }
            />

            <p className="mt-6 text-white text-lg text-center">
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
              className="w-40 cursor-pointer mt-10"
              initial={{ y: -250, opacity: 0 }}
              animate={{
                y: [0, -6, 0],
                opacity: 1,
              }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                },
                opacity: { duration: 0.6 },
              }}
              whileHover={{
                scale: 1.15,
                rotate: -6,
                y: -15,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowContent(true)}
            />

            <p className="mt-6 text-white text-lg">
              Click the letter to read it
            </p>
          </>
        )}

        {/* LETTER CONTENT */}
        {showContent && (
          <motion.div
            className="relative mt-10 flex justify-center"
            initial={{ scale: 0.7, opacity: 0, rotate: -2 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={letterContent}
              alt="letter content"
              className="w-[420px] drop-shadow-2xl"
            />

            <div className="absolute top-20 px-16 text-gray-800 text-center font-logo">
              <h2 className="text-3xl mb-4">Dear Stranger,</h2>

              <p className="text-xl leading-relaxed">
                Sometimes life feels overwhelming and we carry emotions we
                cannot easily share. If you are reading this, just remember you
                are not alone. Someone out there understands your story.
              </p>
            </div>
          </motion.div>
        )}
      </main>

      {/* WRITE LETTER CTA */}
      <motion.div
        className="absolute bottom-6 right-6 flex flex-col items-center cursor-pointer"
        onClick={() => navigate("/write-letter")}
        whileHover={{
          y: -10,
          scale: 1.08,
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* PEN */}
        <motion.img
          src={inkPen}
          alt="ink and pen"
          className="w-28 drop-shadow-lg"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          whileHover={{
            rotate: [-6, 6, -6],
          }}
        />

        {/* TEXT */}
        <motion.p
          className="text-white text-xl font-logo mt-2"
          whileHover={{
            color: "#ff0090",
          }}
        >
          Write a letter
        </motion.p>

        {/* GLOW EFFECT */}
        <motion.div
          className="absolute w-32 h-32 bg-primary/20 blur-2xl rounded-full"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      </motion.div>
    </div>
  );
};

export default ReadLetter;
