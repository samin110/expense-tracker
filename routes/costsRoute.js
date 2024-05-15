const express = require("express");
const { createCost } = require("../controller/costsController");

const router = express.Router();

//@ POST Method ==> create new cost
router.post("/create_cost", createCost);

//@ GET Method ===> get all costs
router.get("/costs", (req, res) => {
  res.status(200).json({ message: "ok" });
});

module.exports = router;
