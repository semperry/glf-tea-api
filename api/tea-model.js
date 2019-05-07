const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and add schema for Tea
let Tea = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    units: {
      type: String
    },
    vendor: {
      type: String
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String
    },
    qty: {
      type: Number,
      required: true
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
      type: String,
      required: true
    }
  },
  {
    collection: "tea"
  }
);

module.exports = mongoose.model("Tea", Tea);
