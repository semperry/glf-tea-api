const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and add schema for White Tea
let White_Tea = new Schema(
  {
    title: {
      type: String
    },
    amount: {
      type: String
    },
    vendor: {
      type: String
    },
    price: {
      type: Number
    }
  },
  {
    collection: "white_tea"
  }
);

module.exports = mongoose.model("White_Tea", White_Tea);
