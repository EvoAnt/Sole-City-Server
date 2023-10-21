var express = require("express");
var router = express.Router();

const Cart = require("../models/Cart");
const Product = require('../models/Product');

const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/create", isAuthenticated, (req, res, next) => {
  Cart.create({ owner: req.user._id })
    .then((createdCart) => {
      res.json(createdCart);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
      next(err);
    });
});

module.exports = router;
