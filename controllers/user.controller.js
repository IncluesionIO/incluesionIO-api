//Controller for user routes
const { validationResult } = require("express-validator");

const { emailHandler } = require("../util/emailHandler");

//Import the user model
const User = require("../models/user.model");

exports.createUser = (req, res, next) => {
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
  const role = req.body.role;
  const email = req.body.email;
  const accountStatus = req.body.accountStatus;
  const dateOfBirth = req.body.dateOfBirth;
  const companyID = req.body.companyId;

  const user = new User({
    username,
    password,
    name,
    email,
    role,
    accountStatus,
    dateOfBirth,
    companyID,
  });

  user
    .save()
    .then((result) => {
      emailHandler("accountCreated", {
        name: user.name,
        email: user.email,
        value: {
          companyEmail: "support@support.com",
          accessLink: `docs.google.com/forms/d/e/1FAIpQLSeOlhoiEprxE07v1oOCbniEi2mxp874GN2jObi2aqgPvdGW9g/viewform?usp=pp_url&entry.873971165=${companyID}`,
        },
      });
      res.status(200).json({
        message: "User created successfully!",
        userId: result._id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        const error = new Error("Duplicate Key!");
        error.message = err.message;
        error.httpStatus = 403;
        error.data = err.errors;
        next(error);
      }
      const error = new Error("User creation error!");
      error.message = err.message;
      error.data = err.errors;
      next(error);
    });
};

//Return List of Users
exports.getUsers = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.httpStatus = 422;
    error.data = errors.array();
    throw error;
  }

  User.find({ companyID: req.user.companyID })
    .then((users) => {
      if (!users) {
        const error = new Error("No users found!");
        error.httpStatus = 404;
        throw error;
      }
      const returnList = users.map((user) => {
        return {
          id: user._id,
          username: user.username,
          name: user.name,
          email: user.email,
          role: user.role,
          lastLogin: user.lastLogin,
          accountStatus: user.accountStatus,
        };
      });
      return res.status(200).json(returnList);
    })
    .catch((err) => {
      const error = new Error("Users Retrieval error!");
      error.message = err.message;
      error.httpStatus = err.httpStatus || 500;
      error.data = err.errors;
      next(error);
    });
};

//Get Specified User
exports.getUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.httpStatus = 422;
    error.data = errors.array();
    throw error;
  }

  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        const error = new Error("No user found!");
        error.httpStatus = 404;
        throw error;
      }
      return res.status(200).json({
        id: user._id,
        companyID: user.companyID,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin,
        accountStatus: user.accountStatus,
      });
    })
    .catch((err) => {
      const error = new Error("User Retrieval error!");
      error.message = err.message;
      error.httpStatus = err.httpStatus || 500;
      error.data = err.errors;
      next(error);
    });
};

//User account updates
exports.putAccountUpdate = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      if (!user) {
        const error = new Error("No user found!");
        error.httpStatus = 404;
        throw error;
      }
      if (req.body.email && req.body.email.length > 0) {
        user.email =
          req.body.email !== user.email ? req.body.email : user.email;
      }
      if (req.body.name && req.body.name.length > 0) {
        user.name = req.body.name !== user.email ? req.body.name : user.name;
      }
      return user.save();
    })
    .then((result) => {
      res.status(200).json({ msg: "User updated successfully!" });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatus = 500;
      return next(error);
    });
};
