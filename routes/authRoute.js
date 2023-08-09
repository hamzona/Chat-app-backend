const loginController = require("../controllers/authController");
const route = require("express").Router();

route.post("/", loginController.hendleLogin);

module.exports = route;
