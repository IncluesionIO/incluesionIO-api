const express = require('express')
const { body } = require("express-validator/check");

const User = require("../models/user.model");
const userController = require("../controllers/user.controller");

const router = express.Router()

router.post(
  "/create",
  [
    body("username")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Username is required!")
      .custom((value, { req }) => {
        return User.findOne({ username: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Username already in use!");
          }
        });
      }),
    body("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Password is required!")
      .isLength({ min: 8 })
      .withMessage("Password must be greater than 8 characters!"),
    body("name").not().isEmpty().withMessage("Name cannot be empty!"),
    body("email").not().isEmpty().withMessage("Email cannot be empty"),
    body("role").contains("USER").withMessage("Invalid request!"),
  ],
  userController.createUser
);

module.exports = router