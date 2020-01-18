// TODO: Child schema for products
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and add schema for shopping Cart
let Cart = new Schema({
  state: {
    type: String,
    default: "active"
  },
  products: {
    type: Array
  }
});

module.exports = mongoose.model("cart", Cart);
