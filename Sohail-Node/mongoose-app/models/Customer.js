const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
});

const CustomerModel = mongoose.model("Customer", CustomerSchema);

module.exports = CustomerModel;
