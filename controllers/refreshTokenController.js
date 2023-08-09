const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const hendleRefreshToken = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.sendStatus(403);

  const refreshToken = cookie.jwt;

  const findUser = await User.findOne({ refreshToken });
  if (!findUser) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);

    const accessToken = jwt.sign(
      { nickname: decoded.nickname },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );

    res.json({ accessToken, user: decoded.nickname });
  });
};

module.exports = { hendleRefreshToken };
