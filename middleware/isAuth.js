const jwt = require('jsonwebtoken')

module.exports = (req, res, next) =>
{
  //Check if there is a token
  if(!req.get('Authorization'))
  {
    notAuthenticatedErrorHelper()
  }
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
    notAuthenticatedErrorHelper()
  }

  req.userId = decodedToken.userId
  next()
}

//Error creation helper
const notAuthenticatedErrorHelper = () =>
{
  const error = new Error('Not authenticated')
  error.httpStatus = 401
  throw error
}