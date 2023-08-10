const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hendleLogin = async (req, res) => {
  const { nickname, password } = req.body;

  const cookie = req.cookies;

  const findUser = await User.findOne({ nickname });
  if (!findUser) return res.sendStatus(401);

  const match = await bcrypt.compare(password, findUser.password);
  if (!match) return res.sendStatus(401);

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
        expiresIn: "24h",
      }
    );

    const newUserRefreshToken = await User.findOneAndUpdate(
      {
        nickname,
      },
      { $set: { refreshToken: refreshToken } },
      { returnOriginal: false }
    );

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
    res.json({ accessToken, user: findUser.nickname });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { hendleLogin };
