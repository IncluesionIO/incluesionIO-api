const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const authController = require("../controllers/auth.controller");

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: 
 *       - Authentication
 *     summary: Login
 *     description: Used by users to login
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: userLogin
 *         schema:  
 *           type: object
 *           required:
 *             - username
 *             - password
 *           properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *       '200':
 *          description: A successful request, user is logged in
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 *                    description: JWT to identify user
 *                  userId:
 *                    type: string
 *                    description: The user ID associated to the account
 *       '401':
 *          description: No user with the combination of password and username exist
 *       '422':
 *          description: There was an error in the parameters
 *       '500': 
 *          description: Internal server error
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /auth/reset:
 *   post:
 *     tags: 
 *       - Authentication
 *     summary: Password reset request
 *     description: Used by users to request a password reset, an email will be sent to the associated email of the account with a token for the password reset
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: passwordRequest
 *         schema:  
 *           type: object
 *           required:
 *             - input
 *           properties:
 *              input:
 *                type: string
 *                description: Either the username or email associated to the user account
 *                example: john.smith@smith.com
 *     responses:
 *       '200':
 *          description: A successful request, user password reset request has been processed
 *       '422':
 *          description: There was an error in the parameters
 *       '500': 
 *          description: Internal server error
 */
router.post(
  "/reset",
  body("input")
    .not()
    .isEmpty()
    .withMessage("Input required, email or username!"),
  authController.postPasswordReset
);


/**
 * @swagger
 * /auth/reset:
 *   put:
 *     tags: 
 *       - Authentication
 *     summary: Password reset token consumption
 *     description: Used by users when they get their password reset tokens.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: passwordReset
 *         schema:  
 *           type: object
 *           required:
 *             - resetToken
 *             - newPassword
 *           properties:
 *              resetToken:
 *                 type: string
 *                 description: The token sent to the user by email for their password reset
 *                 example: 482f96758c74eaeca57b6c9d6e51f853
 *              newPassword:
 *                 type: string
 *                 description: The new password for the user, cannot match the previous password
 *                 example: someNewPassword
 *     responses:
 *       '200':
 *          description: A successful request, user password reset request has been processed
 *       '404':
 *          description: Error resetting password
 *       '422':
 *          description: There was an error in the parameters
 *       '500': 
 *          description: Internal server error
 */
router.put(
  "/reset",
  [
    body("resetToken").not().isEmpty().withMessage("Reset Token Required"),
    body("newPassword")
      .not()
      .isEmpty()
      .withMessage("A new password is required!"),
  ],
  authController.putPasswordReset
);

//Set up to test
// router.post('/testEmail', authController.emailTest)

module.exports = router;
