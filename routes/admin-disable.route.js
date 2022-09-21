const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user.model");
const adminDisableController = require("../controllers/admin-disable.controller");

const router = express.Router();

router.post(
  "/user",
  [
    body("username")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Username is required!")
      .custom((value, { req }) => {
        return User.findOne({ username: value }).then((userDoc) => {
          if (!userDoc) {
            return Promise.reject("User Not Found!");
          }
        });
      }),
  ],
  adminDisableController.disableUser
);

module.exports = router;
