const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user.model");
const adminController = require("../controllers/admin.controller");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

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
    body("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Email cannot be empty"),
    body("role").contains("ADMIN").withMessage("Invalid request!"),
  ],
  adminController.createAdmin
);

router.put(
  "/userUpdate",
  [
    body("userId")
      .not()
      .isEmpty()
      .withMessage("UserId of user to be updated is required!"),
    body("changeObject")
      .not()
      .isEmpty()
      .isObject()
      .withMessage("Changes required!"),
  ],
  isAuth,
  adminController.putUpdateUser
);

module.exports = router;
