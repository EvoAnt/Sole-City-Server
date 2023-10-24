var express = require("express");
var router = express.Router();

var stripe = require("stripe")(process.env.STRIPE);

const Cart = require("../models/Cart");
const Product = require("../models/Product");

const isAuthenticated = require("../middleware/isAuthenticated");

//Add an item to the user's cart
router.post("/add-item/:userId", isAuthenticated, (req, res) => {
  const { userId } = req.params;
  const { itemId, quantity, price, name, image, size, total } = req.body;
  // console.log(name, image);
  Cart.findOne({ owner: userId })
    .then((cart) => {
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      const item = cart.items.find((item) => String(item.itemId) === itemId);
      console.log("here", itemId, item);
      if (item) {
        // Item already exists in the cart; update its quantity
        const requestedQuantity = req.body.quantity || 1; // Use the quantity from the request body, or default to 1
        cart.items.find((item) => String(item.itemId) === itemId).quantity +=
          requestedQuantity;
      } else {
        // Item doesn't exist in the cart; add it with the requested quantity
        cart.items.push({
          itemId,
          name,
          image,
          quantity,
          price,
          size,
          total,
        });
        cart.total = cart.items.reduce((acc, curr) => {
          return acc + curr.quantity * curr.price;
        }, 0);
      }
      // // Save the updated cart
      return cart.save();
    })
    .then((updatedCart) => {
      console.log("Updated Cart ==>", updatedCart);
      res.status(200).json(updatedCart);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// View the users cart
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

//Update the users cart/quantity/total
router.post(
  "/update-quantity/:thisItemId/:cartId",
  isAuthenticated,
  async (req, res, next) => {
    const { thisItemId, cartId } = req.params;

    const { quantity } = req.body;

    try {
      let thisCart = await Cart.findById(cartId);
      let thisItem = thisCart.items.find(
        (item) => item.itemId.toString() === thisItemId
      );
      thisItem.quantity = quantity;
      thisCart.total = thisCart.items.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
      }, 0);

      let updatedCart = await thisCart.save();

      console.log("Cart after quantity", updatedCart);

      res.json(updatedCart);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
);

//Remove item from cart
router.get(
  "/remove-item/:thisItemId/:cartId",
  isAuthenticated,
  async (req, res, next) => {
    const { thisItemId, cartId } = req.params;

    try {
      let thisCart = await Cart.findById(cartId);
      thisCart.items = thisCart.items.filter(
        (item) => item.itemId.toString() !== thisItemId
      );
      thisCart.total = thisCart.items.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
      }, 0);

      let updatedCart = await thisCart.save();
      console.log("Cart after delete", updatedCart);

      res.json(updatedCart);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
);

//Stripe API checkout
router.post("/checkout", isAuthenticated, (req, res, next) => {
  // const items = req.body.items;

  // if (!Array.isArray(items) || items.length === 0) {
  //   return res.status(400).json({ error: "Invalid or empty items array" });
  // }

  const calcTotal = Number((req.body.total * 100).toFixed(2));

  const lineItems = [
    {
      price_data: {
        currency: "usd",
        unit_amount: calcTotal,
        product_data: {
          name: "sole city purchase",
        },
      },
      quantity: 1,
    },
  ];

  stripe.checkout.sessions
    .create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.REACT_APP_URI}/success`,
      cancel_url: `${process.env.REACT_APP_URI}/cart`,
    })
    .then((session) => {
      res.json({ url: session.url });
    })
    .catch((error) => {
      console.error("Error creating checkout session:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

//Clear the user's entire cart
router.post("/clear/:cartId", isAuthenticated, (req, res) => {
  const { cartId } = req.params;

  // Find the cart by ID and set its items to an empty array and total to 0
  Cart.findById(cartId)
    .then((cart) => {
      console.log('Cart being cleared', cart);
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      cart.items = [];
      cart.total = 0;

      return cart.save();
    })
    .then((clearedCart) => {
      console.log("Cart cleared:", clearedCart);
      res.status(200).json(clearedCart);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});
module.exports = router;
