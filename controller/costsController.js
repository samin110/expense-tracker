const Cost = require("../models/costModel");
const User = require("../models/userModel");
const { getOneUserData } = require("../utils/user");

const createCost = async (req, res) => {
  const newCost = {
    user_id: req.user._id,
    ...req.body,
  };

  // create new cost
  await Cost.create(newCost);

  // update wallet_balance
  const user = await getOneUserData({ _id: req.user?._id });

  const walletBalance =
    Number(user?.wallet_balance) - Number(req?.body?.amount);

  await User.updateOne(
    { _id: req.user._id },
    { wallet_balance: walletBalance }
  );

  res.status(201).json({
    message: "تراکنش با موفقیت ثبت شد.",
    data: { newCost, wallet_balance: walletBalance },
  });
};

const getAllCosts = async (req, res) => {
  const costs = await Cost.find({ user_id: req.user._id });

  const calculateCosts = costs?.reduce((acc, current) => {
    return Number(acc) + Number(current?.amount);
  }, 0);

  const { wallet_balance } = await getOneUserData({ _id: req.user._id });

  res.status(200).json({
    message: "ok",
    data: { costs, amount_costs: calculateCosts, wallet_balance },
  });
};

module.exports = { createCost, getAllCosts };
