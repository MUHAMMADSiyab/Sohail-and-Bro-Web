const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  amount: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  customer: {
    type: mongoose.Types.ObjectId,
    ref: "Customer",
  },
});

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;
