import React from "react";

const LumenGlow = () => {
  return (
    <div className="absolute pointer-events-none opacity-50 inset-0 z-0 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-1/2 right-1/3 w-80 h-80 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
        style={{ animationDelay: "4s" }}
      ></div>
    </div>
  );
};

export default LumenGlow;
