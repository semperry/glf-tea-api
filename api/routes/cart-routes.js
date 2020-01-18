// TODO:
// Check if item exists before adding to cart
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
      response.status(200).json(cart);
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

// Add to cart route
CartRouter.route("/add-to-cart/:id").patch((request, response) => {
  Cart.updateOne(
    { _id: request.params.id },
    {
      $push: {
        products: request.body.product
      }
    },
    (err, result) => {
      if (err) {
        response.status(400).send(err);
      } else {
        response.json("Updated cart successfully");
      }
    }
  );
});

// Update cart item qty
CartRouter.route("/update-qty/:id").patch((req, res) => {
  Cart.updateOne(
    {
      _id: req.params.id,
      "products._id": req.body._id
    },
    {
      $set: {
        "products.$.quantity": req.body.quantity
      }
    },
    (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json(`Updated cart successfully: ${result}`);
      }
    }
  );
});

// Delete item from cart
CartRouter.route("/remove-from-cart/:id").patch((req, res) => {
  Cart.updateOne(
    {
      _id: req.params.id
    },
    {
      $pull: {
        products: { _id: req.body._id }
      }
    },
    (err, result) => {
      if (err) {
        res.status(404).send("No item found " + err);
      } else {
        res.status(200).send("Item Deleted");
      }
    }
  );
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
