//Controller for admin routes
const { validationResult } = require("express-validator");

//Import the user model
const User = require("../models/user.model");

exports.createAdmin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.httpStatus = 422;
    error.data = errors.array();
    throw error;
  }
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const email = req.body.email;
  const role = req.body.role;
  const accountStatus = req.body.accountStatus;

  const admin = new User({
    username,
    password,
    name,
    email,
    role,
    accountStatus,
  });

  admin
    .save()
    .then((result) => {
      res.status(200).json({
        message: "User created successfully!",
        userId: result._id,
      });
    })
    .catch((err) => {
      const error = new Error("User creation error!");
      error.message = err.message;
      error.data = err.errors;
      next(error);
    });
};

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


exports.putUpdateUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.httpStatus = 422;
    error.data = errors.array();
    throw error;
  }
  //req.userId is the admin ID
  //req.body.userId is the ID of the user to be updated!

  //Verify user is an admin
  User.findOne({ _id: req.userId, role: "ADMIN" })
    .then((adminUser) => {
      if (!adminUser) {
        const error = new Error("Unauthorized!");
        error.httpStatus = 401;
        throw error;
      }

      //We know that the user is an admin
      //Retrieve the User to be updated
      User.findById(req.body.userId)
        .then((user) => {
          if (user.role === "ADMIN") {
            const error = new Error("Unauthorized!");
            error.httpStatus = 401;
            throw error;
          }
          user.username = req.body.changeObject.username
            ? req.body.changeObject.username
            : user.username;
          user.email = req.body.changeObject.email
            ? req.body.changeObject.email
            : user.email;
          user.name = req.body.changeObject.name
            ? req.body.changeObject.name
            : user.name;
          user.accountStatus = req.body.changeObject.accountStatus
            ? req.body.changeObject.accountStatus
            : user.accountStatus;

          return user.save();
        })
        .then((result) => {
          res.status(200).json({ msg: "User updated successfully!" });
        })
        .catch((err) => {
          if (err.httpStatus != 401) {
            const error = new Error("Bad parameters!");
            error.httpStatus = 400;
            return next(error);
          }
          return next(err);
        });
    })
    .catch((err) => next(err));
};
