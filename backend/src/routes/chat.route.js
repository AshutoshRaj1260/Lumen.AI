const express = require("express");
const chatController = require("../controllers/chat.controller");
const identifyUser = require("../middlewares/auth.middleware");

const chatRouter = express.Router();

chatRouter.post('/message', identifyUser, chatController.sendMessage)

chatRouter.get('/', identifyUser, chatController.getChats)

chatRouter.get('/:chatId/messages', identifyUser, chatController.getMessages)

chatRouter.delete('/delete/:chatId', identifyUser, chatController.deleteChat)


module.exports = chatRouter;