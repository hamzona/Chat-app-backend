const User = require("../models/UserModel");

const getAllUsers = async (req, res) => {
  try {
    const allUser = await User.find();
    res.json(allUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllUsers };
