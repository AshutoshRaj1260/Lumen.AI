import React, { useState, useRef, useEffect } from "react";
import "../style/newChat.scss";
import LumenGlow from "../../shared/components/LumenGlow";
import {
  RiSendPlaneFill,
  RiLinksFill,
  RiEarthLine,
  RiImageAiLine,
} from "@remixicon/react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { useNavigate } from "react-router";

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
      <LumenGlow />

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
            Your AI companion for everything!
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
