const route = require("express").Router();
const refreshController = require("../controllers/refreshTokenController");

route.get("/", refreshController.hendleRefreshToken);

module.exports = route;
