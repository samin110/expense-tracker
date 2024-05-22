const express = require("express");
const costsRoute = require("./routes/costsRoute");
const userRoute = require("./routes/userRoute");
const walletRoute = require("./routes/walletRoute");

const cors = require("cors");

const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
// *** Costs
app.use("/api/costs", costsRoute);

// *** User
app.use("/api/user", userRoute);

// *** Wallet
app.use("/api/wallet", walletRoute);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((error) => console.log(error.message));

app.listen(8000, () => {
  console.log("Server is running ✔");
});
