const jwt = require("jsonwebtoken");

const verifyAccessToken = async (req, res, next) => {
  const authHeaders = req.headers.authorization || req.headers.Authorization;
  if (!authHeaders?.startsWith("Berar ")) return res.sendStatus(401);
  const token = authHeaders.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    //console.log(decoded);
    next();
  });
};

module.exports = verifyAccessToken;
