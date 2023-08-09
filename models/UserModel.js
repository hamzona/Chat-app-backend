const mongoose = require("mongoose");

const schema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  nickname: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String, required: true },
});

const model = mongoose.model("users", schema);

module.exports = model;
