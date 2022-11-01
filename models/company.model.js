const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  organizationType: {
    type: String,
    required: false,
  },
  industry: {
    type: String,
    required: false,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  supportEmail: {
    type: String,
    required: true,
  },
  departments: [departmentSchema],
});

module.exports = mongoose.model("Company", companySchema);
