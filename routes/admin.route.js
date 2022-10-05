const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user.model");
const adminController = require("../controllers/admin.controller");
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");

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
  isAdmin,
  adminController.putUpdateUser
);

/**
 * @swagger
 * /admin/disable:
 *   put:
 *     tags: 
 *       - User
 *     summary: Disable a Specified User
 *     description: Used to disable a user account conditional on admin privilages 
 *     responses:
 *       '200':
 *          description: A successful request, user is disabled
 *       '409':
 *          description: The Specified User is already disabled
 *       '500': 
 *          description: Internal server error
 */

router.put(
  "/disable",
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
  isAuth,
  isAdmin,
  adminController.disableUser);
  
router.put(
  "/userPasswordReset",
  [
    body("userId")
      .not()
      .isEmpty()
      .withMessage("A user ID is required!")
      .isString()
      .withMessage("User ID must be a string!"),
    body("newPassword")
      .not()
      .isEmpty()
      .withMessage("The new password cannot be empty!"),
  ],
  isAuth,
  isAdmin,
  adminController.putUpdateUserPassword
);

module.exports = router;
