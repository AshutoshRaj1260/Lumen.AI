import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    messages: [],
    currentChatId: null,
    isLoading: false,
    error: null,
  },
  reducers:{
    setChats:(state, action)=>{
        state.chats = action.payload
    },
    setMessages:(state, action)=>{
        state.messages = action.payload
    },
    addMessage:(state, action)=>{
        state.messages.push(action.payload)
    },
    appendChunk:(state, action)=>{
        if (state.messages.length > 0) {
            state.messages[state.messages.length - 1].content += action.payload;
        }
    },
    setCurrentChatId:(state, action)=>{
        state.currentChatId = action.payload
    },
    setIsloading:(state, action)=>{
        state.isLoading = action.payload
    },
    setError:(state, action)=>{
        state.error = action.payload
    }

  }
});

export const {setChats, setMessages, addMessage, appendChunk, setCurrentChatId, setIsloading, setError } = chatSlice.actions
export default chatSlice.reducer