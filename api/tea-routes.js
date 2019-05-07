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
TeaRoutes.route("/").get((request, response) => {
  Tea.find((error, teas) => {
    if (error) {
      console.log("GET route Error", error);
    } else {
      response.json(teas);
    }
  });
});

// GET white tea-collection Request
TeaRoutes.route("/collection/white-tea").get((request, response) => {
  Tea.find({category: "White Tea"}, (error, teas) => {
      response.json(teas);
  });
});

// GET black tea-collection Request
TeaRoutes.route("/collection/black-tea").get((request, response) => {
  Tea.find({category: "Black Tea"}, (error, teas) => {
      response.json(teas);
  });
});

// GET by ID Request
TeaRoutes.route("/:id").get(function(request, response) {
  let id = request.params.id;
  Tea.findById(id, (err, tea) => {
    response.json(tea);
  });
});

// Update route
TeaRoutes.route("/update/:id").put((request, response) => {
  Tea.findById(request.params.id, function(error, tea) {
    if (!tea) {
      response.status(404).send("data is not found");
    } else {
      tea.title = request.body.title;
      tea.units = request.body.units;
      tea.vendor = request.body.vendor;
      tea.price = request.body.price;
      tea.qty = request.body.qty;
      tea.description = request.body.description;
      tea.category = request.body.category;
      featured_image.featured_image = request.body.featured_image 
      thumb_image = request.body.thumb_image
      secondary_image = request.body.secondary_image

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
  Tea.findByIdAndRemove({ _id: request.params.id }, function(error, tea) {
    if (error) {
      response.json(error);
    } else {
      response.json("Successfully removed");
    }
  });
});

module.exports = TeaRoutes;