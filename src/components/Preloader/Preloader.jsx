import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const boxVariants = {
  box1: {
    x: ["100%", "100%", "200%"],
    transition: { duration: 1, ease: "linear", repeat: Infinity },
  },
  box2: {
    x: ["0%", "0%", "100%"],
    y: ["100%", "0%", "0%"],
    transition: { duration: 1, ease: "linear", repeat: Infinity },
  },
  box3: {
    x: ["100%", "100%", "0%"],
    y: ["100%", "100%", "100%"],
    transition: { duration: 1, ease: "linear", repeat: Infinity },
  },
  box4: {
    x: ["200%", "200%", "100%"],
    y: ["0%", "100%", "100%"],
    transition: { duration: 1, ease: "linear", repeat: Infinity },
  },
};

const PreLoader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[rgba(249,251,255,0.6)]">
      <div className="relative mt-8 h-8 w-8 origin-center rotate-[45deg] transform perspective-1000">
        {[...Array(4)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute h-8 w-8"
            variants={boxVariants}
            animate={`box${index + 1}`}
          >
            {["#6a23c9", "#6a23c9", "#6a23c9", "#6a23c9"].map((color, i) => (
              <div
                key={i}
                className="absolute h-full w-full border-[#ebdbff] border-1"
                style={{
                  background: color,
                  transform:
                    i === 1
                      ? "rotateY(90deg) translateZ(15.5px)"
                      : i === 2
                        ? "rotateX(-90deg) translateZ(15.5px)"
                        : i === 3
                          ? "translateZ(-15.5px)"
                          : "translateZ(15.5px)",
                }}
              ></div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PreLoader;
