const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    wallet_balance:{type:String , default:"0"},
    email: { type: String, unique: true  ,default:undefined },
    password: String,
    username: { type: String, unique: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
