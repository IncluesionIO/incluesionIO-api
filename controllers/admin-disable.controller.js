//Controller for admin disabling routes
const { validationResult } = require("express-validator");

//Import the user model
const User = require("../models/user.model");

exports.disableUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.httpStatus = 422;
    error.data = errors.array();
    throw error;
  }

  User.find({ username: req.body.username })
    .then((userDisabled) => {
      const user = userDisabled.find((user) => typeof user !== "undefined");
      console.log(user);
      if (user.accountStatus) {
        user.accountStatus = false;
        user.save();
      } else {
        res.status(409).json({
          message: "User is already Disabled!",
        });
      }
    })
    .then(() => {
      res.status(200).json({
        message: "User Disabled successfully!",
      });
    })
    .catch((err) => {
      const error = new Error("User Disabling error!");
      error.message = err.message;
      error.data = err.errors;
      next(error);
    });
};
