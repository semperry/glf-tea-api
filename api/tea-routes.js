const express = require("express");
const TeaRoutes = express.Router();

// Model
let Tea = require("./tea-model");

// POST add one route
TeaRoutes.route("/add").post(function(request, response) {
  let tea = new Tea(request.body);
  tea
    .save()
    .then(tea => {
      response.status(200).json("Succesfull-tea added to the da-tea-base");
    })
    .catch(error => {
      response.status(400).send("unable to save to the database", error);
    });
});

// GET All Request
TeaRoutes.route("/").get(function(request, response) {
  Tea.find(function(error, teas) {
    if (error) {
      console.log("GET route Error", error);
    } else {
      response.json(teas);
    }
  });
});

// GET by ID Request
TeaRoutes.route("/:id").get(function(request, response) {
  let id = request.params.id;
  Tea.findById(id, function(err, tea) {
    response.json(tea);
  });
});

// Update route
TeaRoutes.route("/update/:id").post(function(request, response) {
  Tea.findById(request.params.id, function(error, tea) {
    if (!tea) {
      response.status(404).send("data is not found");
    } else {
      tea.title = request.body.title;
      tea.amount = request.body.amount;
      tea.vendor = request.body.vendor;
      tea.price = request.body.price;

      tea
        .save()
        .then(tea => {
          response.json("Updated successful-tea");
        })
        .catch(error => {
          response.status(400).send("unable to update the da-tea-base");
        });
    }
  });
});

// Delete route
TeaRoutes.route("/delete/:id").delete(function(request, response) {
  Tea.findByIdAndRemove({ _id: request.params.id }, function(
    error,
    tea
  ) {
    if (error) {
      response.json(error);
    } else {
      response.json("Successfully removed");
    }
  });
});

module.exports = TeaRoutes;
