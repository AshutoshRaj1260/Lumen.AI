import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import LivePreview from "../components/LivePreview";
import CoreBusinessIdentity from "../components/CoreBusinessIdentity";
import SeoContentHealth from "../components/SeoContentHealth";
import ConversionUxAudit from "../components/ConversionUxAudit";
import CriticalWarnings from "../components/CriticalWarnings";
import ActionableImprovements from "../components/ActionableImprovements";
import CopyrightStrengths from "../components/CopyrightStrengths";
import PageWrapper from "../../../shared/components/PageWrapper";
import { RiMenuLine } from "@remixicon/react";

const WebsiteAnalyzerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <PageWrapper>
      <div className="flex h-[100dvh] bg-[#0a0a0a] text-white font-sans overflow-hidden relative">
        {/* Mobile Hamburger Button */}
        <button
          className="absolute top-4 left-4 z-50 md:hidden p-2 bg-[#121212] border border-[#222] rounded-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <RiMenuLine size={24} />
        </button>

        {/* Sidebar overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        <div className={`fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex flex-shrink-0 h-full`}>
          <Sidebar />
        </div>

        <main className="flex-1 flex flex-col h-full overflow-hidden relative md:border-l border-[#222222] w-full">
          <Topbar />
          <div className="flex-1 overflow-y-auto w-full">
            <div className="flex flex-col lg:flex-row lg:h-full">
              {/* Left side: Live Preview */}
              <div className="hidden lg:block lg:flex-1 lg:h-auto lg:min-h-0 p-4 md:p-6 lg:border-r border-[#222222] lg:overflow-y-auto mb-4 lg:mb-0 shrink-0">
                <LivePreview />
              </div>
              
              {/* Right side: Insights */}
              <div className="w-full lg:flex-1 p-4 md:p-6 space-y-6 md:space-y-8 min-h-0 lg:overflow-y-auto bg-[#111] pb-24">
                <CoreBusinessIdentity />
                <SeoContentHealth />
                <ConversionUxAudit />
                <CriticalWarnings />
                <ActionableImprovements />
                <CopyrightStrengths />
              </div>
            </div>
          </div>
        </main>
      </div>
    </PageWrapper>
  );
};

export default WebsiteAnalyzerDashboard;
