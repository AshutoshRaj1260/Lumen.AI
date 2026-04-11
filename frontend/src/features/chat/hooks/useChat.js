import { initializeSocketConnection, getSocketId, onChunk } from "../services/chat.socket";
import { sendMessage, getChats, getMessages, deleteChat } from "../services/chat.api";
import { setChats, setMessages, addMessage, appendChunk, setCurrentChatId, setIsloading, setError } from "../chat.slice";
import { useDispatch } from "react-redux";
import { store } from "../../../app/app.store";

export const useChat = () => {

  const dispatch = useDispatch();

  async function handleSendMessage({message, chatId}){
    dispatch(setIsloading(true));
    dispatch(addMessage({content: message, role: 'user'}));
    dispatch(addMessage({content: '', role: 'AI'})); // Stub for chunking
    
    // Set socket listner
    onChunk((token) => dispatch(appendChunk(token)));

    try {
      const response = await sendMessage({message, chatId, socketId: getSocketId()});
      if (response.title && response.chat) {
        const { chats } = store.getState().chat;
        // new chat
        dispatch(setChats([...chats, response.chat]));
        dispatch(setCurrentChatId(response.chat._id));
        // clear old messages
        dispatch(setMessages([{content: message, role: 'user'}, {content: response.aiMessage, role: 'AI'}]));
      }
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message));
    } finally {
      dispatch(setIsloading(false));
    }
  }

  async function handleGetChats(){
    dispatch(setIsloading(true));
    try {
      const response = await getChats();
      dispatch(setChats(response.chats));
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message));
    } finally {
      dispatch(setIsloading(false));
    }
  }

  async function handleGetMessages(chatId){
    dispatch(setIsloading(true));
    try {
      const response = await getMessages(chatId);
      dispatch(setMessages(response.messages));
      dispatch(setCurrentChatId(chatId));
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message));
    } finally {
      dispatch(setIsloading(false));
    }
  }

  async function handleDeleteChat(chatId){
    dispatch(setIsloading(true));
    try {
      await deleteChat(chatId);
      const { chats, currentChatId } = store.getState().chat;
      dispatch(setChats(chats.filter(c => c._id !== chatId)));
      if (currentChatId === chatId) {
        dispatch(setCurrentChatId(null));
        dispatch(setMessages([]));
      }
    } catch (err) {
      dispatch(setError(err.response?.data?.message || err.message));
    } finally {
      dispatch(setIsloading(false));
    }
  }

  async function handleNewChat(){
    dispatch(setCurrentChatId(null));
    dispatch(setMessages([]));
  }

  return {
    initializeSocketConnection,
    handleSendMessage,
    handleGetChats,
    handleGetMessages,
    handleDeleteChat,
    handleNewChat,
  };
};
