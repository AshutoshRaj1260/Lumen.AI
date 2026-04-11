import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { useEffect } from "react";
import "../style/dashboard.scss";
import { RiEditBoxLine, RiLogoutBoxLine, RiMenuLine } from "@remixicon/react";
import OngoingChat from "../components/OngoingChat";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router";
import NewChat from "../components/NewChat";

const Dashboard = () => {
  const navigate = useNavigate();
  const chat = useChat();
  
  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const isChatActive = useSelector((state) => !!state.chat.currentChatId || state.chat.messages.length > 0);

  const {
    handleGetChats,
    handleGetMessages,
    handleNewChat,
  } = useChat();

  const { handleLogout } = useAuth();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  useEffect(() => {
    chat.initializeSocketConnection();
    handleGetChats();
  }, []);

  useEffect(() => {
    if (chats.length > 0 && !currentChatId) {
      handleGetMessages(currentChatId || chats[chats.length - 1]._id);
    }
  }, [chats]);

  async function handleChatMessages(chatId) {
    await handleGetMessages(chatId);
  }

  async function logoutHandler() {
    await handleLogout();
    navigate("/login");
  }

  return (
    <>
      <main className="app-container">
        <button
          className={`hamburger-btn ${isSidebarOpen ? "open" : "closed"} `}
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
            // console.log(isSidebarOpen);
          }}
        >
          <RiMenuLine />
        </button>
        <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
          <div className="sidebar-header">
            <button className="new-chat-btn" onClick={()=>{
              handleNewChat();

              {window.innerWidth <= 768 && setIsSidebarOpen(false)}
            }}>
              <RiEditBoxLine />
              New Chat
            </button>
          </div>

          <div className="chat-history">
            <p>Recent Chats</p>
            <div className="older-chats">
              <ul>
                {chats.toReversed().map((chat) => {
                  return (
                    <li
                      onClick={() => {
                        handleChatMessages(chat._id);
                      }}
                      key={chat._id}
                      className={`chat-item ${currentChatId === chat._id ? "active" : ""}`}
                    >
                      {chat.title.length > 30
                        ? chat.title.substring(8, 42) + "..."
                        : chat.title}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="sidebar-footer">
            {/* <button className="button">Settings</button> */}
            <button className="sign-out-button" onClick={logoutHandler}>
              <RiLogoutBoxLine size={20} />
              Sign out
            </button>
          </div>
        </aside>

        {isSidebarOpen && (
          <div className="overlay" onClick={() => setIsSidebarOpen(false)} />
        )}

        {isChatActive ? (
          <OngoingChat />
        ) : (
          <NewChat />
        )}
      </main>
    </>
  );
};

export default Dashboard;
