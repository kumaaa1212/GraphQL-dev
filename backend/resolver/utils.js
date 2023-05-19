const jwt = require("jsonwebtoken");
APP_SECRET = "GraphQL-is-aw3some";
function getTokenPayload(token) {
  return jwt.verify(token, APP_SECRET);
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
  APP_SECRET,
};


