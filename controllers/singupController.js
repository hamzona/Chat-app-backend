const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hendleSingup = async (req, res) => {
  const cookie = req.cookies;
  const { firstname, lastname, nickname, password } = req.body;
  const duplicate = await User.findOne({ nickname });

  if (duplicate) return res.sendStatus(409);

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const accessToken = jwt.sign(
      { nickname },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "10s",
      }
    );

    const refreshToken = jwt.sign(
      { nickname },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "30m",
      }
    );

    const newUser = await User.create({
      firstname,
      lastname,
      nickname,
      password: hashedPassword,
      refreshToken,
    });

    if (cookie?.jwt) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
    }

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ nickname: newUser.nickname, accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { hendleSingup };
