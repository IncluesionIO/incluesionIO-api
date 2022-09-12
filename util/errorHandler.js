const errorResponseHandler = (error, req, res, next) =>
{
  const status = error.httpStatus || 500
  const message = error.message
  const data = error.data
  res.status(status).json({message, data})
}


module.exports = {errorResponseHandler}