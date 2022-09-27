/**
 * 
 * @param {String} recipientEmail - The receipient email
 * @param {String} recipientName - The name of the receipient
 * @param {String} newPassword - The password set by the admin for the user
 * @returns {Object} Email template to be sent for a password reset.
 * 
 * @example
 * const email = getAdminResetUserPasswordEmailTemplate('victor@gmail.com', 'victor');
 */
exports.getAdminResetUserPasswordEmailTemplate = (recipientEmail, recipientName, newPassword) =>
{
  return {
    to: recipientEmail,
    from: 'dteje014@fiu.edu', //temp
    subject: `Incluesion: Admin has reset password for ${recipientName}`,
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
    An administrator has reset the password on your account. Please use the following password to login to your account.
    </p>

    <p style="width: 60%; text-align: center; margin-bottom: 2rem; margin-left:auto; margin-right: auto;">
    Password: ${newPassword}
    </p>
    
    <p style="width: 60%;
    font-size: .85rem;
    color: #888;
    margin-top: 2rem;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 40px">
     If you have any questions, please contact us.
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