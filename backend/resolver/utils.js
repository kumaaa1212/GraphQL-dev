const jwt = require("jsonwebtoken");
require('dotenv').config()
function getTokenPayload(token) {
  return jwt.verify(token, process.env.APP_SECRET);
}
function getUerId(req, authToken) {
  if (req) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.replace("Bearer", "");
      if (!token) {
        throw new Error("AAAAA");
      }
      const { userId } = getTokenPayload(token);
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return userId;
  }
  throw new Error("認証権限がありません");
}
module.exports = {
  getUerId,
};


