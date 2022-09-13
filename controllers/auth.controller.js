const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

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