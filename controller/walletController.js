const { getOneUserData } = require("../utils/user");
const User = require("../models/userModel");

const increaseWalletBalance = async (req, res) => {
  const userId = req.params.id;
  const walletBalance = req.body.wallet_balance;

  const user = await getOneUserData({ _id: userId });

  if (!user)
    return res.status(404).json({ message: "کاربر مورد نظر وجود ندارد !" });

  await User.updateOne(
    { _id: userId },
    { wallet_balance: Number(user?.wallet_balance) + Number(walletBalance) }
  );

  const updatedUser = await getOneUserData({ _id: userId });

  return res
    .status(200)
    .json({ message: "کیف پول شارژ شد.", data: { updatedUser } });
};

module.exports = { increaseWalletBalance };
