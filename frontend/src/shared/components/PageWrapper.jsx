import React from "react";
import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.85,
  },
  in: {
    opacity: 1,
    scale: 1,
  },
  out: {
    opacity: 0,
    scale: 1.1,
  },
};

const pageTransition = {
  type: "spring",
  damping: 25,
  stiffness: 200,
  mass: 0.8,
  restDelta: 0.0001,
};

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{ height: "100%", width: "100%", transformOrigin: "center center" }}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
