const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const assessmentController = require('../controllers/assessment.controller')

router.post('/submitAssessment', 
[
  body('timestamp')
  .notEmpty()
  .withMessage('Timestamp cannot be empty!')
  .isISO8601().toDate()
  .withMessage('Invalid timestamp!'),
  body('data')
  .notEmpty()
  .withMessage('Data cannot be empty!')
  .isObject()
  .withMessage('Data must be an object!')
], assessmentController.submitAssessment)

module.exports = router