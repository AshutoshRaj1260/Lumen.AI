import React from "react";
import { RiErrorWarningFill, RiLoader4Line } from "@remixicon/react";
import { useSelector } from "react-redux";

const CriticalWarnings = () => {

    const { analysisResult, isLoading } = useSelector((state) => state.analyzer);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-[3px] h-5 bg-[#ef4444] rounded-full shadow-[0_0_8px_#ef4444]" />
        <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          Critical Warnings
          {isLoading && <RiLoader4Line size={18} className="animate-spin text-[#ef4444]" />}
        </h3>
      </div>

      <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] space-y-4">
        <h4 className="text-[10px] font-extrabold tracking-widest text-[#a0a0a0] uppercase mb-2 flex gap-2 items-center">
          HIGH PRIORITY FIXES
          {isLoading && <span className="text-gray-600 animate-pulse lowercase font-mono">detecting...</span>}
        </h4>
        <ul className="space-y-3">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <li key={i} className="flex gap-3 items-center bg-[#222] p-3 rounded-xl border border-red-900/10">
                <div className="w-5 h-5 rounded-full bg-red-500/20 animate-pulse shrink-0" />
                <div className="flex-1 space-y-2">
                   <div className="h-2 w-full bg-white/5 rounded animate-pulse" />
                   <div className="h-2 w-3/4 bg-white/5 rounded animate-pulse" />
                </div>
              </li>
            ))
          ) : (
            analysisResult?.criticalWarnings?.length > 0 ? (
              analysisResult.criticalWarnings.map((warning, idx) => (
                <li key={idx} className="flex gap-3 items-start bg-[#222] p-3 rounded-xl border border-red-900/30">
                  <RiErrorWarningFill className="text-[#ef4444] mt-0.5 shrink-0" size={18} />
                  <p className="text-gray-300 text-sm leading-relaxed">{warning}</p>
                </li>
              ))
            ) : (
              <li className="text-gray-500 text-sm italic">No warnings detected yet.</li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default CriticalWarnings;
