const express = require("express");
const CartRouter = express.Router();

// Model
let Cart = require("../models/cart");

// POST add one route
CartRouter.route("/add").post((request, response) => {
  let cart = new Cart(request.body);
  cart
    .save()
    .then(cart => {
      response.status(200).json(cart._id);
    })
    .catch(error => {
      response.status(400).send(error);
    });
});

// GET All Request
CartRouter.route("/").get((request, response) => {
  Cart.find((error, carts) => {
    if (error) {
      console.log("GET route Error", error);
    } else {
      response.json(carts);
    }
  });
});

// GET by ID Request
CartRouter.route("/:id").get((request, response) => {
  let id = request.params.id;
  Cart.findById(id, (err, cart) => {
    response.json(cart);
  });
});

// Update route
CartRouter.route("/update/:id").post((request, response) => {
  Cart.findById(request.params.id, (error, cart) => {
    if (!cart) {
      response.status(404).send("cart not found");
    } else {
      cart.state = request.body.state;
      cart.products = request.body.products;

      cart
        .save()
        .then(cart => {
          response.json("Updated cart successfully" +" " + cart);
        })
        .catch(error => {
          response.status(400).send("unable to update the cart" +" " + error);
        });
    }
  });
});

// Delete route
CartRouter.route("/delete/:id").delete((request, response) => {
  Cart.findOneAndDelete({ _id: request.params.id }, (error, cart) => {
    if (error) {
      response.json("Unable to delete cart", error);
    } else {
      response.json("Successfully deleted");
    }
  });
});

module.exports = CartRouter;
