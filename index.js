const express = require("express")
const cors = require("cors")
const _ = require("lodash")
const {v4: uuid} = require("uuid")
require('dotenv').config()

const app = express()

try {
  if(process.env.PORT)
  {
    app.listen(process.env.PORT, () => console.log("API Server is running..." + process.env.PORT))
  }
  throw "Server start error: No PORT environment variable has been set up!"
}
catch (e) {
  console.log(e)
}