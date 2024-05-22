const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const token = jwt.sign(
    {
      user: payload,
    },
    process.env.TOKEN_PRIVATE_KEY
  );

  return token;
};

module.exports = { generateToken };
