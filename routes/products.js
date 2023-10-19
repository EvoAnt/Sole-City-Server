var express = require("express");
var router = express.Router();

const Product = require("../models/Product");

router.get("/", (res, req, next) => {
  Product.find()
    .then((foundProducts) => {
      console.log("All Products ==>", foundProducts);
      res.json(foundProducts);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
      next(err);
    });
});

router.post("/new-product", (req, res, next) => {
  const { brand, name, price, description, image } = req.body;

  Product.create({
    brand,
    name,
    price,
    description,
    image,
  })
    .then((createdProduct) => {
      console.log("New Product ==>", createdProduct);
      res.json(createdProduct);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
      next(err);
    });
});

module.exports = router;
