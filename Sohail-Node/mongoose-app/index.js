const express = require("express");
const app = express();

const db = require("./db");

// models
// const User = require('./models/User');
const Customer = require("./models/Customer");
const Order = require("./models/Order");

db();

// app.get('/', async (req, res) => {

//     // const newUser = new User();

//     // newUser.name = "Kamran Khan";
//     // newUser.email = "kamran@yahoo.com"

//     // await newUser.save();

//     // const user = await User.findById("63d00460b6d4b2085f3d2a1e");
//     // const user = await User.findOne({ email: "kamran@yahoo.com" })
//     // .select('-email');

//     const updatedUser = await User.findByIdAndUpdate("63d00460b6d4b2085f3d2a1e", { email: "kamrankhan@gmail.com" }, { new: true })

//     return res.json({ updatedUser })
// })

app.get("/", async (req, res) => {
  const orders = await Order.find().populate("customer", ["name", "email"]);

  return res.json(orders);
});

app.listen(3000);
