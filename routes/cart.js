var express = require("express");
var router = express.Router();

const Cart = require("../models/Cart");
const Product = require("../models/Product");

const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/create", isAuthenticated, (req, res, next) => {
  Cart.create({
    owner: req.user._id,
    
  })
    .then((createdCart) => {
      Cart.findByIdAndUpdate(
        createdCart._id,
        {
          $push: { items: req.body },
        },
        { new: true }
      )
      .then((cart) => {
        console.log(cart);
        res.json(cart)
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
        next(err);
      });
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
      next(err);
    });
});

router.get("/", isAuthenticated, (req, res, next) => {
  const owner = req.user._id;

  Cart.find({ owner })
    .then((response) => {
      console.log(response);
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
      next(err);
    });
});

module.exports = router;
