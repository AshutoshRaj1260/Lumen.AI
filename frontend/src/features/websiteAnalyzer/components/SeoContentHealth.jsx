import React from "react";
import { RiBookReadFill, RiFileList3Line, RiLoader4Line } from "@remixicon/react";
import { useSelector } from "react-redux";

const SeoContentHealth = () => {

    const {analysisResult, isLoading} = useSelector((state) => state.analyzer);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-[3px] h-5 bg-[#fca311] rounded-full" />
        <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          SEO & Content Health
          {isLoading && <RiLoader4Line size={18} className="animate-spin text-[#fca311]" />}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-6 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <h4 className="text-[10px] font-extrabold tracking-widest text-[#a0a0a0] uppercase flex gap-2 items-center">
              READABILITY LEVEL
              {isLoading && <span className="text-gray-600 animate-pulse lowercase font-mono">evaluating...</span>}
            </h4>
            <RiBookReadFill className="text-[#3b82f6]" size={20} />
          </div>
          {isLoading ? (
            <div className="h-7 w-2/3 bg-white/5 rounded-lg animate-pulse" />
          ) : (
            <h2 className="text-xl font-bold text-white tracking-wide">{analysisResult?.contentReadability || "Pending"}</h2>
          )}
        </div>

        <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-6 flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <h4 className="text-[10px] font-extrabold tracking-widest text-[#a0a0a0] uppercase flex gap-2 items-center">
              EST. WORD COUNT
              {isLoading && <span className="text-gray-600 animate-pulse lowercase font-mono">calculating...</span>}
            </h4>
            <RiFileList3Line className="text-[#fca311]" size={20} />
          </div>
          {isLoading ? (
            <div className="h-7 w-1/2 bg-white/5 rounded-lg animate-pulse" />
          ) : (
            <h2 className="text-xl font-bold text-white tracking-wide">{analysisResult?.estimatedWordCount ? `${analysisResult.estimatedWordCount} words` : "Pending"}</h2>
          )}
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a]">
        <h4 className="text-[10px] font-extrabold tracking-widest text-[#a0a0a0] uppercase mb-4 flex gap-2 items-center">
          TARGETED KEYWORDS
          {isLoading && <span className="text-gray-600 animate-pulse lowercase font-mono">mapping...</span>}
        </h4>
        
        <div className="flex flex-wrap gap-2">
          {isLoading ? (
            <>
              <div className="h-7 w-24 bg-white/5 rounded-full animate-pulse" />
              <div className="h-7 w-32 bg-white/5 rounded-full animate-pulse" />
              <div className="h-7 w-20 bg-white/5 rounded-full animate-pulse" />
              <div className="h-7 w-40 bg-white/5 rounded-full animate-pulse" />
              <div className="h-7 w-28 bg-white/5 rounded-full animate-pulse" />
            </>
          ) : (
            analysisResult?.seoKeywords?.length > 0 ? (
              analysisResult.seoKeywords.map((kw, idx) => (
                 <span key={idx} className="px-3 py-1.5 text-xs font-medium rounded-full bg-[#2a2a2a] text-gray-300 border border-[#3a3a3a] hover:bg-[#333] transition-colors cursor-default">
                   {kw}
                 </span>
              ))
            ) : (
              <span className="text-sm text-gray-500 italic">No keywords detected yet.</span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SeoContentHealth;
