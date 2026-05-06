import React, { useState } from "react";
import {
  RiNotification3Line,
  RiAccountCircleLine,
  RiGlobalLine,
  RiSearchLine,
} from "@remixicon/react";

import { useAnalyzer } from "../hooks/useAnalyzer";
import { useSelector } from "react-redux";

const Topbar = () => {
  const [url, setUrl] = useState("");

  const { handleAnalyzeWebsite } = useAnalyzer();

  const { isLoading } = useSelector((state) => state.analyzer);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!url.trim()) return;

    await handleAnalyzeWebsite({ url });
    console.log("Successful");

  };

  return (
    <header className="min-h-[72px] flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:px-8 border-b border-[#222] bg-[#0a0a0a] gap-4 md:gap-0 pl-16 md:pl-8">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-12 w-full md:w-auto">
        <h2 className="text-lg md:text-xl font-bold tracking-widest text-white truncate hidden md:block">
          SITEINTELLIGENCE
        </h2>

        <div className="flex items-center bg-[#121212] border border-[#222] rounded-xl px-3 py-2 w-full md:w-[450px] focus-within:border-gray-500 transition-colors">
          <RiGlobalLine className="text-gray-500 shrink-0" size={18} />
          <form
            className="flex-1 flex items-center ml-2"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL..."
              className="bg-transparent border-none outline-none text-sm text-gray-300 w-full placeholder-gray-600"
            />
            <button
              type="submit"
              className="text-gray-500 hover:text-[#fca311] transition-colors ml-2 shrink-0 flex items-center justify-center p-1 rounded-md hover:bg-white/5"
              disabled={isLoading}
            >
              <RiSearchLine size={18} />
            </button>
          </form>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 md:gap-6 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
        <button className="text-gray-400 hover:text-white text-xs md:text-sm font-medium transition-colors hidden md:block">
          Share
        </button>
        <button className="px-3 py-1.5 md:px-5 md:py-2 text-xs md:text-sm font-semibold rounded-lg bg-[#fca311] text-black hover:bg-[#e59800] transition-colors whitespace-nowrap">
          Export Report
        </button>

        <div className="w-[1px] h-6 bg-[#333] hidden md:block"></div>

        <button className="text-gray-400 hover:text-white transition-colors hidden sm:block">
          <RiNotification3Line size={20} />
        </button>
        <button className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border border-gray-600 shrink-0">
          <img
            src="https://ik.imagekit.io/6j5alarrgo/cohort-2_insta-clone-posts/test_FekhbKXu1?updatedAt=1772645089449"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
