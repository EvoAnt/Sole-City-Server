var express = require("express");
var router = express.Router();

const fileUploader = require("../config/cloudinary.config");

const mongoose = require("mongoose");

const User = require("../models/User");

const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/my-account", isAuthenticated, (req, res, next) => {
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    // Check if userId is a valid ObjectId
    return res.status(400).json({ error: "Invalid user ID" });
  }

  User.findById(userId)
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(404).json({ error: "User not found" });
      }

      const { _id, email, name, address, image } = foundUser;

      const userInfo = { _id, email, name, address, image };
      res.json(userInfo);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
      next(err);
    });
});

router.get("/my-account/edit", isAuthenticated, (req, res, next) => {
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    // Check if userId is a valid ObjectId
    return res.status(400).json({ error: "Invalid user ID" });
  }

  User.findById(userId)
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(404).json({ error: "User not found" });
      }

      const { _id, email, name, address, image, wishlist } = foundUser;
      console.log(foundUser)
      const userInfo = { _id, email, name, address, image, wishlist };
      res.json(userInfo);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
      next(err);
    });
});

router.put("/my-account/edit/:userId", isAuthenticated, (req, res, next) => {
  const userId = req.params.userId;
  const { name, address, image } = req.body;

  User.findByIdAndUpdate(userId, { name, address, image: image }, { new: true })
    .then(() => {
     return  User.findById(userId).populate("wishlist")
     
    }).then((updatedPopulated) =>  res.json(updatedPopulated))
    .catch((error) => {
      res.json(error);
    });
});

router.delete("/my-account/edit/:userId", isAuthenticated, (req, res, next) => {
  const userId = req.params.userId;

  User.findByIdAndRemove(userId)
    .then((deleted) => {
      res.json({
        deleted,
        message: `User ${userId} was removed successfully.`,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post(
  "/my-account/wishlist/:productId",
  isAuthenticated,
  (req, res, next) => {
    const { productId } = req.params;
    const userId = req.user._id;

    User.findByIdAndUpdate(
      userId,
      { $addToSet: { wishlist: productId } },
      { new: true }
    )
      .then((response) => {
        console.log(`${productId} added to wishlist`);
        res.json(response.data);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  }
);

router.post(
  "/my-account/wishlist/remove/:productId",
  isAuthenticated,
  (req, res, next) => {
    const { productId } = req.params;
    const userId = req.user._id;
    console.log('Product ID ==>', productId);
    User.findByIdAndUpdate(
      userId,
      { $pull: { wishlist: productId } },
      { new: true }
    )
      .then((response) => {
        console.log(`${productId} removed from wishlist`);
        res.json(response.data);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  }
);

router.post("/imageUpload", fileUploader.single("image"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  console.log("this is file", req.file);
  res.json({ image: req.file.path });
});

module.exports = router;
