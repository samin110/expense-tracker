const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");
const { getOneUserData } = require("../utils/user");

const registerUser = async (req, res) => {
  const { username, password, email } = req.body;

  const user = await getOneUserData({ username });

  if (user?.username)
    return res.status(400).json({ message: "این حساب کاربری قبلا ثبت شده !" });

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    email,
    password: hashedPassword,
    username,
  });

  const createdUser = await getOneUserData({ username });

  const accessToken = await generateToken({ _id: createdUser?._id, username });

  res.status(201).json({
    message: "User created ✔",
    data: {
      email: createdUser.email,
      username: createdUser.username,
      wallet_balance: "0",
      accessToken,
    },
  });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user)
    return res.status(404).json({ message: "حساب کاربری اشتباه است !" });

  const validatePassword = await bcrypt.compare(password, user?.password);

  if (validatePassword && user?.username) {
    const accessToken = await generateToken({
      _id: user?._id,
      username: user?.username,
    });

    return res.status(200).json({
      message: "user success login ✔",
      data: {
        accessToken,
        username: user.username,
        email: user?.email,
        id: user?.id,
      },
    });
  } else res.status(400).json({ message: "رمز عبور اشتباه است  !" });
};

const getCurrentUser = async (req, res) => {
  const user = await User.findById({ _id: req.user._id });

  res.status(200).json({ message: "Ok", data: user });
};

module.exports = { loginUser, registerUser, getCurrentUser };
