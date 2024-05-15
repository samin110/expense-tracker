const mongoose = require("mongoose");

const costSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    date: Date,
    category: String,
    price: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cost", costSchema);
