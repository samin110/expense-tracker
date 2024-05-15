const express = require("express");
const costsRoute = require("./routes/costsRoute");
const userRoute = require("./routes/userRoute");

const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

// *** Costs
app.use("/api/costs", costsRoute);

// *** User
app.use("/api/user", userRoute);

mongoose
  .connect("mongodb://0.0.0.0:27017/test")
  .then(() => {
    console.log(12232);
  })
  .catch((error) => console.log(error));

app.listen(27017, () => {
  console.log("Server is running ✔");
});
