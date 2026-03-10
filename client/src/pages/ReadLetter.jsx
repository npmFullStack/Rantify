import React, { useState } from "react";
import Header from "@/components/Header";
import { motion } from "framer-motion";

import jar from "@/assets/images/jar.png";
import letter from "@/assets/images/letter.png";
import letterContent from "@/assets/images/letterContent.png";

const ReadLetter = () => {
  const [jarOpen, setJarOpen] = useState(false);
  const [letterDropped, setLetterDropped] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleJarClick = () => {
    if (jarOpen) return;

    setJarOpen(true);

    setTimeout(() => {
      setLetterDropped(true);
    }, 1500);
  };

  return (
    <div className="bg-bgColor min-h-screen text-white">
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
                      x: [0, -8, 8, -8, 8, 0],
                    }
                  : { rotate: 0 }
              }
              transition={{
                rotate: { duration: 0.6 },
                x: { delay: 0.6, duration: 0.6 },
              }}
            />

            <p className="mt-6 text-white text-lg text-center">
              Click the jar to drop a random letter
            </p>
          </>
        )}

        {/* DROPPING LETTER */}
        {letterDropped && !showContent && (
          <>
            <motion.img
              src={letter}
              alt="letter"
              className="w-40 cursor-pointer mt-10"
              initial={{ y: -200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              /* HOVER ANIMATION */
              whileHover={{
                scale: 1.1,
                rotate: -5,
                y: -10,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowContent(true)}
            />

            <p className="mt-6 text-white text-lg">
              Click the letter to read it
            </p>
          </>
        )}

        {/* OPEN LETTER CONTENT */}
        {showContent && (
          <motion.div
            className="relative mt-10 flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={letterContent}
              alt="letter content"
              className="w-[420px]"
            />

            {/* TEXT ON TOP OF LETTER */}
            <div className="absolute top-20 px-16 text-gray-800 text-center font-logo">
              <h2 className="text-2xl mb-4">Dear Stranger,</h2>

              <p className="text-lg leading-relaxed">
                Sometimes life feels overwhelming and we carry emotions we
                cannot easily share. If you are reading this, just remember you
                are not alone. Someone out there understands your story.
              </p>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default ReadLetter;
