const express = require('express')
const {body} = require('express-validator/check')

const User = require('../models/user.model')
const adminController = require('../controllers/admin.controller')

const router = express.Router()

router.post('/create', [
  body('username')
  .trim()
  .not()
  .isEmpty()
  .withMessage('Username is required!')
  .custom((value, {req}) => {
    return User.findOne({username: value}).then(userDoc =>
      {
        if(userDoc)
        {
          return Promise.reject('Username already in use!')
        }
      })
  }),
  body('password')
  .trim()
  .not()
  .isEmpty()
  .withMessage('Password is required!')
  .isLength({min: 8})
  .withMessage('Password must be greater than 8 characters!')
], adminController.createAdmin)

module.exports = router