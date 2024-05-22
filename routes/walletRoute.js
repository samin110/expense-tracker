const express = require("express");
const { increaseWalletBalance } = require("../controller/walletController");

const router = express.Router();

router.put("/increase/:id", increaseWalletBalance);

module.exports = router;
