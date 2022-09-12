const errorResponseHandler = (error, req, res, next) =>
{
  //If no error code, set 500
  if(!error.httpStatus)
  {
    error.httpStatus = 500
  }
  res.status(error.httpStatus).json({error})
}


module.exports = {errorResponseHandler}