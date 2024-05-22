const express = require("express");
const {
  loginUser,
  registerUser,
  getCurrentUser,
} = require("../controller/userController");
const { verifyAccessToken } = require("../middleware/verifyAccessToken");

const router = express.Router();

router.post("/login", loginUser);

router.post("/register", registerUser);

router.get("/current_user", verifyAccessToken, getCurrentUser);

module.exports = router;
