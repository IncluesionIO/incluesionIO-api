const mongoose = require('mongoose')
const Schema = mongoose.Schema

const assessmentSchema = new Schema({
  companyID: {
    type: String,
    required: true
  },
  timestamp: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: true
  }
})

module.exports = mongoose.model('Assessment', assessmentSchema)