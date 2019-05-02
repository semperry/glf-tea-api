const express = require("express");
const whiteTeaRoutes = express.Router();

// White_Tea Model
let White_Tea = require("./white-tea-model");

// POST add one route
whiteTeaRoutes.route("/add").post(function(request, response) {
  let whiteTea = new White_Tea(request.body);
  whiteTea
    .save()
    .then(whiteTea => {
      response.status(200).json("Succesfull-tea added to the da-tea-base");
    })
    .catch(error => {
      response.status(400).send("unable to save to the database", error);
    });
});

// GET All Request
whiteTeaRoutes.route("/").get(function(request, response) {
  White_Tea.find(function(error, whiteTeas) {
    if (error) {
      console.log("GET route Error", error);
    } else {
      response.json(whiteTeas);
    }
  });
});

// GET by ID Request
whiteTeaRoutes.route("/:id").get(function(request, response) {
  let id = request.params.id;
  White_Tea.findById(id, function(err, whiteTea) {
    response.json(whiteTea);
  });
});

// Update route
whiteTeaRoutes.route("/update/:id").post(function(request, response) {
  White_Tea.findById(request.params.id, function(error, whiteTea) {
    if (!whiteTea) {
      response.status(404).send("data is not found");
    } else {
      whiteTea.title = request.body.title;
      whiteTea.amount = request.body.amount;
      whiteTea.vendor = request.body.vendor;
      whiteTea.price = request.body.price;

      whiteTea
        .save()
        .then(whiteTea => {
          response.json("Updated successful-tea");
        })
        .catch(error => {
          response.status(400).send("unable to update the da-tea-base");
        });
    }
  });
});

// Delete route
whiteTeaRoutes.route("/delete/:id").delete(function(request, response) {
  White_Tea.findByIdAndRemove({ _id: request.params.id }, function(
    error,
    whiteTea
  ) {
    if (error) {
      response.json(error);
    } else {
      response.json("Successfully removed");
    }
  });
});

module.exports = whiteTeaRoutes;
