const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user.model");
const adminController = require("../controllers/admin.controller");
const isAuth = require("../middleware/isAuth");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();


/**
 * @swagger
 * /admin/create:
 *   post:
 *     tags: 
 *       - Admin
 *     summary: Create a admin user account
 *     description: Used to create a admin user account
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: adminuser
 *         schema:  
 *           type: object
 *           required:
 *             - username
 *             - password
 *             - name
 *             - email
 *             - role
 *           properties:
 *              username:
 *                type: string
 *                unique: true
 *              password:
 *                type: string
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              role:
 *                type: string
 *                example: 'ADMIN'
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
    body("role").contains("ADMIN").withMessage("Invalid request!"),
  ],
  adminController.createAdmin
);


/**
 * @swagger
 * /admin/userUpdate:
 *   put:
 *     tags: 
 *       - Admin
 *     summary: Admin route to update a user account
 *     description: Used to update a user account as an admin
 *     consumes:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: updateRequest
 *         schema:  
 *           type: object
 *           required:
 *             - userId
 *             - changeObject
 *           properties:
 *             userId:
 *               type: string
 *             changeObject:              
 *               type: object
 *               properties:
 *                  username:
 *                     type: string
 *                  email:
 *                     type: string
 *                  name:
 *                      type: string
 *                  accountStatus:
 *                      type: boolean
 *               
 *     responses:
 *       '200':
 *          description: A successful request, user is updated
 *       '400':
 *          description: Bad parameters
 *       '401':
 *          description: Unauthorized, bad JWT or user cannot edit another admin
 *       '422':
 *          description: There was an error in the parameters
 *       '500': 
 *          description: Internal server error
 */
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
    body("id")
      .trim()
      .not()
      .isEmpty()
      .withMessage("_id is required!")
      .custom((value, { req }) => {
        return User.findOne({ _id: value }).then((userDoc) => {
          if (!userDoc) {
            return Promise.reject("User Not Found!");
          }
        });
      }),
  ],
  isAuth,
  isAdmin,
  adminController.disableUser);

/**
 * /admin/userPasswordReset:
 *   put:
 *     tags: 
 *       - Admin
 *     summary: Admin route to reset a user password
 *     description: Admin can use this route to create a new password for a user
 *     consumes:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: passwordReset
 *         schema:  
 *           type: object
 *           required:
 *             - userId
 *             - newPassword
 *           properties:
 *             userId:
 *               type: string
 *             newPassword:              
 *               type: string
 *               
 *     responses:
 *       '200':
 *          description: A successful request, user password is changed
 *       '400':
 *          description: Bad parameters
 *       '401':
 *          description: Unauthorized, bad JWT or user cannot edit another admin
 *       '404':
 *          description: No user was found
 *       '422':
 *          description: There was an error in the parameters
 *       '500': 
 *          description: Internal server error
 */
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
