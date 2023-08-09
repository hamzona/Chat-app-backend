const chatController = require("../../controllers/chatsController");
const route = require("express").Router();

route.post("/createChat", chatController.createChat);
route.post("/allChats", chatController.getAllChats);
route.post("/getChat", chatController.getChat);
route.post("/createMessage", chatController.createMessage);

module.exports = route;
