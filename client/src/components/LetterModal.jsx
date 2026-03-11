import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const LetterModal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.82)" }}
        >
          {/* Close button */}
          <motion.button
            onClick={onClose}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute top-6 right-6 z-50 flex items-center justify-center w-9 h-9 rounded-full transition-all"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.7)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.18)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
            }
          >
            <X size={18} />
          </motion.button>

          {/* Parchment Modal */}
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.88, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.88, y: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            style={{
              // Burnt/dark edges via box shadow inset
              filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.8))",
            }}
          >
            {/* SVG for burnt/torn edge mask */}
            <svg width="0" height="0" style={{ position: "absolute" }}>
              <defs>
                <filter id="roughen">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.065"
                    numOctaves="4"
                    seed="3"
                    result="noise"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="6"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
              </defs>
            </svg>

            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: "4px",
                background: `
                  radial-gradient(ellipse at 30% 20%, rgba(139,90,43,0.45) 0%, transparent 55%),
                  radial-gradient(ellipse at 70% 75%, rgba(120,75,30,0.38) 0%, transparent 50%),
                  radial-gradient(ellipse at 55% 45%, rgba(160,110,50,0.25) 0%, transparent 40%),
                  radial-gradient(ellipse at 20% 70%, rgba(100,65,25,0.3) 0%, transparent 45%),
                  radial-gradient(ellipse at 80% 20%, rgba(130,85,35,0.2) 0%, transparent 40%),
                  linear-gradient(160deg, #e8c87a 0%, #d4a84b 20%, #c89840 40%, #e2be72 60%, #d0a045 80%, #c49038 100%)
                `,
              }}
            >
              {/* Burnt corners - top-left */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "90px",
                  height: "90px",
                  background:
                    "radial-gradient(ellipse at 0% 0%, #1a0e05 0%, #3d200a 30%, #6b3a12 55%, transparent 75%)",
                  borderRadius: "0 0 100% 0",
                  opacity: 0.92,
                  zIndex: 10,
                  mixBlendMode: "multiply",
                }}
              />
              {/* Burnt corners - top-right */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "90px",
                  height: "90px",
                  background:
                    "radial-gradient(ellipse at 100% 0%, #1a0e05 0%, #3d200a 30%, #6b3a12 55%, transparent 75%)",
                  borderRadius: "0 0 0 100%",
                  opacity: 0.92,
                  zIndex: 10,
                  mixBlendMode: "multiply",
                }}
              />
              {/* Burnt corners - bottom-left */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "90px",
                  height: "90px",
                  background:
                    "radial-gradient(ellipse at 0% 100%, #1a0e05 0%, #3d200a 30%, #6b3a12 55%, transparent 75%)",
                  borderRadius: "0 100% 0 0",
                  opacity: 0.92,
                  zIndex: 10,
                  mixBlendMode: "multiply",
                }}
              />
              {/* Burnt corners - bottom-right */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: "90px",
                  height: "90px",
                  background:
                    "radial-gradient(ellipse at 100% 100%, #1a0e05 0%, #3d200a 30%, #6b3a12 55%, transparent 75%)",
                  borderRadius: "100% 0 0 0",
                  opacity: 0.92,
                  zIndex: 10,
                  mixBlendMode: "multiply",
                }}
              />

              {/* Dark edge vignette all around */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  boxShadow: "inset 0 0 80px rgba(40, 18, 4, 0.65)",
                  pointerEvents: "none",
                  zIndex: 9,
                  borderRadius: "4px",
                }}
              />

              {/* Stain blobs - large central watermark */}
              <div
                style={{
                  position: "absolute",
                  top: "28%",
                  left: "18%",
                  width: "260px",
                  height: "200px",
                  background:
                    "radial-gradient(ellipse, rgba(120,70,15,0.22) 0%, transparent 70%)",
                  borderRadius: "60% 40% 50% 60%",
                  transform: "rotate(-15deg)",
                  pointerEvents: "none",
                  zIndex: 5,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "45%",
                  left: "38%",
                  width: "180px",
                  height: "160px",
                  background:
                    "radial-gradient(ellipse, rgba(100,55,10,0.18) 0%, transparent 70%)",
                  borderRadius: "50% 60% 40% 55%",
                  transform: "rotate(20deg)",
                  pointerEvents: "none",
                  zIndex: 5,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "10%",
                  right: "20%",
                  width: "140px",
                  height: "120px",
                  background:
                    "radial-gradient(ellipse, rgba(110,65,18,0.15) 0%, transparent 70%)",
                  borderRadius: "55% 45% 60% 40%",
                  transform: "rotate(-8deg)",
                  pointerEvents: "none",
                  zIndex: 5,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "15%",
                  left: "30%",
                  width: "200px",
                  height: "130px",
                  background:
                    "radial-gradient(ellipse, rgba(130,75,20,0.16) 0%, transparent 70%)",
                  borderRadius: "45% 55% 50% 45%",
                  transform: "rotate(12deg)",
                  pointerEvents: "none",
                  zIndex: 5,
                }}
              />

              {/* Fine paper grain texture */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
                  opacity: 0.5,
                  pointerEvents: "none",
                  zIndex: 6,
                  mixBlendMode: "multiply",
                }}
              />

              {/* Subtle horizontal ruled lines */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  zIndex: 4,
                }}
              >
                {[...Array(22)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      top: `${80 + i * 38}px`,
                      left: "32px",
                      right: "32px",
                      height: "1px",
                      background: "rgba(100, 60, 10, 0.1)",
                    }}
                  />
                ))}
              </div>

              {/* Content area */}
              <div
                className="relative"
                style={{
                  padding: "52px 52px 56px",
                  zIndex: 20,
                  fontFamily:
                    "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
                  color: "#2c1a08",
                }}
              >
                {children}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LetterModal;
