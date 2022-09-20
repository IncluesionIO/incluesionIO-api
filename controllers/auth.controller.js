const User = require('../models/user.model')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { emailHandler } = require('../util/emailHandler')
const {validationResult} = require('express-validator')
// const nodemailer = require('nodemailer')
// const sendgridTransport = require('nodemailer-sendgrid-transport')

// const transporter = nodemailer.createTransport(sendgridTransport(
//   {
//     auth: {
//       api_key: process.env.SENDGRIDAPIKEY
//     }
//   }
// ))

exports.login = (req, res, next) =>
{
  const username = req.body.username
  const password = req.body.password

  User.findOne({username})
    .then(user =>
      {
        if(!user)
        {
          const error = new Error('User with email/password combination does not exist!')
          error.httpStatus = 401;
          throw error
        }

        user.comparePassword(password, (err, isMatch) =>
        {
          //Wrong password
          if(err || !isMatch)
          {
            const error = new Error('User with email/password combination does not exist!')
            error.httpStatus = 401
            next(error)
          }

          if(isMatch)
          {
            //User has authenticated
            const token = jwt.sign({
              username: user.username,
              userId: user._id.toString()},
              process.env.JWTSECRET, 
              {expiresIn: '1hr'})
  
            //Send response
            res.status(200).json({token: token, userId: user._id.toString()})
          }
        })
      })
      .catch(err => {
        next(err)
      })
}

//Password reset logic
exports.postPasswordReset = (req, res, next) =>
{
  const errors = validationResult(req)
  if(!errors.isEmpty())
  {
    const error = new Error('Validation failed')
    error.httpStatus = 422
    error.data = errors.array()
    throw error
  }
  //Generate a random 32 bytes and add them to a buffer
  crypto.randomBytes(32, (err, buffer) =>
  {
    //If there is an error
    if(err)
    {
      const error = new Error(err)
      error.httpStatus = 500
      return next(err)
    }
    //Transfer the buffer into a token
    const token = buffer.toString('hex')
    //Find a user in the DB with either username or email
    User.findOne({$or: [{username: req.body.input}, {email: req.body.input}]})
    .then(user =>
      {
        if(!user)
        {
          //We don't want to give information if an account exists or not
          res.status(200).json({})
        }
        user.resetToken = token
        //Set reset token expiration to 15 minutes after creation
        user.resetTokenExpiration = Date.now() + 900000
        return user.save()
      })
      .then(result =>
        {
          emailHandler('passwordReset', {name: result.name, email: result.email, token: result.resetToken})
          res.status(200).json({})
        })
    .catch(err =>
      {
        const error = new Error(err)
        error.httpStatus = 500
        next(error)
      })
  })
}

//This is set up to test
// const {getPasswordResetEmailTemplate} = require('../email-templates/passwordRecovery')

// exports.emailTest = (req, res, next) =>
// {
//   const recipientEmail = req.body.email
//   const recipientName = req.body.name
//   if(!recipientEmail || !recipientName)
//   {
//     const error = new Error('Parameters not valid!')
//     error.httpStatus = 400
//     throw error
//   }

//   transporter.sendMail(
//     getPasswordResetEmailTemplate(recipientEmail, recipientName)
//   ).then(result => res.status(200).json({msg: 'email sent!'}))
//   .catch(err => {
//     const error = new Error(err)
//     error.httpStatus = 400
//     next(error)
//   })
// }