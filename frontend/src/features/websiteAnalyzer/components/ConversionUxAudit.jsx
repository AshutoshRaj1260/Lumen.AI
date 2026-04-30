import React from "react";
import { RiRobot2Fill, RiLoader4Line } from "@remixicon/react";
import { useSelector } from "react-redux";

const ConversionUxAudit = () => {
  const { isLoading, analysisResult } = useSelector(state => state.analyzer);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-[3px] h-5 bg-[#fca311] rounded-full" />
          <h3 className="text-xl font-bold tracking-tight text-white flex gap-2 items-center">
            Conversion & UX Audit
            {isLoading && <RiLoader4Line size={18} className="animate-spin text-[#fca311]" />}
          </h3>
        </div>
        
        <button className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${isLoading ? 'bg-[#fca311]/20 shadow-none pointer-events-none' : 'bg-[#fca311] hover:bg-[#e59800] shadow-[#fca311]/20 hover:scale-105'}`}>
          <RiRobot2Fill size={24} className={isLoading ? 'text-[#fca311]/50' : 'text-black'} />
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a]">
        <div className="flex justify-between mb-4">
          <h4 className="text-[10px] font-extrabold tracking-widest text-[#a0a0a0] uppercase flex gap-2 items-center">
            CALL TO ACTION ANALYSIS
            {isLoading && <span className="text-gray-600 animate-pulse lowercase font-mono">running audit...</span>}
          </h4>
        </div>
        
        {isLoading ? (
          <div className="space-y-3 mb-4">
             <div className="h-3 w-content bg-white/5 rounded animate-pulse" />
             <div className="h-3 w-11/12 bg-white/5 rounded animate-pulse" />
             <div className="h-3 w-4/5 bg-white/5 rounded animate-pulse" />
          </div>
        ) : (
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {analysisResult?.uxAudit?.ctaAnalysis || "CTA mapping and structural layout evaluation will appear here once the URL is fully scanned."}
          </p>
        )}

        <div className="h-2 w-full bg-[#2a2a2a] rounded-full overflow-hidden mt-4">
          <div className={`h-full bg-gradient-to-r from-blue-500 to-[#fca311] transition-all duration-1000 ${isLoading ? 'w-0' : 'w-[75%]'}`} />
        </div>
        <p className="text-xs text-right mt-2 font-mono text-gray-500">
          {isLoading ? "0% ANALYZED" : "75% OPTIMIZED"}
        </p>
      </div>
    </div>
  );
};

export default ConversionUxAudit;
