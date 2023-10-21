var express = require("express");
var router = express.Router();

const Product = require("../models/Product");

const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/all-products", (req, res, next) => {
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

router.post("/add-product", isAuthenticated, (req, res, next) => {
  const { brand, name, price, description, image } = req.body;

  Product.create({
    brand,
    name,
    price,
    description,
    image,
  })
    .then((createdProduct) => {
      console.log("Added Product ==>", createdProduct);
      res.json(createdProduct);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
      next(err);
    });
});

router.get("/:productId", (req, res, next) => {
  Product.findById(req.params.productId)
    .then((allProducts) => {
      res.json(allProducts);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.get("/edit/:productId", (req, res, next) => {
  Product.findById(req.params.productId)
    .then((allProducts) => {
      res.json(allProducts);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.put("/edit/:productId", (req, res, next) => {
  const { productId } = req.params;

  Product.findByIdAndUpdate(productId, req.body, { new: true })
    .then((updatedProduct) => {
      console.log("Updated ==>", updatedProduct);
      res.json(updatedProduct);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.delete("/edit/:productId", (req, res, next) => {
  const { productId } = req.params;

  Product.findByIdAndRemove(productId)
    .then((deleted) => {
      res.json({
        deleted,
        message: `Product ${productId} was removed successfully.`,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
