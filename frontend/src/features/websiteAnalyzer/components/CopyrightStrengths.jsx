import React from "react";
import { RiPenNibFill, RiCheckboxCircleFill, RiLoader4Line } from "@remixicon/react";
import { useSelector } from "react-redux";

const CopyrightStrengths = () => {

    const { analysisResult, isLoading } = useSelector((state) => state.analyzer);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-[3px] h-5 bg-[#2ecc71] rounded-full shadow-[0_0_8px_#2ecc71]" />
          <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            Copyright Strengths
            {isLoading && <RiLoader4Line size={18} className="animate-spin text-[#2ecc71]" />}
          </h3>
        </div>
        <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${isLoading ? 'bg-[#1a1a1a]/50 border-[#2a2a2a]/50 text-[#2ecc71]/30' : 'bg-[#1a1a1a] border-[#2a2a2a] text-[#2ecc71]'}`}>
          <RiPenNibFill size={20} />
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] space-y-5">
        <h4 className="text-[10px] font-extrabold tracking-widest text-[#a0a0a0] uppercase mb-4 flex items-center gap-2">
          MESSAGING ANALYSIS
          {isLoading && <span className="text-gray-600 animate-pulse lowercase font-mono">processing...</span>}
        </h4>
        
        <div className="space-y-4">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4 items-center pb-4 border-b border-[#333] last:border-0 last:pb-0">
                <div className="w-5 h-5 rounded-full bg-green-500/20 animate-pulse shrink-0" />
                <div className="h-4 w-5/6 bg-white/5 rounded animate-pulse" />
              </div>
            ))
          ) : (
            analysisResult?.copywritingStrengths?.length > 0 ? (
              analysisResult.copywritingStrengths.map((str, idx) => (
                <div key={idx} className="flex gap-4 items-start pb-4 border-b border-[#333] last:border-0 last:pb-0">
                  <RiCheckboxCircleFill className="text-[#2ecc71] shrink-0 mt-0.5" size={20} />
                  <div>
                    <h5 className="text-gray-100 font-medium mb-1">{str}</h5>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm italic">Analysis currently unavailable.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CopyrightStrengths;
