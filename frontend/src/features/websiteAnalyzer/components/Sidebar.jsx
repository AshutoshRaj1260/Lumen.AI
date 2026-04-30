import React from "react";
import {
  RiAddBoxLine,
  RiHistoryLine,
  RiKey2Line,
  RiSettings3Line,
  RiFileList3Line,
  RiLogoutBoxRLine,
} from "@remixicon/react";

import { useNavigate } from "react-router";

const Sidebar = () => {

    const navigate = useNavigate();

  return (
    <aside className="w-64 flex flex-col bg-[#121212] border-r border-[#222]">
      <div className="p-6">
        <button onClick={()=>{
            navigate('/')
        }}>
          <h1 className="text-xl font-bold tracking-wider text-white">
            LUMEN AI
          </h1>
        </button>
        <p className="text-[10px] text-gray-500 tracking-widest mt-1">
          INTELLIGENCE SUITE
        </p>
      </div>

      <nav className="flex-1 px-4 mt-4 space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#1e1e1e] text-white rounded-lg border border-gray-700/50 hover:bg-[#252525] transition-colors">
          <RiAddBoxLine size={20} className="text-[#fca311]" />
          <span className="font-medium text-sm">New Analysis</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
          <RiHistoryLine size={20} />
          <span className="font-medium text-sm">History</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
          <RiKey2Line size={20} />
          <span className="font-medium text-sm">Keywords</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
          <RiSettings3Line size={20} />
          <span className="font-medium text-sm">Settings</span>
        </button>
      </nav>

      <div className="p-4 space-y-2 border-t border-[#222]">
        <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white transition-colors">
          <RiFileList3Line size={20} />
          <span className="font-medium text-sm">Documentation</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white transition-colors">
          <RiLogoutBoxRLine size={20} />
          <span className="font-medium text-sm">Sign Out</span>
        </button>

        <div className="mt-4 p-4 rounded-xl border border-gray-800 bg-[#161616]">
          <p className="text-[10px] font-bold text-[#fca311] tracking-wider mb-3">
            PRO PLAN ACTIVE
          </p>
          <button className="w-full py-2.5 bg-[#fca311] hover:bg-[#e59800] text-black font-semibold rounded-lg text-sm transition-colors">
            Upgrade to Pro
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
