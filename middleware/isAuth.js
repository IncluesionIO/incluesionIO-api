const jwt = require('jsonwebtoken')

module.exports = (req, res, next) =>
{
  const token = req.get('Authorization').split(' ')[1]
  let decodedToken

  try {
    decodedToken = jwt.verify(token, process.env.JWTSECRET)
  }
  catch (err) {
    err.httpStatus = 500
    throw err
  }

  if(!decodedToken)
  {
    const error = new Error('Not authenticated')
    error.httpStatus = 401
    throw error
  }

  req.userId = decodedToken.userId
  next()
}