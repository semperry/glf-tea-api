const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and add schema for subscriber emails
let Subcribers = new Schema(
  {
    email: {
      type: String,
      required: true
    }
  },
  {
    collection: "subscribers"
  }
);

module.exports = mongoose.model("Subscribers", Subcribers);
