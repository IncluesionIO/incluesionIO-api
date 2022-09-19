const express = require("express")
const cors = require("cors")
const _ = require("lodash")
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const {v4: uuid} = require("uuid")
require('dotenv').config()


//Routes
const apiDocRoute = require('./routes/api-doc.route')
const adminRoutes = require('./routes/admin.route')
const authRoutes = require('./routes/auth.route')
const userRoutes = require('./routes/user.route')
const errors = require('./util/errors.json')
const {errorResponseHandler} = require('./util/errorHandler') 

const app = express()

//Example of auth required route
const isAuth = require('./middleware/isAuth')

app.use('/authenticated', isAuth, (req, res, next) =>
{
  res.status(200).json({msg: "You're authenticated!"})
})

//Example of an error
app.use('/error', (req, res, next) =>
{
  const err = new Error('Error')
  err.httpStatus = 410
  next(err)
})

//Used to test server

app.use(cors())

app.use(bodyParser.json())

app.use('/user', userRoutes)

app.use('/api-docs', apiDocRoute)

app.use('/auth', authRoutes)

app.use('/admin', adminRoutes)

app.use('/', (req, res, next) =>
{
  res
    .status(200)
    .json(
      {
        message: "We're live!"
      })
})

//Error handler
app.use(errorResponseHandler)

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