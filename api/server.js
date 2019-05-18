require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const mongoose = require("mongoose");
const teaRoutes = require("./routes/tea-routes");
const cartRoutes = require("./routes/cart-routes")
const subRoutes = require("./routes/subscription-routes")
const mailRoutes = require("./routes/mailer-routes")

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGOLAB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("You have successfully connected to the GLF Tea DBase");
  })
  .catch(error => {
    console.log("connection error", error);
  });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/tea", teaRoutes);
app.use("/cart", cartRoutes)
app.use("/subscribers", subRoutes)
app.use("/contact", mailRoutes)

app.listen(PORT, function() {
  console.log("Server is running on Port:", PORT);
});
