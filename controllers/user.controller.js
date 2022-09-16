//Controller for user routes
const {validationResult} = require('express-validator')

//Import the user model
const User = require('../models/user.model')

exports.createUser = (req, res, next) =>
{
  const errors = validationResult(req)
  if(!errors.isEmpty())
  {
    const error = new Error('Validation failed')
    error.httpStatus = 422
    error.data = errors.array()
    throw error
  }
  const username = req.body.username
  const password = req.body.password
  const name = req.body.name
  const role = req.body.role
  const email = req.body.email
  const accountStatus = req.body.accountStatus

  const user = new User({
    username,
    password,
    name,
    email,
    role,
    accountStatus
  })

  user
  .save()
  .then(result =>
    {
      res.status(200)
      .json({
        message: 'User created successfully!', 
        userId: result._id
      })
    })
  .catch(err =>
    {
      const error = new Error('User creation error!')
      error.message = err.message
      error.data = err.errors
      next(error)
    })
}