const User = require("../models/userModel");

const getOneUserData = async (type) => {
  const user = await User.findOne(type);

  if (!user) return null;

  return user;
};

module.exports = { getOneUserData };
