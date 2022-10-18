const express = require("express");
const { body } = require("express-validator/check");

const User = require("../models/user.model");
const userController = require("../controllers/user.controller");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

/**
 * @swagger
 * /user/create:
 *   post:
 *     tags:
 *       - User
 *     summary: Create a user account
 *     description: Used to create a user account
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - password
 *             - name
 *             - email
 *           properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *              name:
 *                type: string
 *              email:
 *                type: string
 *     responses:
 *       '200':
 *          description: A successful request, user is created
 *       '422':
 *          description: There was an error in the parameters
 *       '500':
 *          description: Internal server error
 */
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
  ],
  userController.createUser
);

/**
 * @swagger
 * /user/list:
 *   get:
 *     summary: Retrieve a List of all Users
 *     description: Used to get all Users Information
 *     responses:
 *       '200':
 *          description: A successful request, existing users returned
 *       '404':
 *          description: A failed request, users not found
 *       '500':
 *          description: Internal server error
 */
router.get("/list", userController.getUsers);

/**
 * @swagger
 * /user/get/:id:
 *   get:
 *     summary: Retrieve a single specified user
 *     description: Retrieval of One User using UserId
 *     responses:
 *       '200':
 *          description: A successful request, user is created
 *       '404':
 *          description: A failed request, user not found
 *       '500':
 *          description: Internal server error
 */
router.get("/get/:id", userController.getUser);

/**
 * @swagger
 * /user/update:
 *   put:
 *     tags:
 *       - User
 *     summary: Update a user account
 *     description: Use to update an authenicated user
 *     consumes:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: userChanges
 *         schema:
 *           type: object
 *           properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *     responses:
 *       '200':
 *          description: A successful request, user is updated
 *       '401':
 *          description: Unauthorized Bad or no token
 *       '404':
 *          description: No user was found with the authenticated ID
 *       '500':
 *          description: Internal server error
 */
router.put("/update", isAuth, userController.putAccountUpdate);

module.exports = router;
