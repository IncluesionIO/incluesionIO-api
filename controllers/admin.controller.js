//Controller for admin routes
const {validationResult} = require('express-validator')

//Import the user model
const User = require('../models/user.model')

exports.createAdmin = (req, res, next) =>
{
  const errors = validationResult(req)
  if(!errors.isEmpty())
  {
    const error = new Error('Validation failed')
    error.status = 422
    error.data = error.array()
    throw error
  }
  const username = req.body.username
  const password = req.body.password
  const name = req.body.name
  const role = req.body.role
  const accountStatus = req.body.accountStatus

  console.log('called!')
}