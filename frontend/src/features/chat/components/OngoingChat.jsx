import React, { useMemo, useState, useRef, useEffect } from "react";
import { RiSendPlaneFill } from "@remixicon/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { useNavigate} from "react-router";

const OngoingChat = () => {

  const navigate = useNavigate();

  const messages = useSelector((state) => state.chat.messages);
  const isLoading = useSelector((state) => state.chat.isLoading);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const aiTyping = useSelector((state) => state.chat.aiTyping);

  const { handleSendMessage } = useChat();
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentChatId]);

  async function handleSubmit(e) {
    e.preventDefault();
    const messageToSend = message.trim();
    if (!messageToSend) return;
    setMessage("");

    await handleSendMessage({
      message: messageToSend,
      chatId: currentChatId,
    });
  }

  const memoizedChatHistory = useMemo(() => {
    return messages.map((message, index) => {
      return (
        <div key={index} className={`message ${message.role}`}>
          <div className="message-content prose prose-invert max-w-none prose-orange leading-relaxed">
            {message.role === "AI" ? (
              <div className="ai-msg-wrapper">
                <img
                  src="https://ik.imagekit.io/6j5alarrgo/Screenshot_2026-04-07_114704-removebg-preview.png"
                  alt=""
                  className="logo"
                />

                <div className="ai-msg-content">
                  {" "}
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ) : (
              message.content
            )}
          </div>
        </div>
      );
    });
  }, [messages]);

  return (
    <main className="main-container relative overflow-hidden">
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

      <div className="chat-container">
        <div className="messages-container">
          {memoizedChatHistory}
          {isLoading && (
            <div className="ai-msg-loading animate-pulse">
              <span>Lumen is typing...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <footer className="input-container">
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
        </div>
        <p className="disclaimer">
          Lumen.AI may display inaccurate info, including about people, so
          double-check its responses.
        </p>
      </footer>
    </main>
  );
};

export default OngoingChat;
