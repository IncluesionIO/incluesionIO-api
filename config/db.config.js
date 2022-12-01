const errors = require("../util/errors.json");

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME
} = process.env

function checkIfAnyAreMissing()
{
  if(!(DB_USER && DB_PASSWORD && DB_HOST && DB_PORT && DB_NAME) && !process.env.DBURI)
  {
    throw errors.NoDBURIOnEnvDetected
  }
}

const getUrl = () =>
{
  checkIfAnyAreMissing() //will throw an error if db is missing
  return process.env.DBURI || `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`
}

module.exports = {getUrl}