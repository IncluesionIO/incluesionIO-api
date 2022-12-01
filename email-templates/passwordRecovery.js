/**
 * 
 * @param {String} recipientEmail - The receipient email
 * @param {String} recipientName - The name of the receipient
 * @param {String} tokenString - The string of the password reset token
 * @returns {Object} Email template to be sent for a password reset.
 * 
 * @example
 * const email = getPasswordResetEmailTemplate('victor@gmail.com', 'victor');
 */
exports.getPasswordResetEmailTemplate = (recipientEmail, recipientName, tokenString) =>
{
  return {
    to: recipientEmail,
    from: process.env.FROMEMAIL,
    subject: `Password Reset Request for ${recipientName}`,
    html: `<div style="
    margin: 0;
    padding: 0;
    background-color: #eee;
    width: 100%;
    height: 100%;
    padding-bottom: 100px;">
  <h1 class="logo" style="text-align: center; padding-top: 50px;">
    in<span style="font-size: 1rem;">&#x2022;</span>clue<span style="font-size: 1rem;">&#x2022;</span>sion
  </h1>
  <div style="
    border: rgba(108, 122, 137, .8);
    margin: 80px auto;
    background-color: #fff;
    width: 80%;
    height: 100%;
    text-align: center;
    box-shadow: 0px 8px 8px #aaa;
    font-family: sans-serif;
    color: #555;">
    <h1 style="font-size: 1.5rem; padding-top: 50px;">
    Password Reset &#128064;
    </h1>
    <p style="width: 60%; text-align: center; margin-bottom: 2rem; margin-left:auto; margin-right: auto;">
    You've requested a password reset for your Incluesion account. Please use the link below to get started.
    </p>
    <a href="http://localhost:${process.env.PORT}/reset/${tokenString}" style="
    text-decoration: none;
    color: #fff;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
    padding: 1rem 1.5rem;
    box-shadow: 2px 4px 10px #ccc;
    background: #079BF5;
    font-family: sans-serif;
    font-weight: bold;" class="passwordResetLink">Reset your password</a>
    <p style="width: 60%;
    font-size: .85rem;
    color: #888;
    margin-top: 2rem;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 40px">
     If you did not request a password reset, you can safely ignore this email. Only a person with access to your email can reset your Incluesion account password.
    </p>
  </div>
</div>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
  
  .logo {
    font-family: 'Montserrat', sans-serif;
  }
</style>`
  }
}