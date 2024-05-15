const jwt = require("jsonwebtoken");

const verifyAccessToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "User not autorized" });

  const extractedToken = token.split(" ")[1];

  jwt.verify(extractedToken, process.env.TOKEN_PRIVATE_KEY, (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "User don't have permission !" });

    req.user = decoded.user;
    next();
  });
};

module.exports = { verifyAccessToken };
