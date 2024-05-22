const mongoose = require("mongoose");

const costSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    title: String,
    description: String,
    date: { type: Date, default: Date.now() },
    category: String,
    amount: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("cost", costSchema);
