const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and add schema for Tea
let Tea = new Schema(
  {
    title: {
      type: String
    },
    units: {
      type: String
    },
    vendor: {
      type: String
    },
    price: {
      type: Number
    },
    description: {
      type: String
    },
    qty: {
      type: Number
    },
    featured_image: {
      type: String
    },
    thumb_image: {
      type: String
    },
    secondary_image: {
      type: String
    },
    category: {
      type: String
    }
  },
  {
    collection: "tea"
  }
);

module.exports = mongoose.model("Tea", Tea);
