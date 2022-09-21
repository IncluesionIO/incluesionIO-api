const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const authController = require("../controllers/auth.controller");

router.post("/login", authController.login);

router.post(
  "/reset",
  body("input")
    .not()
    .isEmpty()
    .withMessage("Input required, email or username!"),
  authController.postPasswordReset
);

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
