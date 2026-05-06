import React, { useState, useRef, useEffect } from "react";
import "../style/newChat.scss";
import LumenGlow from "../../shared/components/LumenGlow";
import {
  RiSendPlaneFill,
  RiLinksFill,
  RiEarthLine,
  RiImageAiLine,
  RiArrowRightLine,
  RiGlobalLine,
  RiBarChartBoxLine,
} from "@remixicon/react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { Navigate, useNavigate } from "react-router";

const NewChat = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const { handleSendMessage } = useChat();
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const messageToSend = message.trim();
    if (!messageToSend) return;
    setMessage("");

    await handleSendMessage({
      message: messageToSend,
      chatId: null,
    });
  }

  return (
    <main className="main-container">
      {/* <LumenGlow /> */}

      <div className="top-header">
        <div className="model-name">
          <span>Lumen AI</span>
        </div>
        <div
          onClick={() => {
            navigate("/profile");
          }}
          className="user-profile"
        >
          <img
            src="https://ik.imagekit.io/6j5alarrgo/cohort-2_insta-clone-posts/test_FekhbKXu1?updatedAt=1772645089449"
            alt="User Profile"
            className="profile-img"
          />
        </div>
      </div>

      <div className="new-chat-container">
        <div className="header">
          <img
            src="https://ik.imagekit.io/6j5alarrgo/Screenshot_2026-04-07_114704-removebg-preview.png"
            alt=""
            className="logo"
          />
          <h1 className="greeting">
            Welcome to <span>Lumen.AI</span>{" "}
          </h1>
          <p className="subtext">
            Your AI companion for everything!{" "}
            <span>
              Generate images, get answers, and explore the world with Lumen.AI
              by your side. Fast and accurate responses, just a message away.
            </span>
          </p>
        </div>

        <div className="greeting-for-mobile">
          <h2 className="greeting">
            Glad to see you, <br /> <span>{user?.username || "User"} </span>!
            {/* {console.log(user)} */}
          </h2>
        </div>

        <section className="tools-container w-full max-w-4xl mx-auto mt-6 md:mt-12 px-4 z-10">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm md:text-md font-semibold text-white">
              Your Intelligent Tools
            </h3>
            <button className="text-[#fca311] hover:text-[#e59800] flex items-center gap-1 text-xs md:text-sm font-medium transition-colors cursor-pointer">
              View All <RiArrowRightLine size={16} />
            </button>
          </div>

          <div className="tools-wrapper grid grid-cols-1 gap-4">
            {/* Website Analyzer Card */}
            <div className="relative bg-[#111111] border border-white/5 rounded-2xl p-4 md:p-8 overflow-hidden group hover:border-white/10 transition-colors w-full flex items-center justify-between md:block">
              {/* Background Watermark Icon */}
              <RiGlobalLine
                className="absolute -right-10 -top-4 text-white/[0.03] group-hover:text-white/[0.05] transition-colors hidden md:block"
                size={220}
              />
              <RiGlobalLine
                className="absolute -right-2 -top-2 text-white/[0.03] group-hover:text-white/[0.05] transition-colors block md:hidden"
                size={100}
              />

              <div className="relative z-10 w-full flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start">
                <div className="flex items-center gap-3 md:gap-4 md:mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#222222] border border-white/10 flex items-center justify-center text-[#fca311]">
                    <RiBarChartBoxLine size={20} className="md:w-6 md:h-6 shrink-0" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-md md:text-xl font-semibold text-white tracking-tight">
                      Website Analyzer
                    </h4>
                    <p className="text-[#a0a0a0] text-[10px] md:hidden">Deep-scan and optimize</p>
                  </div>
                </div>

                <p className="hidden md:block text-[#a0a0a0] text-base leading-relaxed max-w-xl mb-8">
                  Get real-time performance, SEO, and accessibility insights for
                  any URL. Leverage our deep-scan engine to optimize your
                  digital presence instantly.
                </p>

                <div className="flex items-center gap-2 md:gap-4 shrink-0">
                  <button onClick={()=>{
                    navigate("/website-analyzer");
                  }} className="px-3 py-1.5 md:px-6 md:py-2.5 bg-[#ffba61] hover:bg-[#e5a045] text-black font-semibold rounded-lg md:rounded-xl text-xs md:text-base transition-colors cursor-pointer">
                    Analyze<span className="hidden md:inline"> Now</span>
                  </button>
                  <button className="hidden md:block px-6 py-2.5 bg-[#151515] border border-white/10 hover:bg-white/5 text-white font-medium rounded-xl text-base transition-colors cursor-pointer">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="input-container">
          <div className="input-wrapper">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <textarea
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                placeholder="Ask anything..."
                className="chat-input"
                onKeyDown={(e) => {
                  // console.log(e.key);
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              {message.trim() && (
                <div className="send-btn-wrapper">
                  <button type="submit" className="send-btn">
                    <RiSendPlaneFill />
                  </button>
                </div>
              )}
            </form>

            <div className="btn-wrapper">
              <button className=" button attatch-link-btn">
                <RiLinksFill size={18} />
              </button>
              <button className="button deep-search-btn">
                <RiEarthLine size={20} color="#8EEDF7" />
                <span>Deep Search</span>
              </button>
              <button className="button img-generator-btn">
                <RiImageAiLine size={18} color="#BED558" />
                <span>Image Generator</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default NewChat;
