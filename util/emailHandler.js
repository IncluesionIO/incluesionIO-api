//Sendgrid setup

const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const transporter = nodemailer.createTransport(sendgridTransport(
  {
    auth: {
      api_key: process.env.SENDGRIDAPIKEY
    }
  }
))

//Password reset template
const {getPasswordResetEmailTemplate} = require('../email-templates/passwordRecovery')

/**
 * 
 * @param {String} emailFlag - the flag for the type of email to be sent
 * @param {String} emailObjects - The contents of the email
 * @param {String} emailObjects.name - The name of the recepient
 * @param {String} emailObjects.email - The email of the recepient
 * @param {String} emailObjects.token - Any tokens that need to be sent in the email
 * 
 * @example
 * const email = emailHandler('passwordReset', {name: 'Victor', email: 'victor@gmail.com', token: token});
 */
exports.emailHandler = (emailFlag , emailObjects) =>
{
  switch (emailFlag) {
    case 'passwordReset':
      passwordResetEmail(emailObjects)
      break

    default:
      console.log('No email flag set')
  }
}

//Password reset email function
const passwordResetEmail = ({email, name, token}) =>
{
  transporter.sendMail(
    getPasswordResetEmailTemplate(email, name, token)
  )
  .catch(err => {
    const error = new Error(err)
    error.httpStatus = 400
    console.log(error)
  })
}