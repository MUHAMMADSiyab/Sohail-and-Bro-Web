const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Unauthenticated" });
  }

  try {
    const decodedToken = jwt.verify(token, "mysecretkey");

    req.user = decodedToken.user;

    next();
  } catch (error) {
    return res.status(500).json({ msg: "Invalid or expired auth token" });
  }
};
