const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String },
  recipients: { type: Array },
  messages: { type: Array },
});

const model = mongoose.model("chats", schema);

module.exports = model;
