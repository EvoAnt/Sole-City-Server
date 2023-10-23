var express = require("express");
var router = express.Router();

const Cart = require("../models/Cart");
const Product = require("../models/Product");

const isAuthenticated = require("../middleware/isAuthenticated");

// POST /cart/add-item/:userId - Add an item to the user's cart
router.post("/add-item/:userId", isAuthenticated, (req, res) => {
  const { userId } = req.params;
  const { itemId, quantity, price, name, image } = req.body;
  console.log(name, image)
  Cart.findOne({ owner: userId })
    .then((cart) => {
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      const item = cart.items.find((item) => String(item.itemId) === itemId)
      console.log("here bruv", itemId, item)
      if(item){
        cart.items.find((item)=> String(item.itemId )=== itemId).quantity += 1
      }else{
        cart.items.push({
              itemId,
              name, 
              image,
              quantity,
              price,
            });
            cart.total = cart.items.reduce((acc, curr) => {
              return acc + curr.quantity * curr.price;
            }, 0);
      }
      // const itemIndex = cart.items.findIndex((item) => item._id == itemId);
      // if (itemIndex > -1) {
      //   // If the product already exists in the cart, update its quantity
      //   const product = cart.items[itemIndex];
      //   product.quantity += 1;
      //   cart.total = cart.items.reduce((acc, curr) => {
      //     return acc + curr.quantity * curr.price;
      //   }, 0);
      //   cart.items[itemIndex] = product;
      // } else {
      //   // If the product doesn't exist, add it to the cart
      //   cart.items.push({
      //     itemId,
      //     name, 
      //     image,
      //     quantity,
      //     price,
      //   });
      //   cart.total = cart.items.reduce((acc, curr) => {
      //     return acc + curr.quantity * curr.price;
      //   }, 0);
      // }
      // // Save the updated cart
      return cart.save();
    })
    .then((updatedCart) => {
      res.status(200).json(updatedCart);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
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
