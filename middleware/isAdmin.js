const User = require('../models/user.model')
/**
 * Middleware to know if a user is an admin
 * It will add to the request the users role
 */
module.exports = (req, res, next) =>
{
  User.findOne({_id: req.userId, role: 'ADMIN'})
    .then(adminUser =>
      {
        if(!adminUser)
        {
          const error = new Error('Unauthorized!')
          error.httpStatus = 401
          return next(error)
        }
        req.isAdmin = true
        req.user = adminUser
        next()
      })
    .catch(err =>
      {
        console.log(err)
        const error = new Error('Unauthorized')
        error.httpStatus = 401
        throw error
      })

  
}