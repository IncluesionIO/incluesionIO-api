const mongoose = require("mongoose");
import toolsModel from "./tools.model";
import horseProgressionModel from "./horse-progression.model";
const Schema = mongoose.Schema;

const userProgressionSchema = new Schema({
  earnedPoints: {
    type: Number,
    default: 0
  },
  lostPoints: {
    type: Number,
    default: 0
  },
  hintsUsed: {
    type: Number,
    default: 0
  },
  tools: [toolsModel],
  horseData: [horseProgressionModel]
})



module.exports = mongoose.model("User-Progression", userProgressionSchema);
