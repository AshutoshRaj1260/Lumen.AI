const { generateResponse, generateTitle } = require("../services/ai.service");
const chatModel = require("../models/chat.model");
const messageModel = require("../models/message.model");

async function sendMessage(req, res) {
  const userMessage = req.body.message;
  const chatId = req.body.chatId;

  if (!userMessage) {
    return res.status(400).json({
      message: "Invalid Request",
      success: false,
      // error: "Message is required",
    });
  }

  let chat = null,
    title = null;

  if (!chatId) {
    title = await generateTitle(userMessage);

    chat = await chatModel.create({
      user: req.user._id,
      title: title,
    });
  }

  await messageModel.create({
    chat: chatId || chat._id,
    content: userMessage,
    role: "user",
  });

  const messages = await messageModel.find({
    chat: chatId || chat._id,
  });

  const aiMessage = await generateResponse(messages, req.body.socketId);

  // console.log(aiMessage);

  await messageModel.create({
    chat: chatId || chat._id,
    content: aiMessage,
    role: "AI",
  });

  return res.status(201).json({
    aiMessage,
    title,
    chat,
  });
}

async function getChats(req, res) {
  const user = req.user;

  const chats = await chatModel.find({
    user: user._id,
  });

  return res.status(200).json({
    message: "Chats fetched successfully",
    success: true,
    chats,
  });
}

async function getMessages(req, res) {
  const chatId = req.params.chatId;

  const chat = await chatModel.findOne({
    _id: chatId,
    user: req.user._id,
  });

  if (!chat) {
    return res.status(404).json({
      message: "Invalid Request",
      success: false,
      error: "Chat not found",
    });
  }

  const messages = await messageModel.find({
    chat: chatId,
  });

  return res.status(200).json({
    message: "Messages fetched successfully",
    success: true,
    messages,
  });
}

async function deleteChat(req, res) {
  const chatId = req.params.chatId;

  const chat = await chatModel.findOneAndDelete({
    _id: chatId,
    user: req.user._id,
  });

  if (!chat) {
    return res.status(404).json({
      message: "Invalid Request",
      success: false,
      error: "Chat not found",
    });
  }

  await messageModel.deleteMany({
    chat: chatId,
  });

  return res.status(200).json({
    message: "Chat deleted successfully",
    success: true,
  });
}

module.exports = {
  sendMessage,
  getChats,
  getMessages,
  deleteChat,
};
