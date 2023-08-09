const singupController = require("../controllers/singupController");
const route = require("express").Router();

route.post("/", singupController.hendleSingup);

module.exports = route;
