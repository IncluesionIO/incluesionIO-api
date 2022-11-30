const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const toolSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  lastUsed: {
    type: String
  }, 
  useFrequency: {
    type: Number
  }
})



module.exports = mongoose.model("Tool", toolSchema);
