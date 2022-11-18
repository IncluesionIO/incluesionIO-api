const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const progressionSchema = new Schema({
  horseHappiness: {
    type: Number,
    default: 0,
  },
  horseHealth: {
    type: Number,
    default: 0
  },
  numberOfHorseFeedings: {
    type: Number,
    default: 0
  },
  numberOfHorseWaterings: {
    type: Number,
    default: 0
  },
  timeWalkingHorse: {
    type: Number,
    default: 0
  },
  treatsGiven: {
    type: Number,
    default: 0
  },
  pettingsGiven: {
    type: Number,
    default: 0
  },
  timesHoovesCleaned: {
    type: Number,
    default: 0
  },
  challengesRejected: {
    type: Number,
    default: 0
  },
  challengesAccepted: {
    type: Number,
    default: 0
  },
  numberOfPushesToAccomplish: {
    type: Number,
    default: 0
  },
  timeToLearn: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Progression", progressionSchema);
