var express = require("express");
var router = express.Router();

const Cart = require("../models/Cart");
const Product = require("../models/Product");

const isAuthenticated = require("../middleware/isAuthenticated");

// POST /cart/add-item/:userId - Add an item to the user's cart
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
          total
        });
        cart.total = cart.items.reduce((acc, curr) => {
          return acc + curr.quantity * curr.price;
        }, 0);
      }
      // // Save the updated cart
      return cart.save();
    })
    .then((updatedCart) => {
      console.log('Updated Cart ==>', updatedCart);
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

router.post('/update-quantity/:thisItemId/:cartId', isAuthenticated, async (req, res, next) => {
  const { thisItemId, cartId } = req.params;

  const { quantity } = req.body;

  try {

    let thisCart = await Cart.findById(cartId)
    let thisItem = thisCart.items.find((item) => item.itemId.toString() === thisItemId)
    thisItem.quantity = quantity
    thisCart.total = thisCart.items.reduce((acc, curr) => {
      return acc + curr.quantity * curr.price;
    }, 0);

    let updatedCart = await thisCart.save()

    console.log("Cart after quantity", updatedCart)

    res.json(updatedCart)

  } catch(err) {
    console.log(err)
    res.json(err)
  }
})

router.get('/remove-item/:thisItemId/:cartId', isAuthenticated, async (req, res, next) => {

  const { thisItemId, cartId } = req.params;

  try {
    let thisCart = await Cart.findById(cartId)
    thisCart.items = thisCart.items.filter((item) => item.itemId.toString() !== thisItemId)
    thisCart.total = thisCart.items.reduce((acc, curr) => {
      return acc + curr.quantity * curr.price;
    }, 0);

    let updatedCart = await thisCart.save()
    console.log("Cart after delete", updatedCart)

    res.json(updatedCart)
  } catch(err) {
    console.log(err)
    res.json(err)
  }


})


module.exports = router;
