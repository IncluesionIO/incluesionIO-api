const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const transporter = nodemailer.createTransport(sendgridTransport(
  {
    auth: {
      api_key: process.env.SENDGRIDAPIKEY
    }
  }
))

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

//This is set up to test
const {getPasswordResetEmailTemplate} = require('../email-templates/passwordRecovery')

exports.emailTest = (req, res, next) =>
{
  const recipientEmail = req.body.email
  const recipientName = req.body.name
  if(!recipientEmail || !recipientName)
  {
    const error = new Error('Parameters not valid!')
    error.httpStatus = 400
    throw error
  }

  transporter.sendMail(
    getPasswordResetEmailTemplate(recipientEmail, recipientName)
  ).then(result => res.status(200).json({msg: 'email sent!'}))
  .catch(err => {
    const error = new Error(err)
    error.httpStatus = 400
    next(error)
  })
}