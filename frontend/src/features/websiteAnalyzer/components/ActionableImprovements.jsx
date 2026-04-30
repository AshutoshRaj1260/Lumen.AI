import React from "react";
import { RiToolsFill, RiArrowRightUpLine, RiLoader4Line } from "@remixicon/react";
import { useSelector } from "react-redux";

const ActionableImprovements = () => {

    const { analysisResult, isLoading } = useSelector((state) => state.analyzer);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-[3px] h-5 bg-[#3b82f6] rounded-full shadow-[0_0_8px_#3b82f6]" />
        <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          Actionable Improvements
          {isLoading && <RiLoader4Line size={18} className="animate-spin text-[#3b82f6]" />}
        </h3>
      </div>

      <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] space-y-5">
        <h4 className="text-[10px] font-extrabold tracking-widest text-[#a0a0a0] uppercase mb-1 flex gap-2 items-center">
          SUGGESTED TASKS
          {isLoading && <span className="text-gray-600 animate-pulse lowercase font-mono">compiling...</span>}
        </h4>
        
        <div className="space-y-3">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 -mx-3">
                <div className="w-8 h-8 rounded-lg bg-blue-900/10 animate-pulse shrink-0" />
                <div className="h-4 w-3/4 bg-white/5 rounded animate-pulse" />
              </div>
            ))
          ) : (
            analysisResult?.actionableImprovements?.length > 0 ? (
              analysisResult.actionableImprovements.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center group cursor-pointer hover:bg-[#252525] p-3 -mx-3 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/20 text-blue-500 flex items-center justify-center border border-blue-900/50 shrink-0">
                      <RiToolsFill size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{item}</p>
                    </div>
                  </div>
                  <RiArrowRightUpLine className="text-gray-600 group-hover:text-[#fca311] transition-colors shrink-0" size={18} />
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm italic">No improvements suggested yet.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionableImprovements;
