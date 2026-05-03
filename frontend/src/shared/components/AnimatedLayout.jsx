import React from "react";
import { Outlet, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";

const AnimatedLayout = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Outlet key={location.pathname} />
    </AnimatePresence>
  );
};

export default AnimatedLayout;