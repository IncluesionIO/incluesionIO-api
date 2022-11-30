//Sendgrid setup

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRIDAPIKEY,
    },
  })
);

//Password reset template
const {
  getPasswordResetEmailTemplate,
} = require("../email-templates/passwordRecovery");
const {
  getAdminResetUserPasswordEmailTemplate,
} = require("../email-templates/adminResetUserPassword");
const {
  getAccountCreatedEmailTemplate,
} = require("../email-templates/accountCreated");

/**
 *
 * @param {String} emailFlag - the flag for the type of email to be sent
 * @typedef {Object} Email - The contents of the email
 * @property {string} name - The name of the recepient
 * @property {string} email - The email of the recepient
 * @property {any} value - Any values, such as tokens or new passwords that need to be sent in the email
 *
 * @example
 * const email = emailHandler('passwordReset', {name: 'Victor', email: 'victor@gmail.com', value: token});
 */
exports.emailHandler = (emailFlag, emailObjects) => {
  switch (emailFlag) {
    case "passwordReset":
      passwordResetEmail(emailObjects);
      break;
    case "adminResetUserPassword":
      adminResetUserPassword(emailObjects);
      break;
    case "accountCreated":
      accountCreated(emailObjects);
      break;

    default:
      console.log("No email flag set");
  }
};

//Password reset email function
const passwordResetEmail = ({ email, name, value }) => {
  transporter
    .sendMail(getPasswordResetEmailTemplate(email, name, value))
    .catch((err) => {
      const error = new Error(err);
      error.httpStatus = 400;
      console.log(error);
    });
};

const adminResetUserPassword = ({ email, name, value }) => {
  transporter
    .sendMail(getAdminResetUserPasswordEmailTemplate(email, name, value))
    .catch((err) => {
      console.log(err);
    });
};

const accountCreated = ({ email, name, value }) => {
  transporter
    .sendMail(getAccountCreatedEmailTemplate(email, name, value.companyEmail, value.accessLink))
    .catch((err) => {
      console.log(err);
    });
};
