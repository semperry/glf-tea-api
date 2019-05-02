const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 4000;
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./DB");
const whiteTeaRoute = require("./white-tea-routes");

mongoose.Promise = global.Promise;
mongoose
  .connect(config.DB, { useNewUrlParser: true })
  .then(() => {
    console.log("You have successfully connected to the GLF Tea DBase");
  })
  .catch(error => {
    console.log("connection error", error);
  });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/white-tea', whiteTeaRoute)

app.listen(PORT, function() {
  console.log("Server is running on Port:", PORT);
});
