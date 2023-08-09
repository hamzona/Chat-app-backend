const userController = require("../../controllers/getUsersController");

const route = require("express").Router();

route.get("/", userController.getAllUsers);

module.exports = route;
