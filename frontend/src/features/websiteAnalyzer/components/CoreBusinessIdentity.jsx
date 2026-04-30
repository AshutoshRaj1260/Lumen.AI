import React from "react";
import { RiCheckDoubleFill, RiLoader4Line } from "@remixicon/react";
import { useSelector } from "react-redux";

const CoreBusinessIdentity = () => {

  const { analysisResult, isLoading } = useSelector((state) => state.analyzer);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-[3px] h-5 bg-[#fca311] rounded-full" />
        <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          Core Business Identity
          {isLoading && <RiLoader4Line size={18} className="animate-spin text-[#fca311]" />}
        </h3>
      </div>

      <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-[10px] font-extrabold tracking-widest text-[#fca311] uppercase">
              COMPANY NAME
            </h4>
            {isLoading && <span className="text-[10px] text-gray-500 font-mono animate-pulse">Processing...</span>}
          </div>
          {isLoading ? (
            <div className="h-8 w-64 bg-white/5 rounded-lg animate-pulse" />
          ) : (
            <h2 className="text-2xl font-black text-white">
              {analysisResult?.companyName || "Awaiting Analysis..."}
            </h2>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-[10px] font-extrabold tracking-widest text-[#fca311] uppercase">
              EXECUTIVE SUMMARY
            </h4>
            {isLoading && <span className="text-[10px] text-gray-500 font-mono animate-pulse">Extracting parameters...</span>}
          </div>
          {isLoading ? (
             <div className="space-y-3">
               <div className="h-3.5 w-full bg-white/5 rounded animate-pulse" />
               <div className="h-3.5 w-11/12 bg-white/5 rounded animate-pulse" />
               <div className="h-3.5 w-4/5 bg-white/5 rounded animate-pulse" />
             </div>
          ) : (
            <p className="text-gray-300 leading-relaxed text-[15px] font-light italic">
              {analysisResult?.executiveSummary || "Waiting for target URL to generate executive summary..."}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
             <h4 className="text-[10px] font-extrabold tracking-widest text-[#fca311] uppercase">
               VALUE PROPOSITION
             </h4>
             {isLoading && <span className="text-[10px] text-gray-500 font-mono animate-pulse">Evaluating...</span>}
          </div>
          <div className="flex gap-3 items-start">
            <RiCheckDoubleFill
              className={`text-[#fca311] mt-0.5 shrink-0 ${isLoading ? 'opacity-30' : ''}`}
              size={20}
            />
            {isLoading ? (
               <div className="space-y-2 w-full mt-1.5">
                 <div className="h-3.5 w-3/4 bg-white/5 rounded animate-pulse" />
                 <div className="h-3.5 w-1/2 bg-white/5 rounded animate-pulse" />
               </div>
            ) : (
              <p className="text-white font-medium text-[15px]">
                {analysisResult?.valueProposition || "Awaiting analysis sequence."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoreBusinessIdentity;
