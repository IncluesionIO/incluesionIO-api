const express = require("express")
const cors = require("cors")
const _ = require("lodash")
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const {v4: uuid} = require("uuid")
require('dotenv').config()

const adminRoutes = require('./routes/admin.route')
const errors = require('./util/errors.json')

const app = express()

app.use(bodyParser.json())

app.use('/admin/', adminRoutes)

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
  if(!process.env.DBURI)
  {
    throw errors.NoDBURIOnEnvDetected
  }
  mongoose.connect(process.env.DBURI)
    .then(result => {
      app.listen(process.env.PORT, () => console.log("API Server is running..." + process.env.PORT))
    })
}
catch (e) {
  console.log(e)
}