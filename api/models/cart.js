const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and add schema for shopping Cart
let Cart = new Schema(
  {
    state: {
      type: String,
      default: "active"
    },
    products: [
      {
        quantity: Number,
        title: String,
        price: Number
      }
    ]
  },
  {
    collection: "cart"
  }
);

module.exports = mongoose.model("Cart", Cart);
