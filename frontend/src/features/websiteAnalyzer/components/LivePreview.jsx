import React from "react";
import { RiGlobalLine, RiCircleFill, RiExternalLinkLine } from "@remixicon/react";
import { useSelector } from "react-redux";

const LivePreview = () => {
  const url = useSelector((state) => state.analyzer.websiteUrl);
  const isLoading = useSelector((state) => state.analyzer.isLoading);

  const isValidUrl = (urlString) => {
    if (!urlString) return false;
    try {
      new URL(urlString);
      return urlString.startsWith("http://") || urlString.startsWith("https://");
    } catch {
      return false;
    }
  };

  const isLive = isValidUrl(url);
  const displayUrl = isLive ? url : "https://lumen-ai.dev/";

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 font-mono tracking-widest">
          <RiGlobalLine size={16} className="mb-0.5" />
          <span>{displayUrl}</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-[#2ecc71] tracking-widest">
          <RiCircleFill size={8} />
          <span>LIVE PREVIEW</span>
        </div>
      </div>
      
      <div className="flex-1 bg-[#121212] rounded-2xl border border-[#222] overflow-hidden relative shadow-2xl">
        {isLive && !isLoading ? (
          <div className="relative w-full h-full group">
            <iframe 
              src={url}
              title="Live Preview"
              className="w-full h-full border-none bg-white"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
            {/* Pop-out overlay for sites that block iframes (X-Frame-Options) */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#1a1a1a]/80 backdrop-blur-md text-gray-200 px-4 py-2.5 rounded-xl border border-[#333] flex items-center gap-2 hover:bg-[#252525] hover:text-[#fca311] transition-all shadow-xl"
              >
                <span className="text-xs font-semibold tracking-wide">OPEN EXTERNALLY</span>
                <RiExternalLinkLine size={16} className="mt-0.5" />
              </a>
            </div>
            
            {/* Helper tooltip */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#0a0a0a]/80 backdrop-blur-md text-[9px] text-gray-400 px-4 py-3 rounded-full border border-white/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg tracking-wider">
              PREVIEW BLOCKED? LAUNCH IN NEW TAB TO VIEW
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-[#0a0a0a] overflow-hidden flex items-center justify-center">
            {/* Deep space background with subtle grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] opacity-70" />
            
            {/* Glowing ambient light orbs */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#fca311]/10 rounded-full blur-[100px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse delay-700 pointer-events-none" />

            {/* Floating abstract UI elements representing data points */}
            {/* Card 1: Top Left */}
            <div className="absolute top-[15%] left-[10%] w-64 h-40 bg-white/[0.02] border border-white/[0.05] rounded-2xl backdrop-blur-md p-5 flex flex-col gap-3 animate-pulse">
              <div className="w-10 h-10 rounded-lg bg-white/5" />
              <div className="w-full h-3 rounded bg-white/5" />
              <div className="w-3/4 h-3 rounded bg-white/5" />
              <div className="w-1/2 h-3 rounded bg-white/5 mt-2" />
            </div>

            {/* Card 2: Bottom Right Chart */}
            <div className="absolute bottom-[15%] right-[10%] w-80 h-48 bg-white/[0.02] border border-white/[0.05] rounded-2xl backdrop-blur-md p-6 flex flex-col justify-end gap-2 animate-pulse delay-500">
              <div className="flex items-end gap-3 h-24 w-full">
                <div className="flex-1 bg-[#fca311]/20 h-[40%] rounded-t-md" />
                <div className="flex-1 bg-[#fca311]/40 h-[70%] rounded-t-md" />
                <div className="flex-1 bg-[#fca311]/60 h-[100%] rounded-t-md relative">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#fca311]" />
                </div>
                <div className="flex-1 bg-[#fca311]/30 h-[60%] rounded-t-md" />
                <div className="flex-1 bg-[#fca311]/10 h-[30%] rounded-t-md" />
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full mt-2" />
            </div>
            
            {/* Card 3: Top Right Circle Widget */}
            <div className="absolute top-[20%] right-[20%] w-36 h-36 bg-white/[0.02] border border-white/[0.05] rounded-2xl backdrop-blur-md p-5 flex items-center justify-center animate-pulse delay-300">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 rounded-full border-4 border-white/5" />
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500/50 border-r-blue-500/50 rotate-45" />
              </div>
            </div>

            {/* Central Radar Target */}
            <div className="relative z-10 flex flex-col items-center justify-center group">
              <div className="relative flex items-center justify-center w-48 h-48">
                {/* Outer dashed ring */}
                <div className="absolute inset-0 rounded-full border border-dashed border-white/20 animate-spin [animation-duration:12s]" />
                {/* Middle tracking ring */}
                <div className="absolute inset-4 rounded-full border border-transparent border-b-[#fca311]/50 border-l-[#fca311]/50 animate-spin [animation-duration:3s] [animation-direction:reverse]" />
                {/* Inner glowing pulse */}
                <div className="absolute inset-10 rounded-full bg-[#fca311]/10 animate-ping [animation-duration:3s]" />
                {/* Center Icon */}
                <RiGlobalLine size={48} className="text-white/50 group-hover:text-white/80 transition-colors duration-500 relative z-20" />
              </div>
              
              {/* Text indicator */}
              <div className="mt-8 flex flex-col items-center gap-2">
                <p className="text-[#fca311] font-mono text-[10px] tracking-[0.3em] font-bold animate-[pulse_2s_ease-in-out_infinite]">{isLoading ? "SCANNING IN PROGRESS..." : "SYSTEM STANDBY"}</p>
                <p className="text-gray-500 font-sans text-sm tracking-wide text-center px-4">{isLoading ? "Extracting DOM and evaluating metrics. Please stand by." : "Enter a target URL to initiate deep scan sequence."}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePreview;
