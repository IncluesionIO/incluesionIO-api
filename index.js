const express = require("express")
const cors = require("cors")
const _ = require("lodash")
const {v4: uuid} = require("uuid")
require('dotenv').config()
const errors = require('./util/errors.json')

const app = express()

app.use('/', (req, res, next) =>
{
  res
    .status(200)
    .json(
      {
        message: "We're live!"
      })
})
//Check if we have the PORT env variable set up
try {
  if(!process.env.PORT)
  {
    throw errors.NoPortOnEnvDetected
  }
  app.listen(process.env.PORT, () => console.log("API Server is running..." + process.env.PORT))
}
catch (e) {
  console.log(e)
}