const express = require("express");
const { createCost, getAllCosts } = require("../controller/costsController");
const { verifyAccessToken } = require("../middleware/verifyAccessToken");

const router = express.Router();

//@ POST Method ==> create new cost
router.post("/create", verifyAccessToken, createCost);

//@ GET Method ===> get all costs
router.get("/", verifyAccessToken, getAllCosts);

module.exports = router;
