/**
 * 
 * @param {String} recipientEmail - The receipient email
 * @param {String} recipientName - The name of the receipient
 * @param {String} accessLink - The access link for the user
 * @param {String} companySupportEmail - The company support email
 * @returns {Object} Email template to be sent for a password reset.
 * 
 * @example
 * const email = getAccountCreatedEmailTemplate('victor@gmail.com', 'victor');
 */
exports.getAccountCreatedEmailTemplate = (recipientEmail, recipientName, companySupportEmail, accessLink) =>
{
  return {
    to: recipientEmail,
    from: process.env.FROMEMAIL,
    subject: `Incluesion Account Created for ${recipientName}`,
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
    Account Successfully Created
    </h1>
    <p style="width: 60%; text-align: center; margin-bottom: 2rem; margin-left:auto; margin-right: auto;">
    An account has been created in the Incluesion Training Platform for you.
    </p>
    <a href="http://${accessLink}" style="
    text-decoration: none;
    color: #fff;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
    padding: 1rem 1.5rem;
    box-shadow: 2px 4px 10px #ccc;
    background: #079BF5;
    font-family: sans-serif;
    font-weight: bold;">Please take this assessment to get started!</a>
    <p style="width: 60%;
    font-size: .85rem;
    color: #888;
    margin-top: 2rem;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 40px">
     For any help, please contact your admin at  ${companySupportEmail}
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