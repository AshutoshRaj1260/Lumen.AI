import React from "react";
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

const WebsiteAnalyzerDashboard = () => {
  return (
    <PageWrapper>
    <div className="flex h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative border-l border-[#222222]">
        <Topbar />
        <div className="flex-1 overflow-y-auto w-full">
          <div className="flex flex-col lg:flex-row h-full">
            {/* Left side: Live Preview */}
            <div className="flex-1 p-6 border-r border-[#222222] min-h-0 overflow-y-auto">
              <LivePreview />
            </div>
            
            {/* Right side: Insights */}
            <div className="flex-1 p-6 space-y-8 min-h-0 overflow-y-auto bg-[#111] pb-24">
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
