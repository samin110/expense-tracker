const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const regitserUser = async (req, res) => {
  const { username, password, email } = req.body;

  const hashedPassword = await bcrypt.hash(password, process.env.SALT_PASSWORD);

  await User.create({
    email,
    password: hashedPassword,
    username,
  });

  res.status(201).json({ message: "User created ✔", data: req.body });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  const validatePassword = await bcrypt.compare(password, user?.password);

  if (validatePassword && user?.username) {
    const accessToken = jwt.sign(
      {
        user: {
          email,
          id,
        },
      },
      process.env.TOKEN_PRIVITE_KEY
    );

    return res.status(200).json({
      message: "user success login ✔",
      data: {
        accessToken,
        username: user.username,
        email: user?.email,
        id: user?.id,
      },
    });
  } else res.staus(400).json({ message: "User not found" });
};

const getCurrentUser = async (req, res) => {
  const user = User.findById({ id: req.user.id });

  res.status(200).json({ message: "Ok", data: user });
};

module.exports = { loginUser, regitserUser, getCurrentUser };
