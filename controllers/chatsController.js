const Chat = require("../models/ChatModel");

const createChat = async (req, res) => {
  const { name, recipients } = req.body;

  try {
    const newChat = await Chat.create({
      name,
      recipients,
      messages: [],
    });

    res.json(newChat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllChats = async (req, res) => {
  const { nickname } = req.body;

  try {
    const allChats = await Chat.find({
      recipients: { $elemMatch: { $eq: nickname } },
    });
    res.json(allChats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getChat = async (req, res) => {
  const { _id } = req.body;
  try {
    const findChat = await Chat.findOne({ _id });
    res.json(findChat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createMessage = async (req, res) => {
  const { message, nickname, _id } = req.body;
  console.log(req.body);
  try {
    const newMessageChat = await Chat.findOneAndUpdate(
      { _id },
      { $push: { messages: { content: message, nickname } } },
      { returnOriginal: false }
    );

    console.log(newMessageChat);
    res.json(newMessageChat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createChat, getAllChats, getChat, createMessage };
