var express = require("express");
var router = express.Router();

const User = require("../models/User");

const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/my-account/:userId", isAuthenticated, (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)

    .then((foundUser) => {
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

module.exports = router;
