const express = require("express");
const SubRouter = express.Router();

// Model
let Subscriber = require("../models/subcribers");

// POST add one route
SubRouter.route("/add").post((request, response) => {
  let subscriber = new Subscriber(request.body);
  subscriber
    .save()
    .then(subscriber => {
      response.status(200).json("Successfully Subscribed " + subscriber.email);
    })
    .catch(error => {
      response.status(400).send(error);
    });
});

// GET All Request
SubRouter.route("/").get((request, response) => {
  Subscriber.find((error, subcribers) => {
    if (error) {
      console.log("GET route Error", error);
    } else {
      response.json(subcribers);
    }
  });
});

// GET One for duplicate entry validation
SubRouter.route("/:email").get((request, response) => {
  Subscriber.findOne({ email: request.params.email }, (error, subcribers) => {
    if (error) {
      console.log("GET route Error", error);
    } else {
      if (subcribers !== null){
      response.json(subcribers);
    } else {
      response.json("Email Not Found")
    }
    }
  });
});

// Delete route
SubRouter.route("/delete/:id").delete((request, response) => {
  Subscriber.findOneAndDelete({ _id: request.params.id }, (error, subscriber) => {
    if (error) {
      response.json("Unable to delete email", error);
    } else {
      response.json("Successfully deleted");
    }
  });
});

module.exports = SubRouter;
