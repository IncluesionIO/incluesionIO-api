const { validationResult } = require("express-validator")

/**
 * @desciption - Handle errors from validation and throws an error if there is an error.
 * @param {*} req - The request object
 */
const getValidationResults = (req) =>
{
  const errors = validationResult(req);
  if(!errors.isEmpty())
  {
    const error = new Error("Validation failed");
    error.httpStatus = 422;
    error.data = errors.array();
    throw error;
  }
}

module.exports = {getValidationResults}