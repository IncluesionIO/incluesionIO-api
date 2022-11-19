const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const levelSchema = new Schema({
  timeSpent: {
    type: Number,
    default: 0
  }, 
  attemptsAtLevel: {
    type: Number,
    default: 0
  },
  endSection: {
    type: String,
    require: true
  },
  numberOfLevelActions: {
    type: Number,
    require: true
  }
})



module.exports = mongoose.model("Level", levelSchema);
