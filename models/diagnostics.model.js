const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diagnosticSchema = new Schema({
  companyID: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("Diagnostics", diagnosticSchema);
